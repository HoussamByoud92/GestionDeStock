<?php
    require_once("../metier/sous_categorie.php");
    if(isset($_GET['action'])) $action=$_GET['action'];
    switch($action){
        case 'read':
            $SousCategorie=new SousCategorie("","","");
            echo json_encode($SousCategorie->read($_GET['id']));       
            break;
        
        case 'readById':
            $SousCategorie=new SousCategorie("","","");
            echo json_encode($SousCategorie->readById($_GET['id']));
            break;

        case 'create':
            $SousCategorie=new SousCategorie("",$_GET['cat'],$_GET['scat']);
            echo json_encode($SousCategorie->create());
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