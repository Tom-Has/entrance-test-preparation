//constructor for a rational number
function rational(x, y) {
	//catching input errors and creating a random enumerator ranging from -9 to +9 (excluding 0)
	if (x === undefined) {
		this.enumerator = Math.ceil(Math.random() * 9);
		if (Math.round(Math.random() * 10) % 2 == 0)
			this.enumerator *= -1;
	}
	else
		this.enumerator = x;
	//catching input errors and creating a random denumerator ranging from +2 to +9
	if (y === undefined)
		this.denominator = Math.ceil(Math.random() * 7) + 2;
	else
		this.denominator = y;
	//output string for html way of depicting a rational number
	this.output = function() {
		return '<sup>' + this.enumerator + '</sup>&frasl;<sub>'  + this.denominator + '</sub>';
	}
}

//creating a task constisting of two rationals, a randomly chosen operator, one correct and three false solutions
function task_rational() {
	var a = new rational();
	var b = new rational();
	//result is a global variable for accessing it in the subsequent solution function
	res = new rational(1,1);
	//random variable between 0 and 3 to access the operator from the according array
	var op = Math.floor(Math.random() * 4);
	//calculating results according to operator
	switch (op) {
		case 0 :
		res.enumerator = a.enumerator * b.denominator + b.enumerator * a.denominator;
		res.denominator = a.denominator * b.denominator;
		break;
		case 1 :
		res.enumerator = a.enumerator * b.denominator - b.enumerator * a.denominator;
		res.denominator = a.denominator * b.denominator;
		break;
		case 2 :
		res.enumerator = a.enumerator * b.enumerator;
		res.denominator = a.denominator * b.denominator;
		break;
		case 3 :
		res.enumerator = a.enumerator * b.denominator;
		res.denominator = a.denominator * b.enumerator;
		break;
		default:
		res.enumerator = 1;
		res. denominator = 1;
	}
	//applying the ggt function (see estimate.js) to the result for better style
	var g_g_t = ggt(res.enumerator, res.denominator);
	res.enumerator /= g_g_t;
	res.denominator /= g_g_t;
	//following section creates wrong answers and saves all answers in an array, inlcuding radiobutton elements for html
	var answers = [];
	answers[0] = '<input type="radio" name="ratio" id="right"> ' + res.output();
	var incorr1 = new rational(res.enumerator + 1, res.denominator);
	var incorr2 = new rational(res.enumerator % 7 + 1, res.denominator);
	var incorr3 = new rational(res.enumerator + 1, res.denominator % 2 + 2);
	answers[1] = '<input type="radio" name="ratio" id="wrong"> ' + incorr1.output();
	answers[2] = '<input type="radio" name="ratio" id="wrong"> ' + incorr2.output();
	answers[3] = '<input type="radio" name="ratio" id="wrong"> ' + incorr3.output();
	//random sorting of answers content
	answers.sort(function(a, b){return 0.5 - Math.random()});
	//following section writes html text into the according container, starting with erasing text in solution-ID from previous tasks
	document.getElementById('solution').innerHTML = '';
	document.getElementById('question').innerHTML = a.output() + ' ' + operators[op] + ' ' + b.output() + ' = ?<br><br>';
	for (var i = 0; i < 4; ++i)
		document.getElementById('question').innerHTML += answers[i]+'<br>';
}

//checking solution and outputting accordingly
function solution_rational() {
	if(document.getElementById('right').checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet ' + res.output();
}

//collection of operator signs for task output
var operators = ['+','-', '*', '/'];
