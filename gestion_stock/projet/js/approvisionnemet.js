function getApprovisionnemet(choix=1,l=10,dd="",df=""){
    checkSession();
    var order="ASC";
    switch(choix){
        case "1":order="ASC";;break;
        case "2":order="DESC";;break;
        default: break;
    }
    var table_searsh_result = document.querySelector("#table-data");
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET","../controle/approvisionnemet.php?"+"action=read&&order="+order+"&&limit="+l+"&&dd="+dd+"&&df="+df,
        true
    );
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var table = "";
            for (let i = 0; i < data.length; i++) {
                var n = data[i].id_app;
                var four = data[i].nom;
                var date = data[i].date;
                var m = data[i].prix_ach*data[i].q;
                table += "<tr>"+
                "<td>" + n + "</td>"+
                "<td>" + four + "</td>"+
                "<td>" + date + "</td>"+
                "<td>" + m + "</td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-eye text-success'"+
                " data-bs-toggle='offcanvas' data-bs-target='#offcanvasShow'"+
                "onclick='showApprovisionnemet("+n+")'"+
                "></i></td>"+
                "<td style='width: 60px;'><a href=''><i class='fa-solid fa-file-pdf text-primary'"+
                "onclick='printApprovisionnemet("+n+")'"+
                "></i></a></td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-trash text-danger'"+
                "onclick='deleteApprovisionnemet("+n+")'"+
                "></i></td>"+
                "</tr>";
            }
            if (table == "") {
                if (n != "") table = "<h5 style='color:red'>No result was found</h5>";
                else table = "<h5 style='color:red'>Table is empty</h5>";
            }
            table_searsh_result.innerHTML = table;
        }
    }
}

function searshApprovisionnemet(){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    var l=document.querySelector("#dataTable_length").value;
    var choix=document.querySelector("#dataTable_order").value;
    getApprovisionnemet(choix,l,dd,df);
}

function addApprovisionnemet() {
    checkSession();
    var p=document.querySelector("#InputPro").value;
    var f=document.querySelector("#InputFour").value;;
    var id=document.querySelector("#InputNum").value;
    var q=document.querySelector("#InputQ").value;
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/approvisionnemet.php?"+"action=create&&id="+id+"&&f="+f+"&&p="+p+"&&q="+q,true);
    ajax.send();
    getApprovisionnemet();
}

function showApprovisionnemet(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/approvisionnemet.php?action=readById&&id=" + i, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#offcanvasShow #offcanvasLabel").innerHTML="Approvisionnemet numéro : "+i;
            document.querySelector("#offcanvasShow .offcanvas-body").innerHTML=""+
            "<div class='d-flex flex-row mb-1'><p class='mx-5'>Fournisseur :  </p><strong>"+data[0].nom+"</strong></div>"+
            "<table class='table'><thead><tr>"+
            "<th scope='col'>Produit</th>"+
            "<th scope='col'>Prix</th>"+
            "<th scope='col'>Quantité</th>"+
            "<th scope='col'>Prix total</th></tr></thead><tbody id='showBody'>"+
            "<tr><td>"+data[0].reference+"</td><td>"+data[0].prix_ach+" Dhs"+
            "</td><td>"+data[0].q+"</td><td><strong>"+(data[0].prix_ach*data[0].q)+" Dhs</strong></td></tr>";
            "</tbody></table>";
        }
    }
}


function deleteApprovisionnemet(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/approvisionnemet.php?action=delete&&id="+i, true);
    ajax.send();
    getApprovisionnemet();
}

function dateAjApprovisionnemet(btn){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    if(dd>df&&dd!=""&&df!=""){
        btn.value="";
        alertText("#hide-text",1000);
    }
    else FilterIconPrimary();
    searshApprovisionnemet();
}

function resetFilterForm() {
    searshApprovisionnemet();
    FilterIconSecondary();
}


function getFourniseur(){
    checkSession();
    var cli=document.querySelector(".add-form #InputFour");
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/fournisseur.php?action=read&&nom=&&orderBy=nom&&order=ASC&&limit=all&&dd=&&df=",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (let i = 0; i < data.length; i++) {
                cli.innerHTML+="<option value='"+data[i].id_f+"'>"+data[i].nom+"</option>";
            }
        }
    }
}

function getProduit(){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/produit.php?action=read&&reference=&&cat=&&scat=&&orderBy=reference&&order=ASC&&limit=all&&dd=&&df=",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        var pro=document.querySelector(".add-form #InputPro");
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (let i = 0; i < data.length; i++) {
                pro.innerHTML+="<option value='"+data[i].reference+"'>"+data[i].reference+"</option>";
            }
        }
    }
}

function printApprovisionnemet(id) {
    checkSession();
    window.open("../pdf/approvisionnemet.php?id="+id);
}