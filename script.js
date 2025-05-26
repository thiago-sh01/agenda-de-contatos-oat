document.addEventListener('DOMContentLoaded', renderizarContatos);


function salvarContato(contato) {
  const contatos = buscarContatos();
  contatos.push(contato);
  localStorage.setItem('contatos', JSON.stringify(contatos));
}

function buscarContatos() {
  const contatos = localStorage.getItem('contatos');
  return contatos ? JSON.parse(contatos) : [];
}

function atualizarContato(index, novoContato) {
  const contatos = buscarContatos();
  contatos[index] = novoContato;
  localStorage.setItem('contatos', JSON.stringify(contatos));
}

function deletarContato(index) {
  const contatos = buscarContatos();
  contatos.splice(index, 1);
  localStorage.setItem('contatos', JSON.stringify(contatos));
}

function renderizarContatos() {
  const lista = document.getElementById('lista-contatos');
  lista.innerHTML = '';
  const contatos = buscarContatos();

  contatos.forEach((contato, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${contato.nome}</strong> - ${contato.telefone} - ${contato.email}
      <button onclick="editarContato(${index})">Editar</button>
      <button onclick="deletarContato(${index}); renderizarContatos();">Excluir</button>
    `;
    lista.appendChild(item);
  });
}

document.getElementById('form-contato').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  const contato = { nome, telefone, email };
  salvarContato(contato);
  renderizarContatos();
  this.reset();
});
