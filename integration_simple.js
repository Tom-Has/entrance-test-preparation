//object constructor basic_object(param_coeff, param_expo) as well as derivation and integration functions exist in term_basicobject.js

//function for creating a very simple integral task and its solution
function task_integrate() {
	document.getElementById('question').innerHTML = '';
	document.getElementById('solution').innerHTML = '';
	document.getElementById('solution').style.visibility = 'hidden';
	//arbitrary number of terms, can be replaced with random assignment at leisure
	let terms = 3;													
	let question = '&int; (';
	let answer = 'F(x) = ';
	for(let l = 0; l < terms; ++l) {
		//two way random determination if only a basic term is created or a simple term for partial integration with s slight focus on the first option (Math.random() incl. 0 but excl. 1)
		if(Math.round(Math.random())) {
			let sum_norm = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
			let sum_stem = integrate_it(sum_norm);
			question += sum_norm.output();
			//again testing for a first case via loop variable
			if(l == 0)
				first = true;
			answer += sum_stem.output();
		} 
		//super simple verion of partial integration
		else {
			let sum_part = new basic_object(Math.round(Math.random()*9+1), Math.ceil(Math.random()*4));
			first = true;
			if(l == 0) {
				if(Math.floor(Math.random()*3) == 2) {
					question += 'e<sup>x</sup> * ' + sum_part.output();
					first = true;
					answer += 'e<sup>x</sup> * (' + sum_part.output();
				}
				else if(Math.floor(Math.random()*3) == 1) {
					question += 'sin(x) * ' + sum_part.output();
					first = true;
					answer += '-cos(x) * (' + sum_part.output();
				}
				else {
					question += 'cos(x) * ' + sum_part.output();
					first = true;
					answer += 'sin(x) * (' + sum_part.output();
				}
			}
			else {
				if(Math.floor(Math.random()*3) == 2) {
					question += ' + e<sup>x</sup> * ' + sum_part.output();
					first = true;
					answer += ' + e<sup>x</sup> * (' + sum_part.output();
				}
				else if(Math.floor(Math.random()*3) == 1) {
					question += ' + sin(x) * ' + sum_part.output();
					first = true;
					answer += ' - cos(x) * (' + sum_part.output();
				}
				else {
					question += ' + cos(x) * ' + sum_part.output();
					first = true;
					answer += ' + sin(x) * (' + sum_part.output();
				}
			}
			let sum_part_diff = differentiate_it(sum_part);
			for(let i = 0; i < sum_part.expo; ++i) {
				sum_part_diff.coeff *= -1;
				answer += sum_part_diff.output();
				sum_part_diff = differentiate_it(sum_part_diff);
			}
			answer += ')';
		}
	}
	first = true;
	document.getElementById('question').innerHTML = question + ') dx';
	document.getElementById('solution').innerHTML = answer;
}

//solution_visual() as in differentiation_rules.js


