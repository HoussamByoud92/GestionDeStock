<?php
    class Admin_DAO{

        function getPDO(){
            return new PDO("mysql:host=localhost;dbname=gestion_stock","root","");
        }

        function check($u,$p){
            $pa=md5($p);
            $pdo=$this->getPDO();
            $res=$pdo->prepare("SELECT * FROM admin WHERE login='$u' AND pass='$pa'");
            $res->execute();
            if($res->fetch()) return True;
		    return False;
        }

    }
?>