document.addEventListener('DOMContentLoaded', () => {
    carregarChapas();

    const form = document.getElementById('chapaForm');
    if (form) {
        form.addEventListener('submit', cadastrarChapa);
    }
});

async function carregarChapas() {
    try {
        const chapas = await api.getChapas();
        const listaChapas = document.getElementById('listaChapas');
        
        if (listaChapas) {
            listaChapas.innerHTML = chapas.map(chapa => `
                <div class="lista-item">
                    <div>
                        <h4>${chapa.nome}</h4>
                        <p>${chapa.integrantes}</p>
                    </div>
                    <button onclick="deletarChapa(${chapa.id})" class="btn btn-danger">
                        Excluir
                    </button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar chapas:', error);
        alert('Erro ao carregar chapas');
    }
}

async function cadastrarChapa(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeChapa').value;
    const integrantes = document.getElementById('integrantes').value;

    try {
        await api.cadastrarChapa({ nome, integrantes });
        alert('Chapa cadastrada com sucesso!');
        event.target.reset();
        carregarChapas();
    } catch (error) {
        console.error('Erro ao cadastrar chapa:', error);
        alert('Erro ao cadastrar chapa');
    }
}

async function deletarChapa(id) {
    if (confirm('Tem certeza que deseja excluir esta chapa?')) {
        try {
            await api.deletarChapa(id);
            alert('Chapa excluída com sucesso!');
            carregarChapas();
        } catch (error) {
            console.error('Erro ao deletar chapa:', error);
            alert('Erro ao deletar chapa');
        }
    }
    let chapas = []; // mantenha a lista globalmente
    let chapaSelecionadaId = null;
    
    const container = document.getElementById('chapasContainer');
container.innerHTML = ''; // Limpa antes de renderizar

chapas.forEach(chapa => {
  const card = document.createElement('div');
  card.className = 'chapa-card';
  card.innerHTML = `
    <div class="chapa-nome">${chapa.nome}</div>
    <div class="chapa-desc">${chapa.descricao || ''}</div>
    <button class="chapa-votar-btn" data-id="${chapa.id}">Votar</button>
  `;
  container.appendChild(card);
});
    
    function selecionarChapa(id, nome) {
      chapaSelecionadaId = id;
      exibirChapas(chapas); // re-renderiza para mostrar seleção
      // Aqui você pode exibir a confirmação, etc.
    }
    
    
}