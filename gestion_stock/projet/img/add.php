<?php
    $sourcePath = $_FILES['image']['tmp_name'];
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $targetPath = "produit/" . $_POST['r'] . '.' . $ext;
    move_uploaded_file($sourcePath,$targetPath);
?>