const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('../assets/dados.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const vinho = data.find(vinho => vinho.id == id);
        console.log(vinho);
        if (vinho) {
            document.getElementById('productImage').src = vinho.imagem;
            document.getElementById('productName').textContent = vinho.nome;
            document.getElementById('totalPrice').textContent = vinho.preco.toFixed(2);
            document.getElementById('discountPrice').textContent = (vinho.preco - (vinho.preco * vinho.desconto/100)).toFixed(2);
            document.getElementById('description').textContent = vinho.descricao;
            document.getElementById('year').textContent = vinho.anoSafra;
            document.getElementById('type').textContent = vinho.tipo;
            document.getElementById('grape').textContent = vinho.uva;
            document.getElementById('producer').textContent = vinho.produtor;
            document.getElementById('region').textContent = vinho.regiao;
            document.getElementById('country').textContent = vinho.pais;
            document.getElementById('alcohol').textContent = vinho.quantidadeAlcool;
            document.getElementById('flavor').textContent = vinho.sabor;
            document.getElementById('amount').textContent = vinho.quantidadeMl;
            document.getElementById('temperature').textContent = vinho.temperaturaArmazenamentoCelsius;
            
        } else {
            console.error('Vinho não encontrado.');
        }
    });