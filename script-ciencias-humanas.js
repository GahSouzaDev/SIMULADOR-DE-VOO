const perguntaElement = document.getElementById('pergunta');
const resposta1 = document.getElementById('resposta1');
const resposta2 = document.getElementById('resposta2');
const resposta3 = document.getElementById('resposta3');
const resposta4 = document.getElementById('resposta4');

let perguntas = [
    { pergunta: "Qual destes monumentos é um símbolo da França?", respostas: ["Coliseu", "Estátua da Liberdade", "Torre Eiffel", "Muralha da China"], correta: 2 },

    { pergunta: "Qual a capital do Brasil?", respostas: ["São Paulo", "Rio de Janeiro", "Brasília", "Parana"], correta: 2 },

    { pergunta: "Quem foi a primeira mulher a ser presidente do Brasil?", respostas: ["Dilma Rousseff", "Maria da Penha", "Anita Garibaldia", "Princesa Isabel"], correta: 0 },

    { pergunta: "Qual é o nome do povo indígena que habitava o Brasil antes da chegada dos europeus?", respostas: ["Incas", "Maias", "Astecas", "Tupi-Guarani"], correta: 3 },

    { pergunta: "Qual feriado brasileiro celebra a independência do país?", respostas: ["7 de setembro", "15 de novembro", "21 de abril", "1º de maio"], correta: 0 },

    { pergunta: "Qual é o maior país do mundo em extensão territorial?", respostas: ["Estados Unidos", "Rússia", "China", " Canadá"], correta: 1 },

    { pergunta: "Qual é o nome do principal documento histórico que registra a história de um país?", respostas: ["Mapa", "Atlas", "Crônica", "Atlas Histórico"], correta: 2 },

    { pergunta: "Qual é a principal festa popular do Brasil?", respostas: ["Halloween", "Carnaval", "Natal", "Páscoa"], correta: 1 },

    { pergunta: "Qual continente é conhecido como o berço da civilização?", respostas: ["Europa", "Ásia", "África", "América"], correta: 2 },

    { pergunta: "Qual é o nome do instrumento musical típico do Brasil?", respostas: ["Violino", "Flauta", "Bateria", "Berimbau"], correta: 3 },
];

let perguntaAtual = 0;

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    perguntaElement.textContent = pergunta.pergunta;
    resposta1.textContent = pergunta.respostas[0];
    resposta2.textContent = pergunta.respostas[1];
    resposta3.textContent = pergunta.respostas[2];
    resposta4.textContent = pergunta.respostas[3];
}

function verificarResposta(resposta) {
    if (resposta === perguntas[perguntaAtual].correta) {
        document.getElementById('somCerto').play();

        // Adiciona um delay de 1 segundo antes de mostrar a próxima pergunta
        setTimeout(() => {
            perguntaAtual++;
            if (perguntaAtual < perguntas.length) {
                mostrarPergunta();
            } else {
                window.location.href='final-jogo3.html'
            }
        }, 1000); // 1000 milissegundos = 1 segundo
    } else {
        document.getElementById('somErrado').play();
        setTimeout(() => {
        window.location.href='game-over-jogo3.html'
    }, 1000);
    }
}

// Mostrar a primeira pergunta ao carregar a página
mostrarPergunta();

// Adicionar eventos de clique aos botões
resposta1.addEventListener('click', () => verificarResposta(0));
resposta2.addEventListener('click', () => verificarResposta(1));
resposta3.addEventListener('click', () => verificarResposta(2));
resposta4.addEventListener('click', () => verificarResposta(3));

