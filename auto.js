window.onload = function() {
	document.querySelector("#titlu").innerHTML = 'Masini';
  	var formData = new FormData(); 
  	formData.append('categoria', 1); 
  	var request = new XMLHttpRequest();
    request.open("POST", "afi_imag.php");  // Returneaza prod. din categoria id_categ=1

  	//  Am primit date
    request.onload = function() {  
		var sirObj = JSON.parse(this.responseText);  //  Sir de obiecte
	 
		//  O macheta pentru adaugarea unui obiect in bloc.
		// Pt. un obiect aduc din baza: id_produs, fisier_imagine si nume_produs
		var macheta = '<img src="poze/{fisier_imagine}" id="{id_produs}" alt="{nume_produs}" />';
		continut = "";  //  Sir vid

		sirObj.forEach(function(item) {
			//  Inlocuiesc in macheta valorile primite si adaug rezultatul in "continut"
			continut += macheta.replace('{fisier_imagine}', item.fisier_imagine)
							   .replace('{nume_produs}', item.nume_produs)
							   .replace('{id_produs}', item.id_produs);
		});
		document.querySelector(".imagini_mici").innerHTML = continut;  
	};

    // S-a produs o eroare
    request.onerror = function() {
        alert('Eroare! Ceva n-a mers!');
    };

    request.send(formData);
};


document.querySelector(".imagini_mici").addEventListener("click", function(e) {
    //Accesez baza de date, preiau informatiile si refac '<div class="imagini_mici">'; 
	var formData = new FormData();
	formData.append('id_produs', e.target.id); //  "id" este id-ul elementului img selectat cu mouse-ul
	  	  
	var request = new XMLHttpRequest();
    request.open("POST", "produs.php");  //  Returneaza produsul selectat 

    //  Am primit date
    request.onload = function() {  
        var produs = JSON.parse(this.responseText); 
        
  //       // Pt. un obiect aduc din baza:  imagine_mare, nume_produs, prezentare, pastrare, limbajul_florilor, pret
		// var primalitera = produs.nume_produs.substr(0,1);
		// var restul = produs.nume_produs.substr(1);
		// //  Creez titlul
		// document.querySelector("#titlu").innerHTML = '<span class="litera italic">' + primalitera + '</span>' + restul;
		// //construiesc noul continut al blocului <div class="imagini_mici">
		
		continut = "";  
		continut = '<div class="mostra"> <img src="poze/'+ produs.imagine_mare + '"></div>';
		continut += '<div class="descriere"><h2>'  + produs.nume_produs+'</h2>';
		continut += '<h5>Caracteristici</h5><p>'+produs.prezentare+'</p>';
		continut += '<h5>Intretinere</h5><p>' + produs.pastrare +'</p>';
		continut += '<h5>Descriere</h5><p>' + produs.limbajul_florilor +'</p>';
		continut += '<h5>PRET</h5><p>'+ produs.pret+' lei</p>';
		continut += '</div>';
		
		document.querySelector(".imagini_mici").innerHTML = continut;	         
    };

    // S-a produs o eroare
    request.onerror = function() {
        alert('Hopa! Ceva n-a mers!');
    };

    request.send(formData);
      
});