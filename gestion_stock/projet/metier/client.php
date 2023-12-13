<?php
    require_once("../dao/client.php");
    class Client{
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
            $Client_DAO=new Client_DAO();
            $Client_DAO->createClient($this->nom,$this->telephone,$this->email,$this->adresse);
        }
        static function read($n,$ob,$o,$l,$dd,$df){		
            $Client_DAO=new Client_DAO();
            return $Client_DAO->readClients($n,$ob,$o,$l,$dd,$df);
        }
        static function readById($id){		
            $Client_DAO=new Client_DAO();
            return $Client_DAO->readClientsById($id);
        }
        function update(){
            $Client_DAO=new Client_DAO();
            $Client_DAO->updateClient($this->id,$this->nom,$this->telephone,$this->email,$this->adresse);
        }
        function delete(){
            $Client_DAO=new Client_DAO();
            $Client_DAO->deleteClient($this->id);
        }
        function count($td){
            $Client_DAO=new Client_DAO();
            return $Client_DAO->countClient($td);
        }
    }
?>