document.querySelector("#adopinie").onclick = function (event) {
   var formElement = document.querySelector("form");
   var formData = new FormData(formElement);
   var xhtp = new XMLHttpRequest();
   xhtp.open("POST", "contact.php");     
   
      xhtp.onload = function () {
         var raspuns_dupa_clic = JSON.parse(this.responseText.substring(this.responseText.indexOf('{'))); //JSON.parse(this.responseText);
         var scriu_raspuns = document.querySelector("#locul_raspunsului");
         var continut_raspuns = '<h2>{name},</h2><br><p>Multumim pentru mesaj. Revenim rapid cu un raspuns.<br><br><h5>Ne poti contacta oricand si pe <a href="contact.html"> ☎ telefon, <a href="https://www.facebook.com/Rent-a-Car-Inchirieri-Auto-Cluj-Napoca-352356291864336/?__tn__=kCH-R&eid=ARCED_wIntHZVHHyAyPT1SW6Y-keNn6PRIEiMSTPs7ztJYtqmLHq2jwixavwQhKjuMB4zT-xV5gCamjl&hc_ref=ARQ7QVTO6tXjcMSi4-V0Y9RFhHqH7QUxuiGiUUVt9CMOc0XDStOXRN8_jRSCybTDXwQ&fref=nf"target="_blank">@ Facebook</a>, sau <a href="mailto:clau.bodea@yahoo.com?subject=Rezervari%20masina&body=Buna%20ziua%20,"> ✉ Email</a>.</h5></p>';
         
         continut_raspuns=continut_raspuns.replace('{name}', raspuns_dupa_clic.name);   
         document.querySelector("#locul_formularului").style.display = 'none';  
         scriu_raspuns.innerHTML = continut_raspuns;
         };

   xhtp.onerror = function () {
      alert('Eroare! Incercati din nou!');
      };

   xhtp.send(formData);
};