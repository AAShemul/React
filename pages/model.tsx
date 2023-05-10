import { useState, useEffect } from 'react';
import Head from 'next/head';
import brain from 'brain.js';

function Model(): JSX.Element
{
	const [brainModel, setBrainModel] = useState(null);

	useEffect(() =>
	{
		const loadModel = async () => {
			const response = await fetch('brain-model.json');
			const json = await response.json();
			const data = JSON.parse(json);
			const model = new brain.NeuralNetwork();
			model.fromJSON(data);
			setBrainModel(model);
		};

		loadModel();
	}, []);

	const brainForm = (event: any): void =>
	{
		event.preventDefault();
		const inputText = event.target.elements['input-text'].value;
		const prediction = document.getElementById('prediction');
		const result = brainModel.run(inputText);
		prediction.innerHTML = result;
	};

	return (
		<>
			<Head>
				<title>Brain.JS Model</title>
			</Head>
			<div className="container">
				<h1>Brain.js Demo</h1>
				<form id="predict-form" onSubmit={brainForm}>
					<label htmlFor="input-text">Enter a sentence:</label>
					<input type="text" id="input-text" name="input-text" />
					<button type="submit">Predict Tense</button>
				</form>
				<div id="prediction"></div>
			</div>
		</>
	);
}

export default Model;