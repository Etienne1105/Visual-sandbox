/* ============================================
   NOTEBOOK — Béatrice's Travel Journal
   ============================================ */

const Notebook = (() => {
    let isOpen = false;
    let currentTab = 'journal';
    let currentPage = 0;

    const tabs = [
        { id: 'journal', label: 'Journal' },
        { id: 'carte', label: 'Carte' },
        { id: 'recettes', label: 'Recettes' },
        { id: 'indices', label: 'Indices' }
    ];

    const pages = {
        journal: [],
        carte: null,
        recettes: [],
        indices: []
    };

    function init() {
        const edge = document.getElementById('notebook-edge');
        const panel = document.getElementById('notebook-panel');

        // Swipe from right edge opens notebook
        edge.addEventListener('pointerup', toggle);

        // Build tabs
        renderTabs();

        // Setup swipe handler for right edge of screen
        Touch.on('swipeLeft', (data) => {
            if (!isOpen) open();
        });

        Touch.on('swipeRight', (data) => {
            if (isOpen) close();
        });
    }

    function open() {
        isOpen = true;
        document.getElementById('notebook-panel').classList.add('panel-open');
        document.getElementById('notebook-panel').classList.remove('panel-closed');
        renderPage();
    }

    function close() {
        isOpen = false;
        document.getElementById('notebook-panel').classList.remove('panel-open');
        document.getElementById('notebook-panel').classList.add('panel-closed');
    }

    function toggle() {
        isOpen ? close() : open();
    }

    function renderTabs() {
        const container = document.getElementById('notebook-tabs');
        container.innerHTML = '';
        tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = `notebook-tab ${tab.id === currentTab ? 'active' : ''}`;
            btn.textContent = tab.label;
            btn.addEventListener('pointerup', () => {
                currentTab = tab.id;
                currentPage = 0;
                renderTabs();
                renderPage();
            });
            container.appendChild(btn);
        });
    }

    function renderPage() {
        const left = document.getElementById('notebook-left');
        const right = document.getElementById('notebook-right');

        switch (currentTab) {
            case 'journal':
                renderJournal(left, right);
                break;
            case 'carte':
                renderMap(left, right);
                break;
            case 'recettes':
                renderRecipes(left, right);
                break;
            case 'indices':
                renderClues(left, right);
                break;
        }
    }

    function renderJournal(left, right) {
        const journalPages = pages.journal;
        if (journalPages.length === 0) {
            left.innerHTML = `
                <h3>Journal de voyage</h3>
                <p class="note-hand">Le carnet est presque vide pour l'instant. Les pages de Beatrice attendent d'etre redecouvertes...</p>
                <div class="note-sketch">[ Aquarelle a venir ]</div>
            `;
            right.innerHTML = `
                <p class="note-hand" style="margin-top: 40px; opacity: 0.5; text-align: center;">
                    "Le voyage commence par un premier pas,<br>et le premier pas commence par une tasse."<br><br>— B.T.
                </p>
            `;
        } else {
            const page = journalPages[currentPage];
            left.innerHTML = page.left || '';
            right.innerHTML = page.right || '';
        }
    }

    function renderMap(left, right) {
        left.innerHTML = '';
        right.innerHTML = '';

        const mapContainer = document.createElement('div');
        mapContainer.style.cssText = 'grid-column: span 2; padding: 10px;';
        left.innerHTML = `
            <h3>Carte du monde</h3>
            <div style="width:100%; aspect-ratio:2/1; border:1px solid rgba(0,0,0,0.1); border-radius:8px; background:#e8e0d0; position:relative; margin-top:12px; overflow:hidden;">
                ${renderWorldMap()}
            </div>
            <p class="note-hand" style="margin-top:12px; font-size:0.8rem; text-align:center;">Les lieux visites s'illuminent au fil du voyage.</p>
        `;
        right.innerHTML = `
            <h3>Destinations</h3>
            <div style="margin-top:8px;">
                ${getDestinations().map(d => `
                    <div style="display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.05); opacity:${d.visited ? 1 : 0.3};">
                        <span style="font-size:1.2rem;">${d.flag}</span>
                        <div>
                            <div style="font-size:0.8rem; font-weight:600;">${d.city}</div>
                            <div style="font-size:0.65rem; color:#8a7a6a;">${d.country}</div>
                        </div>
                        ${d.visited ? '<span style="margin-left:auto; color:#7a8b6f; font-size:0.7rem;">&#10003;</span>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderWorldMap() {
        const destinations = getDestinations();
        const points = destinations.map(d => {
            const color = d.visited ? '#8b3a2a' : 'rgba(0,0,0,0.15)';
            const r = d.visited ? 4 : 2;
            return `<circle cx="${d.mapX}%" cy="${d.mapY}%" r="${r}" fill="${color}" ${d.visited ? 'class="map-dot-active"' : ''}/>`;
        });

        // Draw path between visited
        const visited = destinations.filter(d => d.visited);
        let pathD = '';
        if (visited.length > 1) {
            pathD = visited.map((d, i) => `${i === 0 ? 'M' : 'L'} ${d.mapX}% ${d.mapY}%`).join(' ');
        }

        return `
            <svg viewBox="0 0 100 50" style="width:100%;height:100%;" preserveAspectRatio="xMidYMid meet">
                ${pathD ? `<path d="${pathD}" fill="none" stroke="#c8956c" stroke-width="0.3" stroke-dasharray="1,1" opacity="0.5"/>` : ''}
                ${points.join('\n')}
            </svg>
        `;
    }

    function getDestinations() {
        const visited = Engine.state.visitedScenes || [];
        return [
            { city: 'Montreal', country: 'Canada', flag: '\uD83C\uDDE8\uD83C\uDDE6', mapX: 22, mapY: 22, visited: Engine.state.chapter >= 1 },
            { city: 'Addis-Abeba', country: 'Ethiopie', flag: '\uD83C\uDDEA\uD83C\uDDF9', mapX: 57, mapY: 38, visited: Engine.state.chapter >= 2 },
            { city: 'Istanbul', country: 'Turquie', flag: '\uD83C\uDDF9\uD83C\uDDF7', mapX: 53, mapY: 24, visited: Engine.state.chapter >= 3 },
            { city: 'Vienne', country: 'Autriche', flag: '\uD83C\uDDE6\uD83C\uDDF9', mapX: 50, mapY: 20, visited: Engine.state.chapter >= 4 },
            { city: 'Kyoto', country: 'Japon', flag: '\uD83C\uDDEF\uD83C\uDDF5', mapX: 82, mapY: 25, visited: Engine.state.chapter >= 5 },
            { city: 'Marrakech', country: 'Maroc', flag: '\uD83C\uDDF2\uD83C\uDDE6', mapX: 44, mapY: 28, visited: Engine.state.chapter >= 6 },
            { city: 'Sao Paulo', country: 'Bresil', flag: '\uD83C\uDDE7\uD83C\uDDF7', mapX: 30, mapY: 42, visited: Engine.state.chapter >= 7 },
            { city: 'Hanoi', country: 'Vietnam', flag: '\uD83C\uDDFB\uD83C\uDDF3', mapX: 76, mapY: 32, visited: Engine.state.chapter >= 8 },
            { city: 'Bogota', country: 'Colombie', flag: '\uD83C\uDDE8\uD83C\uDDF4', mapX: 24, mapY: 37, visited: Engine.state.chapter >= 9 },
            { city: '???', country: '???', flag: '\u2753', mapX: 26, mapY: 39, visited: Engine.state.chapter >= 10 }
        ];
    }

    function renderRecipes(left, right) {
        const recipes = Engine.state.notebook.unlockedRecipes || [];
        if (recipes.length === 0) {
            left.innerHTML = `
                <h3>Recettes de cafe</h3>
                <p class="note-hand" style="opacity:0.5;">Aucune recette decouverte pour l'instant. Chaque pays revelera ses secrets...</p>
            `;
            right.innerHTML = '';
        } else {
            left.innerHTML = `<h3>Recettes de cafe</h3>` + recipes.map(r => `
                <div style="margin:12px 0; padding:10px; border:1px solid rgba(0,0,0,0.1); border-radius:6px; background:rgba(0,0,0,0.02);">
                    <div style="font-weight:600; font-size:0.85rem;">${r.name}</div>
                    <div class="note-hand" style="font-size:0.75rem; margin-top:4px;">${r.origin}</div>
                </div>
            `).join('');
            right.innerHTML = '';
        }
    }

    function renderClues(left, right) {
        const clues = Engine.state.notebook.clues || [];
        if (clues.length === 0) {
            left.innerHTML = `
                <h3>Indices</h3>
                <p class="note-hand" style="opacity:0.5;">Les indices se reveleront au fil de l'aventure...</p>
            `;
            right.innerHTML = '';
        } else {
            left.innerHTML = `<h3>Indices</h3>` + clues.map(c => `
                <div style="margin:12px 0; padding:10px; border-left:3px solid #c8956c; padding-left:12px;">
                    <div class="note-hand" style="font-size:0.85rem;">${c.text}</div>
                    <div style="font-size:0.65rem; color:#8a7a6a; margin-top:4px;">${c.source}</div>
                </div>
            `).join('');
            right.innerHTML = '';
        }
    }

    // Public API to add content
    function addJournalPage(pageData) {
        pages.journal.push(pageData);
    }

    function addRecipe(recipe) {
        if (!Engine.state.notebook.unlockedRecipes) Engine.state.notebook.unlockedRecipes = [];
        Engine.state.notebook.unlockedRecipes.push(recipe);
    }

    function addClue(clue) {
        if (!Engine.state.notebook.clues) Engine.state.notebook.clues = [];
        Engine.state.notebook.clues.push(clue);
    }

    return { init, open, close, toggle, addJournalPage, addRecipe, addClue };
})();
