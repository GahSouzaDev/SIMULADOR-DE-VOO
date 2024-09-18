let jogador1, jogador2, jogadorAtual;
const formas = ['X', 'O'];
let tabuleiro = Array(9).fill(null);

function Jogador(nome, forma) {
    this.nome = nome;
    this.forma = forma;
}

function initGame() {
    const nomeJogador1 = document.getElementById('jogador1').value;
    const nomeJogador2 = document.getElementById('jogador2').value;

    if (!nomeJogador1 || !nomeJogador2) {
        alert("Insira os nomes dos dois jogadores.");
        return;
    }

    jogador1 = new Jogador(nomeJogador1, 0);
    jogador2 = new Jogador(nomeJogador2, 1);
    jogadorAtual = jogador1;

    setLabelJogadorAtual();
    document.getElementById('game').style.display = 'block';
}

function setLabelJogadorAtual() {
    document.getElementById('jogadorAtual').textContent = 'Jogador atual: ' + jogadorAtual.nome;
}

function checkWinner() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]  // Diagonais
    ];

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }
    return false;
}

function setOnCeil(cel, pos) {
    if (!tabuleiro[pos]) {
        tabuleiro[pos] = formas[jogadorAtual.forma];
        cel.textContent = formas[jogadorAtual.forma];
        cel.style.backgroundColor = '#F8F8F8';

        if (checkWinner()) {
            alert(jogadorAtual.nome + " venceu!");
            reset();
        } else if (tabuleiro.every(cell => cell)) {
            alert("Empate!");
            reset();
        } else {
            jogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1;
            setLabelJogadorAtual();
        }
    } else {
        alert("Essa célula já está ocupada!");
    }
}

function reset() {
    window.location.reload();
}

