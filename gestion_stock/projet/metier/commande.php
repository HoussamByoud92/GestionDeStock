<?php
    require_once("../dao/commande.php");
    class Commande{
        private $N;
        private $C;
        function __get($prop){
            switch ($prop) {
                case 'N':return $this->N;  break;
                case 'C':return $this->C;  break;
            }
        }
        function __construct($N,$C){
            $this->N=$N;
            $this->C=$C;
        }
        function create(){
            $Commande_DAO=new Commande_DAO();
            $Commande_DAO->createCommande($this->N,$this->C);
        }
        static function read($o,$l,$dd,$df){		
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->readCommandes($o,$l,$dd,$df);
        }
        static function readById($id){		
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->readCommandesById($id);
        }
        function count($td){
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->countCommande($td);
        }
        function insertLine($n,$pro,$q){
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->insertLineCommande($n,$pro,$q);
        }
        function readByIdLine($n){
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->readByIdLineCommande($n);
        }
        function delete($n){
            $Commande_DAO=new Commande_DAO();
            return $Commande_DAO->deleteCommande($n);
        }
    }
?>