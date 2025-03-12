"use client";
import { useState } from "react";

export default function App() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
    });

    const [parameters, setParameters] = useState([
        { name: "", type: "", description: "" }
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
        setParameters([...parameters, { name: "", type: "", description: "" }]);
    };

    const removeParameter = (index) => {
        const newParameters = parameters.filter((_, i) => i !== index);
        setParameters(newParameters);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ formData, parameters }, null, 2)); // Affiche le JSON formaté
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" placeholder="ID" onChange={handleChange} />
                <input type="text" name="name" placeholder="Nom" onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} />
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
                        <button type="button" onClick={() => removeParameter(index)}>Supprimer</button>
                    </div>
                ))}
                <button type="button" onClick={addParameter}>Ajouter un paramètre</button>
                <button type="submit">Convertir en JSON</button>
            </form>
            <pre>{JSON.stringify({ formData, parameters }, null, 2)}</pre>
        </div>
    );
}