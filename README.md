# Projeto Urna Eletrônica - Grêmio Estudantil

## Por que este projeto existe?

Acreditamos que a participação ativa na vida escolar é o primeiro passo para a formação de cidadãos conscientes e engajados. O grêmio estudantil é a voz dos alunos, e o processo de escolha de seus representantes deve ser um exercício de democracia, transparência e aprendizado.

Este projeto nasceu com o objetivo de ir além de um simples sistema de votação. Queremos **inspirar e capacitar** os estudantes a vivenciarem o processo democrático na prática, de forma moderna, acessível e segura. Através desta ferramenta, buscamos:

* **Incentivar a Participação:** Facilitar o processo de votação para que cada aluno se sinta parte da decisão.
* **Promover a Cidadania:** Oferecer uma plataforma onde os alunos possam não apenas votar, mas também formar chapas, apresentar propostas e se candidatar para representar seus colegas.
* **Garantir a Transparência:** Disponibilizar relatórios e resultados claros, fortalecendo a confiança no processo eleitoral.
* **Educar para a Democracia:** Transformar a eleição do grêmio em uma experiência educativa, mostrando a importância do voto e da representatividade.

## Funcionalidades

Este sistema foi pensado para cobrir todas as etapas de uma eleição estudantil, desde a organização até a apuração dos votos.

### Para a Comissão Eleitoral e Administradores:

* **Gestão de Chapas:**
    * Cadastre as chapas concorrentes com nome, integrantes e até mesmo uma foto para identificação.
* **Gerenciamento de Eleições:**
    * Crie e configure as eleições, definindo o nome, a data de início e a data de término.
    * Controle o status da eleição, alternando entre "Agendada", "Em Andamento" e "Finalizada".
* **Relatórios Completos:**
    * Acesse os resultados detalhados de cada eleição.
    * Visualize os dados em gráficos de barras e tabelas, incluindo a contagem de votos por chapa e votos em branco, com seus respectivos percentuais.

### Para os Alunos (Eleitores):

* **Votação Intuitiva:**
    * Uma interface limpa e direta para selecionar a chapa de sua preferência.
    * Opção de "Votar em Branco", garantindo o direito de escolha do eleitor.
* **Confirmação de Voto:**
    * Antes de finalizar, o sistema exibe a chapa selecionada para confirmação, permitindo corrigir o voto se necessário.
* **Segurança e Privacidade:**
    * O voto é registrado de forma segura, garantindo o sigilo e a integridade da sua escolha.

## Como Usar

O sistema é dividido em duas partes principais: o **Backend** (o cérebro da aplicação) e o **Frontend** (a interface que você vê).

### Backend

Desenvolvido com **Java** e **Spring Boot**, ele é responsável por todas as regras de negócio e pela comunicação com o banco de dados **MySQL**.

**Controllers:**
* `ChapaController`: Gerencia o cadastro, listagem e exclusão de chapas.
* `EleicaoController`: Controla a criação e o status das eleições.
* `VotoController`: Responsável por receber e registrar os votos.
* `RelatorioController`: Gera os dados para os relatórios de resultados.

### Frontend

Uma aplicação web simples e responsiva, construída com **HTML, CSS e JavaScript**, que consome os dados do backend para fornecer uma experiência de uso fluida.

**Páginas:**
* **Início:** Uma visão geral e acesso rápido a todas as seções.
* **Chapas:** Para cadastrar e visualizar as chapas.
* **Eleições:** Para gerenciar o calendário eleitoral.
* **Votação:** A tela onde a mágica da democracia acontece!
* **Relatórios:** Para acompanhar a apuração dos votos em tempo real.

---
