const form = document.getElementById("form-personagem");
const campanhaSelect = document.getElementById("id_campanha");
const lista = document.getElementById("personagens");
console.log("sessionStorage.ID_USUARIO:", sessionStorage.ID_USUARIO);

window.addEventListener("load", () => {
    carregarCampanhas();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id_usuario = sessionStorage.ID_USUARIO;
    const nome = form.nome.value.trim();
    const origem = form.origem.value.trim();
    const classe = form.classe.value.trim();
    const nivel = parseInt(form.nivel.value) || 1;
    const id_campanha = parseInt(form.id_campanha.value);

    if (!id_usuario) {
        alert("Erro: usuário não autenticado.");
        return;
    }

    if (!nome || !classe || isNaN(id_campanha)) {
        alert("Preencha todos os campos obrigatórios (nome, classe e campanha).");
        return;
    }

    const personagem = {
        nome,
        origem,
        classe,
        nivel,
        id_usuario,
        id_campanha
    };

    console.log("Enviando personagem:", personagem);

    const id = form.id_personagem.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `/personagem/${id}` : "/personagem";

    try {
        const resposta = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(personagem)
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            throw new Error(erro);
        }

        form.reset();
        form.id_personagem.value = "";
        carregarPersonagensDoUsuario();
    } catch (erro) {
        console.error("Erro ao salvar personagem:", erro);
        alert("Erro ao salvar personagem.");
    }
});

async function carregarCampanhas() {
    campanhaSelect.innerHTML = '<option value="">Selecione</option>';

    try {
        const resposta = await fetch("/campanhas");
        const campanhas = await resposta.json();

        campanhas.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.nome || "Sem nome";
            campanhaSelect.appendChild(opt);
        });
    } catch (erro) {
        console.error("Erro ao carregar campanhas:", erro);
    }
}

function carregarPersonagensDoUsuario() {
    var id_usuario = sessionStorage.ID_USUARIO;
    console.log("Carregando personagens do usuário:", id_usuario);

    fetch(`/personagem/usuario/${id_usuario}`)
        .then(res => res.json())
        .then(personagens => {
            const container = document.getElementById("lista-personagens");
            container.innerHTML = "";

            if (personagens.length === 0) {
                container.innerHTML = "<p>Nenhum personagem cadastrado.</p>";
                return;
            }

            personagens.forEach(p => {
                const card = document.createElement("div");
                card.className = "personagem-card";
                card.innerHTML = `
                    <h3>${p.nome}</h3>
                    <p><strong>Origem:</strong> ${p.origem}</p>
                    <p><strong>Classe:</strong> ${p.classe}</p>
                    <p><strong>Nível:</strong> ${p.nivel}</p>
                    <p><strong>Campanha:</strong> ${p.nomeCampanha}</p>
                    <button onclick="editar(${p.id})">Editar</button>
                    <button onclick="deletar(${p.id})">Excluir</button>
                `;
                container.appendChild(card);
            });
        })
};

async function editar(id) {
    try {
        const resposta = await fetch(`/personagem/${id}`);
        const p = await resposta.json();
        console.log("Personagem recebido para edição:", p);

        form.id_personagem.value = p.id;
        form.nome.value = p.nome || "";
        form.origem.value = p.origem || "";
        form.classe.value = p.classe || "";
        form.nivel.value = p.nivel || 1;
        form.id_campanha.value = p.fk_campanha || "";

    } catch (erro) {
        console.error("Erro ao editar personagem:", erro);
    }
}

async function deletar(id) {
    if (!confirm("Deseja mesmo excluir este personagem?")) return;
    try {
        await fetch(`/personagem/${id}`, { method: "DELETE" });
        carregarPersonagensDoUsuario();
    } catch (erro) {
        console.error("Erro ao excluir personagem:", erro);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    carregarPersonagensDoUsuario();
});