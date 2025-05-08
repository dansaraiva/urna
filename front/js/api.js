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
    async registrarVoto(chapaId, eleicaoId) {
        try {
            // Converter para número e validar
            const votoDTO = {
                chapaId: Number(chapaId),
                eleicaoId: Number(eleicaoId)
            };

            // Validar se os IDs são números válidos
            if (isNaN(votoDTO.chapaId) || isNaN(votoDTO.eleicaoId)) {
                throw new Error('IDs inválidos');
            }

            console.log('Enviando voto:', votoDTO); // Debug

            const response = await fetch(`${API_URL}/votos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(votoDTO)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao registrar voto:', error);
            throw error;
        }
    },

    async getResultados(eleicaoId) {
        const response = await fetch(`${API_URL}/relatorios/votos/${eleicaoId}`);
        return response.json();
    }
};