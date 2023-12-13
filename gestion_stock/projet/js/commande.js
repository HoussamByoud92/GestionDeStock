function getCommande(choix=1,l=10,dd="",df=""){
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
        "GET","../controle/commande.php?"+"action=read&&order="+order+"&&limit="+l+"&&dd="+dd+"&&df="+df,
        true
    );
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var table = "";
            for (let i = 0; i < data.length; i++) {
                var n = data[i].id_cmd;
                var cli = data[i].nom;
                var date = data[i].date;
                var m = data[i].mnt;
                table += "<tr>"+
                "<td>" + n + "</td>"+
                "<td>" + cli + "</td>"+
                "<td>" + date + "</td>"+
                "<td>" + m + "</td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-eye text-success'"+
                " data-bs-toggle='offcanvas' data-bs-target='#offcanvasShow'"+
                "onclick='showCommande("+n+")'"+
                "></i></td>"+
                "<td style='width: 60px;'><a href=''><i class='fa-solid fa-file-pdf text-primary'"+
                "onclick='printCommande("+n+")'"+
                "></i></a></td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-trash text-danger'"+
                "onclick='deleteCommande("+n+")'"+
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

function searshCommande(){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    var l=document.querySelector("#dataTable_length").value;
    var choix=document.querySelector("#dataTable_order").value;
    getCommande(choix,l,dd,df);
}

function addCommande() {
    checkSession();
    var pro,q;
    var n=document.querySelector("#InputNum").value;
    var c=document.querySelector("#InputCli").value;
    for (let i=0;i<ligne.length;i++) {
        pro=document.querySelector("#"+ligne[i].pro).value;
        q=document.querySelector("#"+ligne[i].q).value;
        var ajax = new XMLHttpRequest();
        ajax.open("GET","../controle/commande.php?"+"action=insertLine&&n="+n+"&&pro="+pro+"&&q="+q,true);
        ajax.send();
    }
    ajax.open("GET","../controle/commande.php?"+"action=create&&N="+n+"&&C="+c,true);
    ajax.send();
    getCommande();
}

function showCommande(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/commande.php?action=readById&&N=" + i, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector("#offcanvasShow #offcanvasLabel").innerHTML="Commande numéro : "+i;
            document.querySelector("#offcanvasShow .offcanvas-body").innerHTML=""+
            "<div class='d-flex flex-row mb-1'><p class='mx-5'>client :  </p><strong>"+data[0].nom+"</strong></div>"+
            "<table class='table'><thead><tr>"+
            "<th scope='col'>Produit</th>"+
            "<th scope='col'>Prix</th>"+
            "<th scope='col'>Quantité</th>"+
            "<th scope='col'>Prix total</th></tr></thead><tbody id='showBody'></tbody></table>";

            ajax.open("GET", "../controle/commande.php?action=readByIdLine&&N=" + i, true);
            ajax.send();
            ajax.onreadystatechange = function () {
                var total=0;
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    for (let i = 0; i < data.length; i++) {
                        document.querySelector("#showBody").innerHTML+=""+
                        "<tr><td>"+data[i].reference+"</td><td>"+data[i].prix+"</td><td>"+data[i].qtt+"</td><td>"+(data[i].prix*data[i].qtt)+"</td></tr>";
                        total+=data[i].prix*data[i].qtt;
                    }
                    document.querySelector("#showBody").innerHTML+=""+
                    "<tr><td colspan='2'><strong>Total</strong></th><td>"+"<td>"+total+"</td><td>";
                }
            }    
        }
    }
}


function deleteCommande(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/commande.php?action=delete&&N="+i, true);
    ajax.send();
    getCommande();
}

function dateAjCommande(btn){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    if(dd>df&&dd!=""&&df!=""){
        btn.value="";
        alertText("#hide-text",1000);
    }
    else FilterIconPrimary();
    searshCommande();
}

function resetFilterForm() {
    searshCommande();
    FilterIconSecondary();
}


function getClient(){
    checkSession();
    var cli=document.querySelector(".add-form #InputCli");
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/client.php?action=read&&nom=&&orderBy=nom&&order=ASC&&limit=all&&dd=&&df=",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (let i = 0; i < data.length; i++) {
                cli.innerHTML+="<option value='"+data[i].id_c+"'>"+data[i].nom+"</option>";
            }
        }
    }
}

var ligne = [{pro:"InputPro0",q:"InputQ0"}];

function addLigne(val){
    checkSession();
    var l=document.querySelector(val);
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/produit.php?action=count",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (ligne.length<data[0].COUNT){
                ligne[ligne.length]={pro:"InputPro"+ligne.length,q:"InputQ"+ligne.length};
                l.innerHTML+=""+
                "<div  class='mb-3 d-flex justify-content-between'>"+
                "<div class='row'>"+
                "<label for='"+ligne[ligne.length-1].pro+"' class='form-label' style='width: 35%;'>Produit</label>"+
                "<select id='"+ligne[ligne.length-1].pro+"' class='form-control' style='width: 65%;' required>"+
                "<option value='' selected disabled>Veiller choisir un produit</option>"+
                "</select>"+
                "</div>"+
                "<div class='row'>"+
                "<label for='"+ligne[ligne.length-1].q+"' class='form-label' style='width: 35%;'>Quantité</label>"+
                "<input type='number' class='form-control' id='"+ligne[ligne.length-1].q+"' style='width: 65%;' value='1' autocomplete='off' required>"+
                "</div>"+
                "</div>";
            }
        }
        getProduit();
    }
}

function getProduit(){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET","../controle/produit.php?action=read&&reference=&&cat=&&scat=&&orderBy=reference&&order=ASC&&limit=all&&dd=&&df=",true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (let i=0;i<ligne.length;i++) {
                document.querySelector("#"+ligne[i].pro).innerHTML=""+
                    "<option value='' selected disabled>Veiller choisir un produit</option>";
            }
            for(let i=0;i<ligne.length;i++){
                for(let j=0;j<data.length;j++){
                    document.querySelector("#"+ligne[i].pro).innerHTML+=""+
                        "<option value='"+data[j].reference+"'>"+data[j].reference+"</option>";
                }
            }
        }
    }
}

function printCommande(n) {
    checkSession();
    window.open("../pdf/commande.php?n="+n);
}