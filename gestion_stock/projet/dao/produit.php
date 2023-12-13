<?php
    class Produit_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createProduit($r,$l,$pu,$pa,$pv,$scat,$i){
            $pdo=$this->getPDO();
            $sql=
            $res=$pdo->prepare("INSERT INTO produit 
            (reference,libelle,prix_uni,prix_ach,prix_vnt,qtt,img,date_aj,id_scat)
            VALUES
            ('$r','$l','$pu','$pa','$pv',0,'$i',NOW(),'$scat')
            ");
            $res->execute();
        }

        function readProduits($ref,$scat,$cat,$orderBy,$order,$limit,$dd,$df){
            $pdo=$this->getPDO();
            $sql="SELECT * FROM produit NATURAL JOIN sous_categori NATURAL JOIN categorie";
            $sql.=" WHERE";
            if ($dd!="") $sql.=" date_aj >= '$dd' AND";
            if ($df!="") $sql.=" date_aj <='$df' AND";
            if ($scat!=""&&$scat!=0) $sql.=" id_scat='$scat' AND";
            if($scat==0) $sql.=" id_cat='$cat' AND";
            $sql.=" reference LIKE '%$ref%' ORDER BY $orderBy $order";
            if($limit!="all") $sql.=" LIMIT $limit";
            $res=$pdo->prepare($sql);
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readProduitsById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM produit NATURAL JOIN sous_categori NATURAL JOIN categorie WHERE reference='$id'");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function updateProduit($i,$r,$l,$pu,$pa,$pv,$scat,$img){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("
            UPDATE produit SET
            reference='$r',libelle='$l',prix_uni='$pu',prix_ach='$pa',
            prix_vnt='$pv',img='$img',date_aj='NOW()',id_scat='$scat'
            WHERE reference='$i'
            ");
            $res->execute();
        }

        function deleteProduit($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM produit WHERE reference='$id'");
            $res->execute();
        }

        function countProduit($td){
            $pdo=$this->getPDO();
            $sql="SELECT COUNT(reference) AS COUNT FROM produit";
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