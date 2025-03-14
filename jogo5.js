// Configuração da cena
const scene = new THREE.Scene();
scene.background = createGradientTexture();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
const runwayGeometry = new THREE.PlaneGeometry(10, 60);
const runwayMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
runway.rotation.x = -Math.PI / 2;
runway.position.set(0, 0.01, -27);
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
waterTexture.repeat.set(1, 1);// Ajuste fino da textura

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
lake.position.set(-130, 0.02 , -130); // Ajuste de posição

// Adicionar o lago à cena
scene.add(lake);

// Adicionar faixas brancas na pista
const stripe1 = createRunwayStripe(0, -42, 2, 5);
const stripe2 = createRunwayStripe(0, -32, 2, 5);
const stripe3 = createRunwayStripe(0, -22, 2, 5);
const stripe4 = createRunwayStripe(0, -12, 2, 5);
const stripe5 = createRunwayStripe(0, -2, 2, 5);
const stripe15 = createRunwayStripe(0, -52, 2, 5);
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
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Cinza escuro para as rpdas dp trem de pouso
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

// Adicionar prédios com cores diferentes
const building1 = createBuilding(5, 10, 5, 25, 10, 0x888888);
const building2 = createBuilding(8, 15, 8, 25, -1, 0x4682B4);
const building3 = createBuilding(8, 10, 8, -80, -30, 0xffffff);
const building4 = createBuilding(8, 10, 8, -60, -30, 0xffffff);
const building5 = createBuilding(8, 10, 8, -80, -15, 0xffffff);
const building6 = createBuilding(8, 10, 8, -60, -15, 0xffffff);
const building7 = createBuilding(8, 10, 8, -100, -30, 0xffffff);
const building8 = createBuilding(8, 10, 8, -100, -15, 0xffffff);

const building9 = createBuilding(6, 17, 6, 80, 115, 0xffffff);
const building10 = createBuilding(6, 17, 6, 60, 115, 0xffffff);
const building11 = createBuilding(6, 17, 6, 80, 100, 0xffffff);
const building12 = createBuilding(6, 17, 6, 60, 100, 0xffffff);
const building13 = createBuilding(6, 17, 6, 100, 115, 0xffffff);
const building14 = createBuilding(6, 17, 6, 100, 100, 0xffffff);

const building15 = createBuilding(8, 10, 8, 80, -115, 0xffffff);
const building16 = createBuilding(8, 9, 8, 60, -115, 0xffffff);
const building17 = createBuilding(8, 8, 8, 80, -100, 0xffffff);
const building18 = createBuilding(8, 7, 8, 60, -100, 0xffffff);
const building19 = createBuilding(8, 6, 8, 100, -115, 0xffffff);
const building20 = createBuilding(8, 15, 8, 100, -100, 0xffffff);

const building21 = createBuilding(9, 8, 9, -100, 100, 0x888888);
const building22 = createBuilding(8, 10, 8, -100, 100, 0xffffff);
const building23 = createBuilding(7, 15, 7, -100, 100, 0x888888);
const building24 = createBuilding(6, 17, 6, -100, 100, 0xffffff);
const building25 = createBuilding(5, 20, 5, -100, 100, 0x888888);
const building26 = createBuilding(4, 23, 4, -100, 100, 0xffffff);
const building27 = createBuilding(3, 25, 3, -100, 100, 0x888888);
const building28 = createBuilding(2, 28, 2, -100, 100, 0xffffff);
const building29 = createBuilding(1, 35, 1, -100, 100, 0xffffff);

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
const buildings = [building1, building2, building3, building4, building5, building6, building7, building8, building9, building10, building11, building12, building13, building14, building15, building16, building17, building18, building19, building20, building21, building22, building23, building24, building25, building26, building27, building28, building29];

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

    // Rotação do avião no eixo Y (yaw) - mais rápida com maior velocidade
    const rotationSpeed = baseRotationSpeed + (baseRotationSpeed * speedMultiplier);
if (velocity > 0.01) {
    if (keys.a) plane.rotation.y += rotationSpeed;
    if (keys.d) plane.rotation.y -= rotationSpeed;
}

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
        crashTimer += 1 / 60;
        if (crashTimer >= crashDuration) {
            isCrashed = false;
            crashTimer = 0;
            pitchAngle = 0;
            plane.rotation.x = 0;
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
// ... (seu código JavaScript existente permanece igual até o final)

// Adicionar controles para mobile
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
        button.style.background = 'rgba(200, 200, 200, 0.8)';
    };
    
    const endEvent = (e) => {
        e.preventDefault();
        if (isKey) setKey(keyOrAction, false);
        else setAccelerating(false);
        button.style.background = 'rgba(255, 255, 255, 0.8)';
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

// ... (o resto do seu código, incluindo animate() e resize listener, permanece igual)
