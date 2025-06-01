let listaUsuarios = [];

function cadastrar() {


  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == ""

  ) {
    finalizarAguardar("Os campos não podem ser vazios.");
    return false;
  }

  if (nomeVar.length <= 1) {
    finalizarAguardar("O nome deve conter mais de 1 caractere.");
    return false;
  }

  if (!emailVar.includes('@') || !emailVar.includes('.')) {
    finalizarAguardar("O e-mail é inválido.");
    return false;
  }

  fetch("/usuario/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        var sectionErrosLogin = document.getElementById("section_erros_login");
        sectionErrosLogin.style.backgroundColor = '#069006';
      
        finalizarAguardar("Cadastro realizado com sucesso! Redirecionando para tela de login...");

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar(resposta);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
