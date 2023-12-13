<?php
    require_once("../metier/fournisseur.php");

    if(isset($_GET['action'])) $action=$_GET['action'];

    switch($action){
        case 'read':
            $Fournisseur=new Fournisseur("","","","","");
            echo json_encode($Fournisseur->read($_GET['nom'],$_GET['orderBy'],$_GET['order'],$_GET['limit'],$_GET['dd'],$_GET['df']));
            break;
        
        case 'readById':
            $Fournisseur=new Fournisseur("","","","","");
            echo json_encode($Fournisseur->readById($_GET['id']));
            break;

        case 'create':
            if ($_GET['nom']!=""&&$_GET['tele']!=""&&$_GET['mail']!=""&&$_GET['adr']!=""){
                $Fournisseur=new Fournisseur("",$_GET['nom'],$_GET['tele'],$_GET['mail'],$_GET['adr']);
                $Fournisseur->create();
            }
            break;

        case 'update':
            if ($_GET['nom']!=""&&$_GET['tele']!=""&&$_GET['mail']!=""&&$_GET['adr']!=""){
                $Fournisseur=new Fournisseur($_GET['id'],$_GET['nom'],$_GET['tele'],$_GET['mail'],$_GET['adr']);
                $Fournisseur->update();
            }
            break;

        case 'delete':
            $Fournisseur=new Fournisseur($_GET['id'],"","","","");
            $Fournisseur->delete();
            break;

        case 'count':
            $Fournisseur=new Fournisseur("","","","","");
            echo json_encode($Fournisseur->count(""));
            break;
        
        case 'count2':
            $Fournisseur=new Fournisseur("","","","","");
            echo json_encode($Fournisseur->count("1"));
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>