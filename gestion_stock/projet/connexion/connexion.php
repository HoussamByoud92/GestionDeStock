<?php
    require_once("../dao/admin.php");
    session_start();
    $_SESSION['login']=$_POST['email'];
    $_SESSION['pass']=$_POST['password'];
    $Admin = new Admin_DAO();
    if($Admin->check($_SESSION['login'],$_SESSION['pass'])==true) header('location: ../presentation');
    else header('location: deconnexion.php');
?>