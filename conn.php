<?php
  $cnx = mysqli_connect("localhost","root","","vroom"); //cand mergem live, punem in loc de localhost datele serverului in File manager. Apoi: cine se conecteaza, cu ce parola, la ce baza de date.
  if (mysqli_connect_errno()) {
  // Se testeaza conexiunea . 
     die("Conectare la MySQL nereusita: " . mysqli_connect_error());
  };
  mysqli_set_charset($cnx,"utf8");
?>