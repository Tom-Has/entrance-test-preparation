//globale Arrays für polynomielle Funktion und Ableitungen erstellen (es wird aus zwei Funktionen darauf zugegriffen)
var gleichung = [];
var ableitung = [];

//Endpunkte für die Konstanten aus Zufallsbereich
var max = 100;
var min = -100;


//polynomiellen Term als Objekt konstruieren
function term(a, b)  {
	this.konstante = a;
	this.potenz = b;
	this.put = function() {
		var formel = '';
		if(this.potenz == 0)
			formel += this.konstante;
		else if(this.potenz == 1) {
			if(this.konstante < 0 && this.konstante != -1)
				formel += ' - '+Math.abs(this.konstante)+'x';
			else if(this.konstante > 0 && this.konstante != 1)
				formel += ' + '+this.konstante+'x';
			else if(this.konstante == -1)
				formel += ' - x';
			else if(this.konstante == 1)
				formel += ' + x';
		}
		else if(this.potenz > 1) {
			if(this.konstante < 0 && this.konstante != -1)
				formel += ' - '+Math.abs(this.konstante)+'x<sup>'+this.potenz+'</sup>';
			else if(this.konstante > 0 && this.konstante != 1)
				formel += ' + '+this.konstante+'x<sup>'+this.potenz+'</sup>';
			else if(this.konstante == -1)
				formel += ' - x<sup>'+this.potenz+'</sup>';
			else if(this.konstante == 1)
				formel += ' + x<sup>'+this.potenz+'</sup>';
		}
		return formel;
	}
}

//Array mit Objekten befüllen, sowie Frage und Antwortmöglichkeiten generieren
function task_polynom() {
	while(gleichung.length !== 0) {	//vorsichtshalber die Inhalte der vergangenen Frage löschen
		gleichung.pop();
		ableitung.pop();
	}
	var grad = Math.floor(Math.random()*5+1);	//legt den Grad des Polynoms für jede Frage zufällig fest
	document.getElementById('question').innerHTML = '';
	document.getElementById('solution').innerHTML = '';
	var frage = 'f(x) = ';
	var antwort = [];
	antwort[0] = '<input type="radio" name="poly" id="right">f(x)´ = ';
	antwort[1] = '<input type="radio" name="poly" id="wrong">f(x)´ = ';
	antwort[2] = '<input type="radio" name="poly" id="wrong">f(x)´ = ';
	antwort[3] = '<input type="radio" name="poly" id="wrong">f(x)´ = ';
	for(var i = 0; i<=grad; ++i) {	//Gleichung für die Frage erstellen
		var zufall = Math.floor(Math.random()*(max - min))+min;			//Zufall legt einen zufällig erstellen Koeffizienten fest
		gleichung[i] = new term(zufall, i);								//Steuervariable inkrementiert den Exponenten nach dem n^k Schema
		frage += gleichung[i].put();
	}
	frage += '<br><br>';
	var len = gleichung.length;
	for(var i = 1; i<len; ++i) {	//ab hier die falschen Antworten
		ableitung[i-1] = new term((gleichung[i].konstante*gleichung[i].potenz), gleichung[i].potenz);
		antwort[1] += ableitung[i-1].put();
	}
	antwort[1] += '<br>';
	for(var i = 1; i<len; ++i) {
		ableitung[i-1] = new term((gleichung[i].konstante), gleichung[i].potenz-1);
		antwort[2] += ableitung[i-1].put();
	}
	antwort[2] += '<br>';
	for(var i = 1; i<len; ++i) {
		if(i%2 != 0) {
			ableitung[i-1] = new term((gleichung[i].konstante*gleichung[i].potenz), gleichung[i].potenz-1);
			antwort[3] += ableitung[i-1].put();
		}
		else {
			ableitung[i-1] = gleichung[i];
			antwort[3] += ableitung[i-1].put();
		}
	}
	antwort[3] += '<br>';
	for(var i = 1; i<len; ++i) {	//zuletzt die korrekte Antwort, da für die Lösung auf den Array nochmals zugegriffen wird
		ableitung[i-1] = new term((gleichung[i].konstante*gleichung[i].potenz), gleichung[i].potenz-1);
		antwort[0] += ableitung[i-1].put();
	}
	antwort[0] += '<br>';
	antwort.sort(function(a, b){return 0.5 - Math.random()});	//Array mit den Antwortstrings zufällig ordnen und ausgeben
	document.getElementById('question').innerHTML = frage;
	for(var i = 0; i<antwort.length; ++i)
		document.getElementById('question').innerHTML += antwort[i];
}

//Ausgabe der Lösung mit korrekter Formel bei falsch gewählter Option
function solution_polynom() {
	if(document.getElementById("right").checked) 
		document.getElementById('solution').innerHTML = 'Sie haben die richtige Antwort gewählt!';
	else {
		document.getElementById('solution').innerHTML = 'Ihre Antwort ist falsch. Die Korrekte Lösung lautet f(x)´ = ';
		for(var i = 0; i<ableitung.length; ++i)
			document.getElementById('solution').innerHTML += ableitung[i].put();
	}
}

