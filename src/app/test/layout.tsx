"use client";
import { useRouter } from "next/navigation";
import "../globals.css";
import Header from "@/components/landing/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>)
{
	const router = useRouter();
	return (
		<div>
			<button className="bg-blue-500 text-white px-4 mr-4 py-2 rounded" onClick={() => {router.push("/test")}}>Test</button>
			<button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {router.push("/test/oui")}}>Oui</button>
			<Header />
			{children}
		</div>
	);
}
