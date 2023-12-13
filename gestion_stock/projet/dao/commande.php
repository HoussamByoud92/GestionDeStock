<?php
    class Commande_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createCommande($N,$C){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO commande VALUES ('$N','$C',NOW())");
            $res->execute();
        }

        function readCommandes($order,$limit,$dd,$df){
            $pdo=$this->getPDO();
            $sql="SELECT id_cmd,nom,date,SUM(prix*qtt) AS mnt FROM commande NATURAL JOIN client NATURAL JOIN ligne_cmd";
            if ($dd!=""||$df!="")  $sql.= " WHERE";
            if ($dd!="") $sql.=" date >= '$dd'";
            if ($df!="") $sql.=" AND date <='$df'";
            $sql.=" GROUP BY id_cmd ORDER BY date $order";
            if($limit!="all") $sql.=" LIMIT $limit";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readCommandesById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM commande NATURAL JOIN client WHERE id_cmd='$id'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function countCommande($td){
            $pdo=$this->getPDO();
            $sql="SELECT COUNT(id_cmd) AS COUNT FROM commande";
            if($td!="") $sql.=" WHERE date=DATE(NOW())";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function insertLineCommande($n,$pro,$q){
            $pdo=$this->getPDO();
            $res=$pdo->prepare(
                "UPDATE produit SET qtt = CASE
                    WHEN qtt-$q>0 THEN qtt-$q
                    WHEN qtt-$q<0 THEN 0
                END
                WHERE reference = '$pro'
            ");
            $res->execute();
            $res=$pdo->prepare("SELECT prix_uni FROM produit WHERE reference='$pro'");
            $res->execute();
            while ($row=$res->fetch()) {
                $prix=$row['prix_uni'];
            }
            $res=$pdo->prepare("INSERT INTO ligne_cmd VALUES ($n,'$pro',$prix,$q)");
            $res->execute();
        }

        function readByIdLineCommande($n){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM ligne_cmd WHERE id_cmd ='$n'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function deleteCommande($n){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM ligne_cmd WHERE id_cmd ='$n'");
            $res->execute();
            $res=$pdo->prepare("DELETE FROM commande WHERE id_cmd ='$n'");
            $res->execute();
        }
    }
?>