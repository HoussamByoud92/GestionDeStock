function start() {
    checkSession();
    var rcat = document.querySelector("#radio-categorie");
    var lcat = document.querySelector("#label-categorie");
    document.querySelector('#novelle-scat').value="";
    document.querySelector('#novelle-categorie').value="";
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/categorie.php?action=read", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var l = "";
            var r = "";
            for (let i = 0; i < data.length; i++) {
                var id_cat = data[i].id_cat;
                var c = data[i].cat;
                r += "<input type='radio' name='categorie' id='c" + id_cat + "' value='" + id_cat + "'";
                if (i == 0) r += " checked ";
                r += " onchange='ChangeCategoire(this,\"" + c + "\")'>";
                l += "<label id='c" + id_cat + "' for='c" + id_cat + "' class=' label-cat";
                if (i == 0) l += " checked-label-cat ";
                l += "'>" + c + "</label>";
                if (i + 1 != data.length) l += "<hr class='my-0'>";
                if (i == 0) chargeSousCategoire(id_cat, c);
            }
            rcat.innerHTML = r;
            lcat.innerHTML = l;
        }
    }
}

function ChangeCategoire(v1, v2) {
    document.querySelector("#label-categorie .checked-label-cat").classList.remove("checked-label-cat");
    document.querySelector("#label-categorie #c" + v1.value).classList.add("checked-label-cat");
    chargeSousCategoire(v1.value, v2);
}

function chargeSousCategoire(v1, v2) {
    checkSession();
    var lscat = document.querySelector("#label-sous-categorie");
    document.querySelector("#head-sous-categorie").innerHTML="<strong>" + v2.toUpperCase() + "</strong>";
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/sous_categorie.php?action=read&&id=" + v1, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var l = "";
            for (let i = 0; i < data.length; i++) {
                var scat = data[i].scat;
                l += "<label class='btn btn-secondary label-scat m-1'>" + scat + "</label>";
            }
            lscat.innerHTML = l;
        }
    }
}

function addCategorie(){
    checkSession();
    var cat=document.querySelector('#novelle-categorie').value;
    if (cat!=""){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "../controle/categorie.php?action=create&&cat=" + cat, true);
        ajax.send();
        start();
    }
}

function addScat(){
    checkSession();
    var scat=document.querySelector('#novelle-scat').value;
    var cat=document.querySelector('input[name="categorie"]:checked').value;
    if (scat!=""){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "../controle/sous_categorie.php?action=create&&scat="+scat+"&&cat=" + cat, true);
        ajax.send();
        start();
    }
}