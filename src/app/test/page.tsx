"use client";

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import { MintPay } from "@/../mintPay/target/types/mint_pay";
import idl from "@/../mintPay/target/idl/mint_pay.json";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
// import { PublicKey } from '@metaplex-foundation/umi';
import { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";

export default function Test() {
	const wallet = useAnchorWallet();
	const { connection } = useConnection();
	const mint = async () => {
		if (!wallet) {
			toast.error("Please connect your wallet");
			return;
		}
		try {
			const provider = new AnchorProvider(connection, wallet, {
				commitment: "confirmed",
			});
			setProvider(provider);
			const program = new Program(idl as MintPay, provider);
			const asset = Keypair.generate();

			console.log("\nAsset address: ", asset.publicKey.toBase58());
			const tx = await program.methods
				.initializeMint("salut", "htpps://feur.com")
				.accountsStrict({
					user: wallet.publicKey,
					mint: asset.publicKey,
					systemProgram: SystemProgram.programId,
					mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d")
				})
				.signers([asset])
				.rpc();

			console.log(`Transaction signature: ${tx}`);
			toast.success(`Artist registered successfully!: ${tx}`);
		} catch (error: any) {
			console.error("Error initializing musician:", error);
			toast.error(`Failed to register artist: ${error.message}`);
		}
	}
	/*const [collection, setCollection] = useState<PublicKey | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const connection = new Connection("https://api.testnet.sonic.game", "confirmed");
	// Create UMI instance with all necessary plugins
	const umi = createUmi('https://api.devnet.solana.com')
		.use(mplCandyMachine())
		.use(walletAdapterIdentity(wallet))
		.use(mplCore()).use(mplTokenMetadata())

	const createCol = async () => {
		try {
			setLoading(true);
			setError(null);

			const collectionSigner = generateSigner(umi);

			console.log("Creating collection...");
			const tx = createCollection(umi, {
				collection: collectionSigner,
				name: 'My Collection',
				uri: 'https://example.com/my-collection.json',
			});

			await tx.sendAndConfirm(umi);
			setCollection(new PublicKey(collectionSigner.publicKey));
			console.log("Collection created: " + collectionSigner.publicKey.toString());
		} catch (err) {
			console.error("Error creating collection:", err);
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	}

	const createCandy = async () => {
		try {
			setLoading(true);
			setError(null);

			if (!collection) {
				throw new Error("Please create a collection first");
			}

			const candyMachine = generateSigner(umi);

			console.log("Creating candy machine...", candyMachine.publicKey.toString());
			const createIx = await create(umi, {
				candyMachine,
				collection: collection,
				collectionUpdateAuthority: umi.identity,
				itemsAvailable: 1000,
				authority: umi.identity.publicKey,
				isMutable: true,
			});

			await createIx.sendAndConfirm(umi);
			console.log("Candy Machine created: " + candyMachine.publicKey.toString());
		} catch (err) {
			console.error("Error creating candy machine:", err);
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	}

	// const Send = async () => {
	// 	try {
	// 		if (!wallet.publicKey || !wallet.signTransaction) {
	// 			throw new Error("Wallet non connecté");
	// 		}

	// 		const transaction = new Transaction().add(
	// 			SystemProgram.transfer({
	// 				fromPubkey: wallet.publicKey,
	// 				toPubkey: new PublicKey('E8fdgWzEcWh5EkXgXRHGFKEmYiXHXx8Tg9F2CCBvwRMX'),
	// 				lamports: 0.001 * 1e9, // Convertir SOL en lamports (1 SOL = 10⁹ lamports)
	// 			})
	// 		);
	// 		const { blockhash } = await connection.getLatestBlockhash();
	// 		transaction.recentBlockhash = blockhash;
	// 		transaction.feePayer = wallet.publicKey;

	// 		// Signer la transaction
	// 		const signedTransaction = await wallet.signTransaction(transaction);

	// 		// Envoyer la transaction signée
	// 		const signature = await connection.sendRawTransaction(signedTransaction.serialize());

	// 		// Attendre la confirmation
	// 		await connection.confirmTransaction(signature, 'confirmed');

	// 		console.log('Transaction envoyée avec succès:', signature);
	// 		return signature;
	// 	} catch (error) {
	// 		console.error("Erreur lors de l'envoi de SOL: ", error);
	// 		throw error;
	// 	}
	// }*/

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
				// onClick={createCandy}
				// disabled={loading || !collection}
				className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
			>
			</button>

			{/* <button onClick={Send}>Send money</button> */}
		</main>
	);
}