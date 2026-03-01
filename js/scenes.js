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

    return {
        renderMontrealExterior,
        renderMontrealInterior,
        renderMontrealBackRoom
    };
})();
