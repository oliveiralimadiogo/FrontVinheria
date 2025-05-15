function getVinhos(){
    return fetch('../assets/dados.json')
    .then(res => res.json())
    .catch(error => {
      console.error('Erro ao carregar os vinhos:', error);
      return [];
    });
}

function getNumeroColunas() {
  const width = window.innerWidth;
  console.log(width);
  if (width >= 1545) return 4;
  if (width >= 1180) return 3;
  if (width >= 780) return 2;
  return 1;
}

function montaHtml() {
  console.log("Chamado");
  getVinhos().then(vinhos => {
    const table = document.getElementById('container-itens');
    let row;

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    const colunas = getNumeroColunas();
    for (let i = 0; i < vinhos.length; i++) {
      if (i % colunas === 0) {
        row = document.createElement('tr');
        table.appendChild(row);
      }

      const vinho = vinhos[i];

      const cell = document.createElement('td');

      const item = document.createElement('div');
      item.className = 'item-catalogo';

      const precoContainer = document.createElement('div');
      precoContainer.className = 'container-precos';

      if (vinho.desconto) {
        const tag = document.createElement('div');
        tag.className = 'tag-desconto';
        tag.textContent = `${vinho.desconto}% Off`;
        item.appendChild(tag);

        const precoAntigo = document.createElement('p');
        precoAntigo.className = 'preco-antigo';
        let precoComDesconto = vinho.preco - (vinho.preco * vinho.desconto);
        precoAntigo.textContent = `R$ ${precoComDesconto.toFixed(2)}`; //TODO - Fix this
        precoContainer.appendChild(precoAntigo);
      }

      const img = document.createElement('img');
      img.src = vinho.imagem;
      item.appendChild(img);

      const nome = document.createElement('h3');
      nome.className = 'nome-produto';
      nome.textContent = vinho.nome;
      item.appendChild(nome);

      const ano = document.createElement('p');
      ano.className = 'ano-produto';
      ano.textContent = vinho.anoSafra;
      item.appendChild(ano);

      const preco = document.createElement('p');
      preco.className = 'preco';
      preco.textContent = `R$ ${vinho.preco.toFixed(2)}`;
      precoContainer.appendChild(preco);

      item.appendChild(precoContainer);

      const link = document.createElement('a');
      link.href = `produto.html?id=${vinho.id}`;
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      link.appendChild(item);

      cell.appendChild(link);
      row.appendChild(cell);
    }

    const vinhosLength = vinhos.length;
    const resto = vinhosLength % colunas;

    console.log("Colunas: ", colunas);
    console.log("Length: ", vinhosLength);
    console.log("Resto: ", resto);
    
    if (resto !== 0) {
      for (let i = 0; i < colunas - resto; i++) {
        const emptyCell = document.createElement('td');

        const emptyItem = document.createElement('div');
        emptyItem.className = 'item-catalogo';
        emptyItem.style.visibility = 'hidden';

        emptyCell.appendChild(emptyItem);
        row.appendChild(emptyCell);
      }
    }
  });
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => montaHtml(), 300);
});

document.addEventListener('DOMContentLoaded', () => {
  montaHtml();
});

montaHtml();
