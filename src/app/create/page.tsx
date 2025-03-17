"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Trash2, Save, Edit, ClipboardCopy } from "lucide-react";
import { Input } from "@/components/ui/input";
import pinata from "@/providers/pinata";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonacoEditor from "@monaco-editor/react";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program, setProvider } from "@coral-xyz/anchor";

interface Attribute {
	trait_type: string;
	value: string | number;
  }
  
  interface Parameter {
	name: string;
	type: string;
	description: string;
	required: boolean;
  }
  
  interface TemplateData {
	name: string;
	description: string;
	image: string;
	attributes: Attribute[];
	parameters: Parameter[];
  }

interface Tool {
	id?: string;
	name: string;
	description: string;
	parameters: Parameter[];
	executionCode: string;
	nftPrice: string;
	imageUrl: string;
}

export const syncToolsToServer = async () => {
	try {
		// Get tools from localStorage
		const tools = localStorage.getItem('synto-tools');
		if (!tools) return;

		// Send tools to server
		await fetch('/api/tools', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: tools,
		});

		console.log('Tools synced to server successfully');
	} catch (error) {
		console.error('Failed to sync tools to server:', error);
	}
};


export default function ToolBuilder() {
	//const { toast } = useToast();
	const [tools, setTools] = useState<Tool[]>([]);
	const [currentToolId, setCurrentToolId] = useState<string | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [canUpload, setCanUpload] = useState(false);
	const router = useRouter();

	const [toolName, setToolName] = useState("");
	const [toolDescription, setToolDescription] = useState("");
	const [parameters, setParameters] = useState<Parameter[]>([]);
	const [executionCode, setExecutionCode] = useState("async ({ }) => {\n  // Your code here\n  \n}");
	const [nftPrice, setNftPrice] = useState("0.1");
	const [picture, setPicture] = useState<File | null>(null);
	const [pictureUrl, setPictureUrl] = useState("");
	const [url, setUrl] = useState("");

	// Load tools from localStorage on component mount
	useEffect(() => {
		const savedTools = localStorage.getItem("synto-tools");
		const savedUrl = localStorage.getItem("synto-url");
		if (savedUrl) {
			setUrl(savedUrl);
		}
		if (savedTools) {
			try {
				setTools(JSON.parse(savedTools));
			} catch (e) {
				console.error("Failed to parse saved tools", e);
			}
		}
	}, []);

	// Reset form when switching tools
	useEffect(() => {
		if (currentToolId) {
			const tool = tools.find(t => t.id === currentToolId);
			if (tool) {
				setToolName(tool.name);
				setToolDescription(tool.description);
				setParameters(tool.parameters);
				setExecutionCode(tool.executionCode);
				setNftPrice(tool.nftPrice);
				setIsEditing(true);
				setPictureUrl(tool.imageUrl);
			}
		} else {
			resetForm();
			setIsEditing(false);
		}
	}, [currentToolId, tools]);

	const resetForm = () => {
		setToolName("");
		setToolDescription("");
		setParameters([]);
		setExecutionCode("async ({ }) => {\n  // Your code here\n  \n}");
		setNftPrice("0.1");
	};

	const addParameter = () => {
		setParameters([
			...parameters,
			{
				name: "",
				type: "string",
				description: "",
				required: true,
			},
		]);
	};

	const updateParameter = (index: number, field: keyof Parameter, value: any) => {
		const updatedParameters = [...parameters];
		updatedParameters[index] = {
			...updatedParameters[index],
			[field]: value,
		};
		setParameters(updatedParameters);
	};

	const removeParameter = (index: number) => {
		const updatedParameters = [...parameters];
		updatedParameters.splice(index, 1);
		setParameters(updatedParameters);
	};

	const saveTool = async () => {
		// Basic validation
		if (!toolName.trim()) {
			toast.error("Tool name is required");
			return;
		}
		let pictureUrlIpfs = pictureUrl;

		if (picture) {
			const upload = await pinata.upload.public.file(picture).group("567b36f7-3a34-49f3-a215-039e02340bb4");
			console.log("https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + upload.cid);
			setPictureUrl("https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + upload.cid);
			pictureUrlIpfs = "https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + upload.cid;
		}

		const newTool: Tool = {
			id: isEditing ? currentToolId! : Date.now().toString(),
			name: toolName,
			description: toolDescription,
			parameters,
			executionCode,
			nftPrice,
			imageUrl: pictureUrlIpfs,
		};

		const uploadTool: TemplateData = {
			name: toolName,
			description: toolDescription,
			image: pictureUrlIpfs,
			attributes: [
				{
					trait_type: "number of parameters",
					value: parameters.length
				},
				{
					trait_type: "execution code",
					value: executionCode
				},
				{
					trait_type: "price (sol)",
					value: nftPrice
				}
			],
			parameters: parameters,
		};

		let updatedTools: Tool[];

		if (isEditing) {
			// Update existing tool
			updatedTools = tools.map(tool =>
				tool.id === currentToolId ? newTool : tool
			);
			toast.success(
				`${toolName} has been updated successfully.`);
		} else {
			// Add new tool
			updatedTools = [...tools, newTool];
			toast.success(`${toolName} has been created successfully.`);
		}

		setTools(updatedTools);
		localStorage.setItem("synto-tools", JSON.stringify(updatedTools));
		
		const oui = await pinata.upload.public.json(uploadTool).group("567b36f7-3a34-49f3-a215-039e02340bb4");
		localStorage.setItem("synto-url", oui.cid);
		setUrl(oui.cid);
		
		console.log("https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + oui.cid);
		// Sync tools to server
		syncToolsToServer();

		// TODO: Implement factory creation for NFT
		// This is where the factory contract would be created
		console.log("Factory contract creation would happen here");

		// Reset form and editing state
		resetForm();
		setCurrentToolId(null);
		setIsEditing(false);
	};

	const editTool = (id: string) => {
		setCurrentToolId(id);
	};

	const deleteTool = (id: string) => {
		const updatedTools = tools.filter(tool => tool.id !== id);
		setTools(updatedTools);
		localStorage.setItem("synto-tools", JSON.stringify(updatedTools));

		if (currentToolId === id) {
			setCurrentToolId(null);
			resetForm();
		}

		toast("The tool has been deleted successfully.");
	};

	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	if (!wallet) {
		toast.error("Please connect your wallet");
		return;
	}

	const provider = new AnchorProvider(connection, wallet, {
		commitment: "confirmed",
	});
	setProvider(provider);
	const program = new Program(idl as MintPay, provider);

	const createTemplate = async () => {
		try {
			const [templateAccount] = PublicKey.findProgramAddressSync(
				[
					Buffer.from("template"),
					Buffer.from(toolName),
					wallet.publicKey.toBuffer()
				],
				program.programId
			);

			console.log("Sending transaction with data:", {
				name: toolName,
				uri: "https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + url,
				price: new BN(Number(nftPrice) * 10 ** 9)
			});

			// Call the program method with the correct parameters
			const txPromise = program.methods
				.createTemplate(toolName, "https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + url, new BN(Number(nftPrice) * 10 ** 9))
				.accounts({
					user: wallet.publicKey,
					template: templateAccount,
					systemProgram: SystemProgram.programId,
				})
				.rpc();

			// Show toast for the transaction
			toast.promise(txPromise, {
				loading: "Creating template...",
				success: "Template created successfully!",
				error: "Failed to create template"
			});

			const tx = await txPromise;
			console.log(`Transaction signature: ${tx}`);
		} catch (error: any) {
			console.error("Error creating template:", error);
			toast.error(`Failed to create template: ${error.message}`);
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b border-border p-4">
				<div className="container flex items-center">
					<Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
						<ChevronLeft className="h-5 w-5" />
					</Button>
					<h1 className="text-xl font-bold">
						{isEditing ? "Edit Tool" : "New Tool"}
					</h1>
				</div>
			</header>

			<main className="container py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Left sidebar - Tool list */}
					<div className="md:col-span-1">
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">Your Tools</h2>

							<Button
								variant="outline"
								className="w-full justify-start"
								onClick={() => {
									setCurrentToolId(null);
									resetForm();
								}}
							>
								<Plus className="mr-2 h-4 w-4" />
								Create New Tool
							</Button>

							<div className="space-y-2">
								{tools.map((tool) => (
									<div
										key={tool.id}
										className={`flex items-center justify-between p-3 rounded-md ${currentToolId === tool.id ? "bg-secondary" : "bg-card hover:bg-secondary/50"
											} cursor-pointer`}
										onClick={() => editTool(tool.id)}
									>
										<div>
											<p className="font-medium">{tool.name}</p>
											<p className="text-sm text-muted-foreground">{tool.parameters.length} params</p>
										</div>
										<Button
											variant="ghost"
											size="icon"
											onClick={(e) => {
												e.stopPropagation();
												deleteTool(tool.id);
											}}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Main content - Tool editor */}
					<div className="md:col-span-2">
						<Card className="border-border bg-card">
							<CardContent className="p-6">
								<div className="space-y-6">
									{/* Tool name */}
									<div className="space-y-2">
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											placeholder="Name your tool"
											value={toolName}
											onChange={(e) => setToolName(e.target.value)}
											className="bg-background"
										/>
									</div>

									{/* Tool description */}
									<div className="space-y-2">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											placeholder="Add a short description about what this tool does"
											value={toolDescription}
											onChange={(e) => setToolDescription(e.target.value)}
											className="bg-background min-h-24"
										/>
									</div>
									{/* Tool picture */}
									<div className="space-y-2">
										<Label htmlFor="picture">Picture</Label>
										<Input id="picture" type="file" onChange={(e) => setPicture(e.target.files?.[0] || null)} accept="image/*" />
									</div>


									{/* Parameters */}
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<Label>Parameters</Label>
											<Button
												variant="outline"
												size="sm"
												onClick={addParameter}
											>
												<Plus className="h-4 w-4 mr-2" /> Add Parameter
											</Button>
										</div>

										{parameters.length === 0 ? (
											<div className="text-center p-4 border border-dashed border-border rounded-md">
												<p className="text-muted-foreground">No parameters added yet</p>
											</div>
										) : (
											<div className="space-y-4">
												{parameters.map((param, index) => (
													<div key={index} className="grid grid-cols-12 gap-4 p-4 border border-border rounded-md bg-background">
														{/* Parameter name */}
														<div className="col-span-12 md:col-span-3">
															<Label htmlFor={`param-name-${index}`} className="mb-2 block">Name</Label>
															<Input
																id={`param-name-${index}`}
																value={param.name}
																onChange={(e) => updateParameter(index, "name", e.target.value)}
																placeholder="name"
															/>
														</div>

														{/* Parameter type */}
														<div className="col-span-6 md:col-span-3">
															<Label htmlFor={`param-type-${index}`} className="mb-2 block">Type</Label>
															<Select
																value={param.type}
																onValueChange={(value) => updateParameter(index, "type", value)}
															>
																<SelectTrigger id={`param-type-${index}`}>
																	<SelectValue placeholder="Select type" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="string">String</SelectItem>
																	<SelectItem value="number">Number</SelectItem>
																	<SelectItem value="boolean">Boolean</SelectItem>
																	<SelectItem value="object">Object</SelectItem>
																	<SelectItem value="array">Array</SelectItem>
																</SelectContent>
															</Select>
														</div>

														{/* Required toggle */}
														<div className="col-span-6 md:col-span-3">
															<Label htmlFor={`param-required-${index}`} className="mb-2 block">Required</Label>
															<Select
																value={param.required ? "true" : "false"}
																onValueChange={(value) => updateParameter(index, "required", value === "true")}
															>
																<SelectTrigger id={`param-required-${index}`}>
																	<SelectValue placeholder="Required?" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="true">Yes</SelectItem>
																	<SelectItem value="false">No</SelectItem>
																</SelectContent>
															</Select>
														</div>

														{/* Remove button */}
														<div className="col-span-12 md:col-span-3 flex items-end justify-end">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => removeParameter(index)}
																className="text-destructive hover:text-destructive"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>

														{/* Parameter description */}
														<div className="col-span-12">
															<Label htmlFor={`param-desc-${index}`} className="mb-2 block">Description</Label>
															<Input
																id={`param-desc-${index}`}
																value={param.description}
																onChange={(e) => updateParameter(index, "description", e.target.value)}
																placeholder="Describe what this parameter does"
															/>
														</div>
													</div>
												))}
											</div>
										)}
									</div>

									{/* Execution code */}
									<div className="space-y-2">
										<Label htmlFor="execution-code">Function Code</Label>
										<div className="relative">
											<MonacoEditor
												height="300px"
												defaultLanguage="typescript"
												defaultValue={executionCode}
												onChange={(value) => setExecutionCode(value || "")}
												className="font-mono bg-background min-h-60 p-4"
												theme="vs-dark"
											/>
										</div>
									</div>

									{/* NFT Price */}
									<div className="space-y-2">
										<Label htmlFor="nft-price">NFT Price (Sol)</Label>
										<Input
											id="nft-price"
											type="number"
											min="0.01"
											step="0.01"
											value={nftPrice}
											onChange={(e) => setNftPrice(e.target.value)}
											className="bg-background"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="json-url">Tool JSON URL</Label>
										<div className="flex items-center gap-2">
											<Input
												id="json-url"
												value={`https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/${url || ''}`}
												readOnly
												className="bg-background flex-grow"
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													const urloui = `https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/${url || ''}`;
													navigator.clipboard.writeText(urloui);
													toast("URL copied to clipboard");
												}}
											>
												<ClipboardCopy className="h-4 w-4" />
											</Button>
										</div>
									</div>

									{/* Action buttons */}
									<div className="flex justify-end space-x-4">
										<Button
											variant="outline"
											onClick={resetForm}
										>
											Cancel
										</Button>
										<Button
											onClick={saveTool}
										>
											<Save className="mr-2 h-4 w-4" />
											{isEditing ? "Update Tool" : "Save Tool"}
										</Button>
										<Button
											onClick={createTemplate}
										>
											<Save className="mr-2 h-4 w-4" />
											Create Template
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}