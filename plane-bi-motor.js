import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('Cessna sound effect _ Enjoy!.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Som em loop
    sound.setVolume(0.01); // Volume inicial
    sound.setSpeed(200);
    
    sound.play(); // Inicia o som assim que o buffer é carregado
});
plane.userData.sound = sound;

// Carregar a textura para as partes vermelhas
const textureLoader = new THREE.TextureLoader();
const planeTexture = textureLoader.load('antigo.png'); // Substitua pelo caminho da sua textura

// Material do corpo, asas e cauda horizontal com textura
const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture, // Usa a textura carregada
    // color: 0xff0000, // Opcional: descomente se quiser tingir a textura de vermelho
    metalness: 0,   // Opcional: ajusta o brilho metálico
    roughness: 0    // Opcional: ajusta a rugosidade
});

// Material da cauda vertical com textura (pode usar a mesma ou outra)
const planeTailMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture, // Usa a mesma textura do corpo ou substitua por outra
    // color: 0xff0000, // Opcional: descomente se quiser tingir de vermelho
    metalness: 0.1,
    roughness: 0
});

// Materiais que permanecem iguais (sem textura)
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Cinza escuro para as rodas do trem de pouso
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa }); // Cinza claro para a cabine
const motorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333}); 
// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.3, 5.2, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, planeMaterial);
sphere.rotation.x = Math.PI / 2;  // Mantém a mesma rotação que o corpo
sphere.position.y = 0.5;         // Mantém a mesma posição Y
sphere.position.z = -2.9;        // Mantém a mesma posição Z
plane.add(sphere);


// Asas
const wingsGeometry = new THREE.BoxGeometry(7, 0.1, 1.8);
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.position.y = 1;
wings.position.z = -0.5;
plane.add(wings);

// Cauda vertical
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.position.y = 0.9;
tailVertical.position.z = 2.2;
plane.add(tailVertical);

// Criando um plano para exibir o nome do avião
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4); // Tamanho do nome
const textTexture = new THREE.TextureLoader().load('ATR.png'); // Imagem com o nome
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

// Criando o mesh para o texto
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0); // Ajustando a posição na cauda
textMesh.rotation.y = Math.PI / 2; // Opcional: ajusta a rotação se necessário

// Adicionando o texto na cauda vertical
tailVertical.add(textMesh);

// Cauda horizontal
const tailHorizontalGeometry = new THREE.BoxGeometry(3, 0.1, 0.5);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.position.z = 2;
tailHorizontal.position.y = 0.5;
plane.add(tailHorizontal);

// Hélice
const propellerGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
const propellerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller.position.z = -1.5;
propeller.position.y = 0.8;
propeller.position.x = 1.2;
plane.add(propeller);
const propeller1 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller1.position.z = -1.5;
propeller1.position.y = 0.8;
propeller1.position.x = -1.2;
plane.add(propeller1);

const propeller2 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller2.visible = false; // Define como invisível
plane.add(propeller2);

const propeller3 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller3.visible = false; // Define como invisível
plane.add(propeller3);

// Trem de pouso
// Suporte da roda frontal (nariz)
const frontGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const frontGearSupport = new THREE.Mesh(frontGearSupportGeometry, cabinMaterial);
frontGearSupport.position.z = -2.4;
frontGearSupport.position.y = 0.2;
plane.add(frontGearSupport);

const frontWheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
const frontWheel = new THREE.Mesh(frontWheelGeometry, gearMaterial);
frontWheel.rotation.x = Math.PI / 2;
frontWheel.rotation.z = Math.PI / 2;
frontWheel.position.z = -2.4;
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
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2, 20); // Raio superior, raio inferior, altura
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2; // Rotacionada para alinhar ao corpo
cabin.position.y = 0.70; // Acima do corpo (0.5 + ajuste para raio)
cabin.position.z = -1.25; // Centralizado na parte frontal do corpo
plane.add(cabin);

// Cabine em forma de cilindro
const motorGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 10); // Raio superior, raio 
const motor = new THREE.Mesh(motorGeometry, motorMaterial);
motor.rotation.x = Math.PI / 2; // Rotacionada para alinhar ao corpo
motor.position.y = 0.8; // Acima do corpo (0.5 + ajuste para raio)
motor.position.z = -1.19 // Centralizado na parte frontal do corpo
motor.position.x = -1.19; // Centralizado na parte frontal do corpo
plane.add(motor);

const motor1 = new THREE.Mesh(motorGeometry, motorMaterial);
motor1.rotation.x = Math.PI / 2; // Rotacionada para alinhar ao corpo
motor1.position.y = 0.8; // Acima do corpo (0.5 + ajuste para raio)
motor1.position.z = -1.19 // Centralizado na parte frontal do corpo
motor1.position.x = 1.19; // Centralizado na parte frontal do corpo
plane.add(motor1);

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

// Parâmetros de física
let speed = 0;
let velocity = 0;
const maxSpeed = 1;
const acceleration = 0.001;
const friction = 0.001;
const gravity = 0.3;
const crashGravity = 0.9;
const liftThreshold = 0.40;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 4;
const maxAltitude = 120;
const liftFactor = 0.2;
const pitchSpeed = 0.04;
const baseVerticalSpeedUp = 0.050;
const speedFactor = 0.2;
const ai = 0.8;
const baseRotationSpeed = 0.05; 
const inclinaBoing = -0.3;
const inclinaBoing2 = 0.3;
const inclina = -0.5; // Inclinação lateral maior para manobrabilidade
const inclina2 = 0.8; // Inclinação lateral maior para manobrabilidade

// Exportar elementos necessários
export { plane,motor , propeller, propeller1, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, baseRotationSpeed, inclinaBoing2, inclinaBoing,inclina2, inclina, speedFactor, sphereGeometry, propeller3, propeller2, ai, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }