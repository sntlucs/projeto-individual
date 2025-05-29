const form = document.getElementById("form-personagem");
const campanhaSelect = document.getElementById("id_campanha");
const lista = document.getElementById("personagens");

window.addEventListener("load", () => {
    carregarCampanhas();
    carregarPersonagens();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const personagem = {
        nome: form.nome.value || "",
        origem: form.origem.value || "",
        classe: form.classe.value || "",
        nivel: parseInt(form.nivel.value) || 1,
        id_usuario: sessionStorage.ID_USUARIO,
        id_campanha: parseInt(form.id_campanha.value)
    };

    const id = form.id_personagem.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `/personagem/${id}` : "/personagem";

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(personagem)
        });

        form.reset();
        form.id_personagem.value = "";
        carregarPersonagens();
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
            opt.value = c.id_campanha;
            opt.textContent = c.nome || "Sem nome";
            campanhaSelect.appendChild(opt);
        });
    } catch (erro) {
        console.error("Erro ao carregar campanhas:", erro);
    }
}

function carregarPersonagens() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (!usuario || !usuario.id_usuario) {
        console.error("Usuário não está logado ou id_usuario não disponível.");
        return;
    }

    fetch(`/personagem/usuario/${usuario.id_usuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const lista = document.getElementById('listaPersonagens');
            if (!lista) {
                console.warn("Elemento com id 'listaPersonagens' não encontrado.");
                return;
            }

            lista.innerHTML = '';
            data.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.nome} (${p.classe}) - Nível ${p.nivel}`;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar personagens:", error);
        });
}


async function carregarPersonagens() {
    const id_usuario = sessionStorage.getItem('id_usuario');

    if (!id_usuario) {
        console.error("ID do usuário não encontrado na sessão!");
        return;
    }

    try {
        const resposta = await fetch(`/personagem?usuario=${id_usuario}`);
        if (!resposta.ok) throw new Error("Erro ao buscar personagens");

        const personagens = await resposta.json();

        const listaPersonagens = document.getElementById("listaPersonagens");
        listaPersonagens.innerHTML = "";

        personagens.forEach((personagem) => {
            const item = document.createElement("li");
            item.innerHTML = `
                <strong>${personagem.nome}</strong> - 
                ${personagem.classe} (${personagem.origem}) - 
                Nível ${personagem.nivel} - 
                Campanha: ${personagem.nomeCampanha}
                <button onclick="editarPersonagem(${personagem.id_personagem})">Editar</button>
                <button onclick="deletarPersonagem(${personagem.id_personagem})">Excluir</button>
            `;
            listaPersonagens.appendChild(item);
        });
    } catch (erro) {
        console.error("Erro ao carregar personagens:", erro);
    }
}

function carregarPersonagensDoUsuario() {
    const id_usuario = sessionStorage.getItem("id_usuario");

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
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar personagens do usuário:", err);
        });
}


async function editar(id) {
    try {
        const resposta = await fetch(`/personagem/${id}`);
        const p = await resposta.json();

        form.id_personagem.value = p.id_personagem;
        form.nome.value = p.nome || "";
        form.origem.value = p.origem || "";
        form.classe.value = p.classe || "";
        form.nivel.value = p.nivel || 1;
        form.id_campanha.value = p.id_campanha || "";
    } catch (erro) {
        console.error("Erro ao editar personagem:", erro);
    }
}

async function deletar(id) {
    if (!confirm("Deseja mesmo excluir este personagem?")) return;
    try {
        await fetch(`/personagem/${id}`, { method: "DELETE" });
        carregarPersonagens();
    } catch (erro) {
        console.error("Erro ao excluir personagem:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPersonagensDoUsuario();
    carregarCampanhas();
    carregarPersonagens();
});