<?php
    require_once("../dao/sous_categorie.php");
    class SousCategorie{
        private $id_scat;
        private $id_cat;
        private $scat;
        function __get($prop){
            switch ($prop) {
                case 'id_cat': return $this->id_cat;  break;
                case 'scat': return $this->scat;  break;
                case 'id_scat': return $this->id_scat;  break;
            }
        }
        function __construct($id_cat,$id_scat,$c){
                $this->id_cat=$id_cat;
                $this->id_scat=$id_scat;
                $this->scat=$c;
        }
        function create(){
            $SousCategorie_DAO=new SousCategorie_DAO();
            $SousCategorie_DAO->createSousCategorie($this->id_scat,$this->scat);
        }
        static function read($id){		
            $SousCategorie_DAO=new SousCategorie_DAO();
            return $SousCategorie_DAO->readSousCategorie($id);
        }
        static function readById($id){		
            $SousCategorie_DAO=new SousCategorie_DAO();
            return $SousCategorie_DAO->readSousCategorieById($id);
        }
        function update(){
            $SousCategorie_DAO=new SousCategorie_DAO();
            $SousCategorie_DAO->updateSousCategorie($this->id_scat,$this->id_cat,$this->scat);
        }
    }
?>