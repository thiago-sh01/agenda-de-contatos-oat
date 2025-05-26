document.addEventListener("DOMContentLoaded", renderizarContatos);

let contatoEditandoIndex = null;

function salvarContato(contato) {
  const contatos = buscarContatos();
  contatos.push(contato);
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function buscarContatos() {
  const contatos = localStorage.getItem("contatos");
  return contatos ? JSON.parse(contatos) : [];
}

function atualizarContato(index, novoContato) {
  const contatos = buscarContatos();
  contatos[index] = novoContato;
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function editarContato(index) {
  const contatos = buscarContatos();
  const contato = contatos[index];

  document.getElementById("nome").value = contato.nome;
  document.getElementById("telefone").value = contato.telefone;
  document.getElementById("email").value = contato.email;

  contatoEditandoIndex = index;
}

function deletarContato(index) {
  const contatos = buscarContatos();
  contatos.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
}

function renderizarContatos() {
  const lista = document.getElementById("lista-contatos");
  lista.innerHTML = "";
  const contatos = buscarContatos();

  contatos.forEach((contato, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
    <div>  
    <strong>${contato.nome}</strong> - ${contato.telefone} - ${contato.email}
      <button onclick="editarContato(${index})">Editar</button>
    </div>
     <img src="assets/delete.svg" alt="Excluir" class="btn-lixeira" onclick="deletarContato(${index}); renderizarContatos();" />
    `;
    lista.appendChild(item);
  });
}

document
  .getElementById("form-contato")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    const contato = { nome, telefone, email };
    if (contatoEditandoIndex !== null) {
      atualizarContato(contatoEditandoIndex, contato);
      contatoEditandoIndex = null;
    } else {
      salvarContato(contato);
    }
    renderizarContatos();
    this.reset();
  });
