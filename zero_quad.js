//constructor for very basic zero points of a simple square function (exponent set to 2, only one x-term with a coefficient and one y offset)
function zero_pt() {
	this.coefficient = Math.floor(Math.random() * 10);
	this.offset = Math.floor(Math.random() * 100);
	this.output = function() {
		//offset is always subtracted because complex solutions are not intended for the according task
		return this.coefficient + 'x<sup>2</sup> - ' + this.offset;
	}
	//zero points directly computed and stringified in the constructor
	var inter1 = this.offset / this.coefficient;
	var inter2 = Math.sqrt(inter1);
	if (Number.isInteger(inter2))
		this.zero = '<sup>+</sup>&frasl;<sub>-</sub> ' + inter2;
	else if (Number.isInteger(inter1))
		this.zero = '<sup>+</sup>&frasl;<sub>-</sub> &#8730;' + inter1;
	else
		this.zero = '<sup>+</sup>&frasl;<sub>-</sub> &#8730;(' + this.offset + '/' + this.coefficient + ')';
	//wrong answers are completely random
	this.answers = [];
	this.answers[0] = '<input type="radio" name="zero" id="right"> ' + this.zero;
	this.answers[1] = '<input type="radio" name="zero" id="wrong"> ' + '<sup>+</sup>&frasl;<sub>-</sub> ' + (Math.random() * 100).toFixed(2);
	this.answers[2] = '<input type="radio" name="zero" id="wrong"> ' + '<sup>+</sup>&frasl;<sub>-</sub> &#8730;' + Math.round((Math.random() * 100));
	this.answers[3] = '<input type="radio" name="zero" id="wrong"> ' + Math.round(Math.random() * 100);
	//shuffling answers
	this.answers.sort(function(a, b){return 0.5 - Math.random()});
}

//function for transmitting content to html
function task_sqfunc() {
	//creating a global zero_pt object for accessing it in the subsequent solution function
	x = new zero_pt();
	//following section writes html text into the according container, starting with erasing text in solution-ID from previous tasks
	document.getElementById('solution').innerHTML = '';
	document.getElementById('question').innerHTML = 'Gegeben sei die Funktion ' + x.output() + '. Wie lauten die Nullstellen dieser Funktion?<br><br>';
	for (var i = 0; i < 4; ++i)
		document.getElementById('question').innerHTML += x.answers[i]+'<br>';
}

//checking solution and outputting accordingly
function solution_sqfunc() {
	if(document.getElementById('right').checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet ' + x.zero;
}