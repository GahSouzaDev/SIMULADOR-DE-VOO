// Importa a cena do arquivo scene.js
import { scene } from './scene.js';

// Cria um grupo para o caça
const plane = new THREE.Group();

// Define os materiais usados no modelo do caça
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4a5a6a }); // Cinza metálico escuro típico de caças
const planeTailMaterial = new THREE.MeshStandardMaterial({ color: 0x6b7280 }); // Cinza mais claro para detalhes
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Cinza escuro para o trem de pouso
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Preto para o canopy da cabine

// --- CORPO DO CAÇA ---
// Corpo mais longo e estreito, usando um cilindro cônico para aerodinâmica
const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.25, 4.5, 32); // Raio superior menor que o inferior
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / -2; // Rotaciona para alinhar horizontalmente
body.position.y = 0.5; // Posiciona acima do chão
body.position.z = 0; // Centraliza no eixo Z
plane.add(body);

// --- ASAS DO CAÇA ---
// Asas triangulares (delta) típicas de caças
const wingsGeometry = new THREE.TetrahedronGeometry(1.5, 2); // Forma triangular simplificada
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.scale.set(1.5, 0.1, 0.8); // Alonga as asas e achata a espessura
wings.rotation.x = Math.PI / 1; // Alinha ao corpo
wings.rotation.z = Math.PI; // Rotaciona para formar o "V" das asas delta
wings.position.y = 0.5; // Alinha com o corpo
wings.position.z = 0.9; // Posiciona ligeiramente para trás
plane.add(wings);

// --- CAUDA VERTICAL DUPLA ---
// Caudas inclinadas para fora, típicas de caças como o F-22
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 1, 0.5);
// Cauda esquerda
const tailVerticalLeft = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVerticalLeft.position.y = 1; // Acima do corpo
tailVerticalLeft.position.z = 1.5; // Na traseira
tailVerticalLeft.position.x = -0.5; // Desloca para a esquerda
tailVerticalLeft.rotation.z = Math.PI / 6; // Inclina para fora
plane.add(tailVerticalLeft);
// Cauda direita
const tailVerticalRight = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVerticalRight.position.y = 1; // Acima do corpo
tailVerticalRight.position.z = 1.5; // Na traseira
tailVerticalRight.position.x = 0.5; // Desloca para a direita
tailVerticalRight.rotation.z = -Math.PI / 6; // Inclina para fora
plane.add(tailVerticalRight);

// Cauda horizontal
const tailHorizontalGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.position.z = -1.2;
tailHorizontal.position.y = 0.5;
plane.add(tailHorizontal);


// --- TEXTO NA CAUDA ---
// Mantém o texto em uma das caudas (esquerda)
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4);
const textTexture = new THREE.TextureLoader().load('images.png');
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0); // Posiciona na cauda esquerda
textMesh.rotation.y = Math.PI / 2; // Rotaciona para visibilidade
tailVerticalLeft.add(textMesh);

// --- EXAUSTOR TRASEIRO (SUBSTITUI A HÉLICE) ---
// Remove a hélice e adiciona um exaustor cilíndrico
const exhaustGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
const exhaustMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 }); // Cinza muito escuro
const propeller = new THREE.Mesh(exhaustGeometry, exhaustMaterial); // Reutiliza a variável propeller
propeller.rotation.x = Math.PI / 2; // Alinha ao corpo
propeller.position.z = 2.2; // Posiciona na traseira
propeller.position.y = 0.5; // Centraliza verticalmente
plane.add(propeller);

// --- TREM DE POUSO ---
// Trem de pouso mais compacto e retrátil (simplificado)
// Suporte frontal
const frontGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.4, 0.05);
const frontGearSupport = new THREE.Mesh(frontGearSupportGeometry, gearMaterial);
frontGearSupport.position.z = -1.8; // Mais para a frente
frontGearSupport.position.y = 0.2; // Abaixo do corpo
plane.add(frontGearSupport);

const frontWheelGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16);
const frontWheel = new THREE.Mesh(frontWheelGeometry, gearMaterial);
frontWheel.rotation.x = Math.PI / 2;
frontWheel.rotation.z = Math.PI / 2;
frontWheel.position.z = -1.8;
frontWheel.position.y = 0; // Mais próximo do chão
plane.add(frontWheel);

// Suporte das rodas principais (mais compacto)
const mainGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.4, 0.05);
// Suporte esquerdo
const leftGearSupport = new THREE.Mesh(mainGearSupportGeometry, gearMaterial);
leftGearSupport.position.x = -0.5; // Mais próximo das asas
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = -0.5;
leftGearSupport.rotation.z = Math.PI / 12; // Inclinação sutil
plane.add(leftGearSupport);
// Suporte direito
const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, gearMaterial);
rightGearSupport.position.x = 0.5;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = -0.5;
rightGearSupport.rotation.z = -Math.PI / 12;
plane.add(rightGearSupport);

// Rodas principais
const mainWheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16);
// Roda esquerda
const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -0.5;
leftWheel.position.y = 0;
leftWheel.position.z = -0.5;
plane.add(leftWheel);
// Roda direita
const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 0.5;
rightWheel.position.y = 0;
rightWheel.position.z = -0.5;
plane.add(rightWheel);

// --- CABINE DO CAÇA ---
// Cabine menor e integrada ao corpo, como um canopy
const cabinGeometry = new THREE.SphereGeometry(0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1); // Meio esfera
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = -Math.PI / 2; // Alinha ao corpo
cabin.position.y = 0.7; // Acima do corpo
cabin.position.z = -0.5; // Mais para a frente
plane.add(cabin);

// --- POSIÇÃO INICIAL E SOMBRA ---
plane.position.set(0, 0, 2);
scene.add(plane);

const shadowGeometry = new THREE.CircleGeometry(2, 32); // Sombra maior para o caça
const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.5
});
const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.01;
scene.add(shadow);

// --- BOUNDING BOX PARA COLISÃO ---
plane.geometry = new THREE.BoxGeometry(2.5, 0.8, 4.5); // Ajustada para o novo tamanho
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

// --- EXPORTAÇÃO ---
export { plane, propeller, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, targetRoll, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, speedFactor, inclina, inclina2, baseRotationSpeed, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

// --- FUNÇÕES SETTER ---
function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }