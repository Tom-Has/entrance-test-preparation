//function for calling a question
function task_scitec() {
	//check if the catalogue has been run through
	if (iter >= catalogue_size)
		iter = 0;
	//if the first question is called, shuffle the catalogue before
	if (iter == 0) {
		shuffle_catalogue(catalogue);
		//calling the sub function for shuffling the answer elements without the question at index 0
		for (var j = 0; j < catalogue_size; ++j) {
			shuffle_not_first(catalogue[j]);
		}
	}
	//erase text from a previous solution
	document.getElementById('solution').innerHTML = '';
	//overwrite previous task with a catalogue question and increase iter by 1
	document.getElementById('question').innerHTML = catalogue[iter][0];
	for (var k = 1; k <= answer_size; ++k)
		document.getElementById('question').innerHTML += catalogue[iter][k];
	++iter;
}

//checking solution and outputting accordingly
function solution_scitec() {
	if(document.getElementById('1').firstChild.checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else 
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet ' + '"' + document.getElementById('1').innerText + ' "';
}

//function for shuffling the catalogue itself
function shuffle_catalogue(x) {
	var inter = '';
	if (catalogue_size <= 1) {
		console.log('Keine Sortierung moeglich!');
		return;
	}
	for (var i = 0; i < catalogue_size - 1; ++i) {
		//2 :1 skew towards changing positions
		if (Math.ceil(Math.random() * 3) % 2 != 0) {
			inter = x[i];
			x[i] = x[i + 1];
			x[i + 1] = inter;
		}
	}
}

//shuffling an array without moving the first element
function shuffle_not_first(y) {
	var inter = '';
	for(var i = 1; i < answer_size; ++i) {
		//2 :1 skew towards changing positions
		if (Math.ceil(Math.random() * 3) % 2 != 0) {
			inter = y[i];
			y[i] = y[i + 1];
			y[i + 1] = inter;
		}
	}
}

//declaring and initialising catalogue
var catalogue = [
//position 0 is the question, the subsequent four indices contain answers, with ID = 1 for right or 0 for wrong answers
['<p>Which anorganic acid is most dangerous for humans?</p>',
'<span id="1"><input type="radio" name="answer"> Hydrofluoric acid</span><br>',
'<span id="0"><input type="radio" name="answer"> Hydrochloric acid</span><br>',
'<span id="0"><input type="radio" name="answer"> Sulfuric acid</span><br>',
'<span id="0"><input type="radio" name="answer"> Phosphoric acid</span><br>'],
['<p>Which of the following is not a unit for energy?</p>',
'<span id="1"><input type="radio" name="answer"> Kilowatt (kW)</span><br>',
'<span id="0"><input type="radio" name="answer"> Newtonmeter (Nm)</span><br>',
'<span id="0"><input type="radio" name="answer"> Joule (J)</span><br>',
'<span id="0"><input type="radio" name="answer"> Electron volt (eV)</span><br>'],
['<p>How does gravity change with the distance between two objects?</p>',
'<span id="1"><input type="radio" name="answer"> It is reduced by the distance in a square fashion.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is reduced by the distance in a linear fashion.</span><br>',
'<span id="0"><input type="radio" name="answer"> It does not change.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is increased in a linear fashion.</span><br>'],
['<p>What are tensides?</p>',
'<span id="1"><input type="radio" name="answer"> emulsifiers</span><br>',
'<span id="0"><input type="radio" name="answer"> pigments</span><br>',
'<span id="0"><input type="radio" name="answer"> fragrances</span><br>',
'<span id="0"><input type="radio" name="answer"> acid neutralisers</span><br>'],
];

//global variable for catalogue size, size of uniform answer possibilities and iterating through catalogue
var catalogue_size = catalogue.length;
var answer_size = 4;
var iter = 0;