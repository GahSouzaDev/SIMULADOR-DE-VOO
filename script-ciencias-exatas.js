const perguntaElement = document.getElementById('pergunta');
const resposta1 = document.getElementById('resposta1');
const resposta2 = document.getElementById('resposta2');
const resposta3 = document.getElementById('resposta3');
const resposta4 = document.getElementById('resposta4');

let perguntas = [
    { pergunta: "Qual é o resultado de 5 + 3?", respostas: ["6", "7", "8", "9"], correta: 2 },

    { pergunta: "Qual é a unidade básica de medida de comprimento no sistema métrico?", respostas: ["Metro", "Litro", "Quilograma", "Segundo"], correta: 0 },

    { pergunta: "Quantos lados tem um triângulo?", respostas: ["3", "4", "5", "6"], correta: 0 },

    { pergunta: "Qual é o planeta mais próximo do Sol?", respostas: ["Terra", "Marte", "Vênus", "Mercúrio"], correta: 3 },

    { pergunta: "Qual é a fórmula química da água?", respostas: ["H2O", "CO2", "O2", "NaCl"], correta: 0 },

    { pergunta: "Quantos segundos há em um minuto?", respostas: ["30", "45", "60", "90"], correta: 2 },

    { pergunta: "Qual é a operação matemática inversa da multiplicação?", respostas: ["Adição", "Subtração", "Divisão", "Potenciação"], correta: 2 },

    { pergunta: "Qual é o maior número primo menor que 10?", respostas: ["2", "3", "5", "7"], correta: 3 },

    { pergunta: "Qual é a força que nos mantém no chão?", respostas: ["Magnetismo", "Gravidade", "Fricção", "Inércia"], correta: 1 },

    { pergunta: "Qual é o nome do processo pelo qual as plantas produzem seu próprio alimento?", respostas: ["Respiração", "Fotossíntese", "Digestão", "Fermentação"], correta: 1 },
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

