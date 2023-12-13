<?php
    require_once("../dao/fournisseur.php");
    class Fournisseur{
        private $id;
        private $nom;
        private $adresse;
        private $telephone;
        private $email;
        function __get($prop){
            switch ($prop) {
                case 'id': return $this->id;  break;
                case 'nom': return $this->nom;  break;
                case 'adresse': return $this->adresse;  break;
                case 'telephone': return $this->telephone;  break;
                case 'email': return $this->email;  break;
            }
        }
        function __construct($id,$n,$t,$e,$a){
                $this->id=$id;
                $this->nom=$n;
                $this->adresse=$a;
                $this->telephone=$t;
                $this->email=$e;
        }
        function create(){
            $Fournisseur_DAO=new Fournisseur_DAO();
            $Fournisseur_DAO->createFournisseur($this->nom,$this->telephone,$this->email,$this->adresse);
        }
        static function read($n,$ob,$o,$l,$dd,$df){		
            $Fournisseur_DAO=new Fournisseur_DAO();
            return $Fournisseur_DAO->readFournisseurs($n,$ob,$o,$l,$dd,$df);
        }
        static function readById($id){		
            $Fournisseur_DAO=new Fournisseur_DAO();
            return $Fournisseur_DAO->readFournisseursById($id);
        }
        function update(){
            $Fournisseur_DAO=new Fournisseur_DAO();
            $Fournisseur_DAO->updateFournisseur($this->id,$this->nom,$this->telephone,$this->email,$this->adresse);
        }
        function delete(){
            $Fournisseur_DAO=new Fournisseur_DAO();
            $Fournisseur_DAO->deleteFournisseur($this->id);
        }
        function count($td){
            $Fournisseur_DAO=new Fournisseur_DAO();
            return $Fournisseur_DAO->countFournisseur($td);
        }
    }
?>