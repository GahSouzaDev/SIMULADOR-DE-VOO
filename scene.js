// Configuração da cena - otimizado para desewmpenho
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar nevoeiro linear
scene.fog = new THREE.Fog(0x87CEEB, 100, 600); // Cor, near, far

// Fundo gradiente
scene.background = createGradientTexture();

function createGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB"); // Azul claro
    gradient.addColorStop(1, "#000000"); // Azul escuro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return new THREE.CanvasTexture(canvas);
}

// Luz ambiente
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Chão
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(50, 50);
const groundGeometry = new THREE.PlaneGeometry(1200, 1200);
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Pista1
const runwayGeometry = new THREE.PlaneGeometry(9.5, 100);
const runwayMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
runway.rotation.x = -Math.PI / 2;
runway.position.set(0, 0.01, -46.5);
scene.add(runway);

// Pista2 com textura
const runwayTexture = textureLoader.load('terra.png'); // URL de teste, substitua pela sua imagem
runwayTexture.wrapS = runwayTexture.wrapT = THREE.RepeatWrapping;
runwayTexture.repeat.set(1, 5); // Ajuste conforme necessário
const runway1Material = new THREE.MeshStandardMaterial({ map: runwayTexture });
const runway1 = new THREE.Mesh(runwayGeometry, runway1Material);
runway1.rotation.x = -Math.PI / 2;
runway1.rotation.z = -Math.PI / 2;
runway1.position.set(-400, 0.012, 400);
scene.add(runway1);

// Faixas da pista
function createRunwayStripe(x, z, width, length) {
    const stripeGeometry = new THREE.PlaneGeometry(width, length);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(x, 0.02, z);
    scene.add(stripe);
    return stripe;
}

const stripe1 = createRunwayStripe(0, -42, 2, 5);
const stripe2 = createRunwayStripe(0, -32, 2, 5);
const stripe3 = createRunwayStripe(0, -22, 2, 5);
const stripe4 = createRunwayStripe(0, -12, 2, 5);
const stripe5 = createRunwayStripe(0, -2, 2, 5);
const stripe6 = createRunwayStripe(-4, 2, 0.5, 2);
const stripe7 = createRunwayStripe(-3, 2, 0.5, 2);
const stripe8 = createRunwayStripe(-2, 2, 0.5, 2);
const stripe9 = createRunwayStripe(-1, 2, 0.5, 2);
const stripe10 = createRunwayStripe(0, 2, 0.5, 2);
const stripe11 = createRunwayStripe(1, 2, 0.5, 2);
const stripe12 = createRunwayStripe(2, 2, 0.5, 2);
const stripe13 = createRunwayStripe(3, 2, 0.5, 2);
const stripe14 = createRunwayStripe(4, 2, 0.5, 2);
const stripe15 = createRunwayStripe(0, -52, 2, 5);
const stripe16 = createRunwayStripe(0, -62, 2, 5);
const stripe17 = createRunwayStripe(0, -72, 2, 5);
const stripe18 = createRunwayStripe(0, -82, 2, 5);
const stripe19 = createRunwayStripe(0, -92, 2, 5);

// Lagos
const lakeShape = new THREE.Shape();
lakeShape.moveTo(0, 0);
lakeShape.bezierCurveTo(60, -30, 120, 30, 45, 45);
lakeShape.bezierCurveTo(60, 140, -15, 60, -30, 45);
lakeShape.bezierCurveTo(-120, 30, -90, -60, 0, 0);
const lakeGeometry = new THREE.ShapeGeometry(lakeShape);
const waterTexture = textureLoader.load('https://threejs.org/examples/textures/waternormals.jpg');
waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
waterTexture.repeat.set(1, 1);
const lakeMaterial = new THREE.MeshStandardMaterial({
    map: waterTexture,
    transparent: true,
    opacity: 0.85,
    roughness: 0.3,
    metalness: 0.6,
    side: THREE.DoubleSide
});
const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
lake.rotation.x = -Math.PI / 2;
lake.position.set(-130, 0.02, -130);
scene.add(lake);

const lakeShape2 = new THREE.Shape();
lakeShape2.moveTo(0, 0);
lakeShape2.bezierCurveTo(80, -40, 300, 50, 60, 60);
lakeShape2.bezierCurveTo(170, 120, -20, 80, -50, 50);
lakeShape2.bezierCurveTo(-100, 20, -80, -50, 0, 0);
const lakeGeometry2 = new THREE.ShapeGeometry(lakeShape2);
const waterTexture2 = textureLoader.load('https://threejs.org/examples/textures/waternormals.jpg');
waterTexture2.wrapS = waterTexture2.wrapT = THREE.RepeatWrapping;
waterTexture2.repeat.set(1.2, 1.2);
const lakeMaterial2 = new THREE.MeshStandardMaterial({
    map: waterTexture2,
    transparent: true,
    opacity: 0.9,
    roughness: 0.25,
    metalness: 0.7,
    side: THREE.DoubleSide
});
const lake2 = new THREE.Mesh(lakeGeometry2, lakeMaterial2);
lake2.rotation.x = -Math.PI / 2;
lake2.position.set(165, 0.01, -10);
scene.add(lake2);

// Lago 3
const lakeShape3 = new THREE.Shape();
lakeShape3.moveTo(0, 0);
lakeShape3.bezierCurveTo(130, -140, 100, 50, 60, 60);
lakeShape3.bezierCurveTo(250, 120, -210, 130, -150, 50);
lakeShape3.bezierCurveTo(-100, 20, -180, -150, 0, 0);
const lakeGeometry3 = new THREE.ShapeGeometry(lakeShape3);
const waterTexture3 = textureLoader.load('https://threejs.org/examples/textures/waternormals.jpg');
waterTexture3.wrapS = waterTexture3.wrapT = THREE.RepeatWrapping;
waterTexture3.repeat.set(1.2, 1.2);
const lakeMaterial3 = new THREE.MeshStandardMaterial({
    map: waterTexture3,
    transparent: true,
    opacity: 0.9,
    roughness: 0.25,
    metalness: 0.7,
    side: THREE.DoubleSide
});
const lake3 = new THREE.Mesh(lakeGeometry3, lakeMaterial3);
lake3.rotation.x = -Math.PI / 2;
lake3.position.set(-150, 0.01, 450);
scene.add(lake3);

// Nuvens
function createCloud(x, z) {
    const cloudGeometry = new THREE.SphereGeometry(5, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        fog: false // Nuvens ignoram o nevoeiro
    });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set(x, 120, z);
    scene.add(cloud);
    return cloud;
}

// Criar várias nuvens em posições aleatórias
const clouds = [];
const cloudCount = 100;
for (let i = 0; i < cloudCount; i++) {
    const x = Math.random() * 200 - 100; // Intervalo de -100 a 100 no eixo X
    const z = Math.random() * 200 - 100; // Intervalo de -100 a 100 no eixo Z
    clouds.push(createCloud(x, z));
}

// Configurar a câmera para o preview inicial
camera.position.set(0, 150, 200); // Posição elevada para ver o mapa
camera.lookAt(0, 0, 0); // Olhar para o centro do mapa

// Configuração da animação da câmera (sem TWEEN.js)
let animationProgress = 0;
const animationDuration = 3000; // 3 segundos
const startPosition = { x: 0, y: 150, z: 200 };
const endPosition = { x: 0, y: 10, z: 10 };
let animationActive = true;

// Função de easing quadrático para animação suave
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Função de animação principal
function animate(time) {
    if (!animationActive) return; // Para a animação após 3 segundos

    requestAnimationFrame(animate);

    // Animação da câmera com easing quadrático
    if (animationProgress < animationDuration) {
        animationProgress += 16; // Aproximadamente 60 FPS
        const t = Math.min(animationProgress / animationDuration, 1);
        const easedT = easeInOutQuad(t); // Aplica easing quadrático
        // Interpolação para a posição da câmera
        camera.position.x = startPosition.x + (endPosition.x - startPosition.x) * easedT;
        camera.position.y = startPosition.y + (endPosition.y - startPosition.y) * easedT;
        camera.position.z = startPosition.z + (endPosition.z - startPosition.z) * easedT;
        camera.lookAt(0, 0, 0); // Manter o foco no centro do mapa

        // Transição suave do nevoeiro
        const fogNear = 200 + (100 - 200) * easedT;
        const fogFar = 1000 + (600 - 1000) * easedT;
        scene.fog = new THREE.Fog(0x87CEEB, fogNear, fogFar);

        if (t === 1) {
            // Finaliza a animação e desativa o loop
            animationActive = false;
            scene.fog = new THREE.Fog(0x87CEEB, 100, 600); // Garante o nevoeiro final
            renderer.render(scene, camera); // Renderização final
        }
    }

    renderer.render(scene, camera);
}

// Iniciar a animação
animate();

// Ajustar a janela ao redimensionar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Exportar elementos necessários
export { scene, camera, renderer, clouds };