import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('bi-motor.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Som em loop
    sound.setVolume(0.5); // Volume inicial
    sound.play(); // Inicia o som assim que o buffer é carregado
});

plane.userData.sound = sound;

const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const planeTailMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });

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
const textGeometry = new THREE.PlaneGeometry(0.4, 0.4);
const textTexture = new THREE.TextureLoader().load('images.png');
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0);
textMesh.rotation.y = Math.PI / 2;
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
leftGearSupport.position.x = -0.2;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = -0.5;
leftGearSupport.rotation.z = Math.PI / -12;
plane.add(leftGearSupport);

const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 0.2;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = -0.5;
rightGearSupport.rotation.z = -Math.PI / -12;
plane.add(rightGearSupport);

const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 0.5;
leftGearSupport1.position.y = 0.65;
leftGearSupport1.position.z = -0.7;
leftGearSupport1.rotation.z = Math.PI / -3;
plane.add(leftGearSupport1);

const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -0.5;
rightGearSupport1.position.y = 0.65;
rightGearSupport1.position.z = -0.7;
rightGearSupport1.rotation.z = -Math.PI / -3;
plane.add(rightGearSupport1);

const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -0.25;
leftWheel.position.y = -0.1;
leftWheel.position.z = -0.5;
plane.add(leftWheel);

const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 0.25;
rightWheel.position.y = -0.1;
rightWheel.position.z = -0.5;
plane.add(rightWheel);

const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16);
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2;
cabin.position.y = 0.70;
cabin.position.z = -0.5;
plane.add(cabin);

const propeller1 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller1.visible = false;
plane.add(propeller1);

const propeller2 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller2.visible = false;
plane.add(propeller2);

const propeller3 = new THREE.Mesh(propellerGeometry, propellerMaterial);
propeller3.visible = false;
plane.add(propeller3);

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

// Parâmetros de física
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
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 6;
const maxAltitude = 100;
const liftFactor = 0.7;
const pitchSpeed = 0.05;
const baseVerticalSpeedUp = 0.045;
const speedFactor = 0.5;
const baseRotationSpeed = 0.010;


// Exportar elementos necessários
export { plane, propeller, propeller1, propeller2, propeller3, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, baseRotationSpeed, speedFactor, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }