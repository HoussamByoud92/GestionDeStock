<?php
    require_once("../metier/produit.php");

    if(isset($_GET['action'])) $action=$_GET['action'];

    switch($action){
        case 'read':
            $Produit=new Produit("","","","","","","","");
            
            echo json_encode($Produit->read($_GET['reference'],
            $_GET['scat'],
            $_GET['cat'],
            $_GET['orderBy'],
            $_GET['order'],
            $_GET['limit'],
            $_GET['dd'],
            $_GET['df']));
            break;
        
        case 'readById':
            $Produit=new Produit("","","","","","","","");
            echo json_encode($Produit->readById($_GET['reference']));
            break;

        case 'create':
            if ($_GET['reference']!=""&&$_GET['libelle']!=""&&$_GET['prix_uni']!=""&&$_GET['prix_ach']!=""&&
                $_GET['prix_vnt']!=""&&$_GET['cat']!=""){
                    $Produit=new Produit($_GET['reference'],$_GET['libelle'],$_GET['prix_uni'],$_GET['prix_ach'],
                    $_GET['prix_vnt'],$_GET['cat'],$_GET['img']);
                    $Produit->create();
            }
            break;

        case 'update':
            if ($_GET['reference']!=""&&$_GET['libelle']!=""&&$_GET['prix_uni']!=""&&$_GET['prix_ach']!=""&&
                $_GET['prix_vnt']!=""&&$_GET['cat']!=""){
                    $Produit=new Produit($_GET['reference'],$_GET['libelle'],$_GET['prix_uni'],$_GET['prix_ach'],
                    $_GET['prix_vnt'],$_GET['cat'],$_GET['img']);
                $Produit->update($_GET['id']);
                require_once("../img/rename.php");
                $rn=new Rename_Img();
                $rn->rename($_GET['id'],$_GET['reference'],$_GET['img']);
            }
            break;

        case 'delete':
            $Produit=new Produit($_GET['reference'],"","","","","","","");
            $Produit->delete();
            break;

        case 'count':
            $Produit=new Produit("","","","","","","","");
            echo json_encode($Produit->count(""));
            break;

        case 'count2':
            $Produit=new Produit("","","","","","","","");
            echo json_encode($Produit->count("1"));
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>