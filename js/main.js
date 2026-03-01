/* ============================================
   MAIN — Game initialization & boot
   ============================================ */

(function() {
    'use strict';

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Init systems
        Touch.init();
        Audio.init();
        Inventory.init();
        Notebook.init();
        Dialogue.init();

        // Register chapters
        Chapter1.register();

        // Panorama scrolling
        Touch.on('pan', (data) => {
            if (Dialogue.isActive()) return;
            Engine.scrollPanorama(data.deltaX);
        });

        // Check for save
        if (Engine.hasSave()) {
            document.getElementById('btn-continue').style.display = 'block';
        }

        // New game button
        document.getElementById('btn-new-game').addEventListener('pointerup', () => {
            Audio.playTap();
            startNewGame();
        });

        // Continue button
        document.getElementById('btn-continue').addEventListener('pointerup', () => {
            Audio.playTap();
            continueGame();
        });

        // Menu button
        document.getElementById('hud-menu').addEventListener('pointerup', () => {
            Audio.playTap();
            toggleMenu();
        });

        // Prevent context menu on long press
        document.addEventListener('contextmenu', e => e.preventDefault());
    }

    async function startNewGame() {
        // Reset state
        Engine.state.chapter = 1;
        Engine.state.inventory = [];
        Engine.state.notebook = { pages: [], unlockedRecipes: [], clues: [] };
        Engine.state.flags = {};
        Engine.state.dialogueHistory = [];
        Engine.state.visitedScenes = [];

        // Show game screen
        Engine.showScreen('game-screen');

        // Play intro cutscene
        await Engine.playCutscene({
            frames: [
                {
                    visual: '<div style="font-size:2rem; text-align:center; line-height:1.5;">\u2615</div>',
                    text: 'Montreal. Automne 2026.'
                },
                {
                    visual: '<div style="background:linear-gradient(135deg,#8b3a2a,#3a2210); width:100%; height:100%; display:flex; align-items:center; justify-content:center;"><div style="font-family:Georgia; font-size:1rem; color:#c8956c; text-align:center; padding:20px;">BRUME & GRAINS<br><span style="font-size:0.7rem; opacity:0.6;">Torrefacteur artisanal</span></div></div>',
                    text: 'Trois ans que Beatrice Tessier a disparu. Trois ans que son petit-fils Emile tient seul le cafe qu\'elle a fonde.'
                },
                {
                    visual: '<div style="background:#1a1209; width:100%; height:100%; display:flex; align-items:center; justify-content:center;"><div style="font-size:3rem;">\uD83D\uDCDE</div></div>',
                    text: 'Ce matin, un appel de la notaire a tout change. Un heritage inattendu. Un paquet mysterieux. Et un carnet de voyage qui pourrait tout reveler.'
                },
                {
                    visual: '<div style="background:linear-gradient(180deg,#9a8b7a,#c4b5a4); width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px;"><div style="font-family:\'Segoe Script\',cursive; font-size:1.5rem; color:#3a2210;">Chapitre 1</div><div style="font-family:Georgia; font-size:0.9rem; color:#5a4a3a;">L\'Heritage</div></div>',
                    text: ''
                }
            ]
        });

        // Load first scene
        await Engine.loadScene('ch1_exterior');
    }

    async function continueGame() {
        if (Engine.load()) {
            Engine.showScreen('game-screen');
            const scene = Engine.state.scene || 'ch1_exterior';

            // Restore inventory
            if (Engine.state.inventory.length > 0) {
                Inventory.render();
            }

            await Engine.loadScene(scene);
        } else {
            startNewGame();
        }
    }

    function toggleMenu() {
        // Simple menu overlay
        const existing = document.getElementById('game-menu');
        if (existing) {
            existing.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.id = 'game-menu';
        menu.style.cssText = `
            position:absolute; inset:0; z-index:95;
            background:rgba(10,10,10,0.92);
            backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
            display:flex; flex-direction:column;
            align-items:center; justify-content:center; gap:16px;
            padding: env(safe-area-inset-top, 20px) 20px env(safe-area-inset-bottom, 20px);
        `;

        const title = document.createElement('div');
        title.style.cssText = 'font-family:var(--font-serif); font-size:1.2rem; color:var(--cream); margin-bottom:20px;';
        title.textContent = 'Global Coffee House';
        menu.appendChild(title);

        const buttons = [
            { label: 'Reprendre', action: () => menu.remove() },
            { label: 'Sauvegarder', action: () => { Engine.save(); showMenuFeedback(menu, 'Partie sauvegardee.'); } },
            { label: 'Carnet', action: () => { menu.remove(); Notebook.open(); } },
            { label: 'Inventaire', action: () => { menu.remove(); Inventory.open(); } },
            {
                label: Audio.toggle ? 'Son : On/Off' : 'Son',
                action: () => {
                    const isOn = Audio.toggle();
                    showMenuFeedback(menu, isOn ? 'Son active' : 'Son desactive');
                }
            }
        ];

        buttons.forEach(btn => {
            const el = document.createElement('button');
            el.style.cssText = `
                width:220px; padding:12px 20px;
                font-family:var(--font-serif); font-size:0.9rem;
                letter-spacing:0.05em;
                border:1px solid rgba(200,149,108,0.3);
                background:transparent; color:var(--cream);
                border-radius:8px; cursor:pointer;
            `;
            el.textContent = btn.label;
            el.addEventListener('pointerup', btn.action);
            menu.appendChild(el);
        });

        // Chapter info
        const info = document.createElement('div');
        info.style.cssText = 'font-family:var(--font-serif); font-size:0.7rem; color:var(--brass); opacity:0.5; margin-top:30px; text-align:center;';
        info.innerHTML = `Chapitre ${Engine.state.chapter || 1} — Montreal<br>Global Coffee House: Le Dernier Grain`;
        menu.appendChild(info);

        document.getElementById('game-screen').appendChild(menu);
    }

    function showMenuFeedback(menu, text) {
        let fb = menu.querySelector('.menu-feedback');
        if (!fb) {
            fb = document.createElement('div');
            fb.className = 'menu-feedback';
            fb.style.cssText = 'font-family:var(--font-serif); font-size:0.8rem; color:#7a8b6f; margin-top:8px;';
            menu.appendChild(fb);
        }
        fb.textContent = text;
        setTimeout(() => { if (fb) fb.textContent = ''; }, 2000);
    }
})();
