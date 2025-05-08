document.addEventListener('DOMContentLoaded', () => {
    carregarEleicoes();

    const form = document.getElementById('eleicaoForm');
    if (form) {
        form.addEventListener('submit', cadastrarEleicao);
    }
});

async function carregarEleicoes() {
    try {
        const eleicoes = await api.getEleicoes();
        const listaEleicoes = document.getElementById('listaEleicoes');
        
        if (listaEleicoes) {
            listaEleicoes.innerHTML = eleicoes.map(eleicao => `
                <div class="lista-item">
                    <div>
                        <h4>${eleicao.nome}</h4>
                        <p>Início: ${formatarData(eleicao.dataInicio)}</p>
                        <p>Término: ${formatarData(eleicao.dataFim)}</p>
                        <p>Status: ${eleicao.status}</p>
                    </div>
                    <div class="acoes">
                        <button onclick="alterarStatus(${eleicao.id})" class="btn">
                            Alterar Status
                        </button>
                        <button onclick="deletarEleicao(${eleicao.id})" class="btn btn-danger">
                            Excluir
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar eleições:', error);
        alert('Erro ao carregar eleições');
    }
}

async function cadastrarEleicao(event) {
    event.preventDefault();

    const eleicao = {
        nome: document.getElementById('nomeEleicao').value,
        dataInicio: document.getElementById('dataInicio').value,
        dataFim: document.getElementById('dataFim').value,
        status: document.getElementById('status').value
    };

    try {
        await api.cadastrarEleicao(eleicao);
        alert('Eleição cadastrada com sucesso!');
        event.target.reset();
        carregarEleicoes();
    } catch (error) {
        console.error('Erro ao cadastrar eleição:', error);
        alert('Erro ao cadastrar eleição');
    }
}

async function deletarEleicao(id) {
    if (confirm('Tem certeza que deseja excluir esta eleição? Esta ação não pode ser desfeita.')) {
        try {
            const sucesso = await api.deletarEleicao(id);
            if (sucesso) {
                alert('Eleição excluída com sucesso!');
                carregarEleicoes(); // Recarrega a lista
            } else {
                alert('Não foi possível excluir a eleição.');
            }
        } catch (error) {
            console.error('Erro ao excluir eleição:', error);
            alert('Erro ao excluir eleição: ' + error.message);
        }
    }
}

async function alterarStatus(id) {
    try {
        // Obter a eleição atual para verificar o status
        const eleicoes = await api.getEleicoes();
        const eleicao = eleicoes.find(e => e.id === id);
        
        if (!eleicao) {
            alert('Eleição não encontrada');
            return;
        }
        
        // Determinar o próximo status
        let novoStatus;
        switch (eleicao.status) {
            case 'AGENDADA':
                novoStatus = 'EM_ANDAMENTO';
                break;
            case 'EM_ANDAMENTO':
                novoStatus = 'FINALIZADA';
                break;
            case 'FINALIZADA':
                novoStatus = 'AGENDADA';
                break;
            default:
                novoStatus = 'AGENDADA';
        }
        
        // Confirmar a alteração
        if (confirm(`Deseja alterar o status da eleição de ${eleicao.status} para ${novoStatus}?`)) {
            // Adicionar este método ao objeto api
            const response = await fetch(`${API_URL}/eleicoes/${id}/status?status=${novoStatus}`, {
                method: 'PUT'
            });
            
            if (response.ok) {
                alert('Status alterado com sucesso!');
                carregarEleicoes(); // Recarrega a lista
            } else {
                alert('Não foi possível alterar o status da eleição.');
            }
        }
    } catch (error) {
        console.error('Erro ao alterar status:', error);
        alert('Erro ao alterar status: ' + error.message);
    }
}

function formatarData(data) {
    return new Date(data).toLocaleString();
}