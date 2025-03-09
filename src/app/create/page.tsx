"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderCreate from "@/components/create/HeaderCreate";
import "../globals.css";

export default function Create() {
	const [title, setTitle] = useState<string>("");
	const questions = [
		"Est ce que Tokoum est un chien ?",
		"Comment conjuguer le verbe Feur?"
	];

	return (
		<div>
			<HeaderCreate title={title} />
			<div className="min-h-screen bg-background">
				{/* Main Content */}
				<div className="max-w-6xl mx-auto p-6">
					<Tabs defaultValue="create" className="mb-8">
						<TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent" color="indigo">
							<TabsTrigger
								value="create"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
							>
								Create
							</TabsTrigger>
							<TabsTrigger
								value="configure"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
							>
								Configure
							</TabsTrigger>
							<TabsTrigger
								value="preview"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
							>
								Preview
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Left Panel */}
						<div className="space-y-6">
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium mb-1.5 block">Name</label>
									<Input placeholder="IFRS Advisor" className="bg-secondary border-0" />
								</div>

								<div>
									<label className="text-sm font-medium mb-1.5 block">Description</label>
									<Input
										placeholder="Expert in IFRS, aiding in financial reporting and compliance"
										className="bg-secondary border-0"
									/>
								</div>

								<div>
									<label className="text-sm font-medium mb-1.5 block">Instructions</label>
									<Textarea
										className="min-h-[200px] bg-secondary border-0"
										placeholder="Your role is to assist accountants and auditors..."
									/>
								</div>

								<div>
									<label className="text-sm font-medium mb-1.5 block">Conversation starters</label>
									<div className="space-y-2">
										{questions.map((question, index) => (
											<div key={index} className="flex items-center gap-2">
												<Input defaultValue={question} className="bg-secondary border-0" />
												<Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
													×
												</Button>
											</div>
										))}
										<Button variant="outline" className="w-full">Add conversation starter</Button>
									</div>
								</div>

								<div>
									<h3 className="text-sm font-medium mb-1.5">Knowledge</h3>
									<Button variant="outline" className="w-full">Upload files</Button>
								</div>

								{/* <div>
									<h3 className="text-sm font-medium mb-1.5">Capabilities</h3>
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Checkbox id="web" defaultChecked />
											<label htmlFor="web" className="text-sm">Web Browsing</label>
										</div>
										<div className="flex items-center gap-2">
											<Checkbox id="dalle" defaultChecked />
											<label htmlFor="dalle" className="text-sm">DALL·E Image Generation</label>
										</div>
										<div className="flex items-center gap-2">
											<Checkbox id="code" defaultChecked />
											<label htmlFor="code" className="text-sm">Code Interpreter</label>
										</div>
									</div>
								</div> */}
							</div>
						</div>

						{/* Right Panel - Preview */}
						<div className="bg-secondary/50 rounded-lg p-6">
							<div className="flex items-center gap-4 mb-8">
								<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
									<img src="/placeholder.jpg" alt="IFRS Advisor" className="h-full w-full rounded-full object-cover" />
								</div>
								<div>
									<h2 className="text-xl font-semibold">IFRS Advisor</h2>
									<p className="text-sm text-muted-foreground">Expert in IFRS, aiding in financial reporting and compliance</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-2 mt-4">
								{questions.map((question, index) => (
									<Button
										key={index}
										variant="secondary"
										className="h-auto py-2 px-4 text-left justify-start font-normal"
									>
										{question}
									</Button>
								))}
							</div>

							<div className="relative mt-4">
								<Input
									placeholder="Message IFRS Advisor..."
									className="bg-background/50 border-0"
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-center mt-6">
						<Button>Save</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
