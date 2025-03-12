import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { ChatRequestOptions, ToolInvocation } from "ai";
import { Message } from "ai/react";
import { motion } from "framer-motion";
import { CheckCircle, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ButtonWithTooltip from "../button-with-tooltip";
import CodeDisplayBlock from "../code-display-block";
import { Button } from "../ui/button";
import { Player } from '@lordicon/react';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../ui/chat/chat-bubble";
import { ConfirmationDialog } from "../ui/ConfirmationDialog";
import { Address } from "viem";
import ToolExecutor from "./ToolExecutor";
import { createPublicClient, http, parseEther, parseUnits } from "viem";
import { abiApprouve } from "@/constants/abi";
import { getTokenAvax } from "@/constants/tokenInfo";
import {
  ChainId,
  Token,
  TokenAmount,
  Percent,
} from "@traderjoe-xyz/sdk-core";
import {
  PairV2,
  RouteV2,
  TradeV2,
  TradeOptions,
  LB_ROUTER_V22_ADDRESS,
  jsonAbis,
} from "@traderjoe-xyz/sdk-v2";
import { avalancheFuji } from "viem/chains";
import SendResultDialog from "./SendResultDialog";

// Interface for stored tools in localStorage
interface StoredTool {
  id: string;
  name: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  executionCode: string;
  nftPrice: string;
}

export type ChatMessageProps = {
  message: Message;
  isLast: boolean;
  isLoading: boolean | undefined;
  reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
};

const MOTION_CONFIG = {
  initial: { opacity: 0, scale: 1, y: 20, x: 0 },
  animate: { opacity: 1, scale: 1, y: 0, x: 0 },
  exit: { opacity: 0, scale: 1, y: 20, x: 0 },
  transition: {
    opacity: { duration: 0.1 },
    layout: {
      type: "spring",
      bounce: 0.3,
      duration: 0.2,
    },
  },
};

function SendCompleteCard({ result, action }: { result: string; action: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="w-full my-6 bg-card text-card-foreground border border-card-border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">{action} complete</p>
          <CheckCircle className="w-4 h-4" />
        </div>
        <SendResultDialog open={dialogOpen} onOpenChange={setDialogOpen} result={result} />
      </div>
      <p className="text-xs text-text-success">
        Your {action} was processed successfully.
      </p>
    </div>
  );
}

function SendProcessCard({ toolName }: { toolName: string }) {
  const ICON = require('./rook.json');
  const playerRef = useRef<Player>(null);
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [])
  return (
    <div className="w-full my-6 bg-card text-card-foreground border border-card-border p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Player
            icon={ICON}
            ref={playerRef}
            size={20}
            onComplete={() => {
              setTimeout(() => {
                playerRef.current?.playFromBeginning();
              }, 800);
            }}
          />
          <p className="font-semibold text-sm">{toolName} is running...</p>
        </div>
      </div>
      <p className="text-xs mt-2 text-text-success">
        The tool {toolName} is currently processing your request.
      </p>
    </div>
  );
}

// Helper function to execute a dynamic tool from localStorage
const executeDynamicTool = async (toolName: string, args: any) => {
  try {
    // Retrieve tools from localStorage
    const storedToolsJson = localStorage.getItem('synto-tools');
    if (!storedToolsJson) {
      console.error('No tools found in localStorage');
      return `Error: No tools found in localStorage`;
    }

    const storedTools: StoredTool[] = JSON.parse(storedToolsJson);

    // Find the tool by name (normalize tool name for comparison)
    const normalizedToolName = toolName.replace(/\s+/g, '').toLowerCase();
    const tool = storedTools.find(t =>
      t.name.replace(/\s+/g, '').toLowerCase() === normalizedToolName
    );

    if (!tool) {
      console.error(`Tool "${toolName}" not found in localStorage`);
      return `Error: Tool "${toolName}" not found`;
    }

    console.log(`Executing tool: ${tool.name}`, args);

    // Create a function from the stored execution code
    // Create a parameter string from the arguments
    const paramNames = tool.parameters.map(p => p.name).join(', ');

    // Create the function with proper parameters
    const toolFunction = new Function(
      'params',
      `return (async ({ ${paramNames} }) => {
        ${tool.executionCode}
      })(params)`
    );

    // Execute the function with the provided arguments
    const result = await toolFunction(args);
    console.log(`Tool execution result for ${toolName}:`, result);

    return result || `Tool ${toolName} executed successfully`;
  } catch (error) {
    console.error(`Error executing tool ${toolName}:`, error);
    return `Error executing tool ${toolName}: ${error instanceof Error ? error.message : String(error)}`;
  }
};

// ---------------- MAIN COMPONENT ----------------
function ChatMessage({ message, isLast, isLoading, reload, addToolResult }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [pendingToolCalls, setPendingToolCalls] = useState<Set<string>>(new Set());

  // Process tool calls when they appear
  useEffect(() => {
    const processPendingToolCalls = async () => {
      if (!message.parts || !addToolResult) return;

      for (const part of message.parts) {
        if (part.type === 'tool-invocation') {
          const { toolCallId, toolName, state, args } = part.toolInvocation as any;

          // Only process tool calls that are in 'call' state and not already being processed
          if (state === 'call' && !pendingToolCalls.has(toolCallId)) {
            // Mark this tool call as being processed
            setPendingToolCalls(prev => new Set(Array.from(prev).concat(toolCallId)));

            try {
              // Execute the tool and get the result
              const result = await executeDynamicTool(toolName, args);

              // Send the result back to the chat
              addToolResult({ toolCallId, result: String(result) });

              // Remove this tool call from pending set
              setPendingToolCalls(prev => {
                const newSet = new Set(Array.from(prev));
                newSet.delete(toolCallId);
                return newSet;
              });
            } catch (error) {
              console.error(`Error executing tool ${toolName}:`, error);
              addToolResult({
                toolCallId,
                result: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`
              });

              // Remove this tool call from pending set
              setPendingToolCalls(prev => {
                const newSet = new Set(Array.from(prev));
                newSet.delete(toolCallId);
                return newSet;
              });
            }
          }
        }
      }
    };

    processPendingToolCalls();
  }, [message.parts, addToolResult, pendingToolCalls]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const renderParts = () => {
    return message.parts?.map((part, index) => {
      switch (part.type) {
        case "text":
          // Diviser le contenu texte par les délimiteurs de code Markdown
          const contentParts = part.text.split("```");
          return (
            <div key={index}>
              {contentParts.map((contentPart, contentIndex) =>
                contentIndex % 2 === 0 ? (
                  // Pour le texte normal (non-code), utiliser Markdown
                  <Markdown
                    key={contentIndex}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="my-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 -my-6" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="-my-2" {...props} />
                      ),
                      // Conserver le rendu pour le code inline
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: {
                        node: any
                        inline: boolean
                        className: string
                        children: any
                        [key: string]: any
                      }) {
                        // Si c'est du code inline (et non un bloc), on garde le rendu actuel
                        if (inline) {
                          return (
                            <code className="bg-accent text-accent-foreground px-1 py-0.5 rounded" {...props}>
                              {children}
                            </code>
                          );
                        }
                        // Les blocs de code seront gérés par le pattern avec ```
                        return null;
                      },
                      a: ({ node, href, children, ...props }) => {
                        const isMailTo = href?.startsWith("mailto:")
                        return (
                          <a
                            href={href}
                            className={`underline text-blue-500"
                              }`}
                            {...props}
                          >
                            {children}
                          </a>
                        )
                      },
                    }}
                  >
                    {contentPart}
                  </Markdown>
                ) : (
                  // Pour les blocs de code, utiliser CodeDisplayBlock
                  <pre className="whitespace-pre-wrap" key={contentIndex}>
                    <CodeDisplayBlock code={contentPart} />
                  </pre>
                )
              )}
            </div>
          );
        case "tool-invocation": {
          const { toolCallId, toolName, state, result, args } = part.toolInvocation as {
            toolCallId: string;
            toolName: string;
            state: string;
            result?: string;
            args?: any;
          };

          if (state === "partial-call") {
            return (
              <div key={`${toolCallId}-partial`} className="text-muted-foreground">
                <p className="text-sm">Preparing to run {toolName}...</p>
              </div>
            );
          }

          if (state === "call") {
            return (
              <div key={toolCallId}>
                <SendProcessCard toolName={toolName} />
                {args && (
                  <div className="text-xs mt-2 text-muted-foreground">
                    <p>Parameters: {JSON.stringify(args)}</p>
                  </div>
                )}
              </div>
            );
          }

          if (state === "result") {
            // Display complete card for successful tool execution
            return (
              <div key={toolCallId} className="mt-2">
                <SendCompleteCard result={String(result)} action={toolName} />
              </div>
            );
          }

          return null;
        }
        default:
          return null;
      }
    });
  };

  const renderActionButtons = () =>
    message.role === "assistant" && (
      <div className="pt-4 flex gap-1 items-center text-muted-foreground">
        {!isLoading && (
          <ButtonWithTooltip side="bottom" toolTipText="Copy">
            <Button onClick={handleCopy} variant="ghost" size="icon" className="h-4 w-4">
              {isCopied ? (
                <CheckIcon className="w-3.5 h-3.5 transition-all" />
              ) : (
                <CopyIcon className="w-3.5 h-3.5 transition-all" />
              )}
            </Button>
          </ButtonWithTooltip>
        )}
        {!isLoading && isLast && (
          <ButtonWithTooltip side="bottom" toolTipText="Regenerate">
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4"
              onClick={() => reload()}
            >
              <RefreshCcw className="w-3.5 h-3.5 scale-100 transition-all" />
            </Button>
          </ButtonWithTooltip>
        )}
      </div>
    );

  return (
    <motion.div {...MOTION_CONFIG} className="flex flex-col gap-2 whitespace-pre-wrap">
      <ChatBubble variant={message.role === "user" ? "sent" : "received"}>
        {message.role === "assistant" && (
          <ChatBubbleAvatar
            src={message.role === "assistant" ? "/blue_logo_bold.svg" : ""}
            width={6}
            height={6}
            className="object-contain"
          />
        )}
        <ChatBubbleMessage>
          {renderParts()}
          {renderActionButtons()}
        </ChatBubbleMessage>
      </ChatBubble>
    </motion.div>
  );
}

export default memo(
  ChatMessage,
  (prevProps, nextProps) => {
    if (nextProps.isLast) return false;
    return (
      prevProps.isLast === nextProps.isLast &&
      prevProps.message === nextProps.message
    );
  }
);