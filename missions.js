// missions.js

import { scene } from './scene.js';

// --- FUNÇÃO AUXILIAR PARA CRIAR TEXTO COMO SPRITE (Melhor para performance) ---
// Isso cria uma imagem de texto em um canvas e a usa como textura de um sprite.
function createTextSprite(text, color, isCorrect) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 90;
    context.font = `bold ${fontSize}px Arial`;
    
    // Medir o texto para ajustar o tamanho do canvas
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    canvas.width = textWidth;
    canvas.height = fontSize * 1.2;

    // Estilo do texto
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    // Ajustar o tamanho do sprite na cena
    sprite.scale.set(textWidth / 10, fontSize / 10, 1.0);

    // Adicionar dados personalizados para a lógica da missão
    sprite.userData = {
        isMissionObject: true,
        isCorrect: isCorrect,
        word: text
    };
    
    // Bounding box para colisão
    sprite.geometry.computeBoundingBox();
    sprite.boundingBox = new THREE.Box3().setFromObject(sprite);

    return sprite;
}


// --- DEFINIÇÃO DAS MISSÕES ---

export const missions = [
    {
        id: 0,
        title: "Missão 1: A Letra 'A'",
        description: "Pegue 3 palavras que contenham a letra 'A'. Cuidado com as erradas!",
        plane: 'plane.js', // Cessna, mais lento e fácil de controlar
        targetCount: 3,
        itemGenerator: () => {
            const objects = [];
            const correctWords = ['CASA', 'GARRAFA', 'ARARA', 'BANANA', 'CAMISA', 'AGUA', 'MAÇÃ', 'SANDALIA', 'MALA', 'CANETA'];
const incorrectWords = ['BULE', 'SOL', 'LIXO', 'COPO', 'SINO', 'MEL', 'VERDE', 'LEÃO', 'FOGO', 'DISCO'];
            
            
            // Gerar 3 palavras corretas
            for (let i = 0; i < 5; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 500, // Posição X aleatória
                    Math.random() * 30 + 15,     // Altura entre 15 e 45 metros
                    (Math.random() - 0.5) * 500  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 5 palavras incorretas para distrair
            for (let i = 0; i < 5; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 500,
                    Math.random() * 30 + 15,
                    (Math.random() - 0.5) * 500
                );
                objects.push(obj);
            }
            
            return objects;
        }
    },   
    {
        id: 1,
        title: "Missão 2: A Letra 'E'",
        description: "Pegue 4 palavras que contenham a letra 'E'. Cuidado com as erradas!",
        plane: 'plane-bi-motor.js', // Cessna, mais lento e fácil de controlar
        targetCount: 4,
        itemGenerator: () => {
            const objects = [];
            const correctWords = [
    'MESA', 'CADEIRA', 'CANETA', 'LIXEIRA', 'JANELAS', 'TELHADO', 'ELEFANTE', 'CHAVE', 
    'RELOGIO', 'ESTANTE', 'MEIA', 'VERDE', 'LEÃO', 'CEREJA', 'FLORESTA', 'ESPADA'
];
const incorrectWords = [
    'CASA', 'GARRAFA', 'ARARA', 'BANANA', 'CAMISA', 'AGUA', 'MAÇÃ', 'SANDALIA', 
    'MALA', 'BOLA', 'COPO', 'SINO', 'DISCO', 'LUVA', 'TOM', 'SOL'
];
            
            
            // Gerar 8 palavras corretas
            for (let i = 0; i < 8; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 600, // Posição X aleatória
                    Math.random() * 40 + 15,     // Altura entre 15 e 45 metros
                    (Math.random() - 0.5) * 600  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 10 palavras incorretas para distrair
            for (let i = 0; i < 10; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 600,
                    Math.random() * 40 + 15,
                    (Math.random() - 0.5) * 600
                );
                objects.push(obj);
            }
            
            return objects;
        }
    },   
    {
        id: 2,
        title: "Missão 3: A Letra 'I'",
        description: "Pegue 4 palavras que contenham a letra 'I'. Cuidado com as erradas!",
        plane: 'plane-jato.js', // Cessna, mais lento e fácil de controlar
        targetCount: 4,
        itemGenerator: () => {
            const objects = [];
            const correctWords = [
    'SINO', 'LIVRO', 'CAMISA', 'IGREJA', 'FIO', 'PIANO', 'APITO', 'GIRAFA',
    'LINHA', 'PIPA', 'RISO', 'NINHO', 'VIDRO', 'CINTURA', 'MILHO', 'ILHA'
];
const incorrectWords = [
    'CASA', 'GARRAFA', 'CARRO', 'BANANA', 'BOLA', 'COPO', 'SOL', 'SANDALA', 
    'MOTO', 'LARANJA', 'CACHORRO', 'TOM', 'COMPUTADOR', 'LUVA', 'CHAVE', 'MESA'
];
            
            // Gerar 3 palavras corretas
            for (let i = 0; i < 10; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 750, // Posição X aleatória
                    Math.random() * 50 + 15,     // Altura entre 15 e 65 metros
                    (Math.random() - 0.5) * 750  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 12 palavras incorretas para distrair
            for (let i = 0; i < 12; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 750,
                    Math.random() * 50 + 15,
                    (Math.random() - 0.5) * 750
                );
                objects.push(obj);
            }
            
            return objects;
        }
    },
    {
        id: 3,
        title: "Missão 4: A Letra 'O'",
        description: "Pegue 5 palavras que contenham a letra 'O'. Cuidado com as erradas!",
        plane: 'plane-sr71.js', // Cessna, mais lento e fácil de controlar
        targetCount: 5,
        itemGenerator: () => {
            const objects = [];
            const correctWords = [
    'SINO', 'LIVRO', 'COPO', 'BOLA', 'MOTO', 'CARRO', 'CACHORRO', 'COMPUTADOR',
    'FIO', 'PIANO', 'RISO', 'NINHO', 'VIDRO', 'SORVETE', 'BOLO', 'SAPATO'
];
const incorrectWords = [
    'CASA', 'GARRAFA', 'GARRAFA', 'BANANA', 'SANDALIA', 'MESA', 'CHAVE', 'LUVA',
    'LARANJA', 'PIPA', 'LINHA', 'CINTURA', 'ILHA', 'JARRA', 'CAMISA', 'VELA'
];
            
            // Gerar 3 palavras corretas
            for (let i = 0; i < 15; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 950, // Posição X aleatória
                    Math.random() * 60 + 15,     // Altura entre 15 e 75 metros
                    (Math.random() - 0.5) * 950  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 12 palavras incorretas para distrair
            for (let i = 0; i < 16; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 950,
                    Math.random() * 60 + 15,
                    (Math.random() - 0.5) * 950
                );
                objects.push(obj);
            }
            
            return objects;
        }
    },
    {
        id: 4,
        title: "Missão 5: A Letra 'U'",
        description: "Pegue 5 palavras que contenham a letra 'U'. Cuidado com as erradas!",
        plane: 'plane-boing.js', // Cessna, mais lento e fácil de controlar
        targetCount: 5,
        itemGenerator: () => {
            const objects = [];
              const correctWords = [
            'CHURROS', 'COMPUTADOR', 'BULE', 'LUA', 'NUVEM', 'FUSCA', 'CURSO', 'FUNDO',
            'TUBO', 'SUCO', 'LUPA', 'MUSICA', 'PULSO', 'RUA', 'CUPIM', 'DUCHA', 
            'QUADRO', 'BURACO', 'JUNTO', 'FLAUTA', 'CULTURA', 'SURFE', 'LUCRO', 
            'TUNEL', 'CULTURA'
        ];
        const incorrectWords = [
            'CASA', 'GARRAFA', 'BANANA', 'SANDALIA', 'MESA', 'CHAVE', 'LIXO', 'LARANJA',
            'PIPA', 'LINHA', 'CINTO', 'ILHA', 'JARRA', 'CAMISA', 'VELA', 'SAPATO',
            'BOLA', 'SINO', 'LIVRO', 'COPO', 'RISO', 'NINHO', 'VIDRO', 'SORVETE', 'BOLO'
        ];
            
            // Gerar 3 palavras corretas
            for (let i = 0; i < 20; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 1050, // Posição X aleatória
                    Math.random() * 100 + 15,     // Altura entre 15 e 85 metros
                    (Math.random() - 0.5) * 1050  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 12 palavras incorretas para distrair
            for (let i = 0; i < 20; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 1050,
                    Math.random() * 100 + 15,
                    (Math.random() - 0.5) * 1050
                );
                objects.push(obj);
            }
            
            return objects;
        }
    },
    {
        id: 5,
        title: "Missão 6: FINAL 'ÃO'",
        description: "Pegue 6 palavras que contenham 'ÃO'. Cuidado com as erradas!",
        plane: 'plane-ovni.js', // Cessna, mais lento e fácil de controlar
        targetCount: 6,
        itemGenerator: () => {
            const objects = [];
            const correctWords = [
    'LIMÃO', 'MÃO', 'PÃO', 'CHÃO', 'AVIÃO', 'CAMINHÃO', 'BALÃO', 'LEÃO', 
    'BOTÃO', 'CAPITÃO', 'SABÃO', 'ESTAÇÃO', 'FICÇÃO', 'NERVOSÃO', 'REGIÃO', 
    'AÇÃO', 'PAIXÃO', 'SOLUÇÃO', 'CORAÇÃO', 'NAÇÃO', 'MISSÃO', 'VISÃO', 
    'CONDIÇÃO', 'TRADIÇÃO', 'EDIÇÃO', 'SELEÇÃO', 'FUNÇÃO', 'INVENÇÃO', 
    'EXPLORAÇÃO', 'SENSÃO'
];
const incorrectWords = [
    'CASA', 'GARRAFA', 'BANANA', 'SANDALIA', 'MESA', 'CHAVE', 'LUVA', 'LARANJA', 
    'PIPA', 'LINHA', 'CINTURA', 'ILHA', 'JARRA', 'CAMISA', 'VELA', 'SINO', 
    'LIVRO', 'COPO', 'BOLA', 'MOTO', 'CARRO', 'CACHORRO', 'COMPUTADOR', 'FIO', 
    'PIANO', 'RISO', 'NINHO', 'VIDRO', 'SORVETE', 'BOLO'
];
            
            // Gerar 3 palavras corretas
            for (let i = 0; i < 25; i++) {
                const word = correctWords.splice(Math.floor(Math.random() * correctWords.length), 1)[0];
                const obj = createTextSprite(word, '#ffff00', true); // Verde para corretas
                obj.position.set(
                    (Math.random() - 0.5) * 1200, // Posição X aleatória
                    Math.random() * 300 + 15,     // Altura entre 15 e 75 metros
                    (Math.random() - 0.5) * 1200  // Posição Z aleatória
                );
                objects.push(obj);
            }

            // Gerar 12 palavras incorretas para distrair
            for (let i = 0; i < 30; i++) {
                const word = incorrectWords.splice(Math.floor(Math.random() * incorrectWords.length), 1)[0];
                const obj = createTextSprite(word, '#ff0000', false); // Vermelho para incorretas
                 obj.position.set(
                    (Math.random() - 0.5) * 1200,
                    Math.random() * 300 + 15,
                    (Math.random() - 0.5) * 1200
                );
                objects.push(obj);
            }
            
            return objects;
        }
    }
];