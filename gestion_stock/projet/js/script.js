function FilterIconPrimary(){
    document.querySelector("#filterIcon").classList.remove("text-secondary");
    document.querySelector("#filterIcon").classList.add("text-primary");   
}

function FilterIconSecondary(){
    document.querySelector("#filterIcon").classList.remove("text-primary");
    document.querySelector("#filterIcon").classList.add("text-secondary");
}

function alertText(id,time){
    document.querySelector(id).classList.remove("d-none");
    document.querySelector(id).classList.add("d-block");
    let timeout = null;
    timeout = setTimeout(function () {
        document.querySelector(id).classList.remove("d-block");
        document.querySelector(id).classList.add("d-none");
    },time);
}

var rotate=0;
function slideToggle(val1){
    $(val1).toggle(500);
    if(rotate==0){
        $(".stock").css({'transform':'rotate(90deg)'});
        rotate++;
    }else{
        $(".stock").css({'transform':'rotate(0deg)'});
        rotate--;
    }
}

function checkSession(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../connexion/check.php", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data!=1) window.location.href="../connexion/deconnexion.php";
        }
    }
}