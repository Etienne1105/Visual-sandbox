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
            case 'ethiopia-piazza':
                createEthiopiaPiazzaAmbient();
                break;
            case 'ethiopia-ceremony':
                createEthiopiaCeremonyAmbient();
                break;
            case 'ethiopia-forest':
                createEthiopiaForestAmbient();
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

    // Ethiopia — Piazza street sounds
    function createEthiopiaPiazzaAmbient() {
        // Warm drone
        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.value = 120;
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.02;
        drone.connect(droneGain);
        droneGain.connect(ambientGain);
        drone.start();
        ambientNodes.push(drone);

        // Distant voices/market buzz — filtered noise
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * 0.015 * (0.6 + 0.4 * Math.sin(t * Math.PI * 2 * 0.2));
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 600;
        bandpass.Q.value = 0.8;
        noiseSource.connect(bandpass);
        bandpass.connect(ambientGain);
        noiseSource.start();
        ambientNodes.push(noiseSource);

        // Bird calls
        scheduleEthiopianBirds();
    }

    function scheduleEthiopianBirds() {
        if (currentAmbient !== 'ethiopia-piazza' && currentAmbient !== 'ethiopia-forest') return;
        setTimeout(() => {
            if (!ctx || (currentAmbient !== 'ethiopia-piazza' && currentAmbient !== 'ethiopia-forest')) return;
            playBirdCall();
            scheduleEthiopianBirds();
        }, 3000 + Math.random() * 7000);
    }

    function playBirdCall() {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        const baseFreq = 1200 + Math.random() * 800;
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, ctx.currentTime + 0.3);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ambientGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    }

    // Ethiopia — Ceremony (fire crackle, mortar rhythm)
    function createEthiopiaCeremonyAmbient() {
        // Fire crackle
        const bufferSize = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            const crackle = Math.random() > 0.97 ? (Math.random() - 0.5) * 0.15 : 0;
            data[i] = (Math.random() * 2 - 1) * 0.008 + crackle;
        }
        const fireSource = ctx.createBufferSource();
        fireSource.buffer = buffer;
        fireSource.loop = true;
        const fireFilter = ctx.createBiquadFilter();
        fireFilter.type = 'bandpass';
        fireFilter.frequency.value = 2000;
        fireFilter.Q.value = 0.5;
        fireSource.connect(fireFilter);
        fireFilter.connect(ambientGain);
        fireSource.start();
        ambientNodes.push(fireSource);

        // Low warm tone
        const warmth = ctx.createOscillator();
        warmth.type = 'sine';
        warmth.frequency.value = 90;
        const warmGain = ctx.createGain();
        warmGain.gain.value = 0.02;
        warmth.connect(warmGain);
        warmGain.connect(ambientGain);
        warmth.start();
        ambientNodes.push(warmth);

        // Mortar rhythm
        scheduleMortarRhythm();
    }

    function scheduleMortarRhythm() {
        if (currentAmbient !== 'ethiopia-ceremony') return;
        setTimeout(() => {
            if (!ctx || currentAmbient !== 'ethiopia-ceremony') return;
            playMortarHit();
            scheduleMortarRhythm();
        }, 800 + Math.random() * 400);
    }

    function playMortarHit() {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ambientGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    }

    // Ethiopia — Forest (birds, insects, deep ambience)
    function createEthiopiaForestAmbient() {
        // Deep forest drone
        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.value = 65;
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.025;
        drone.connect(droneGain);
        droneGain.connect(ambientGain);
        drone.start();
        ambientNodes.push(drone);

        // Second drone
        const drone2 = ctx.createOscillator();
        drone2.type = 'sine';
        drone2.frequency.value = 98;
        const drone2Gain = ctx.createGain();
        drone2Gain.gain.value = 0.012;
        drone2.connect(drone2Gain);
        drone2Gain.connect(ambientGain);
        drone2.start();
        ambientNodes.push(drone2);

        // Insect buzz (high noise)
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const t = i / bufferSize;
            data[i] = (Math.random() * 2 - 1) * 0.006 * (0.5 + 0.5 * Math.sin(t * Math.PI * 8));
        }
        const insectSource = ctx.createBufferSource();
        insectSource.buffer = buffer;
        insectSource.loop = true;
        const hipass = ctx.createBiquadFilter();
        hipass.type = 'highpass';
        hipass.frequency.value = 4000;
        insectSource.connect(hipass);
        hipass.connect(ambientGain);
        insectSource.start();
        ambientNodes.push(insectSource);

        // Birds
        scheduleEthiopianBirds();
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
