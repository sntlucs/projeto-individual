function entrar() {
    let emailDigitado = ipt_email.value;
    let senhaDigitada = ipt_senha.value;
    let senhaIncorreta = false;

    let listaEmail = [
        'lucas@teste.com',
    ];

    let listaSenha = [
        'senha1',
    ];

    for (let i = 0; i < listaEmail.length; i++) {
        
        if (emailDigitado.includes("@") && (emailDigitado == listaEmail[i] && senhaDigitada == listaSenha[i])) {
            senhaIncorreta = false;
            window.location.href = 'dashboards.html';
            break;
        } 
        
        else if(emailDigitado == '' && senhaDigitada == ''){
            alert('Por favor, preencha todos os campos!');
            break;
        }

        else if(emailDigitado.includes("@") == false){
            alert('Por favor, digite um Email válido!');
            break;
        }

        else{
            senhaIncorreta = true;
        }
    }
    if (senhaIncorreta){
        alert('Email ou senha incorretos.');
        ipt_email.value = ``;
        ipt_senha.value = ``;
    }

    
}