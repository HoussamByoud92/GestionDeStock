function start(){
    checkSession();
    countProduits();countProduits2();
    countClients();countClients2()
    countFournisseurs();countFournisseurs2();
    countCommande();countCommande2();
}

function countProduits() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET","../controle/produit.php?action=count",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countProduit").innerHTML=data[0].COUNT;
        }
    }
}

function countClients() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET","../controle/client.php?action=count",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countClient").innerHTML=data[0].COUNT;
        }
    }
}

function countFournisseurs() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/fournisseur.php?action=count",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countFournisseur").innerHTML=data[0].COUNT;
        }
    }
}

function countCommande() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/commande.php?action=count",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countCommande").innerHTML=data[0].COUNT;
        }
    }
}

function countProduits2() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET","../controle/produit.php?action=count2",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countProduit2").innerHTML=data[0].COUNT;
        }
    }
}

function countClients2() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET","../controle/client.php?action=count2",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countClient2").innerHTML=data[0].COUNT;
        }
    }
}

function countFournisseurs2() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/fournisseur.php?action=count2",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countFournisseur2").innerHTML=data[0].COUNT;
        }
    }
}

function countCommande2() {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/commande.php?action=count2",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#countCommande2").innerHTML=data[0].COUNT;
        }
    }
}