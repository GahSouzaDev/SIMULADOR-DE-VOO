import { scene } from './scene.js';

// Configuração do áudio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener(); // Ouvinte global
scene.add(listener); // Adicione o ouvinte à cena uma vez

const plane = new THREE.Group();

// Criar o som do avião
const sound = new THREE.Audio(listener);
audioLoader.load('sr71.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Som em loop
    sound.setVolume(0.01); // Volume inicial
    sound.setSpeed(200);
    
    sound.play(); // Inicia o som assim que o buffer é carregado
});
plane.userData.sound = sound;

// Carregar a textura para as partes vermelhas
const textureLoader = new THREE.TextureLoader();
const planeTexture = textureLoader.load('image.png'); // Substitua pelo caminho da sua textura

// Material do corpo, asas e cauda horizontal com textura
const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture,
    metalness: 0.5,
    roughness: 0.5
});

// Material da cauda vertical com textura
const planeTailMaterial = new THREE.MeshStandardMaterial({
    map: planeTexture,
    metalness: 0.5,
    roughness: 0.5
});

// Materiais que permanecem iguais (sem textura)
const gearMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const vidro = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const motorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

// Corpo
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5.2, 32);
const body = new THREE.Mesh(bodyGeometry, planeMaterial);
body.rotation.x = Math.PI / 2;
body.position.y = 0.5;
body.position.z = -0.2;
plane.add(body);

const body2Geometry = new THREE.CylinderGeometry(0.1, 0.5, 2.2, 32);
const body2 = new THREE.Mesh(body2Geometry, planeMaterial);
body2.rotation.x = Math.PI / 2;
body2.position.y = 0.5;
body2.position.z = 3.5;
plane.add(body2);

const body3Geometry = new THREE.CylinderGeometry(0.5, 0.01, 0.8, 25);
const body3 = new THREE.Mesh(body3Geometry, planeMaterial);
body3.rotation.x = Math.PI / 2;
body3.position.y = 0.45;
body3.position.z = -3.4;
plane.add(body3);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, vidro);
sphere.rotation.x = Math.PI / 2;
sphere.position.y = 0.6;
sphere.position.z = -3.3;
plane.add(sphere);

const sphere1Geometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphere1 = new THREE.Mesh(sphere1Geometry, planeMaterial);
sphere1.rotation.x = Math.PI / 2;
sphere1.position.y = 0.5;
sphere1.position.z = -2.9;
plane.add(sphere1);

const sphere2Geometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphere2 = new THREE.Mesh(sphere2Geometry, vidro);
sphere2.rotation.x = Math.PI / 2;
sphere2.position.y = 0.65;
sphere2.position.z = -2;
sphere2.position.x = 0.3;
plane.add(sphere2);
const sphere3 = new THREE.Mesh(sphere2Geometry, vidro);
sphere3.rotation.x = Math.PI / 2;
sphere3.position.y = 0.65;
sphere3.position.z = -1.5;
sphere3.position.x = 0.3;
plane.add(sphere3);
const sphere4 = new THREE.Mesh(sphere2Geometry, vidro);
sphere4.rotation.x = Math.PI / 2;
sphere4.position.y = 0.65;
sphere4.position.z = -1;
sphere4.position.x = 0.3;
plane.add(sphere4);
const sphere5 = new THREE.Mesh(sphere2Geometry, vidro);
sphere5.rotation.x = Math.PI / 2;
sphere5.position.y = 0.65;
sphere5.position.z = -0.5;
sphere5.position.x = 0.3;
plane.add(sphere5);
const sphere6 = new THREE.Mesh(sphere2Geometry, vidro);
sphere6.rotation.x = Math.PI / 2;
sphere6.position.y = 0.65;
sphere6.position.z = 0;
sphere6.position.x = 0.3;
plane.add(sphere6);
const sphere7 = new THREE.Mesh(sphere2Geometry, vidro);
sphere7.rotation.x = Math.PI / 2;
sphere7.position.y = 0.65;
sphere7.position.z = 0.5;
sphere7.position.x = 0.3;
plane.add(sphere7);
const sphere8 = new THREE.Mesh(sphere2Geometry, vidro);
sphere8.rotation.x = Math.PI / 2;
sphere8.position.y = 0.65;
sphere8.position.z = 1;
sphere8.position.x = 0.3;
plane.add(sphere8);
const sphere9 = new THREE.Mesh(sphere2Geometry, vidro);
sphere9.rotation.x = Math.PI / 2;
sphere9.position.y = 0.65;
sphere9.position.z = 1.5;
sphere9.position.x = 0.3;
plane.add(sphere9);
const sphere10 = new THREE.Mesh(sphere2Geometry, vidro);
sphere10.rotation.x = Math.PI / 2;
sphere10.position.y = 0.65;
sphere10.position.z = 2;
sphere10.position.x = 0.3;
plane.add(sphere10);
const sphere11 = new THREE.Mesh(sphere2Geometry, vidro);
sphere11.rotation.x = Math.PI / 2;
sphere11.position.y = 0.65;
sphere11.position.z = -2;
sphere11.position.x = -0.3;
plane.add(sphere11);
const sphere12 = new THREE.Mesh(sphere2Geometry, vidro);
sphere12.rotation.x = Math.PI / 2;
sphere12.position.y = 0.65;
sphere12.position.z = -1.5;
sphere12.position.x = -0.3;
plane.add(sphere12);
const sphere13 = new THREE.Mesh(sphere2Geometry, vidro);
sphere13.rotation.x = Math.PI / 2;
sphere13.position.y = 0.65;
sphere13.position.z = -1;
sphere13.position.x = -0.3;
plane.add(sphere13);
const sphere14 = new THREE.Mesh(sphere2Geometry, vidro);
sphere14.rotation.x = Math.PI / 2;
sphere14.position.y = 0.65;
sphere14.position.z = -0.5;
sphere14.position.x = -0.3;
plane.add(sphere14);
const sphere15 = new THREE.Mesh(sphere2Geometry, vidro);
sphere15.rotation.x = Math.PI / 2;
sphere15.position.y = 0.65;
sphere15.position.z = 0;
sphere15.position.x = -0.3;
plane.add(sphere15);
const sphere16 = new THREE.Mesh(sphere2Geometry, vidro);
sphere16.rotation.x = Math.PI / 2;
sphere16.position.y = 0.65;
sphere16.position.z = 0.5;
sphere16.position.x = -0.3;
plane.add(sphere16);
const sphere17 = new THREE.Mesh(sphere2Geometry, vidro);
sphere17.rotation.x = Math.PI / 2;
sphere17.position.y = 0.65;
sphere17.position.z = 1;
sphere17.position.x = -0.3;
plane.add(sphere17);
const sphere18 = new THREE.Mesh(sphere2Geometry, vidro);
sphere18.rotation.x = Math.PI / 2;
sphere18.position.y = 0.65;
sphere18.position.z = 1.5;
sphere18.position.x = -0.3;
plane.add(sphere18);
const sphere19 = new THREE.Mesh(sphere2Geometry, vidro);
sphere19.rotation.x = Math.PI / 2;
sphere19.position.y = 0.65;
sphere19.position.z = 2;
sphere19.position.x = -0.3;
plane.add(sphere19);
const sphere20 = new THREE.Mesh(sphere2Geometry, vidro);
sphere20.rotation.x = Math.PI / 2;
sphere20.position.y = 0.65;
sphere20.position.z = 2.5;
sphere20.position.x = -0.28;
plane.add(sphere20);
const sphere21 = new THREE.Mesh(sphere2Geometry, vidro);
sphere21.rotation.x = Math.PI / 2;
sphere21.position.y = 0.65;
sphere21.position.z = 2.5;
sphere21.position.x = 0.28;
plane.add(sphere21);

// Asas
const wingsGeometry = new THREE.BoxGeometry(7, 0.1, 1.8);
const wings = new THREE.Mesh(wingsGeometry, planeMaterial);
wings.position.y = 0.6;
wings.position.z = 0.5;
wings.position.x = -3;
wings.rotation.y = -3;
plane.add(wings);

const wings1Geometry = new THREE.BoxGeometry(7, 0.1, 1.8);
const wings1 = new THREE.Mesh(wings1Geometry, planeMaterial);
wings1.position.y = 0.6;
wings1.position.z = 0.5;
wings1.position.x = 3;
wings1.rotation.y = 3;
plane.add(wings1);

// Cauda vertical
const tailVerticalGeometry = new THREE.BoxGeometry(0.1, 1.3, 0.5);
const tailVertical = new THREE.Mesh(tailVerticalGeometry, planeTailMaterial);
tailVertical.position.y = 1;
tailVertical.position.z = 3.5;
tailVertical.rotation.x = -3;
plane.add(tailVertical);

const textGeometry = new THREE.PlaneGeometry(0.4, 0.4);
const textTexture = new THREE.TextureLoader().load('boeing.png');
const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0.06, 0.1, 0);
textMesh.rotation.y = Math.PI / 2;
tailVertical.add(textMesh);

// Cauda horizontal
const tailHorizontalGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
const tailHorizontal = new THREE.Mesh(tailHorizontalGeometry, planeMaterial);
tailHorizontal.position.z = 3.5;
tailHorizontal.position.y = 0.5;
tailHorizontal.position.x = 0.6;
tailHorizontal.rotation.y = 3;
plane.add(tailHorizontal);

const tailHorizontal1Geometry = new THREE.BoxGeometry(2, 0.1, 0.5);
const tailHorizontal1 = new THREE.Mesh(tailHorizontal1Geometry, planeMaterial);
tailHorizontal1.position.z = 3.5;
tailHorizontal1.position.y = 0.5;
tailHorizontal1.position.x = -0.6;
tailHorizontal1.rotation.y = -3;
plane.add(tailHorizontal1);

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
propeller.position.set(1.5, 0.3, 0.3); // Posição original
plane.add(propeller);

// Propeller1 (fogo de partículas)
const propeller1 = new THREE.Points(fireGeometry, fireMaterial);
propeller1.position.set(-1.5, 0.3, 0.3); // Posição original
plane.add(propeller1);

// Propeller2 (fogo de partículas)
const propeller2 = new THREE.Points(fireGeometry, fireMaterial);
propeller2.position.set(3, 0.3,0.5); // Posição original
plane.add(propeller2);

// Propeller3 (fogo de partículas)
const propeller3 = new THREE.Points(fireGeometry, fireMaterial);
propeller3.position.set(-3, 0.3, 0.5); // Posição original
plane.add(propeller3);

// Luz emitida pelo fogo
const fireLight = new THREE.PointLight(0xff4500, 0.5, 5);
fireLight.position.set(1.5, 0.3, 0.3);
plane.add(fireLight);

const fireLight1 = new THREE.PointLight(0xff4500, 0.5, 5);
fireLight1.position.set(-1.5, 0.3, 0.3);
plane.add(fireLight1);

const fireLight2 = new THREE.PointLight(0xff4500, 0.5, 5);
fireLight2.position.set(3, 0.3, 0.5);
plane.add(fireLight2);

const fireLight3 = new THREE.PointLight(0xff4500, 0.5, 5);
fireLight3.position.set(-3, 0.3, 0.5);
plane.add(fireLight3);

// Trem de pouso
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

const mainGearSupportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.05);
const mainGearSupportGeometry12 = new THREE.BoxGeometry(0.05, 1.2, 0.05);

const leftGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
leftGearSupport.position.x = -0.2;
leftGearSupport.position.y = 0.2;
leftGearSupport.position.z = -0.5;
leftGearSupport.rotation.z = Math.PI / -12;
plane.add(leftGearSupport);
const leftGearSupport3 = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
leftGearSupport3.position.x = -0.2;
leftGearSupport3.position.y = 0.2;
leftGearSupport3.position.z = 0.5;
leftGearSupport3.rotation.z = Math.PI / -12;
plane.add(leftGearSupport3);

const rightGearSupport = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport.position.x = 0.2;
rightGearSupport.position.y = 0.2;
rightGearSupport.position.z = -0.5;
rightGearSupport.rotation.x = -Math.PI / -12;
plane.add(rightGearSupport);
const rightGearSupport3 = new THREE.Mesh(mainGearSupportGeometry, cabinMaterial);
rightGearSupport3.position.x = 0.2;
rightGearSupport3.position.y = 0.2;
rightGearSupport3.position.z = 0.5;
rightGearSupport3.rotation.z = -Math.PI / -12;
plane.add(rightGearSupport3);

const leftGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport1.position.x = 1.5;
leftGearSupport1.position.y = 0.60;
leftGearSupport1.position.z = 0.8;
leftGearSupport1.rotation.x = Math.PI / 2;
plane.add(leftGearSupport1);
const leftGearSupport2 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport2.position.x = 2.5;
leftGearSupport2.position.y = 0.60;
leftGearSupport2.position.z = 1;
leftGearSupport2.rotation.x = Math.PI / 2;
plane.add(leftGearSupport2);
const leftGearSupport4 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport4.position.x = 3.5;
leftGearSupport4.position.y = 0.60;
leftGearSupport4.position.z = 1.1;
leftGearSupport4.rotation.x = Math.PI / 2;
plane.add(leftGearSupport4);
const leftGearSupport5 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
leftGearSupport5.position.x = 4.5;
leftGearSupport5.position.y = 0.60;
leftGearSupport5.position.z = 1.2;
leftGearSupport5.rotation.x = Math.PI / 2;
plane.add(leftGearSupport5);

const rightGearSupport1 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport1.position.x = -1.5;
rightGearSupport1.position.y = 0.60;
rightGearSupport1.position.z = 0.8;
rightGearSupport1.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport1);
const rightGearSupport2 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport2.position.x = -2.5;
rightGearSupport2.position.y = 0.60;
rightGearSupport2.position.z = 1;
rightGearSupport2.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport2);
const rightGearSupport4 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport4.position.x = -3.5;
rightGearSupport4.position.y = 0.60;
rightGearSupport4.position.z = 1.1;
rightGearSupport4.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport4);
const rightGearSupport5 = new THREE.Mesh(mainGearSupportGeometry12, cabinMaterial);
rightGearSupport5.position.x = -4.5;
rightGearSupport5.position.y = 0.60;
rightGearSupport5.position.z = 1.2;
rightGearSupport5.rotation.x = -Math.PI / 2;
plane.add(rightGearSupport5);

const mainWheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);

const leftWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel.rotation.x = Math.PI / 2;
leftWheel.rotation.z = Math.PI / 2;
leftWheel.position.x = -0.25;
leftWheel.position.y = -0.1;
leftWheel.position.z = -0.5;
plane.add(leftWheel);
const leftWheel1 = new THREE.Mesh(mainWheelGeometry, gearMaterial);
leftWheel1.rotation.x = Math.PI / 2;
leftWheel1.rotation.z = Math.PI / 2;
leftWheel1.position.x = -0.25;
leftWheel1.position.y = -0.1;
leftWheel1.position.z = 0.5;
plane.add(leftWheel1);

const rightWheel = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel.rotation.x = Math.PI / 2;
rightWheel.rotation.z = Math.PI / 2;
rightWheel.position.x = 0.25;
rightWheel.position.y = -0.1;
rightWheel.position.z = -0.5;
plane.add(rightWheel);
const rightWheel1 = new THREE.Mesh(mainWheelGeometry, gearMaterial);
rightWheel1.rotation.x = Math.PI / 2;
rightWheel1.rotation.z = Math.PI / 2;
rightWheel1.position.x = 0.25;
rightWheel1.position.y = -0.1;
rightWheel1.position.z = 0.5;
plane.add(rightWheel1);

// Cabine em forma de cilindro
const cabinGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2, 20);
const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
cabin.rotation.x = Math.PI / 2;
cabin.position.y = 0.70;
cabin.position.z = -1.25;
plane.add(cabin);

// Motores
const motorGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 10);
const motor = new THREE.Mesh(motorGeometry, motorMaterial);
motor.rotation.x = Math.PI / 2;
motor.position.y = 0.3;
motor.position.z = -0.5;
motor.position.x = -1.5;
plane.add(motor);

const motor2 = new THREE.Mesh(motorGeometry, motorMaterial);
motor2.rotation.x = Math.PI / 2;
motor2.position.y = 0.3;
motor2.position.z = -0.2;
motor2.position.x = -3;
plane.add(motor2);

const motor1 = new THREE.Mesh(motorGeometry, motorMaterial);
motor1.rotation.x = Math.PI / 2;
motor1.position.y = 0.3;
motor1.position.z = -0.5;
motor1.position.x = 1.5;
plane.add(motor1);

const motor3 = new THREE.Mesh(motorGeometry, motorMaterial);
motor3.rotation.x = Math.PI / 2;
motor3.position.y = 0.3;
motor3.position.z = -0.2;
motor3.position.x = 3;
plane.add(motor3);

// Posicionar o avião na pista
plane.position.set(0, 0, 2);
scene.add(plane);

// Sombra
const shadowGeometry = new THREE.CircleGeometry(3.5, 32);
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
const maxSpeed = 1.5;
const acceleration = 0.0022;
const friction = 0.0022;
const gravity = 0.2;
const crashGravity = 0.9;
const liftThreshold = 0.60;
let isAccelerating = false;
let isCrashed = false;
let crashTimer = 0;
const crashDuration = 1;
let pitchAngle = 0;
const maxPitchAngle = Math.PI / 4;
const maxAltitude = 350;
const liftFactor = 0.7;
const pitchSpeed = 0.04;
const baseVerticalSpeedUp = 0.050;
const speedFactor = 0.15;
const ai = 0.8;
const baseRotationSpeed = 0.01;
const inclinaBoing = -0.3;
const inclinaBoing2 = 0.3;
const inclina = -0.8;
const inclina2 = 0.8;

// Função de animação para o fogo
function animateFire() {
    const positions = propeller.geometry.attributes.position.array;
    const positions1 = propeller1.geometry.attributes.position.array;
    const positions2 = propeller2.geometry.attributes.position.array;
    const positions3 = propeller3.geometry.attributes.position.array;

    for (let i = 0; i < 100; i++) {
        // Movimenta as partículas na direção z (para trás)
        positions[i * 3 + 2] -= 0.02;  // propeller
        positions1[i * 3 + 2] -= 0.02; // propeller1
        positions2[i * 3 + 2] -= 0.02; // propeller2
        positions3[i * 3 + 2] -= 0.02; // propeller3

        // Se a partícula ultrapassar o limite, reposiciona no início
        if (positions[i * 3 + 2] < -0.5) {
            positions[i * 3] = (Math.random() - 0.5) * 0.3;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3; // y
            positions[i * 3 + 2] = 0.5;                         // z
        }
        if (positions1[i * 3 + 2] < -0.5) {
            positions1[i * 3] = (Math.random() - 0.5) * 0.3;
            positions1[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
            positions1[i * 3 + 2] = 0.5;
        }
        if (positions2[i * 3 + 2] < -0.5) {
            positions2[i * 3] = (Math.random() - 0.5) * 0.3;
            positions2[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
            positions2[i * 3 + 2] = 0.5;
        }
        if (positions3[i * 3 + 2] < -0.5) {
            positions3[i * 3] = (Math.random() - 0.5) * 0.3;
            positions3[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
            positions3[i * 3 + 2] = 0.5;
        }
    }

    propeller.geometry.attributes.position.needsUpdate = true;
    propeller1.geometry.attributes.position.needsUpdate = true;
    propeller2.geometry.attributes.position.needsUpdate = true;
    propeller3.geometry.attributes.position.needsUpdate = true;
}

// Exportar elementos necessários
export { plane, motor, body3, propeller, propeller1, propeller2, propeller3, shadow, planeBox, speed, velocity, maxSpeed, acceleration, friction, gravity, crashGravity, liftThreshold, isAccelerating, isCrashed, crashTimer, crashDuration, pitchAngle, maxPitchAngle, maxAltitude, liftFactor, pitchSpeed, baseVerticalSpeedUp, baseRotationSpeed, inclinaBoing2, inclinaBoing, inclina2, body2, inclina, speedFactor, vidro, sphere1, sphereGeometry, ai, animateFire, setSpeed, setVelocity, setIsAccelerating, setIsCrashed, setCrashTimer, setPitchAngle };

function setSpeed(value) { speed = value; }
function setVelocity(value) { velocity = value; }
function setIsAccelerating(value) { isAccelerating = value; }
function setIsCrashed(value) { isCrashed = value; }
function setCrashTimer(value) { crashTimer = value; }
function setPitchAngle(value) { pitchAngle = value; }