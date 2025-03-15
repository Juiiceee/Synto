"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { toast } from "sonner"
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { mplCoreID } from "@/constants/ID";

export default function Test() {
	const wallet = useAnchorWallet();
	const [nameCollection, setNameCollection] = useState("");
	const [uriCollection, setUriCollection] = useState("");
	const [nameAsset, setNameAsset] = useState("");
	const [uriAsset, setUriAsset] = useState("");
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
					<>
						<input type="text" value={nameCollection} placeholder="Collection name" onChange={(e) => setNameCollection(e.target.value)} />
						<input type="text" value={uriCollection} placeholder="Collection uri" onChange={(e) => setUriCollection(e.target.value)} />
						<button
							onClick={createCol}
							className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
						>
							create collection
						</button>
					</>
				)
			}

			<button
				onClick={getAdmin}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				get admin</button>

			<button
				onClick={checkCollectionAccount}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				check collection account
			</button>
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