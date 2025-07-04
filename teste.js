// Importa elementos essenciais do arquivo scene.js, como a cena, câmera, renderizador e nuvens
import { scene, camera, renderer, clouds } from './scene.js';
// Importa os prédios do jogo (usados para colisão) do arquivo buildings.js
import { buildings } from './buildings.js';

// Variável global que armazena o módulo do avião atualmente carregado
let currentPlaneModule = null;

// --- FUNÇÕES DE MANIPULAÇÃO DE COOKIES ---
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// --- FUNÇÃO PRINCIPAL PARA CARREGAR AVIÕES ---
async function loadPlane(planeFile) {
    if (currentPlaneModule) {
        scene.remove(currentPlaneModule.plane);
        scene.remove(currentPlaneModule.shadow);
    }
    currentPlaneModule = await import(`./${planeFile}`);
    scene.add(currentPlaneModule.plane);
    scene.add(currentPlaneModule.shadow);
    setCookie('selectedPlane', planeFile, 30);
    resetGame();
    camera.position.set(0, 5, 10);
    camera.lookAt(currentPlaneModule.plane.position);
}

// --- INICIALIZAÇÃO DO JOGO ---
const savedPlane = getCookie('selectedPlane');
loadPlane(savedPlane || 'plane.js');

// --- VARIÁVEIS DE CONTROLE ---
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.015;

// Variável para rastrear o modo da câmera
let isCameraBehind = false; // Padrão: perspectiva fixa

// --- EVENTOS DE TECLADO ---
document.addEventListener('keydown', (event) => {
    if (!currentPlaneModule) return;
    switch (event.key) {
        case 'w': keys.w = true; break;
        case 's': keys.s = true; break;
        case 'a': keys.a = true; break;
        case 'd': keys.d = true; break;
        case ' ': currentPlaneModule.setIsAccelerating(true); break;
    }
});

document.addEventListener('keyup', (event) => {
    if (!currentPlaneModule) return;
    switch (event.key) {
        case 'w': keys.w = false; break;
        case 's': keys.s = false; break;
        case 'a': keys.a = false; break;
        case 'd': keys.d = false; break;
        case ' ': currentPlaneModule.setIsAccelerating(false); break;
    }
});

// --- FUNÇÃO DE COLISÃO ---
function checkCollision(box1, box2) {
    return box1.intersectsBox(box2);
}

// --- FUNÇÃO DE REINÍCIO DO JOGO ---
function resetGame() {
    if (!currentPlaneModule) return;
    currentPlaneModule.plane.position.set(0, 0, 2);
    currentPlaneModule.plane.rotation.set(0, 0, 0);
    currentPlaneModule.setSpeed(0);
    currentPlaneModule.setVelocity(0);
    currentPlaneModule.setIsCrashed(false);
    currentPlaneModule.setCrashTimer(0);
    currentPlaneModule.setPitchAngle(0);
    keys = { w: false, s: false, a: false, d: false };
    currentPlaneModule.setIsAccelerating(false);
    renderer.domElement.style.filter = 'none';
    renderer.render(scene, position);
}

// --- FUNÇÃO PARA ATUALIZAR A CÂMERA ---
function updateCamera() {
    if (isCameraBehind) {
        // Perspectiva atrás do avião
        const distanceBehind = 10;
        const heightOffset = 5;
        const yaw = currentPlaneModule.plane.rotation.y;

        const cameraOffsetX = +Math.sin(yaw) * distanceBehind;
        const cameraOffsetZ = +Math.cos(yaw) * distanceBehind;

        camera.position.set(
            currentPlaneModule.plane.position.x + cameraOffsetX,
            currentPlaneModule.plane.position.y + heightOffset,
            currentPlaneModule.plane.position.z + cameraOffsetZ
        );
    } else {
        // Perspectiva fixa
        camera.position.set(
            currentPlaneModule.plane.position.x,
            currentPlaneModule.plane.position.y + 5,
            currentPlaneModule.plane.position.z + 10
        );
    }
    camera.lookAt(currentPlaneModule.plane.position);
}

// --- FUNÇÃO DE ANIMAÇÃO ---
function animate() {
    requestAnimationFrame(animate);
    if (!currentPlaneModule) return;

    currentPlaneModule.propeller.rotation.z += 0.2 + currentPlaneModule.speed;

    currentPlaneModule.propeller1.rotation.z += 0.2 + currentPlaneModule.speed;

    currentPlaneModule.propeller2.rotation.z += 0.2 + currentPlaneModule.speed;

    currentPlaneModule.propeller3.rotation.z += 0.2 + currentPlaneModule.speed;

    // Controla a aceleração e desaceleração do avião
    if (currentPlaneModule.isAccelerating && currentPlaneModule.speed < currentPlaneModule.maxSpeed && !currentPlaneModule.isCrashed) {
        currentPlaneModule.setVelocity(currentPlaneModule.velocity + currentPlaneModule.acceleration);
    } else if (!currentPlaneModule.isAccelerating && currentPlaneModule.velocity > 0 && !currentPlaneModule.isCrashed) {
        currentPlaneModule.setVelocity(currentPlaneModule.velocity - currentPlaneModule.friction);
    }
    if (currentPlaneModule.velocity < 0) currentPlaneModule.setVelocity(0);
    currentPlaneModule.setSpeed(currentPlaneModule.velocity);

    const speedMultiplier = Math.min(currentPlaneModule.speed / currentPlaneModule.maxSpeed, 1) * currentPlaneModule.speedFactor;
    const smoothFactor = 0.1;
    let targetRoll = 0;
    let targetYaw = currentPlaneModule.plane.rotation.y;
    const rotationSpeed = baseRotationSpeed + (baseRotationSpeed * speedMultiplier);

    if (currentPlaneModule.velocity > 0.01) {
        if (keys.a) {
            currentPlaneModule.plane.rotation.y += rotationSpeed;
            targetYaw += rotationSpeed;
            if (currentPlaneModule.velocity > 0.3) targetRoll = currentPlaneModule.inclinaBoing2 || 0.5;
            if (currentPlaneModule.velocity > 1.4) targetRoll = currentPlaneModule.inclina2 || 0.5;
        }
        if (keys.d) {
            currentPlaneModule.plane.rotation.y -= rotationSpeed;
            targetYaw -= rotationSpeed;
            if (currentPlaneModule.velocity > 0.3) targetRoll = currentPlaneModule.inclinaBoing ||-0.5;
            if (currentPlaneModule.velocity > 1.4) targetRoll = currentPlaneModule.inclina || -0.5;
        }
    }
    currentPlaneModule.plane.rotation.y += (targetYaw - currentPlaneModule.plane.rotation.y) * smoothFactor;
    currentPlaneModule.plane.rotation.z += (targetRoll - currentPlaneModule.plane.rotation.z) * smoothFactor;

    const directionX = Math.sin(currentPlaneModule.plane.rotation.y);
    const directionZ = Math.cos(currentPlaneModule.plane.rotation.y);
    const newX = currentPlaneModule.plane.position.x - directionX * currentPlaneModule.speed;
    const newZ = currentPlaneModule.plane.position.z - directionZ * currentPlaneModule.speed;
    
    let newY = currentPlaneModule.plane.position.y;
    let verticalSpeed = 0;

    if (!currentPlaneModule.isCrashed) {
        // Subida proporcional à velocidade quando a tecla W é pressionada
        if (currentPlaneModule.velocity > 0.01) {
            if (keys.w && speed > liftThreshold && plane.position.y < maxAltitude) {
                currentPlaneModule.plane.verticalSpeed.y += rotationSpeed;
                targetYaw += baseVerticalSpeedUp;
              
            }
            if (keys.s) {
                currentPlaneModule.plane.rotation.y -= rotationSpeed;
                targetYaw -= rotationSpeed;
                if (currentPlaneModule.velocity > 0.3) targetRoll = currentPlaneModule.inclinaBoing ||-0.5;
                if (currentPlaneModule.velocity > 1.4) targetRoll = currentPlaneModule.inclina || -0.5;
            }
        }
     
        if (newY > currentPlaneModule.maxAltitude) newY = currentPlaneModule.maxAltitude;
        if (newY < 0.1) newY = 0.1;
    } else {
        if (currentPlaneModule.plane.position.y > 0.1) {
            newY -= currentPlaneModule.crashGravity;
            currentPlaneModule.setPitchAngle(currentPlaneModule.maxPitchAngle);
            currentPlaneModule.plane.rotation.x = currentPlaneModule.pitchAngle;
        }
        currentPlaneModule.setCrashTimer(currentPlaneModule.crashTimer + 1 / 15);
        if (currentPlaneModule.crashTimer >= currentPlaneModule.crashDuration) {
            if (currentPlaneModule.crashTimer >= currentPlaneModule.crashDuration + 4) {
                resetGame();
            } else if (currentPlaneModule.crashTimer >= currentPlaneModule.crashDuration) {
                const blurProgress = (currentPlaneModule.crashTimer - currentPlaneModule.crashDuration) / 2;
                const blurAmount = blurProgress * 5;
                renderer.domElement.style.filter = `blur(${blurAmount}px)`;
            }
        }
    }

    const planeBoxProposed = currentPlaneModule.planeBox.clone();
    planeBoxProposed.translate(new THREE.Vector3(newX - currentPlaneModule.plane.position.x, newY - currentPlaneModule.plane.position.y, newZ - currentPlaneModule.plane.position.z));
    let collisionDetected = false;
    for (const building of buildings) {
        if (checkCollision(planeBoxProposed, building.boundingBox)) {
            collisionDetected = true;
            if (!currentPlaneModule.isCrashed) {
                currentPlaneModule.setIsCrashed(true);
                currentPlaneModule.setCrashTimer(0);
                currentPlaneModule.setSpeed(0);
                currentPlaneModule.setVelocity(0);
            }
            break;
        }
    }

    if (!collisionDetected || !currentPlaneModule.isCrashed) {
        currentPlaneModule.plane.position.x = newX;
        currentPlaneModule.plane.position.z = newZ;
        currentPlaneModule.plane.position.y = newY;
    } else if (currentPlaneModule.isCrashed) {
        currentPlaneModule.plane.position.y = newY;
        currentPlaneModule.setSpeed(0);
        currentPlaneModule.setVelocity(0);
    }

    currentPlaneModule.shadow.position.x = currentPlaneModule.plane.position.x;
    currentPlaneModule.shadow.position.z = currentPlaneModule.plane.position.z;
    const height = currentPlaneModule.plane.position.y - 0.1;
    const shadowScale = Math.max(0.2, 1 - height / 100);
    currentPlaneModule.shadow.scale.set(shadowScale, shadowScale, 1);
    currentPlaneModule.shadow.material.opacity = Math.max(0.1, 0.5 - height / 20);

    currentPlaneModule.planeBox.setFromObject(currentPlaneModule.plane);

    clouds.forEach(cloud => {
        cloud.position.x += 0.01;
        if (cloud.position.x > 100) cloud.position.x = -100;
    });

    // Substitui a lógica fixa da câmera pela função updateCamera
    updateCamera();

    const altitudeDisplay = document.getElementById('altitude');
    const speedDisplay = document.getElementById('speed');
    altitudeDisplay.textContent = ((currentPlaneModule.plane.position.y - 0.1) * 4).toFixed(1);
    speedDisplay.textContent = (currentPlaneModule.speed * 450).toFixed(1);

    renderer.render(scene, camera);
}

animate();

// --- AJUSTE DE TELA ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- CONTROLES MOBILE ---
function ajustarControlesMobile() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const controles = document.querySelector(".mobile-controls");
    const botoes = document.querySelectorAll(".mobile-controls button");
    const acelerador = document.getElementById("accelerator-btn");

    if (altura > largura) {
        controles.style.display = "flex";
        camera.fov = 115;
    } else {
        controles.style.display = "none";
        camera.fov = 85;
    }
    camera.updateProjectionMatrix();

    if (largura > 500) {
        botoes.forEach(botao => {
            botao.style.width = "120px";
            botao.style.height = "120px";
            botao.style.fontSize = "30px";
        });
        acelerador.style.width = "160px";
        acelerador.style.height = "110px";
    } else {
        botoes.forEach(botao => {
            botao.style.width = "60px";
            botao.style.height = "60px";
            botao.style.fontSize = "18px";
        });
        acelerador.style.width = "100px";
        acelerador.style.height = "60px";
    }
}

window.addEventListener("load", ajustarControlesMobile);
window.addEventListener("resize", ajustarControlesMobile);

const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const downBtn = document.getElementById('down-btn');
const acceleratorBtn = document.getElementById('accelerator-btn');

function setKey(key, value) {
    keys[key] = value;
}

function addButtonEvents(button, keyOrAction, isKey = true) {
    const startEvent = (e) => {
        e.preventDefault();
        if (!currentPlaneModule) return;
        if (isKey) setKey(keyOrAction, true);
        else currentPlaneModule.setIsAccelerating(true);
        button.style.background = 'rgba(83, 85, 237, 0.8)';
    };
    
    const endEvent = (e) => {
        e.preventDefault();
        if (!currentPlaneModule) return;
        if (isKey) setKey(keyOrAction, false);
        else currentPlaneModule.setIsAccelerating(false);
        button.style.background = 'rgba(255, 255, 255, 0.36)';
    };

    button.addEventListener('mousedown', startEvent);
    button.addEventListener('touchstart', startEvent);
    button.addEventListener('mouseup', endEvent);
    button.addEventListener('touchend', endEvent);
    button.addEventListener('touchcancel', endEvent);
}

addButtonEvents(upBtn, 'w');
addButtonEvents(leftBtn, 'a');
addButtonEvents(rightBtn, 'd');
addButtonEvents(downBtn, 's');
addButtonEvents(acceleratorBtn, null, false);

// Adiciona o evento do botão de alternância da câmera
const cameraToggleBtn = document.getElementById('camera-toggle-btn');
cameraToggleBtn.addEventListener('click', () => {
    isCameraBehind = !isCameraBehind; // Alterna o estado da câmera
    cameraToggleBtn.classList.toggle('active'); // Alterna a classe para mudar a cor
});

window.loadPlane = loadPlane;