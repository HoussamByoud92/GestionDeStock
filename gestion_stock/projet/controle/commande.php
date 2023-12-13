<?php
    require_once("../metier/commande.php");

    if(isset($_GET['action'])) $action=$_GET['action'];

    switch($action){
        case 'read':
            $Commande=new Commande("","");
            echo json_encode($Commande->read($_GET['order'],$_GET['limit'],$_GET['dd'],$_GET['df']));
            break;
        
        case 'readById':
            $Commande=new Commande("","");
            echo json_encode($Commande->readById($_GET['N']));
            break;

        case 'create':
            if ($_GET['N']!=""&&$_GET['C']!=""){
                $Commande=new Commande($_GET['N'],$_GET['C']);
                $Commande->create();
            }
            break;

        case 'count':
            $Commande=new Commande("","");
            echo json_encode($Commande->count(""));
            break;

        case 'count2':
            $Commande=new Commande("","");
            echo json_encode($Commande->count("1"));
            break;

        case 'insertLine':
            $Commande=new Commande("","");
            $Commande->insertLine($_GET['n'],$_GET['pro'],$_GET['q']);
            break;

        case 'readByIdLine':
            $Commande=new Commande("","");
            echo json_encode($Commande->readByIdLine($_GET['N']));
            break;

        case 'delete':
            $Commande=new Commande("","");
            echo json_encode($Commande->delete($_GET['N']));
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>