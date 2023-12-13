function startCaisse() {
    checkSession();
    var rcat = document.querySelector("#radio-categorie");
    var lcat = document.querySelector("#label-categorie");
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
    var rscat = document.querySelector("#radio-sous-categorie");
    var lscat = document.querySelector("#label-sous-categorie");
    document.querySelector("#head-sous-categorie").innerHTML = "" +
        "<strong>" + v2.toUpperCase() + "</strong>" +
        "<label id='sc0' for='sc0' class='pointer'>" +
        "<strong>voir tout".toUpperCase() + "</strong>" +
        "<i class='fa-solid fa-chevron-right ms-1'></i>"
        + "</label>";
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/sous_categorie.php?action=read&&id=" + v1, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var r = "<input type='radio' name='sous_categorie' id='sc0' value='0' onclick='chargeCaisse(" + v1 + ",0)'>";
            var l = "";
            for (let i = 0; i < data.length; i++) {
                var id_scat = data[i].id_scat;
                var scat = data[i].scat;
                r += "<input type='radio' name='sous_categorie' id='sc" + id_scat + "' value='" + id_scat + "'";
                r += " onclick='chargeCaisse(" + v1 + ",this.value)'>";
                l += "<label id='sc" + id_scat + "' for='sc" + id_scat + "' class='btn btn-secondary label-scat m-1'>" + scat + "</label>";
            }
            rscat.innerHTML = r;
            lscat.innerHTML = l;
        }
    }
}

function chargeCaisse(v1, v2) {
    checkSession();
    document.querySelector("#P1").classList.add("d-none");
    document.querySelector("#P2").classList.remove("d-none");
    var P2h = document.querySelector("#P2-h");
    var P2b = document.querySelector("#P2-b");
    var categorie = [];

    if (v2 == 0) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "../controle/categorie.php?action=readById&&id=" + v1, true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                categorie[0] = data[0].cat;
            }
        }
    } else {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "../controle/sous_categorie.php?action=readById&&id=" + v2, true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                categorie[0] = data[0].scat;
            }
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.open("GET",
        "../controle/produit.php?action=read&&reference=&&scat=" + v2 + "&&cat=" + v1 + "&&orderBy=reference&&order=ASC&&limit=all&&dd=&&df="
        , true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var b = "";
            for (let i = 0; i < data.length; i++) {
                var reference = data[i].reference;
                var prix_vnt = data[i].prix_vnt;
                var reference = data[i].reference;
                var img = data[i].img
                b += "<div class='card mb-3 m-1' style='width: 20%'>" +
                    "<img src='../img/produit/" + img + "' class='card-img-top'>" +
                    "<div class='card-body'>" +
                    "<p class='card-text'>" + reference + "</p>" +
                    "<h5 class='card-title'>" + prix_vnt + " Dhs</h5>" +
                    "<div class='mt-1 d-flex flex-row justify-content-between justify-items-center'>" +
                    "<input type='number' id='qtt_" + reference.replace(" ", "_") + "' class='form-control' value='1' style='width: 80%;'>" +
                    "<button class='navbar-toggler' type='button' onclick='ajouterAuTicket(" +
                    "\"" + reference + "\"," + prix_vnt + ",\"" + img + "\")'>" +
                    "<span><i class='fa-solid fa-cart-plus text-primary'></i></span>" +
                    "</button></div></div></div>";
            }
            P2b.innerHTML = b;
            P2h.innerHTML = "<h5 class='text-primary'>Catégories - " + categorie[0] + "</h5>" +
                "<button type='button' class='btn btn-primary' onclick='resetCaise()'>Catégories</button>";
        }
    }
}

var produits_choisis = [];

function ajouterAuTicket(r, p, img) {
    var q = document.querySelector("#qtt_" + r.replace(" ", "_")).value;
    if (produits_choisis.length == 0) produits_choisis[0] = { r, p, q, img };
    else {
        var pex = 0;
        for (let i = 0; i < produits_choisis.length; i++) {
            if (produits_choisis[i].r == r) {
                produits_choisis[i].q -= -q;
                pex = 1;
            }
        }
        if (pex == 0) produits_choisis[produits_choisis.length] = { r, p, q, img };
    }
    chargeTicket();
    document.querySelector("#qtt_" + r.replace(" ", "_")).value = 1;
}

function chargeTicket() {
    var content = "";
    var t = 0
    for (let i = 0; i < produits_choisis.length; i++) {
        content += "<li class='nav-item'>" +
            "<div class='card mb-3' style='max-width: 500px;'>" +
            "<div class='row g-0'>" +
            "<div class='col-md-4'>" +
            "<img src='../img/produit/" + produits_choisis[i].img + "' class='img-fluid rounded-start'></img></div>" +
            "<div class='col-md-8 width-33pc'>" +
            "<div class='card-body'>" +
            "<p class='card-text'><small class='text-muted'>" + produits_choisis[i].r + "</small></p>" +
            "<p class='card-text'><strong>" + produits_choisis[i].p + " Dhs</strong></p></div></div>" +
            "<div class='col-md-8 width-33pc'>" +
            "<div class='card-body'>" +
            "<div class='input-group input-group-sm mb-3'>" +
            "<input type='number' class='form-control' value='" + produits_choisis[i].q + "' onkeyup='changerTicket(this.value," + i + ")'></div><div>" +
            "<button type='button' class='d-none' id='sb_" + i + "' onclick='supprimerEleTicket(" + i + ")'></button>" +
            "<label class='d-inline-flex justify-content-between align-items-center width-100pc pointer' for='sb_" + i + "'>" +
            "<i class='fa-solid fa-trash text-danger fs-12px' style='opacity:1;'></i>" +
            "<p class='card-text text-danger fs-12px'><strong>SUPPRIMER</strong></p>" +
            "</label></div></div></div></div></div></li>";
        t += produits_choisis[i].p * produits_choisis[i].q;
    }
    document.querySelector("#ajouterAuTicket").innerHTML = content;
    document.querySelector("#ticketOpenB").classList.add("text-primary");
    document.querySelector("#ticket-Label").innerHTML = "<strong>" + t + " Dhs</strong>";
}

function annulerTicket() {
    produits_choisis = [];
    chargeTicket();
    document.querySelector('#ticketOpenB').classList.remove('text-primary');
}

function changerTicket(val, i) {
    if (val != "") {
        produits_choisis[i].q = val;
        chargeTicket();
        document.querySelector('#ticketOpenB').classList.remove('text-primary');
    }
}

function supprimerEleTicket(i) {
    produits_choisis.splice(i, 1);
    chargeTicket();
    document.querySelector('#ticketOpenB').classList.remove('text-primary');
}

function resetCaise() {
    document.querySelector("#P1").classList.remove("d-none");
    document.querySelector("#P2").classList.add("d-none");
}

function validerTicket() {
    checkSession();
    var r = "", p = "", q = "";
    for (let i = 0; i < produits_choisis.length - 1; i++) {
        r += produits_choisis[i].r + ",";
        p += produits_choisis[i].p + ",";
        q += produits_choisis[i].q + ",";
    }
    r += produits_choisis[produits_choisis.length - 1].r;
    p += produits_choisis[produits_choisis.length - 1].p;
    q += produits_choisis[produits_choisis.length - 1].q;
    window.open("../pdf/ticket.php?l="+produits_choisis.length+"&&r="+r+"&&p="+p+"&&q="+q);
}