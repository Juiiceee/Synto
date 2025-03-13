"use client";
import MonacoEditor from "@monaco-editor/react";
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRef, useState } from "react";
import { AnchorProvider, Program, setProvider, BN } from "@coral-xyz/anchor";
import { Counter } from "./counter";
import idl from "./counter.json";
import { Keypair, SystemProgram } from "@solana/web3.js";

export default function App() {
	const wallet = useAnchorWallet();
	const [price, setPrice] = useState(0);
	const { connection } = useConnection();
	if (!wallet) {
		return;
	}
	const provider = new AnchorProvider(connection, wallet, {
		commitment: "confirmed",
	});
	setProvider(provider);
	const program = new Program(idl as Counter, provider);
	const initialize = async () => {
		const counter = Keypair.generate();
		const txPromise = await program.methods
			.initialize(new BN(price))
			.accounts({
				counter: counter.publicKey,
				signer: wallet.publicKey,
				systemProgram: SystemProgram.programId
			})
			.signers([counter])
			.rpc();
		console.log(`Transaction signature: ${txPromise}`);
	}
	const check = async () => {
		try {
			// Use getAccounts() instead of directly accessing counter
			const accounts = await program.account.counter.all();
			console.log(`Found ${accounts[0].account.data} counter accounts`);
			accounts.forEach((account: any) => {
				console.log(`Counter: ${account.publicKey.toString()}, Data: ${account.account.data.toString()}`);
			});
		} catch (error) {
			console.error("Error fetching accounts:", error);
		}
	}
	return (
		<div>
			<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
			<button onClick={initialize}>Initialize</button>
			<button onClick={check}>Check</button>
		</div>
	);
}