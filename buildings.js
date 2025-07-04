import { scene } from './scene.js';

// Função para criar uma árvore simples
function createTree(x, z) {
    const group = new THREE.Group();
    
    // Tronco
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 4, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.9
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2;
    trunk.castShadow = true;
    group.add(trunk);
    
    // Folhagem
    const foliageGeometry = new THREE.ConeGeometry(3, 6, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2E8B57,
        roughness: 0.7
    });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 6;
    foliage.castShadow = true;
    group.add(foliage);
    
    // Posicionamento
    group.position.set(x, 0, z);
    
    // Rotação aleatória para variedade
    group.rotation.y = Math.random() * Math.PI * 2;
    
    // Escala aleatória
    const scale = 0.8 + Math.random() * 0.4;
    group.scale.set(scale, scale, scale);
    
    // Calcular bounding box para colisão
    const bbox = new THREE.Box3().setFromObject(group);
    group.boundingBox = bbox;
    
    scene.add(group);
    return group;
}

// Lista para armazenar árvores para colisão
const trees = [];

// Adicionar árvores ao cenário (distribuição esparsa)
for (let i = 0; i < 100; i++) {
    const x = (Math.random() - 0.5) * 1200; // -500 a 500
    const z = (Math.random() - 0.5) * 1200; // -500 a 500
    const tree = createTree(x, z);
    trees.push(tree);
}

// Função para criar prédios cúbicos
function createBuilding(width, height, depth, x, z, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    scene.add(building);
    building.geometry.computeBoundingBox();
    building.boundingBox = new THREE.Box3().setFromObject(building);
    return building;
}

// Nova função para criar cilindros
function createCylinder(radiusTop, radiusBottom, height, x, z, color) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x, height / 2, z);
    scene.add(cylinder);
    cylinder.geometry.computeBoundingBox();
    cylinder.boundingBox = new THREE.Box3().setFromObject(cylinder);
    return cylinder;
}

const textureLoader = new THREE.TextureLoader();

// Prédios do aeroporto
const building1 = createBuilding(6, 10, 6, 25, -15, 0x888888);
const building2 = createBuilding(3, 18, 3, 25, -1, 0x4682B4);
const buildingTexture4 = textureLoader.load('torre-de-controle.png');
const buildingsAeroporto = [building2];
buildingsAeroporto.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture4, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const rightGeometry = new THREE.PlaneGeometry(depth, height);
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0);
    rightMesh.rotation.y = -Math.PI / 2;
    building.add(rightMesh);
    const leftGeometry = new THREE.PlaneGeometry(depth, height);
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0);
    leftMesh.rotation.y = Math.PI / 2;
    building.add(leftMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Conjunto 1
const building3 = createBuilding(8, 10, 8, -80, -30, 0xffffff);
const building4 = createBuilding(8, 10, 8, -60, -30, 0xffffff);
const building5 = createBuilding(8, 10, 8, -80, -15, 0xffffff);
const building6 = createBuilding(8, 10, 8, -60, -15, 0xffffff);
const building7 = createBuilding(8, 10, 8, -100, -30, 0xffffff);
const building8 = createBuilding(8, 10, 8, -100, -15, 0xffffff);
const building44 = createBuilding(50, 0.02, 25, -80, -22.5, 0x808080);
const buildingTexture1 = textureLoader.load('conjunto-predios-1.png');
const buildingsConjunto1 = [building3, building4, building5, building6, building7, building8];
buildingsConjunto1.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture1, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const rightGeometry = new THREE.PlaneGeometry(depth, height);
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0);
    rightMesh.rotation.y = -Math.PI / 2;
    building.add(rightMesh);
    const leftGeometry = new THREE.PlaneGeometry(depth, height);
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0);
    leftMesh.rotation.y = Math.PI / 2;
    building.add(leftMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Conjunto 2
const building9 = createBuilding(6, 17, 6, 80, 115, 0x808080);
const building10 = createBuilding(6, 17, 6, 60, 115, 0x808080);
const building11 = createBuilding(6, 17, 6, 80, 100, 0x808080);
const building12 = createBuilding(6, 17, 6, 60, 100, 0x808080);
const building13 = createBuilding(6, 17, 6, 100, 115, 0x808080);
const building14 = createBuilding(6, 17, 6, 100, 100, 0x808080);
const building43 = createBuilding(50, 0.02, 25, 80, 108, 0x808080);
const buildingTexture2 = textureLoader.load('conjunto-predios-2.png');
const buildingsConjunto2 = [building1, building9, building10, building11, building12, building13, building14];
buildingsConjunto2.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture2, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const rightGeometry = new THREE.PlaneGeometry(depth, height);
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0);
    rightMesh.rotation.y = -Math.PI / 2;
    building.add(rightMesh);
    const leftGeometry = new THREE.PlaneGeometry(depth, height);
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0);
    leftMesh.rotation.y = Math.PI / 2;
    building.add(leftMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Conjunto 3
const building15 = createBuilding(8, 10, 8, 80, -115, 0xffffff);
const building16 = createBuilding(8, 9, 8, 60, -115, 0xffffff);
const building17 = createBuilding(8, 8, 8, 80, -100, 0xffffff);
const building18 = createBuilding(8, 7, 8, 60, -100, 0xffffff);
const building19 = createBuilding(8, 6, 8, 100, -115, 0xffffff);
const building20 = createBuilding(8, 10, 8, 100, -100, 0xffffff);
const building42 = createBuilding(50, 0.02, 30, 80, -108, 0x808080);
const buildingTexture3 = textureLoader.load('conjunto-predios-3.png');
const buildingsConjunto3 = [building15, building16, building17, building18, building19, building20];
buildingsConjunto3.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture3, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const rightGeometry = new THREE.PlaneGeometry(depth, height);
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0);
    rightMesh.rotation.y = -Math.PI / 2;
    building.add(rightMesh);
    const leftGeometry = new THREE.PlaneGeometry(depth, height);
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0);
    leftMesh.rotation.y = Math.PI / 2;
    building.add(leftMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Torre alta
const building21 = createBuilding(9, 8, 9, -100, 100, 0x888888);
const building22 = createBuilding(8, 10, 8, -100, 100, 0xffffff);
const building23 = createBuilding(7, 15, 7, -100, 100, 0x888888);
const building24 = createBuilding(6, 17, 6, -100, 100, 0xffffff);
const building25 = createBuilding(5, 20, 5, -100, 100, 0x888888);
const building26 = createBuilding(4, 23, 4, -100, 100, 0xffffff);
const building27 = createBuilding(3, 25, 3, -100, 100, 0x888888);
const building28 = createBuilding(2.3, 28, 2.3, -100, 100, 0xffffff);
const building52 = createBuilding(1.4, 30, 1.4, -100, 100, 0x888888);
const building29 = createBuilding(1, 35, 1, -100, 100, 0xffffff);
const buildingTexture5 = textureLoader.load('conjunto-predios-3.png');
const buildingsTorreAlta = [building21, building22, building23, building24, building25, building26, building27, building28, building29, building52];
const buildingsCinza = buildingsTorreAlta.filter(building => building.material.color.getHex() === 0x888888);
buildingsCinza.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTexture5, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const rightGeometry = new THREE.PlaneGeometry(depth, height);
    const rightMesh = new THREE.Mesh(rightGeometry, textMaterial);
    rightMesh.position.set(width / 2 + 0.02, 0, 0);
    rightMesh.rotation.y = -Math.PI / 2;
    building.add(rightMesh);
    const leftGeometry = new THREE.PlaneGeometry(depth, height);
    const leftMesh = new THREE.Mesh(leftGeometry, textMaterial);
    leftMesh.position.set(-width / 2 - 0.02, 0, 0);
    leftMesh.rotation.y = Math.PI / 2;
    building.add(leftMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Ponte
const building30 = createBuilding(1, 15, 1, 170, -20, 0xFF4500);
const building31 = createBuilding(1, 20, 1, 170, -40, 0xFF4500);
const building32 = createBuilding(1, 20, 1, 170, -60, 0xFF4500);
const building33 = createBuilding(1, 15, 1, 170, -80, 0xFF4500);
const building34 = createBuilding(1, 12, 1, 170, 0, 0xFF4500);
const building35 = createBuilding(1, 12, 1, 170, -100, 0xFF4500);
const building36 = createBuilding(1, 15, 1, 180, -20, 0xFF4500);
const building37 = createBuilding(1, 20, 1, 180, -40, 0xFF4500);
const building38 = createBuilding(1, 20, 1, 180, -60, 0xFF4500);
const building39 = createBuilding(1, 15, 1, 180, -80, 0xFF4500);
const building40 = createBuilding(1, 12, 1, 180, 0, 0xFF4500);
const building41 = createBuilding(1, 12, 1, 180, -100, 0xFF4500);
const building48 = createBuilding(1, 5, 1, 180, -120, 0xFF4500);
const building49 = createBuilding(1, 5, 1, 180, 20, 0xFF4500);
const building50 = createBuilding(1, 5, 1, 170, -120, 0xFF4500);
const building51 = createBuilding(1, 5, 1, 170, 20, 0xFF4500);
const building45 = createBuilding(10, 1, 100, 175, -50, 0x000000);
building45.position.y = 8;
const building46 = createBuilding(10, 1, 30, 175, -113, 0x000000);
building46.rotation.x = 6;
building46.position.y = 4;
const building47 = createBuilding(10, 1, 30, 175, 13, 0x000000);
building47.rotation.x = -6;
building47.position.y = 4;
const building53 = createBuilding(1, 1, 150, 170, -50, 0xFF4500);
const building54 = createBuilding(1, 1, 150, 180, -50, 0xFF4500);
const building55 = createBuilding(1, 1, 20, 170, -50, 0xFF4500);
building55.position.y = 20;
const building56 = createBuilding(1, 1, 20, 180, -50, 0xFF4500);
building56.position.y = 20;
const building57 = createBuilding(1, 1, 20, 170, -30, 0xFF4500);
building57.position.y = 17;
building57.rotation.x = -6;
const building58 = createBuilding(1, 1, 20, 180, -30, 0xFF4500);
building58.position.y = 17;
building58.rotation.x = -6;
const building59 = createBuilding(1, 1, 20, 170, -70, 0xFF4500);
building59.position.y = 17;
building59.rotation.x = 6;
const building60 = createBuilding(1, 1, 20, 180, -70, 0xFF4500);
building60.position.y = 17;
building60.rotation.x = 6;
const building61 = createBuilding(1, 1, 20, 170, -90, 0xFF4500);
building61.position.y = 13;
building61.rotation.x = 6.15;
const building62 = createBuilding(1, 1, 20, 180, -90, 0xFF4500);
building62.position.y = 13;
building62.rotation.x = 6.15;
const building63 = createBuilding(1, 1, 20, 170, -10, 0xFF4500);
building63.position.y = 13;
building63.rotation.x = -6.15;
const building64 = createBuilding(1, 1, 20, 180, -10, 0xFF4500);
building64.position.y = 13;
building64.rotation.x = -6.15;
const building65 = createBuilding(1, 1, 21, 170, -110, 0xFF4500);
building65.position.y = 8;
building65.rotation.x = 5.92;
const building66 = createBuilding(1, 1, 21, 180, -110, 0xFF4500);
building66.position.y = 8;
building66.rotation.x = 5.92;
const building67 = createBuilding(1, 1, 21, 170, 10, 0xFF4500);
building67.position.y = 8;
building67.rotation.x = -5.92;
const building68 = createBuilding(1, 1, 21, 180, 10, 0xFF4500);
building68.position.y = 8;
building68.rotation.x = -5.92;

// Novo Conjunto com 2 cilindros e 1 cubo
const cylinder1 = createCylinder(1, 1, 30,-90, -80, 0xaaaaaa);
const cylinder2 = createCylinder(1, 1, 30, -30, -80, 0xaaaaaa);
const cube1 = createBuilding(60, 30, 2, -60, -80, 0xffffff); 
cube1.position.y = 18;
const buildingTextureNew = textureLoader.load('outdor.png');

const buildingsNewConjunto = [cube1];
buildingsNewConjunto.forEach(building => {
    const width = building.geometry.parameters.width;
    const height = building.geometry.parameters.height;
    const depth = building.geometry.parameters.depth;
    const textMaterial = new THREE.MeshBasicMaterial({ map: buildingTextureNew, transparent: true, side: THREE.DoubleSide });
    const frontGeometry = new THREE.PlaneGeometry(width, height);
    const frontMesh = new THREE.Mesh(frontGeometry, textMaterial);
    frontMesh.position.set(0, 0, depth / 2 + 0.02);
    building.add(frontMesh);
    const backGeometry = new THREE.PlaneGeometry(width, height);
    const backMesh = new THREE.Mesh(backGeometry, textMaterial);
    backMesh.position.set(0, 0, -depth / 2 - 0.02);
    backMesh.rotation.y = Math.PI;
    building.add(backMesh);
});

// Lista completa de objetos para colisão (prédios + árvores)
const buildings = [
    building1, building2, building3, building4, building5, building6, building7, building8,
    building9, building10, building11, building12, building13, building14,
    building15, building16, building17, building18, building19, building20,
    building21, building22, building23, building24, building25, building26, building27, building28, building29,
    building30, building31, building32, building33, building34, building35, building36, building37, building38,
    building39, building40, building41, building44, building45, building46, building47,
    building55, building56, building57, building58, building59, building60, building61, building62, building63,
    building64, building65, building66, building67, building68,
    cylinder1, cylinder2, cube1,
    ...trees // Adiciona todas as árvores ao sistema de colisão
];
// =================================================================
// ADICIONANDO NOVAS CONSTRUÇÕES AO CENÁRIO
// =================================================================

// Função para criar torre de telecomunicação
function createTelecomTower(x, z) {
    const group = new THREE.Group();
    
    // Base da torre
    const baseGeometry = new THREE.CylinderGeometry(3, 4, 10, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 5;
    group.add(base);
    
    // Estrutura principal
    const towerGeometry = new THREE.CylinderGeometry(0.5, 1.5, 80, 8);
    const towerMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 50;
    group.add(tower);
    
    // Plataforma de antenas
    const platformGeometry = new THREE.CylinderGeometry(3, 3, 2, 8);
    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 85;
    group.add(platform);
    
    // Antenas
    const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    
    // Antenas principais
    for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        const antenna = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 15, 6),
            antennaMaterial
        );
        antenna.position.set(
            Math.cos(angle) * 3.5,
            85,
            Math.sin(angle) * 3.5
        );
        antenna.rotation.x = Math.PI / 2;
        group.add(antenna);
    }
    
    // Antenas secundárias
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const antenna = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 8, 6),
            antennaMaterial
        );
        antenna.position.set(
            Math.cos(angle) * 2.5,
            85,
            Math.sin(angle) * 2.5
        );
        group.add(antenna);
    }
    
    // Posicionamento
    group.position.set(x, 0, z);
    
    // Calcular bounding box para colisão
    const bbox = new THREE.Box3().setFromObject(group);
    group.boundingBox = bbox;
    
    scene.add(group);
    return group;
}

// Função para criar montanhas
function createMountain(x, z, width = 100, height = 60, detail = 50) {
    const group = new THREE.Group();
    
    // Criar geometria da montanha
    const geometry = new THREE.ConeGeometry(width / 2, height, 8);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x5d4037,
        roughness: 0.9
    });
    
    const mountain = new THREE.Mesh(geometry, material);
    mountain.rotation.y = Math.random() * Math.PI;
    mountain.position.y = height / 2;
    
    // Adicionar detalhes (rochas)
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x7f7f7f });
    for (let i = 0; i < 30; i++) {
        const rockSize = 2 + Math.random() * 5;
        const rockGeometry = new THREE.DodecahedronGeometry(rockSize, 0);
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        
        // Posição aleatória na montanha
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (width / 3);
        const yPos = Math.random() * height * 0.7;
        
        rock.position.set(
            Math.cos(angle) * distance,
            yPos,
            Math.sin(angle) * distance
        );
        
        mountain.add(rock);
    }
    
    group.add(mountain);
    
    // Adicionar neve no topo
    const snowGeometry = new THREE.SphereGeometry(width / 5, 16, 16);
    const snowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const snow = new THREE.Mesh(snowGeometry, snowMaterial);
    snow.position.y = height * 0.8;
    group.add(snow);
    
    // Posicionamento
    group.position.set(x, 0, z);
    
    // Calcular bounding box para colisão
    const bbox = new THREE.Box3().setFromObject(group);
    group.boundingBox = bbox;
    
    scene.add(group);
    return group;
}

// Função para criar fazenda
function createFarm(x, z) {
    const group = new THREE.Group();
    
    // Casa principal
    const houseGeometry = new THREE.BoxGeometry(15, 8, 12);
    const houseMaterial = new THREE.MeshStandardMaterial({ color: 0xd3bc8d });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(0, 4, 0);
    group.add(house);
    
    // Telhado
    const roofGeometry = new THREE.ConeGeometry(10, 6, 4);
    roofGeometry.rotateY(Math.PI / 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 12;
    group.add(roof);
    
    // Chaminé
    const chimneyGeometry = new THREE.BoxGeometry(2, 4, 2);
    const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(4, 10, 3);
    group.add(chimney);
    
    // Celeiro
    const barnGeometry = new THREE.BoxGeometry(20, 10, 15);
    const barnMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const barn = new THREE.Mesh(barnGeometry, barnMaterial);
    barn.position.set(25, 5, 10);
    group.add(barn);
    
    // Telhado do celeiro
    const barnRoofGeometry = new THREE.ConeGeometry(12, 8, 4);
    barnRoofGeometry.rotateY(Math.PI / 4);
    barnRoofGeometry.scale(1.5, 1, 1);
    const barnRoof = new THREE.Mesh(barnRoofGeometry, roofMaterial);
    barnRoof.position.set(25, 15, 10);
    group.add(barnRoof);
    
    // Silo
    const siloGeometry = new THREE.CylinderGeometry(4, 4, 20, 16);
    const siloMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const silo = new THREE.Mesh(siloGeometry, siloMaterial);
    silo.position.set(25, 10, -10);
    group.add(silo);
    
    // Cerca
    function createFenceSegment(startX, startZ, endX, endZ) {
        const fenceGroup = new THREE.Group();
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2));
        const angle = Math.atan2(endZ - startZ, endX - startX);
        
        // Postes
        const postCount = Math.ceil(length / 5);
        for (let i = 0; i <= postCount; i++) {
            const postGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 8);
            const postMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
            const post = new THREE.Mesh(postGeometry, postMaterial);
            post.position.set(
                startX + (i / postCount) * (endX - startX),
                1.5,
                startZ + (i / postCount) * (endZ - startZ)
            );
            fenceGroup.add(post);
        }
        
        // Tábuas horizontais
        for (let y = 0.5; y <= 2.5; y += 1) {
            const board = new THREE.Mesh(
                new THREE.BoxGeometry(length, 0.2, 0.5),
                new THREE.MeshStandardMaterial({ color: 0x8b4513 })
            );
            board.position.set(
                startX + (endX - startX) / 2,
                y,
                startZ + (endZ - startZ) / 2
            );
            board.rotation.y = -angle;
            fenceGroup.add(board);
        }
        
        return fenceGroup;
    }
    
    // Cercar a fazenda
    group.add(createFenceSegment(-15, -15, 40, -15));
    group.add(createFenceSegment(40, -15, 40, 25));
    group.add(createFenceSegment(40, 25, -15, 25));
    group.add(createFenceSegment(-15, 25, -15, -15));
    
    // Posicionamento
    group.position.set(x, 0, z);
    
    // Calcular bounding box para colisão
    const bbox = new THREE.Box3().setFromObject(group);
    group.boundingBox = bbox;
    
    scene.add(group);
    return group;
}

// Criar torres de telecomunicação
const telecomTower1 = createTelecomTower(250, 150);
const telecomTower2 = createTelecomTower(-250, -150);

// Criar montanhas
const mountain1 = createMountain(250, 300, 120, 80);
const mountain2 = createMountain(350, 300, 150, 100);
const mountain3 = createMountain(400, 350, 100, 70);
const mountain4 = createMountain(-400, -350, 130, 90);

// Criar fazendas
const farm1 = createFarm(300, 200);
const farm2 = createFarm(-300, -200);

// Adicionar as novas construções à lista de colisão
buildings.push(
    telecomTower1,
    telecomTower2,
    mountain1,
    mountain2,
    mountain3,
    mountain4,
    farm1,
    farm2
);
// Exportar objetos para colisão
export { buildings };