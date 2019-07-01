document.querySelector("#adregistr").onclick = function (event) {
   var formElement = document.querySelector("form");
   var formData = new FormData(formElement);
   var xhtp = new XMLHttpRequest();
   xhtp.open("POST", "rezerva.php");

   xhtp.onload = function () {
         var rasp_dupa_clic = JSON.parse(this.responseText.substring(this.responseText.indexOf('{'))); //JSON.parse(this.responseText);
         var scriu_rasp = document.querySelector("#locul_rasp");
         var continut_rasp = '<h2>{name},</h2><br><p>Rezervarea dumneavoastra a fost preluata. Revenim rapid cu o confirmare.<br><br><h5>Ne poti contacta oricand si pe <ul><li> <a href="contact.html"> ☎ telefon</li> <li><a href="https://www.facebook.com/Rent-a-Car-Inchirieri-Auto-Cluj-Napoca-352356291864336/?__tn__=kCH-R&eid=ARCED_wIntHZVHHyAyPT1SW6Y-keNn6PRIEiMSTPs7ztJYtqmLHq2jwixavwQhKjuMB4zT-xV5gCamjl&hc_ref=ARQ7QVTO6tXjcMSi4-V0Y9RFhHqH7QUxuiGiUUVt9CMOc0XDStOXRN8_jRSCybTDXwQ&fref=nf"target="_blank">@ Facebook</a></li> <li> <a href="mailto:clau.bodea@yahoo.com?subject=Rezervari%20masina&body=Buna%20ziua%20,">✉ Email</a></li></h5></p>';

         continut_rasp=continut_rasp.replace('{name}', rasp_dupa_clic.name);   
         document.querySelector("#locul_form").style.display = 'none';  
         scriu_rasp.innerHTML = continut_rasp;
         };

   xhtp.onerror = function () {
      alert('Eroare! Incercati din nou!');
      };

   xhtp.send(formData);
};