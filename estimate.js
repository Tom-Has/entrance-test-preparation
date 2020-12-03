//allgemeine Variable für die Anzahl unterschiedlicher Aufgabentypen
var typenum = 6;

//Intervall für Menge an Zahlen einer Formel, hier mit 2 und 5 willkürlich festgesetzt
var min_amount = 2;
var max_amount = 5;

//Intervall für diverse Zahlenbereiche, sollen Potenzen von 10 sein, um Inkonsistenzen bei nachfolgenden Manipulationen zu vermeiden
var min_value = 10;
var max_value = 1000;

//Objektkonstruktor unterteilt in unterschiedliche Aufgabentypen
function estimate() {
	this.define = Math.floor(Math.random() * typenum)
	this.result = '';
	this.wrong = [];
	if(this.define == 0) {									//Abschnitt für Dezimalzahl Rechnungen
		this.amount = (Math.floor(Math.random() * (max_amount - min_amount))) + min_amount;	//Anzahl der Elemente in der Formel
		this.prec = Math.ceil(Math.random() * 3);
		this.op = '';													
		this.inter = 0;													//Zwischenwert, beachte: wird ausserhalb Erstellung des Ausgabe-Strings eigentlich nicht gebraucht, muss keine Instanzvariable sein und müsste nur in put-Funktion vorkommen
		this.first = true;
		this.put = function() {											//Ausgabefunktion, die außerdem Ergebnis manipuliert und falsche Ergebnisse generiert
			var output = '';											// return Variable
			for(var i = 0; i < this.amount; ++i) {
				if(!this.first) {										//Unterscheidung übrige Ausgabelemente vom ersten
					if((Math.ceil(Math.random() * 10)) % 2 == 0)		//zufällige Festlegung ob Addition oder Subtraktion der folgenden Formelelemente
						this.op = '+';
					else
						this.op = '-';
					this.inter = (((Math.random() * (max_value - min_value))) + min_value).toFixed(this.prec);	//zufällige Festlegung eines Formelelements
					this.result = eval(this.result+this.op+this.inter).toFixed(this.prec);	//forlaufendes Mitrechnen des echten Ergebnisses
					output += ' '+this.op+' '+this.inter;				//Ausgabe-String erweitern
				}
				else {													//hier wird der erste Fall behandelt, Schritte sinngemäß wie oben beschrieben
					this.first = false;
					this.inter = (((Math.random() * (max_value - min_value))) + min_value).toFixed(this.prec);	
					this.result = this.inter;
					output += this.inter;
				}
			}
			this.wrong[0] = eval(this.result + '+' + '0.1');			//Generierung falscher Ergebnisse, in allen folgenden Fällen total willkürlich
			this.wrong[1] = eval(this.result + '+' + '0.01');
			this.wrong[2] = eval(this.result + '*' + '1.1').toFixed(this.prec);
			return output + ' =';										//Ausgabe-String als Funktionsresultat
		}
	}
	else if(this.define == 1) {								//Abschnitt für Quadrierung
		this.elem = Math.ceil((Math.random() * ((max_value / 10) - min_value)) + min_value);
		this.result = Math.pow(this.elem, 2);
		this.wrong[0] = (this.result * 3.3).toFixed(); 
		this.wrong[1] = (this.result * 1.1).toFixed();
		this.wrong[2] = Math.round(this.result * 0.9);
		this.put = function() {
			return this.elem + '<sup>2</sup> =';
		}
	}
	else if(this.define == 2) {								//Abschnitt für Wurzeln
		this.result = Math.ceil((Math.random() * ((max_value / 10) - min_value)) + min_value);
		this.wrong[0] = (this.result * 1.5).toFixed(); 
		this.wrong[1] = (this.result * 1.1).toFixed();
		this.wrong[2] = (this.result * 0.9).toFixed(2);
		this.put = function() {
			return 'Quadratwurzel von ' + Math.pow(this.result, 2)+ ' =';
		}
	}
	else if(this.define == 3) {								//Abschnitt für Prozent-Rechnung
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
	else if(this.define == 4) {								//Abschnitt für Multiplikation
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
	else if(this.define == 5) {								//Abschnitt Bruchrechnen
		this.amount = (Math.floor(Math.random() * (max_amount - min_amount))) + min_amount;	//wie im ersten Abschnitt, zufällige Anzahl der Formelelemente
		this.fraction = function() {									//Erstellung Subkonstruktor für Brüche
			this.denom = Math.floor(Math.random() * (20 - 2)) + 2;		//Nenner, zufällig zwischen 2 und 20
			this.num = Math.floor(Math.random() * (20 - 2)) + 2;		//Zähler, zufällig zwischen 2 und 20	
			while(this.num >= this.denom) 								//Reduktion des Zählers um die Hälfte (willkürlich festgesetzt), bis er kleiner als der Nenner ist
				this.num = Math.round(this.num /= 2);
			this.showfract = function() {
				return this.num + '/' + this.denom;
			}
		}
		this.collection = [];											//Anlegen eines Arrays, der nachfolgenden mit Bruch-Objekten befüllt wird
		for(var i = 0; i < this.amount; ++i)
			this.collection[i] = new this.fraction();
		this.put = function() {											//sinngemäße Funktion wie im ersten Abschnitt, inkl. Unterscheidung erstes Element von allen folgenden
			var output = '';
			this.first = true;											//alternative Verwendung der boole'schen flag, zum testen ob das funktioniert
			var fract;
			for(var i = 0; i < this.amount; ++i) {
				if(!this.first) {
					if((Math.ceil(Math.random() * 10)) % 2 == 0)		//wie Abschnitt 1, zufällige Festlegung ob Addition oder Subtraktion der folgenden Formelelemente
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
			var kurz = Math.abs(ggt(fract.denom, fract.num)); 			//Absolutbetrag des größten gemeinsamen Teilers, gewöhnliche Funktion s. untem im Skript
			fract.num /= kurz;											//Kürzen der beiden Anteile durch den ggT
			fract.denom /= kurz;
			this.result = fract.showfract();
			++fract.num; ++fract.denom;									//in Folge willkürliches Ändern des echten Ergebnisses
			this.wrong[0] = fract.showfract();
			fract.num *= 2; fract.denom *= 3;
			this.wrong[1] = fract.showfract();
			fract.num -= 10; fract.denom = Math.round(fract.denom /= 2);
			this.wrong[2] = fract.showfract();
			return output + ' =';
		}
	}
}

//Funktion zur Erstellung eines Schätzobjekts und Erstellen der Frageoptionen
function task_estimate() {
	document.getElementById('solution').innerHTML = '';
	x = new estimate(); 								//globale Variable, da in der Lösungsfunktion auf das Ergebnis des Objekts zugegriffen wird
	document.getElementById('question').innerHTML = x.put()+'<br><br>';
	var antwort = [];									//Array mit den Antwortmöglichkeiten, in der Folge werden richtige und falsche Antworten zugewiesen
	antwort[0] = '<input type="radio" name="estim" id="right"> '+x.result;
	antwort[1] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[0];
	antwort[2] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[1];
	antwort[3] = '<input type="radio" name="estim" id="wrong"> '+x.wrong[2];
	antwort.sort(function(a, b){return 0.5 - Math.random()});	//zufällige Sortierung der Antwortmöglichkeiten
	for(var i = 0; i < 4; ++i)
		document.getElementById('question').innerHTML += antwort[i]+'<br>';
	//console.log(x.result);								//ein bisschen schummeln darf man ja auch ;)
}

//Funktion zum Abrufen der Lösung
function solution_estimate() {
	if(document.getElementById('right').checked)
		document.getElementById('solution').innerHTML = 'Korrekt!';
	else
		document.getElementById('solution').innerHTML = 'Falsch. Die korrekte Antwort lautet '+x.result;
}

//größter gemeinsamer Teiler selbst implementiert, für Abschnitt Bruchrechnen im estimate-Konstruktor
function ggt(a, b) {
	if(a % b == 0)
		return b;
	else
		return ggt(b, (a%b));
}