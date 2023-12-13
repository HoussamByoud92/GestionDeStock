<?php
    require_once("../dao/categorie.php");
    class Categorie{
        private $id;
        private $categorie;
        function __get($prop){
            switch ($prop) {
                case 'id': return $this->id;  break;
                case 'categorie': return $this->categorie;  break;
            }
        }
        function __construct($id,$c){
                $this->id=$id;
                $this->categorie=$c;
        }
        function create(){
            $Categorie_DAO=new Categorie_DAO();
            $Categorie_DAO->createCategorie($this->categorie);
        }
        static function read(){		
            $Categorie_DAO=new Categorie_DAO();
            return $Categorie_DAO->readCategories();
        }
        static function readById($id){		
            $Categorie_DAO=new Categorie_DAO();
            return $Categorie_DAO->readCategorieByID($id);
        }
        function update(){
            $Categorie_DAO=new Categorie_DAO();
            $Categorie_DAO->updateCategorie($this->id,$this->categorie);
        }
    }
?>