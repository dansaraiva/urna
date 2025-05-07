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

function formatarData(data) {
    return new Date(data).toLocaleString();
}