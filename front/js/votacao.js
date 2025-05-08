document.addEventListener('DOMContentLoaded', () => {
     // Ocultar a barra de navegação
     const nav = document.querySelector('header nav');
     if (nav) {
         nav.style.display = 'none';
     }
     
      document.body.classList.add('modo-votacao');
     
     // Iniciar a votação
    iniciarVotacao();

    window.addEventListener('beforeunload', (event) => {
        
        event.preventDefault();
        event.returnValue = 'Você está saindo da tela de votação. Tem certeza?';
    });
});

let chapaEscolhida = null;
let eleicaoAtual = null;
let chapas = []; // lista global
let chapaSelecionadaId = null;


async function votarEmBranco() {
    if (!eleicaoAtual) {
        alert('Nenhuma eleição em andamento.');
        return;
    }

    if (confirm('Confirma seu voto em BRANCO?')) {
        try {
            console.log('Enviando voto em branco para eleição ID:', eleicaoAtual.id);
            await api.registrarVotoBranco(eleicaoAtual.id);
            
            // Mostra a tela de fim
            document.getElementById('telaVotacao').classList.add('hidden');
            document.getElementById('fim').classList.remove('hidden');
            
            // Aguarda 3 segundos e reinicia o processo de votação
            setTimeout(() => {
                document.getElementById('fim').classList.add('hidden');
                document.getElementById('telaVotacao').classList.remove('hidden');
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao votar em branco:', error);
            alert('Não foi possível registrar o voto em branco. Por favor, tente novamente.');
        }
    }
}
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
        console.log("Chapas carregadas:", chapas); // Log para verificar os dados
        
        // Verificar se as chapas têm URLs de fotos
        chapas.forEach(chapa => {
            console.log(`Chapa ${chapa.id} - ${chapa.nome} - URL da foto: ${chapa.fotoUrl}`);
        });
        
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
      console.log(`Renderizando chapa ${chapa.id} - Tem foto? ${Boolean(chapa.fotoUrl)}`);
      
      const card = document.createElement('div');
      card.className = 'chapa-card' + (chapaSelecionadaId === chapa.id ? ' selected' : '');
      
      // Verificar a URL da foto antes de renderizar
      if (chapa.fotoUrl) {
        console.log(`URL da foto para chapa ${chapa.id}: ${chapa.fotoUrl}`);
      }
      
      card.innerHTML = `
        ${chapa.fotoUrl ? `<div class="chapa-foto"><img src="${chapa.fotoUrl}" alt="${chapa.nome}" onerror="console.error('Erro ao carregar imagem: ${chapa.fotoUrl}')"></div>` : ''}
        <div class="chapa-nome">${chapa.nome}</div>
        <div class="chapa-integrantes">${chapa.integrantes || ''}</div>
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
    
    // Encontra a chapa selecionada
    const chapaSelecionada = chapas.find(chapa => chapa.id === id);
    
    // Prepara o conteúdo da confirmação
    let confirmacaoHTML = `
      ${chapaSelecionada.fotoUrl ? `<div class="chapa-foto-confirmacao"><img src="${chapaSelecionada.fotoUrl}" alt="${nome}"></div>` : ''}
      <p>${nome}</p>
    `;
    
    // Mostra tela de confirmação
    document.getElementById('telaVotacao').classList.add('hidden');
    document.getElementById('confirmacao').classList.remove('hidden');
    document.getElementById('dadosConfirmacao').innerHTML = confirmacaoHTML;
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

function encerrarModoVotacao() {
    // Restaurar a barra de navegação
    const nav = document.querySelector('header nav');
    if (nav) {
        nav.style.display = '';
    }
    
    // Remover classe de modo votação
    document.body.classList.remove('modo-votacao');
}