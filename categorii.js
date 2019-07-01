document.querySelector("body").onload = function () {
        var xhtp = new XMLHttpRequest();
        xhtp.open("GET", "categorii.php");
    var lista = '<option value="0">(Alegeti categoria)</option>'; 
        // lista va contine in final elementele <option>
    
      //  Construiesc prototipul unui element <option>
         var prototip = '<option value={id_categ}>{categoria}</option>';
    
        // S-au primit date de la scriptul de pe server
        xhtp.onload = function () {
           var sirobiecte = JSON.parse(this.responseText);
           var combo = document.querySelector("#combo");  // elem. <select>
           sirobiecte.forEach(function(cat) {
                var rind = prototip.replace('{id_categ}', cat.id_categ);
        rind = rind.replace('{categoria}', cat.categoria);
        // console.log(cat.id_categ+" " + cat.categoria);
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
