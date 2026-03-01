/* ============================================
   INVENTORY SYSTEM — Émile's Bag
   ============================================ */

const Inventory = (() => {
    const MAX_ITEMS = 12;
    let isOpen = false;
    let selectedItem = null;

    const items = {
        carnet: {
            id: 'carnet',
            name: 'Carnet de Beatrice',
            icon: '\uD83D\uDCD3',
            description: 'Un carnet de voyage usé, rempli d\'aquarelles et d\'annotations cryptiques. Les pages sentent le café et l\'encre.',
            permanent: true
        },
        moulin: {
            id: 'moulin',
            name: 'Moulin en laiton',
            icon: '\u2699\uFE0F',
            description: 'Le moulin à café portable de voyage, en laiton patiné. Un objet de précision mécanique que Béatrice emportait partout.',
            permanent: true
        },
        thermos: {
            id: 'thermos',
            name: 'Thermos cabossé',
            icon: '\uD83E\uDEF6',
            description: 'Un vieux thermos en acier inoxydable, cabossé par des années de voyage. Il garde encore le café chaud pendant des heures.',
            permanent: true
        },
        grains_mystere: {
            id: 'grains_mystere',
            name: 'Grains mystérieux',
            icon: '\u2615',
            description: 'Des grains de café non identifiés, trouvés dans le paquet de Béatrice. Leur arôme est complexe — notes de jasmin, de terre humide et de quelque chose d\'indéfinissable.',
        },
        enveloppe: {
            id: 'enveloppe',
            name: 'Enveloppe cachetée',
            icon: '\u2709\uFE0F',
            description: 'Une enveloppe en papier épais, cachetée à la cire rouge portant les initiales "B.T." L\'écriture sur le devant dit simplement : "Pour Émile, quand il sera prêt."',
        },
        cle_coffre: {
            id: 'cle_coffre',
            name: 'Clé en laiton',
            icon: '\uD83D\uDD11',
            description: 'Une petite clé en laiton trouvée dans l\'enveloppe. Elle semble correspondre au coffre de l\'arrière-boutique.',
        },
        page_carnet: {
            id: 'page_carnet',
            name: 'Pages détachées',
            icon: '\uD83D\uDCC4',
            description: 'Trois pages arrachées du carnet, trouvées dans le coffre. Chacune porte une aquarelle et des annotations en marge.',
        },
        photo_beatrice: {
            id: 'photo_beatrice',
            name: 'Photo de Béatrice',
            icon: '\uD83D\uDCF7',
            description: 'Une photo en noir et blanc de Béatrice jeune, debout devant un caféier en fleur. Au dos : "Kaffa, 1978. Là où tout commence."',
        }
    };

    function init() {
        const drawer = document.getElementById('inventory-drawer');
        const handle = document.getElementById('inventory-handle');

        // Swipe up to open, down to close
        handle.addEventListener('pointerup', toggle);

        // Close on game tap if open
        Touch.on('tap', () => {
            if (isOpen) close();
        });

        Touch.on('swipeUp', () => {
            if (!isOpen) open();
        });

        Touch.on('swipeDown', () => {
            if (isOpen) close();
        });

        // Item detail close
        document.getElementById('item-detail-close').addEventListener('pointerup', hideDetail);
        document.getElementById('item-detail-bg').addEventListener('pointerup', hideDetail);
    }

    function open() {
        isOpen = true;
        document.getElementById('inventory-drawer').classList.add('drawer-open');
        document.getElementById('inventory-drawer').classList.remove('drawer-closed');
        render();
    }

    function close() {
        isOpen = false;
        document.getElementById('inventory-drawer').classList.remove('drawer-open');
        document.getElementById('inventory-drawer').classList.add('drawer-closed');
    }

    function toggle() {
        isOpen ? close() : open();
    }

    function add(itemId) {
        if (Engine.state.inventory.length >= MAX_ITEMS) return false;
        if (Engine.state.inventory.includes(itemId)) return false;
        Engine.state.inventory.push(itemId);
        if (isOpen) render();

        // Brief haptic feedback simulation
        showPickupAnimation(itemId);
        return true;
    }

    function remove(itemId) {
        Engine.state.inventory = Engine.state.inventory.filter(id => id !== itemId);
        if (isOpen) render();
    }

    function has(itemId) {
        return Engine.state.inventory.includes(itemId);
    }

    function render() {
        const container = document.getElementById('inventory-items');
        container.innerHTML = '';

        Engine.state.inventory.forEach(itemId => {
            const item = items[itemId];
            if (!item) return;

            const el = document.createElement('div');
            el.className = 'inventory-item';
            el.dataset.itemId = itemId;
            el.innerHTML = `
                <span class="item-icon">${item.icon}</span>
                <span class="item-label">${item.name}</span>
            `;

            // Tap to show detail
            el.addEventListener('pointerup', (e) => {
                e.stopPropagation();
                showDetail(itemId);
            });

            container.appendChild(el);
        });
    }

    function showDetail(itemId) {
        const item = items[itemId];
        if (!item) return;

        selectedItem = itemId;
        document.getElementById('item-detail-visual').textContent = item.icon;
        document.getElementById('item-detail-name').textContent = item.name;
        document.getElementById('item-detail-desc').textContent = item.description;
        document.getElementById('item-detail').classList.remove('hidden');
    }

    function hideDetail() {
        selectedItem = null;
        document.getElementById('item-detail').classList.add('hidden');
    }

    function showPickupAnimation(itemId) {
        const item = items[itemId];
        if (!item) return;

        const hint = document.getElementById('interaction-hint');
        const hintText = document.getElementById('hint-text');
        hintText.textContent = `+ ${item.name}`;
        hint.classList.remove('hidden');
        hint.classList.add('visible');

        setTimeout(() => {
            hint.classList.remove('visible');
            setTimeout(() => hint.classList.add('hidden'), 300);
        }, 1500);
    }

    function getItem(itemId) {
        return items[itemId];
    }

    function registerItem(itemData) {
        items[itemData.id] = itemData;
    }

    return { init, open, close, add, remove, has, render, getItem, registerItem, showDetail };
})();
