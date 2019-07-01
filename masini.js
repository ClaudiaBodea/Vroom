document.querySelector("body").onload = function () {

        var request = new XMLHttpRequest();
        request.open("POST", "conectat.php");  

        //  Am primit date
        request.onload = function() {  
            if (this.responseText == "nu") {
                window.location.href = "login.html";
            }
        };

        // S-a produs o eroare
        request.onerror = function () {
            alert('Hopa! Ceva n-a mers!');
            };

        request.send();



var xhtp = new XMLHttpRequest();
xhtp.open("GET", "masini.php");
    var lista = '<option value="0">(Alegeti masina)</option>';         
        
        var prototip = '<option value={id_auto}>{tip}</option>';        
        
xhtp.onload = function () {
    var sirobiecte = JSON.parse(this.responseText);
    var combo = document.querySelector("#loc_combo");
    sirobiecte.forEach(function(cat) {
        var rind = prototip.replace('{id_auto}', cat.id_auto);
            rind = rind.replace('{tip}', cat.tip);
            // console.log(cat.id_auto+" " + cat.tip);
        lista += rind;
    });
    combo.innerHTML = lista;
};

    // S-a produs o eroare
    xhtp.onerror = function () {
        alert('Hopa! Ceva n-a mers!');
    };

    xhtp.send();
};
