<?php
    class SousCategorie_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createSousCategorie($id,$c){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO sous_categori (id_cat,scat) VALUES (?,?)");
            $res->execute(array($id,$c));
        }

        function readSousCategorie($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM sous_categori WHERE id_cat = ?");
            $res->execute(array($id));
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readSousCategorieById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM sous_categori WHERE id_scat = ?");
            $res->execute(array($id));
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function updateCategorie($id,$categorie){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("UPDATE sous_categori SET categorie=? WHERE id_c=?");
            $res->execute(array($categorie,$id));
        }

        function deleteCategorie($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM sous_categori WHERE id_c=?");
            $res->execute(array($id));
        }
    
    }
?>