//Constructor for a basic object constisting of coefficient and exponent
function basic_object(param_coeff, param_expo,) {
	this.coeff = param_coeff;													
	this.expo = param_expo;
	//output function returning the basic term as an html formatted string
	this.output = function() {
		let angabe = '';
		//special case: object stems from integral of x^-1 and is output as ln(x)
		if(this.coeff == Infinity || this.coeff == -Infinity) {				
			if(first) {
				first = false;
				angabe += 'ln(x) ';
			}
			else
				angabe += ' + ln(x)';
		}
		//special case: if coeffienct equals 0 the complete term is ignored
		else if(this.coeff != 0) {
			//first object in a series of terms
			if(first) {
				first = false;
				//special cases when exponent equals 0
				if(this.coeff == 1 && this.expo == 0)						
					angabe += '1';
				else if(this.coeff == -1 && this.expo == 0)
					angabe += '-1';
				else {
					if(this.coeff != 1 && this.coeff != -1)
						angabe += this.coeff;
					else if(this.coeff == -1)
						angabe += '-';
					if(this.expo != 0) {
						if(this.expo == 1)
							angabe += 'x';
						else
							angabe += 'x<sup>'+this.expo+'</sup>';
					}
				}
			}
			//like above for terms following the first
			else {															
				if(this.coeff == 1 && this.expo == 0)
					angabe += ' + 1';
				else if(this.coeff == -1 && this.expo == 0)
					angabe += ' - 1';
				else {
					//empty space between '-' and the subsequent term, making the sign look appropriately like subtraction
					if(this.coeff != -1 && this.coeff < 0)
						angabe += ' - '+Math.abs(this.coeff);				
					else if(this.coeff != 1 && this.coeff > 0)
						angabe += ' + '+this.coeff;
					else if(this.coeff == -1)
						angabe += ' - ';
					else if(this.coeff == 1)
						angabe += ' + ';
					if(this.expo != 0) {
						if(this.expo == 1)
							angabe += 'x';
						else
							angabe += 'x<sup>'+this.expo+'</sup>';
					}
				}
			}
		}
		return angabe;
	}
}

//functions for returning differential and integral of a basic term respectively
function differentiate_it(bo) {
	return new basic_object(bo.coeff * bo.expo, bo.expo - 1, bo.value);
}

function integrate_it(bo) {
	//if exponent equls -1 output is manually modified to ln(x)
	if(bo.expo + 1)																
		return new basic_object(bo.coeff * (1 / (bo.expo + 1)), bo.expo + 1, bo.value);
	else
		return new basic_object(bo.coeff + '*ln(x)', 0);
}

//global flag for checking wether an additive basic term is first in a task
var first = true;
