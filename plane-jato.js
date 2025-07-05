import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('Som de avião Caça.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Som em loop
    sound.setVolume(0.01); // Volume inicial
    sound.setSpeed(200);
    
    sound.play(); // Inicia o som assim que o buffer é carregado
});
plane.userData.sound = sound;

// Carregar a textura camuflada
const textureLoader = new THREE.TextureLoader();
const camouflageTexture = textureLoader.load('camuflagem.png'); // Substitua pelo caminho da sua textura

// Materiais com textura camuflada
const planeMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture
});
const planeTailMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture
});
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const black = new THREE.MeshBasicMaterial({ color: 0x000000 });

// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.15, 3.6, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

// Asas (triângulo ao invés de retângulo)
const wingsGeometry = new THREE.ConeGeometry(2.5, 1, 3);
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.rotation.x = Math.PI / 1;
wings.position.y = 0.10;
wings.position.z = 0.5;
plane.add(wings);

// Cauda vertical (duplicada)
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.rotation.x = Math.PI / 2;
tailVertical.rotation.y = Math.PI / 5;
tailVertical.position.y = 0.9;
tailVertical.position.z = 1.2;
tailVertical.position.x = -0.7;
plane.add(tailVertical);

const tailVertical2 = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical2.rotation.x = Math.PI / 2;
tailVertical2.rotation.y = Math.PI / -5;
tailVertical2.position.y = 0.9;
tailVertical2.position.z = 1.2;
tailVertical2.position.x = 0.7;
plane.add(tailVertical2);

// Criando um plano para exibir o nome do avião
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4);
const textTexture = new THREE.TextureLoader().load('FAB.png');
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0);
textMesh.rotation.y = Math.PI / 2;
tailVertical.add(textMesh);

// Cauda horizontal (triângulo ao invés de retângulo)
const tailHorizontalGeometry = new THREE.ConeGeometry(1.5, 0.5, 3);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.rotation.x = Math.PI / 1;
tailHorizontal.position.z = -1.2;
tailHorizontal.position.y = 0.3;
plane.add(tailHorizontal);

// Material e geometria do fogo (partículas)
const fireMaterial = new THREE.PointsMaterial({
    color: 0xff4500,
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const fireGeometry = new THREE.BufferGeometry();
const fireVertices = new Float32Array(100 * 3); // 100 partículas, 3 coordenadas cada
for (let i = 0; i < 100; i++) {
    fireVertices[i * 3] = (Math.random() - 0.5) * 0.3;     // x
    fireVertices[i * 3 + 1] = (Math.random() - 0.5) * 0.3; // y
    fireVertices[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // z
}
fireGeometry.setAttribute('position', new THREE.BufferAttribute(fireVertices, 3));

// Propeller (fogo de partículas)
const propeller = new THREE.Points(fireGeometry, fireMaterial);
propeller.position.set(0, 0.3, 2); // Posição original do fogo
plane.add(propeller);

// Luz emitida pelo fogo
const fireLight = new THREE.PointLight(0xff4500, 2, 5);
fireLight.position.set(0, 0.3, 2);
plane.add(fireLight);

// Propeller1, Propeller2, Propeller3 (mantidos como invisíveis, conforme original)
const propellerGeometry = new THREE.ConeGeometry(1.4, 5.5, 132);
const propellerMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 10.9
});
const propeller1 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller1.visible = false;
plane.add(propeller1);

const propeller2 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller2.visible = false;
plane.add(propeller2);

const propeller3 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller3.visible = false;
plane.add(propeller3);

// Trem de pouso
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

const mainGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const mainGearSupportGeometry12 = new THREE.BoxGeometry(0.05, 1.2, 0.05);

const leftGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
leftGearSupport.position.x = -1;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = 0.5;
leftGearSupport.rotation.z = Math.PI / -12;
plane.add(leftGearSupport);

const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 1;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = 0.5;
rightGearSupport.rotation.z = -Math.PI / -12;
plane.add(rightGearSupport);

const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 0.5;
leftGearSupport1.position.y = 0.1;
leftGearSupport1.position.z = -0.4;
leftGearSupport1.rotation.x = Math.PI / 2;
plane.add(leftGearSupport1);

const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -0.5;
rightGearSupport1.position.y = 0.1;
rightGearSupport1.position.z = -0.4;
rightGearSupport1.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport1);

const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -1;
leftWheel.position.y = -0.2;
leftWheel.position.z = 0.5;
plane.add(leftWheel);

const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 1;
rightWheel.position.y = -0.2;
rightWheel.position.z = 0.5;
plane.add(rightWheel);

// Cabine em forma de cilindro
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16);
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2;
cabin.position.y = 0.3;
cabin.position.z = 1.5;
plane.add(cabin);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, black);
sphere.rotation.x = Math.PI / 2;
sphere.position.y = 0.60;
sphere.position.z = -1.1;
plane.add(sphere);

// Posicionar o avião na pista
plane.position.set(0, 0, 2);
scene.add(plane);

// Sombra
const shadowGeometry = new THREE.CircleGeometry(1.7, 32);
const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.5
});
const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.03;
scene.add(shadow);

// Bounding box para colisão
plane.geometry = new THREE.BoxGeometry(4, 0.8, 3.2);
plane.geometry.computeBoundingBox();
const planeBox = new THREE.Box3().setFromObject(plane);

// Variáveis de controle (ajustadas para caça)
let speed = 0;
let velocity = 0;
const maxSpeed = 2.5;
const acceleration = 0.003;
const friction = 0.0025;
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.60;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.01;

let targetRoll = 0;
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 4;
const maxAltitude = 400;
const liftFactor = 0.2;
const pitchSpeed = 0.07;
const baseVerticalSpeedUp = 0.08;
const speedFactor = 2.5;
const inclina = -1.5;
const inclina2 = 1.5;

// Função de animação para o fogo
function animateFire() {
    const positions = propeller.geometry.attributes.position.array;

    for (let i = 0; i < 100; i++) {
        // Movimenta as partículas na direção z (para trás)
        positions[i * 3 + 2] -= 0.02;

        // Se a partícula ultrapassar o limite, reposiciona no início
        if (positions[i * 3 + 2] < -0.5) {
            positions[i * 3] = (Math.random() - 0.5) * 0.3;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3; // y
            positions[i * 3 + 2] = 0.5;                         // z
        }
    }

    propeller.geometry.attributes.position.needsUpdate = true;
}

// Exportar elementos necessários
export { plane, sphere, propeller, inclina2, fireLight, targetRoll, inclina, propeller1, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, speedFactor, propeller3, propeller2, baseRotationSpeed, animateFire, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }