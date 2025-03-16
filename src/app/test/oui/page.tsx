"use client";
import MonacoEditor from "@monaco-editor/react";
import { toast } from "sonner";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRef, useState, useEffect } from "react";
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { mplCoreID } from "@/constants/ID";


// Template data interface
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

export default function App() {
	const wallet = useAnchorWallet();
	const [templates, setTemplates] = useState<any[]>([]);
	const [templateDataMap, setTemplateDataMap] = useState<Map<string, TemplateData>>(new Map());
	const [loading, setLoading] = useState(false);
	const { connection } = useConnection();

	// Initialize program when wallet is connected
	const program = useRef<Program<MintPay> | null>(null);

	useEffect(() => {
		if (!wallet) return;

		const provider = new AnchorProvider(connection, wallet, {
			commitment: "confirmed",
		});

		setProvider(provider);
		program.current = new Program(idl as MintPay, provider);
	}, [wallet, connection]);

	// Fetch templates when program is initialized
	useEffect(() => {
		if (program.current) {
			checkTemplate();
		}
	}, [program.current]);

	// Fetch template data when templates change
	useEffect(() => {
		if (templates.length > 0) {
			fetchAllTemplateData();
		}
	}, [templates]);

	const getAdmin = (): PublicKey => {
		if (!program.current) {
			throw new Error("Program not initialized");
		}
		
		const [admin] = PublicKey.findProgramAddressSync(
			[Buffer.from("admin")],
			program.current.programId
		);
		console.log("Admin address:", admin.toBase58());
		return admin;
	}

	const fetchTemplateData = async (uri: string): Promise<TemplateData | null> => {
		try {
			const response = await fetch(uri);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const jsonData = await response.json();
			console.log("Template data from URI:", jsonData);
			return jsonData as TemplateData;
		} catch (error) {
			console.error("Error fetching template data:", error);
			return null;
		}
	}

	const fetchAllTemplateData = async () => {
		if (!templates || templates.length === 0) return;
		
		setLoading(true);
		const newDataMap = new Map<string, TemplateData>();
		
		try {
			for (const template of templates) {
				const uri = template.account.uri;
				const data = await fetchTemplateData(uri);
				if (data) {
					newDataMap.set(template.publicKey.toString(), data);
				}
			}
			
			setTemplateDataMap(newDataMap);
		} catch (error) {
			console.error("Error fetching all template data:", error);
		} finally {
			setLoading(false);
		}
	}

	const checkTemplate = async () => {
		if (!program.current) return;
		
		setLoading(true);
		try {
			const data = await program.current.account.template.all();
			console.log("Templates:", data);
			setTemplates(data);
		} catch (error) {
			console.error("Error checking templates:", error);
		} finally {
			setLoading(false);
		}
	}

	const mint = async (nameTemplate: string, creatorAsset: string) => {
		if (!program.current || !wallet) return;
		try {
			const asset = Keypair.generate();
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection")],
				program.current.programId
			);

			const [templatePda] = PublicKey.findProgramAddressSync(
				[
					Buffer.from("template"),
					Buffer.from(nameTemplate),
					new PublicKey(creatorAsset).toBuffer()
				],
				program.current.programId
			);
			console.log("\nTemplate address: ", templatePda.toBase58());
			// Utiliser le type any pour éviter les erreurs de typage
			const collectionData = await program.current.account.collection.fetch(collectionAccount) as any;
			console.log("\nCollection address: ", collectionData.collectionAddress.toBase58());
			console.log("\nAsset address: ", asset.publicKey.toBase58());

			// Create the transaction promise
			const admin = getAdmin();

			const txPromise = program.current.methods
				.initializeMint()
				.accounts({
					user: wallet.publicKey,
					recipient: new PublicKey("JuijdHQrGSBo9MZ7CXppdBF4jKd9DbzpSLSGnrXHR7G"),  // Pour future utilisation
					mint: asset.publicKey,
					template: templatePda,
					metaplexCollection: collectionData.collectionAddress,
					admin: admin,  // PDA admin pour signer
					systemProgram: SystemProgram.programId,
					mplCoreProgram: mplCoreID
				})
				.signers([asset])
				.rpc();

			// Show toast for the transaction
			toast.promise(txPromise, {
				loading: "Minting NFT...",
				success: "NFT minted successfully!",
				error: "Failed to mint NFT"
			});

			const tx = await txPromise;
			console.log(`Transaction signature: ${tx}`);
		} catch (error: any) {
			console.error("Error minting NFT:", error);
			toast.error(`Failed to mint NFT: ${error.message}`);
		}
	}

	const templatePrint = () => {
		if (loading) {
			return <div>Loading templates...</div>;
		}
		
		return (templates && templates.length > 0 ? templates.map((template: any) => {
			const templateData = templateDataMap.get(template.publicKey.toString());
			console.log("Template data for rendering:", templateData);
			
			return (
				<div key={template.publicKey.toString()} className="border p-4 my-4">
					<h1>Name: {template.account.name}</h1>
					<p>Uri: {template.account.uri}</p>
					<p>Price: {template.account.price ? template.account.price.toString() + " (" + template.account.price / 10 ** 9 + " SOL)" : "N/A"}</p>
					<p>Creator: {template.account.creator.toBase58()}</p>
					
					{templateData ? (
						<>
							<div className="my-2">
								<p>Image:</p>
								<a href={templateData.image} target="_blank" rel="noopener noreferrer">
									<img
										src={templateData.image}
										alt={templateData.name}
										className="h-auto max-h-48 object-contain my-2 rounded"
									/>
								</a>
							</div>
							<p>Description: {templateData.description}</p>
							
							<div className="mt-4">
								<h3 className="font-semibold">Attributes</h3>
								<ul className="list-disc pl-5">
									{templateData.attributes.map((attr, index) => (
										<li key={index}>
											{attr.trait_type}: {attr.value}
										</li>
									))}
								</ul>
							</div>
							
							<div className="mt-4">
								<h3 className="font-semibold">Parameters</h3>
								<ul className="list-disc pl-5">
									{templateData.parameters.map((param, index) => (
										<li key={index}>
											<strong>{param.name}</strong> ({param.type})
											<p className="text-sm">{param.description}</p>
											<p className="text-xs">Required: {param.required ? "Yes" : "No"}</p>
										</li>
									))}
								</ul>
							</div>
						</>
					) : (
						<p>Loading template data...</p>
					)}
					
					<p>Price: {template.account.price ? template.account.price.toString() + " (" + template.account.price / 10 ** 9 + " SOL)" : "N/A"}</p>
					<p>Address: {template.publicKey.toString()}</p>
					<div className="flex justify-center mt-4">
						<Button className="mr-4" onClick={() => console.log("Template:", template)}> View Details</Button>
						<Button className="mr-4" onClick={() => mint(template.account.name, template.account.creator.toBase58())}> Mint</Button>
					</div>
				</div>
			);
		}) : "Aucun template disponible");
	};
	return (
		<div>
			<div className="flex justify-center mt-4">
				<Button className="mr-4" onClick={fetchAllTemplateData}>Fetch Template Data</Button>
				<Button onClick={checkTemplate}>Check</Button>
			</div>
			{templatePrint()}
		</div>
	);
}