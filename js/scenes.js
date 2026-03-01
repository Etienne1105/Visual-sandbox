/* ============================================
   SCENES — Visual Scene Renderer
   Generates illustrated scenes using CSS/SVG art
   ============================================ */

const Scenes = (() => {

    // Render a scene background using layered CSS gradients and SVG
    function renderMontrealExterior() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const fg = document.getElementById('scene-fg');
        const objects = document.getElementById('scene-objects');
        const particles = document.getElementById('particles-layer');

        // Sky and distant Montreal
        bg.style.cssText = `
            background: linear-gradient(180deg,
                #9a8b7a 0%, #b8a898 20%, #c4b5a4 40%,
                #c4b5a4 100%
            );
        `;

        // Mont-Royal silhouette in background
        bg.innerHTML = `
            <svg viewBox="0 0 800 400" style="position:absolute;width:200%;height:100%;opacity:0.15;" preserveAspectRatio="xMidYMax slice">
                <path d="M0,300 Q100,250 200,280 Q350,200 500,260 Q600,230 700,270 Q750,250 800,280 L800,400 L0,400Z" fill="#3a2210"/>
            </svg>
        `;

        // Buildings layer
        mid.innerHTML = `
            <svg viewBox="0 0 600 500" style="position:absolute;width:150%;height:100%;left:-10%;" preserveAspectRatio="xMidYMax slice">
                <!-- Building left -->
                <rect x="20" y="100" width="120" height="350" fill="#7a3322" rx="2"/>
                <rect x="25" y="105" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="55" y="105" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="85" y="105" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="115" y="105" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="25" y="155" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="55" y="155" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="85" y="155" width="25" height="35" fill="#4a2a1a" rx="1"/>
                <rect x="115" y="155" width="25" height="35" fill="#4a2a1a" rx="1"/>

                <!-- Iron staircase -->
                <path d="M140,200 Q160,200 160,220 Q160,240 180,240 Q180,260 160,260 Q160,280 180,280 Q180,300 160,300 L160,450" fill="none" stroke="#2a2a2a" stroke-width="3"/>

                <!-- Brume & Grains building (center) -->
                <rect x="180" y="120" width="160" height="380" fill="#8b3a2a" rx="2"/>
                <!-- Facade details -->
                <rect x="185" y="125" width="30" height="45" fill="#5a2a1a" rx="1"/>
                <rect x="220" y="125" width="30" height="45" fill="#5a2a1a" rx="1"/>
                <rect x="255" y="125" width="30" height="45" fill="#5a2a1a" rx="1"/>
                <rect x="295" y="125" width="30" height="45" fill="#5a2a1a" rx="1"/>
                <!-- Second floor windows -->
                <rect x="200" y="185" width="50" height="60" fill="#3a2a1a" rx="2"/>
                <rect x="265" y="185" width="50" height="60" fill="#3a2a1a" rx="2"/>
                <!-- Warm glow from windows -->
                <rect x="200" y="185" width="50" height="60" fill="#d4a44c" opacity="0.2" rx="2"/>
                <rect x="265" y="185" width="50" height="60" fill="#d4a44c" opacity="0.2" rx="2"/>

                <!-- Store front -->
                <rect x="195" y="310" width="130" height="100" fill="#2a1f15" rx="3"/>
                <!-- Door -->
                <rect x="240" y="330" width="45" height="80" fill="#3a2210" rx="2" stroke="#c8956c" stroke-width="1"/>
                <!-- Door window (frosted) -->
                <rect x="245" y="335" width="35" height="40" fill="#b8a898" opacity="0.3" rx="1"/>
                <!-- Window left -->
                <rect x="200" y="330" width="35" height="50" fill="#3a2a1a" rx="1"/>
                <rect x="200" y="330" width="35" height="50" fill="#d4a44c" opacity="0.15" rx="1"/>

                <!-- Sign -->
                <rect x="210" y="295" width="110" height="20" fill="none" stroke="#c8956c" stroke-width="1" rx="2"/>
                <text x="265" y="309" text-anchor="middle" font-family="Georgia" font-size="8" fill="#c8956c">BRUME &amp; GRAINS</text>

                <!-- Building right -->
                <rect x="360" y="140" width="130" height="360" fill="#6b5a4a" rx="2"/>
                <rect x="365" y="145" width="25" height="35" fill="#4a3a2a" rx="1"/>
                <rect x="395" y="145" width="25" height="35" fill="#4a3a2a" rx="1"/>
                <rect x="425" y="145" width="25" height="35" fill="#4a3a2a" rx="1"/>
                <rect x="455" y="145" width="25" height="35" fill="#4a3a2a" rx="1"/>

                <!-- Sidewalk -->
                <rect x="0" y="410" width="600" height="90" fill="#4a3a2e"/>
                <rect x="0" y="413" width="600" height="2" fill="#5a4a3e" opacity="0.5"/>

                <!-- Lamppost -->
                <rect x="170" y="310" width="4" height="140" fill="#2a2a2a"/>
                <circle cx="172" cy="310" r="8" fill="#d4a44c" opacity="0.3"/>
                <circle cx="172" cy="310" r="3" fill="#d4a44c" opacity="0.6"/>

                <!-- Bike -->
                <circle cx="380" cy="430" r="12" fill="none" stroke="#5a5a5a" stroke-width="1.5"/>
                <circle cx="410" cy="430" r="12" fill="none" stroke="#5a5a5a" stroke-width="1.5"/>
                <path d="M380,430 L395,415 L410,430 M395,415 L395,410 L400,410" fill="none" stroke="#5a5a5a" stroke-width="1.5"/>
            </svg>
        `;

        // Leaves particles
        for (let i = 0; i < 6; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'particle particle-leaf';
            leaf.style.left = (Math.random() * 100) + '%';
            leaf.style.top = '-20px';
            leaf.style.animationDelay = (Math.random() * 6) + 's';
            leaf.style.animationDuration = (5 + Math.random() * 4) + 's';
            const hue = Math.random() > 0.5 ? '#c4783a' : '#8b5a2a';
            leaf.style.background = hue;
            particles.appendChild(leaf);
        }
    }

    function renderMontrealInterior() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const objects = document.getElementById('scene-objects');
        const particles = document.getElementById('particles-layer');

        // Interior background
        bg.style.cssText = `
            background: linear-gradient(180deg,
                #f0e8d8 0%, #e8e0d0 6%,
                #e0d8c8 8%,
                #7a8b6f 9%, #6b7c60 35%,
                #5a6b50 36%,
                #3a2210 37%, #4a2a15 50%,
                #8b7355 52%, #7a6245 85%,
                #6b5535 100%
            );
        `;

        // Interior details
        mid.innerHTML = `
            <svg viewBox="0 0 600 500" style="position:absolute;width:150%;height:100%;" preserveAspectRatio="xMidYMax slice">
                <!-- Tin ceiling pattern -->
                <pattern id="tin" width="30" height="25" patternUnits="userSpaceOnUse">
                    <rect width="30" height="25" fill="#f0e8d8"/>
                    <circle cx="15" cy="12" r="8" fill="none" stroke="#d8d0c0" stroke-width="0.5"/>
                    <circle cx="15" cy="12" r="4" fill="none" stroke="#d8d0c0" stroke-width="0.3"/>
                </pattern>
                <rect x="0" y="0" width="600" height="40" fill="url(#tin)"/>

                <!-- Brick wall (left side) -->
                <pattern id="brick" width="24" height="12" patternUnits="userSpaceOnUse">
                    <rect width="24" height="12" fill="#8b3a2a"/>
                    <rect x="0" y="0" width="11" height="5" fill="#7a3322" rx="0.5"/>
                    <rect x="12" y="0" width="11" height="5" fill="#8b3a2a" rx="0.5"/>
                    <rect x="6" y="6" width="11" height="5" fill="#7a3322" rx="0.5"/>
                    <rect x="18" y="6" width="6" height="5" fill="#8b3a2a" rx="0.5"/>
                    <rect x="0" y="6" width="5" height="5" fill="#8b3a2a" rx="0.5"/>
                </pattern>
                <rect x="0" y="40" width="200" height="200" fill="url(#brick)" opacity="0.6"/>

                <!-- Sage wall (right side) -->
                <rect x="200" y="40" width="400" height="200" fill="#7a8b6f" opacity="0.3"/>

                <!-- Pendant lights -->
                <line x1="100" y1="0" x2="100" y2="60" stroke="#5a4a3a" stroke-width="1"/>
                <ellipse cx="100" cy="65" rx="12" ry="8" fill="#c8956c" opacity="0.8"/>
                <ellipse cx="100" cy="65" rx="8" ry="5" fill="#d4a44c" opacity="0.4"/>

                <line x1="250" y1="0" x2="250" y2="50" stroke="#5a4a3a" stroke-width="1"/>
                <ellipse cx="250" cy="55" rx="12" ry="8" fill="#c8956c" opacity="0.8"/>
                <ellipse cx="250" cy="55" rx="8" ry="5" fill="#d4a44c" opacity="0.4"/>

                <line x1="400" y1="0" x2="400" y2="55" stroke="#5a4a3a" stroke-width="1"/>
                <ellipse cx="400" cy="60" rx="12" ry="8" fill="#c8956c" opacity="0.8"/>
                <ellipse cx="400" cy="60" rx="8" ry="5" fill="#d4a44c" opacity="0.4"/>

                <!-- Counter (walnut) -->
                <rect x="0" y="240" width="500" height="15" fill="#3a2210" rx="2"/>
                <rect x="0" y="240" width="500" height="5" fill="#4a2a15"/>

                <!-- Shelves behind counter -->
                <rect x="10" y="190" width="180" height="3" fill="#2a2a2a"/>
                <rect x="10" y="160" width="180" height="3" fill="#2a2a2a"/>
                <!-- Mason jars -->
                ${[20,40,60,80,100,120,140,160].map(x => `
                    <rect x="${x}" y="${170 - (x % 3) * 2}" width="10" height="18" fill="rgba(200,180,140,0.3)" rx="1"/>
                `).join('')}

                <!-- Espresso machine (center of counter) -->
                <rect x="200" y="210" width="60" height="30" fill="#888" rx="3"/>
                <rect x="205" y="205" width="15" height="10" fill="#999" rx="2"/>
                <rect x="240" y="205" width="15" height="10" fill="#999" rx="2"/>
                <circle cx="230" cy="220" r="8" fill="#777"/>
                <circle cx="230" cy="220" r="5" fill="#999"/>

                <!-- Grinder (red) -->
                <rect x="275" y="218" width="20" height="22" fill="#8b2020" rx="2"/>
                <circle cx="285" cy="214" r="8" fill="#7a1818" stroke="#8b2020" stroke-width="1"/>

                <!-- Photos on wall -->
                <rect x="250" y="80" width="30" height="25" fill="#2a2a2a" rx="1"/>
                <rect x="252" y="82" width="26" height="21" fill="#5a5a5a" rx="0.5"/>
                <rect x="290" y="90" width="25" height="20" fill="#2a2a2a" rx="1"/>
                <rect x="292" y="92" width="21" height="16" fill="#5a5a5a" rx="0.5"/>

                <!-- Hanging plants -->
                <path d="M350,40 Q355,80 340,100 Q350,110 360,95 Q365,85 370,100" fill="none" stroke="#5a7a4a" stroke-width="2"/>
                <circle cx="340" cy="102" r="4" fill="#4a6a3a"/>
                <circle cx="355" cy="95" r="3" fill="#5a7a4a"/>
                <circle cx="368" cy="100" r="4" fill="#4a6a3a"/>

                <!-- Floor (maple hardwood) -->
                <pattern id="wood" width="60" height="500" patternUnits="userSpaceOnUse">
                    <rect width="60" height="500" fill="#8b7355"/>
                    <rect x="0" width="28" height="500" fill="#7a6245"/>
                    <rect x="30" width="28" height="500" fill="#8b7355"/>
                </pattern>
                <rect x="0" y="260" width="600" height="240" fill="url(#wood)" opacity="0.7"/>
            </svg>
        `;

        // Steam particles from espresso machine
        for (let i = 0; i < 4; i++) {
            const steam = document.createElement('div');
            steam.className = 'particle particle-steam';
            steam.style.left = (33 + Math.random() * 5) + '%';
            steam.style.top = '38%';
            steam.style.animationDelay = (Math.random() * 3) + 's';
            particles.appendChild(steam);
        }

        // Dust motes in light
        for (let i = 0; i < 8; i++) {
            const dust = document.createElement('div');
            dust.className = 'particle particle-dust';
            dust.style.left = (10 + Math.random() * 80) + '%';
            dust.style.top = (10 + Math.random() * 40) + '%';
            dust.style.animationDelay = (Math.random() * 8) + 's';
            particles.appendChild(dust);
        }
    }

    function renderMontrealBackRoom() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const objects = document.getElementById('scene-objects');
        const particles = document.getElementById('particles-layer');

        bg.style.cssText = `
            background: linear-gradient(180deg,
                #1a1510 0%, #2a2018 30%,
                #252015 50%,
                #555045 55%, #4a4540 80%,
                #3f3a35 100%
            );
        `;

        mid.innerHTML = `
            <svg viewBox="0 0 600 500" style="position:absolute;width:150%;height:100%;" preserveAspectRatio="xMidYMax slice">
                <!-- Dark walls -->
                <rect x="0" y="0" width="600" height="280" fill="#2a1f15" opacity="0.5"/>

                <!-- Probat roaster -->
                <g transform="translate(150,100)">
                    <!-- Base -->
                    <rect x="0" y="100" width="120" height="100" fill="#1a1a1a" rx="5"/>
                    <!-- Drum -->
                    <ellipse cx="60" cy="100" rx="50" ry="35" fill="#2a2a2a" stroke="#4a4a4a" stroke-width="2"/>
                    <!-- Porthole -->
                    <circle cx="60" cy="100" r="18" fill="#1a1510" stroke="#b87333" stroke-width="2"/>
                    <circle cx="60" cy="100" r="14" fill="#3a1f0d" opacity="0.5"/>
                    <!-- Copper pipes -->
                    <rect x="110" y="60" width="8" height="60" fill="#b87333" rx="4"/>
                    <rect x="105" y="55" width="18" height="8" fill="#b87333" rx="2"/>
                    <!-- Gauges -->
                    <circle cx="30" cy="75" r="12" fill="#1a1a1a" stroke="#c8956c" stroke-width="1"/>
                    <circle cx="30" cy="75" r="8" fill="#2a2a1a"/>
                    <line x1="30" y1="75" x2="35" y2="70" stroke="#c8956c" stroke-width="1"/>
                    <circle cx="90" cy="75" r="12" fill="#1a1a1a" stroke="#c8956c" stroke-width="1"/>
                    <circle cx="90" cy="75" r="8" fill="#2a2a1a"/>
                    <line x1="90" y1="75" x2="85" y2="68" stroke="#c8956c" stroke-width="1"/>
                    <!-- Hopper -->
                    <path d="M40,40 L80,40 L75,65 L45,65 Z" fill="#3a3a3a" stroke="#4a4a4a" stroke-width="1"/>
                </g>

                <!-- Jute sacks -->
                <g transform="translate(350,200)">
                    <rect x="0" y="20" width="50" height="60" fill="#8b7355" rx="3"/>
                    <text x="25" y="55" text-anchor="middle" font-size="5" fill="#5a4a3a">KAFFA</text>
                    <rect x="40" y="10" width="50" height="60" fill="#7a6245" rx="3"/>
                    <text x="65" y="45" text-anchor="middle" font-size="5" fill="#4a3a2a">OAXACA</text>
                    <rect x="20" y="0" width="50" height="60" fill="#9a8365" rx="3"/>
                    <text x="45" y="35" text-anchor="middle" font-size="5" fill="#5a4a3a">SUMATRA</text>
                </g>

                <!-- Workbench -->
                <rect x="10" y="280" width="300" height="10" fill="#5a4a3a" rx="2"/>
                <rect x="20" y="290" width="8" height="80" fill="#4a3a2a"/>
                <rect x="290" y="290" width="8" height="80" fill="#4a3a2a"/>

                <!-- Cupping tools on bench -->
                <ellipse cx="60" cy="275" rx="8" ry="3" fill="#ddd"/>
                <ellipse cx="80" cy="275" rx="8" ry="3" fill="#ddd"/>
                <ellipse cx="100" cy="275" rx="8" ry="3" fill="#ddd"/>
                <rect x="130" y="270" width="15" height="8" fill="#aaa" rx="2"/>
                <rect x="155" y="272" width="20" height="4" fill="#ccc" rx="1"/>

                <!-- The package (Béatrice's) -->
                <rect x="200" y="260" width="40" height="25" fill="#b8956c" rx="2"/>
                <line x1="200" y1="272" x2="240" y2="272" stroke="#8b6914" stroke-width="0.5"/>
                <circle cx="220" cy="268" r="5" fill="#8b2020" opacity="0.8"/>
                <text x="220" y="270" text-anchor="middle" font-size="4" fill="#f5f0e8">BT</text>

                <!-- Concrete floor -->
                <rect x="0" y="370" width="600" height="130" fill="#555045"/>
                <!-- Coffee stain circles -->
                <circle cx="100" cy="400" r="15" fill="none" stroke="#4a3a2a" stroke-width="1" opacity="0.3"/>
                <circle cx="250" cy="420" r="12" fill="none" stroke="#4a3a2a" stroke-width="1" opacity="0.2"/>
                <circle cx="400" cy="390" r="18" fill="none" stroke="#4a3a2a" stroke-width="1" opacity="0.25"/>

                <!-- The safe/coffre -->
                <rect x="420" y="250" width="80" height="80" fill="#2a2a2a" rx="3" stroke="#4a4a4a" stroke-width="2"/>
                <circle cx="460" cy="290" r="15" fill="#1a1a1a" stroke="#b87333" stroke-width="2"/>
                <rect x="470" y="285" width="15" height="5" fill="#b87333" rx="1"/>
            </svg>
        `;

        // Warm glow from roaster
        const glow = document.createElement('div');
        glow.style.cssText = `
            position:absolute; left:20%; top:25%; width:100px; height:60px;
            background: radial-gradient(ellipse, rgba(212,100,30,0.08) 0%, transparent 70%);
            animation: particle-dust-float 6s ease-in-out infinite;
        `;
        particles.appendChild(glow);
    }

    // ============================================
    // CHAPTER 2 — ETHIOPIA SCENES
    // ============================================

    function renderEthiopiaPiazza() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const particles = document.getElementById('particles-layer');

        bg.style.cssText = `
            background: linear-gradient(180deg,
                #d4a050 0%, #c89040 15%, #b88030 30%,
                #c4a070 50%, #b09060 100%
            );
        `;

        mid.innerHTML = `
            <svg viewBox="0 0 700 500" style="position:absolute;width:170%;height:100%;left:-15%;" preserveAspectRatio="xMidYMax slice">
                <!-- Eucalyptus tree background -->
                <g transform="translate(500,0)">
                    <rect x="25" y="80" width="12" height="350" fill="#5a4a3a"/>
                    <ellipse cx="30" cy="60" rx="55" ry="50" fill="#3a6a3a" opacity="0.7"/>
                    <ellipse cx="15" cy="80" rx="40" ry="35" fill="#4a7a4a" opacity="0.6"/>
                    <ellipse cx="50" cy="70" rx="45" ry="40" fill="#3a5a2a" opacity="0.5"/>
                </g>

                <!-- Left building — Italian colonial style, ocre stucco -->
                <rect x="0" y="60" width="180" height="400" fill="#c4a060" rx="2"/>
                <path d="M30,120 L35,180 L28,200" fill="none" stroke="#b89050" stroke-width="0.8" opacity="0.5"/>
                <path d="M150,90 L155,130 L148,160" fill="none" stroke="#b89050" stroke-width="0.6" opacity="0.4"/>
                <!-- Windows with iron balconies -->
                <rect x="20" y="80" width="40" height="55" fill="#3a2a1a" rx="2"/>
                <rect x="15" y="130" width="50" height="5" fill="#5a3a2a"/>
                <rect x="80" y="80" width="40" height="55" fill="#3a2a1a" rx="2"/>
                <rect x="75" y="130" width="50" height="5" fill="#5a3a2a"/>
                <rect x="130" y="80" width="40" height="55" fill="#3a2a1a" rx="2"/>
                <rect x="125" y="130" width="50" height="5" fill="#5a3a2a"/>
                <rect x="20" y="160" width="40" height="55" fill="#3a2a1a" rx="2"/>
                <rect x="80" y="160" width="40" height="55" fill="#3a2a1a" rx="2"/>
                <rect x="130" y="160" width="40" height="55" fill="#3a2a1a" rx="2"/>

                <!-- Bougainvillea -->
                <g transform="translate(70,125)">
                    <circle cx="-10" cy="8" r="3" fill="#c43a7a" opacity="0.7"/>
                    <circle cx="5" cy="3" r="2.5" fill="#9a2a6a" opacity="0.6"/>
                    <circle cx="-5" cy="15" r="2" fill="#c43a7a" opacity="0.5"/>
                    <circle cx="10" cy="12" r="3" fill="#9a2a6a" opacity="0.7"/>
                    <circle cx="-15" cy="20" r="2.5" fill="#c43a7a" opacity="0.6"/>
                    <circle cx="0" cy="25" r="2" fill="#9a2a6a" opacity="0.5"/>
                    <circle cx="15" cy="22" r="3" fill="#c43a7a" opacity="0.6"/>
                    <circle cx="-8" cy="30" r="2" fill="#9a2a6a" opacity="0.5"/>
                </g>

                <!-- Right building — Ethiopian style -->
                <rect x="350" y="80" width="180" height="380" fill="#b89050" rx="2"/>
                <rect x="370" y="100" width="35" height="45" fill="#3a2a1a" rx="2"/>
                <rect x="420" y="100" width="35" height="45" fill="#3a2a1a" rx="2"/>
                <rect x="475" y="100" width="35" height="45" fill="#3a2a1a" rx="2"/>
                <rect x="370" y="170" width="35" height="45" fill="#3a2a1a" rx="2"/>
                <rect x="420" y="170" width="35" height="45" fill="#3a2a1a" rx="2"/>
                <rect x="475" y="170" width="35" height="45" fill="#3a2a1a" rx="2"/>

                <!-- The alley -->
                <rect x="180" y="100" width="170" height="360" fill="#8a7040" opacity="0.3"/>

                <!-- Tsega's blue door -->
                <rect x="240" y="280" width="50" height="80" fill="#5a9aba" rx="3" stroke="#4a8aaa" stroke-width="2"/>
                <line x1="265" y1="295" x2="265" y2="345" stroke="#4a8aaa" stroke-width="1.5"/>
                <line x1="250" y1="320" x2="280" y2="320" stroke="#4a8aaa" stroke-width="1.5"/>
                <circle cx="265" cy="320" r="6" fill="none" stroke="#4a8aaa" stroke-width="1"/>

                <!-- Cobblestone floor -->
                <pattern id="cobble-eth" width="15" height="12" patternUnits="userSpaceOnUse">
                    <rect width="15" height="12" fill="#7a6a4a"/>
                    <rect x="1" y="1" width="6" height="5" fill="#8a7a5a" rx="1"/>
                    <rect x="8" y="1" width="6" height="5" fill="#7a6a4a" rx="1"/>
                    <rect x="4" y="7" width="6" height="4" fill="#8a7a5a" rx="1"/>
                </pattern>
                <rect x="0" y="400" width="700" height="100" fill="url(#cobble-eth)"/>

                <!-- Fruit cart -->
                <g transform="translate(100,370)">
                    <rect x="0" y="10" width="50" height="25" fill="#6a4a2a" rx="2"/>
                    <circle cx="8" cy="38" r="6" fill="#4a3a2a"/>
                    <circle cx="42" cy="38" r="6" fill="#4a3a2a"/>
                    <circle cx="10" cy="6" r="5" fill="#e8a020"/>
                    <circle cx="22" cy="4" r="6" fill="#e87830"/>
                    <circle cx="36" cy="6" r="4" fill="#50b830"/>
                </g>

                <!-- Cat (Arabica) on wall -->
                <g transform="translate(440,350)">
                    <ellipse cx="0" cy="0" rx="12" ry="8" fill="#c87030"/>
                    <circle cx="14" cy="-5" r="7" fill="#c87030"/>
                    <path d="M10,-12 L12,-6 L8,-7 Z" fill="#c87030"/>
                    <path d="M18,-12 L16,-6 L20,-7 Z" fill="#c87030"/>
                    <circle cx="12" cy="-5" r="1.5" fill="#2a5a2a"/>
                    <circle cx="17" cy="-5" r="1.5" fill="#2a5a2a"/>
                    <path d="M-12,0 Q-20,-5 -18,-15" fill="none" stroke="#c87030" stroke-width="3" stroke-linecap="round"/>
                </g>

                <!-- Dappled eucalyptus light -->
                <ellipse cx="280" cy="340" rx="15" ry="8" fill="#d4a050" opacity="0.07"/>
                <ellipse cx="320" cy="370" rx="12" ry="6" fill="#d4a050" opacity="0.05"/>
                <ellipse cx="250" cy="390" rx="18" ry="9" fill="#d4a050" opacity="0.06"/>
            </svg>
        `;

        for (let i = 0; i < 5; i++) {
            const shimmer = document.createElement('div');
            shimmer.className = 'particle particle-dust';
            shimmer.style.left = (20 + Math.random() * 60) + '%';
            shimmer.style.top = (60 + Math.random() * 30) + '%';
            shimmer.style.background = 'rgba(212,160,80,0.15)';
            shimmer.style.width = '4px';
            shimmer.style.height = '4px';
            shimmer.style.animationDelay = (Math.random() * 8) + 's';
            particles.appendChild(shimmer);
        }
    }

    function renderEthiopiaCeremony() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const particles = document.getElementById('particles-layer');

        bg.style.cssText = `
            background: linear-gradient(180deg,
                #2a1f15 0%, #3a2a1a 20%,
                #3a2a1a 40%, #2a1f15 60%,
                #4a3a2a 70%, #3a2a1a 100%
            );
        `;

        mid.innerHTML = `
            <svg viewBox="0 0 600 500" style="position:absolute;width:150%;height:100%;" preserveAspectRatio="xMidYMax slice">
                <!-- Earth walls -->
                <rect x="0" y="0" width="600" height="350" fill="#c4a880" opacity="0.2"/>

                <!-- Decorative band (Ethiopian crosses) -->
                <pattern id="ethband" width="30" height="20" patternUnits="userSpaceOnUse">
                    <rect width="30" height="20" fill="transparent"/>
                    <line x1="15" y1="2" x2="15" y2="18" stroke="#8b3a2a" stroke-width="1"/>
                    <line x1="6" y1="10" x2="24" y2="10" stroke="#8b3a2a" stroke-width="1"/>
                    <circle cx="15" cy="10" r="4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>
                    <rect x="5" y="0" width="20" height="20" fill="none" stroke="#c4a050" stroke-width="0.5"/>
                </pattern>
                <rect x="0" y="140" width="600" height="25" fill="url(#ethband)" opacity="0.6"/>

                <!-- Window — light ray -->
                <rect x="460" y="40" width="30" height="60" fill="#d4a050" opacity="0.3" rx="2"/>
                <polygon points="460,100 490,100 550,350 400,350" fill="#d4a050" opacity="0.04"/>

                <!-- Fresh grass floor (qetema) -->
                <rect x="0" y="350" width="600" height="150" fill="#3a5a2a" opacity="0.3"/>
                <line x1="50" y1="350" x2="48" y2="338" stroke="#5a8a3a" stroke-width="1" opacity="0.4"/>
                <line x1="100" y1="350" x2="103" y2="340" stroke="#5a8a3a" stroke-width="1" opacity="0.3"/>
                <line x1="180" y1="350" x2="177" y2="336" stroke="#5a8a3a" stroke-width="1" opacity="0.5"/>
                <line x1="300" y1="350" x2="302" y2="341" stroke="#5a8a3a" stroke-width="1" opacity="0.3"/>
                <line x1="420" y1="350" x2="418" y2="335" stroke="#5a8a3a" stroke-width="1" opacity="0.4"/>
                <line x1="500" y1="350" x2="503" y2="339" stroke="#5a8a3a" stroke-width="1" opacity="0.3"/>
                <!-- Yellow flowers -->
                <circle cx="80" cy="346" r="2" fill="#e8c820" opacity="0.6"/>
                <circle cx="220" cy="348" r="2" fill="#e8c820" opacity="0.5"/>
                <circle cx="370" cy="345" r="2" fill="#e8c820" opacity="0.6"/>
                <circle cx="480" cy="347" r="2" fill="#e8c820" opacity="0.5"/>

                <!-- Brazier (center) -->
                <g transform="translate(250,300)">
                    <ellipse cx="30" cy="30" rx="35" ry="12" fill="#5a3a1a"/>
                    <rect x="0" y="0" width="60" height="30" fill="#6a4a2a" rx="3"/>
                    <ellipse cx="30" cy="0" rx="30" ry="10" fill="#7a5a3a"/>
                    <ellipse cx="30" cy="0" rx="22" ry="7" fill="#8a2a0a" opacity="0.6"/>
                    <ellipse cx="25" cy="-2" rx="5" ry="3" fill="#e85020" opacity="0.4"/>
                    <ellipse cx="35" cy="1" rx="4" ry="2" fill="#e88030" opacity="0.3"/>
                    <circle cx="30" cy="0" r="40" fill="#e85020" opacity="0.03"/>
                </g>

                <!-- Rekebot with jebena and sini cups -->
                <g transform="translate(220,340)">
                    <ellipse cx="60" cy="10" rx="55" ry="15" fill="#8a7a5a" stroke="#a89a7a" stroke-width="1"/>
                    <ellipse cx="60" cy="10" rx="40" ry="10" fill="none" stroke="#a89a7a" stroke-width="0.5"/>

                    <!-- Jebena -->
                    <path d="M55,0 Q50,-20 52,-30 Q55,-35 58,-38 L62,-38 Q65,-35 68,-30 Q70,-20 65,0" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1"/>
                    <path d="M68,-30 Q75,-28 78,-22" fill="none" stroke="#2a1a0a" stroke-width="2"/>
                    <path d="M52,-20 Q42,-18 44,-10 Q46,-2 55,0" fill="none" stroke="#2a1a0a" stroke-width="2"/>
                    <!-- White dot decorations -->
                    <circle cx="56" cy="-32" r="1" fill="#e8e0d0" opacity="0.6"/>
                    <circle cx="60" cy="-29" r="1" fill="#e8e0d0" opacity="0.6"/>
                    <circle cx="64" cy="-32" r="1" fill="#e8e0d0" opacity="0.6"/>
                    <circle cx="56" cy="-26" r="1" fill="#e8e0d0" opacity="0.6"/>
                    <circle cx="64" cy="-26" r="1" fill="#e8e0d0" opacity="0.6"/>

                    <!-- Sini cups -->
                    <g transform="translate(20,5)"><rect x="-4" y="-6" width="8" height="6" fill="#e8e0d0" rx="1"/><rect x="-5" y="-6" width="10" height="2" fill="#e8e0d0" rx="1"/><line x1="-3" y1="-3" x2="3" y2="-3" stroke="#2a8a2a" stroke-width="0.5"/></g>
                    <g transform="translate(40,0)"><rect x="-4" y="-6" width="8" height="6" fill="#e8e0d0" rx="1"/><rect x="-5" y="-6" width="10" height="2" fill="#e8e0d0" rx="1"/><line x1="-3" y1="-3" x2="3" y2="-3" stroke="#c43a3a" stroke-width="0.5"/></g>
                    <g transform="translate(80,0)"><rect x="-4" y="-6" width="8" height="6" fill="#e8e0d0" rx="1"/><rect x="-5" y="-6" width="10" height="2" fill="#e8e0d0" rx="1"/><line x1="-3" y1="-3" x2="3" y2="-3" stroke="#c4a020" stroke-width="0.5"/></g>
                    <g transform="translate(100,5)"><rect x="-4" y="-6" width="8" height="6" fill="#e8e0d0" rx="1"/><rect x="-5" y="-6" width="10" height="2" fill="#e8e0d0" rx="1"/><line x1="-3" y1="-3" x2="3" y2="-3" stroke="#2a8a2a" stroke-width="0.5"/></g>
                </g>

                <!-- Mortar and pestle -->
                <g transform="translate(380,330)">
                    <rect x="0" y="0" width="20" height="25" fill="#3a2a1a" rx="3"/>
                    <ellipse cx="10" cy="0" rx="12" ry="5" fill="#4a3a2a"/>
                    <rect x="18" y="-15" width="4" height="30" fill="#3a2a1a" rx="2" transform="rotate(15,20,0)"/>
                </g>

                <!-- Tsega sitting -->
                <g transform="translate(80,240)">
                    <rect x="0" y="60" width="40" height="8" fill="#4a3a2a" rx="2"/>
                    <rect x="5" y="68" width="5" height="15" fill="#3a2a1a"/>
                    <rect x="30" y="68" width="5" height="15" fill="#3a2a1a"/>
                    <rect x="5" y="20" width="30" height="42" fill="#e8e0d0" rx="3"/>
                    <rect x="2" y="18" width="36" height="46" fill="none" stroke="#e8e0d0" stroke-width="1" rx="3"/>
                    <line x1="2" y1="60" x2="38" y2="60" stroke="#c43a3a" stroke-width="2"/>
                    <line x1="2" y1="58" x2="38" y2="58" stroke="#2a8a2a" stroke-width="1"/>
                    <line x1="2" y1="62" x2="38" y2="62" stroke="#c4a020" stroke-width="1"/>
                    <circle cx="20" cy="12" r="11" fill="#7a5a3a"/>
                    <path d="M10,8 Q20,-2 30,8" fill="none" stroke="#a8a8a8" stroke-width="2"/>
                    <circle cx="16" cy="12" r="1.5" fill="#1a1a1a"/>
                    <circle cx="24" cy="12" r="1.5" fill="#1a1a1a"/>
                </g>

                <!-- Popcorn bowl -->
                <g transform="translate(150,360)">
                    <ellipse cx="0" cy="0" rx="12" ry="5" fill="#6a4a2a"/>
                    <circle cx="-3" cy="-2" r="1.5" fill="#e8e0c0"/>
                    <circle cx="4" cy="-3" r="1.5" fill="#e8e0c0"/>
                    <circle cx="0" cy="-4" r="1.5" fill="#e8e0c0"/>
                </g>
            </svg>
        `;

        // Incense smoke
        for (let i = 0; i < 8; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'particle';
            smoke.style.cssText = `
                position:absolute;
                left: ${42 + (Math.random() - 0.5) * 8}%;
                top: 55%;
                width: 3px; height: 15px;
                background: rgba(150,170,220,0.06);
                border-radius: 50%;
                animation: incense-rise ${4 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particles.appendChild(smoke);
        }

        // Coal glow
        const glow = document.createElement('div');
        glow.style.cssText = `
            position:absolute; left:38%; top:55%; width:80px; height:40px;
            background: radial-gradient(ellipse, rgba(232,80,32,0.06) 0%, transparent 70%);
            animation: coal-flicker 3s ease-in-out infinite alternate;
        `;
        particles.appendChild(glow);
    }

    function renderEthiopiaForest() {
        const bg = document.getElementById('scene-bg');
        const mid = document.getElementById('scene-mid');
        const particles = document.getElementById('particles-layer');

        bg.style.cssText = `
            background: linear-gradient(180deg,
                #1a3a1a 0%, #2a4a2a 15%, #1a3a1a 30%,
                #2a5a2a 50%, #1a3a18 70%,
                #1a2a10 85%, #0a1a08 100%
            );
        `;

        mid.innerHTML = `
            <svg viewBox="0 0 700 500" style="position:absolute;width:170%;height:100%;left:-15%;" preserveAspectRatio="xMidYMax slice">
                <!-- Dense canopy -->
                <ellipse cx="100" cy="30" rx="80" ry="40" fill="#2a4a2a" opacity="0.6"/>
                <ellipse cx="300" cy="20" rx="90" ry="50" fill="#1a3a1a" opacity="0.5"/>
                <ellipse cx="500" cy="40" rx="70" ry="35" fill="#2a5a2a" opacity="0.6"/>
                <ellipse cx="200" cy="50" rx="60" ry="30" fill="#1a4a1a" opacity="0.4"/>
                <ellipse cx="600" cy="30" rx="80" ry="40" fill="#1a3a1a" opacity="0.5"/>
                <ellipse cx="400" cy="15" rx="95" ry="45" fill="#2a4a2a" opacity="0.5"/>

                <!-- Light shafts -->
                <polygon points="180,0 195,0 230,500 160,500" fill="#d4c850" opacity="0.025"/>
                <polygon points="400,0 415,0 450,500 380,500" fill="#d4c850" opacity="0.02"/>
                <polygon points="550,0 560,0 580,500 530,500" fill="#d4c850" opacity="0.015"/>

                <!-- Tree trunks -->
                <rect x="80" y="0" width="14" height="500" fill="#3a2a1a" opacity="0.5"/>
                <rect x="200" y="0" width="16" height="500" fill="#3a2a1a" opacity="0.6"/>
                <rect x="350" y="0" width="18" height="500" fill="#3a2a1a" opacity="0.5"/>
                <rect x="500" y="0" width="14" height="500" fill="#3a2a1a" opacity="0.55"/>
                <rect x="620" y="0" width="16" height="500" fill="#3a2a1a" opacity="0.5"/>
                <!-- Moss on trunks -->
                <ellipse cx="87" cy="180" rx="6" ry="4" fill="#4a8a3a" opacity="0.3"/>
                <ellipse cx="208" cy="250" rx="7" ry="3" fill="#4a8a3a" opacity="0.3"/>
                <ellipse cx="358" cy="150" rx="5" ry="4" fill="#4a8a3a" opacity="0.35"/>

                <!-- Ferns -->
                <path d="M120,380 Q100,350 90,340" fill="none" stroke="#3a7a2a" stroke-width="1.5" opacity="0.4"/>
                <path d="M120,380 Q140,350 150,340" fill="none" stroke="#3a7a2a" stroke-width="1.5" opacity="0.4"/>
                <path d="M450,390 Q430,360 420,350" fill="none" stroke="#3a7a2a" stroke-width="1.5" opacity="0.4"/>
                <path d="M450,390 Q470,360 480,350" fill="none" stroke="#3a7a2a" stroke-width="1.5" opacity="0.4"/>

                <!-- Coffee plant 1 with cherries -->
                <g transform="translate(250,280)">
                    <rect x="0" y="0" width="4" height="80" fill="#4a3a2a"/>
                    <path d="M2,20 Q-20,10 -30,20" fill="none" stroke="#2a5a1a" stroke-width="1.5"/>
                    <ellipse cx="-20" cy="16" rx="12" ry="6" fill="#2a5a1a" opacity="0.7"/>
                    <path d="M2,35 Q25,25 35,35" fill="none" stroke="#2a5a1a" stroke-width="1.5"/>
                    <ellipse cx="25" cy="30" rx="12" ry="6" fill="#3a6a2a" opacity="0.7"/>
                    <path d="M2,50 Q-25,40 -30,50" fill="none" stroke="#2a5a1a" stroke-width="1.5"/>
                    <ellipse cx="-20" cy="46" rx="10" ry="5" fill="#2a5a1a" opacity="0.7"/>
                    <!-- Red cherries -->
                    <circle cx="-15" cy="18" r="3" fill="#c82020"/>
                    <circle cx="-25" cy="20" r="2.5" fill="#b81818"/>
                    <circle cx="30" cy="32" r="3" fill="#c82020"/>
                    <circle cx="20" cy="28" r="2" fill="#e83030"/>
                    <circle cx="-18" cy="48" r="2.5" fill="#50a830"/>
                </g>

                <!-- Coffee plant 2 -->
                <g transform="translate(420,300)">
                    <rect x="0" y="0" width="3" height="60" fill="#4a3a2a"/>
                    <path d="M1,15 Q-18,8 -22,18" fill="none" stroke="#2a5a1a" stroke-width="1.5"/>
                    <ellipse cx="-15" cy="14" rx="10" ry="5" fill="#2a5a1a" opacity="0.7"/>
                    <path d="M1,30 Q20,22 25,30" fill="none" stroke="#3a6a2a" stroke-width="1.5"/>
                    <ellipse cx="18" cy="26" rx="10" ry="5" fill="#3a6a2a" opacity="0.7"/>
                    <circle cx="-12" cy="16" r="3" fill="#c82020"/>
                    <circle cx="22" cy="28" r="3" fill="#e8c020"/>
                    <circle cx="15" cy="24" r="2.5" fill="#c82020"/>
                </g>

                <!-- Coffee plant 3 -->
                <g transform="translate(560,320)">
                    <rect x="0" y="0" width="3" height="50" fill="#4a3a2a"/>
                    <path d="M1,12 Q-15,5 -18,14" fill="none" stroke="#2a5a1a" stroke-width="1.5"/>
                    <ellipse cx="-12" cy="11" rx="8" ry="4" fill="#2a5a1a" opacity="0.7"/>
                    <path d="M1,25 Q15,18 20,25" fill="none" stroke="#3a6a2a" stroke-width="1.5"/>
                    <ellipse cx="14" cy="22" rx="8" ry="4" fill="#3a6a2a" opacity="0.7"/>
                    <circle cx="-10" cy="12" r="2.5" fill="#c82020"/>
                    <circle cx="16" cy="23" r="2.5" fill="#c82020"/>
                </g>

                <!-- Forest floor -->
                <rect x="0" y="400" width="700" height="100" fill="#1a2a10" opacity="0.5"/>

                <!-- Colobus monkey silhouette -->
                <g transform="translate(180,60)" opacity="0.3">
                    <ellipse cx="0" cy="0" rx="8" ry="12" fill="#1a1a1a"/>
                    <circle cx="0" cy="-14" r="6" fill="#1a1a1a"/>
                    <path d="M8,5 Q20,15 15,30" fill="none" stroke="#e8e8e8" stroke-width="3"/>
                </g>
            </svg>
        `;

        // Forest motes
        for (let i = 0; i < 12; i++) {
            const mote = document.createElement('div');
            mote.className = 'particle particle-dust';
            mote.style.left = (10 + Math.random() * 80) + '%';
            mote.style.top = (10 + Math.random() * 70) + '%';
            mote.style.background = `rgba(${180+Math.random()*40},${200+Math.random()*40},${80+Math.random()*40},0.15)`;
            mote.style.width = '3px';
            mote.style.height = '3px';
            mote.style.animationDelay = (Math.random() * 8) + 's';
            mote.style.animationDuration = (6 + Math.random() * 6) + 's';
            particles.appendChild(mote);
        }
    }

    return {
        renderMontrealExterior,
        renderMontrealInterior,
        renderMontrealBackRoom,
        renderEthiopiaPiazza,
        renderEthiopiaCeremony,
        renderEthiopiaForest
    };
})();
