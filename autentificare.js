document.querySelector("#verif").onclick = function (event) {
	var formElement = document.querySelector("form");
	var formData = new FormData(formElement);
	var xhtp = new XMLHttpRequest();
	xhtp.open("POST", "autentificare.php");

		xhtp.onload = function () {
		var raspunsobiect = JSON.parse(this.responseText.substring(this.responseText.indexOf('{'))); //JSON.parse(this.responseText);
		var blocraspuns = document.querySelector("#verificat");
		if(raspunsobiect.autentificat == "da") {
		   var continutbloc = '<h2>Bine ai revenit, {nume}! Acum poti <a href="adaugare.html">adauga</a> produse in baza de date sau te poti <a href="deconectare.php">deconecta.</h2>';
		 } else {
		   var continutbloc = '<h2>{nume}, autentificare esuata. Va rog sa va <a href="login.html">autentificati.</a></h2>';
		}
		continutbloc = continutbloc.replace('{nume}', raspunsobiect.nume);
		document.querySelector("#blocform").style.display='none';
		blocraspuns.innerHTML = continutbloc;
		
	};

	// S-a produs o eroare
	xhtp.onerror = function () {
		alert('Hopa! Ceva n-a mers!');
	};

	xhtp.send(formData);
};

