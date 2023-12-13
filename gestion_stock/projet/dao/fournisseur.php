<?php
    class Fournisseur_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createFournisseur($n,$t,$m,$a){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO fournisseur (nom,tele,mail,adr,date_aj) VALUES (?,?,?,?,NOW())");
            $res->execute(array($n,$t,$m,$a));
        }

        function readFournisseurs($n,$orderBy,$order,$limit,$dd,$df){
            $pdo=$this->getPDO();
            $sql="SELECT * FROM fournisseur";
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

        function readFournisseursById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM fournisseur WHERE id_f='$id'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function updateFournisseur($id,$nom,$tele,$mail,$adr){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("UPDATE fournisseur SET nom=?,tele=?,mail=?,adr=? WHERE id_f=?");
            $res->execute(array($nom,$tele,$mail,$adr,$id));
        }

        function deleteFournisseur($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM fournisseur WHERE id_f=?");
            $res->execute(array($id));
        }

        function countFournisseur($td){
            $pdo=$this->getPDO();
            $sql="SELECT COUNT(id_f) AS COUNT FROM fournisseur";
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