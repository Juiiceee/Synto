"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { toast } from "sonner"
import { AnchorProvider, BN, Program, setProvider } from "@coral-xyz/anchor";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { mplCoreID } from "@/constants/ID";
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';

interface Attribute {
	numberOfParameters: number;
	executionCode: string;
	price: BN;
}

interface Parameter {
	nameParameter: string;
	descriptionParameter: string;
	required: boolean;
	style: string;
}

export default function Test() {
	const wallet = useAnchorWallet();
	const [nameCollection, setNameCollection] = useState("");
	const [uriCollection, setUriCollection] = useState("");
	const [nameAsset, setNameAsset] = useState("");
	const [uriAsset, setUriAsset] = useState("");
	const [nameTemplate, setNameTemplate] = useState("Token Listing");
	const [descriptionTemplate, setDescriptionTemplate] = useState("Create a token listing to allow users to trade your tokens on decentralized exchanges. Specify parameters like token name, symbol, and initial supply.");
	const [imageTemplate, setImageTemplate] = useState("https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/bafkreiaqa27tnhodt5iwku4aim6xtf7qrj4ltcjt553bqkl3hks7ogntaa");
	const [numberOfParameters, setNumberParameters] = useState<number>(1);
	const [executionCode, setExecutionCode] = useState<string>("async ({ }) =\u003E {\n  // Your code here\n  \n}");
	const [price, setPrice] = useState<BN>(new BN(1));
	const [nameParameter, setNameParameter] = useState<string>("Token Name");
	const [descriptionParameter, setDescriptionParameter] = useState<string>("Le nom du token");
	const [required, setRequired] = useState<boolean>(true);
	const [style, setStyle] = useState<string>("string");
	const [collectionPublicKey, setCollectionPublicKey] = useState<string | null>(null);

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

	const getAdmin = (): PublicKey => {
		const [admin] = PublicKey.findProgramAddressSync(
			[Buffer.from("admin")],
			program.programId
		);
		console.log("Admin address:", admin.toBase58());
		return admin;
	}

	const createTemplate = async () => {
		try {
			const [templateAccount] = PublicKey.findProgramAddressSync(
				[
					Buffer.from("template"),
					Buffer.from(nameTemplate),
					wallet.publicKey.toBuffer()
				],
				program.programId
			);

			// Define the attribute object with proper field names
			const attribut = {
				numberOfParameters: numberOfParameters,
				executionCode: executionCode,
				price: new BN(price * 10**9)
			};

			// Define the parameter object
			const parameter = {
				nameParameter: nameParameter,
				descriptionParameter: descriptionParameter,
				required: required,
				style: style
			};

			console.log("Sending transaction with data:", {
				name: nameTemplate,
				description: descriptionTemplate,
				image: imageTemplate,
				attribut,
				parameter
			});

			// Call the program method with the correct parameters
			const txPromise = program.methods
				.createTemplate(nameTemplate, descriptionTemplate, imageTemplate, attribut, parameter)
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

	const checkTemplate = async () => {
		const data = await program.account.template.all();
		console.log("Templates:", data);
	}

	const mint = async () => {
		try {
			const asset = Keypair.generate();
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection")],
				program.programId
			);
			// Utiliser le type any pour éviter les erreurs de typage
			const collectionData = await program.account.collection.fetch(collectionAccount) as any;
			console.log("\nCollection address: ", collectionData.collectionAddress.toBase58());
			console.log("\nAsset address: ", asset.publicKey.toBase58());

			// Create the transaction promise
			const admin = getAdmin();

			const txPromise = program.methods
				.initializeMint(nameAsset, uriAsset)
				.accounts({
					user: wallet.publicKey,
					recipient: new PublicKey("JuijdHQrGSBo9MZ7CXppdBF4jKd9DbzpSLSGnrXHR7G"),  // Pour future utilisation
					mint: asset.publicKey,
					collection: collectionAccount,
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

	const getCollectionAccount = async () => {
		const [collectionAccount] = PublicKey.findProgramAddressSync(
			[Buffer.from("collection")],
			program.programId
		);
		const collectionData = await program.account.collection.fetch(collectionAccount);
		if (collectionData.collectionAddress.toBase58() !== null) {
			return collectionData;
		}
		return null;
	}

	const checkCollectionAccount = async () => {
		const [collectionAccount] = PublicKey.findProgramAddressSync(
			[Buffer.from("collection")],
			program.programId
		);
		try {
			const collectionData = await program.account.collection.fetch(collectionAccount);
			// console.log("collection:", collectionData.collectionAddress.toBase58());
			console.log("AddressCollection:\n", collectionData.collectionAddress.toBase58());
			setCollectionPublicKey(collectionData.collectionAddress.toBase58());
		} catch (error) {
			console.log("Collection not initialized yet:", error.message);
		}
	}


	const createCol = async () => {
		try {
			if (await getCollectionAccount() !== null) {
				toast.error("Collection already created :\n" + (await getCollectionAccount())?.collectionAddress.toBase58());
				setCollectionPublicKey((await getCollectionAccount())?.collectionAddress.toBase58() ?? '');
				return;
			}
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection")],
				program.programId
			);
			const admin = getAdmin();
			const collection = Keypair.generate();
			console.log("\nCollection address: ", collectionAccount.toBase58());
			const txPromise = program.methods
				.initializeCollection(nameCollection, uriCollection)
				.accounts({
					user: wallet.publicKey,
					admin: admin,
					collectionAccount: collectionAccount,
					collection: collection.publicKey,
					systemProgram: SystemProgram.programId,
					mplCoreProgram: mplCoreID
				})
				.signers([collection])
				.rpc();

			toast.promise(txPromise, {
				loading: "Initializing collection...",
				success: "Collection initialized successfully!"
			});
			const tx = await txPromise;
			console.log(`Transaction signature: ${tx}`);
			setCollectionPublicKey(collection.publicKey.toString());
		} catch (error: any) {
			console.error("Error initializing collection:", error);
			toast.error(`Failed to initialize collection: ${error.message}`);
		}
	}

	return (
		<main className="flex h-screen flex-col items-center justify-center gap-4">
			{
				collectionPublicKey === null && (
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Create your collection</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<Input type="text" value={nameCollection} placeholder="Collection name" onChange={(e) => setNameCollection(e.target.value)} />
							<Input type="text" value={uriCollection} placeholder="Collection uri" onChange={(e) => setUriCollection(e.target.value)} />
							<Button
								onClick={createCol}
								className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
							>
								create collection
							</Button>
							<Button
								onClick={checkCollectionAccount}
								className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
							>
								check collection account
							</Button>
						</CardContent>
					</Card>
				)}
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Create your template</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Input type="text" value={nameTemplate} placeholder="Template name" onChange={(e) => setNameTemplate(e.target.value)} />
					<Textarea 
						value={descriptionTemplate}
						placeholder="Template description"
						onChange={(e) => setDescriptionTemplate(e.target.value)}
						className="min-h-[100px]"
					/>
					<Input type="text" value={imageTemplate} placeholder="Template image" onChange={(e) => setImageTemplate(e.target.value)} />
					<Label>Number of parameters</Label>
					<Input type="number" value={numberOfParameters} placeholder="Number of parameters" onChange={(e) => setNumberParameters(Number(e.target.value))} />
					<Input type="text" value={executionCode} placeholder="Execution code" onChange={(e) => setExecutionCode(e.target.value)} />
					<Label>Price</Label>
					<Input type="number" value={price} placeholder="Price" onChange={(e) => setPrice(new BN(Number(e.target.value)))} />
					<Input type="text" value={nameParameter} placeholder="Parameter name" onChange={(e) => setNameParameter(e.target.value)} />
					<Input type="text" value={descriptionParameter} placeholder="Parameter description" onChange={(e) => setDescriptionParameter(e.target.value)} />
					<Label>Required</Label>
					<Input type="checkbox" onChange={(e) => setRequired(e.target.checked)} />
					<Input type="text" value={style} placeholder="Parameter style" onChange={(e) => setStyle(e.target.value)} />
					<Button
						onClick={createTemplate}
						className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
					>
						create template
					</Button>
				</CardContent>
			</Card>
			<button
				onClick={getAdmin}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				get admin</button>
			<button
				onClick={checkTemplate}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				check template</button>

			<input type="text" value={nameAsset} placeholder="Asset name" onChange={(e) => setNameAsset(e.target.value)} />
			<input type="text" value={uriAsset} placeholder="Asset uri" onChange={(e) => setUriAsset(e.target.value)} />
			<button
				onClick={mint}
				// disabled={loading}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
			>
				mint a nft
				{/* {loading ? "Processing..." : "Create Collection"} */}
			</button>

			<p>Collection: {collectionPublicKey ?? 'Not created yet'}</p>
		</main>
	);
}