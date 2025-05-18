let listaUsuarios = [];

function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo 

  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == ""
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Verificando se o código de ativação é de alguma empresa cadastrada
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (!listaUsuarios.includes(cnpjVar)) {
      console.log("CNPJ válido.");
      break;
    } else {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "(Mensagem de erro para Senha inválida)";
      // finalizarAguardar();
    }
  }

  // Enviando o valor da nova input
  fetch("/usuario/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      senhaServer: senhaVar,
      emailServer: emailVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso!";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        // limparFormulario();
        // finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });

  return false;
}

// function listar() {
//   fetch("/usuarios/listar", {
//     method: "GET",
//   })
//     .then(function (resposta) {
//       resposta.json().then((empresas) => {
//         empresas.forEach((empresa) => {
//           listaMontadorasCadastradas.push(empresa);

//           console.log("listaMontadorasCadastradas")
//           console.log(listaMontadorasCadastradas[0].cnpjVar)
//         });
//       });
//     })
//     .catch(function (resposta) {
//       console.log(`#ERRO: ${resposta}`);
//     });
// }

// function sumirMensagem() {
//   cardErro.style.display = "none";
// }
// //
