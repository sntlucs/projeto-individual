function validarSessao() {
    var id = sessionStorage.ID_USUARIO;
   
    if (id == null) {
        window.location = "login.html";
    } 
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}

// carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }


// function pgPersonagem() {
//     var email = sessionStorage.EMAIL_FUNCIONARIO;
//     var nome = sessionStorage.NOME_FUNCIONARIO;

//     if (email != null && nome != null) {
//         window.location = "dashboards.html";
//     }
// }