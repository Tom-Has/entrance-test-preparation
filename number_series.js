//object constructor for a single number including an operator within the series
function series() {
	this.zahl = Math.ceil(Math.random()*10);
	this.opdet = Math.round(Math.random()*3);
	if(this.opdet == 0)
		this.operator = '+';
	else if(this.opdet == 1)
		this.operator = '-';
	else if(this.opdet == 2)
		this.operator = '*';
	else if(this.opdet == 3)
		this.operator = '/';
	this.put = function(x) {
		//change division to addition in case division does not yield a whole number
		if(this.operator == '/' && x%this.zahl != 0)
			this.operator = '+';
		return x = eval(x+this.operator+this.zahl);
	}
}

//creating an actual number series together with the according solution
function task_series() {
	//random number of steps including he computation of the solution
	var schritte = 5;
	//randomly assigned starting number
	var start = Math.ceil(Math.random()*10);
	//variable number of possible operations, one less than numbers
	var opnum = Math.ceil(Math.random()*(schritte-1));
	//array for the objects as described above
	var oparray = [];
	var count = 0;
	//starting variable for output string
	var tz = ' &rarr; ';
	var ausgabe = start;
	//fill the 
	for(var i = 0; i < opnum; ++i)
		oparray[i] = new series;
	for(var j = 0; j < schritte; ++j) {
		//one time correction because the count variable increases further than the opnum array size
		if(count >= opnum)
			count = 0;
		start = oparray[count].put(start);
		if(j != schritte-1)
			ausgabe += tz+start;
		else {
			ausgabe += tz+'<input type="text" id="enter" style="width:40px">';
			document.getElementById("solution").value = start;
		}
		++count;		
	}
	document.getElementById("solution").innerHTML = '';
	document.getElementById("question").innerHTML = ausgabe;
}

//controlling user input for correct solution and adapt output accordingly
function solution_series() {
	var vorschlag = document.getElementById("enter").value;
	var loesung = document.getElementById("solution").value;
	if(vorschlag == loesung)
		document.getElementById("solution").innerHTML = 'Ihre Angabe ist korrekt!';
	else
		document.getElementById("solution").innerHTML = 'Ihre Angabe ist falsch. Die Lösung lautet '+loesung+'.';
}
