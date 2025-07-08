import { scene, camera, renderer, clouds } from './scene.js';
import { buildings } from './buildings.js';
// Importe as missões do novo arquivo
import { missions } from './missions.js';

// Configurar o ouvinte de áudio global
const listener = new THREE.AudioListener();
camera.add(listener);

// Variável global que armazena o módulo do avião atualmente carregado
let currentPlaneModule = null;
// --- ESTADO DA MISSÃO ---
let currentMission = null;
let missionObjects = [];
let score = 0;
let collectedCount = 0;
let missionActive = false;

// --- SONS PARA EVENTOS DE MISSÃO E MÚSICA DE FUNDO ---
const audioLoader = new THREE.AudioLoader();
let correctSound, wrongSound, missionCompleteSound;
let backgroundMusic; // Variável para a música de fundo

// Carregar os sons e música
audioLoader.load('correct.mp3', function(buffer) {
    correctSound = new THREE.Audio(listener);
    correctSound.setBuffer(buffer);
    correctSound.setVolume(0.3);
});

audioLoader.load('wrong.mp3', function(buffer) {
    wrongSound = new THREE.Audio(listener);
    wrongSound.setBuffer(buffer);
    wrongSound.setVolume(2);
});

audioLoader.load('mission_complete.mp3', function(buffer) {
    missionCompleteSound = new THREE.Audio(listener);
    missionCompleteSound.setBuffer(buffer);
    missionCompleteSound.setVolume(1);
});

// Carregar e tocar música de fundo em loop
audioLoader.load('background-music.mp3', function(buffer) {
    backgroundMusic = new THREE.Audio(listener);
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true); // Repetir continuamente
    backgroundMusic.setVolume(0.2); // Volume ajustável
    backgroundMusic.play(); // Iniciar a reprodução
});


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

// --- FUNÇÃO DE DELAY ---
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- FUNÇÃO PRINCIPAL PARA CARREGAR AVIÕES ---
async function loadPlane(planeFile) {
    if (currentPlaneModule) {
        const currentSound = currentPlaneModule.plane.userData.sound;
        if (currentSound) {
            if (currentSound.isPlaying) {
                currentSound.stop();
            }
            currentSound.disconnect();
        }
        scene.remove(currentPlaneModule.plane);
        scene.remove(currentPlaneModule.shadow);
        currentPlaneModule = null;
    }

    // Carregar o novo avião
    try {
        currentPlaneModule = await import(`./${planeFile}`);
        scene.add(currentPlaneModule.plane);
        scene.add(currentPlaneModule.shadow);

        // Ocultar a div "no-plane-selected"
        const noPlaneDiv = document.getElementById('no-plane-selected');
        if (noPlaneDiv) {
            noPlaneDiv.style.display = 'none';
        }

        setCookie('selectedPlane', planeFile, 30);
        resetGame();
        camera.position.set(0, 5, 10);
        camera.lookAt(currentPlaneModule.plane.position);

        // Adicionar delay antes de tocar o som
        const planeSound = currentPlaneModule.plane.userData.sound;
        if (planeSound) {
            if (!planeSound.buffer) {
                console.warn(`Sound buffer not loaded for ${planeFile}. Waiting for load...`);
                planeSound.onAudioReady = async () => {
                    await sleep(1000);
                    if (!planeSound.isPlaying) planeSound.play();
                };
            } else if (!planeSound.isPlaying) {
                await sleep(1000);
                planeSound.play();
            }
        } else {
            console.warn(`No sound defined for plane in ${planeFile}`);
        }
    } catch (error) {
        console.error(`Failed to load plane ${planeFile}:`, error);
    }
}

async function startMission(missionId) {
    // Limpar objetos da missão anterior
    missionObjects.forEach(obj => scene.remove(obj));
    missionObjects = [];

    // Encontrar a missão pelo ID
    currentMission = missions[missionId]; // Agora usando índice direto
    
    if (!currentMission) {
        console.error(`Missão com ID ${missionId} não encontrada.`);
        return;
    }

    missionActive = true;
    score = 0;
    collectedCount = 0;

    // Carregar o avião específico da missão
    await loadPlane(currentMission.plane);

    // Gerar e adicionar os objetos da missão à cena
    missionObjects = currentMission.itemGenerator();
    missionObjects.forEach(obj => scene.add(obj));

    // Atualizar a interface
    document.getElementById('no-plane-selected').style.display = 'none';
    document.getElementById('mission-hud').style.display = 'block';
    document.getElementById('mission-title').textContent = currentMission.title;
    document.getElementById('mission-description').textContent = currentMission.description;
    document.getElementById('mission-target').textContent = currentMission.targetCount;
    updateMissionHUD();
}

// Disponibilizar a função globalmente para ser chamada pelo HTML
window.startMission = startMission;

// --- NOVA FUNÇÃO PARA ATUALIZAR O HUD DA MISSÃO ---
function updateMissionHUD() {
    if (!missionActive) return;
    document.getElementById('mission-score').textContent = score;
    document.getElementById('mission-collected').textContent = collectedCount;
}

// --- INICIALIZAÇÃO DO JOGO ---
const savedPlane = getCookie('selectedPlane');
if (savedPlane) {
    
}

// --- VARIÁVEIS DE CONTROLE ---
let keys = { w: false, s: false, a: false, d: false };
const baseRotationSpeed = 0.015;

// Variável para rastrear o modo da câmera
let isCameraBehind = true;

// --- EVENTOS DE TECLADO ---
document.addEventListener('keydown', (event) => {
    if (!currentPlaneModule) return;
    
    // Converter a tecla para minúscula para funcionar com Caps Lock ativado
    const key = event.key.toLowerCase();
    
    switch (key) {
        case 'w': keys.w = true; break;
        case 's': keys.s = true; break;
        case 'a': keys.a = true; break;
        case 'd': keys.d = true; break;
        case ' ': currentPlaneModule.setIsAccelerating(true); break;
    }
});

document.addEventListener('keyup', (event) => {
    if (!currentPlaneModule) return;
    
    // Converter a tecla para minúscula para funcionar com Caps Lock ativado
    const key = event.key.toLowerCase();
    
    switch (key) {
        case 'w': keys.w = false; break;
        case 's': keys.s = false; break;
        case 'a': keys.a = false; break;
        case 'd': keys.d = false; break;
        case ' ': currentPlaneModule.setIsAccelerating(false); break;
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
    const planeSound = currentPlaneModule.plane.userData.sound;
    if (planeSound && planeSound.isPlaying) {
        planeSound.stop();
    }
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
    renderer.render(scene, camera);
    
    // Se uma missão estava ativa, reinicia ela
    if (missionActive && currentMission) {
        startMission(currentMission.id);
    } else {
        // Se não, esconde o HUD da missão
        missionActive = false;
        document.getElementById('mission-hud').style.display = 'none';
        document.getElementById('no-plane-selected').style.display = 'block';
    }
}

// --- FUNÇÃO PARA ATUALIZAR A CÂMERA ---
function updateCamera() {
    if (!currentPlaneModule) return;
    
    if (isCameraBehind) {
        // Modo atrás do avião
        const distanceBehind = 10;
        const heightOffset = 5;
        const yaw = currentPlaneModule.plane.rotation.y;

        const cameraOffsetX = Math.sin(yaw) * distanceBehind;
        const cameraOffsetZ = Math.cos(yaw) * distanceBehind;

        camera.position.set(
            currentPlaneModule.plane.position.x + cameraOffsetX,
            currentPlaneModule.plane.position.y + heightOffset,
            currentPlaneModule.plane.position.z + cameraOffsetZ
        );
    } else {
        // Modo de câmera livre (fixa)
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
    
    // Se nenhum avião estiver carregado, não faz nada.
    if (!currentPlaneModule) {
        renderer.render(scene, camera);
        return;
    }
    
    // Controle do som
    const planeSound = currentPlaneModule.plane.userData.sound;
    if (planeSound) {
        if (!currentPlaneModule.isCrashed) {
            if (!planeSound.isPlaying && planeSound.buffer) {
                planeSound.play();
            }
            const speedRatio = currentPlaneModule.speed / currentPlaneModule.maxSpeed * 5;
            const minPitch = 0.5;
            const maxPitch = 1.5;
            const pitch = minPitch + (maxPitch - minPitch) * speedRatio;
            planeSound.setPlaybackRate(pitch);

            const minVolume = 0.2;
            const maxVolume = 0.18;
            const volume = minVolume + (maxVolume - minVolume) * speedRatio;
            planeSound.setVolume(volume);
        } else if (planeSound.isPlaying) {
            planeSound.stop();
        }
    }

    currentPlaneModule.propeller.rotation.z += 0.2 + currentPlaneModule.speed;
    currentPlaneModule.propeller1.rotation.z += 0.2 + currentPlaneModule.speed;
    currentPlaneModule.propeller2.rotation.z += 0.2 + currentPlaneModule.speed;
    currentPlaneModule.propeller3.rotation.z += 0.2 + currentPlaneModule.speed;

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
            if (currentPlaneModule.velocity > 0.3) targetRoll = currentPlaneModule.inclinaBoing || -0.5;
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
    const pitchMultiplier = 5;

    if (!currentPlaneModule.isCrashed) {
        if (keys.s && currentPlaneModule.speed > currentPlaneModule.liftThreshold && currentPlaneModule.plane.position.y < currentPlaneModule.maxAltitude) {
            verticalSpeed = currentPlaneModule.baseVerticalSpeedUp + (currentPlaneModule.baseVerticalSpeedUp * speedMultiplier);
            newY += verticalSpeed + currentPlaneModule.speed * 0.1;
            const targetPitch = verticalSpeed * pitchMultiplier;
            currentPlaneModule.setPitchAngle(
                currentPlaneModule.pitchAngle + (targetPitch - currentPlaneModule.pitchAngle) * currentPlaneModule.pitchSpeed
            );
        } else if (keys.w && currentPlaneModule.plane.position.y > 0.1) {
            verticalSpeed = -0.1;
            newY += verticalSpeed - currentPlaneModule.speed * 0.1;
            const targetPitch = verticalSpeed * pitchMultiplier;
            currentPlaneModule.setPitchAngle(
                currentPlaneModule.pitchAngle + (targetPitch - currentPlaneModule.pitchAngle) * currentPlaneModule.pitchSpeed
            );
        } else {
            const targetPitch = 0;
            currentPlaneModule.setPitchAngle(
                currentPlaneModule.pitchAngle + (targetPitch - currentPlaneModule.pitchAngle) * currentPlaneModule.pitchSpeed
            );
        }

        if (keys.w && currentPlaneModule.plane.position.y <= 0.1 && currentPlaneModule.velocity > 0) {
            const brakeDeceleration = 0.005;
            currentPlaneModule.setVelocity(currentPlaneModule.velocity - brakeDeceleration);
            if (currentPlaneModule.velocity < 0) currentPlaneModule.setVelocity(0);
            currentPlaneModule.setSpeed(currentPlaneModule.velocity);
        }
        if (currentPlaneModule.speed < currentPlaneModule.liftThreshold && currentPlaneModule.plane.position.y > 0.1) {
            verticalSpeed = currentPlaneModule.speed === 0 ? -currentPlaneModule.gravity * 5 : -currentPlaneModule.gravity;
            newY += verticalSpeed;
            const targetPitch = verticalSpeed * pitchMultiplier;
            currentPlaneModule.setPitchAngle(
                currentPlaneModule.pitchAngle + (targetPitch - currentPlaneModule.pitchAngle) * currentPlaneModule.pitchSpeed
            );
        }

        currentPlaneModule.setPitchAngle(
            Math.max(-currentPlaneModule.maxPitchAngle, Math.min(currentPlaneModule.maxPitchAngle, currentPlaneModule.pitchAngle))
        );

        currentPlaneModule.plane.rotation.order = 'YXZ';
        currentPlaneModule.plane.rotation.x = currentPlaneModule.pitchAngle;

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
    
    // --- ATUALIZAR CÂMERA A CADA FRAME ---
    updateCamera();

    // --- LÓGICA DE COLISÃO COM OBJETOS DA MISSÃO ---
    if (missionActive) {
        const planeBox = currentPlaneModule.planeBox.clone().setFromObject(currentPlaneModule.plane);
        
        for (let i = missionObjects.length - 1; i >= 0; i--) {
            const missionObj = missionObjects[i];
            missionObj.boundingBox.setFromObject(missionObj);

            if (planeBox.intersectsBox(missionObj.boundingBox)) {
                if (missionObj.userData.isCorrect) {
                    // Tocar som de acerto
                    if (correctSound) {
                        correctSound.play();
                    }
                    score += 10;
                    collectedCount++;
                } else {
                    // Tocar som de erro
                    if (wrongSound) {
                        wrongSound.play();
                    }
                    score -= 5;
                }
                
                scene.remove(missionObj);
                missionObjects.splice(i, 1);
                
                updateMissionHUD();
                
                if (collectedCount >= currentMission.targetCount) {
                    missionActive = false;
                    // Tocar som de missão completa
                    if (missionCompleteSound) {
                        missionCompleteSound.play();
                    }
                    alert(`Parabéns! Você completou a '${currentMission.title}' com ${score} pontos!`);
                    document.getElementById('mission-hud').style.display = 'none';
                    document.getElementById('no-plane-selected').innerHTML = `<h1>Missão Concluída!</h1> <p>Selecione a próxima.</p>`;
                    document.getElementById('no-plane-selected').style.display = 'block';
                }
                break;
            }
        }
    }

    const altitudeDisplay = document.getElementById('altitude');
    const speedDisplay = document.getElementById('speed');
    if (altitudeDisplay) altitudeDisplay.textContent = ((currentPlaneModule.plane.position.y - 0.1) * 8).toFixed(1);
    if (speedDisplay) speedDisplay.textContent = (currentPlaneModule.speed * 450).toFixed(1);

    renderer.render(scene, camera);
}

animate();

// --- AJUSTE DE TELA ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- CONTROLES MOBILE COM JOYSTICK ---
function ajustarControlesMobile() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const controles = document.querySelector(".mobile-controls");
    const acelerador = document.getElementById("accelerator-btn");

    if (controles) {
        if (altura > largura) {
            controles.style.display = "flex";
            camera.fov = 115;
        } else {
            controles.style.display = "none";
            camera.fov = 85;
        }
    }
    camera.updateProjectionMatrix();

    if (acelerador) {
        if (largura > 500) {
            acelerador.style.width = "160px";
            acelerador.style.height = "110px";
            acelerador.style.fontSize = "30px";
        } else {
            acelerador.style.width = "100px";
            acelerador.style.height = "60px";
            acelerador.style.fontSize = "18px";
        }
    }
}

window.addEventListener("load", ajustarControlesMobile);
window.addEventListener("resize", ajustarControlesMobile);

// --- LÓGICA DO JOYSTICK ---
const joystickContainer = document.getElementById('joystick-container');
const joystick = document.getElementById('joystick');
let isDragging = false;
let activeTouchId = null;

function handleJoystickStart(event) {
    event.preventDefault();
    if (!currentPlaneModule || isDragging) return;

    let touch;
    if (event.type === 'touchstart') {
        touch = Array.from(event.touches).find(t => joystickContainer.contains(document.elementFromPoint(t.clientX, t.clientY)));
        if (!touch) return;
        activeTouchId = touch.identifier;
    } else {
        touch = event;
    }

    isDragging = true;
    if (joystick) joystick.style.background = 'rgba(83, 85, 237, 0.8)';
    handleJoystickMove(event);
}

function handleJoystickMove(event) {
    if (!isDragging || !currentPlaneModule) return;

    let touch;
    if (event.type === 'touchmove') {
        touch = Array.from(event.touches).find(t => t.identifier === activeTouchId);
        if (!touch) return;
    } else {
        touch = event;
    }

    const rect = joystickContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let offsetX = touch.clientX - centerX;
    let offsetY = touch.clientY - centerY;

    const radius = rect.width / 2 - (joystick ? joystick.offsetWidth / 2 : 0);
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    if (distance > radius) {
        const angle = Math.atan2(offsetY, offsetX);
        offsetX = Math.cos(angle) * radius;
        offsetY = Math.sin(angle) * radius;
    }

    if (joystick) {
        joystick.style.left = `calc(50% + ${offsetX}px)`;
        joystick.style.top = `calc(50% + ${offsetY}px)`;
    }

    const normalizedX = offsetX / radius;
    const normalizedY = offsetY / radius;

    keys.a = normalizedX < -0.3;
    keys.d = normalizedX > 0.3;
    keys.w = normalizedY < -0.3;
    keys.s = normalizedY > 0.3;
}

function handleJoystickEnd(event) {
    if (!isDragging || !currentPlaneModule) return;

    if (event.type === 'touchend' || event.type === 'touchcancel') {
        const touch = Array.from(event.changedTouches).find(t => t.identifier === activeTouchId);
        if (!touch) return;
    }

    isDragging = false;
    activeTouchId = null;
    if (joystick) {
        joystick.style.left = '50%';
        joystick.style.top = '50%';
        joystick.style.background = 'rgba(255, 255, 255, 0.36)';
    }
    keys.w = false;
    keys.s = false;
    keys.a = false;
    keys.d = false;
}

if (joystickContainer) {
    joystickContainer.addEventListener('mousedown', handleJoystickStart);
    joystickContainer.addEventListener('touchstart', handleJoystickStart);
}
document.addEventListener('mousemove', handleJoystickMove);
document.addEventListener('touchmove', handleJoystickMove, { passive: false });
document.addEventListener('mouseup', handleJoystickEnd);
document.addEventListener('touchend', handleJoystickEnd);
document.addEventListener('touchcancel', handleJoystickEnd);

// --- EVENTOS DO ACELERADOR ---
const acceleratorBtn = document.getElementById('accelerator-btn');

function addButtonEvents(button, action, isKey = true) {
    const startEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!currentPlaneModule) return;
        if (isKey) keys[action] = true;
        else currentPlaneModule.setIsAccelerating(true);
        button.style.background = 'rgba(83, 85, 237, 0.8)';
    };
    
    const endEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!currentPlaneModule) return;
        if (isKey) keys[action] = false;
        else currentPlaneModule.setIsAccelerating(false);
        button.style.background = 'rgba(255, 255, 255, 0.36)';
    };

    button.addEventListener('mousedown', startEvent);
    button.addEventListener('touchstart', startEvent);
    button.addEventListener('mouseup', endEvent);
    button.addEventListener('touchend', endEvent);
    button.addEventListener('touchcancel', endEvent);
}

if (acceleratorBtn) addButtonEvents(acceleratorBtn, null, false);

// --- BOTÃO DE CÂMERA ---
const cameraToggleBtn = document.getElementById('camera-toggle-btn');

function toggleCamera(event) {
    event.preventDefault();
    event.stopPropagation();
    isCameraBehind = !isCameraBehind;
    if (cameraToggleBtn) cameraToggleBtn.classList.toggle('active');
}

if (cameraToggleBtn) {
    cameraToggleBtn.addEventListener('click', toggleCamera);
    cameraToggleBtn.addEventListener('touchstart', toggleCamera);
}

// --- DROPDOWN DE SELEÇÃO DE AVIÃO ---
const planeSelector = document.querySelector('.plane-selector');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const planeOptions = dropdownContent ? dropdownContent.querySelectorAll('button') : [];

function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    if (planeSelector) planeSelector.classList.toggle('active');
    
}

function closeDropdown(event) {
    if (planeSelector && !planeSelector.contains(event.target)) {
        planeSelector.classList.remove('active');
    }
}

if (dropdownBtn) {
    dropdownBtn.addEventListener('click', toggleDropdown);
    dropdownBtn.addEventListener('touchstart', toggleDropdown);
    
}

planeOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        planeSelector.classList.remove('active');
        const planeFile = option.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (planeFile) {
            loadPlane(planeFile);
            if (planeSelector) planeSelector.classList.remove('active');
        }
    });
    option.addEventListener('touchstart', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const planeFile = option.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (planeFile) {
            loadPlane(planeFile);
            if (planeSelector) planeSelector.classList.remove('active');
        }
    });
});

document.addEventListener('click', closeDropdown);
document.addEventListener('touchstart', closeDropdown);

window.loadPlane = loadPlane;