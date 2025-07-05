import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('Decolagem do 777 Emirates. Se liga no som dos motores.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Som em loop
    sound.setVolume(0.01); // Volume inicial
    sound.setSpeed(200);
    
    sound.play(); // Inicia o som assim que o buffer é carregado
});
plane.userData.sound = sound;

// Carregar a textura camuflada
const textureLoader = new THREE.TextureLoader();
const camouflageTexture = textureLoader.load('ovni.png');

// Materiais
const planeMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture,
    metalness: 0.1,
    roughness: 0.3
});
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 });
const black = new THREE.MeshBasicMaterial({ color: 0x000000 });

// Corpo principal (disco achatado)
const bodyGeometry = new THREE.SphereGeometry(3, 64, 64, 0, Math.PI * 2, 0, Math.PI / 6);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.scale.set(1.2, 0.2, 1.2);
body.position.y = 0;
plane.add(body);

// "Propeller" integrado ao corpo (anel de propulsão inferior) - Roxo
const fireMaterial = new THREE.PointsMaterial({
    color: 0x800080, // Roxo
    size: 0.1,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending
});

const fireGeometry = new THREE.BufferGeometry();
const fireVertices = new Float32Array(300 * 3);
for (let i = 0; i < 300; i++) {
    const angle = (i / 300) * Math.PI * 2;
    const radius = 2.5 + Math.random() * 0.2;
    fireVertices[i * 3] = Math.cos(angle) * radius;
    fireVertices[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    fireVertices[i * 3 + 2] = Math.sin(angle) * radius;
}
fireGeometry.setAttribute('position', new THREE.BufferAttribute(fireVertices, 3));

const propeller = new THREE.Points(fireGeometry, fireMaterial);
propeller.position.y = 0.2;
plane.add(propeller);

// Luzes pulsantes nas bordas do disco - Amarelo
const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.5 });
const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);

const lights = [];
for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(Math.cos(angle) * 2.8, 0.4, Math.sin(angle) * 2.8);
    lights.push(light);
    plane.add(light);
}

// Cúpula superior (cabine translúcida)
const cabinGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.position.y = 0.6;
cabin.scale.set(0.8, 0.5, 0.8);
plane.add(cabin);

// Luz emitida pelo "propeller" - Roxo
const fireLight = new THREE.PointLight(0xFFFF00, 10, 4);
fireLight.position.set(0, 0.2, 0);
plane.add(fireLight);

// Propeller1, Propeller2, Propeller3 - Roxo e visíveis com rotações
const propeller1 = new THREE.Points(fireGeometry, fireMaterial);
propeller1.position.y = 0.2;
propeller1.rotation.y = 1.6;
plane.add(propeller1);

const propeller2 = new THREE.Points(fireGeometry, fireMaterial);
propeller2.position.y = 0.2;
propeller2.rotation.y = 2.3;
plane.add(propeller2);

const propeller3 = new THREE.Points(fireGeometry, fireMaterial);
propeller3.position.y = 0.2;
propeller3.rotation.y = 0.8;
plane.add(propeller3);

// Reflexo da luz no chão (substituindo a sombra)
const shadowGeometry = new THREE.CircleGeometry(3, 32);
const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFF00, // Roxo
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending
});
const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.03;
scene.add(shadow);

// Animação do fogo, luzes e reflexo no chão
function animateFire() {
    const positions = propeller.geometry.attributes.position.array;
    const positions1 = propeller1.geometry.attributes.position.array;
    const positions2 = propeller2.geometry.attributes.position.array;
    const positions3 = propeller3.geometry.attributes.position.array;

    for (let i = 0; i < 300; i++) {
        positions[i * 3 + 1] -= 0.03;
        positions1[i * 3 + 1] -= 0.03;
        positions2[i * 3 + 1] -= 0.03;
        positions3[i * 3 + 1] -= 0.03;

        if (positions[i * 3 + 1] < -0.5) {
            const angle = (i / 300) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 0.2;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = 0.5;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        if (positions1[i * 3 + 1] < -0.5) {
            const angle = (i / 300) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 0.2;
            positions1[i * 3] = Math.cos(angle) * radius;
            positions1[i * 3 + 1] = 0.5;
            positions1[i * 3 + 2] = Math.sin(angle) * radius;
        }
        if (positions2[i * 3 + 1] < -0.5) {
            const angle = (i / 300) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 0.2;
            positions2[i * 3] = Math.cos(angle) * radius;
            positions2[i * 3 + 1] = 0.5;
            positions2[i * 3 + 2] = Math.sin(angle) * radius;
        }
        if (positions3[i * 3 + 1] < -0.5) {
            const angle = (i / 300) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 0.2;
            positions3[i * 3] = Math.cos(angle) * radius;
            positions3[i * 3 + 1] = 0.5;
            positions3[i * 3 + 2] = Math.sin(angle) * radius;
        }
    }

    propeller.geometry.attributes.position.needsUpdate = true;
    propeller1.geometry.attributes.position.needsUpdate = true;
    propeller2.geometry.attributes.position.needsUpdate = true;
    propeller3.geometry.attributes.position.needsUpdate = true;

    // Pulso das luzes nas bordas (amarelas)
    const pulse = Math.sin(Date.now() * 0.002) * 0.1 + 0.5;
    lights.forEach(light => {
        light.scale.setScalar(pulse);
    });

    // Atualizar a posição do reflexo no chão (shadow)
    shadow.position.x = plane.position.x;
    shadow.position.z = plane.position.z;

    // Controlar visibilidade da luz e reflexo com base na altura
    const heightLimit = 50; // Altura máxima para a luz ser visível
    if (plane.position.y > heightLimit) {
        fireLight.visible = false;
        shadow.visible = false; // Reflexo (antiga sombra) também desaparece
    } else {
        fireLight.visible = true;
        shadow.visible = true;
        // Ajustar opacidade do reflexo com base na altura
        const opacity = Math.max(0, 0.5 * (1 - plane.position.y / heightLimit));
        shadow.material.opacity = opacity;
    }
}

// Posicionar o OVNI na pista
plane.position.set(0, 0, 2);
scene.add(plane);

// Bounding box para colisão
plane.geometry = new THREE.BoxGeometry(6, 1, 6);
plane.geometry.computeBoundingBox();
const planeBox = new THREE.Box3().setFromObject(plane);

// --- VARIÁVEIS DE CONTROLE (MANTIDAS COMO NO ORIGINAL) ---
let speed = 0;
let velocity = 0;
const maxSpeed = 3;
const acceleration = 0.01;
const friction = 0.01;
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.01;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.01;

let targetRoll = 0;
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 4;
const maxAltitude = 1000;
const liftFactor = 0.1;
const pitchSpeed = 0.07;
const baseVerticalSpeedUp = 0.1;
const speedFactor = 3.0;
const inclina = -1.8;
const inclina2 = 1.8;
const inclinaboeing1 = 1;
const inclinaboeing2 = 1;

// Exportar elementos necessários
export { plane, inclinaboeing1, inclinaboeing2, propeller, inclina2, fireLight, targetRoll, inclina, propeller1, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, speedFactor, propeller3, propeller2, baseRotationSpeed, animateFire, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }