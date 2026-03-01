/* ============================================
   GAME ENGINE — State, Scenes, Save/Load
   ============================================ */

const Engine = (() => {
    // Game state
    const state = {
        chapter: 0,
        scene: null,
        inventory: [],
        notebook: { pages: [], unlockedRecipes: [], clues: [] },
        flags: {},
        dialogueHistory: [],
        currentPuzzle: null,
        visitedScenes: [],
        saves: {}
    };

    // Scene registry
    const scenes = {};
    const chapters = {};

    function registerScene(id, sceneData) {
        scenes[id] = sceneData;
    }

    function registerChapter(num, chapterData) {
        chapters[num] = chapterData;
    }

    function getScene(id) {
        return scenes[id] || null;
    }

    // State management
    function setFlag(key, value) {
        state.flags[key] = value;
    }

    function getFlag(key) {
        return state.flags[key];
    }

    function hasFlag(key) {
        return key in state.flags;
    }

    // Scene transitions
    async function loadScene(sceneId) {
        const scene = scenes[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        const transition = document.getElementById('scene-transition');
        transition.classList.add('fade-in');

        await wait(600);

        // Clean current scene
        clearScene();

        // Set new scene
        state.scene = sceneId;
        if (!state.visitedScenes.includes(sceneId)) {
            state.visitedScenes.push(sceneId);
        }

        // Render scene
        scene.render();

        // Update HUD
        updateHUD(scene);

        // Start ambient
        if (scene.ambient) {
            Audio.playAmbient(scene.ambient);
        }

        await wait(100);
        transition.classList.remove('fade-in');

        // Run scene enter script
        if (scene.onEnter) {
            await scene.onEnter();
        }
    }

    function clearScene() {
        ['scene-bg', 'scene-mid', 'scene-fg', 'scene-objects', 'scene-characters', 'particles-layer'].forEach(id => {
            document.getElementById(id).innerHTML = '';
        });
        const panorama = document.getElementById('scene-panorama');
        panorama.style.transform = '';
        panorama.style.width = '';
    }

    function updateHUD(scene) {
        document.getElementById('hud-location').textContent = scene.location || '';
        document.getElementById('hud-chapter').textContent = scene.chapter ? `Ch. ${scene.chapter}` : '';
    }

    // Screen management
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // Cutscene
    async function playCutscene(cutscene) {
        const visual = document.getElementById('cutscene-visual');
        const text = document.getElementById('cutscene-text');
        const screen = document.getElementById('cutscene-screen');

        showScreen('cutscene-screen');

        for (const frame of cutscene.frames) {
            visual.innerHTML = frame.visual || '';
            text.textContent = '';

            // Typewriter
            await typewrite(text, frame.text, 35);

            // Wait for tap
            await waitForTap(screen);
        }

        showScreen('game-screen');
    }

    // Save/Load
    function save() {
        const saveData = JSON.stringify(state);
        try {
            localStorage.setItem('gcf_save', saveData);
        } catch (e) {
            console.warn('Save failed:', e);
        }
    }

    function load() {
        try {
            const data = localStorage.getItem('gcf_save');
            if (data) {
                const saved = JSON.parse(data);
                Object.assign(state, saved);
                return true;
            }
        } catch (e) {
            console.warn('Load failed:', e);
        }
        return false;
    }

    function hasSave() {
        return !!localStorage.getItem('gcf_save');
    }

    // Utilities
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typewrite(element, text, speed = 30) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await wait(speed);
        }
    }

    function waitForTap(element) {
        return new Promise(resolve => {
            const handler = () => {
                element.removeEventListener('pointerup', handler);
                resolve();
            };
            element.addEventListener('pointerup', handler);
        });
    }

    // Panorama
    let panoramaWidth = 0;
    let panoramaOffset = 0;

    function setPanoramaWidth(width) {
        panoramaWidth = width;
        panoramaOffset = 0;
        const panorama = document.getElementById('scene-panorama');
        panorama.style.width = width + 'px';
        panorama.style.transform = 'translateX(0)';
    }

    function scrollPanorama(deltaX) {
        if (panoramaWidth <= window.innerWidth) return;
        const maxScroll = panoramaWidth - window.innerWidth;
        panoramaOffset = Math.max(-maxScroll, Math.min(0, panoramaOffset + deltaX));
        document.getElementById('scene-panorama').style.transform = `translateX(${panoramaOffset}px)`;
    }

    function getPanoramaOffset() {
        return panoramaOffset;
    }

    return {
        state, scenes, chapters,
        registerScene, registerChapter, getScene,
        setFlag, getFlag, hasFlag,
        loadScene, clearScene, showScreen, playCutscene,
        save, load, hasSave,
        wait, typewrite, waitForTap,
        setPanoramaWidth, scrollPanorama, getPanoramaOffset
    };
})();
