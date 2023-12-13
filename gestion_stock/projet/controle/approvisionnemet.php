<?php
    require_once("../metier/approvisionnemet.php");

    if(isset($_GET['action'])) $action=$_GET['action'];

    switch($action){
        case 'read':
            $Approvisionnemet=new Approvisionnemet("","","","");
            echo json_encode($Approvisionnemet->read($_GET['order'],$_GET['limit'],$_GET['dd'],$_GET['df']));
            break;
        
        case 'readById':
            $Approvisionnemet=new Approvisionnemet("","","","");
            echo json_encode($Approvisionnemet->readById($_GET['id']));
            break;

        case 'create':
            if ($_GET['id']!=""&&$_GET['f']!=""&&$_GET['p']!=""&&$_GET['q']){
                $Approvisionnemet=new Approvisionnemet($_GET['id'],$_GET['f'],$_GET['p'],$_GET['q']);
                $Approvisionnemet->create();
            }
            break;

        case 'delete':
            $Approvisionnemet=new Approvisionnemet("","","","");
            echo json_encode($Approvisionnemet->delete($_GET['id']));
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>