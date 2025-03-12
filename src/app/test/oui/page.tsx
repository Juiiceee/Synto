"use client";
import { useState } from "react";
import pinata from "@/providers/pinata";

export default function App() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
	});

	const [parameters, setParameters] = useState([
		{ name: "", type: "", description: "", required: false },
	]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleChangeParameter = (index, e) => {
		const newParameters = [...parameters];
		newParameters[index][e.target.name] = e.target.value;
		setParameters(newParameters);
	};

	const addParameter = () => {
		setParameters([...parameters, { name: "", type: "", description: "", required: false }]);
	};

	const removeParameter = (index) => {
		const newParameters = parameters.filter((_, i) => i !== index);
		setParameters(newParameters);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const jsonData = {
			name: formData.name,
			description: formData.description,
			price: formData.price,
			parameters
		};
		console.log(JSON.stringify(jsonData, null, 2)); // Affiche le JSON formaté
	};

	const sendIpfs = async () => {
		const jsonData = {
			name: formData.name,
			description: formData.description,
			price: formData.price,
			parameters
		};
		const upload = await pinata.upload.public.json({
			content: jsonData,
		}).group("567b36f7-3a34-49f3-a215-039e02340bb4");
		console.log("https://plum-accurate-bobcat-724.mypinata.cloud/ipfs/" + upload.cid);
	};


	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" placeholder="Nom" onChange={handleChange} />
				<input type="text" name="description" placeholder="Description" onChange={handleChange} />
				<input type="text" name="price" placeholder="Prix" onChange={handleChange} />
				{parameters.map((param, index) => (
					<div key={index}>
						<input
							type="text"
							name="name"
							placeholder="Nom"
							value={param.name}
							onChange={(e) => handleChangeParameter(index, e)}
						/>
						<input
							type="text"
							name="type"
							placeholder="Type"
							value={param.type}
							onChange={(e) => handleChangeParameter(index, e)}
						/>
						<textarea
							name="description"
							placeholder="Description"
							value={param.description}
							onChange={(e) => handleChangeParameter(index, e)}
						></textarea>
						<input
							type="checkbox"
							name="required"
							onChange={(e) => {
								const newParameters = [...parameters];
								newParameters[index]["required"] = e.target.checked;
								setParameters(newParameters);
							}}
						/>
						Is required<br />
						<button type="button" onClick={() => removeParameter(index)}>Supprimer</button>
					</div>
				))}
				<button type="button" onClick={addParameter}>Ajouter un paramètre</button>
				<button type="submit">Convertir en JSON</button>
			</form>
			<pre>{JSON.stringify({
				name: formData.name,
				description: formData.description,
				price: formData.price,
				parameters
			}, null, 2)}</pre>
			<button onClick={sendIpfs}>Envoyer sur IPFS</button>
		</div>
	);
}