/* ============================================
   TOUCH CONTROLS — Tap, Swipe, Hold, Drag
   ============================================ */

const Touch = (() => {
    let startX = 0, startY = 0;
    let startTime = 0;
    let moved = false;
    let holdTimer = null;
    let isDragging = false;
    let dragItem = null;

    const SWIPE_THRESHOLD = 50;
    const HOLD_DURATION = 500;
    const TAP_THRESHOLD = 10;

    const handlers = {
        tap: [],
        hold: [],
        swipeLeft: [],
        swipeRight: [],
        swipeUp: [],
        swipeDown: [],
        drag: [],
        dragEnd: [],
        pan: []
    };

    function init() {
        const container = document.getElementById('scene-container');

        container.addEventListener('pointerdown', onPointerDown, { passive: false });
        container.addEventListener('pointermove', onPointerMove, { passive: false });
        container.addEventListener('pointerup', onPointerUp, { passive: false });
        container.addEventListener('pointercancel', onPointerUp, { passive: false });

        // Prevent default touch behaviors
        document.addEventListener('touchmove', e => {
            if (e.target.closest('#notebook-content') || e.target.closest('#inventory-bag')) return;
            e.preventDefault();
        }, { passive: false });
    }

    function onPointerDown(e) {
        startX = e.clientX;
        startY = e.clientY;
        startTime = Date.now();
        moved = false;
        isDragging = false;

        // Hold detection
        holdTimer = setTimeout(() => {
            if (!moved) {
                emit('hold', { x: startX, y: startY, target: e.target });
            }
        }, HOLD_DURATION);
    }

    function onPointerMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > TAP_THRESHOLD) {
            moved = true;
            clearTimeout(holdTimer);

            if (isDragging && dragItem) {
                emit('drag', { x: e.clientX, y: e.clientY, item: dragItem });
            } else {
                // Pan panorama
                emit('pan', { deltaX: e.movementX || 0, x: e.clientX, y: e.clientY });
            }
        }
    }

    function onPointerUp(e) {
        clearTimeout(holdTimer);
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const elapsed = Date.now() - startTime;

        if (isDragging && dragItem) {
            emit('dragEnd', { x: e.clientX, y: e.clientY, item: dragItem });
            dragItem = null;
            isDragging = false;
            return;
        }

        if (!moved && elapsed < HOLD_DURATION) {
            // Tap
            emit('tap', { x: e.clientX, y: e.clientY, target: e.target });
        } else if (moved) {
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            if (absDx > SWIPE_THRESHOLD || absDy > SWIPE_THRESHOLD) {
                if (absDx > absDy) {
                    emit(dx > 0 ? 'swipeRight' : 'swipeLeft', { distance: absDx });
                } else {
                    emit(dy > 0 ? 'swipeDown' : 'swipeUp', { distance: absDy });
                }
            }
        }
    }

    function on(event, callback) {
        if (handlers[event]) {
            handlers[event].push(callback);
        }
    }

    function off(event, callback) {
        if (handlers[event]) {
            handlers[event] = handlers[event].filter(cb => cb !== callback);
        }
    }

    function emit(event, data) {
        if (handlers[event]) {
            handlers[event].forEach(cb => cb(data));
        }
    }

    function startDrag(item) {
        isDragging = true;
        dragItem = item;
    }

    return { init, on, off, startDrag };
})();
