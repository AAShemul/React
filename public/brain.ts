import model from "@/pages/model";

function form(event : Event) : boolean
{
	event.preventDefault();

	let name = document.getElementById('input-text').value;
	let output = model.run(inputText);
	let prediction = output.present > output.past ? 'Present' : 'Past';
	$('#prediction').html('The predicted tense is: ' + prediction);
	$('#prediction').show();


}