const API_URL = 'http://localhost:8080/api';

const api = {
    // Chapas
    async getChapas() {
        const response = await fetch(`${API_URL}/chapas`);
        return response.json();
    },

    async cadastrarChapa(chapa) {
        const response = await fetch(`${API_URL}/chapas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chapa)
        });
        return response.json();
    },

    async deletarChapa(id) {
        const response = await fetch(`${API_URL}/chapas/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    },

    // Eleições
    async getEleicoes() {
        const response = await fetch(`${API_URL}/eleicoes`);
        return response.json();
    },

    async cadastrarEleicao(eleicao) {
        const response = await fetch(`${API_URL}/eleicoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eleicao)
        });
        return response.json();
    },

    // Votos
    async registrarVoto(voto) {
        const response = await fetch(`${API_URL}/votos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voto)
        });
        return response.json();
    },

    async getResultados() {
        const response = await fetch(`${API_URL}/relatorios/votos`);
        return response.json();
    }
};