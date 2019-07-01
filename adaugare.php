<?php
   function corectez($sir) {
    $sir = trim($sir);
    $sir = stripslashes($sir);
    $sir = htmlspecialchars($sir);
    return $sir;
   }
  
   if (corectez($_FILES["fisier"]["error"]) > 0) {
      echo "Error: " . $_FILES["fisier"]["error"] . "
"; 
      exit; 
   }
   if (corectez($_FILES["mare"]["error"]) > 0) {
      echo "Error: " . $_FILES["mare"]["error"] . "
";
      exit; 
   }
   $numeimagine = corectez($_FILES["fisier"]["name"]); 
   $poz = strrpos($numeimagine, "."); 
   $extensie = substr($numeimagine, $poz); 
   $nmtmp = $_FILES["fisier"]["tmp_name"]; 
   
   $numeimaginemare = corectez($_FILES["mare"]["name"]); 
   $pozm = strrpos($numeimaginemare, "."); 
   $extensiem = substr ($numeimaginemare, $pozm); 
   $nmtmpm = $_FILES["mare"]["tmp_name"]; 
   
   $im = 'a.png'; // Pentru poze initial folosesc un nume generic (a.png)
   $categoria = corectez($_POST["combo"]); 
   $nume = corectez($_POST["nume"]); 
   $prezentare = corectez($_POST["prez"]); 
   $pastrare = corectez($_POST["pastr"]); 
   $limbajul = corectez($_POST["limbaj"]); 
   $pretul = corectez($_POST["pret"]);
   
   include("conn.php");
 
   $raspuns = [];
   $cda = "INSERT INTO produse (fisier_imagine, imagine_mare, id_categ, nume_produs, prezentare, pastrare, limbajul_florilor, pret) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; //cheia primara e un camp de tip autoincrement
   $stmt = mysqli_prepare($cnx, $cda);
   mysqli_stmt_bind_param($stmt, 'ssissssd', $im, $im, $categoria, $nume, $prezentare, $pastrare, $limbajul, $pretul);
   mysqli_stmt_execute($stmt);
        
   $id = mysqli_insert_id($cnx);  //  ID-ul ultimului articol introdus
   // Generez un nume dependent de id si transfer fisierul cu poza in directorul "poze"
   $numenou = 'imagine' . (string)$id.strtolower($extensie);
   $numenoumare = 'imagineM' . (string)$id.strtolower($extensiem);
   //  Inlocuiesc numele implicit cu cel real
   $cdaa = "UPDATE produse SET fisier_imagine = '" . $numenou . "', imagine_mare = '" . $numenoumare . "'  WHERE id_produs = $id";
   mysqli_query($cnx, $cdaa);
   //  Mut fisierele din directorul temporar
   $cale = 'poze/'.$numenou;
   $rezultat = move_uploaded_file($nmtmp, $cale);
      
   $raspuns['mesaj'] ='da';
   $raspuns['nume_produs'] = $nume;
      
   if (!$rezultat) {
   $raspuns['mesaj'] ='nu';
   $raspuns['nume_produs'] = $nume;
die(json_encode($raspuns));  //  sau exit()
   }
      
   $cale1 = 'poze/'.$numenoumare;
   $rezultat1 = move_uploaded_file($nmtmpm, $cale1);
   if (!$rezultat1) {
    $raspuns['mesaj'] ='nu';
    $raspuns['nume_produs'] = $nume;
       die(json_encode($raspuns));
   }
   
   //  Inchid $stmt si $cnx
   mysqli_stmt_close($stmt);
   mysqli_close($cnx);
        
   $raspuns['mesaj'] ='da';
   $raspuns['nume_produs'] = $nume;
   echo json_encode($raspuns);
   ?>
