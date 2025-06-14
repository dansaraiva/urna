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
    async uploadFoto(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_URL}/chapas/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erro ao fazer upload da imagem');
        }
        
        const result = await response.json();
        return result.url;
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
    async registrarVoto(chapaId, eleicaoId, votoBranco = false) {
        try {
            const votoDTO = {
                chapaId: votoBranco ? null : Number(chapaId),
                eleicaoId: Number(eleicaoId),
                votoBranco: votoBranco
            };

            // Validar se o ID da eleição é válido
            if (isNaN(votoDTO.eleicaoId)) {
                throw new Error('ID da eleição inválido');
            }

            // Se não for voto em branco, validar ID da chapa
            if (!votoBranco && isNaN(votoDTO.chapaId)) {
                throw new Error('ID da chapa inválido');
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
    async registrarVotoBranco(eleicaoId) {
        try {
            const votoDTO = {
                eleicaoId: Number(eleicaoId)
            };
            
            console.log('Enviando voto em branco para eleição:', eleicaoId);
            
            const response = await fetch(`${API_URL}/votos/branco`, {
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
            console.error('Erro ao registrar voto em branco:', error);
            throw error;
        }
    },
    async getResultados(eleicaoId) {
        const response = await fetch(`${API_URL}/relatorios/votos/${eleicaoId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar resultados');
        }
        return response.json();
    },
    async deletarEleicao(id) {
        const response = await fetch(`${API_URL}/eleicoes/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
};