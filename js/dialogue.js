/* ============================================
   DIALOGUE SYSTEM — Conversations & Choices
   ============================================ */

const Dialogue = (() => {
    let currentDialogue = null;
    let currentNode = 0;
    let isTyping = false;
    let typewriterAbort = false;

    const portraits = {
        emile: { initials: 'EL', color: '#3a5a3a' },
        marco: { initials: 'M', color: '#7a3322' },
        notaire: { initials: 'MC', color: '#5a5a6a' },
        beatrice: { initials: 'BT', color: '#8b6914' },
        narrator: { initials: '\u270E', color: '#2a2a2a' },
        tsega: { initials: 'T', color: '#5a3a1a' },
        nadia: { initials: 'N', color: '#6a2a3a' }
    };

    function init() {
        const box = document.getElementById('dialogue-box');
        const content = document.getElementById('dialogue-content');

        content.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            if (e.target.closest('.dialogue-choice')) return;

            if (isTyping) {
                typewriterAbort = true;
            } else {
                advance();
            }
        });
    }

    async function start(dialogueData) {
        currentDialogue = dialogueData;
        currentNode = 0;
        showBox();
        await showNode(currentDialogue.nodes[currentNode]);
    }

    function showBox() {
        document.getElementById('dialogue-box').classList.remove('hidden');
    }

    function hideBox() {
        document.getElementById('dialogue-box').classList.add('hidden');
        currentDialogue = null;
    }

    async function showNode(node) {
        if (!node) {
            end();
            return;
        }

        // Set portrait
        const portrait = portraits[node.speaker] || portraits.narrator;
        const portraitEl = document.getElementById('dialogue-portrait');
        portraitEl.textContent = portrait.initials;
        portraitEl.style.borderColor = portrait.color;
        portraitEl.style.background = portrait.color;

        // Set name
        document.getElementById('dialogue-name').textContent = node.name || '';

        // Clear
        const textEl = document.getElementById('dialogue-text');
        const choicesEl = document.getElementById('dialogue-choices');
        const continueEl = document.getElementById('dialogue-continue');
        textEl.textContent = '';
        choicesEl.innerHTML = '';
        continueEl.classList.add('hidden');

        // Typewriter effect
        isTyping = true;
        typewriterAbort = false;

        for (let i = 0; i < node.text.length; i++) {
            if (typewriterAbort) {
                textEl.textContent = node.text;
                break;
            }
            textEl.textContent += node.text[i];
            await Engine.wait(25);
        }

        isTyping = false;

        // Show choices or continue
        if (node.choices && node.choices.length > 0) {
            showChoices(node.choices);
        } else {
            continueEl.classList.remove('hidden');
        }

        // Execute callback
        if (node.onShow) {
            node.onShow();
        }
    }

    function showChoices(choices) {
        const container = document.getElementById('dialogue-choices');
        container.innerHTML = '';

        choices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            btn.textContent = choice.text;
            btn.addEventListener('pointerup', (e) => {
                e.stopPropagation();
                selectChoice(choice, idx);
            });
            container.appendChild(btn);
        });
    }

    function selectChoice(choice, idx) {
        // Record choice
        Engine.state.dialogueHistory.push({
            dialogue: currentDialogue.id,
            node: currentNode,
            choice: idx
        });

        // Set any flags
        if (choice.setFlag) {
            Engine.setFlag(choice.setFlag.key, choice.setFlag.value);
        }

        // Execute callback
        if (choice.onSelect) {
            choice.onSelect();
        }

        // Navigate to next node
        if (choice.next !== undefined) {
            currentNode = choice.next;
            showNode(currentDialogue.nodes[currentNode]);
        } else {
            advance();
        }
    }

    function advance() {
        if (!currentDialogue) return;

        const node = currentDialogue.nodes[currentNode];

        // Check for explicit next
        if (node && node.next !== undefined) {
            currentNode = node.next;
        } else {
            currentNode++;
        }

        if (currentNode >= currentDialogue.nodes.length) {
            end();
        } else {
            showNode(currentDialogue.nodes[currentNode]);
        }
    }

    function end() {
        hideBox();
        if (currentDialogue && currentDialogue.onEnd) {
            currentDialogue.onEnd();
        }
        currentDialogue = null;
    }

    function isActive() {
        return currentDialogue !== null;
    }

    return { init, start, end, isActive };
})();
