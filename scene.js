import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// scene.js

// Função para criar o terreno com grama e muro
function createTerrain() {
    const terrainGroup = new THREE.Group();

    // Dimensões do terreno
    const terrainWidth = 20.1;  // 20 metros de comprimento
    const terrainDepth = 8.1;   // 8 metros de largura
    const wallHeight = 2;     // 2 metros de altura para o muro
    const wallThickness = 0.14; // 14 cm de espessura

    // OTIMIZAÇÃO 1: Carregamento de Texturas (pode ser pré-carregada ou ter resolução menor)
    // Para ambientes de produção, considere texturas comprimidas (DDS, KTX2) ou WebP.
    // Para esta otimização, presumimos que a URL da textura já é a mais otimizada disponível
    // ou que essa textura específica é fundamental para a qualidade visual e não pode ser reduzida.
    const grassTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
    
    // OTIMIZAÇÃO 2: Ajuste da Repetição da Textura (reduz tiling visível sem aumentar a resolução da textura)
    // Reduzimos a repetição para 2x2. Se 4x1 era a intenção, a manutenção dependeria
    // de quão "repetitiva" a textura da grama original parece. Para um plano, 2x2 pode ser um bom equilíbrio.
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(2, 2); 
    // OTIMIZAÇÃO 3: Filtragem de Textura (Mipmapping e Anisotropic Filtering)
    // Mipmapping ajuda a usar versões de menor resolução da textura para objetos distantes.
    // Anisotropic Filtering melhora a qualidade da textura em ângulos oblíquos, mas tem um custo.
    // Desabilitar anisotropic filtering (se já estiver ativado globalmente ou na textura) pode ajudar,
    // ou definir um valor menor. Por padrão, THREE.js já usa mipmaps.
    // grassTexture.minFilter = THREE.LinearMipmapLinearFilter; // Geralmente padrão e bom
    // grassTexture.anisotropy = 1; // Pode ser definido para 1 para menor custo, ou deixar o padrão (geralmente renderer.capabilities.getMaxAnisotropy())
    
    // OTIMIZAÇÃO 4: Material mais simples para o chão
    // MeshBasicMaterial é mais leve que MeshPhongMaterial se você não precisa de reflexos especulares.
    // No caso da grama, um material mais simples pode ser suficiente.
    // Se a iluminação precisar ser mais realista, MeshStandardMaterial ou MeshLambertMaterial (sem especular)
    // podem ser alternativas mais leves que Phong, mas ainda com iluminação.
    const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture }); 
    const groundGeometry = new THREE.PlaneGeometry(terrainWidth, terrainDepth);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotaciona para ficar horizontal
    ground.position.y = 0;
    
    // OTIMIZAÇÃO 5: Geometrias e Materiais Reutilizáveis
    // Você já está fazendo isso com o wallMaterial, o que é ótimo.
    // Considere para outras partes do seu jogo.

    // OTIMIZAÇÃO 6: Compartilhamento de Geometrias para os muros
    // Todos os muros têm a mesma altura e espessura. Podemos criar uma geometria base para muros laterais e outra para muros frontais/traseiros,
    // e reutilizá-las. Isso reduz a memória e o trabalho da GPU.
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Cinza (material de concreto)

    // Geometria para muros frontais e traseiros (reutilizada)
    const horizontalWallGeometry = new THREE.BoxGeometry(terrainWidth, wallHeight, wallThickness);
    
    // Muro frontal (20m de comprimento)
    const frontWall = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
    frontWall.position.set(0, wallHeight / 2, -terrainDepth / 2);
    terrainGroup.add(frontWall);

    // Muro traseiro (20m de comprimento)
    const backWall = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
    backWall.position.set(0, wallHeight / 2, terrainDepth / 2);
    terrainGroup.add(backWall);

    // Geometria para muros laterais (reutilizada)
    const verticalWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, terrainDepth);

    // Muro lateral esquerdo (8m de largura)
    const leftWall = new THREE.Mesh(verticalWallGeometry, wallMaterial);
    leftWall.position.set(-terrainWidth / 2, wallHeight / 2, 0);
    terrainGroup.add(leftWall);

    // OTIMIZAÇÃO 7: Adição do Muro lateral direito que estava faltando
    // Mantendo a consistência do terreno fechado.
    const rightWall = new THREE.Mesh(verticalWallGeometry, wallMaterial);
    rightWall.position.set(terrainWidth / 2, wallHeight / 2, 0);
    terrainGroup.add(rightWall);

    // OTIMIZAÇÃO 8: Order Independente de Adição de Objetos
    // A ordem de adição ao terrainGroup não afeta a performance, mas é bom manter a clareza.
    terrainGroup.add(ground); // Adiciona o chão por último para melhor organização visual do código.

    return terrainGroup;
}

// Exporta a função para uso em outros arquivos (se necessário)
// Otimização: Apenas exportar se estiver em um ambiente Node.js.
// Em um navegador, `module` não é definido, então isso evita erros.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createTerrain };
}

// OTIMIZAÇÃO 9: Adição de Névoa (Fog) - O que você pediu!
// A névoa é adicionada à cena, não ao grupo de terreno. 
// Ela esconde objetos distantes, reduzindo a necessidade de renderizar detalhes.
// Para usar isso, você precisará adicionar algo como:
/*
    const scene = new THREE.Scene();
    const fogColor = 0xcce0ff; // Cor do céu azul claro
    const near = 10; // Distância onde o fog começa
    const far = 50;  // Distância onde o fog é totalmente opaco
    scene.fog = new THREE.Fog(fogColor, near, far);
*/

// OTIMIZAÇÃO 10: Níveis de Detalhe (LOD - Level of Detail) - Conceitual
// Para cenários maiores e mais complexos, o LOD é crucial.
// Você criaria versões simplificadas de objetos para distâncias maiores.
// Ex: new THREE.LOD(); lod.add(highDetailMesh, 0); lod.add(lowDetailMesh, 100);
// Não aplicado diretamente aqui, pois é para objetos mais complexos.

// OTIMIZAÇÃO 11: Gerenciamento de Iluminação
// Luzes complexas (shadows, muitas luzes) são caras.
// Considere usar menos luzes, ou luzes mais simples (AmbientLight, HemisphereLight)
// em vez de muitas PointLights ou SpotLights se não forem essenciais.
// Se sombras forem cruciais, otimize as configurações (map size, frustum).
// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Posição inicial da câmera
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

// Fundo gradiente (otimizado)
function createGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;  // Reduzido para melhor performance
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#1a2a6c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return new THREE.CanvasTexture(canvas);
}
scene.background = createGradientTexture();

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
sunLight.position.set(100, 100, 50);
scene.add(sunLight);

// Chão otimizado
const textureLoader = new THREE.TextureLoader();
const groundGeometry = new THREE.PlaneGeometry(1200, 1200, 1, 1); // Menos polígonos
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a7d3a,
    roughness: 0.9
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Carregamento assíncrono da textura
textureLoader.loadAsync('https://threejs.org/examples/textures/terrain/grasslight-big.jpg')
    .then(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50);
        groundMaterial.map = texture;
        groundMaterial.needsUpdate = true;
    })
    .catch(error => console.log('Erro ao carregar textura:', error));

// Pistas otimizadas
function createRunway(x, z, width, length, rotation) {
    const runwayGeometry = new THREE.PlaneGeometry(width, length);
    const runwayMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
    runway.rotation.x = -Math.PI / 2;
    runway.rotation.z = rotation;
    runway.position.set(x, 0.1, z);
    scene.add(runway);
    return runway;
}

const runway1 = createRunway(0, -46.5, 9.5, 100, 0);
const runway2 = createRunway(-400, 400, 9.5, 100, -Math.PI/2);

// Faixas com geometria compartilhada
const stripeGeometry = new THREE.PlaneGeometry(2, 5);
const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

function createRunwayStripes(runwayX, runwayZ, length, count, isVertical) {
    for (let i = 0; i < count; i++) {
        const position = (i / (count - 1)) * length - length/2;
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.rotation.x = -Math.PI / 2;
        
        if (isVertical) {
            stripe.position.set(runwayX, 0.11, runwayZ + position);
        } else {
            stripe.position.set(runwayX + position, 0.11, runwayZ);
        }
        
        scene.add(stripe);
    }
}

createRunwayStripes(0, -46.5, 100, 10, true);
createRunwayStripes(-400, 400, 100, 10, false);

// Lagos com geometria compartilhada
const lakeGeometry = new THREE.CircleGeometry(1, 24); // Base para instâncias
const lakeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0077be,
    transparent: true,
    opacity: 0.85,
    roughness: 0.1,
    metalness: 0.9,
    side: THREE.DoubleSide
});

const lakePositions = [
    { x: -130, z: -130, size: 60 },
    { x: 165, z: -10, size: 45 },
    { x: -150, z: 450, size: 70 },
    { x: 250, z: -200, size: 40 },
    { x: -300, z: 150, size: 55 },
    { x: 180, z: 300, size: 65 },
    { x: -200, z: -350, size: 50 }
];

lakePositions.forEach(pos => {
    const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
    lake.scale.set(pos.size, pos.size, 1);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(pos.x, 0.05, pos.z);
    scene.add(lake);
});

// Sistema de árvores otimizado
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 6);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const leavesGeometry = new THREE.ConeGeometry(1, 1, 6);
const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });

function createTreeInstance(x, z, height = 8) {
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 1, z);
    
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.scale.set(3, height, 3);
    leaves.position.set(x, height/2 + 1, z);
    
    scene.add(trunk);
    scene.add(leaves);
}

// Criar árvores com detecção de colisão otimizada
for (let i = 0; i < 30; i++) { // Quantidade reduzida
    const x = Math.random() * 800 - 400;
    const z = Math.random() * 800 - 400;
    
    // Verificação otimizada de posição
    const inRunway1 = Math.abs(x) < 50 && Math.abs(z + 46.5) < 60;
    const inRunway2 = Math.abs(x + 400) < 50 && Math.abs(z - 400) < 60;
    
    let nearLake = false;
    for (const lake of lakePositions) {
        const dx = x - lake.x;
        const dz = z - lake.z;
        const distance = Math.sqrt(dx*dx + dz*dz);
        if (distance < lake.size * 1.5) {
            nearLake = true;
            break;
        }
    }
    
    if (!inRunway1 && !inRunway2 && !nearLake) {
        createTreeInstance(x, z, 5 + Math.random() * 5);
    }
}

// Sistema de nuvens otimizado
const cloudMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7
});

function createCloudCluster(x, y, z, size) {
    const cloudGroup = new THREE.Group();
    const baseGeometry = new THREE.SphereGeometry(1, 8, 6);
    
    for (let i = 0; i < 3; i++) {
        const cloudPart = new THREE.Mesh(baseGeometry, cloudMaterial);
        cloudPart.scale.set(
            size * (0.7 + Math.random() * 0.3),
            size * (0.4 + Math.random() * 0.2),
            size * (0.7 + Math.random() * 0.3)
        );
        cloudPart.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 10
        );
        cloudGroup.add(cloudPart);
    }
    
    cloudGroup.position.set(x, y, z);
    scene.add(cloudGroup);
    return cloudGroup;
}

const clouds = [];
for (let i = 0; i < 15; i++) { // Quantidade reduzida
    clouds.push(createCloudCluster(
        Math.random() * 800 - 400,
        80 + Math.random() * 40,
        Math.random() * 800 - 400,
        8 + Math.random() * 5
    ));
}

// Animação otimizada
function animate() {
    requestAnimationFrame(animate);
    
    clouds.forEach((cloud, index) => {
        cloud.position.x += 0.05 * Math.sin(index * 0.1);
        cloud.position.z += 0.03 * Math.cos(index * 0.2);
    });
    
    renderer.render(scene, camera);
}

animate();

// Redimensionamento
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Exportar elementos necessários
export { scene, camera, renderer, clouds };