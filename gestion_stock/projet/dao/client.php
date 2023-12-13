<?php
    class Client_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createClient($n,$t,$m,$a){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO client (nom,tele,mail,adr,date_aj) VALUES (?,?,?,?,NOW())");
            $res->execute(array($n,$t,$m,$a));
        }

        function readClients($n,$orderBy,$order,$limit,$dd,$df){
            $pdo=$this->getPDO();
            $sql="SELECT * FROM client";
            $sql.=" WHERE";
            if ($dd!="") $sql.=" date_aj >= '$dd' AND";
            if ($df!="") $sql.=" date_aj <='$df' AND";
            $sql.=" nom LIKE '%$n%' ORDER BY $orderBy $order";
            if($limit!="all") $sql.=" LIMIT $limit";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readClientsById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM client WHERE id_c='$id'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function updateClient($id,$nom,$tele,$mail,$adr){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("UPDATE client SET nom=?,tele=?,mail=?,adr=? WHERE id_c=?");
            $res->execute(array($nom,$tele,$mail,$adr,$id));
        }

        function deleteClient($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM client WHERE id_c=?");
            $res->execute(array($id));
        }

        function countClient($td){
            $pdo=$this->getPDO();
            $sql="SELECT COUNT(id_c) AS COUNT FROM client";
            if($td!="") $sql.=" WHERE date_aj=DATE(NOW())";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }
    
    }
?>