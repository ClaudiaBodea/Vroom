document.querySelector("#adauga").onclick = function (event) {
        var formElement = document.querySelector("form");
        var formData = new FormData(formElement);
        var xhtp = new XMLHttpRequest();
        xhtp.open("POST", "adaugare.php");

        xhtp.onload = function () {
           	var raspunsobiect = JSON.parse(this.responseText.substring(this.responseText.indexOf('{'))); //JSON.parse(this.responseText)
			var blocraspuns = document.querySelector("#adaugare");
			
			if (raspunsobiect.mesaj == "da") 
			{
			var continutbloc = '<h2>Produsul {nume_produs}</h2><p>s-a adaugat in baza de date.</p><h5>Puteti adauga alt <a href="adaugare.html">produs</a> sau va puteti <a href="deconectare.php">deconecta</a></h5>';
			}
			else {
			var continutbloc = '<h2>Produsul {nume_produs}</h2><p>NU s-a adaugat in baza de date.</p><h5>Puteti adauga alt <a href="adaugare.html">produs</a> sau va puteti <a href="deconectare.php">deconecta</a></h5>';
			}
			continutbloc = continutbloc.replace('{nume_produs}', raspunsobiect.nume_produs);
			//ascund #blocform
			document.querySelector("#blocform").style.display='none';
			//scriu
			blocraspuns.innerHTML = continutbloc;
        };

        // S-a produs o eroare
        xhtp.onerror = function () {
            alert('Eroare! Ceva n-a mers!');
        };

        xhtp.send(formData);
    };

