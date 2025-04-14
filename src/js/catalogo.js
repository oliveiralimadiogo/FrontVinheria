function getVinhos(){
    return fetch('../js/dados.json')
    .then(res => res.json())
    .catch(error => {
      console.error('Erro ao carregar os vinhos:', error);
      return [];
    });
}

function montaHtml(){
    getVinhos().then(vinhos => {
        const container = document.getElementById('container-itens');
        vinhos.forEach(vinho => {
          const item = document.createElement('div');
          item.className = 'item-catalogo';
          
          const precoContainer = document.createElement('div');
          precoContainer.className = 'container-precos';

          if (vinho.desconto) {
            const tag = document.createElement('div');
            tag.className = 'tag-desconto';
            tag.textContent = vinho.desconto;
            item.appendChild(tag);

            const precoAntigo = document.createElement('p');
            precoAntigo.className = 'preco-antigo';
            precoAntigo.textContent = `R$ ${vinho.precoAntigo.toFixed(2)}`;
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
          ano.textContent = vinho.ano;
          item.appendChild(ano);
                     
    
          const preco = document.createElement('p');
          preco.className = 'preco';
          preco.textContent = `R$ ${vinho.preco.toFixed(2)}`;
          precoContainer.appendChild(preco);
    
          item.appendChild(precoContainer);
    
          const link = document.createElement('a');
          link.href = `pdp.html?id=${vinho.id}`;
          link.style.textDecoration = 'none';
          link.style.color = 'inherit';
          
          link.appendChild(item);
          container.appendChild(link);
          
        });
    })
}

montaHtml()