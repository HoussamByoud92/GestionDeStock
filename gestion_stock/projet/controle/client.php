<?php
    require_once("../metier/client.php");

    if(isset($_GET['action'])) $action=$_GET['action'];

    switch($action){
        case 'read':
            $Client=new Client("","","","","");
            echo json_encode($Client->read($_GET['nom'],$_GET['orderBy'],$_GET['order'],$_GET['limit'],$_GET['dd'],$_GET['df']));
            break;
        
        case 'readById':
            $Client=new Client("","","","","");
            echo json_encode($Client->readById($_GET['id']));
            break;

        case 'create':
            if ($_GET['nom']!=""&&$_GET['tele']!=""&&$_GET['mail']!=""&&$_GET['adr']!=""){
                $Client=new Client("",$_GET['nom'],$_GET['tele'],$_GET['mail'],$_GET['adr']);
                $Client->create();
            }
            break;

        case 'update':
            if ($_GET['nom']!=""&&$_GET['tele']!=""&&$_GET['mail']!=""&&$_GET['adr']!=""){
                $Client=new Client($_GET['id'],$_GET['nom'],$_GET['tele'],$_GET['mail'],$_GET['adr']);
                $Client->update();
            }
            break;

        case 'delete':
            $Client=new Client($_GET['id'],"","","","");
            $Client->delete();
            break;

        case 'count':
            $Client=new Client("","","","","");
            echo json_encode($Client->count(""));
            break;

        case 'count2':
            $Client=new Client("","","","","");
            echo json_encode($Client->count("1"));
            break;
                
        default:
            echo "ERROR";
        break;
    }
?>