import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('boeing.mp3', (buffer) => {
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
    map: camouflageTexture,
    metalness: 0.9,
    roughness: 1, 
});
const planeTailMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture,
    metalness: 0.9,
    roughness: 1, 
});
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const black = new THREE.MeshBasicMaterial({ color: 0x000000 });

// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.1, 4.2, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

const body1Geometry = new THREE.CylinderGeometry(0.01, 0.3, 1, 32);
const body1 = new THREE.Mesh(body1Geometry, planeMaterial);
body1.rotation.x = Math.PI / 2;
body1.position.y = 0.5;
body1.position.z = 2.4;
plane.add(body1);

const body2Geometry = new THREE.BoxGeometry(0.1, 3, 1.7);
const body2 = new THREE.Mesh(body2Geometry, planeMaterial);
body2.rotation.x = Math.PI / 2;
body2.rotation.y = Math.PI / 2;
body2.position.y = 0.6;
body2.position.z = 0.1;
plane.add(body2);

// Asas (triângulo ao invés de retângulo)
const wingsGeometry = new THREE.ConeGeometry(2.85, 0.2, 3);
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.rotation.x = Math.PI / 1;
wings.position.y = 0.5;
wings.position.z = 1.7;
plane.add(wings);

// Cauda vertical (duplicada)
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.rotation.x = Math.PI / 1;
tailVertical.rotation.y = Math.PI / 1;
tailVertical.position.y = 0.8;
tailVertical.position.z = 2.7;
tailVertical.position.x = -1.5;
plane.add(tailVertical);

const tailVertical2 = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical2.rotation.x = Math.PI / 1;
tailVertical2.rotation.y = Math.PI / 1;
tailVertical2.position.y = 0.8;
tailVertical2.position.z = 2.7;
tailVertical2.position.x = 1.5;
plane.add(tailVertical2);

// Cauda horizontal (triângulo ao invés de retângulo)
const tailHorizontalGeometry = new THREE.ConeGeometry(1, 0.3, 3);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.rotation.x = Math.PI / 1;
tailHorizontal.position.z = -1.8;
tailHorizontal.position.y = 0.5;
plane.add(tailHorizontal);

// Material e geometria do fogo (partículas, igual ao primeiro código)
const fireMaterial = new THREE.PointsMaterial({
    color: 0xff4500, // Cor laranja-avermelhada para o fogo
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const fireGeometry = new THREE.BufferGeometry();
const fireVertices = [];
for (let i = 0; i < 100; i++) {
    fireVertices.push((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.5);
}
fireGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fireVertices, 3));

// Propeller (fogo de partículas)
const propeller = new THREE.Points(fireGeometry, fireMaterial);
propeller.position.set(1.5, 0.5, 3.3); // Posição original do caça
plane.add(propeller);

// Propeller1 (fogo de partículas)
const propeller1 = new THREE.Points(fireGeometry, fireMaterial);
propeller1.position.set(-1.5, 0.5, 3.3); // Posição simétrica ao propeller
plane.add(propeller1);

// Luz emitida pelo fogo para propeller
const fireLight = new THREE.PointLight(0xff4500, 0.5, 5); // Cor laranja, intensidade 0.5, alcance 5
fireLight.position.set(1.5, 0.5, 3); // Centralizado no propeller
plane.add(fireLight);

// Luz emitida pelo fogo para propeller1
const fireLight1 = new THREE.PointLight(0xff4500, 0.5, 5); // Cor laranja, intensidade 0.5, alcance 5
fireLight1.position.set(-1.5, 0.5, 3); // Centralizado no propeller1
plane.add(fireLight1);

// Propeller2 e Propeller3 (mantidos como no original, sem fogo)
const propellerGeometry = new THREE.ConeGeometry(0.4, 0.5, 32);
const propellerMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.9
});
const propeller2 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller2.visible = false;
plane.add(propeller2);

const propeller3 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller3.visible = false;
plane.add(propeller3);

// Trem de pouso
const frontGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const frontGearSupport = new THREE.Mesh(frontGearSupportGeometry, cabinMaterial);
frontGearSupport.position.z = -1;
frontGearSupport.position.y = 0.2;
plane.add(frontGearSupport);

const frontWheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
const frontWheel = new THREE.Mesh(frontWheelGeometry, gearMaterial);
frontWheel.rotation.x = Math.PI / 2;
frontWheel.rotation.z = Math.PI / 2;
frontWheel.position.z = -1;
frontWheel.position.y = -0.1;
plane.add(frontWheel);

// Suporte das rodas principais
const mainGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const mainGearSupportGeometry12 = new THREE.BoxGeometry(0.05, 1.2, 0.05);

const leftGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
leftGearSupport.position.x = -0.9;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = 1.5;
leftGearSupport.rotation.z = Math.PI / -12;
plane.add(leftGearSupport);

const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 0.9;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = 1.5;
rightGearSupport.rotation.z = -Math.PI / -12;
plane.add(rightGearSupport);

const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 0.5;
leftGearSupport1.position.y = 0.5;
leftGearSupport1.position.z = 2.4;
leftGearSupport1.rotation.x = Math.PI / 2;
plane.add(leftGearSupport1);

const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -0.5;
rightGearSupport1.position.y = 0.5;
rightGearSupport1.position.z = 2.4;
rightGearSupport1.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport1);

// Rodas principais
const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -1;
leftWheel.position.y = -0.2;
leftWheel.position.z = 1.5;
plane.add(leftWheel);

const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 1;
rightWheel.position.y = -0.2;
rightWheel.position.z = 1.5;
plane.add(rightWheel);

// Cabine em forma de cilindro
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2.2, 16);
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2;
cabin.position.y = 0.6;
cabin.position.z = 2.1;
cabin.position.x = -1.5;
plane.add(cabin);

const cabin9Geometry = new THREE.CylinderGeometry(0.20, 0.01, 0.5, 16);
const cabin9 = new THREE.Mesh(cabin9Geometry, cabinMaterial);
cabin9.rotation.x = Math.PI / 2;
cabin9.position.y = 0.6;
cabin9.position.z = 0.8;
cabin9.position.x = -1.5;
plane.add(cabin9);

const cabin1Geometry = new THREE.CylinderGeometry(0.25, 0.25, 2.2, 16);
const cabin1 = new THREE.Mesh(cabin1Geometry, cabinMaterial);
cabin1.rotation.x = Math.PI / 2;
cabin1.position.y = 0.6;
cabin1.position.z = 2.1;
cabin1.position.x = 1.5;
plane.add(cabin1);

const cabin8Geometry = new THREE.CylinderGeometry(0.20, 0.01, 0.5, 16);
const cabin8 = new THREE.Mesh(cabin8Geometry, cabinMaterial);
cabin8.rotation.x = Math.PI / 2;
cabin8.position.y = 0.6;
cabin8.position.z = 0.8;
cabin8.position.x = 1.5;
plane.add(cabin8);

const cabin2Geometry = new THREE.CylinderGeometry(0.1, 0.25, 4.2, 16);
const cabin2 = new THREE.Mesh(cabin2Geometry, cabinMaterial);
cabin2.rotation.x = Math.PI / 2;
cabin2.position.y = 0.6;
cabin2.position.z = 0.5;
plane.add(cabin2);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, black);
sphere.rotation.x = Math.PI / 2;
sphere.position.y = 0.6;
sphere.position.z = -1.7;
plane.add(sphere);

// Posicionar o avião na pista
plane.position.set(0, 0, 2);
scene.add(plane);

// Sombra
const shadowGeometry = new THREE.CircleGeometry(2.5, 32);
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

// --- VARIÁVEIS DE CONTROLE (AJUSTADAS PARA CAÇA) ---
let speed = 0;
let velocity = 0;
const maxSpeed = 5;
const acceleration = 0.004;
const friction = 0.0035;
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.80;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.01;

// Variáveis de controle adicionais
let targetRoll = 0;
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 4;
const maxAltitude = 500;
const liftFactor = 0.2;
const pitchSpeed = 0.07;
const baseVerticalSpeedUp = 0.095;
const speedFactor = 1.88;
const inclina = -1.6;
const inclina2 = 1.6;

// Exportar elementos necessários
export { plane, sphere, propeller, inclina2, fireLight, targetRoll, inclina, propeller1, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, speedFactor, propeller3, propeller2, baseRotationSpeed, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }