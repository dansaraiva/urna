// Variáveis globais (se necessário)
let chapas = [];
let chapaSelecionadaId = null;

// Event Listener quando o DOM carrega
document.addEventListener('DOMContentLoaded', () => {
    carregarChapas();

    const form = document.getElementById('chapaForm');
    if (form) {
        form.addEventListener('submit', cadastrarChapa);
    }
});

// Função para carregar chapas
async function carregarChapas() {
    try {
        const chapas = await api.getChapas();
        const listaChapas = document.getElementById('listaChapas');
        
        if (listaChapas) {
            listaChapas.innerHTML = chapas.map(chapa => `
                <div class="lista-item">
                    <div>
                        ${chapa.fotoUrl ? `<img src="${chapa.fotoUrl}" alt="${chapa.nome}" class="chapa-foto">` : ''}
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

// Função para cadastrar chapa
async function cadastrarChapa(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeChapa').value;
    const integrantes = document.getElementById('integrantes').value;
    const fotoInput = document.getElementById('fotoChapa');
    
    try {
        let fotoUrl = null;
        
        if (fotoInput && fotoInput.files && fotoInput.files[0]) {
            fotoUrl = await api.uploadFoto(fotoInput.files[0]);
        }
        
        await api.cadastrarChapa({ 
            nome, 
            integrantes,
            fotoUrl 
        });
        
        alert('Chapa cadastrada com sucesso!');
        event.target.reset();
        carregarChapas();
    } catch (error) {
        console.error('Erro ao cadastrar chapa:', error);
        alert('Erro ao cadastrar chapa');
    }
}

// Função para deletar chapa
async function deletarChapa(id) {
    if (confirm('Tem certeza que deseja excluir esta chapa?')) {
        try {
            const deleted = await api.deletarChapa(id);
            if (deleted) {
                alert('Chapa excluída com sucesso!');
                await carregarChapas();
            } else {
                throw new Error('Não foi possível excluir a chapa');
            }
        } catch (error) {
            console.error('Erro ao deletar chapa:', error);
            alert('Erro ao deletar chapa: ' + error.message);
        }
    }
}

// Função para exibir chapas na interface de votação (se necessário)
function exibirChapasVotacao(chapas) {
    const container = document.getElementById('chapasContainer');
    if (!container) return;

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
}

// Função para selecionar chapa (se necessário para votação)
function selecionarChapa(id, nome) {
    chapaSelecionadaId = id;
    exibirChapasVotacao(chapas); // re-renderiza para mostrar seleção
}