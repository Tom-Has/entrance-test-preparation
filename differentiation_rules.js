//object sonstructor for basic_object(param_coeff, param_expo, param_val) as well as derivation function see term_basicobject.js

//constructor for a multiplicative term, here restricted to one multiplication (applying the multiplication rule)
function product() {
	this.bracket_one_norm = [];
	this.bracket_one_diff = [];
	this.bracket_two_norm = [];
	this.bracket_two_diff = [];
	let determine_one = Math.round(Math.random()*(max_inner-min_inner))+min_inner;
	let determine_two = Math.round(Math.random()*(max_inner-min_inner))+min_inner;
	for(let i = 0; i < determine_one; ++i) {
		this.bracket_one_norm[i] = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
		this.bracket_one_diff[i] = differentiate_it(this.bracket_one_norm[i]);
	}	
	for(let i = 0; i < determine_two; ++i) {
		this.bracket_two_norm[i] = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
		this.bracket_two_diff[i] = differentiate_it(this.bracket_two_norm[i]);
	}
}

//constructor for a two element chain term of functions, here restricted to three cases of outer functions with a summative term as inner function
function chain(length) {
	//random variable for determining e, sin or cos as outer function
	let determine_outer = Math.ceil(Math.random()*3);							
	if(determine_outer == 1) {
		this.outer_norm = 'e';
		this.outer_diff = 'e';
	}
	else if(determine_outer == 2) {
		this.outer_norm = 'sin';
		this.outer_diff = 'cos';
	}
	else if(determine_outer == 3) {
		this.outer_norm = 'cos';
		this.outer_diff = '-sin';
	}
	this.inner_norm = [];
	this.inner_diff = [];
	for(let i = 0; i < length; ++i) {
		this.inner_norm[i] = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
		this.inner_diff[i] = differentiate_it(this.inner_norm[i]);
	}
}

//function for transmitting task data to html
function task_differentiate() {
	document.getElementById('question').innerHTML = '';
	document.getElementById('solution').innerHTML = '';
	document.getElementById('solution').style.visibility = 'hidden';
	//number of total terms 
	var term_no = Math.floor(Math.random()*(max_total-min_total)+min_total);
	//variable for randomly deciding the appearance and hence the applicable rule for each term
	var rand_rule = 0;
	//string variables for task and solution for html content 
	var question = 'f(x) = ';
	var answer = 'f(x)´ = ';
	//number of terms is processed
	for(let j = 0; j < term_no; ++j) {
		//appearance of terms is defined
		rand_rule = Math.ceil(Math.random()*3);
		if(rand_rule == 1) {
			let norm = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
			let diff = differentiate_it(norm);
			question += norm.output();
			//combination of loop variable at the beginning for the very first term and setting first to true for the first inner object of a term (first is defined and used in term_basicobject.js)
			if(j == 0)
				first = true;
			answer += diff.output();
		}
		else if(rand_rule == 2) {
			let prod = new product();
			//starting product terms with brackets ot the first position
			if(j == 0) {
				question += '(';
				answer += '(';	
			}
			//or continuing the series in a summative way
			else {
				question += ' + (';
				answer += ' + (';	
			}
			first = true;
			for(let i = 0; i < prod.bracket_one_norm.length; ++i)
				question += prod.bracket_one_norm[i].output();
			question += ')*(';
			first = true;
			for(let i = 0; i < prod.bracket_two_norm.length; ++i)
				question += prod.bracket_two_norm[i].output();
			//task string ends here
			question += ')';												
			first = true;
			for(let i = 0; i < prod.bracket_one_norm.length; ++i)
				answer += prod.bracket_one_norm[i].output();
			answer += ')*(';
			first = true;
			for(let i = 0; i < prod.bracket_two_diff.length; ++i)
				answer += prod.bracket_two_diff[i].output();
			answer += ') + (';
			first = true;
			for(let i = 0; i < prod.bracket_one_diff.length; ++i)
				answer += prod.bracket_one_diff[i].output();
			answer += ')*(';
			first = true;
			for(let i = 0; i < prod.bracket_two_norm.length; ++i)
				answer += prod.bracket_two_norm[i].output();
			//solution string ends here
			answer += ')';
		}
		else if(rand_rule == 3) {
			//defining the number of objects of the inside term
			let chn = new chain(Math.round(Math.random()*(max_inner-min_inner))+min_inner);
			//same as above: loop variable defining the sign of the very first term, first variable defining the signs of first objects within brackets
			if(j != 0) {
				question += ' + '+chn.outer_norm;
				if(chn.outer_diff == '-sin')
					answer += ' - sin';
				else
					answer += ' + '+chn.outer_diff;
			}
			else {
				question += chn.outer_norm;
				answer += chn.outer_diff;
			}
			//special treatment for transmitting e function content string to html
			if(chn.outer_norm == 'e')	
				question += '<sup>';
			else
				question += '(';
			first = true;
			for(let i = 0; i < chn.inner_norm.length; ++i)
				question += chn.inner_norm[i].output();
			if(chn.outer_norm == 'e')
				question += '</sup>';
			else
				question += ')';
			//above line ends task string
			if(chn.outer_diff == 'e')
				answer += '<sup>';
			else
				answer += '(';
			first = true;
			for(let i = 0; i < chn.inner_norm.length; ++i)
				answer += chn.inner_norm[i].output();
			if(chn.outer_diff == 'e')
				answer += '</sup> *(';
			else
				answer += ')*(';
			first = true;
			for(let i = 0; i < chn.inner_diff.length; ++i)
				answer += chn.inner_diff[i].output();
			answer += ')';	
			//above line ends solution string
		}
	}
	first = true;
	document.getElementById('question').innerHTML = question;
	document.getElementById('solution').innerHTML = answer;
}

//function for showing the solution, all it does is making the according html element visible
function solution_visual() {
	document.getElementById('solution').style.visibility = 'visible';
}

//various domain limits
var min_coeff = -20;				//minimum value for coefficients (caution because Math.ceil() is applied the actual minimum is -1 compared to the absolute value)
var max_coeff = 19;				//maximum value for coefficients (overwrite with -1 and use Math.abs() to avoid the 0 value problem
var min_expo = -10;				//minimum value for exponents, see above
var max_expo = 9;				//maximum value for exponents, see above
var max_inner = 3;				//maxmimum number of objects for a inner term of a two element chain of functions
var min_inner = 2;					//minimum number for the above
var max_total = 5;					//maximum number for total different terms (or rule applications) for a single task
var min_total = 1;					//minimum number for the above

/***
Remarks about the domain limits:
With the current version coefficients as well as exponents can be 0. Several cases are caught, but there still remains the rather unlikely but possible case that before or after differentiation
the coefficient becomes 0 and renders the term irrelevant. That term is still represented as () and the differentiation of the term is displayed although that makes of course no sense. To avoid
this problem only a negative range of values excluding 0 can be used and another operation can randomly define whether Math.abs() is applied to the coefficient (preferentially with a skew towards
obtaining the absolute value).
***/
