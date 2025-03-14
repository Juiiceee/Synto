import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { askForConfirmation } from "./tools/askForConfirmation";
import { getLocation } from "./tools/getLocation";
import { createOllama } from "ollama-ai-provider";
import { send } from "./tools/send";
import { convert } from "./tools/convert";
import { getAvaxBalance } from "./tools/getAvaxBalance";
import { swap } from "./tools/swap";
import { get } from "lodash";
import { getWeather } from "./tools/getWeather";

import { loadDynamicTools } from "./util/toolManagers";

export const maxDuration = 30;

const LOCAL_MODELS = {
	"llama": "llama3.1:latest",
	"mistral": "mistral:latest",
	"deepseek": "deepseek-r1:8b",
}

//const systemPrompt = {
//	role: "system",
//	content: `
//	You are an AI-powered assistant, built during the Sonic Hackathon 2025. You specialize in DeFi, cross-chain operations, and AI-driven automation. Your job is to help users execute financial actions efficiently and safely using available tools.
//	NEVER ask the permission to execute tools, use the askForConfirmation tool to do so. For checking the user's balance, you don't need to ask for confirmation.

//	Tone & Interaction Style
//	ou must approach the task as if you were conversing with your closest friend. Feel free to use familiar terms like \"bro\" or \"yo\" but don't use emojis. Your goal is to make the user feel comfortable and confident in your abilities.
//	Always confirm before executing any risky actions (e.g., transactions, swaps, or bridges).
//	If a feature isn’t available, just let the user know instead of making something up.
//	Capabilities & Actions You Can Perform:
//	DeFi Position Management

//	Execute swaps, bridges, staking, and liquidity provision via natural language commands.
//	Manage yield farming positions.
//	Perform safety checks and show transaction previews before execution.
//	Cross-Chain Migration Assistant

//	Automate bridging and swapping across chains while optimizing gas fees.
//	Find the best execution paths to ensure seamless transfers.
//	Core Actions You Can Handle
//	Send (transfer assets)
//	Convertion (exchange assets)
//	Swap (exchange tokens)
//	Bridge (move assets between chains) - not implemented yet
//	Stake (earn rewards by locking assets) - not implemented yet
//	`
//};
const systemPrompt = {
	role: "system",
	content: `
	You are an AI-powered assistant, built during the Sonic Hackathon 2025. You specialize in DeFi, cross-chain operations, and AI-driven automation. Your job is to help users execute available tools.
	`
};


const selectedLocalModel = LOCAL_MODELS["llama"];

export async function POST(req: Request) {
	try {
		const { messages, isLocal } = await req.json();
		console.log("[CHAT-API] Incoming messages:", messages);
		console.log('isLocal:', isLocal);
		
		messages.unshift(systemPrompt);

		const staticTools = {
			//askForConfirmation,
			//send,
			//convert,
			//getAvaxBalance,
			//swap,
			//getLocation,
			//getWeather,
		};

		// Load dynamic tools from localStorage
		const dynamicTools = loadDynamicTools();

		// Merge static and dynamic tools
		const tools = {
			...staticTools,
			...dynamicTools
		};

		// Log available tools for debugging
		console.log("Available tools:", Object.keys(tools));




		let result;

		if (!isLocal) {
			result = streamText({
				model: openai("gpt-4o-mini"),
				messages,
				tools,
				maxSteps: 5,
			});
		} else {
			const ollama = createOllama({ baseURL: process.env.OLLAMA_URL + "/api" });
			result = streamText({
				model: ollama(selectedLocalModel, { simulateStreaming: true }),
				messages,
				tools,
				maxSteps: 5,
			});
		}

		return result.toDataStreamResponse({
			getErrorMessage: (error) => {
				console.error("ERREUR AVEC LE STREAMING DE LA RESPONSE API CALL:", error);
				return "An error occurred during the API call.";
			},
		});
	} catch (err) {
		console.error("ERREUR PLUS GLOBALE", err);
		return new Response("Internal Server Error", { status: 500 });
	}
}
