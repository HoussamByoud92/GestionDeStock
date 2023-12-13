<?php
    require_once("../metier/categorie.php");
    if(isset($_GET['action'])) $action=$_GET['action'];
    switch($action){
        case 'read':
            $Categorie=new Categorie("","");
            echo json_encode($Categorie->read());
            break;
        
        case 'readById':
            $Categorie=new Categorie("","");
            echo json_encode($Categorie->readById($_GET['id']));
            break;

        case 'create':
            $Categorie=new Categorie("",$_GET['cat']);
            echo json_encode($Categorie->create());
            break;

        case 'update':
            break;

        case 'delete':
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>