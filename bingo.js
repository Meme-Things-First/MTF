/**
 * BINGO DELLE LAMENTELE — STATE-OF-THE-ART 3D BINGO MACHINE & COMPLAINTS SYSTEM
 * Meme Things First
 *
 * Architecture:
 * - Three.js WebGL rendering with PBR materials, custom studio 3-point + rim lighting
 * - Circular globe-stand pedestal base ("tipo mappamondo") with stepped lathe-turned tiers
 * - Zero-allocation physics loop with shared ball geometries and spatial restitution
 * - Web Audio API procedural sound engine with click-free exponential gain envelope
 * - Resilient state management and cached DOM bindings with hardware-accelerated animations
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. DATA & CONSTANTS
    // =========================================================================

    // Solid complaint balls: story red/blue + site grays
    // Red is cooled (#e6002e) so warm scene lights don't push it toward orange
    const COMPLAINT_BALL_PALETTE = Object.freeze([
        '#e6002e', // story red, hue-corrected for warm lights
        '#0000e8', // story blue (pill)
        '#363635', // site text gray
        '#878786', // site muted gray
        '#c6c6c5'  // site border gray
    ]);

    // Image / meme-template balls: transparent white glass only
    const TEMPLATE_BALL_PALETTE = Object.freeze([
        '#ffffff'
    ]);

    // Local complaint seed left empty for now — cage fills from Are.na templates + user posts
    const INITIAL_COMPLAINTS = [];

    // Are.na channel seed (images drop into the cage on load)
    const ARENA_CHANNEL_SLUG = 'templates-for-your-own-memes';
    const ARENA_API_BASE = 'https://api.are.na/v2/channels';
    const ARENA_PER_PAGE = 100;

    // Dimensional 3D Specifications
    const CAGE_RADIUS = 1.05;
    const CAGE_LENGTH = 1.85;
    const BALL_RADIUS = 0.17;
    const DRUM_CENTER_Y = 1.45;

    /** Farther framing on mobile so the whole machine fits in view */
    function getHomeCamera() {
        const mobile = window.matchMedia('(max-width: 992px)').matches;
        if (mobile) {
            return { x: 2.55, y: 2.05, z: 5.2, tx: 0, ty: 0.95, tz: 0, minDistance: 2.8 };
        }
        return { x: 2.8, y: 2.2, z: 4.2, tx: 0, ty: 0.95, tz: 0, minDistance: 2.4 };
    }

    if (typeof THREE === 'undefined') {
        console.error('Three.js failed to load');
        return;
    }

    // Shared geometry cache to avoid duplicate vertex buffers
    const SHARED_BALL_GEO = new THREE.SphereGeometry(BALL_RADIUS, 28, 28);
    const SHARED_GLASS_BALL_GEO = new THREE.SphereGeometry(BALL_RADIUS, 48, 48);
    const SHARED_IMAGE_PLANE_GEO = new THREE.PlaneGeometry(BALL_RADIUS * 1.35, BALL_RADIUS * 1.35);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Pre-allocated Bezier path vectors for chute roll animation (Zero GC churn)
    const BEZIER_START = new THREE.Vector3(0, 0.75, 0.15);
    const BEZIER_MID = new THREE.Vector3(0, 0.45, 0.55);
    const BEZIER_END = new THREE.Vector3(0, 0.28, 0.82);
    const _tempBezierPos = new THREE.Vector3();

    function createDefaultGroups() {
        return Array.from({ length: 6 }, (_, i) => ({
            id: 'group-' + (i + 1),
            name: 'Gruppo ' + (i + 1),
            complaints: [],
            templates: []
        }));
    }

    // Application state
    const state = {
        complaints: [...INITIAL_COMPLAINTS],
        extractedComplaints: [],
        groups: createDefaultGroups(),
        activeGroupId: 'group-1',
        isExtracting: false,
        extractionQueue: [],
        assignGroupIdForExtraction: null,
        selectedImageDataUrl: null,
        nextGroupSerial: 7
    };

    // Cached DOM Elements
    let DOM = {};
    let comboContinueTimer = 0;

    // =========================================================================
    // 3. THREE.JS SCENE SETUP & GLOBE-STAND 3D BINGO MACHINE
    // =========================================================================
    let scene, camera, renderer, controls;
    let machineGroup, drumGroup, crankGroup, chuteGroup;
    let balls = [];
    let exitingBall = null;
    let drumAngle = 0;
    let drumSpeed = 0.16;
    let targetDrumSpeed = 0.16;

    function init3D() {
        const container = DOM.canvasContainer;
        if (!container) return;

        const width = container.clientWidth || window.innerWidth * 0.55;
        const height = container.clientHeight || window.innerHeight;

        // Scene
        scene = new THREE.Scene();

        // Camera: 42° FOV for realistic perspective
        camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        const home = getHomeCamera();
        camera.position.set(home.x, home.y, home.z);

        // WebGL Renderer with performance optimizations
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
        }, false);
        container.appendChild(renderer.domElement);

        // OrbitControls
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = home.minDistance;
            controls.maxDistance = 8.0;
            controls.maxPolarAngle = Math.PI / 2 + 0.10;
            controls.target.set(home.tx, home.ty, home.tz);
            controls.update();
        }

        // Studio lighting — neutral whites only (no warm cast inside the cage)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
        scene.add(ambientLight);

        // Key / fill / rim — no shadows
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
        keyLight.position.set(4.5, 6.5, 4.2);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.58);
        fillLight.position.set(-4.5, 3.5, 2.0);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
        rimLight.position.set(-2.5, 5.0, -4.5);
        scene.add(rimLight);

        // Construct 3D Bingo Machine Model
        buildYellowBingoMachine();

        // Populate balls based on initial dataset
        sync3DBallsWithComplaints();

        window.addEventListener('resize', scheduleWindowResize, { passive: true });
        startRenderLoop();
    }

    /**
     * Builds the Yellow Slop Machine: lathe pedestal, conical stanchions,
     * ferruled wire drum, turned crank, dual-rail trough chute.
     * Does not alter scene lighting or shadow setup.
     */
    function buildYellowBingoMachine() {
        machineGroup = new THREE.Group();
        scene.add(machineGroup);

        // Machine structure: opaque site gray metal (no yellow cage)
        const yellowEnamelMat = new THREE.MeshStandardMaterial({
            color: 0xb0b0ae,
            roughness: 0.48,
            metalness: 0.28,
            transparent: false,
            opacity: 1
        });

        const yellowWireMat = new THREE.MeshStandardMaterial({
            color: 0x9a9a98,
            roughness: 0.36,
            metalness: 0.42,
            transparent: false,
            opacity: 1
        });

        const yellowTrimMat = new THREE.MeshStandardMaterial({
            color: 0xc6c6c5,
            roughness: 0.4,
            metalness: 0.3,
            transparent: false,
            opacity: 1
        });

        const chromeMat = new THREE.MeshStandardMaterial({
            color: 0xc8c8c6,
            roughness: 0.32,
            metalness: 0.45,
            transparent: false,
            opacity: 1
        });

        const siteGrayMetalMat = new THREE.MeshStandardMaterial({
            color: 0xb0b0ae,
            roughness: 0.5,
            metalness: 0.22,
            transparent: false,
            opacity: 1
        });

        const siteLightMetalMat = new THREE.MeshStandardMaterial({
            color: 0xb8b8b6,
            roughness: 0.48,
            metalness: 0.24,
            transparent: false,
            opacity: 1
        });

        // Solid opaque base — mid gray, never white
        const baseMat = new THREE.MeshStandardMaterial({
            color: 0xa6a6a4,
            roughness: 0.72,
            metalness: 0.08,
            transparent: false,
            opacity: 1
        });

        // Accent enamel — dark anthracite (no color)
        const anthraciteMat = new THREE.MeshStandardMaterial({
            color: 0x2e2e2c,
            roughness: 0.55,
            metalness: 0.35,
            transparent: false,
            opacity: 1
        });

        function hexBolt(size, height) {
            const bolt = new THREE.Group();
            const shank = new THREE.Mesh(
                new THREE.CylinderGeometry(size * 0.55, size * 0.55, height * 0.55, 10),
                chromeMat
            );
            shank.position.y = height * 0.2;
            bolt.add(shank);
            const head = new THREE.Mesh(
                new THREE.CylinderGeometry(size, size, height * 0.45, 6),
                chromeMat
            );
            head.position.y = height * 0.55;
            bolt.add(head);
            return bolt;
        }

        // =====================================================================
        // 1. STEPPED LATHE PEDESTAL BASE
        // =====================================================================
        const deckY = 0.13;

        // Smooth opaque gray pedestal — no feet, no lip bolts
        const pedestalPoints = [
            new THREE.Vector2(1.50, 0.00),
            new THREE.Vector2(1.52, 0.02),
            new THREE.Vector2(1.48, 0.05),
            new THREE.Vector2(1.46, 0.09),
            new THREE.Vector2(1.44, 0.13)
        ];
        const pedestalMesh = new THREE.Mesh(
            new THREE.LatheGeometry(pedestalPoints, 72),
            baseMat
        );
        machineGroup.add(pedestalMesh);

        // Flat gray landing pad (no circular rings / white trim)
        const landingPad = new THREE.Mesh(
            new THREE.BoxGeometry(0.72, 0.04, 0.55),
            baseMat
        );
        landingPad.position.set(0, deckY + 0.02, 0.78);
        machineGroup.add(landingPad);

        // =====================================================================
        // 2. CONICAL STANCHIONS + AXLE YOKE
        // =====================================================================
        const stanchionX = 1.30;
        const axleY = DRUM_CENTER_Y;
        const legBaseY = deckY;

        [-stanchionX, stanchionX].forEach((xPos) => {
            const stanchionGroup = new THREE.Group();
            stanchionGroup.position.set(xPos, 0, 0);

            const legTopR = 0.042;
            const legBotR = 0.055;
            const legZOffset = 0.48;
            // Legs run all the way into the axle center so V and spin shaft read as one piece
            const legHeight = Math.sqrt(Math.pow(axleY - legBaseY, 2) + Math.pow(legZOffset, 2));
            const legAngle = Math.atan2(legZOffset, axleY - legBaseY);

            const addLeg = (zSign) => {
                const leg = new THREE.Mesh(
                    new THREE.CylinderGeometry(legTopR, legBotR, legHeight, 24),
                    siteGrayMetalMat
                );
                leg.position.set(0, (axleY + legBaseY) / 2, zSign * legZOffset / 2);
                leg.rotation.x = zSign * legAngle;
                stanchionGroup.add(leg);
            };

            addLeg(1);
            addLeg(-1);

            // Mid horizontal tie
            const crossbarY = 0.70;
            const crossbarSpan = (1 - (crossbarY - legBaseY) / (axleY - legBaseY)) * legZOffset * 2;
            const crossbar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.03, 0.03, crossbarSpan, 18),
                siteGrayMetalMat
            );
            crossbar.rotation.x = Math.PI / 2;
            crossbar.position.set(0, crossbarY, 0);
            stanchionGroup.add(crossbar);

            // Solid apex block: V tips fuse into the axle bearing
            const yoke = new THREE.Group();
            yoke.position.set(0, axleY, 0);

            const apexBlock = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.2, 0.32),
                siteGrayMetalMat
            );
            yoke.add(apexBlock);

            // Continuous metal tube: yoke ↔ spin axle
            const axleThrough = new THREE.Mesh(
                new THREE.CylinderGeometry(0.055, 0.055, 0.42, 28),
                siteGrayMetalMat
            );
            axleThrough.rotation.z = Math.PI / 2;
            yoke.add(axleThrough);

            const bearingHub = new THREE.Mesh(
                new THREE.CylinderGeometry(0.1, 0.1, 0.16, 28),
                siteLightMetalMat
            );
            bearingHub.rotation.z = Math.PI / 2;
            yoke.add(bearingHub);

            // Accent collar — anthracite
            const accentCollar = new THREE.Mesh(
                new THREE.TorusGeometry(0.108, 0.014, 10, 28),
                anthraciteMat
            );
            accentCollar.rotation.y = Math.PI / 2;
            yoke.add(accentCollar);

            // Neck toward the drum so the shaft visibly leaves the V
            const towardDrum = new THREE.Mesh(
                new THREE.CylinderGeometry(0.062, 0.05, 0.22, 20),
                siteGrayMetalMat
            );
            towardDrum.rotation.z = Math.PI / 2;
            towardDrum.position.x = xPos > 0 ? -0.18 : 0.18;
            yoke.add(towardDrum);

            stanchionGroup.add(yoke);
            machineGroup.add(stanchionGroup);
        });

        // =====================================================================
        // 3. MAIN SPIN AXLE (through both yokes into the drum)
        // =====================================================================
        const axleLength = 3.25;
        const axle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.045, 0.045, axleLength, 28),
            siteGrayMetalMat
        );
        axle.rotation.z = Math.PI / 2;
        axle.position.set(0.1, axleY, 0);
        machineGroup.add(axle);

        [-stanchionX, stanchionX].forEach((cx) => {
            const collar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.07, 0.07, 0.08, 24),
                siteLightMetalMat
            );
            collar.rotation.z = Math.PI / 2;
            collar.position.set(cx, axleY, 0);
            machineGroup.add(collar);
        });

        const leftAcorn = new THREE.Mesh(
            new THREE.SphereGeometry(0.055, 18, 16),
            siteGrayMetalMat
        );
        leftAcorn.scale.set(1.15, 1, 1);
        leftAcorn.position.set(-axleLength / 2 + 0.08, axleY, 0);
        machineGroup.add(leftAcorn);

        // =====================================================================
        // 4. ROTATING DRUM
        // =====================================================================
        drumGroup = new THREE.Group();
        drumGroup.position.set(0, axleY, 0);
        machineGroup.add(drumGroup);

        const endRimGeo = new THREE.TorusGeometry(CAGE_RADIUS, 0.044, 18, 80);
        [-CAGE_LENGTH / 2, CAGE_LENGTH / 2].forEach((xSide) => {
            const rim = new THREE.Mesh(endRimGeo, yellowEnamelMat);
            rim.rotation.y = Math.PI / 2;
            rim.position.set(xSide, 0, 0);
            drumGroup.add(rim);

            // Outer bevel ring — anthracite accent
            const bevel = new THREE.Mesh(
                new THREE.TorusGeometry(CAGE_RADIUS + 0.01, 0.016, 12, 72),
                anthraciteMat
            );
            bevel.rotation.y = Math.PI / 2;
            bevel.position.set(xSide + Math.sign(xSide) * 0.012, 0, 0);
            drumGroup.add(bevel);
        });

        const intermediateHoopOffsets = [-CAGE_LENGTH * 0.25, 0, CAGE_LENGTH * 0.25];
        const midRimGeo = new THREE.TorusGeometry(CAGE_RADIUS, 0.022, 14, 72);
        intermediateHoopOffsets.forEach((xOff, idx) => {
            const midMat = idx === 1 ? yellowTrimMat : anthraciteMat;
            const midRim = new THREE.Mesh(midRimGeo, midMat);
            midRim.rotation.y = Math.PI / 2;
            midRim.position.set(xOff, 0, 0);
            drumGroup.add(midRim);
        });

        // Concentric hubs + spokes + rim ferrules
        const spokeCount = 8;
        const ferruleGeo = new THREE.SphereGeometry(0.016, 10, 8);
        [-CAGE_LENGTH / 2, CAGE_LENGTH / 2].forEach((xSide) => {
            const hubOuter = new THREE.Mesh(
                new THREE.CylinderGeometry(0.22, 0.22, 0.05, 36),
                siteGrayMetalMat
            );
            hubOuter.rotation.z = Math.PI / 2;
            hubOuter.position.set(xSide, 0, 0);
            drumGroup.add(hubOuter);

            const hubMid = new THREE.Mesh(
                new THREE.CylinderGeometry(0.155, 0.155, 0.062, 32),
                anthraciteMat
            );
            hubMid.rotation.z = Math.PI / 2;
            hubMid.position.set(xSide + Math.sign(xSide) * 0.01, 0, 0);
            drumGroup.add(hubMid);

            const hubCore = new THREE.Mesh(
                new THREE.CylinderGeometry(0.09, 0.09, 0.07, 28),
                chromeMat
            );
            hubCore.rotation.z = Math.PI / 2;
            hubCore.position.set(xSide + Math.sign(xSide) * 0.015, 0, 0);
            drumGroup.add(hubCore);

            const hubCollar = new THREE.Mesh(
                new THREE.TorusGeometry(0.175, 0.014, 12, 36),
                chromeMat
            );
            hubCollar.rotation.y = Math.PI / 2;
            hubCollar.position.set(xSide, 0, 0);
            drumGroup.add(hubCollar);

            const spokeLength = CAGE_RADIUS - 0.20;
            const spokeGeo = new THREE.CylinderGeometry(0.014, 0.018, spokeLength, 12);

            for (let i = 0; i < spokeCount; i++) {
                const angle = (i / spokeCount) * Math.PI * 2;
                const spoke = new THREE.Mesh(spokeGeo, yellowWireMat);
                const rMid = 0.20 + spokeLength / 2;
                spoke.position.set(xSide, Math.sin(angle) * rMid, Math.cos(angle) * rMid);
                spoke.rotation.x = -angle;
                drumGroup.add(spoke);

                // Ferrule at rim joint
                const ferrule = new THREE.Mesh(ferruleGeo, siteLightMetalMat);
                ferrule.position.set(
                    xSide,
                    Math.sin(angle) * CAGE_RADIUS,
                    Math.cos(angle) * CAGE_RADIUS
                );
                drumGroup.add(ferrule);
            }
        });

        // Longitudinal wire rods with end ferrules every 4th bar
        const barCount = 48;
        const barRadius = 0.0085;
        const barGeo = new THREE.CylinderGeometry(barRadius, barRadius, CAGE_LENGTH, 8);
        const barFerruleGeo = new THREE.SphereGeometry(0.012, 8, 6);

        for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2;
            const y = Math.sin(angle) * CAGE_RADIUS;
            const z = Math.cos(angle) * CAGE_RADIUS;
            const bar = new THREE.Mesh(barGeo, yellowWireMat);
            bar.rotation.z = Math.PI / 2;
            bar.position.set(0, y, z);
            drumGroup.add(bar);

            if (i % 4 === 0) {
                [-CAGE_LENGTH / 2, CAGE_LENGTH / 2].forEach((xF) => {
                    const f = new THREE.Mesh(barFerruleGeo, siteLightMetalMat);
                    f.position.set(xF, y, z);
                    drumGroup.add(f);
                });
            }
        }

        // Framed inspection trapdoor
        const doorGroup = new THREE.Group();
        const doorY = CAGE_RADIUS + 0.008;
        const doorWidth = 0.48;
        const doorLength = 0.44;
        const frameT = 0.028;

        // Outer frame rails
        [
            [doorWidth, frameT, frameT, 0, 0, doorLength / 2],
            [doorWidth, frameT, frameT, 0, 0, -doorLength / 2],
            [frameT, frameT, doorLength, doorWidth / 2, 0, 0],
            [frameT, frameT, doorLength, -doorWidth / 2, 0, 0]
        ].forEach(([sx, sy, sz, px, py, pz]) => {
            const rail = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), yellowTrimMat);
            rail.position.set(px, doorY + py, pz);
            doorGroup.add(rail);
        });

        // Inner panel plate (thin)
        const doorPanel = new THREE.Mesh(
            new THREE.BoxGeometry(doorWidth - 0.06, 0.012, doorLength - 0.06),
            yellowEnamelMat
        );
        doorPanel.position.set(0, doorY - 0.004, 0);
        doorGroup.add(doorPanel);

        for (let w = -2; w <= 2; w++) {
            const dw = new THREE.Mesh(
                new THREE.CylinderGeometry(0.007, 0.007, doorWidth - 0.08, 8),
                yellowWireMat
            );
            dw.rotation.z = Math.PI / 2;
            dw.position.set(0, doorY + 0.01, (w / 2.5) * (doorLength * 0.38));
            doorGroup.add(dw);
        }

        [-0.15, 0.15].forEach((hx) => {
            const hingeBarrel = new THREE.Mesh(
                new THREE.CylinderGeometry(0.018, 0.018, 0.08, 16),
                siteLightMetalMat
            );
            hingeBarrel.rotation.z = Math.PI / 2;
            hingeBarrel.position.set(hx, doorY + 0.018, -doorLength / 2);
            doorGroup.add(hingeBarrel);

            const hingePlate = new THREE.Mesh(
                new THREE.BoxGeometry(0.055, 0.01, 0.04),
                siteGrayMetalMat
            );
            hingePlate.position.set(hx, doorY + 0.005, -doorLength / 2 + 0.02);
            doorGroup.add(hingePlate);
        });

        const latchBar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.014, 0.014, 0.2, 12),
            siteLightMetalMat
        );
        latchBar.rotation.z = Math.PI / 2;
        latchBar.position.set(0, doorY + 0.018, doorLength / 2);
        doorGroup.add(latchBar);

        const latchKnob = new THREE.Mesh(
            new THREE.CylinderGeometry(0.032, 0.038, 0.045, 16),
            anthraciteMat
        );
        latchKnob.position.set(0, doorY + 0.048, doorLength / 2);
        doorGroup.add(latchKnob);

        drumGroup.add(doorGroup);

        // Internal ball lifter scoop
        const scoopGroup = new THREE.Group();
        const scoopSpan = CAGE_LENGTH * 0.72;

        [-scoopSpan / 2, 0, scoopSpan / 2].forEach((rx) => {
            const ribCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(rx, CAGE_RADIUS * 0.88, CAGE_RADIUS * 0.22),
                new THREE.Vector3(rx, CAGE_RADIUS * 0.65, CAGE_RADIUS * 0.48),
                new THREE.Vector3(rx, CAGE_RADIUS * 0.38, CAGE_RADIUS * 0.36)
            ]);
            scoopGroup.add(new THREE.Mesh(
                new THREE.TubeGeometry(ribCurve, 14, 0.016, 8, false),
                siteLightMetalMat
            ));
        });

        [
            [CAGE_RADIUS * 0.88, CAGE_RADIUS * 0.22],
            [CAGE_RADIUS * 0.65, CAGE_RADIUS * 0.48],
            [CAGE_RADIUS * 0.38, CAGE_RADIUS * 0.36]
        ].forEach(([sy, sz]) => {
            const scoopBar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.014, 0.014, scoopSpan, 12),
                siteLightMetalMat
            );
            scoopBar.rotation.z = Math.PI / 2;
            scoopBar.position.set(0, sy, sz);
            scoopGroup.add(scoopBar);
        });

        drumGroup.add(scoopGroup);

        // =====================================================================
        // 5. TURNED CRANK HANDLE
        // =====================================================================
        crankGroup = new THREE.Group();
        crankGroup.position.set(stanchionX + 0.16, axleY, 0);
        machineGroup.add(crankGroup);

        const crankHub = new THREE.Mesh(
            new THREE.CylinderGeometry(0.125, 0.125, 0.055, 32),
            chromeMat
        );
        crankHub.rotation.z = Math.PI / 2;
        crankGroup.add(crankHub);

        const hubRim = new THREE.Mesh(
            new THREE.TorusGeometry(0.11, 0.012, 10, 28),
            anthraciteMat
        );
        hubRim.rotation.y = Math.PI / 2;
        crankGroup.add(hubRim);

        const centerBolt = hexBolt(0.042, 0.08);
        centerBolt.rotation.z = -Math.PI / 2;
        centerBolt.position.x = 0.04;
        crankGroup.add(centerBolt);

        const armLength = 0.68;
        // Tapered crank arm via lathe (half-profile along Y)
        const armProfile = [
            new THREE.Vector2(0.048, 0),
            new THREE.Vector2(0.045, 0.12),
            new THREE.Vector2(0.038, 0.32),
            new THREE.Vector2(0.032, 0.50),
            new THREE.Vector2(0.036, 0.62),
            new THREE.Vector2(0.042, 0.68)
        ];
        const crankArm = new THREE.Mesh(
            new THREE.LatheGeometry(armProfile, 20),
            yellowEnamelMat
        );
        crankArm.position.set(0.03, -0.08, 0);
        crankGroup.add(crankArm);

        const counterweight = new THREE.Mesh(
            new THREE.CylinderGeometry(0.085, 0.095, 0.06, 24),
            yellowEnamelMat
        );
        counterweight.rotation.z = Math.PI / 2;
        counterweight.position.set(0.03, -0.12, 0);
        crankGroup.add(counterweight);

        const handleSpindle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.022, 0.022, 0.34, 16),
            chromeMat
        );
        handleSpindle.rotation.z = Math.PI / 2;
        handleSpindle.position.set(0.18, armLength - 0.10, 0);
        crankGroup.add(handleSpindle);

        // Turned grip (lathe along X after rotation)
        const gripProfile = [
            new THREE.Vector2(0.028, 0.00),
            new THREE.Vector2(0.052, 0.03),
            new THREE.Vector2(0.058, 0.08),
            new THREE.Vector2(0.055, 0.14),
            new THREE.Vector2(0.058, 0.20),
            new THREE.Vector2(0.050, 0.24),
            new THREE.Vector2(0.030, 0.26)
        ];
        const handleKnob = new THREE.Mesh(
            new THREE.LatheGeometry(gripProfile, 24),
            anthraciteMat
        );
        handleKnob.rotation.z = -Math.PI / 2;
        handleKnob.position.set(0.12, armLength - 0.10, 0);
        crankGroup.add(handleKnob);

        const handleEndCap = new THREE.Mesh(
            new THREE.SphereGeometry(0.042, 16, 14),
            anthraciteMat
        );
        handleEndCap.position.set(0.38, armLength - 0.10, 0);
        crankGroup.add(handleEndCap);

        // =====================================================================
        // 6. DUAL-RAIL TROUGH CHUTE
        // =====================================================================
        chuteGroup = new THREE.Group();
        machineGroup.add(chuteGroup);

        const curveLeft = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.15, 0.72, 0.18),
            new THREE.Vector3(-0.15, 0.44, 0.52),
            new THREE.Vector3(-0.15, 0.19, 0.82)
        ]);
        const curveRight = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.15, 0.72, 0.18),
            new THREE.Vector3(0.15, 0.44, 0.52),
            new THREE.Vector3(0.15, 0.19, 0.82)
        ]);
        // Low side guides slightly outside the rails
        const curveGuideL = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.19, 0.74, 0.18),
            new THREE.Vector3(-0.19, 0.46, 0.52),
            new THREE.Vector3(-0.19, 0.22, 0.82)
        ]);
        const curveGuideR = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.19, 0.74, 0.18),
            new THREE.Vector3(0.19, 0.46, 0.52),
            new THREE.Vector3(0.19, 0.22, 0.82)
        ]);

        [
            [curveLeft, 0.022, siteLightMetalMat],
            [curveRight, 0.022, siteLightMetalMat],
            [curveGuideL, 0.014, anthraciteMat],
            [curveGuideR, 0.014, anthraciteMat]
        ].forEach(([curve, radius, mat]) => {
            const rail = new THREE.Mesh(
                new THREE.TubeGeometry(curve, 32, radius, 10, false),
                mat
            );
            chuteGroup.add(rail);
        });

        [0.15, 0.35, 0.55, 0.75].forEach((u) => {
            const pL = curveLeft.getPoint(u);
            const pR = curveRight.getPoint(u);
            const tie = new THREE.Mesh(
                new THREE.CylinderGeometry(0.011, 0.011, pL.distanceTo(pR), 8),
                siteLightMetalMat
            );
            tie.position.copy(pL.clone().add(pR).multiplyScalar(0.5));
            tie.rotation.z = Math.PI / 2;
            chuteGroup.add(tie);
        });

        const chuteSupport = new THREE.Mesh(
            new THREE.CylinderGeometry(0.026, 0.038, 0.40, 18),
            yellowEnamelMat
        );
        chuteSupport.position.set(0, 0.32, 0.52);
        chuteSupport.rotation.x = 0.22;
        chuteGroup.add(chuteSupport);

    }

    // =========================================================================
    // 4. VIBRANT BALLS & HIGH-PERFORMANCE ZERO-ALLOCATION PHYSICS
    // =========================================================================
    function paletteForComplaint(complaint) {
        return isMemeTemplate(complaint) ? TEMPLATE_BALL_PALETTE : COMPLAINT_BALL_PALETTE;
    }

    function assignBallColor(complaint) {
        if (complaint.color) return complaint.color;
        const palette = paletteForComplaint(complaint);
        const index = Math.abs(Number(complaint.id) || Math.floor(Math.random() * 1000)) % palette.length;
        complaint.color = palette[index];
        return complaint.color;
    }

    function disposeBallMesh(mesh) {
        if (!mesh) return;
        mesh.traverse((child) => {
            if (!child.isMesh) return;
            // Keep shared geometries alive
            if (
                child.geometry &&
                child.geometry !== SHARED_BALL_GEO &&
                child.geometry !== SHARED_GLASS_BALL_GEO &&
                child.geometry !== SHARED_IMAGE_PLANE_GEO
            ) {
                child.geometry.dispose();
            }
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((mat) => {
                if (!mat) return;
                if (mat.map) mat.map.dispose();
                mat.dispose();
            });
        });
    }

    function createImageBallMesh(complaint, tintColor) {
        const group = new THREE.Group();

        // Transparent white glass shell (never tinted)
        const shellMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.14,
            transmission: 0.35,
            thickness: 0.65,
            transparent: true,
            opacity: 0.9,
            clearcoat: 0.5,
            clearcoatRoughness: 0.18,
            reflectivity: 0.4,
            side: THREE.FrontSide,
            depthWrite: true
        });
        const shell = new THREE.Mesh(SHARED_GLASS_BALL_GEO, shellMat);
        group.add(shell);

        // Soft frosted highlight ring
        const glossMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.32,
            depthWrite: false
        });
        const gloss = new THREE.Mesh(
            new THREE.SphereGeometry(BALL_RADIUS * 0.92, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.35),
            glossMat
        );
        gloss.rotation.x = -0.55;
        gloss.position.y = BALL_RADIUS * 0.18;
        group.add(gloss);

        const imageMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide,
            depthWrite: true
        });
        const imagePlane = new THREE.Mesh(SHARED_IMAGE_PLANE_GEO, imageMat);
        imagePlane.position.z = 0.02;
        group.add(imagePlane);

        const url = resolveAssetUrl(complaint.image);
        textureLoader.load(
            url,
            (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                imageMat.map = texture;
                imageMat.needsUpdate = true;
            },
            undefined,
            () => {
                // Keep white glass shell if texture fails (CORS / network)
                imageMat.color.set(0xffffff);
                imageMat.opacity = 0.45;
            }
        );

        group.userData.isImageBall = true;
        return group;
    }

    function createSolidBallMesh(tintColor) {
        const color = new THREE.Color(tintColor);
        const mat = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color.clone().multiplyScalar(0.18),
            emissiveIntensity: 0.35,
            roughness: 0.28,
            metalness: 0.08
        });
        const mesh = new THREE.Mesh(SHARED_BALL_GEO, mat);
        return mesh;
    }

    function create3DBall(complaint) {
        const tintColor = assignBallColor(complaint);
        const mesh = complaint.image
            ? createImageBallMesh(complaint, tintColor)
            : createSolidBallMesh(tintColor);

        const innerR = (CAGE_RADIUS - BALL_RADIUS - 0.08) * (0.6 + Math.random() * 0.35);
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
        const xPos = (Math.random() - 0.5) * (CAGE_LENGTH - 0.5);

        mesh.position.set(xPos, DRUM_CENTER_Y + Math.sin(angle) * innerR, Math.cos(angle) * innerR);

        const ball = {
            complaint: complaint,
            mesh: mesh,
            pos: mesh.position,
            vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, 0, (Math.random() - 0.5) * 0.02),
            rotSpeed: new THREE.Vector3(Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02)
        };

        scene.add(mesh);
        return ball;
    }

    function sync3DBallsWithComplaints() {
        balls.forEach((b) => {
            scene.remove(b.mesh);
            disposeBallMesh(b.mesh);
        });
        balls = [];

        const activeComplaints = state.complaints.filter((c) => !c.extracted);
        activeComplaints.forEach((c) => {
            balls.push(create3DBall(c));
        });

        updateBallCounters();
    }

    function updateBallPhysics(delta) {
        const drumCenterY = DRUM_CENTER_Y;
        const maxR = CAGE_RADIUS - BALL_RADIUS - 0.03;
        const maxX = (CAGE_LENGTH / 2) - BALL_RADIUS - 0.05;
        const gravity = -9.8 * 0.12;
        const numBalls = balls.length;

        for (let i = 0; i < numBalls; i++) {
            const b = balls[i];

            b.vel.y += gravity * delta;

            const dy = b.pos.y - drumCenterY;
            const dz = b.pos.z;
            const distFromAxle = Math.sqrt(dy * dy + dz * dz);

            if (distFromAxle > maxR * 0.7) {
                const tangY = -dz / (distFromAxle || 1);
                const tangZ = dy / (distFromAxle || 1);
                const liftFactor = Math.min(1, (distFromAxle - maxR * 0.5) / (maxR * 0.5));
                const tangentialVelocity = drumSpeed * distFromAxle * 0.32 * liftFactor;

                b.vel.y += tangY * tangentialVelocity * delta * 1.5;
                b.vel.z += tangZ * tangentialVelocity * delta * 1.5;
            }

            b.vel.x *= 0.965;
            b.vel.y *= 0.965;
            b.vel.z *= 0.965;

            b.pos.x += b.vel.x * delta * 36;
            b.pos.y += b.vel.y * delta * 36;
            b.pos.z += b.vel.z * delta * 36;

            const newDy = b.pos.y - drumCenterY;
            const newDz = b.pos.z;
            const currentR = Math.sqrt(newDy * newDy + newDz * newDz);

            if (currentR > maxR) {
                const normY = newDy / currentR;
                const normZ = newDz / currentR;
                b.pos.y = drumCenterY + normY * maxR;
                b.pos.z = normZ * maxR;

                const dot = b.vel.y * normY + b.vel.z * normZ;
                if (dot > 0) {
                    b.vel.y = (b.vel.y - 1.6 * dot * normY) * 0.55;
                    b.vel.z = (b.vel.z - 1.6 * dot * normZ) * 0.55;
                }
            }

            if (b.pos.x > maxX) {
                b.pos.x = maxX;
                b.vel.x = -b.vel.x * 0.5;
            } else if (b.pos.x < -maxX) {
                b.pos.x = -maxX;
                b.vel.x = -b.vel.x * 0.5;
            }

            b.mesh.rotation.x += b.vel.z * delta * 2.1;
            b.mesh.rotation.y += b.rotSpeed.y * 0.55;
            b.mesh.rotation.z -= b.vel.x * delta * 2.1;

            // Elastic Pairwise Ball Collisions
            const minDist = BALL_RADIUS * 2;
            const minDistSq = minDist * minDist;

            for (let j = i + 1; j < numBalls; j++) {
                const b2 = balls[j];
                const dx = b2.pos.x - b.pos.x;
                if (Math.abs(dx) > minDist) continue;
                const dy2 = b2.pos.y - b.pos.y;
                if (Math.abs(dy2) > minDist) continue;
                const dz2 = b2.pos.z - b.pos.z;
                if (Math.abs(dz2) > minDist) continue;
                const distSq = dx * dx + dy2 * dy2 + dz2 * dz2;

                if (distSq < minDistSq && distSq > 0.0001) {
                    const dist = Math.sqrt(distSq);
                    const overlap = (minDist - dist) * 0.5;
                    const nx = dx / dist;
                    const ny = dy2 / dist;
                    const nz = dz2 / dist;

                    b.pos.x -= nx * overlap;
                    b.pos.y -= ny * overlap;
                    b.pos.z -= nz * overlap;
                    b2.pos.x += nx * overlap;
                    b2.pos.y += ny * overlap;
                    b2.pos.z += nz * overlap;

                    const vDot = (b.vel.x - b2.vel.x) * nx + (b.vel.y - b2.vel.y) * ny + (b.vel.z - b2.vel.z) * nz;
                    if (vDot > 0) {
                        const impulse = vDot * 0.7;
                        b.vel.x -= nx * impulse;
                        b.vel.y -= ny * impulse;
                        b.vel.z -= nz * impulse;
                        b2.vel.x += nx * impulse;
                        b2.vel.y += ny * impulse;
                        b2.vel.z += nz * impulse;
                    }
                }
            }
        }

        // Animate Exiting Ball along the discharge chute trajectory
        if (exitingBall) {
            exitingBall.progress += delta * 1.8;
            const t = Math.min(1.0, exitingBall.progress);

            const omt = 1 - t;
            _tempBezierPos.x = omt * omt * BEZIER_START.x + 2 * omt * t * BEZIER_MID.x + t * t * BEZIER_END.x;
            _tempBezierPos.y = omt * omt * BEZIER_START.y + 2 * omt * t * BEZIER_MID.y + t * t * BEZIER_END.y;
            _tempBezierPos.z = omt * omt * BEZIER_START.z + 2 * omt * t * BEZIER_MID.z + t * t * BEZIER_END.z;

            // Subtle landing bounce when reaching the collection dish
            if (t >= 0.92) {
                const bounceT = (t - 0.92) / 0.08;
                _tempBezierPos.y += Math.sin(bounceT * Math.PI) * 0.06;
            }

            exitingBall.mesh.position.copy(_tempBezierPos);
            exitingBall.mesh.rotation.x += delta * 12;

            if (t >= 1.0 && !exitingBall.finished) {
                exitingBall.finished = true;
                showExtractionModal(exitingBall.complaint, {
                    assignToGroupId: exitingBall.assignToGroupId || null
                });
            }
        }
    }

    // =========================================================================
    // 5. COMPLAINT EXTRACTION FLOW
    // =========================================================================
    function getAvailableByKind(wantTemplate) {
        return state.complaints.filter((c) => {
            if (c.extracted) return false;
            return wantTemplate ? isMemeTemplate(c) : !isMemeTemplate(c);
        });
    }

    function getActiveExtractButton(kind) {
        if (kind === 'template') return DOM.btnExtractTemplate;
        if (kind === 'combo') return DOM.btnExtractCombo;
        return DOM.btnExtractComplaint;
    }

    function resetExtractButtons() {
        if (DOM.btnExtractComplaint) {
            DOM.btnExtractComplaint.classList.remove('is-spinning');
            DOM.btnExtractComplaint.textContent = 'Estrai lamentela';
        }
        if (DOM.btnExtractTemplate) {
            DOM.btnExtractTemplate.classList.remove('is-spinning');
            DOM.btnExtractTemplate.textContent = 'Estrai base meme';
        }
        if (DOM.btnExtractCombo) {
            DOM.btnExtractCombo.classList.remove('is-spinning');
            DOM.btnExtractCombo.textContent = 'Estrai combo';
        }
        updateComboButtonState();
    }

    function updateComboButtonState() {
        if (!DOM.btnExtractCombo) return;
        const hasGroup = !!getActiveGroup();
        const hasComplaint = getAvailableByKind(false).length > 0;
        const hasTemplate = getAvailableByKind(true).length > 0;
        DOM.btnExtractCombo.disabled = state.isExtracting || !hasGroup || !hasComplaint || !hasTemplate;
    }

    function getActiveGroup() {
        return state.groups.find((g) => g.id === state.activeGroupId) || null;
    }

    function beginQueuedExit() {
        const nextComplaint = state.extractionQueue.shift();
        if (!nextComplaint) {
            state.isExtracting = false;
            state.assignGroupIdForExtraction = null;
            resetExtractButtons();
            return;
        }

        targetDrumSpeed = 7.5;

        const ballIndex = balls.findIndex((b) => b.complaint.id === nextComplaint.id);
        let winningMesh;

        if (ballIndex !== -1) {
            winningMesh = balls[ballIndex].mesh;
            balls.splice(ballIndex, 1);
        } else {
            const tintColor = assignBallColor(nextComplaint);
            winningMesh = nextComplaint.image
                ? createImageBallMesh(nextComplaint, tintColor)
                : createSolidBallMesh(tintColor);
            scene.add(winningMesh);
        }

        setTimeout(() => {
            targetDrumSpeed = 0.2;

            if (exitingBall && exitingBall.mesh) {
                scene.remove(exitingBall.mesh);
                disposeBallMesh(exitingBall.mesh);
            }

            winningMesh.position.set(0, 0.75, 0.15);
            exitingBall = {
                mesh: winningMesh,
                complaint: nextComplaint,
                assignToGroupId: state.assignGroupIdForExtraction,
                progress: 0,
                finished: false
            };
        }, 1600);
    }

    function triggerExtraction(kind) {
        if (state.isExtracting) return;

        if (kind === 'combo') {
            const group = getActiveGroup();
            if (!group) {
                alert('Seleziona un gruppo attivo prima di estrarre la combo.');
                return;
            }

            const availableComplaints = getAvailableByKind(false);
            const availableTemplates = getAvailableByKind(true);

            if (availableComplaints.length === 0 || availableTemplates.length === 0) {
                alert(
                    availableComplaints.length === 0
                        ? 'Nessuna lamentela disponibile da estrarre. Aggiungine una nuova per continuare.'
                        : 'Nessuna base meme disponibile da estrarre.'
                );
                return;
            }

            const chosenComplaint =
                availableComplaints[Math.floor(Math.random() * availableComplaints.length)];
            const chosenTemplate =
                availableTemplates[Math.floor(Math.random() * availableTemplates.length)];

            chosenComplaint.extracted = true;
            chosenTemplate.extracted = true;

            state.assignGroupIdForExtraction = group.id;
            state.extractionQueue = [chosenComplaint, chosenTemplate];
            state.isExtracting = true;

            const activeBtn = getActiveExtractButton('combo');
            if (activeBtn) {
                activeBtn.blur();
                activeBtn.classList.add('is-spinning');
            }
            updateComboButtonState();
            beginQueuedExit();
            return;
        }

        const wantTemplate = kind === 'template';
        const available = getAvailableByKind(wantTemplate);

        if (available.length === 0) {
            alert(
                wantTemplate
                    ? 'Nessuna base meme disponibile da estrarre.'
                    : 'Nessuna lamentela disponibile da estrarre. Aggiungine una nuova per continuare.'
            );
            return;
        }

        const chosenComplaint = available[Math.floor(Math.random() * available.length)];
        chosenComplaint.extracted = true;

        state.assignGroupIdForExtraction = null;
        state.extractionQueue = [chosenComplaint];
        state.isExtracting = true;

        const activeBtn = getActiveExtractButton(kind);
        if (activeBtn) {
            activeBtn.blur();
            activeBtn.classList.add('is-spinning');
        }
        updateComboButtonState();
        beginQueuedExit();
    }

    function stripQuotes(text) {
        if (!text) return '';
        return text
            .replace(/[«»“”]/g, '')
            .replace(/^["'\s]+|["'\s]+$/g, '')
            .trim();
    }

    // Encode spaces/special chars in local asset paths (e.g. Images/DOMS_221 Complaints...)
    function resolveAssetUrl(path) {
        if (!path) return path;
        return encodeURI(path);
    }

    let lastModalFocusEl = null;

    function showExtractionModal(complaint, options) {
        const record = !(options && options.record === false);
        const assignToGroupId =
            (options && options.assignToGroupId) || state.assignGroupIdForExtraction || null;

        if (record) {
            if (assignToGroupId) {
                assignToGroup(assignToGroupId, complaint);
            } else {
                state.extractedComplaints.unshift(complaint);
                renderExtractedList();
                updateBallCounters();
            }

            if (state.extractionQueue.length > 0) {
                window.clearTimeout(comboContinueTimer);
                comboContinueTimer = window.setTimeout(() => {
                    closeExtractionModal();
                    beginQueuedExit();
                }, 900);
            } else {
                state.isExtracting = false;
                state.assignGroupIdForExtraction = null;
                resetExtractButtons();
            }
        }

        const asTemplate = isMemeTemplate(complaint);

        if (complaint.image && (asTemplate || !complaint.text)) {
            if (DOM.modalText) {
                DOM.modalText.textContent = '';
                DOM.modalText.style.display = 'none';
            }
            if (DOM.modalImageContainer) {
                DOM.modalImageContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = resolveAssetUrl(complaint.image);
                img.alt = asTemplate ? 'Template base meme estratto' : 'Immagine lamentela estratta';
                img.className = 'modal-complaint-image';
                DOM.modalImageContainer.appendChild(img);
                DOM.modalImageContainer.style.display = 'flex';
            }
        } else {
            if (DOM.modalText) {
                DOM.modalText.textContent = stripQuotes(complaint.text) || '';
                DOM.modalText.style.display = 'block';
            }
            if (DOM.modalImageContainer) {
                DOM.modalImageContainer.innerHTML = '';
                if (complaint.image) {
                    const img = document.createElement('img');
                    img.src = resolveAssetUrl(complaint.image);
                    img.alt = 'Immagine lamentela estratta';
                    img.className = 'modal-complaint-image';
                    DOM.modalImageContainer.appendChild(img);
                    DOM.modalImageContainer.style.display = 'flex';
                } else {
                    DOM.modalImageContainer.style.display = 'none';
                }
            }
        }

        if (DOM.extractionModal) {
            DOM.extractionModal.setAttribute(
                'aria-label',
                asTemplate ? 'Template base meme estratto' : 'Lamentela estratta'
            );
            lastModalFocusEl = document.activeElement;
            DOM.extractionModal.classList.add('is-visible');
            const dialog = document.getElementById('extraction-modal-dialog');
            if (dialog && typeof dialog.focus === 'function') dialog.focus();
        }
    }

    function closeExtractionModal() {
        if (DOM.extractionModal) {
            DOM.extractionModal.classList.remove('is-visible');
        }
        if (lastModalFocusEl && typeof lastModalFocusEl.focus === 'function') {
            lastModalFocusEl.focus();
        }
        lastModalFocusEl = null;
    }

    // =========================================================================
    // 5b. WORKSHOP GROUPS
    // =========================================================================
    function assignToGroup(groupId, item) {
        const group = state.groups.find((g) => g.id === groupId);
        if (!group || !item) return;

        item.extracted = true;
        state.extractedComplaints = state.extractedComplaints.filter((c) => c.id !== item.id);

        if (isMemeTemplate(item)) {
            if (!group.templates.some((t) => t.id === item.id)) {
                group.templates.unshift(item);
            }
        } else if (!group.complaints.some((c) => c.id === item.id)) {
            group.complaints.unshift(item);
        }

        // Ensure cage sync drops any leftover ball for this id
        const ballIndex = balls.findIndex((b) => b.complaint && b.complaint.id === item.id);
        if (ballIndex !== -1) {
            scene.remove(balls[ballIndex].mesh);
            disposeBallMesh(balls[ballIndex].mesh);
            balls.splice(ballIndex, 1);
        }

        renderExtractedList();
        renderGroups();
        updateBallCounters();
        updateComboButtonState();
    }

    function setActiveGroup(groupId) {
        if (!state.groups.some((g) => g.id === groupId)) return;
        state.activeGroupId = groupId;
        renderGroups();
        updateComboButtonState();
    }

    function addGroup(name) {
        const trimmed = (name || '').trim() || ('Gruppo ' + state.nextGroupSerial);
        const id = 'group-' + Date.now() + '-' + state.nextGroupSerial;
        state.nextGroupSerial += 1;
        state.groups.push({
            id: id,
            name: trimmed,
            complaints: [],
            templates: []
        });
        state.activeGroupId = id;
        renderGroups();
        updateComboButtonState();
        renderExtractedList();
    }

    function renameGroup(groupId, name) {
        const group = state.groups.find((g) => g.id === groupId);
        if (!group) return;
        const trimmed = (name || '').trim();
        if (!trimmed) return;
        group.name = trimmed;
        renderExtractedList();
    }

    function removeGroup(groupId) {
        const group = state.groups.find((g) => g.id === groupId);
        if (!group) return;
        if (group.complaints.length || group.templates.length) {
            alert('Puoi eliminare solo un gruppo senza pezzi assegnati.');
            return;
        }
        if (state.groups.length <= 1) {
            alert('Serve almeno un gruppo.');
            return;
        }
        state.groups = state.groups.filter((g) => g.id !== groupId);
        if (state.activeGroupId === groupId) {
            state.activeGroupId = state.groups[0].id;
        }
        renderGroups();
        updateComboButtonState();
        renderExtractedList();
    }

    function appendAssignedCard(container, item, asTemplate) {
        appendExtractedCard(container, item, asTemplate, { showAssign: false });
    }

    function renderGroups() {
        const list = DOM.groupsList;
        if (!list) return;
        list.innerHTML = '';

        state.groups.forEach((group) => {
            const card = document.createElement('article');
            card.className = 'group-card' + (group.id === state.activeGroupId ? ' is-active' : '');
            card.setAttribute('role', 'listitem');
            card.dataset.groupId = group.id;

            const header = document.createElement('header');
            header.className = 'group-card-header';

            const nameInput = document.createElement('input');
            nameInput.className = 'group-card-name';
            nameInput.type = 'text';
            nameInput.value = group.name;
            nameInput.setAttribute('aria-label', 'Nome gruppo');
            nameInput.addEventListener('click', (e) => e.stopPropagation());
            nameInput.addEventListener('change', () => renameGroup(group.id, nameInput.value));
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    nameInput.blur();
                }
            });

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'group-card-remove';
            removeBtn.setAttribute('aria-label', 'Elimina gruppo');
            removeBtn.textContent = '×';
            removeBtn.disabled = group.complaints.length > 0 || group.templates.length > 0;
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeGroup(group.id);
            });

            header.appendChild(nameInput);
            header.appendChild(removeBtn);

            const slots = document.createElement('div');
            slots.className = 'group-slots';

            const complaintsSlot = document.createElement('div');
            complaintsSlot.className = 'group-slot';
            const complaintsLabel = document.createElement('p');
            complaintsLabel.className = 'group-slot-label';
            complaintsLabel.textContent = 'Lamentele';
            const complaintsList = document.createElement('div');
            complaintsList.className = 'group-slot-list';
            if (group.complaints.length === 0) {
                const empty = document.createElement('p');
                empty.className = 'group-slot-empty';
                empty.textContent = '—';
                complaintsList.appendChild(empty);
            } else {
                group.complaints.forEach((item) => appendAssignedCard(complaintsList, item, false));
            }
            complaintsSlot.appendChild(complaintsLabel);
            complaintsSlot.appendChild(complaintsList);

            const templatesSlot = document.createElement('div');
            templatesSlot.className = 'group-slot';
            const templatesLabel = document.createElement('p');
            templatesLabel.className = 'group-slot-label';
            templatesLabel.textContent = 'Basi meme';
            const templatesList = document.createElement('div');
            templatesList.className = 'group-slot-list group-templates';
            if (group.templates.length === 0) {
                const empty = document.createElement('p');
                empty.className = 'group-slot-empty';
                empty.textContent = '—';
                templatesList.appendChild(empty);
            } else {
                group.templates.forEach((item) => appendAssignedCard(templatesList, item, true));
            }
            templatesSlot.appendChild(templatesLabel);
            templatesSlot.appendChild(templatesList);

            slots.appendChild(complaintsSlot);
            slots.appendChild(templatesSlot);

            card.appendChild(header);
            card.appendChild(slots);
            card.addEventListener('click', () => setActiveGroup(group.id));

            list.appendChild(card);
        });
    }

    // =========================================================================
    // 6. UI INTERACTIONS & FORM HANDLING
    // =========================================================================
    function setupSidebarInteractions() {
        if (DOM.btnExtractComplaint) {
            DOM.btnExtractComplaint.addEventListener('click', () => {
                DOM.btnExtractComplaint.blur();
                triggerExtraction('complaint');
            });
        }

        if (DOM.btnExtractTemplate) {
            DOM.btnExtractTemplate.addEventListener('click', () => {
                DOM.btnExtractTemplate.blur();
                triggerExtraction('template');
            });
        }

        if (DOM.btnExtractCombo) {
            DOM.btnExtractCombo.addEventListener('click', () => {
                DOM.btnExtractCombo.blur();
                triggerExtraction('combo');
            });
        }

        if (DOM.formAddGroup) {
            DOM.formAddGroup.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = DOM.groupNameInput ? DOM.groupNameInput.value : '';
                addGroup(name);
                if (DOM.groupNameInput) DOM.groupNameInput.value = '';
            });
        }

        if (DOM.btnQuickSpin) {
            DOM.btnQuickSpin.addEventListener('click', () => {
                targetDrumSpeed = 5.5;
                setTimeout(() => (targetDrumSpeed = 0.2), 1400);
            });
        }

        if (DOM.btnResetCamera && controls) {
            DOM.btnResetCamera.addEventListener('click', () => {
                const home = getHomeCamera();
                camera.position.set(home.x, home.y, home.z);
                controls.target.set(home.tx, home.ty, home.tz);
                controls.minDistance = home.minDistance;
                controls.update();
            });
        }

        setupMediaUpload();

        if (DOM.formAdd) {
            DOM.formAdd.addEventListener('submit', (e) => {
                e.preventDefault();
                handleAddTextComplaint();
            });
        }

        if (DOM.btnAddText) {
            DOM.btnAddText.addEventListener('click', handleAddTextComplaint);
        }

        if (DOM.btnAddImage) {
            DOM.btnAddImage.addEventListener('click', handleAddImageComplaint);
        }

        if (DOM.extractionModal) {
            DOM.extractionModal.addEventListener('click', closeExtractionModal);
        }

        if (DOM.lightbox) {
            if (!DOM.lightbox.hasAttribute('tabindex')) {
                DOM.lightbox.setAttribute('tabindex', '-1');
            }
            DOM.lightbox.addEventListener('click', closeLightbox);
        }

        window.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (DOM.lightbox && DOM.lightbox.classList.contains('is-active')) {
                closeLightbox();
                return;
            }
            closeExtractionModal();
        });
    }

    function setupMediaUpload() {
        const dropzone = DOM.dropzone;
        const fileInput = DOM.fileInput;
        const btnRemove = DOM.btnRemovePreview;

        if (!dropzone || !fileInput) return;

        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) handleImageFile(file);
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageFile(e.dataTransfer.files[0]);
            }
        });

        if (btnRemove) {
            btnRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                state.selectedImageDataUrl = null;
                if (fileInput) fileInput.value = '';
                if (DOM.previewContainer) DOM.previewContainer.style.display = 'none';
                dropzone.style.display = 'flex';
            });
        }
    }

    function handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Per favore seleziona un file immagine valido (PNG, JPG, WebP, ecc.)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            state.selectedImageDataUrl = event.target.result;
            if (DOM.previewImg) DOM.previewImg.src = state.selectedImageDataUrl;
            if (DOM.previewContainer) DOM.previewContainer.style.display = 'flex';
            if (DOM.dropzone) DOM.dropzone.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    function flashPostButton(btn) {
        if (!btn) return;
        btn.classList.add('is-sent');
        setTimeout(() => btn.classList.remove('is-sent'), 450);
    }

    function pushComplaintIntoCage(newComplaint) {
        state.complaints.push(newComplaint);

        const newBall = create3DBall(newComplaint);
        newBall.pos.set(0, 2.3, 0);
        newBall.vel.set((Math.random() - 0.5) * 0.08, -0.28, (Math.random() - 0.5) * 0.08);
        balls.push(newBall);

        updateBallCounters();
    }

    function handleAddTextComplaint() {
        const rawText = DOM.textarea ? DOM.textarea.value.trim() : '';
        const textVal = stripQuotes(rawText);

        if (!textVal) {
            alert('Scrivi una lamentela prima di inviarla.');
            if (DOM.textarea) DOM.textarea.focus();
            return;
        }

        const colorIndex = state.complaints.length % COMPLAINT_BALL_PALETTE.length;
        pushComplaintIntoCage({
            id: Date.now(),
            color: COMPLAINT_BALL_PALETTE[colorIndex],
            text: textVal,
            image: null,
            kind: 'complaint',
            extracted: false
        });

        if (DOM.textarea) DOM.textarea.value = '';
        flashPostButton(DOM.btnAddText);
    }

    function handleAddImageComplaint() {
        if (!state.selectedImageDataUrl) {
            alert('Carica un’immagine prima di inviarla.');
            if (DOM.fileInput) DOM.fileInput.click();
            return;
        }

        const colorIndex = state.complaints.length % COMPLAINT_BALL_PALETTE.length;
        pushComplaintIntoCage({
            id: Date.now(),
            color: COMPLAINT_BALL_PALETTE[colorIndex],
            text: '',
            image: state.selectedImageDataUrl,
            kind: 'complaint',
            extracted: false
        });

        state.selectedImageDataUrl = null;
        if (DOM.fileInput) DOM.fileInput.value = '';
        if (DOM.previewContainer) DOM.previewContainer.style.display = 'none';
        if (DOM.dropzone) DOM.dropzone.style.display = 'flex';
        flashPostButton(DOM.btnAddImage);
    }

    function appendExtractedCard(container, complaint, asTemplate, options) {
        const showAssign = !(options && options.showAssign === false);
        const card = document.createElement('article');
        const imageOnly = !!(complaint.image && !complaint.text);
        card.className = 'complaint-card';
        if (asTemplate) {
            card.classList.add('template-card');
        } else if (imageOnly) {
            card.classList.add('image-card');
        }

        const reopen = () => showExtractionModal(complaint, { record: false });

        if (asTemplate || imageOnly) {
            if (!complaint.image) return;
            const img = document.createElement('img');
            img.src = resolveAssetUrl(complaint.image);
            img.alt = asTemplate ? 'Template base meme estratto' : 'Immagine lamentela estratta';
            img.className = 'card-image-thumb';
            img.loading = 'lazy';
            card.appendChild(img);
        } else if (complaint.text) {
            const textP = document.createElement('p');
            textP.className = 'card-body-text';
            textP.textContent = stripQuotes(complaint.text);
            card.appendChild(textP);
        }

        card.style.cursor = 'pointer';
        card.addEventListener('click', reopen);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                reopen();
            }
        });

        if (!showAssign || state.groups.length === 0) {
            container.appendChild(card);
            return;
        }

        const row = document.createElement('div');
        row.className = 'card-assign-row';

        const select = document.createElement('select');
        select.className = 'card-assign-select';
        select.setAttribute('aria-label', 'Assegna a gruppo');

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Assegna a…';
        select.appendChild(placeholder);

        state.groups.forEach((group) => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = group.name;
            select.appendChild(option);
        });

        select.addEventListener('click', (e) => e.stopPropagation());
        select.addEventListener('change', () => {
            const groupId = select.value;
            if (!groupId) return;
            assignToGroup(groupId, complaint);
        });

        row.appendChild(card);
        row.appendChild(select);
        container.appendChild(row);
    }

    function renderExtractedList() {
        const complaintsContainer = DOM.extractedList;
        const templatesContainer = DOM.extractedTemplates;

        if (complaintsContainer) complaintsContainer.innerHTML = '';
        if (templatesContainer) templatesContainer.innerHTML = '';

        state.extractedComplaints.forEach((item) => {
            if (isMemeTemplate(item)) {
                if (templatesContainer) appendExtractedCard(templatesContainer, item, true);
            } else if (complaintsContainer) {
                appendExtractedCard(complaintsContainer, item, false);
            }
        });
    }

    function updateBallCounters() {
        const activeCount = state.complaints.filter((c) => !c.extracted).length;
        if (DOM.ballCount) {
            DOM.ballCount.textContent = activeCount;
        }
        updateComboButtonState();
    }

    function openLightbox(src) {
        if (DOM.lightbox && DOM.lightboxImg) {
            lastModalFocusEl = document.activeElement;
            DOM.lightboxImg.src = src;
            DOM.lightbox.classList.add('is-active');
            DOM.lightbox.focus();
        }
    }

    function closeLightbox() {
        if (!DOM.lightbox) return;
        DOM.lightbox.classList.remove('is-active');
        if (lastModalFocusEl && typeof lastModalFocusEl.focus === 'function') {
            lastModalFocusEl.focus();
        }
        lastModalFocusEl = null;
    }

    // =========================================================================
    // 7. HIGH-PRECISION RENDER & ANIMATION LOOP
    // =========================================================================
    let lastTime = performance.now();
    let renderRaf = 0;
    let resizeTimer = 0;

    function renderLoop(currentTime) {
        if (document.hidden) {
            renderRaf = 0;
            return;
        }
        renderRaf = requestAnimationFrame(renderLoop);

        // Clamp delta time to avoid large physics steps
        const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
        lastTime = currentTime;

        // Frame-rate independent exponential Lerp
        drumSpeed += (targetDrumSpeed - drumSpeed) * (1 - Math.exp(-delta * 6.5));

        drumAngle += drumSpeed * delta;
        if (drumGroup) drumGroup.rotation.x = drumAngle;
        if (crankGroup) crankGroup.rotation.x = drumAngle;

        updateBallPhysics(delta);

        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
    }

    function startRenderLoop() {
        if (renderRaf || document.hidden) return;
        lastTime = performance.now();
        renderRaf = requestAnimationFrame(renderLoop);
    }

    function onWindowResize() {
        const container = DOM.canvasContainer;
        if (!container || !renderer || !camera) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function scheduleWindowResize() {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(onWindowResize, 100);
    }

    // Pause loop while tab is hidden; reset clock on resume to avoid physics jumps
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) startRenderLoop();
    });

    // =========================================================================
    // 8. ARE.NA CHANNEL LOADER
    // =========================================================================
    function pickArenaImageUrl(block) {
        const image = block && block.image;
        if (!image) return null;
        return (
            (image.display && image.display.url) ||
            (image.large && image.large.url) ||
            (image.square && image.square.url) ||
            (image.thumb && image.thumb.url) ||
            (image.original && image.original.url) ||
            null
        );
    }

    function arenaBlockToComplaint(block, index) {
        const imageUrl = pickArenaImageUrl(block);
        if (!imageUrl) return null;

        return {
            id: block.id || ('arena-' + index),
            color: '#ffffff',
            text: '',
            image: imageUrl,
            kind: 'template',
            extracted: false,
            source: 'are.na'
        };
    }

    function isMemeTemplate(item) {
        return !!(item && (item.kind === 'template' || item.source === 'are.na'));
    }

    async function fetchArenaChannelPage(page) {
        const url = ARENA_API_BASE + '/' + encodeURIComponent(ARENA_CHANNEL_SLUG) +
            '?page=' + page + '&per=' + ARENA_PER_PAGE;
        const response = await fetch(url, {
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Are.na HTTP ' + response.status);
        }
        return response.json();
    }

    async function loadArenaComplaints() {
        const complaints = [];
        let page = 1;
        let totalPages = 1;

        do {
            const data = await fetchArenaChannelPage(page);
            const contents = Array.isArray(data.contents) ? data.contents : [];
            contents.forEach((block) => {
                if (!block || block.class !== 'Image') return;
                const complaint = arenaBlockToComplaint(block, complaints.length);
                if (complaint) complaints.push(complaint);
            });

            totalPages = data.total_pages || Math.ceil((data.length || contents.length) / ARENA_PER_PAGE) || 1;
            page += 1;
        } while (page <= totalPages && page <= 20);

        return complaints;
    }

    // =========================================================================
    // 9. INITIALIZATION
    // =========================================================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Cache DOM nodes once
        DOM = {
            canvasContainer: document.getElementById('webgl-canvas-container'),
            ballCount: document.getElementById('stat-ball-count'),
            btnResetCamera: document.getElementById('btn-reset-camera'),
            btnExtractComplaint: document.getElementById('btn-extract-complaint'),
            btnExtractTemplate: document.getElementById('btn-extract-template'),
            btnExtractCombo: document.getElementById('btn-extract-combo'),
            btnQuickSpin: document.getElementById('btn-quick-spin'),
            formAdd: document.getElementById('form-add-complaint'),
            formAddGroup: document.getElementById('form-add-group'),
            groupNameInput: document.getElementById('group-name-input'),
            groupsList: document.getElementById('groups-list'),
            textarea: document.getElementById('complaint-text-input'),
            dropzone: document.getElementById('upload-dropzone'),
            fileInput: document.getElementById('file-input-complaint'),
            previewContainer: document.getElementById('image-preview-container'),
            previewImg: document.getElementById('preview-thumb-img'),
            btnRemovePreview: document.getElementById('btn-remove-preview'),
            btnAddText: document.getElementById('btn-add-text'),
            btnAddImage: document.getElementById('btn-add-image'),
            extractedList: document.getElementById('extracted-list-container'),
            extractedTemplates: document.getElementById('extracted-templates-container'),
            extractionModal: document.getElementById('extraction-modal'),
            modalText: document.getElementById('modal-complaint-text'),
            modalImageContainer: document.getElementById('modal-image-container'),
            lightbox: document.getElementById('lightbox-modal'),
            lightboxImg: document.getElementById('lightbox-img')
        };

        try {
            const arenaComplaints = await loadArenaComplaints();
            if (arenaComplaints.length > 0) {
                state.complaints = [
                    ...arenaComplaints,
                    ...INITIAL_COMPLAINTS.map((c) => ({ ...c, id: 'local-' + c.id, extracted: false }))
                ];
            }
        } catch (err) {
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                console.warn('Are.na seed unavailable.', err);
            }
        }

        init3D();
        setupSidebarInteractions();
        renderGroups();
        renderExtractedList();
        updateComboButtonState();
        if (typeof window.bindSiteMenu === 'function') {
            window.bindSiteMenu();
        }
    });
})();
