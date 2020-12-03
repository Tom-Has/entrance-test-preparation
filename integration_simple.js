//Objekt-Konstruktor basic_object(param_coeff, param_expo, param_val), sowie Ableitungs- und Integrier-Funktionen aus term_basicobject.js übernommen
//muss noch grundlegend überarbeitet werden, dzt. kaum funktionsfähig und stark reduziert

//Funktion zur Ausgabe der Aufgabe und Stammfunktion, gleichname Variablen wie im o. g. Script haben sinngemäße Bedeutung
function task_integrate() {
	document.getElementById('question').innerHTML = '';
	document.getElementById('solution').innerHTML = '';
	document.getElementById('solution').style.visibility = 'hidden';
	let terms = 3;													//willkürliche Festlegung auf exakt drei Terme pro Aufgabe, kann später zufällig festgelegt werden
	let question = '&int; (';
	let answer = 'F(x) = ';
	for(let l = 0; l < terms; ++l) {
		if(Math.round(Math.random())) {								//Rundung zw. 0 und 1 bestimmt zufällig ob nur ein basic_object (Summenregel) erstellt wird, mit kleinem Schwerpunkt auf 0 (Math.random() inkl. 0, exkl. 1)
			let sum_norm = new basic_object(Math.ceil(Math.random()*(max_coeff - min_coeff)+min_coeff), Math.ceil(Math.random()*(max_expo - min_expo)+min_expo));
			let sum_stem = integrate_it(sum_norm);
			question += sum_norm.output();
			if(l == 0)												//unangenehme Lösung aus o. g. Script übernommen
				first = true;
			answer += sum_stem.output();
		} 
		else {														//alternativ sehr einfach gestrickte partielle Integration
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

//solution_visual() wird von differentiation_rules.js übernommen, es wird nur die visibility vom Lösungsfeld auf sichtbar gestellt

/***
Zwischenparken von alten Bestandteilen:
...
***/

