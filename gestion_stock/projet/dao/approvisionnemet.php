<?php
    class Approvisionnemet_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createApprovisionnemet($ID,$F,$P,$Q){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO app VALUES ($ID,$F,'$P',NOW(),$Q)");
            $res->execute();
            $res=$pdo->prepare("UPDATE produit SET qtt=qtt+$Q WHERE reference='$P'");
            $res->execute();
        }

        function readApprovisionnemets($order,$limit,$dd,$df){
            $pdo=$this->getPDO();
            $sql="SELECT * FROM app NATURAL JOIN fournisseur JOIN produit
            WHERE app.reference=produit.reference";
            if ($dd!="") $sql.=" date >= '$dd'";
            if ($df!="") $sql.=" AND date <='$df'";
            $sql.=" ORDER BY date $order";
            if($limit!="all") $sql.=" LIMIT $limit";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readApprovisionnemetsById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM app NATURAL JOIN fournisseur JOIN produit 
                WHERE app.reference=produit.reference AND id_app='$id'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function deleteApprovisionnemet($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM app WHERE id_app ='$id'");
            $res->execute();
        }
    }
?>