"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { toast } from "sonner"
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, Transaction, SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from "@solana/web3.js";

export default function Test() {
	const wallet = useAnchorWallet();
	const [price, setPrice] = useState(0);
	const [nameCollection, setNameCollection] = useState("");
	const [uriCollection, setUriCollection] = useState("");
	const [publicKey, setPublicKey] = useState("");
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
	const mint = async () => {
		try {
			const asset = Keypair.generate();
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), Buffer.from(nameCollection), new PublicKey(publicKey).toBuffer()],
				program.programId
			);
			// Utiliser le type any pour éviter les erreurs de typage
			const collectionData = await program.account.collection.fetch(collectionAccount) as any;
			console.log("\nCollection address: ", collectionData.collectionAddress.toBase58());
			console.log("\nAsset address: ", asset.publicKey.toBase58());

			// Create the transaction promise
			const txPromise = program.methods
				.initializeMint()
				.accountsStrict({
					user: wallet.publicKey,
					recipient: new PublicKey(publicKey),
					mint: asset.publicKey,
					collection: collectionAccount,
					metaplex_collection: collectionData.collectionAddress,
					systemProgram: SystemProgram.programId,
					mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d")
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

	const checkCollection = async () => {
		try {
			// Récupérer l'adresse du compte collection
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), Buffer.from(nameCollection), wallet.publicKey.toBuffer()],
				program.programId
			);

			// Vérifier si le compte existe déjà
			const collectionData = await program.account.collection.fetch(collectionAccount) as any;
			console.log("Collection already initialized:", collectionData.collectionAddress.toBase58());
			return true;
		} catch (error) {
			console.log("Collection not initialized yet:", error.message);
			return false;
		}
	}

	const checkCollectionAccount = async () => {
		const [collectionAccount] = PublicKey.findProgramAddressSync(
			[Buffer.from("collection"), Buffer.from(nameCollection), wallet.publicKey.toBuffer()],
			program.programId
		);
		try {
			const collectionData = await program.account.collection.fetch(collectionAccount) as any;
			// console.log("collection:", collectionData.collectionAddress.toBase58());
			console.log("Collection:\n AdressCollection: ", collectionData.collectionAddress.toBase58(), "\n Price: ", collectionData.price.toString(), "\n name: ", collectionData.name, "\n uri: ", collectionData.uri);
		} catch (error) {
			console.log("Collection not initialized yet:", error.message);
		}
	}
	const createCol = async () => {
		try {
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), Buffer.from(nameCollection), wallet.publicKey.toBuffer()],
				program.programId
			);
			const collection = Keypair.generate();
			console.log("\nCollection address: ", collectionAccount.toBase58());
			const txPromise = program.methods
				.initializeCollection(nameCollection, uriCollection, new BN(price))
				.accounts({
					user: wallet.publicKey,
					collectionAccount: collectionAccount,
					collection: collection.publicKey,
					systemProgram: SystemProgram.programId,
					mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d")
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

	const getAdmin = async () => {
		const [admin] = PublicKey.findProgramAddressSync(
			[Buffer.from("admin")],
			program.programId
		);
		console.log("Admin address:", admin.toBase58());
	}

		return (
			<main className="flex h-screen flex-col items-center justify-center gap-4">
				<input type="text" value={nameCollection} placeholder="Collection name" onChange={(e) => setNameCollection(e.target.value)} />
				<input type="text" value={uriCollection} placeholder="Collection uri" onChange={(e) => setUriCollection(e.target.value)} />
				<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
				<button
					onClick={createCol}
					className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
				>
					create collection
				</button>

				<button
					onClick={getAdmin}
					className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
				>
					get admin</button>

				<button
					onClick={checkCollection}
					className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
				>
					check collection
				</button>
				<button
					onClick={checkCollectionAccount}
					className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
				>
					check collection account
				</button>
				<input type="text" value={publicKey} placeholder="Collection address" onChange={(e) => setPublicKey(e.target.value)} />
				<button
					onClick={mint}
					// disabled={loading}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
				>
					mint a nft
					{/* {loading ? "Processing..." : "Create Collection"} */}
				</button>

				<p>Collection: {collectionPublicKey ? collectionPublicKey.slice(0, 10) + '...' : 'Not created yet'}</p>

				{/* <button onClick={Send}>Send money</button> */}
			</main>
		);
	}