"use client";
import MonacoEditor from "@monaco-editor/react";
import { useRef } from "react";


export default function App() {

	return (
		<MonacoEditor
		height="300px"
		defaultLanguage="typescript"
		defaultValue="// TypeScript code here..."
		theme="vs-dark"
		onChange={(value) => {
			console.log("Editor mounted:", value);
		}}
	  />
	);
}