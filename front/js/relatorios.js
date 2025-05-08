let graficoVotos = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarEleicoes();
    
    const eleicaoSelect = document.getElementById('eleicaoSelect');
    if (eleicaoSelect) {
        eleicaoSelect.addEventListener('change', carregarResultados);
    }
});

async function carregarEleicoes() {
    try {
        const eleicoes = await api.getEleicoes();
        const eleicaoSelect = document.getElementById('eleicaoSelect');
        
        eleicaoSelect.innerHTML = `
            <option value="">Selecione uma eleição</option>
            ${eleicoes.map(eleicao => `
                <option value="${eleicao.id}">${eleicao.nome}</option>
            `).join('')}
        `;
    } catch (error) {
        console.error('Erro ao carregar eleições:', error);
        alert('Erro ao carregar eleições');
    }
}

async function carregarResultados() {
    const eleicaoId = document.getElementById('eleicaoSelect').value;
    if (!eleicaoId) return;

    try {
        const resultados = await api.getResultados(eleicaoId);
        exibirGrafico(resultados);
        exibirTabela(resultados);
    } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        alert('Erro ao carregar resultados');
    }
}
function exibirGrafico(resultados) {
    const ctx = document.getElementById('graficoVotos').getContext('2d');
    
    if (graficoVotos) {
        graficoVotos.destroy();
    }

    // Cores personalizadas para as chapas e votos em branco
    const cores = resultados.map(r => r.chapa === "Votos em Branco" ? 'rgba(200, 200, 200, 0.5)' : 'rgba(54, 162, 235, 0.5)');
    const bordas = resultados.map(r => r.chapa === "Votos em Branco" ? 'rgba(150, 150, 150, 1)' : 'rgba(54, 162, 235, 1)');

    graficoVotos = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: resultados.map(r => r.chapa),
            datasets: [{
                label: 'Votos',
                data: resultados.map(r => r.votos),
                backgroundColor: cores,
                borderColor: bordas,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function exibirTabela(resultados) {
    const tabelaResultados = document.getElementById('tabelaResultados');
    
    const totalVotos = resultados.reduce((total, r) => total + r.votos, 0);
    
    tabelaResultados.innerHTML = `
    <table class="tabela-resultados">
        <thead>
            <tr>
                <th>Chapa</th>
                <th>Votos</th>
                <th>Percentual</th>
            </tr>
        </thead>
        <tbody>
            ${resultados.map(r => `
            <tr class="${r.chapa === 'Votos em Branco' ? 'votos-branco' : ''}">
                <td>${r.chapa}</td>
                <td>${r.votos}</td>
                <td>${r.percentual.toFixed(2)}%</td>
            </tr>
            `).join('')}
            <tr class="total">
                <td>Total</td>
                <td>${totalVotos}</td>
                <td>100%</td>
            </tr>
        </tbody>
    </table>
    `;
}