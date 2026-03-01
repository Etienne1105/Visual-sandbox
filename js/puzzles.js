/* ============================================
   PUZZLE SYSTEM — Framework for all puzzles
   ============================================ */

const Puzzles = (() => {
    let currentPuzzle = null;

    function show(puzzleData) {
        currentPuzzle = puzzleData;
        const overlay = document.getElementById('puzzle-overlay');
        const container = document.getElementById('puzzle-container');

        container.innerHTML = '';
        overlay.classList.remove('hidden');

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'puzzle-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('pointerup', close);
        container.appendChild(closeBtn);

        // Title
        if (puzzleData.title) {
            const title = document.createElement('div');
            title.className = 'puzzle-title';
            title.textContent = puzzleData.title;
            container.appendChild(title);
        }

        // Render puzzle content
        puzzleData.render(container);
    }

    function close() {
        document.getElementById('puzzle-overlay').classList.add('hidden');
        document.getElementById('puzzle-container').innerHTML = '';
        currentPuzzle = null;
    }

    function solve() {
        if (currentPuzzle && currentPuzzle.onSolve) {
            currentPuzzle.onSolve();
        }
        close();
    }

    // ============================================
    // PUZZLE: Combination Lock (Coffre)
    // ============================================
    function createCombinationLock(config) {
        return {
            title: config.title || 'Le Coffre',
            render(container) {
                const code = config.code; // e.g. [1, 9, 7, 8]
                const digits = code.length;
                const currentValues = new Array(digits).fill(0);

                const puzzleBody = document.createElement('div');
                puzzleBody.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:24px; width:100%;';

                // Description
                const desc = document.createElement('p');
                desc.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--brass); text-align:center; max-width:300px; line-height:1.5;';
                desc.textContent = config.hint || 'Trouvez la bonne combinaison pour ouvrir le coffre.';
                puzzleBody.appendChild(desc);

                // Lock display
                const lockDisplay = document.createElement('div');
                lockDisplay.style.cssText = `
                    display:flex; gap:8px; padding:24px;
                    background:rgba(58,34,16,0.6); border-radius:16px;
                    border:2px solid rgba(200,149,108,0.2);
                    box-shadow: inset 0 4px 12px rgba(0,0,0,0.4);
                `;

                const digitEls = [];

                for (let i = 0; i < digits; i++) {
                    const digitCol = document.createElement('div');
                    digitCol.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:8px;';

                    const btnUp = document.createElement('button');
                    btnUp.textContent = '\u25B2';
                    btnUp.style.cssText = 'width:44px; height:36px; background:rgba(200,149,108,0.15); border:1px solid rgba(200,149,108,0.3); border-radius:8px; color:var(--brass); font-size:0.9rem; cursor:pointer;';
                    btnUp.addEventListener('pointerup', () => {
                        currentValues[i] = (currentValues[i] + 1) % 10;
                        numEl.textContent = currentValues[i];
                        checkCode();
                    });

                    const numEl = document.createElement('div');
                    numEl.style.cssText = 'width:44px; height:56px; display:flex; align-items:center; justify-content:center; background:#1a1209; border:1px solid rgba(200,149,108,0.3); border-radius:8px; font-family:var(--font-serif); font-size:1.8rem; color:var(--cream);';
                    numEl.textContent = '0';
                    digitEls.push(numEl);

                    const btnDown = document.createElement('button');
                    btnDown.textContent = '\u25BC';
                    btnDown.style.cssText = 'width:44px; height:36px; background:rgba(200,149,108,0.15); border:1px solid rgba(200,149,108,0.3); border-radius:8px; color:var(--brass); font-size:0.9rem; cursor:pointer;';
                    btnDown.addEventListener('pointerup', () => {
                        currentValues[i] = (currentValues[i] + 9) % 10;
                        numEl.textContent = currentValues[i];
                        checkCode();
                    });

                    digitCol.appendChild(btnUp);
                    digitCol.appendChild(numEl);
                    digitCol.appendChild(btnDown);
                    lockDisplay.appendChild(digitCol);
                }

                puzzleBody.appendChild(lockDisplay);

                // Feedback
                const feedback = document.createElement('div');
                feedback.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--brass); min-height:1.5em; text-align:center;';
                puzzleBody.appendChild(feedback);

                container.appendChild(puzzleBody);

                function checkCode() {
                    const match = currentValues.every((v, i) => v === code[i]);
                    if (match) {
                        feedback.textContent = 'Le coffre s\'ouvre dans un clic satisfaisant...';
                        feedback.style.color = '#7a8b6f';
                        lockDisplay.style.borderColor = '#7a8b6f';
                        setTimeout(() => {
                            if (config.onSolve) config.onSolve();
                            close();
                        }, 1500);
                    }
                }
            }
        };
    }

    // ============================================
    // PUZZLE: Cupping / Aroma Identification
    // ============================================
    function createCuppingPuzzle(config) {
        return {
            title: config.title || 'Degustation',
            render(container) {
                const puzzleBody = document.createElement('div');
                puzzleBody.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:20px; width:100%; max-width:360px;';

                // Description
                const desc = document.createElement('p');
                desc.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--brass); text-align:center; line-height:1.5;';
                desc.textContent = config.description || 'Identifiez l\'origine de ces grains par leurs aromes.';
                puzzleBody.appendChild(desc);

                // Cups display
                const cupsRow = document.createElement('div');
                cupsRow.style.cssText = 'display:flex; gap:16px; justify-content:center; flex-wrap:wrap;';

                config.cups.forEach((cup, idx) => {
                    const cupEl = document.createElement('div');
                    cupEl.style.cssText = `
                        width:80px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer;
                        padding:12px; border-radius:12px; border:1px solid rgba(200,149,108,0.15); background:rgba(200,149,108,0.05);
                        transition: all 0.2s;
                    `;
                    cupEl.innerHTML = `
                        <div style="font-size:2rem;">\u2615</div>
                        <div style="font-family:var(--font-serif); font-size:0.7rem; color:var(--brass); text-align:center;">${cup.label}</div>
                    `;

                    cupEl.addEventListener('pointerup', () => {
                        // Show aroma description
                        aromaDesc.innerHTML = `
                            <strong>${cup.label}</strong><br>
                            <span style="font-size:0.8rem;">${cup.aromas}</span>
                        `;
                        selectedCup = idx;
                        // Highlight
                        cupsRow.querySelectorAll('div').forEach(el => el.style.borderColor = 'rgba(200,149,108,0.15)');
                        cupEl.style.borderColor = 'var(--brass)';
                    });

                    cupsRow.appendChild(cupEl);
                });

                puzzleBody.appendChild(cupsRow);

                // Aroma description
                const aromaDesc = document.createElement('div');
                aromaDesc.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--cream); text-align:center; min-height:60px; line-height:1.5; padding:12px; border-radius:8px; background:rgba(0,0,0,0.2); width:100%;';
                aromaDesc.textContent = 'Touchez une tasse pour examiner ses aromes...';
                puzzleBody.appendChild(aromaDesc);

                // Origin choices
                const originsTitle = document.createElement('div');
                originsTitle.style.cssText = 'font-family:var(--font-serif); font-size:0.8rem; color:var(--brass); margin-top:8px;';
                originsTitle.textContent = 'Quelle est l\'origine de ces grains ?';
                puzzleBody.appendChild(originsTitle);

                let selectedCup = -1;

                const originsRow = document.createElement('div');
                originsRow.style.cssText = 'display:flex; flex-direction:column; gap:8px; width:100%;';

                config.origins.forEach((origin, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'dialogue-choice';
                    btn.textContent = origin.name;
                    btn.addEventListener('pointerup', () => {
                        if (origin.correct) {
                            btn.style.borderColor = '#7a8b6f';
                            btn.style.color = '#7a8b6f';
                            aromaDesc.innerHTML = `<span style="color:#7a8b6f;">${origin.feedback}</span>`;
                            setTimeout(() => {
                                if (config.onSolve) config.onSolve();
                                close();
                            }, 2000);
                        } else {
                            btn.style.borderColor = '#8b3a2a';
                            btn.style.color = '#8b3a2a';
                            aromaDesc.innerHTML = `<span style="color:#8b3a2a;">${origin.feedback}</span>`;
                            setTimeout(() => {
                                btn.style.borderColor = 'rgba(200,149,108,0.25)';
                                btn.style.color = 'var(--cream)';
                            }, 1500);
                        }
                    });
                    originsRow.appendChild(btn);
                });

                puzzleBody.appendChild(originsRow);
                container.appendChild(puzzleBody);
            }
        };
    }

    // ============================================
    // PUZZLE: Page Assembly (Carnet)
    // ============================================
    function createPageAssembly(config) {
        return {
            title: config.title || 'Reconstitution',
            render(container) {
                const puzzleBody = document.createElement('div');
                puzzleBody.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:16px; width:100%; max-width:360px;';

                const desc = document.createElement('p');
                desc.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--brass); text-align:center; line-height:1.5;';
                desc.textContent = config.description || 'Replacez les pages dans le bon ordre.';
                puzzleBody.appendChild(desc);

                // Pages to sort
                let pageOrder = [...config.pages];
                // Shuffle
                for (let i = pageOrder.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [pageOrder[i], pageOrder[j]] = [pageOrder[j], pageOrder[i]];
                }

                const slotsContainer = document.createElement('div');
                slotsContainer.style.cssText = 'width:100%; display:flex; flex-direction:column; gap:10px;';

                function renderPages() {
                    slotsContainer.innerHTML = '';
                    pageOrder.forEach((page, idx) => {
                        const slot = document.createElement('div');
                        slot.style.cssText = `
                            display:flex; align-items:center; gap:12px; padding:12px;
                            background:rgba(245,240,224,0.08); border:1px solid rgba(200,149,108,0.15);
                            border-radius:10px; cursor:pointer; transition:all 0.2s;
                        `;
                        slot.innerHTML = `
                            <div style="font-size:1.3rem; min-width:30px; text-align:center;">${page.icon}</div>
                            <div>
                                <div style="font-family:var(--font-hand); font-size:0.85rem; color:var(--cream);">${page.sketch}</div>
                                <div style="font-family:var(--font-serif); font-size:0.7rem; color:var(--brass); margin-top:2px;">${page.annotation}</div>
                            </div>
                            <div style="margin-left:auto; display:flex; flex-direction:column; gap:4px;">
                                ${idx > 0 ? '<button class="move-up" style="background:none;border:1px solid rgba(200,149,108,0.3);border-radius:4px;color:var(--brass);padding:2px 8px;cursor:pointer;font-size:0.8rem;">\u25B2</button>' : ''}
                                ${idx < pageOrder.length - 1 ? '<button class="move-down" style="background:none;border:1px solid rgba(200,149,108,0.3);border-radius:4px;color:var(--brass);padding:2px 8px;cursor:pointer;font-size:0.8rem;">\u25BC</button>' : ''}
                            </div>
                        `;

                        const upBtn = slot.querySelector('.move-up');
                        const downBtn = slot.querySelector('.move-down');

                        if (upBtn) {
                            upBtn.addEventListener('pointerup', (e) => {
                                e.stopPropagation();
                                [pageOrder[idx - 1], pageOrder[idx]] = [pageOrder[idx], pageOrder[idx - 1]];
                                renderPages();
                                checkOrder();
                            });
                        }

                        if (downBtn) {
                            downBtn.addEventListener('pointerup', (e) => {
                                e.stopPropagation();
                                [pageOrder[idx], pageOrder[idx + 1]] = [pageOrder[idx + 1], pageOrder[idx]];
                                renderPages();
                                checkOrder();
                            });
                        }

                        slotsContainer.appendChild(slot);
                    });
                }

                renderPages();
                puzzleBody.appendChild(slotsContainer);

                // Feedback
                const feedback = document.createElement('div');
                feedback.style.cssText = 'font-family:var(--font-serif); font-size:0.85rem; color:var(--brass); min-height:1.5em; text-align:center;';
                puzzleBody.appendChild(feedback);

                // Confirm button
                const confirmBtn = document.createElement('button');
                confirmBtn.style.cssText = 'padding:10px 32px; border:1px solid var(--brass); background:transparent; color:var(--cream); font-family:var(--font-serif); font-size:0.85rem; border-radius:20px; cursor:pointer;';
                confirmBtn.textContent = 'Confirmer l\'ordre';
                confirmBtn.addEventListener('pointerup', () => {
                    const correct = pageOrder.every((p, i) => p.order === i);
                    if (correct) {
                        feedback.textContent = 'Les pages s\'assemblent parfaitement !';
                        feedback.style.color = '#7a8b6f';
                        setTimeout(() => {
                            if (config.onSolve) config.onSolve();
                            close();
                        }, 1500);
                    } else {
                        feedback.textContent = 'L\'ordre ne semble pas correct... Les aquarelles ne se suivent pas.';
                        feedback.style.color = '#8b3a2a';
                        setTimeout(() => {
                            feedback.style.color = 'var(--brass)';
                            feedback.textContent = '';
                        }, 2000);
                    }
                });
                puzzleBody.appendChild(confirmBtn);

                container.appendChild(puzzleBody);

                function checkOrder() {
                    // Subtle visual feedback for correct positions
                    slotsContainer.querySelectorAll(':scope > div').forEach((slot, i) => {
                        if (pageOrder[i].order === i) {
                            slot.style.borderColor = 'rgba(122,139,111,0.4)';
                        } else {
                            slot.style.borderColor = 'rgba(200,149,108,0.15)';
                        }
                    });
                }
            }
        };
    }

    return {
        show, close, solve,
        createCombinationLock,
        createCuppingPuzzle,
        createPageAssembly
    };
})();
