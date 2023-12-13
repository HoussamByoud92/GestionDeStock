<?php
    require_once("../dao/admin.php");
    session_start();
    $Admin = new Admin_DAO();
    if(isset($_SESSION['login'])&&isset($_SESSION['pass'])) echo json_decode($Admin->check($_SESSION['login'],$_SESSION['pass']));
    else echo json_decode("0");
?>