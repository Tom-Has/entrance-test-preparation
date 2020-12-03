//Konstruktor für den als Grundlage gewählten additiven Term ("Summenregel"), inkl. Wert für Berechnung 
function basic_object(param_coeff, param_expo, param_val) {
	this.coeff = param_coeff;													//Koeffizient wird als Parameter bei Aufruf des Konstruktors übergeben
	this.expo = param_expo;														//Exponent wird als Parameter bei Aufruf des Konstruktors übergeben
	this.value = param_val;														//ggf Wert für die Variable kann auch übergeben werden
	this.output = function() {													//ohne Parameter, da allfällig abgeleitete oder integrierte Terme im Konstruktor übergeben werden
		if(this.value != undefined) {
			return this.coeff * Math.pow(this.value, this.expo);
		}
		else {
			let angabe = '';
			if(this.coeff == Infinity || this.coeff == -Infinity) {				//erster Sonderfall erste Stufe: Integral von x^-1 wird zu ln(x)
				if(first) {
					first = false;
					angabe += 'ln(x) ';
				}
				else
					angabe += ' + ln(x)';
			}
			else if(this.coeff != 0) {											//zweiter Sonderfall erste Stufe: Koeffizient = 0 soll in der Ausgabe überhaupt nicht berücksichtigt werden
				if(first) {
					first = false;												//dieser Teil der Ausgabe behandelt das erste Objekt in einer additiven Folge
					if(this.coeff == 1 && this.expo == 0)						//nachfolgend Sonderfälle bei denen nur 1 bzw. -1 ausgegeben werden soll, der Term aber nicht wegfallen kann
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
				else {															//sinngemäß wie die obere Abzweigung, diese für alle weiteren Terme der additiven Reihe
					if(this.coeff == 1 && this.expo == 0)
						angabe += ' + 1';
					else if(this.coeff == -1 && this.expo == 0)
						angabe += ' - 1';
					else {
						if(this.coeff != -1 && this.coeff < 0)
							angabe += ' - '+Math.abs(this.coeff);				//Leerzeichen zwischen '-' und dem folgenden Term, damit das Vorzeichen gemäß mathematischer Usance wie eine Subtraktion ausschaut
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
}

//Funktionen, die ein basic_object retournieren, mit Werten der Ableitung bzw. Integration
function differentiate_it(bo) {
	return new basic_object(bo.coeff * bo.expo, bo.expo - 1, bo.value);
}

function integrate_it(bo) {
	if(bo.expo + 1)																//Test ob Exponent != 0, sonst nur Übernahme Koeffizient mit ln(x)
		return new basic_object(bo.coeff * (1 / (bo.expo + 1)), bo.expo + 1, bo.value);
	else
		return new basic_object(bo.coeff + '*ln(x)', 0);
}

/*** 
Überarbeitung der alten Version, in der erste Ableitung und Integral im Objekt enthalten waren
auf diese Weise sollte es einfacher sein, eine Kette von Ableitungen zu erstellen
Auslagerung in ein eigenes Skript zur Übersichtlichkeit
***/
