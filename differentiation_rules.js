//Objekt-Konstruktor basic_object(param_coeff, param_expo, param_val), sowie Ableitungs-Funktion aus term_basicobject.js übernommen

//Konstruktor für den multiplikativen Term, hier auf exakt eine Multiplikation beschränkt ("Produktregel"), ohne Integral
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

//Konstruktor für den Term aus verketteten Funktionen, hier exakt auf g o f beschränkt ("Kettenregel")
function chain(length) {														//Übergabe eines Parameters, für Differenzieren und Integrieren unterschiedlich
	let determine_outer = Math.ceil(Math.random()*3);							//Zufallsvariable, die bestimmt ob die äußere Funktion e, sin oder cos ist
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
	let determine_inner = length;												//wie im Produktkonstruktor, allerdings mit Zufallszahl im Intervall [min_inner, max_inner]
	this.inner_norm = [];
	this.inner_diff = [];
	this.inner_stem = [];
	for(let i = 0; i < determine_inner; ++i) {
		this.inner_norm[i] = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
		this.inner_diff[i] = differentiate_it(this.inner_norm[i]);
	}
}

//Funktion zur Ausgabe der Differentialgleichung
function task_differentiate() {
	document.getElementById('question').innerHTML = '';
	document.getElementById('solution').innerHTML = '';
	document.getElementById('solution').style.visibility = 'hidden';
	var term_no = Math.floor(Math.random()*(max_total-min_total)+min_total);	//legt die Anzahl der Terme für jede Aufgabe zufällig aus [1, 5] fest
	var rand_rule = 0;															//wird die Zufallsvariable, die entscheidet welcher Regelterm an der aktuellen Position dargestellt wird
	var question = 'f(x) = ';													//String-Variable (Formel) für HTML-Element
	var answer = 'f(x)´ = ';													//String-Variable (korrekte erste Ableitung) für HTML-Element
	for(let j = 0; j < term_no; ++j) {
		rand_rule = Math.ceil(Math.random()*3);									//Zufallsvariable entscheidet hier über die anzuwendende Regel um einen entsprechenden Term zu erstellen
		if(rand_rule == 1) {
			let norm = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
			let diff = differentiate_it(norm);
			question += norm.output();
			if(j == 0)															//unangenehme Lösung, hier wäre eine zweite flag-Variable konsistenter und wohl auch verständlicher
				first = true;
			answer += diff.output();
		}
		else if(rand_rule == 2) {
			let prod = new product();
			if(j == 0) {														//s. o., zweite flag
				question += '(';												//Start Angabe-String
				answer += '(';													//vorzeitige Definition String korrekte Ableitung
			}
			else {
				question += ' + (';												//alternativ Vorzeichen, falls nicht mehr erste Position
				answer += ' + (';												//eigentlicher Start String korrekte Ableitung, weiter ab Fortsetzung
			}
			first = true;
			for(let i = 0; i < prod.bracket_one_norm.length; ++i)
				question += prod.bracket_one_norm[i].output();
			question += ')*(';
			first = true;
			for(let i = 0; i < prod.bracket_two_norm.length; ++i)
				question += prod.bracket_two_norm[i].output();
			question += ')';													//Ende Angabe-String														
			first = true;
			for(let i = 0; i < prod.bracket_one_norm.length; ++i)				//Fortsetzung String korrekte Ableitung
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
			answer += ')';														//Ende String korrekte Ableitung
		}
		else if(rand_rule == 3) {
			let chn = new chain(Math.round(Math.random()*(max_inner-min_inner))+min_inner);
			if(j != 0) {														//s. o., zweite flag
				question += ' + '+chn.outer_norm;								//alternativ Vorzeichen, falls nicht mehr erste Position
				if(chn.outer_diff == '-sin')
					answer += ' - sin';
				else
					answer += ' + '+chn.outer_diff;
			}
			else {
				question += chn.outer_norm;										//Festlegung äußere Funktionen bei Frage und korrekter Antwort
				answer += chn.outer_diff;
			}
			if(chn.outer_norm == 'e')											//Start Fragestring
				question += '<sup>';
			else
				question += '(';
			first = true;
			for(let i = 0; i < chn.inner_norm.length; ++i)
				question += chn.inner_norm[i].output();
			if(chn.outer_norm == 'e')
				question += '</sup>';
			else
				question += ')';												//Ende Fragestring
			if(chn.outer_diff == 'e')											//Start String korrekte Antwort
				answer += '<sup>';
			else
				answer += '(';
			first = true;
			for(let i = 0; i < chn.inner_norm.length; ++i)
				answer += chn.inner_norm[i].output();
			if(chn.outer_diff == 'e')											//Mittelteil String korrekte Antwort
				answer += '</sup> *(';
			else
				answer += ')*(';
			first = true;
			for(let i = 0; i < chn.inner_diff.length; ++i)
				answer += chn.inner_diff[i].output();
			answer += ')';														//Ende String korrekte Antwort
		}
	}
	first = true;
	document.getElementById('question').innerHTML = question;
	document.getElementById('solution').innerHTML = answer;
}

//Ausgabe der Lösung, hier wird einzig die Lösung angezeigt, berechnet und ins entsprechende html-Element geschrieben wird sie bereits in der task-Funktion
function solution_visual() {
	document.getElementById('solution').style.visibility = 'visible';
}

//diverse Domänengrenzen, Zugehörigkeit der Werte ist (hoffentlich) aus der Variablen-Bezeichnung ablesbar
var min_coeff = -20;				//durch Math.ceil() bei Parameter-Übergabe sind die Mindestwerte um 1 erhöht
var max_coeff = 19;					//schreibe ggf. auf -1 um
var min_expo = -10;					//durch Math.ceil() bei Parameter-Übergabe sind die Mindestwerte um 1 erhöht
var max_expo = 9;					//schreibe ggf. auf -1 um
var max_inner = 3;					//Höchstzahl Terme innerhalb eines Produkt- oder Kettenterms
var min_inner = 2;					//Mindeszahl Terme innerhalb eines Produkt- oder Kettenterms
var max_total = 5;					//Höchstzahl der gesamten Terme (additiv, multiplikativ, Ketten)
var min_total = 1;					//Mindestzahl der gesamten Terme (additiv, multiplikativ, Ketten)

//globale flag zur Unterscheidung ob ein Term der erste in einer additiven Reihe ist, initialisiert mit true
var first = true;

/***Anmerkung zu den Domänengrenzen:
Koeffizienten und auch Exponenten können nach derzeitigem Vorliegen 0 werden, wobei viele Fälle ausgefangen werden.
Ein unwahrscheinlicher, aber möglicher Problemfall ist, wenn in einem inneren Term (Produkt oder Kettenfunktion) vor oder nach
Ableitung alle Koeffizienten den Wert 0 zufällig zugewiesen bekommen. Dann ist der ganze Term obsolet, wird aber noch als ()
dargestellt und die Ableitung des zweiten Terms angezeigt, obwohl das mathematisch keinen Sinn macht (Multiplikation mit 0
eliminiert alle multiplikativ mit 0 verknüpfte Terme).
Will man dieses Problem umgehen, entkommentiere man die Zufalls-Operationen nach den jeweiligen Zuweisungen des normalen
Koeffizienten bzw. Exponenten im basic_object-Konstruktor. Dieses Vorgehen legt fest, dass ein negativer Term mit einer definierten
Wahrscheinlichkeit positiv wird. Zusätzlich lege man den maximalen Wert der Domänengrenzen für Koeffizienten und Exponenten
mit -1 fest.***/