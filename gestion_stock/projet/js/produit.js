function getProduit(reference = "", choix = 1, l = 10, dd = "", df = "") {
    checkSession();
    var orderBy = "reference", order = "ASC";
    switch (choix) {
        case "1": orderBy = "reference"; order = "ASC";; break;

        case "2": orderBy = "reference"; order = "DESC";; break;

        case "3": orderBy = "date_aj"; order = "ASC";; break;

        case "4": orderBy = "date_aj"; order = "DESC";; break;

        default: break;
    }
    var table_searsh_result = document.querySelector("#table-data");
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET",
        "../controle/produit.php?" +
        "action=read&&reference=" + reference + "&&cat=&&scat=&&orderBy=" + orderBy + "&&order=" + order + "&&limit=" + l + "&&dd=" + dd + "&&df=" + df,
        true
    );
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var table = "";
            for (let i = 0; i < data.length; i++) {
                var reference = data[i].reference;
                var libelle = data[i].libelle;
                var qtt = data[i].qtt;
                var scat = data[i].scat;
                var cat = data[i].cat;
                var date_aj = data[i].date_aj;
                table += "<tr>" +
                    "<td>" + reference + "</td>" +
                    "<td>" + libelle + "</td>" +
                    "<td>" + qtt + "</td>" +
                    "<td>" + cat + " <i class='fa-solid fa-chevron-right'></i> " + scat + "</td>" +
                    "<td>" + date_aj + "</td>" +
                    "<td style='width: 60px;'><i class='fa-solid fa-eye text-success'" +
                    " data-bs-toggle='offcanvas' data-bs-target='#offcanvasShow'" +
                    "onclick='showProduit(`" + reference + "`)'" +
                    "></i></td>" +
                    "<td style='width: 60px;'><i class='fa-solid fa-pen text-primary'" +
                    " data-bs-toggle='offcanvas' data-bs-target='#offcanvasModifier'" +
                    "onclick='getProduitInfo(`" + reference + "`)'" +
                    "></i></td>" +
                    "<td style='width: 60px;'><i class='fa-solid fa-trash text-danger'" +
                    "onclick='deleteProduit(`" + reference + "`)'" +
                    "></i></td>" +
                    "</tr>";
            }
            if (table == "") {
                if (reference != "") table = "<h5 style='color:red'>No result was found</h5>";
                else table = "<h5 style='color:red'>Table is empty</h5>";
            }
            table_searsh_result.innerHTML = table;
        }
    }
}

function searshProduit() {
    var dd = document.querySelector("#date_ajd").value;
    var df = document.querySelector("#date_ajf").value;
    var reference = document.querySelector("#search-produit").value;
    var l = document.querySelector("#dataTable_length").value;
    var choix = document.querySelector("#dataTable_order").value;
    getProduit(reference, choix, l, dd, df);
}

function addProduit() {
    checkSession();
    var reference = document.querySelector(".add-form #InputRef").value;
    var libelle = document.querySelector(".add-form #InputLib").value;
    var prix_uni = document.querySelector(".add-form #InputPrixU").value;
    var prix_ach = document.querySelector(".add-form #InputPrixA").value;
    var prix_vnt = document.querySelector(".add-form #InputPrixV").value;
    var img = document.querySelector(".add-form #uploadImage").value;
    var ext=img.substring(img.lastIndexOf('.')+1);
    var cat = document.querySelector(".add-form #categorie").value;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/produit.php?action=create&&" +
        "reference=" + reference + "&&libelle=" + libelle + "&&prix_uni=" + prix_uni + "&&prix_ach=" + prix_ach +
        "&&prix_vnt=" + prix_vnt + "&&cat=" + cat +"&&img=" + ext
        , true);
    ajax.send();
    getProduit();
}

function getProduitInfo(i) {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/produit.php?action=readById&&reference=" + i, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector(".modify-form #InputRef").value = data[0].reference;
            document.querySelector(".modify-form #InputLib").value = data[0].libelle;
            document.querySelector(".modify-form #InputPrixU").value = data[0].prix_uni;
            document.querySelector(".modify-form #InputPrixA").value = data[0].prix_ach;
            document.querySelector(".modify-form #InputPrixV").value = data[0].prix_vnt;
            document.querySelector(".modify-form #InputQtt").value = data[0].qtt;
            getCategorieM(data[0].id_cat); getByIdSousCategorieM(data[0].id_scat);
            document.querySelector(".modifyProduit").innerHTML = "" +
                "<button type='submit' class='btn btn-primary mx-5 modifyProduit' onclick='modifyProduit(" +
                "\""+i +"\",\"" + data[0].img + "\""+
                ")'>Submit</button>";
            document.querySelector(".ref_produit").innerHTML = "Modifier le produit : " + data[0].reference;
        }
    }
}

function modifyProduit(i,img) {
    checkSession();
    var reference = document.querySelector(".modify-form #InputRef").value;
    var libelle = document.querySelector(".modify-form #InputLib").value;
    var prix_uni = document.querySelector(".modify-form #InputPrixU").value;
    var prix_ach = document.querySelector(".modify-form #InputPrixA").value;
    var prix_vnt = document.querySelector(".modify-form #InputPrixV").value;
    var ext=img.substring(img.lastIndexOf('.')+1);
    var cat = document.querySelector(".modify-form #categorie").value;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/produit.php?action=update&&id=" + i +
    "&&reference=" + reference + "&&libelle=" + libelle + "&&prix_uni=" + prix_uni + "&&prix_ach=" + prix_ach +
    "&&prix_vnt=" + prix_vnt +"&&cat=" + cat+"&&img="+ext
        , true);
    ajax.send();
    getProduit();
}

function deleteProduit(i) {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/produit.php?action=delete&&reference=" + i, true);
    ajax.send();
    getProduit();
}

function dateAjProduit(btn) {
    var dd = document.querySelector("#date_ajd").value;
    var df = document.querySelector("#date_ajf").value;
    if (dd > df && dd != "" && df != "") {
        btn.value = "";
        alertText("#hide-text", 1000);
    }
    else FilterIconPrimary();
    searshProduit();
}

function resetFilterForm() {
    getProduit();
    FilterIconSecondary();
}

function getCategorie() {
    checkSession();
    var select = document.querySelector("#categorie");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/categorie.php?action=read", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var selectContent = "<option value='' selected disabled>Vellier choisir une catégorie</option>";
            for (let i = 0; i < data.length; i++) {
                var id_cat = data[i].id_cat;
                var c = data[i].cat;
                selectContent += "<option value='" + id_cat + "'>" + c + "</option>";
            }
            select.innerHTML = selectContent;
        }
    }
}

function getCategorieM(id) {
    checkSession();
    var select = document.querySelector(".modify-form #categorie");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/categorie.php?action=read", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var selectContent = "<option value='' disabled>Vellier choisir une catégorie</option>";
            for (let i = 0; i < data.length; i++) {
                var id_cat = data[i].id_cat;
                var c = data[i].cat;
                selectContent += "<option value='" + id_cat + "'";
                if (id_cat == id) selectContent += " selected ";
                selectContent += ">" + c + "</option>";
            }
            select.innerHTML = selectContent;
        }
    }
}

function getSousCategorie(id) {
    checkSession();
    var select = document.querySelector("#sous-categorie");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/sous_categorie.php?id=" + id + "&&action=read", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var selectContent = "<option value='' selected disabled>Vellier choisir une sous catégorie</option>";
            for (let i = 0; i < data.length; i++) {
                var id_scat = data[i].id_scat;
                var sc = data[i].scat;
                selectContent += "<option value='" + id_scat + "' >" + sc + "</option>";
            }
            select.innerHTML = selectContent;
        }
    }
}

function raseteSousCategorie() {
    document.querySelector("#sous-categorie").innerHTML = "<option value='' selected disabled>Vellier choisir une catégorie en premier</option>";
}

function getByIdSousCategorieM(id) {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/sous_categorie.php?action=readById&&id=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var id_scat = data[0].id_scat;
            var id_cat = data[0].id_cat;
            var select = document.querySelector(".modify-form #sous-categorie");
            var ajax = new XMLHttpRequest();
            ajax.open("GET", "../controle/sous_categorie.php?action=read&&id=" + id_cat, true);
            ajax.send();
            ajax.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    var selectContent = "<option value='' disabled>Vellier choisir une sous catégorie</option>";
                    for (let i = 0; i < data.length; i++) {
                        var scat = data[i].id_scat;
                        var sc = data[i].scat;
                        selectContent += "<option value='" + scat + "'";
                        if (id_scat == scat) selectContent += " selected ";
                        selectContent += ">" + sc + "</option>";
                    }
                    select.innerHTML = selectContent;
                }
            }
        }
    }
}

function getSousCategorieM(id) {
    checkSession();
    var select = document.querySelector(".modify-form #sous-categorie");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/sous_categorie.php?action=read&&id=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var selectContent = "<option value='' selected disabled>Vellier choisir une sous catégorie</option>";
            for (let i = 0; i < data.length; i++) {
                var id_scat = data[i].id_scat;
                var sc = data[i].scat;
                selectContent += "<option value='" + id_scat + "' >" + sc + "</option>";
            }
            select.innerHTML = selectContent;
        }
    }
}

function showProduit(i) {
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/produit.php?action=readById&&reference=" + i, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#offcanvasShow #offcanvasLabel").innerHTML = "Produit : " + i;
            document.querySelector("#offcanvasShow .offcanvas-body").innerHTML = "" +
                " <div class='card mb-3' style='max-width: 540px;'>" +
                "<div class='row g-0'>" +
                "<div class='col-md-4 p-2'>" +
                "<img src='../img/produit/" + data[0].img + "' class='img-fluid rounded-start'></div>" +
                "<div class='col-md-8'><div class='card-body'>" +
                "<p class='card-text'>Libellé : <strong>" + data[0].libelle + "</strong></p>" +
                "<p class='card-text'>Prix d'achat : <strong>" + data[0].prix_ach + " Dhs</strong></p>" +
                "<p class='card-text'>Prix de vente : <strong>" + data[0].prix_vnt + " Dhs</strong></p>" +
                "<p class='card-text'>Prix unitaire  : <strong>" + data[0].prix_uni + " Dhs</strong></p>" +
                "<p class='card-text'>Quantité  : <strong>" + data[0].qtt + "</strong></p>" +
                "<p class='card-text'>Date d'ajout  : <strong>" + data[0].date_aj + "</strong></p>" +
                "<p class='card-text'>Catégorie  : <strong>" + data[0].cat +
                " <i class='fa-solid fa-angle-right'></i> " +
                data[0].scat + "</strong></p>" +
                "</div></div></div></div>";
        }
    }
}