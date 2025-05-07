let chapaEscolhida = null;
let eleicaoAtual = null;

document.addEventListener('DOMContentLoaded', () => {
    iniciarVotacao();
});

async function iniciarVotacao() {
    try {
        // Carregar eleição atual
        const eleicoes = await api.getEleicoes();
        eleicaoAtual = eleicoes.find(e => e.status === 'EM_ANDAMENTO');

        if (!eleicaoAtual) {
            mostrarMensagem('Não há eleição em andamento no momento.');
            return;
        }

        // Carregar chapas
        const chapas = await api.getChapas();
        exibirChapas(chapas);
        
        mostrarTela('telaVotacao');
    } catch (error) {
        console.error('Erro ao iniciar votação:', error);
        mostrarMensagem('Erro ao carregar a votação');
    }
}

function exibirChapas(chapas) {
    const listaChapas = document.getElementById('listaChapas');
    listaChapas.innerHTML = chapas.map(chapa => `
        <div class="chapa-card" onclick="selecionarChapa(${chapa.id}, '${chapa.nome}')">
            <h4>${chapa.nome}</h4>
            <p>${chapa.integrantes}</p>
        </div>
    `).join('');
}

function selecionarChapa(id, nome) {
    chapaEscolhida = { id, nome };
    
    const dadosConfirmacao = document.getElementById('dadosConfirmacao');
    dadosConfirmacao.innerHTML = `
        <p>Chapa selecionada:</p>
        <h4>${nome}</h4>
    `;
    
    mostrarTela('confirmacao');
}

function corrigirVoto() {
    chapaEscolhida = null;
    mostrarTela('telaVotacao');
}

async function confirmarVoto() {
    if (!chapaEscolhida || !eleicaoAtual) return;

    try {
        await api.registrarVoto({
            chapaId: chapaEscolhida.id,
            eleicaoId: eleicaoAtual.id
        });
        
        mostrarTela('fim');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    } catch (error) {
        console.error('Erro ao registrar voto:', error);
        mostrarMensagem('Erro ao registrar o voto');
    }
}

function mostrarTela(telaId) {
    ['telaVotacao', 'confirmacao', 'fim'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(telaId).classList.remove('hidden');
}

function mostrarMensagem(mensagem) {
    const eleicaoInfo = document.getElementById('eleicaoInfo');
    eleicaoInfo.innerHTML = `<p class="mensagem">${mensagem}</p>`;
}