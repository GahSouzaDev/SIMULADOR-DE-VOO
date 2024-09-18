const perguntaElement = document.getElementById('pergunta');
const resposta1 = document.getElementById('resposta1');
const resposta2 = document.getElementById('resposta2');
const resposta3 = document.getElementById('resposta3');
const resposta4 = document.getElementById('resposta4');

let perguntas = [
    { pergunta: "Qual é a principal fonte de energia para a Terra?", respostas: ["Vento", "Água", "Sol", "Carvão"], correta: 2 },

    { pergunta: "Qual é o maior órgão do corpo humano?", respostas: ["Coração", "Fígado", "Pele", "Pulmão"], correta: 2 },

    { pergunta: "Qual é o processo pelo qual as plantas fazem seu próprio alimento?", respostas: ["Respiração", "Fotossíntese", "Digestão", "Fermentação"], correta: 1 },

    { pergunta: "Qual é o habitat natural dos peixes?", respostas: ["Floresta", "Deserto", "Oceano", "Montanha"], correta: 2 },

    { pergunta: "Qual é o gás essencial para a respiração humana?", respostas: ["Oxigênio", "Hidrogênio", "Nitrogênio", "Dióxido de carbono"], correta: 0 },

    { pergunta: "Qual é o estado físico da água a 100°C?", respostas: ["Sólido", "Líquido", "Gasoso", "Plasma"], correta: 2 },

    { pergunta: "Qual é o nome do ciclo que descreve a movimentação da água na Terra?", respostas: ["Ciclo do Carbono", "Ciclo da Água", "Ciclo do Nitrogênio", "Ciclo do Oxigênio"], correta: 1 },

    { pergunta: "Qual é o nome do processo pelo qual os seres vivos se reproduzem?", respostas: ["Metabolismo", "Reprodução", "Fotossíntese", "Respiração"], correta: 1 },

    { pergunta: "Qual é o nome do planeta conhecido como o Planeta Vermelho?", respostas: ["Terra", "Marte", "Júpiter", "Saturno"], correta: 1 },

    { pergunta: "Qual é o nome do fenômeno natural que causa tremores na Terra?", respostas: ["Tsunami", "Furacão", "Terremoto", "Erupção Vulcânica"], correta: 2 },
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

