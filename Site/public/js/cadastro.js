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
    alert("Os campos não podem ser vazios.");
    return false;
  }

  if (nomeVar.length <= 1) {
    alert("O nome deve conter mais de 1 caractere.");
    return ;
  }

  if (!emailVar.includes('@') || !emailVar.includes('.')) {
    alert("O e-mail é inválido.");
    return ;
  }

    fetch("/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          setTimeout(() => {
            window.location = "login.html";
          }, "1000");

        } else {
          alert('Esse e-mail já foi cadastrado!')
          throw "Houve um erro ao tentar realizar o cadastro!";
          
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
