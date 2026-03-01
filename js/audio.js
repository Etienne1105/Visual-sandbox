/* ============================================
   AUDIO — Ambient Sound & Music (Web Audio API)
   ============================================ */

const Audio = (() => {
    let ctx = null;
    let masterGain = null;
    let ambientGain = null;
    let musicGain = null;
    let currentAmbient = null;
    let ambientNodes = [];
    let isEnabled = true;

    function init() {
        // Audio context created on first user interaction
        document.addEventListener('pointerup', initContext, { once: true });
    }

    function initContext() {
        if (ctx) return;
        try {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = ctx.createGain();
            masterGain.gain.value = 0.5;
            masterGain.connect(ctx.destination);

            ambientGain = ctx.createGain();
            ambientGain.gain.value = 0.3;
            ambientGain.connect(masterGain);

            musicGain = ctx.createGain();
            musicGain.gain.value = 0.2;
            musicGain.connect(masterGain);
        } catch (e) {
            console.warn('Web Audio not supported:', e);
        }
    }

    // Synthesized ambient sounds using oscillators and noise
    function playAmbient(ambientType) {
        if (!ctx || !isEnabled) return;
        stopAmbient();
        currentAmbient = ambientType;

        switch (ambientType) {
            case 'montreal-cafe':
                createCafeAmbient();
                break;
            case 'montreal-exterior':
                createExteriorAmbient();
                break;
            case 'montreal-back':
                createWorkshopAmbient();
                break;
        }
    }

    function stopAmbient() {
        ambientNodes.forEach(node => {
            try {
                node.stop();
            } catch (e) {
                // Node may already be stopped
            }
        });
        ambientNodes = [];
    }

    // Cafe ambient: low hum + occasional tinkle
    function createCafeAmbient() {
        // Low warm hum (room tone)
        const hum = ctx.createOscillator();
        hum.type = 'sine';
        hum.frequency.value = 85;
        const humGain = ctx.createGain();
        humGain.gain.value = 0.03;
        hum.connect(humGain);
        humGain.connect(ambientGain);
        hum.start();
        ambientNodes.push(hum);

        // Second harmonic
        const hum2 = ctx.createOscillator();
        hum2.type = 'sine';
        hum2.frequency.value = 170;
        const hum2Gain = ctx.createGain();
        hum2Gain.gain.value = 0.01;
        hum2.connect(hum2Gain);
        hum2Gain.connect(ambientGain);
        hum2.start();
        ambientNodes.push(hum2);

        // Periodic steam hiss (noise bursts)
        scheduleSteamHiss();
    }

    function scheduleSteamHiss() {
        if (currentAmbient !== 'montreal-cafe') return;

        const interval = 4000 + Math.random() * 8000;
        setTimeout(() => {
            if (!ctx || currentAmbient !== 'montreal-cafe') return;
            playSteamHiss();
            scheduleSteamHiss();
        }, interval);
    }

    function playSteamHiss() {
        if (!ctx) return;
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            const envelope = Math.sin(t * Math.PI) * 0.03;
            data[i] = (Math.random() * 2 - 1) * envelope;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        // Highpass filter for steam sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 3000;

        source.connect(filter);
        filter.connect(ambientGain);
        source.start();
    }

    function createExteriorAmbient() {
        // Wind-like noise
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * 0.02 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.3));
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        source.connect(filter);
        filter.connect(ambientGain);
        source.start();
        ambientNodes.push(source);
    }

    function createWorkshopAmbient() {
        // Deep mechanical rumble
        const rumble = ctx.createOscillator();
        rumble.type = 'sawtooth';
        rumble.frequency.value = 42;
        const rumbleGain = ctx.createGain();
        rumbleGain.gain.value = 0.015;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;

        rumble.connect(filter);
        filter.connect(rumbleGain);
        rumbleGain.connect(ambientGain);
        rumble.start();
        ambientNodes.push(rumble);
    }

    // UI sounds
    function playTap() {
        if (!ctx || !isEnabled) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 800;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }

    function playSuccess() {
        if (!ctx || !isEnabled) return;
        const notes = [523, 659, 784]; // C5, E5, G5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.15 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.5);
        });
    }

    function playPickup() {
        if (!ctx || !isEnabled) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }

    function toggle() {
        isEnabled = !isEnabled;
        if (!isEnabled) stopAmbient();
        return isEnabled;
    }

    return { init, playAmbient, stopAmbient, playTap, playSuccess, playPickup, toggle };
})();
