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
//position 0 is the question, the subsequent four indices contain answers, with ID = 1 for right or 0 for wrong answers (span tag is for accessing the innerText attribute)
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
'<span id="1"><input type="radio" name="answer"> It is reduced by the distance to the square.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is reduced by the distance in a linear fashion.</span><br>',
'<span id="0"><input type="radio" name="answer"> It does not change.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is increased with the distance in a linear fashion.</span><br>'],
['<p>What are tensides?</p>',
'<span id="1"><input type="radio" name="answer"> emulsifiers</span><br>',
'<span id="0"><input type="radio" name="answer"> pigments</span><br>',
'<span id="0"><input type="radio" name="answer"> fragrances</span><br>',
'<span id="0"><input type="radio" name="answer"> acid neutralisers</span><br>'],
['<p>What is the smallest unit in information technology?</p>',
'<span id="1"><input type="radio" name="answer"> bit</span><br>',
'<span id="0"><input type="radio" name="answer"> byte</span><br>',
'<span id="0"><input type="radio" name="answer"> bot</span><br>',
'<span id="0"><input type="radio" name="answer"> spam</span><br>'],
['<p>Which statement is true for molecules?</p>',
'<span id="1"><input type="radio" name="answer"> All the other statements.</span><br>',
'<span id="0"><input type="radio" name="answer"> Their atoms are typically conncted by covalent bonds.</span><br>',
'<span id="0"><input type="radio" name="answer"> They can appear as solids, liquids or gases.</span><br>',
'<span id="0"><input type="radio" name="answer"> The word "molecule" is derived from the latin word for mass.</span><br>'],
['<p>Which statement is true for a catalyst in chemistry?</p>',
'<span id="1"><input type="radio" name="answer"> It reduces the activation energy for a chemical reaction.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is consumed during a chemical reaction.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is always a metal.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is always artificial.</span><br>'],
['<p>Which statement is true for "Bremsstrahlung"?</p>',
'<span id="1"><input type="radio" name="answer"> It is radiation produced by deceleration of one charged particle by another.</span><br>',
'<span id="0"><input type="radio" name="answer"> It is heat emission produced when brakes of a car are activated.</span><br>',
'<span id="0"><input type="radio" name="answer"> It must strictly be avoided in medical applications.</span><br>',
'<span id="0"><input type="radio" name="answer"> It occurs only in X-ray tubes.</span><br>'],
['<p>Which of the following is not an SI quantity?</p>',
'<span id="1"><input type="radio" name="answer"> electric voltage</span><br>',
'<span id="0"><input type="radio" name="answer"> electric current</span><br>',
'<span id="0"><input type="radio" name="answer"> luminous intensity</span><br>',
'<span id="0"><input type="radio" name="answer"> thermodynamic temperature</span><br>'],
['<p>When does a weighing scale indicate the least mass?</p>',
'<span id="1"><input type="radio" name="answer"> When used in a downmoving elevator.</span><br>',
'<span id="0"><input type="radio" name="answer"> When used in an upmoving elevator.</span><br>',
'<span id="0"><input type="radio" name="answer"> When used while standing perfectly still.</span><br>',
'<span id="0"><input type="radio" name="answer"> It always indicates the same mass.</span><br>'],
];

//global variable for catalogue size, size of uniform answer possibilities and iterating through catalogue
var catalogue_size = catalogue.length;
var answer_size = 4;
var iter = 0;
