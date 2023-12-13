<?php
    class Rename_Img{
        function rename($oldName,$newName,$extenion){
            $o="../img/produit/".$oldName.'.'.$extenion;
            $n="../img/produit/".$newName.'.'.$extenion;
            rename($o,$n);
        }
    }
?>