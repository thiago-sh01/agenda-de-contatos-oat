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

function deletarContato(index) {
  const contatos = buscarContatos();
  contatos.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  renderizarContatos();
}

function editarContato(index) {
  const contatos = buscarContatos();
  const contato = contatos[index];

  document.getElementById("edit-nome").value = contato.nome;
  document.getElementById("edit-telefone").value = contato.telefone;
  document.getElementById("edit-email").value = contato.email;

  contatoEditandoIndex = index;
  document.getElementById("modal-editar").style.display = "flex";
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
  </div>
  <div class="btn-acao">
    <button class="btn-editar-overlay" onclick="editarContato(${index})" aria-label="Editar"></button>
    <button class="btn-editar" onclick="editarContato(${index})">Editar</button>
    <img src="assets/delete.svg" alt="Excluir" class="btn-lixeira" onclick="deletarContato(${index})" />
  </div>
    `;
    adicionarSwipe(item);
    lista.appendChild(item);
  });
}

function adicionarSwipe(item) {
  let startX = 0;
  let moved = false;

  item.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    moved = false;
  });

  item.addEventListener("touchmove", (e) => {
    const diffX = e.touches[0].clientX - startX;
    if (diffX < -30) {
      item.classList.add("swiped");
      moved = true;
    } else if (diffX > 30 && moved) {
      item.classList.remove("swiped");
    }
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

    salvarContato(contato);
    renderizarContatos();
    this.reset();
  });

document.getElementById("form-editar").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("edit-nome").value;
  const telefone = document.getElementById("edit-telefone").value;
  const email = document.getElementById("edit-email").value;

  const contato = { nome, telefone, email };

  if (contatoEditandoIndex !== null) {
    atualizarContato(contatoEditandoIndex, contato);
    contatoEditandoIndex = null;
  }

  renderizarContatos();
  document.getElementById("modal-editar").style.display = "none";
  this.reset();
});

document
  .getElementById("cancelar-edicao")
  .addEventListener("click", function () {
    document.getElementById("modal-editar").style.display = "none";
    document.getElementById("form-editar").reset();
    contatoEditandoIndex = null;
  });
