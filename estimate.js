//general variable for the number of different task types
var typenum = 6;

//interval for the amount of numbers within a formula, here set arbitrarily
var min_amount = 2;
var max_amount = 5;

//interval for several number ranges to avoid inconsistencies, should be potences of 10 as recommended
var min_value = 10;
var max_value = 1000;

//constructor with divisions for different types of tasks
function estimate() {
	this.define = Math.floor(Math.random() * typenum)
	this.result = '';
	this.wrong = [];
	//division decimal calculations
	if(this.define == 0) {
		//number of elements within the total formula 
		this.amount = (Math.floor(Math.random() * (max_amount - min_amount))) + min_amount;
		//random number of decimal places
		this.prec = Math.ceil(Math.random() * 3);
		//operator string
		this.op = '';
		//intermediate variable, not needed outside of the output string, need not be an instance variable and is required only inside the put function
		this.inter = 0;
		this.first = true;
		//output function for html string including generation of incorrect answers
		this.put = function() {
			//starting string
			var output = '';
			for(var i = 0; i < this.amount; ++i) {
				//checking whether and element is the first in the formula, therefore no operator should be output
				if(!this.first) {
					//random assignment for addition or subtraction of the following formula elements
					if((Math.ceil(Math.random() * 10)) % 2 == 0)
						this.op = '+';
					else
						this.op = '-';
					this.inter = (((Math.random() * (max_value - min_value))) + min_value).toFixed(this.prec);
					//eval calculates the result from the intermediate result and the radnom new value with the operator in between
					this.result = eval(this.result+this.op+this.inter).toFixed(this.prec);
					//the according string is composed from the same values as above
					output += ' '+this.op+' '+this.inter;
				}
				else {
					this.first = false;
					this.inter = (((Math.random() * (max_value - min_value))) + min_value).toFixed(this.prec);	
					this.result = this.inter;
					output += this.inter;
				}
			}
			//wrong results are generated with arbitrary and not particularly creative parameters
			this.wrong[0] = eval(this.result + '+' + '0.1');			
			this.wrong[1] = eval(this.result + '+' + '0.01');
			this.wrong[2] = eval(this.result + '*' + '1.1').toFixed(this.prec);
			return output + ' =';
		}
	}
	//division squares
	else if(this.define == 1) {								
		this.elem = Math.ceil((Math.random() * ((max_value / 10) - min_value)) + min_value);
		this.result = Math.pow(this.elem, 2);
		this.wrong[0] = (this.result * 3.3).toFixed(); 
		this.wrong[1] = (this.result * 1.1).toFixed();
		this.wrong[2] = Math.round(this.result * 0.9);
		this.put = function() {
			return this.elem + '<sup>2</sup> =';
		}
	}
	//division square roots
	else if(this.define == 2) {
		this.result = Math.ceil((Math.random() * ((max_value / 10) - min_value)) + min_value);
		this.wrong[0] = (this.result * 1.5).toFixed(); 
		this.wrong[1] = (this.result * 1.1).toFixed();
		this.wrong[2] = (this.result * 0.9).toFixed(2);
		this.put = function() {
			return 'Quadratwurzel von ' + Math.pow(this.result, 2)+ ' =';
		}
	}
	//division procent calculations
	else if(this.define == 3) {								
		this.relative = Math.random();
		this.elem = Math.ceil((Math.random() * (max_value - min_value)) + min_value);
		this.result = (this.relative * this.elem);
		this.wrong[0] = (this.result + 10).toFixed(2); 
		this.wrong[1] = (this.result + 100).toFixed(2);
		this.wrong[2] = (this.result * 0.95).toFixed(2);
		this.result = this.result.toFixed(2);
		this.put = function() {
			return (this.relative*100).toFixed(2) + '% von ' + this.elem + ' =';
		}
	}
	//division multiplication
	else if(this.define == 4) {								
		this.amount = (Math.floor(Math.random() * (max_amount - min_amount))) + min_amount;
		this.first = true;
		this.inter = 0;
		this.put = function() {
			var output = '';
			for(var i = 0; i < this.amount; ++i) {
				if(!this.first) {
					this.inter = Math.ceil((Math.random() * ((max_value / 10) - (min_value / 10))) + min_value);
					this.result = this.result * this.inter;
					output += ' * ' + this.inter;
				}
				else {
					this.first = false;
					this.inter = Math.ceil((Math.random() * ((max_value / 10) - (min_value / 10))) + min_value);
					this.result = this.inter;
					output += this.inter;
				}
			}
			this.wrong[0] = (this.result * 1.2).toFixed(); 
			this.wrong[1] = (this.result * 0.1).toFixed();
			this.wrong[2] = (this.result * 0.8).toFixed();
			return output + ' =';
		}	
	}
	//division rational numbers
	else if(this.define == 5) {
		//as in the first division
		this.amount = (Math.floor(Math.random() * (max_amount - min_amount))) + min_amount;
		//subconstructor for rational numbers
		this.fraction = function() {									
			this.denom = Math.floor(Math.random() * (20 - 2)) + 2;
			this.num = Math.floor(Math.random() * (20 - 2)) + 2;
			//arbirary reduction by 2 until numerator is less than denominator
			while(this.num >= this.denom)
				this.num = Math.round(this.num /= 2);
			this.showfract = function() {
				return this.num + '/' + this.denom;
			}
		}
		//array for rational number objects
		this.collection = [];
		for(var i = 0; i < this.amount; ++i)
			this.collection[i] = new this.fraction();
		//output function is principally the same as in the first division with adaptations to rational numbers
		this.put = function() {
			var output = '';
			//this instance variable is for testing purposes
			this.first = true;
			var fract;
			for(var i = 0; i < this.amount; ++i) {
				if(!this.first) {
					//random assignment of addition or subtraction as in the first division
					if((Math.ceil(Math.random() * 10)) % 2 == 0)
						this.op = '+';
					else
						this.op = '-';
					fract.num = eval((fract.num * this.collection[i].denom).toString() + this.op + (fract.denom * this.collection[i].num).toString());
					fract.denom *= this.collection[i].denom;
					output += ' ' + this.op + ' ' + this.collection[i].showfract();
				}
				else {
					this.first = false;
					fract = this.collection[i];
					output += this.collection[i].showfract();
				}
			}
			//use of Math.abs() should not be necessary here, but has no impact on output or result
			var kurz = Math.abs(ggt(fract.denom, fract.num));
			//applying the gcd function to make the fraction approriately simple
			fract.num /= kurz;
			fract.denom /= kurz;
			this.result = fract.showfract();
			++fract.num; ++fract.denom;
			//again rather uncreative variations of the correct result
			this.wrong[0] = fract.showfract();
			fract.num *= 2; fract.denom *= 3;
			this.wrong[1] = fract.showfract();
			fract.num -= 10; fract.denom = Math.round(fract.denom /= 2);
			this.wrong[2] = fract.showfract();
			return output + ' =';
		}
	}
}

//function for creating the estimation task and transporting it into the according html elements
function task_estimate() {
	document.getElementById('solution').innerHTML = '';
	//global variable for allowing access to the object from the solution function below
	x = new estimate();
	document.getElementById('question').innerHTML = x.put()+'<br><br>';
	//array for possible answers, ids for wright and wrong answer(s) are assigned accordingly
	var antwort = [];
	antwort[0] = '<input type="radio" name="estim" id="right"> '+x.result;
	antwort[1] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[0];
	antwort[2] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[1];
	antwort[3] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[2];
	//random sorting of possible answers
	antwort.sort(function(a, b){return 0.5 - Math.random()});	
	for(var i = 0; i < 4; ++i)
		document.getElementById('question').innerHTML += antwort[i]+'<br>';
	//cheating is allowed for testing purposes
	//console.log(x.result);								
}

//checking solution and outputting accordingly
function solution_estimate() {
	if(document.getElementById('right').checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet '+x.result;
}

//recursive function for the greatest common denominator, useful for rational number computations in the estimate-constructor
function ggt(a, b) {
	if(a % b == 0)
		return b;
	else
		return ggt(b, (a%b));
}
