<?php
    require_once("../dao/approvisionnemet.php");
    class Approvisionnemet{
        private $ID;
        private $F;
        private $P;
        private $Q;
        function __get($prop){
            switch ($prop) {
                case 'ID':return $this->ID;
                case 'F':return $this->F;  break;
                case 'P':return $this->P;  break;
                case 'Q':return $this->Q;  break;
            }
        }
        function __construct($ID,$F,$P,$Q){
            $this->ID=$ID;
            $this->F=$F;
            $this->P=$P;
            $this->Q=$Q;
        }
        function create(){
            $Approvisionnemet_DAO=new Approvisionnemet_DAO();
            $Approvisionnemet_DAO->createApprovisionnemet($this->ID,$this->F,$this->P,$this->Q);
        }
        static function read($o,$l,$dd,$df){		
            $Approvisionnemet_DAO=new Approvisionnemet_DAO();
            return $Approvisionnemet_DAO->readApprovisionnemets($o,$l,$dd,$df);
        }
        static function readById($id){		
            $Approvisionnemet_DAO=new Approvisionnemet_DAO();
            return $Approvisionnemet_DAO->readApprovisionnemetsById($id);
        }
        function delete($id){
            $Approvisionnemet_DAO=new Approvisionnemet_DAO();
            return $Approvisionnemet_DAO->deleteApprovisionnemet($id);
        }
    }
?>