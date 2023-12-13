<?php
    class Categorie_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function createCategorie($c){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("INSERT INTO categorie (cat) VALUES (?)");
            $res->execute(array($c));
        }

        function readCategories(){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM categorie");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function readCategorieById($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM categorie WHERE id_cat=$id");
            $res->execute();
            $lst=array();
            while ($row=$res->fetch()) {
                $lst[]=$row;
            }
            return $lst;
        }

        function updateCategorie($id,$categorie){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("UPDATE categorie SET categorie=? WHERE id_c=?");
            $res->execute(array($categorie,$id));
        }

        function deleteCategorie($id){
            $pdo=$this->getPDO();
            $res=$pdo->prepare("DELETE FROM categorie WHERE id_c=?");
            $res->execute(array($id));
        }
    
    }
?>