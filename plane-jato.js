import { scene } from './scene.js';

const plane = new THREE.Group();

// Carregar a textura camuflada
const textureLoader = new THREE.TextureLoader();
const camouflageTexture = textureLoader.load('camuflagem.png'); // Substitua pelo caminho da sua textura

// Materiais com textura camuflada
const planeMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture // Substitui a cor pela textura
});
const planeTailMaterial = new THREE.MeshStandardMaterial({ 
    map: camouflageTexture // Substitui a cor pela textura
});
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Cinza escuro para as rodas do trem de pouso
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Cinza claro para a cabine

const black = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Cinza claro para a cabine

// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.2, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

// Asas (triângulo ao invés de retângulo)
const wingsGeometry = new THREE.ConeGeometry(2.5, 1, 3); // Base 4, altura 1, 3 lados (triângulo)
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.rotation.x = Math.PI / 1; // Alinhar 
// wings.rotation.x = Math.PI / 1; // Alinhar horizontalmente
wings.position.y = 0.10;
wings.position.z = 0.5;
plane.add(wings);

// Cauda vertical (duplicada)
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.rotation.x = Math.PI / 2; // Alinhar 
tailVertical.rotation.y = Math.PI / 5;
tailVertical.position.y = 0.9;
tailVertical.position.z = 1.2;
tailVertical.position.x = -0.7; // Deslocamento leve para criar a duplicação
plane.add(tailVertical);

// Segunda cauda vertical
const tailVertical2 = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical2.rotation.x = Math.PI / 2; // Alinhar 
tailVertical2.rotation.y = Math.PI / -5; // Alinhar 
tailVertical2.position.y = 0.9;
tailVertical2.position.z = 1.2;
tailVertical2.position.x = 0.7; // Deslocamento leve para criar a duplicação
plane.add(tailVertical2);

// Criando um plano para exibir o nome do avião
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4); // Tamanho do nome
const textTexture = new THREE.TextureLoader().load('FAB.png'); // Imagem com o nome
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

// Criando o mesh para o texto
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0); // Ajustando a posição na cauda
textMesh.rotation.y = Math.PI / 2; // Opcional: ajusta a rotação se necessário

// Adicionando o texto na cauda vertical
tailVertical.add(textMesh);

// Cauda horizontal (triângulo ao invés de retângulo)
const tailHorizontalGeometry = new THREE.ConeGeometry(1.5, 0.5, 3); // Base 1.5, altura 0.5, 3 lados (triângulo)
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.rotation.x = Math.PI /1; // Alinhar horizontalmente
tailHorizontal.position.z = -1.2;
tailHorizontal.position.y = 0.3;
plane.add(tailHorizontal);

// Hélice (agora como fogo, mantendo o nome "propeller")
const propellerGeometry = new THREE.ConeGeometry(0.4, 0.5, 32); // Base do fogo (cônica)
const propellerMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500, // Laranja-avermelhado (cor de fogo)
    emissive: 0xff4500, // Emissão de luz própria
    emissiveIntensity: 0.5, // Intensidade da emissão
    transparent: true,
    opacity: 0.09 // Leve transparência
});
const propeller2 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller2.visible = false; // Define como invisível
plane.add(propeller2);

const propeller3 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller3.visible = false; // Define como invisível
plane.add(propeller3);

const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller.position.set(0, 0.2, 1.87); // Mantém a posição original
propeller.rotation.x = Math.PI; // Vira o cone para apontar para trás
plane.add(propeller);

// Adiciona uma forma extra (topo da chama, mais fina e amarela)
const flameTipGeometry = new THREE.ConeGeometry(0.2, 0.2, 32);
const flameTipMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00, // Amarelo (ponta do fogo)
    emissive: 0xffff00,
    emissiveIntensity: 0.7,
    transparent: true,
    opacity: 0.2 
});
const flameTip = new THREE.Mesh(flameTipGeometry, flameTipMaterial);
flameTip.position.set(0, 0.2, 2.0); // Ligeiramente mais atrás
flameTip.rotation.x = Math.PI;
plane.add(flameTip);

// Luz emitida pelo fogo
const fireLight = new THREE.PointLight(0xff4500, 1, 5); // Cor laranja, intensidade 1, alcance 5
fireLight.position.set(0, 0.3, 2); // Centralizado entre as chamas
plane.add(fireLight);

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
leftGearSupport.position.x = -1;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z =  0.5;
leftGearSupport.rotation.z = Math.PI / -12; // Inclinação de 15 graus para fora (ajuste conforme necessário)
plane.add(leftGearSupport);

// Suporte direito
const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 1;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = 0.5;
rightGearSupport.rotation.z = -Math.PI / -12; // Inclinação de -15 graus para fora (ajuste conforme necessário)
plane.add(rightGearSupport);

// Suporte assa esquerdo
const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 0.5;
leftGearSupport1.position.y = 0.1;
leftGearSupport1.position.z = -0.4;
leftGearSupport1.rotation.x = Math.PI / 2; // Inclinação de 15 graus para fora (ajuste conforme necessário)
plane.add(leftGearSupport1);

// Suporte assa direito
const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -0.5;
rightGearSupport1.position.y = 0.1;
rightGearSupport1.position.z = -0.4;
rightGearSupport1.rotation.x = -Math.PI / 2; // Inclinação de -15 graus para fora (ajuste conforme necessário)
plane.add(rightGearSupport1);

// Rodas principais
const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

// Roda esquerda
const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -1;
leftWheel.position.y = -0.2;
leftWheel.position.z = 0.5;
plane.add(leftWheel);

// Roda direita
const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 1;
rightWheel.position.y = -0.2;
rightWheel.position.z =  0.5;
plane.add(rightWheel);

// Cabine em forma de cilindro
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16); // Raio superior, raio inferior, altura
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2; // Rotacionada para alinhar ao corpo
cabin.position.y = 0.3; // Acima do corpo (0.5 + ajuste para raio)
cabin.position.z = 1.5 ; // Centralizado na parte frontal do corpo
plane.add(cabin);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, black);
sphere.rotation.x = Math.PI / 2;  // Mantém a mesma rotação que o corpo
sphere.position.y = 0.60;         // Mantém a mesma posição Y
sphere.position.z = -0.3;        // Mantém a mesma posição Z
plane.add(sphere);

const propeller1 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller1.visible = false; // Define como invisível
plane.add(propeller1);

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
shadow.position.y = 0.01;
scene.add(shadow);

// Bounding box para colisão
plane.geometry = new THREE.BoxGeometry(4, 0.8, 3.2);
plane.geometry.computeBoundingBox();
const planeBox = new THREE.Box3().setFromObject(plane);

// --- VARIÁVEIS DE CONTROLE (AJUSTADAS PARA CAÇA) ---
let speed = 0;
let velocity = 0;
const maxSpeed = 2.5; // Maior velocidade para um caça
const acceleration = 0.003; // Aceleração mais rápida
const friction = 0.002; // Menos fricção (jato mais eficiente)
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.60; // Levanta voo mais rápido
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.010; // Rotação mais ágil

// Variáveis de controle adicionais
let targetRoll = 0; // Inicializado como 0 (em radianos, corrigido)
let pitchAngle = 0; // Inicializado como 0 (em radianos, corrigido)
const maxPitchAngle = Math.PI / 4; // Maior ângulo de pitch (45 graus)
const maxAltitude = 100; // Maior altitude
const liftFactor = 0.2; // Mais sustentação
const pitchSpeed = 0.07; // Resposta mais rápida no pitch
const baseVerticalSpeedUp = 0.08; // Subida mais rápida
const speedFactor = 3.0; // Maior amplificação de velocidade
const inclina = -1.5; // Inclinação lateral maior para manobrabilidade
const inclina2 = 1.5; // Inclinação lateral maior para manobrabilidade

// Exportar elementos necessários
export { plane, sphere, propeller, inclina2, fireLight, inclina, propeller1, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, speedFactor, flameTip, propeller3, propeller2, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }