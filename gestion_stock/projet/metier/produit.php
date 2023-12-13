<?php
    require_once("../dao/produit.php");
    class Produit{
        private $ref;
        private $lib;
        private $prix_u;
        private $prix_a;
        private $prix_v;
        private $img;
        private $scat;
        function __get($prop){
            switch ($prop) {
                case 'ref':return $this->ref;  break;
                case 'lib':return $this->lib;  break;
                case 'prx_u':return $this->prx_u;  break;
                case 'prx_a':return $this->prx_a;  break;
                case 'prx_v':return $this->prx_v;  break;
                case 'img':return $this->img;  break;
                case 'scat':return $this->scat;  break;
            }
        }
        function __construct($ref,$lib,$prix_u,$prix_a,$prix_v,$scat,$img){
                $this->ref=$ref;
                $this->lib=$lib;
                $this->prix_u=$prix_u;
                $this->prix_a=$prix_a;
                $this->prix_v=$prix_v;
                $this->img=$ref.'.'.$img;
                $this->scat=$scat;
        }
        function create(){
            $Produit_DAO=new Produit_DAO();
            $Produit_DAO->createProduit($this->ref,$this->lib,$this->prix_u,$this->prix_a,
            $this->prix_v,$this->scat,$this->img);
        }
        static function read($r,$scat,$cat,$ob,$o,$l,$dd,$df){		
            $Produit_DAO=new Produit_DAO();
            return $Produit_DAO->readProduits($r,$scat,$cat,$ob,$o,$l,$dd,$df);
        }
        static function readById($id){		
            $Produit_DAO=new Produit_DAO();
            return $Produit_DAO->readProduitsById($id);
        }
        function update($id){
            $Produit_DAO=new Produit_DAO();
            $Produit_DAO->updateProduit($id,$this->ref,$this->lib,$this->prix_u,$this->prix_a,
            $this->prix_v,$this->scat,$this->img);
        }
        function delete(){
            $Produit_DAO=new Produit_DAO();
            $Produit_DAO->deleteProduit($this->ref);
        }
        function count($td){
            $Produit_DAO=new Produit_DAO();
            return $Produit_DAO->countProduit($td);
        }
    }
?>