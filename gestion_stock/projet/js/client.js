function getClient(nom="",choix=1,l=10,dd="",df=""){
    checkSession();
    var orderBy="nom",order="ASC";
    switch(choix){
        case "1":orderBy="nom";order="ASC";;break;

        case "2":orderBy="nom";order="DESC";;break;

        case "3":orderBy="date_aj";order="ASC";;break;

        case "4":orderBy="date_aj";order="DESC";;break;
    
        default: break;
    }
    var table_searsh_result = document.querySelector("#table-data");
    var ajax = new XMLHttpRequest();
    ajax.open(
        "GET",
        "../controle/client.php?"+
        "action=read&&nom="+nom+"&&orderBy="+orderBy+"&&order="+order+"&&limit="+l+"&&dd="+dd+"&&df="+df,
        true
    );
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var table = "";
            for (let i = 0; i < data.length; i++) {
                var id_client = data[i].id_c;
                var nom = data[i].nom;
                var tel = data[i].tele;
                var mail = data[i].mail;
                var adr = data[i].adr;
                var date_aj = data[i].date_aj;
                table += "<tr>"+
                "<td>" + nom + "</td>"+
                "<td>" + tel + "</td>"+
                "<td>" + mail + "</td>"+
                "<td>" + adr + "</td>"+
                "<td>" + date_aj + "</td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-pen text-primary'"+
                " data-bs-toggle='offcanvas' data-bs-target='#offcanvasModifier'"+
                "onclick='getClientInfo("+id_client+")'"+
                "></i></td>"+
                "<td style='width: 60px;'><i class='fa-solid fa-trash text-danger'"+
                "onclick='deleteClient("+id_client+")'"+
                "></i></td>"+
                "</tr>";
            }
            if (table == "") {
                if (nom != "") table = "<h5 style='color:red'>No result was found</h5>";
                else table = "<h5 style='color:red'>Table is empty</h5>";
            }
            table_searsh_result.innerHTML = table;
        }
    }
}

function searshClient(){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    var nom = document.querySelector("#search-client").value;
    var l=document.querySelector("#dataTable_length").value;
    var choix=document.querySelector("#dataTable_order").value;
    getClient(nom,choix,l,dd,df);
}

function addClient() {
    checkSession();
    var nom = document.querySelector(".add-form #InputNom").value;
    var tele = document.querySelector(".add-form #InputTele").value;
    var mail = document.querySelector(".add-form #InputEmail").value;
    var adr = document.querySelector(".add-form #InputAdr").value;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/client.php?action=create&&nom=" + nom + "&&tele=" + tele + "&&mail=" + mail + "&&adr=" + adr, true);
    ajax.send();
    getClient();
}

function getClientInfo(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/client.php?action=readById&&id=" + i, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            document.querySelector(".modify-form div #InputNom").value=data[0].nom;
            document.querySelector(".modify-form div #InputTele").value=data[0].tele;
            document.querySelector(".modify-form div #InputEmail").value=data[0].mail;
            document.querySelector(".modify-form div #InputAdr").value=data[0].adr;
            document.querySelector(".modifyClient").innerHTML=""+
            "<button type='submit' class='btn btn-primary mx-5 modifyClient' onclick='modifyClient("+
            i+
            ")'>Submit</button>";
            document.querySelector(".nom_client").innerHTML="Modifier le client : "+data[0].nom;
        }
    }    
}

function modifyClient(i){
    checkSession();
    var nom = document.querySelector(".modify-form #InputNom").value;
    var tele = document.querySelector(".modify-form #InputTele").value;
    var mail = document.querySelector(".modify-form #InputEmail").value;
    var adr = document.querySelector(".modify-form #InputAdr").value;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/client.php?action=update&&id="+i+"&&nom=" + nom + "&&tele=" + tele + "&&mail=" + mail + "&&adr=" + adr, true);
    ajax.send();
    getClient();
}

function deleteClient(i){
    checkSession();
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../controle/client.php?action=delete&&id="+i, true);
    ajax.send();
    getClient();
}

function dateAjClient(btn){
    var dd=document.querySelector("#date_ajd").value;
    var df=document.querySelector("#date_ajf").value;
    if(dd>df&&dd!=""&&df!=""){
        btn.value="";
        alertText("#hide-text",1000);
    }
    else FilterIconPrimary();
    searshClient();
}

function resetFilterForm() {
    getClient();
    FilterIconSecondary();
}