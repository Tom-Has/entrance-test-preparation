//Objekt-Konstruktor für Umrechungsfaktoren in der Zahlenreihe
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
		if(this.operator == '/' && x%this.zahl != 0)	//ändere Division auf Addition, falls kein ganzzahliges Ergebnis
			this.operator = '+';
		return x = eval(x+this.operator+this.zahl);
	}
}

//Erstellen einer Zahlenreihe
function task_series() {
	var schritte = 5;	//Anzahl der duchgeführten Schritte wird willkürlich festgelegt
	var start = Math.ceil(Math.random()*10);	//Startvariable
	var opnum = Math.ceil(Math.random()*(schritte-1));	//zufällig erstelle Anzahl an Umrechungen
	var oparray = [];
	var count = 0;
	var tz = ' &rarr; ';
	var ausgabe = start;
	for(var i = 0; i < opnum; ++i) 			//Array mit Umrechungsobjekten füllen
		oparray[i] = new series;
	for(var j = 0; j < schritte; ++j) {		//durch Schrittanzahl durchiterieren
		if(count >= opnum)					//zusätzliche Steuervariable, die dem Array angepasst ist
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

//Kontrolle der Eingabe und Anzeige der Lösung
function solution_series() {
	var vorschlag = document.getElementById("enter").value;
	var loesung = document.getElementById("solution").value;
	if(vorschlag == loesung)
		document.getElementById("solution").innerHTML = 'Ihre Angabe ist korrekt!';
	else
		document.getElementById("solution").innerHTML = 'Ihre Angabe ist falsch. Die Lösung lautet '+loesung+'.';
}