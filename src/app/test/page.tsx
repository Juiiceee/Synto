"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { toast } from "sonner"
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
// import { PublicKey } from '@metaplex-foundation/umi';
import { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";

export default function Test() {
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
	const mint = async () => {
		if (!wallet) {
			toast.error("Please connect your wallet");
			return;
		}
		try {
			const asset = Keypair.generate();
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), wallet.publicKey.toBuffer()],
				program.programId
			);
			const collectionData = await program.account.collection.fetch(collectionAccount);
			console.log("\nCollection address: ", collectionData.owner.toBase58());
			console.log("\nAsset address: ", asset.publicKey.toBase58());

			// Create the transaction promise
			const txPromise = program.methods
				.initializeMint("Soso", "htpps://caca.com")
				.accountsStrict({
					user: wallet.publicKey,
					mint: asset.publicKey,
					collection: new PublicKey(collectionData.owner),
					systemProgram: SystemProgram.programId,
					mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d")
				})
				.signers([asset])
				.rpc();

			// Use toast.promise with the promise, not the result
			toast.promise(txPromise, {
				loading: "Initializing mint...",
				success: `Mint initialized successfully!\nAsset address: ${asset.publicKey.toBase58()}`,
			});

			// Wait for the transaction to complete and get the signature
			const tx = await txPromise;
			console.log(`Transaction signature: ${tx}`);
		} catch (error: any) {
			console.error("Error initializing mint:", error);
			toast.error(`Failed to initialize mint: ${error.message}`);
		}
	}

	const checkCollection = async () => {
		try {
			// Récupérer l'adresse du compte collection
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), wallet.publicKey.toBuffer()],
				program.programId
			);

			// Essayer de récupérer le compte
			const collectionData = await program.account.collection.fetch(collectionAccount);
			console.log("Collection already initialized:", collectionData.owner.toBase58());
			return true;
		} catch (error) {
			console.log("Collection not initialized yet:", error.message);
			return false;
		}
	}

	const createCol = async () => {
		try {
			const [collectionAccount] = PublicKey.findProgramAddressSync(
				[Buffer.from("collection"), wallet.publicKey.toBuffer()],
				program.programId
			); const collection = Keypair.generate();
			console.log("\nCollection address: ", collectionAccount.toBase58());
			const txPromise = program.methods
				.initializeCollection("Zozo collection", "htpps://raphou.com")
				.accountsStrict({
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
		} catch (error: any) {
			console.error("Error initializing collection:", error);
			toast.error(`Failed to initialize collection: ${error.message}`);
		}
	}

	return (
		<main className="flex h-screen flex-col items-center justify-center gap-4">
			{/* {error && ( */}
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
				{/* {error} */}
			</div>
			{/* )} */}

			<button
				onClick={mint}
				// disabled={loading}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
			>
				mint a nft
				{/* {loading ? "Processing..." : "Create Collection"} */}
			</button>

			{/* <p>Collection: {collection ? collection.toString().slice(0, 10) + '...' : 'Not created yet'}</p> */}

			<button
				onClick={createCol}
				// disabled={loading || !collection}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				create collection
			</button>
			<button
				onClick={checkCollection}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
				check collection
			</button>

			{/* <button onClick={Send}>Send money</button> */}
		</main>
	);
}