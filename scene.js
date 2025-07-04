import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// Configuração da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Posição inicial da câmera
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

// Fundo gradiente
function createGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB"); // Azul claro
    gradient.addColorStop(1, "#1a2a6c"); // Azul escuro
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
const groundGeometry = new THREE.PlaneGeometry(1200, 1200, 20, 20); // Menos polígonos
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a7d3a,
    roughness: 0.9
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Textura de grama (opcional)
textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50);
    groundMaterial.map = texture;
    groundMaterial.needsUpdate = true;
});

// Pistas
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

createRunway(0, -46.5, 9.5, 100, 0);
createRunway(-400, 400, 9.5, 100, -Math.PI/2);

// Função para criar faixas otimizadas
function createRunwayStripes(runwayX, runwayZ, length, count, isVertical) {
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    for (let i = 0; i < count; i++) {
        const position = (i / (count - 1)) * length - length/2;
        const stripeGeometry = new THREE.PlaneGeometry(2, 5);
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

// Função para criar lagos otimizados
function createLake(x, z, size) {
    const lakeGeometry = new THREE.CircleGeometry(size, 32); // Menos segmentos
    const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x0077be,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        metalness: 0.9,
        side: THREE.DoubleSide
    });
    
    const lake = new THREE.Mesh(lakeGeometry, waterMaterial);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(x, 0.05, z);
    scene.add(lake);
    
    return lake;
}

// Criar múltiplos lagos
const lakes = [
    createLake(-130, -130, 60),
    createLake(165, -10, 45),
    createLake(-150, 450, 70),
    createLake(250, -200, 40),
    createLake(-300, 150, 55),
    createLake(180, 300, 65),
    createLake(-200, -350, 50)
];

// Adicionar algumas árvores simples (sem sobrecarregar)
function createTree(x, z, height = 8) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 2, 8),
        new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    trunk.position.set(x, 1, z);
    
    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(3, height, 8),
        new THREE.MeshStandardMaterial({ color: 0x2e8b57 })
    );
    leaves.position.set(x, height/2 + 1, z);
    
    scene.add(trunk);
    scene.add(leaves);
}

// Criar algumas árvores estrategicamente
for (let i = 0; i < 50; i++) {
    const x = Math.random() * 800 - 400;
    const z = Math.random() * 800 - 400;
    
    // Evitar colocar árvores nas pistas e lagos
    const nearRunway = (Math.abs(x) < 100 && Math.abs(z + 46.5) < 60) || 
                      (Math.abs(x + 400) < 50 && Math.abs(z - 400) < 60);
    
    let nearLake = false;
    for (const lake of lakes) {
        const distance = Math.sqrt(
            Math.pow(x - lake.position.x, 2) + 
            Math.pow(z - lake.position.z, 2)
        );
        if (distance < lake.geometry.parameters.radius * 1.5) {
            nearLake = true;
            break;
        }
    }
    
    if (!nearRunway && !nearLake) {
        createTree(x, z, 5 + Math.random() * 5);
    }
}

// Nuvens otimizadas
function createCloud(x, y, z, size) {
    const cloudGroup = new THREE.Group();
    
    for (let i = 0; i < 3; i++) {
        const cloudPart = new THREE.Mesh(
            new THREE.SphereGeometry(size * (0.7 + Math.random() * 0.3), 8, 8),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.7
            })
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

// Criar nuvens
const clouds = [];
for (let i = 0; i < 20; i++) {
    clouds.push(createCloud(
        Math.random() * 800 - 400,
        80 + Math.random() * 40,
        Math.random() * 800 - 400,
        8 + Math.random() * 5
    ));
}

// Animação suave
function animate() {
    requestAnimationFrame(animate);
    
    // Animar nuvens levemente
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