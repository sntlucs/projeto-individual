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
        nome: form.nome.value,
        origem: form.origem.value,
        classe: form.classe.value,
        nivel: parseInt(form.nivel.value),
        id_usuario: 1, // ou use sessão autenticada
        id_campanha: parseInt(form.id_campanha.value)
    };

    const id = form.id_personagem.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `/personagem/${id}` : "/personagem";

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personagem)
    });

    form.reset();
    form.id_personagem.value = "";
    carregarPersonagens();
});

async function carregarCampanhas() {
    const resposta = await fetch("/campanhas");
    const campanhas = await resposta.json();

    campanhas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id_campanha;
        opt.textContent = c.nome;
        campanhaSelect.appendChild(opt);
    });
}

async function carregarPersonagens() {
    lista.innerHTML = "";
    const resposta = await fetch("/personagem");
    const personagens = await resposta.json();

    personagens.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${p.nome}</strong> — ${p.classe} (nível ${p.nivel}) — ${p.origem}
            <br>Campanha: ${p.nomeCampanha || "Sem campanha"}
            <br><button onclick="editar(${p.id_personagem})">Editar</button>
            <button onclick="deletar(${p.id_personagem})">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

async function editar(id) {
    const resposta = await fetch(`/personagem/${id}`);
    const p = await resposta.json();

    form.id_personagem.value = p.id_personagem;
    form.nome.value = p.nome;
    form.origem.value = p.origem;
    form.classe.value = p.classe;
    form.nivel.value = p.nivel;
    form.id_campanha.value = p.id_campanha;
}

async function deletar(id) {
    if (!confirm("Deseja mesmo excluir este personagem?")) return;
    await fetch(`/personagem/${id}`, { method: "DELETE" });
    carregarPersonagens();
}
