document.addEventListener('DOMContentLoaded', () => {
    iniciarVotacao();
});

let chapaEscolhida = null;
let eleicaoAtual = null;
let chapas = []; // lista global
let chapaSelecionadaId = null;

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
        chapas = await api.getChapas();
        exibirChapas(chapas);
        
        mostrarTela('telaVotacao');
    } catch (error) {
        console.error('Erro ao iniciar votação:', error);
        mostrarMensagem('Erro ao carregar a votação');
    }
}

function exibirChapas(chapas) {
  const container = document.getElementById('listaChapas');
  container.innerHTML = '';

  chapas.forEach(chapa => {
    const card = document.createElement('div');
    card.className = 'chapa-card' + (chapaSelecionadaId === chapa.id ? ' selected' : '');
    card.innerHTML = `
      <div class="chapa-nome">${chapa.nome}</div>
      <div class="chapa-desc">${chapa.descricao || ''}</div>
      <button class="chapa-votar-btn" data-id="${chapa.id}">Votar</button>
    `;
    // Selecionar chapa ao clicar no card ou botão
    card.querySelector('.chapa-votar-btn').onclick = () => selecionarChapa(chapa.id, chapa.nome);
    card.onclick = (e) => {
      if (!e.target.classList.contains('chapa-votar-btn')) {
        selecionarChapa(chapa.id, chapa.nome);
      }
    };
    container.appendChild(card);
  });
}

function selecionarChapa(id, nome) {
    chapaSelecionadaId = id;
    exibirChapas(chapas); // Atualiza visual
  
    // Mostra tela de confirmação
    document.getElementById('telaVotacao').classList.add('hidden');
    document.getElementById('confirmacao').classList.remove('hidden');
    document.getElementById('dadosConfirmacao').innerText = nome;
}

function corrigirVoto() {
    document.getElementById('confirmacao').classList.add('hidden');
    document.getElementById('telaVotacao').classList.remove('hidden');
}

async function confirmarVoto() {
    if (!chapaSelecionadaId || !eleicaoAtual) return;
    try {
        await api.registrarVoto(chapaSelecionadaId, eleicaoAtual.id);
        document.getElementById('confirmacao').classList.add('hidden');
        document.getElementById('fim').classList.remove('hidden');
        
        // Aguarda 3 segundos e reinicia o processo de votação
        setTimeout(() => {
            // Limpa a seleção atual
            chapaSelecionadaId = null;
            // Esconde a tela de fim
            document.getElementById('fim').classList.add('hidden');
            // Mostra a tela de votação
            document.getElementById('telaVotacao').classList.remove('hidden');
            // Atualiza a exibição das chapas
            exibirChapas(chapas);
        }, 3000); // 3000 milissegundos = 3 segundos
    } catch (e) {
        alert('Erro ao registrar voto: ' + e.message);
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