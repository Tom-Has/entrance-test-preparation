//constructor for a very basic algebra task of the structure a + b * c = d, where d is a new term and the correct suggestion has to be picked
function alg() {
	this.a = Math.ceil(Math.random() * 99);
	this.b = Math.ceil(Math.random() * 99);
	this.c = Math.ceil(Math.random() * 99);
	//compute solution to later put it into a new term
	this.d = this.a + this.b * this.c;
	//randomly deciding whether the base for the solution is 2 or 10
	if (Math.round(Math.random() % 2 == 0))
		this.base = 2;
	else
		this.base = 10;
	//using base transformation for calculating the positive integer exponent which together with the base yields a result below or above d
	if (Math.round(Math.random() % 2 == 0)) {
		this.exponent = Math.floor(Math.log(this.d) / Math.log(this.base));
		this.sign = '+';
	}
	else {
		this.exponent = Math.ceil(Math.log(this.d) / Math.log(this.base));
		this.sign = '-';
	}
	//calculating the remainder
	this.rem = Math.abs(this.d - Math.pow(this.base, this.exponent));
	//stringifying question and possible answers
	this.question = this.a + ' + ' + this.b + ' * ' + this.c + ' = ?';
	this.d_term = this.base + '<sup>' + this.exponent + '</sup> ' + this.sign + ' ' + this.rem;
	this.answers = [];
	this.answers[0] = '<input type="radio" name="alg" id="right"> ' + this.d_term;
	this.answers[1] = '<input type="radio" name="alg" id="wrong"> ' + this.base + '<sup>' + this.exponent + '</sup> ' + this.sign + ' ' + (Math.floor(Math.random() * 9) +1);
	this.answers[2] = '<input type="radio" name="alg" id="wrong"> ' + (Math.floor(Math.random() * 6) + 2) + '<sup>' + this.exponent + '</sup> + ' + (Math.floor(Math.random() * 9) +1);
	this.answers[3] = '<input type="radio" name="alg" id="wrong"> ' + (Math.floor(Math.random() * 6) + 2) + '<sup>' + this.exponent + '</sup> - ' + (Math.floor(Math.random() * 9) +1);
	//shuffling answers
	this.answers.sort(function(a, b){return 0.5 - Math.random()});
}

//function for transmitting content to html
function task_algebra() {
	//creating a global alg object for accessing it in the subsequent solution function
	task = new alg();
	//following section writes html text into the according container, starting with erasing text in solution-ID from previous tasks
	document.getElementById('solution').innerHTML = '';
	document.getElementById('question').innerHTML = task.question + '<br><br>';
	for (var i = 0; i < 4; ++i)
		document.getElementById('question').innerHTML += task.answers[i]+'<br>';
}

//checking solution and outputting accordingly
function solution_algebra() {
	if(document.getElementById('right').checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet ' + task.d_term;
}