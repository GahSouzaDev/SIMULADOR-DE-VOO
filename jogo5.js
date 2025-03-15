// Configuração da cena
const scene = new THREE.Scene();
scene.background = createGradientTexture();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar luz
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

function createGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB"); // Azul claro
    gradient.addColorStop(1, "#000000"); // Azul bem escuro

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Carregar a textura do chão
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(20, 20);

// Criar o chão com material texturizado
const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Criar a pista
const runwayGeometry = new THREE.PlaneGeometry(9.5, 100);
const runwayMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
runway.rotation.x = -Math.PI / 2;
runway.position.set(0, 0.01, -46.5);
scene.add(runway);

// Adicionar faixas brancas na pista
function createRunwayStripe(x, z, width, length) {
    const stripeGeometry = new THREE.PlaneGeometry(width, length);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(x, 0.02, z);
    scene.add(stripe);
    return stripe;
}

// Criar a geometria do lago com formato orgânico
const lakeShape = new THREE.Shape();

// Definir pontos para um formato irregular (como uma poça de água)
lakeShape.moveTo(0, 0);
lakeShape.bezierCurveTo(60, -30, 120, 30, 45, 45);
lakeShape.bezierCurveTo(60, 140, -15, 60, -30, 45);
lakeShape.bezierCurveTo(-120, 30, -90, -60, 0, 0);

// Criar a geometria do lago usando `ShapeGeometry`
const lakeGeometry = new THREE.ShapeGeometry(lakeShape);

// Carregar a textura da água
const waterTexture = textureLoader.load('https://threejs.org/examples/textures/waternormals.jpg');
waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
waterTexture.repeat.set(1, 1); // Ajuste fino da textura

// Criar o material do lago
const lakeMaterial = new THREE.MeshStandardMaterial({
    map: waterTexture,
    transparent: true,
    opacity: 0.85,
    roughness: 0.3,
    metalness: 0.6,
    side: THREE.DoubleSide // Renderiza ambos os lados do lago
});

// Criar o Mesh do lago
const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
lake.rotation.x = -Math.PI / 2; // Deixar o lago na horizontal
lake.position.set(-130, 0.02, -130); // Ajuste de posição

// Adicionar o lago à cena
scene.add(lake);

// Definir pontos para o formato irregular do Lago 2
const lakeShape2 = new THREE.Shape();
lakeShape2.moveTo(0, 0);
lakeShape2.bezierCurveTo(80, -40, 100, 50, 60, 60); // Primeira curva
lakeShape2.bezierCurveTo(70, 120, -20, 80, -50, 50); // Segunda curva
lakeShape2.bezierCurveTo(-100, 20, -80, -50, 0, 0); // Fechamento

// Criar a geometria do Lago 2
const lakeGeometry2 = new THREE.ShapeGeometry(lakeShape2);

// Carregar a textura da água
const waterTexture2 = textureLoader.load('https://threejs.org/examples/textures/waternormals.jpg');
waterTexture2.wrapS = waterTexture2.wrapT = THREE.RepeatWrapping;
waterTexture2.repeat.set(1.2, 1.2); // Repetição ajustada

// Criar o material do Lago 2
const lakeMaterial2 = new THREE.MeshStandardMaterial({
    map: waterTexture2,
    transparent: true,
    opacity: 0.9,
    roughness: 0.25,
    metalness: 0.7,
    side: THREE.DoubleSide
});

// Criar o Mesh do Lago 2
const lake2 = new THREE.Mesh(lakeGeometry2, lakeMaterial2);
lake2.rotation.x = -Math.PI / 2; // Deixar o lago na horizontal
lake2.position.set(165, 0.01, -10); // Nova posição centralizada sob a ponte

// Adicionar o Lago 2 à cena
scene.add(lake2);

// Adicionar faixas brancas na pista
const stripe1 = createRunwayStripe(0, -42, 2, 5);
const stripe2 = createRunwayStripe(0, -32, 2, 5);
const stripe3 = createRunwayStripe(0, -22, 2, 5);
const stripe4 = createRunwayStripe(0, -12, 2, 5);
const stripe5 = createRunwayStripe(0, -2, 2, 5);
const stripe16 = createRunwayStripe(0, -62, 2, 5);
const stripe15 = createRunwayStripe(0, -52, 2, 5);
const stripe17 = createRunwayStripe(0, -72, 2, 5);
const stripe18 = createRunwayStripe(0, -82, 2, 5);
const stripe19 = createRunwayStripe(0, -92, 2, 5);
const stripe6 = createRunwayStripe(-4, 2, 0.5, 2);
const stripe7 = createRunwayStripe(-3, 2, 0.5, 2);
const stripe8 = createRunwayStripe(-2, 2, 0.5, 2);
const stripe9 = createRunwayStripe(-1, 2, 0.5, 2);
const stripe10 = createRunwayStripe(0, 2, 0.5, 2);
const stripe11 = createRunwayStripe(1, 2, 0.5, 2);
const stripe12 = createRunwayStripe(2, 2, 0.5, 2);
const stripe13 = createRunwayStripe(3, 2, 0.5, 2);
const stripe14 = createRunwayStripe(4, 2, 0.5, 2);


const plane = new THREE.Group();
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const planeTailMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Cinza escuro para as rodas do trem de pouso
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa }); // Cinza claro para a cabine

// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.2, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

// Asas
const wingsGeometry = new THREE.BoxGeometry(4, 0.1, 1);
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.position.y = 0.92;
wings.position.z = -0.5;
plane.add(wings);

// Cauda vertical
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.position.y = 0.9;
tailVertical.position.z = 1.2;
plane.add(tailVertical);

// Criando um plano para exibir o nome do avião
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4); // Tamanho do nome
const textTexture = new THREE.TextureLoader().load('images.png'); // Imagem com o nome
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

// Criando o mesh para o texto
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0); // Ajustando a posição na cauda
textMesh.rotation.y = Math.PI / 2; // Opcional: ajusta a rotação se necessário

// Adicionando o texto na cauda vertical
tailVertical.add(textMesh);

// Cauda horizontal
const tailHorizontalGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.position.z = 1.2;
tailHorizontal.position.y = 0.5;
plane.add(tailHorizontal);

// Hélice
const propellerGeometry = new THREE.BoxGeometry(0.1, 1.2, 0.1);
const propellerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller.position.z = -1.8;
propeller.position.y = 0.5;
plane.add(propeller);

// Trem de pouso
// Suporte da roda frontal (nariz)
const frontGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const frontGearSupport = new THREE.Mesh(frontGearSupportGeometry, cabinMaterial);
frontGearSupport.position.z = -1.6;
frontGearSupport.position.y = 0.2;
plane.add(frontGearSupport);

const frontWheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
const frontWheel = new THREE.Mesh(frontWheelGeometry, gearMaterial);
frontWheel.rotation.x = Math.PI / 2;
frontWheel.rotation.z = Math.PI / 2;
frontWheel.position.z = -1.6;
frontWheel.position.y = -0.1;
plane.add(frontWheel);

// Suporte das rodas principais
const mainGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);

// Suporte das rodas principais
const mainGearSupportGeometry12 = new THREE.BoxGeometry(0.05, 1.2, 0.05);

// Suporte esquerdo
const leftGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
leftGearSupport.position.x = -0.2;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = -0.5;
leftGearSupport.rotation.z = Math.PI / -12; // Inclinação de 15 graus para fora (ajuste conforme necessário)
plane.add(leftGearSupport);

// Suporte direito
const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 0.2;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = -0.5;
rightGearSupport.rotation.z = -Math.PI / -12; // Inclinação de -15 graus para fora (ajuste conforme necessário)
plane.add(rightGearSupport);

// Suporte assa esquerdo
const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 0.5;
leftGearSupport1.position.y = 0.65;
leftGearSupport1.position.z = -0.7;
leftGearSupport1.rotation.z = Math.PI / -3; // Inclinação de 15 graus para fora (ajuste conforme necessário)
plane.add(leftGearSupport1);

// Suporte assa direito
const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -0.5;
rightGearSupport1.position.y = 0.65;
rightGearSupport1.position.z = -0.7;
rightGearSupport1.rotation.z = -Math.PI / -3; // Inclinação de -15 graus para fora (ajuste conforme necessário)
plane.add(rightGearSupport1);

// Rodas principais
const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

// Roda esquerda
const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -0.25;
leftWheel.position.y = -0.1;
leftWheel.position.z = -0.5;
plane.add(leftWheel);

// Roda direita
const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 0.25;
rightWheel.position.y = -0.1;
rightWheel.position.z = -0.5;
plane.add(rightWheel);

// Cabine em forma de cilindro
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16); // Raio superior, raio inferior, altura
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2; // Rotacionada para alinhar ao corpo
cabin.position.y = 0.70; // Acima do corpo (0.5 + ajuste para raio)
cabin.position.z = -0.5; // Centralizado na parte frontal do corpo
plane.add(cabin);

// Posicionar o avião na pista
plane.position.set(0, 0, 2);
scene.add(plane);

// Criar a sombra
const shadowGeometry = new THREE.CircleGeometry(1.7, 32);
const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.5
});
const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.01;
scene.add(shadow);

// Função para criar prédios
function createBuilding(width, height, depth, x, z, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    scene.add(building);
    building.geometry.computeBoundingBox();
    building.boundingBox = new THREE.Box3().setFromObject(building);
    return building;
}

// Prédios aeroporto
const building1 = createBuilding(6, 10, 6, 25, -15, 0x888888);
const building2 = createBuilding(3, 18, 3, 25, -1, 0x4682B4);

// Criar um grupo de texturas único para os Prédios do Aeroporto
const textureLoader4 = new THREE.TextureLoader();
const buildingTexture4 = textureLoader.load('torre-de-controle.png'); // Substitua pelo caminho da sua imagem

const buildingsAeroporto = [building2];

buildingsAeroporto.forEach(building => {
    const width = building.geometry.parameters.width;  // Largura do prédio (5 ou 8)
    const height = building.geometry.parameters.height; // Altura do prédio (10 ou 15)
    const depth = building.geometry.parameters.depth;  // Profundidade do prédio (5 ou 8)

    // Material compartilhado para todos os planos
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: buildingTexture4, 
        transparent: true, // Opcional, caso a imagem tenha transparência
        side: THREE.DoubleSide // Para ser visível de ambos os lados
    });

    // 1. Plano na frente (face frontal)
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02); // Frente do prédio
    frontMesh.rotation.y = 0;
    building.add(frontMesh);

    // 2. Plano à direita (face lateral direita)
    const rightGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0); // Lado direito do prédio
    rightMesh.rotation.y = -Math.PI / 2; // Rotaciona 90° para alinhar à direita
    building.add(rightMesh);

    // 3. Plano à esquerda (face lateral esquerda)
    const leftGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0); // Lado esquerdo do prédio
    leftMesh.rotation.y = Math.PI / 2; // Rotaciona -90° para alinhar à esquerda
    building.add(leftMesh);
});

// Conjunto 1
const building3 = createBuilding(8, 10, 8, -80, -30, 0xffffff);
const building4 = createBuilding(8, 10, 8, -60, -30, 0xffffff);
const building5 = createBuilding(8, 10, 8, -80, -15, 0xffffff);
const building6 = createBuilding(8, 10, 8, -60, -15, 0xffffff);
const building7 = createBuilding(8, 10, 8, -100, -30, 0xffffff);
const building8 = createBuilding(8, 10, 8, -100, -15, 0xffffff);
const building44 = createBuilding(50, 0.02, 25, -80, -22.5, 0x808080);

// Criar um grupo de texturas único para o Conjunto 1
const textureLoader1 = new THREE.TextureLoader();
const buildingTexture1 = textureLoader.load('conjunto-predios-1.png'); // Substitua pelo caminho da sua imagem

const buildingsConjunto1 = [ building3, building4, building5, building6, building7, building8];

buildingsConjunto1.forEach(building => {
    const width = building.geometry.parameters.width;  // Largura do prédio (5 ou 8)
    const height = building.geometry.parameters.height; // Altura do prédio (10 ou 15)
    const depth = building.geometry.parameters.depth;  // Profundidade do prédio (5 ou 8)

    // Material compartilhado para todos os planos
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: buildingTexture1, 
        transparent: true, // Opcional, caso a imagem tenha transparência
        side: THREE.DoubleSide // Para ser visível de ambos os lados
    });

    // 1. Plano na frente (face frontal)
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02); // Frente do prédio
    frontMesh.rotation.y = 0;
    building.add(frontMesh);

    // 2. Plano à direita (face lateral direita)
    const rightGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0); // Lado direito do prédio
    rightMesh.rotation.y = -Math.PI / 2; // Rotaciona 90° para alinhar à direita
    building.add(rightMesh);

    // 3. Plano à esquerda (face lateral esquerda)
    const leftGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0); // Lado esquerdo do prédio
    leftMesh.rotation.y = Math.PI / 2; // Rotaciona -90° para alinhar à esquerda
    building.add(leftMesh);
});

// Conjunto 2
const building9 = createBuilding(6, 17, 6, 80, 115, 0x808080);
const building10 = createBuilding(6, 17, 6, 60, 115, 0x808080);
const building11 = createBuilding(6, 17, 6, 80, 100, 0x808080);
const building12 = createBuilding(6, 17, 6, 60, 100, 0x808080);
const building13 = createBuilding(6, 17, 6, 100, 115, 0x808080);
const building14 = createBuilding(6, 17, 6, 100, 100, 0x808080);
const building43 = createBuilding(50, 0.02, 25, 80, 108, 0x808080);

// Criar um grupo de texturas único para o Conjunto 2
const textureLoader2 = new THREE.TextureLoader();
const buildingTexture2 = textureLoader.load('conjunto-predios-2.png'); // Substitua pelo caminho da sua imagem

const buildingsConjunto2 = [building1, building9, building10, building11, building12, building13, building14,];

buildingsConjunto2.forEach(building => {
    const width = building.geometry.parameters.width;  // Largura do prédio (6)
    const height = building.geometry.parameters.height; // Altura do prédio (17)
    const depth = building.geometry.parameters.depth;  // Profundidade do prédio (6)

    // Material compartilhado para todos os planos
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: buildingTexture2, 
        transparent: true, // Opcional, caso a imagem tenha transparência
        side: THREE.DoubleSide // Para ser visível de ambos os lados
    });

    // 1. Plano na frente (face frontal)
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02); // Frente do prédio
    frontMesh.rotation.y = 0;
    building.add(frontMesh);

    // 2. Plano à direita (face lateral direita)
    const rightGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0); // Lado direito do prédio
    rightMesh.rotation.y = -Math.PI / 2; // Rotaciona 90° para alinhar à direita
    building.add(rightMesh);

    // 3. Plano à esquerda (face lateral esquerda)
    const leftGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0); // Lado esquerdo do prédio
    leftMesh.rotation.y = Math.PI / 2; // Rotaciona -90° para alinhar à esquerda
    building.add(leftMesh);
});

// Conjunto 3
const building15 = createBuilding(8, 10, 8, 80, -115, 0xffffff);
const building16 = createBuilding(8, 9, 8, 60, -115, 0xffffff);
const building17 = createBuilding(8, 8, 8, 80, -100, 0xffffff);
const building18 = createBuilding(8, 7, 8, 60, -100, 0xffffff);
const building19 = createBuilding(8, 6, 8, 100, -115, 0xffffff);
const building20 = createBuilding(8, 10, 8, 100, -100, 0xffffff);
const building42 = createBuilding(50, 0.02, 30, 80, -108, 0x808080);

// Criar um grupo de texturas único para o Conjunto 3
const textureLoader3 = new THREE.TextureLoader(); // Renomeei para evitar confusão, mas pode usar o existente
const buildingTexture3 = textureLoader.load('conjunto-predios-3.png'); // Substitua pelo caminho da sua imagem

const buildingsConjunto3 = [building15, building16, building17, building18, building19, building20];

buildingsConjunto3.forEach(building => {
    const width = building.geometry.parameters.width;  // Largura do prédio (8)
    const height = building.geometry.parameters.height; // Altura do prédio (varia entre 6 e 15)
    const depth = building.geometry.parameters.depth;  // Profundidade do prédio (8)

    // Material compartilhado para todos os planos
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: buildingTexture3, 
        transparent: true, // Opcional, caso a imagem tenha transparência
        side: THREE.DoubleSide // Para ser visível de ambos os lados
    });

    // 1. Plano na frente (face frontal)
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02); // Frente do prédio
    frontMesh.rotation.y = 0;
    building.add(frontMesh);

    // 2. Plano à direita (face lateral direita)
    const rightGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0); // Lado direito do prédio
    rightMesh.rotation.y = -Math.PI / 2; // Rotaciona 90° para alinhar à direita
    building.add(rightMesh);

    // 3. Plano à esquerda (face lateral esquerda)
    const leftGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0); // Lado esquerdo do prédio
    leftMesh.rotation.y = Math.PI / 2; // Rotaciona -90° para alinhar à esquerda
    building.add(leftMesh);
});

// Torre alta
const building21 = createBuilding(9, 8, 9, -100, 100, 0x888888);
const building22 = createBuilding(8, 10, 8, -100, 100, 0xffffff);
const building23 = createBuilding(7, 15, 7, -100, 100, 0x888888);
const building24 = createBuilding(6, 17, 6, -100, 100, 0xffffff);
const building25 = createBuilding(5, 20, 5, -100, 100, 0x888888);
const building26 = createBuilding(4, 23, 4, -100, 100, 0xffffff);
const building27 = createBuilding(3, 25, 3, -100, 100, 0x888888);
const building28 = createBuilding(2.3, 28, 2.3, -100, 100, 0xffffff);
const building52 = createBuilding(1.4, 30, 1.4, -100, 100, 0x888888);
const building29 = createBuilding(1, 35, 1, -100, 100, 0xffffff);

// Criar um grupo de texturas para a Torre alta (apenas prédios cinza)
const textureLoader5 = new THREE.TextureLoader();
const buildingTexture5 = textureLoader.load('conjunto-predios-3.png'); // Substitua pelo caminho da sua imagem

const buildingsTorreAlta = [building21, building22, building23, building24, building25, building26, building27, building28, building29, building52];

// Filtrar apenas os prédios cinza (0x888888)
const buildingsCinza = buildingsTorreAlta.filter(building => building.material.color.getHex() === 0x888888);

buildingsCinza.forEach(building => {
    const width = building.geometry.parameters.width;  // Largura do prédio (9, 7, 5, 3)
    const height = building.geometry.parameters.height; // Altura do prédio (8, 15, 20, 25)
    const depth = building.geometry.parameters.depth;  // Profundidade do prédio (9, 7, 5, 3)

    // Material compartilhado para todos os planos
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: buildingTexture5, 
        transparent: true, // Opcional, caso a imagem tenha transparência
        side: THREE.DoubleSide // Para ser visível de ambos os lados
    });

    // 1. Plano na frente (face frontal)
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02); // Frente do prédio
    frontMesh.rotation.y = 0;
    building.add(frontMesh);

    // 2. Plano à direita (face lateral direita)
    const rightGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0); // Lado direito do prédio
    rightMesh.rotation.y = -Math.PI / 2; // Rotaciona 90° para alinhar à direita
    building.add(rightMesh);

    // 3. Plano à esquerda (face lateral esquerda)
    const leftGeometry = new THREE.PlaneGeometry(depth, height); // Usa profundidade como largura do plano
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0); // Lado esquerdo do prédio
    leftMesh.rotation.y = Math.PI / 2; // Rotaciona -90° para alinhar à esquerda
    building.add(leftMesh);
});

//Ponte
const building30 = createBuilding(1, 15, 1, 170, -20, 0xFF4500);
const building31 = createBuilding(1, 20, 1, 170, -40, 0xFF4500);
const building32 = createBuilding(1, 20, 1, 170, -60, 0xFF4500);
const building33 = createBuilding(1, 15, 1, 170, -80, 0xFF4500);
const building34 = createBuilding(1, 12, 1, 170, 0, 0xFF4500);
const building35 = createBuilding(1, 12, 1, 170, -100, 0xFF4500);
const building36 = createBuilding(1, 15, 1, 180, -20, 0xFF4500);
const building37 = createBuilding(1, 20, 1, 180, -40, 0xFF4500);
const building38 = createBuilding(1, 20, 1, 180, -60, 0xFF4500);
const building39 = createBuilding(1, 15, 1, 180, -80, 0xFF4500);
const building40 = createBuilding(1, 12, 1, 180, 0, 0xFF4500);
const building41 = createBuilding(1, 12, 1, 180, -100, 0xFF4500);
const building48 = createBuilding(1, 5, 1, 180, -120, 0xFF4500);
const building49 = createBuilding(1, 5, 1, 180, 20, 0xFF4500);
const building50 = createBuilding(1, 5, 1, 170, -120, 0xFF4500);
const building51 = createBuilding(1, 5, 1, 170, 20, 0xFF4500);

//pista
const building45 = createBuilding(10, 1, 100, 175, -50,  0x4D4D4D);
building45.position.y = 8;
const building46 = createBuilding(10, 1, 30, 175, -113,  0x4D4D4D);
building46.rotation.x = 6;
building46.position.y = 4;
const building47 = createBuilding(10, 1, 30, 175, 13, 0x4D4D4D);
building47.rotation.x = -6;
building47.position.y = 4;

//estrutura horizontal
const building53 = createBuilding(1, 1, 150, 170, -50, 0xFF4500);
const building54 = createBuilding(1, 1, 150, 180, -50, 0xFF4500);
const building55 = createBuilding(1, 1, 20, 170, -50, 0xFF4500);
building55.position.y = 20;
const building56 = createBuilding(1, 1, 20, 180, -50, 0xFF4500);
building56.position.y = 20;
const building57 = createBuilding(1, 1, 20, 170, -30, 0xFF4500);
building57.position.y = 17;
building57.rotation.x = -6;
const building58 = createBuilding(1, 1, 20, 180, -30, 0xFF4500);
building58.position.y = 17;
building58.rotation.x = -6;
const building59 = createBuilding(1, 1, 20, 170, -70, 0xFF4500);
building59.position.y = 17;
building59.rotation.x = 6;
const building60 = createBuilding(1, 1, 20, 180, -70, 0xFF4500);
building60.position.y = 17;
building60.rotation.x = 6;
const building61 = createBuilding(1, 1, 20, 170, -90, 0xFF4500);
building61.position.y = 13;
building61.rotation.x = 6.15;
const building62 = createBuilding(1, 1, 20, 180, -90, 0xFF4500);
building62.position.y = 13;
building62.rotation.x = 6.15;
const building63 = createBuilding(1, 1, 20, 170, -10, 0xFF4500);
building63.position.y = 13;
building63.rotation.x = -6.15;
const building64 = createBuilding(1, 1, 20, 180, -10, 0xFF4500);
building64.position.y = 13;
building64.rotation.x = -6.15;
const building65 = createBuilding(1, 1, 21, 170, -110, 0xFF4500);
building65.position.y = 8;
building65.rotation.x = 5.92;
const building66 = createBuilding(1, 1, 21, 180, -110, 0xFF4500);
building66.position.y = 8;
building66.rotation.x = 5.92;
const building67 = createBuilding(1, 1, 21, 170, 10, 0xFF4500);
building67.position.y = 8;
building67.rotation.x = -5.92;
const building68 = createBuilding(1, 1, 21, 180, 10, 0xFF4500);
building68.position.y = 8;
building68.rotation.x = -5.92;


// Função para criar nuvens
function createCloud(x, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32); // Esfera para nuvens fofas
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1 // Transparência leve
    });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set(x, 27, z); // Altura fixa em 27
    scene.add(cloud);
    return cloud;
}

// Criar várias nuvens em posições aleatórias
const clouds = [];
const cloudCount = 75;
for (let i = 0; i < cloudCount; i++) {
    const x = Math.random() * 200 - 100; // Intervalo de -100 a 100 no eixo X
    const z = Math.random() * 200 - 100; // Intervalo de -100 a 100 no eixo Z
    clouds.push(createCloud(x, z));
}

// Função para verificar colisão
function checkCollision(box1, box2) {
    return box1.intersectsBox(box2);
}

// Criar bounding box para o avião
plane.geometry = new THREE.BoxGeometry(4, 0.8, 3.2);
plane.geometry.computeBoundingBox();
const planeBox = new THREE.Box3().setFromObject(plane);

// Lista de prédios para verificar colisão (nuvens não entram aqui)
const buildings = [building1, building2, building3, building4, building5, building6, building7, building8, building9, building10, building11, building12, building13, building14, building15, building16, building17, building18, building19, building20, building21, building22, building23, building24, building25, building26, building27, building28, building29, building30, building31, building32, building33, building34, building35, building36, building37, building38, building39, building40, building41,building45, building46, building47,building55, building56,building57, building58,building59, building60,building61, building62,building63, building64,building65, building66,building67, building68];

// Posicionar a câmera
camera.position.set(0, 5, 10);
camera.lookAt(plane.position);

// Variáveis de controle
let speed = 0;
let velocity = 0;
const maxSpeed = 0.8;
const acceleration = 0.001;
const friction = 0.001;
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.25;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.015; // Velocidade base de rotação

// Variáveis de controle adicionais
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 6;
const maxAltitude = 50;
const liftFactor = 0.7;
const pitchSpeed = 0.05;
const baseVerticalSpeedUp = 0.045; // Velocidade base de subida
const speedFactor = 1.5; // Fator de amplificação baseado na velocidade

// Controles do teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': keys.w = true; break;
        case 's': keys.s = true; break;
        case 'a': keys.a = true; break;
        case 'd': keys.d = true; break;
        case ' ': isAccelerating = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': keys.w = false; break;
        case 's': keys.s = false; break;
        case 'a': keys.a = false; break;
        case 'd': keys.d = false; break;
        case ' ': isAccelerating = false; break;
    }
});

// Função para reiniciar o jogo
function resetGame() {
    plane.position.set(0, 0, 2);
    plane.rotation.set(0, 0, 0); // Resetar rotações
    speed = 0;
    velocity = 0;
    isCrashed = false;
    crashTimer = 0;
    pitchAngle = 0;
    keys = { w: false, s: false, a: false, d: false };
    isAccelerating = false;
    renderer.domElement.style.filter = 'none'; // Remover o desfoque
    renderer.render(scene, position);
}

// Função de animação 
function animate() {
    requestAnimationFrame(animate);

    propeller.rotation.z += 0.2 + speed;
    renderer.render(scene, camera);

    // Aceleração e desaceleração
    if (isAccelerating && speed < maxSpeed && !isCrashed) {
        velocity += acceleration;
    } else if (!isAccelerating && velocity > 0 && !isCrashed) {
        velocity -= friction;
    }
    if (velocity < 0) velocity = 0;
    speed = velocity;

    // Fator de amplificação baseado na velocidade
    const speedMultiplier = Math.min(speed / maxSpeed, 1) * speedFactor;

// Suavidade da rotação
const smoothFactor = 0.1; // Quanto menor, mais suave a transição

// Ângulos alvo de inclinação (roll)
let targetRoll = 0;
let targetYaw = plane.rotation.y;

// Rotação do avião no eixo Y (yaw) - mais rápida com maior velocidade
const rotationSpeed = baseRotationSpeed + (baseRotationSpeed * speedMultiplier);

if (velocity > 0.01) {
    if (keys.a) {
        plane.rotation.y += rotationSpeed; // Rotação para a esquerda (yaw)
        targetYaw += rotationSpeed;
        
        // Só inclina se a velocidade for maior que 0.3
        if (velocity > 0.3) {
            targetRoll = 0.5; // Inclinação fixa para a esquerda (roll negativo)
        }
    }
    if (keys.d) {
        plane.rotation.y -= rotationSpeed; // Rotação para a direita (yaw)
        targetYaw -= rotationSpeed;

        // Só inclina se a velocidade for maior que 0.3
        if (velocity > 0.3) {
            targetRoll = -0.5; // Inclinação fixa para a direita (roll positivo)
        }
    }
}

// Suaviza os movimentos usando interpolação linear (lerp)
plane.rotation.y += (targetYaw - plane.rotation.y) * smoothFactor;
plane.rotation.z += (targetRoll - plane.rotation.z) * smoothFactor; // Suaviza a inclinação


    // Calcular movimento proposto no sistema global
    const directionX = Math.sin(plane.rotation.y);
    const directionZ = Math.cos(plane.rotation.y);
    const newX = plane.position.x - directionX * speed;
    const newZ = plane.position.z - directionZ * speed;
    let newY = plane.position.y;
    let verticalSpeed = 0;

    // Controle de altura e inclinação antes ou depois da colisão
    if (!isCrashed) {
        // Subida mais rápida proporcional à velocidade
        if (keys.w && speed > liftThreshold && plane.position.y < maxAltitude) {
            verticalSpeed = baseVerticalSpeedUp + (baseVerticalSpeedUp * speedMultiplier);
            newY += verticalSpeed;
        }
        // Descida mantém velocidade fixa
        if (keys.s && plane.position.y > 0.1) {
            verticalSpeed = -0.2; // Valor fixo, sem influência da velocidade
            newY += verticalSpeed;
        }

        // Gravidade quando não há sustentação suficiente
        if (speed < liftThreshold && plane.position.y > 0.1) {
            if (speed === 0) {
                verticalSpeed = -gravity * 5;
            } else {
                verticalSpeed = -gravity;
            }
            newY += verticalSpeed;
        }

        const yaw = plane.rotation.y;
        const cameraDirectionZ = Math.cos(yaw);
        const relativeVerticalSpeed = verticalSpeed * Math.sign(cameraDirectionZ);
        const targetPitch = relativeVerticalSpeed * 5;
        pitchAngle += (targetPitch - pitchAngle) * pitchSpeed;
        pitchAngle = Math.max(-maxPitchAngle, Math.min(maxPitchAngle, pitchAngle));
        plane.rotation.x = pitchAngle;

        if (newY > maxAltitude) newY = maxAltitude;
        if (newY < 0.1) newY = 0.1;
    } else {
        if (plane.position.y > 0.1) {
            newY -= crashGravity;
            pitchAngle = maxPitchAngle;
            plane.rotation.x = pitchAngle;
        }
        crashTimer += 1 / 15; // Incrementa o timer em segundos (assumindo 60 FPS)
        if (crashTimer >= crashDuration) {
            // Após o tempo de crash, aplicar o desfoque e agendar o reset
            if (crashTimer >= crashDuration + 4) { // 5 segundos extras após o crash para reiniciar
                resetGame();
            } else if (crashTimer >= crashDuration) {
                // Calcular o progresso do desfoque (0 a 1) ao longo de 2 segundos
                const blurProgress = (crashTimer - crashDuration) / 2; // Normaliza entre 0 e 1
                const blurAmount = blurProgress * 5; // Escala de 0px a 5px
                renderer.domElement.style.filter = `blur(${blurAmount}px)`;
            }
        }
    }

    // Atualizar a bounding box do avião com a posição proposta
    const planeBoxProposed = planeBox.clone();
    planeBoxProposed.translate(new THREE.Vector3(newX - plane.position.x, newY - plane.position.y, newZ - plane.position.z));

    // Verificar colisão com prédios
    let collisionDetected = false;
    for (const building of buildings) {
        if (checkCollision(planeBoxProposed, building.boundingBox)) {
            collisionDetected = true;
            if (!isCrashed) {
                isCrashed = true;
                crashTimer = 0;
                speed = 0; // Parar o movimento imediatamente ao colidir
                velocity = 0;
            }
            break;
        }
    }

    // Aplicar movimento
    if (!collisionDetected || !isCrashed) {
        plane.position.x = newX;
        plane.position.z = newZ;
        plane.position.y = newY;
    } else if (isCrashed) {
        plane.position.y = newY;
        speed = 0;
        velocity = 0;
    }

    // Atualizar a posição da sombra
    shadow.position.x = plane.position.x;
    shadow.position.z = plane.position.z;
    const height = plane.position.y - 0.1;
    const shadowScale = Math.max(0.2, 1 - height / 100);
    shadow.scale.set(shadowScale, shadowScale, 1);
    shadow.material.opacity = Math.max(0.1, 0.5 - height / 20);

    // Atualizar a bounding box real do avião
    planeBox.setFromObject(plane);

    // Movimento leve das nuvens
    clouds.forEach(cloud => {
        cloud.position.x += 0.01; // Movimento leve no eixo X
        if (cloud.position.x > 100) cloud.position.x = -100; // Reposicionar quando sair do mapa
    });

    // Ajustar câmera para seguir o avião
    camera.position.set(plane.position.x, plane.position.y + 5, plane.position.z + 10);
    camera.lookAt(plane.position);

    // Atualizar HUD com altura e velocidade
    const altitudeDisplay = document.getElementById('altitude');
    const speedDisplay = document.getElementById('speed');
    altitudeDisplay.textContent = ((plane.position.y - 0.1) * 4).toFixed(1); // Altura em metros
    speedDisplay.textContent = (speed * 450).toFixed(1); // Velocidade em m/s

    renderer.render(scene, camera);
}

animate();

// Ajustar o tamanho da tela se a janela mudar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Adicionar controles para mobile
function ajustarControlesMobile() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const controles = document.querySelector(".mobile-controls");
    const botoes = document.querySelectorAll(".mobile-controls button");
    const acelerador = document.getElementById("accelerator-btn");

    // Mostrar controles e ajustar FOV da câmera se altura for maior que a largura (mobile)
    if (altura > largura) {
        controles.style.display = "flex";
        camera.fov = 105; // FOV para mobile
    } else {
        controles.style.display = "none";
        camera.fov = 85; // FOV padrão para desktop
    }
    camera.updateProjectionMatrix(); // Atualizar a projeção da câmera após mudar o FOV

    // Ajustar tamanho dos botões se largura for maior que 500px
    if (largura > 500) {
        botoes.forEach(botao => {
            botao.style.width = "120px";
            botao.style.height = "120px";
            botao.style.fontSize = "30px";
        });
        acelerador.style.width = "160px";
        acelerador.style.height = "110px"; // Corrigido "acelerarador" para "acelerador"
    } else {
        botoes.forEach(botao => {
            botao.style.width = "60px";
            botao.style.height = "60px";
            botao.style.fontSize = "18px";
        });
        acelerador.style.width = "100px";
        acelerador.style.height = "60px";
    }
}

// Ajustar ao carregar e ao redimensionar a tela
window.addEventListener("load", ajustarControlesMobile);
window.addEventListener("resize", ajustarControlesMobile);
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    ajustarControlesMobile(); // Reajustar FOV e controles
});

const controls = document.getElementById('controls');
const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const downBtn = document.getElementById('down-btn');
const acceleratorBtn = document.getElementById('accelerator-btn');

// Funções para simular pressionamento de teclas
function setKey(key, value) {
    keys[key] = value;
}

function setAccelerating(value) {
    isAccelerating = value;
}

// Eventos para botões (touch e mouse)
function addButtonEvents(button, keyOrAction, isKey = true) {
    const startEvent = (e) => {
        e.preventDefault();
        if (isKey) setKey(keyOrAction, true);
        else setAccelerating(true);
        button.style.background = 'rgba(83, 85, 237, 0.8)';
    };
    
    const endEvent = (e) => {
        e.preventDefault();
        if (isKey) setKey(keyOrAction, false);
        else setAccelerating(false);
        button.style.background = 'rgba(255, 255, 255, 0.36)';
    };

    button.addEventListener('mousedown', startEvent);
    button.addEventListener('touchstart', startEvent);
    button.addEventListener('mouseup', endEvent);
    button.addEventListener('touchend', endEvent);
    button.addEventListener('touchcancel', endEvent);
}

// Associar eventos aos botões
addButtonEvents(upBtn, 'w');
addButtonEvents(leftBtn, 'a');
addButtonEvents(rightBtn, 'd');
addButtonEvents(downBtn, 's');
addButtonEvents(acceleratorBtn, null, false);
