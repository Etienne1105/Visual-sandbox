/* ============================================
   CHAPTER 1 — MONTRÉAL: "Brume & Grains"
   L'Héritage
   ============================================ */

const Chapter1 = (() => {

    function register() {
        // ============================
        // Scene: Exterior
        // ============================
        Engine.registerScene('ch1_exterior', {
            id: 'ch1_exterior',
            chapter: 1,
            location: 'Montreal — Mile-End',
            ambient: 'montreal-exterior',

            render() {
                Scenes.renderMontrealExterior();

                const objects = document.getElementById('scene-objects');

                // Door — enter cafe
                addObject(objects, {
                    id: 'door',
                    x: '37%', y: '62%', w: '8%', h: '18%',
                    hint: 'Entrer dans le cafe',
                    onClick() {
                        Engine.loadScene('ch1_interior');
                    }
                });

                // Travel to Chapter 2 (appears after Ch1 complete)
                if (Engine.hasFlag('ch1_complete')) {
                    addObject(objects, {
                        id: 'travel_ch2',
                        x: '70%', y: '85%', w: '25%', h: '12%',
                        hint: '\u2708 Voyager vers Addis-Abeba',
                        glow: true,
                        onClick() {
                            travelToChapter2();
                        }
                    });
                }

                // Sign
                addObject(objects, {
                    id: 'sign',
                    x: '33%', y: '55%', w: '16%', h: '5%',
                    hint: 'Brume & Grains — Torrefacteur artisanal',
                    onClick() {
                        Dialogue.start({
                            id: 'sign_read',
                            nodes: [{
                                speaker: 'narrator',
                                name: '',
                                text: 'L\'enseigne en fer forge oscille doucement. "Brume & Grains — Torrefacteur artisanal, depuis 2019." L\'ecriture a la main de grand-mere, reconnue entre mille.'
                            }]
                        });
                    }
                });

                // Bike
                addObject(objects, {
                    id: 'bike',
                    x: '60%', y: '83%', w: '10%', h: '10%',
                    hint: 'Un velo vintage enchaine',
                    onClick() {
                        Dialogue.start({
                            id: 'bike_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Le velo de Marco. Fidele au poste, peu importe la meteo.'
                            }]
                        });
                    }
                });

                // Staircase
                addObject(objects, {
                    id: 'stairs',
                    x: '22%', y: '40%', w: '8%', h: '40%',
                    hint: 'Escalier en colimacon',
                    onClick() {
                        Dialogue.start({
                            id: 'stairs_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'L\'escalier qui monte a mon appartement. Les marches grincent toujours a la troisieme. Mamie disait que c\'etait le batiment qui respirait.'
                            }]
                        });
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch1_started')) {
                    Engine.setFlag('ch1_started', true);
                    await Engine.wait(800);
                    await Dialogue.start({
                        id: 'ch1_opening',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Automne a Montreal. Les feuilles d\'erable tapissent les trottoirs du Mile-End comme un tapis de cuivre froisse.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Le vent d\'octobre porte l\'odeur du cafe fraichement torrefie depuis la porte entrouverte de "Brume & Grains".'
                            },
                            {
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Encore une journee comme les autres... Enfin, c\'est ce que je croyais avant le coup de fil de la notaire.'
                            }
                        ]
                    });
                }
            }
        });

        // ============================
        // Scene: Interior
        // ============================
        Engine.registerScene('ch1_interior', {
            id: 'ch1_interior',
            chapter: 1,
            location: 'Brume & Grains — Salle',
            ambient: 'montreal-cafe',

            render() {
                Scenes.renderMontrealInterior();

                const objects = document.getElementById('scene-objects');

                // Exit door
                addObject(objects, {
                    id: 'exit',
                    x: '0%', y: '60%', w: '5%', h: '30%',
                    hint: 'Sortir',
                    onClick() {
                        Engine.loadScene('ch1_exterior');
                    }
                });

                // Espresso machine
                addObject(objects, {
                    id: 'espresso',
                    x: '30%', y: '38%', w: '12%', h: '12%',
                    hint: 'Machine La Marzocco',
                    onClick() {
                        Dialogue.start({
                            id: 'espresso_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'La Linea. Fidele compagne de chaque matin. Le chrome est encore tiede — Marco a deja fait les premiers expressos de la journee.'
                            }]
                        });
                    }
                });

                // Grinder
                addObject(objects, {
                    id: 'grinder',
                    x: '43%', y: '40%', w: '6%', h: '10%',
                    hint: 'Moulin Mazzer rouge',
                    onClick() {
                        Dialogue.start({
                            id: 'grinder_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Le Mazzer rouge cerise. Un cadeau de mamie pour l\'ouverture. Elle disait que la couleur empecherait les clients de s\'endormir avant de commander.'
                            }]
                        });
                    }
                });

                // Mason jars
                addObject(objects, {
                    id: 'jars',
                    x: '5%', y: '28%', w: '25%', h: '10%',
                    hint: 'Pots de grains du monde',
                    onClick() {
                        Dialogue.start({
                            id: 'jars_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Des grains de chaque continent. Chaque pot est etiquete a la main par mamie. Son ecriture est partout dans ce cafe, comme un fantome bienveillant.'
                            }]
                        });
                    }
                });

                // Photos on wall
                addObject(objects, {
                    id: 'photos',
                    x: '40%', y: '12%', w: '15%', h: '12%',
                    hint: 'Photographies anciennes',
                    onClick() {
                        if (!Engine.hasFlag('ch1_photos_seen')) {
                            Engine.setFlag('ch1_photos_seen', true);
                            Dialogue.start({
                                id: 'photos_discover',
                                nodes: [
                                    {
                                        speaker: 'emile',
                                        name: 'Emile',
                                        text: 'Des photos de plantations. Certaines prises par mamie, d\'autres plus anciennes. Il y en a une... l\'Ethiopie, je crois. Elle a l\'air si jeune.'
                                    },
                                    {
                                        speaker: 'narrator',
                                        name: '',
                                        text: 'Au dos de l\'une des photos, une annotation a demi effacee : "Kaffa, 1978. La ou tout a commence."'
                                    }
                                ]
                            });
                        } else {
                            Dialogue.start({
                                id: 'photos_look',
                                nodes: [{
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'Les photos de mamie. Kaffa, 1978...'
                                }]
                            });
                        }
                    }
                });

                // Marco
                addObject(objects, {
                    id: 'marco',
                    x: '25%', y: '35%', w: '8%', h: '25%',
                    hint: 'Parler a Marco',
                    onClick() {
                        startMarcoDialogue();
                    }
                });

                // Back room door
                addObject(objects, {
                    id: 'backdoor',
                    x: '85%', y: '25%', w: '10%', h: '40%',
                    hint: 'Arriere-boutique',
                    onClick() {
                        Engine.loadScene('ch1_backroom');
                    }
                });

                // Register
                addObject(objects, {
                    id: 'register',
                    x: '48%', y: '42%', w: '8%', h: '8%',
                    hint: 'Caisse enregistreuse en laiton',
                    onClick() {
                        Dialogue.start({
                            id: 'register_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'La caisse des annees 1940. Elle fonctionne encore, meme si Marco prefere la tablette. Le ting ! quand on l\'ouvre... un son irremplacable.'
                            }]
                        });
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch1_entered_cafe')) {
                    Engine.setFlag('ch1_entered_cafe', true);
                    await Engine.wait(600);
                    await Dialogue.start({
                        id: 'enter_cafe',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'L\'odeur familiere de cafe fraichement moulu enveloppe Emile comme une couverture. Le plancher en erable craque sous ses pas.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Le jazz de Chet Baker coule doucement depuis le vieux tourne-disque. Quelques habitues lisent, travaillent, revent.'
                            }
                        ]
                    });
                }
            }
        });

        // ============================
        // Scene: Back Room
        // ============================
        Engine.registerScene('ch1_backroom', {
            id: 'ch1_backroom',
            chapter: 1,
            location: 'Brume & Grains — Atelier',
            ambient: 'montreal-back',

            render() {
                Scenes.renderMontrealBackRoom();

                const objects = document.getElementById('scene-objects');

                // Return to main room
                addObject(objects, {
                    id: 'return',
                    x: '0%', y: '20%', w: '5%', h: '60%',
                    hint: 'Retourner a la salle',
                    onClick() {
                        Engine.loadScene('ch1_interior');
                    }
                });

                // Probat roaster
                addObject(objects, {
                    id: 'roaster',
                    x: '18%', y: '18%', w: '22%', h: '35%',
                    hint: 'Torrefacteur Probat',
                    onClick() {
                        Dialogue.start({
                            id: 'roaster_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Le Probat des annees 60. Un monstre magnifique en fonte et en cuivre. Mamie l\'a trouve dans une vente aux encheres a Berlin et l\'a fait expedier piece par piece. Chaque torrefaction est une conversation avec cette machine.'
                            }]
                        });
                    }
                });

                // Jute sacks
                addObject(objects, {
                    id: 'sacks',
                    x: '55%', y: '35%', w: '18%', h: '25%',
                    hint: 'Sacs de jute',
                    onClick() {
                        Dialogue.start({
                            id: 'sacks_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Kaffa, Oaxaca, Sumatra... Chaque sac porte le nom de sa ferme d\'origine. Mamie insistait pour connaitre personnellement chaque producteur.'
                            }]
                        });
                    }
                });

                // The package (Béatrice's)
                addObject(objects, {
                    id: 'package',
                    x: '30%', y: '48%', w: '10%', h: '8%',
                    hint: Engine.hasFlag('ch1_package_opened') ? 'Le carnet de Beatrice' : 'Un paquet en papier kraft',
                    glow: !Engine.hasFlag('ch1_package_opened'),
                    onClick() {
                        interactWithPackage();
                    }
                });

                // Cupping tools
                addObject(objects, {
                    id: 'cupping',
                    x: '5%', y: '50%', w: '20%', h: '8%',
                    hint: 'Materiel de cupping',
                    onClick() {
                        if (Engine.hasFlag('ch1_has_mystery_beans') && !Engine.hasFlag('ch1_cupping_done')) {
                            startCuppingPuzzle();
                        } else if (Engine.hasFlag('ch1_cupping_done')) {
                            Dialogue.start({
                                id: 'cupping_done',
                                nodes: [{
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'Ethiopie. Region de Kaffa. La ou mamie a commence son voyage en 1978. Ce n\'est pas une coincidence.'
                                }]
                            });
                        } else {
                            Dialogue.start({
                                id: 'cupping_look',
                                nodes: [{
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'Les outils de cupping. Cuillers en argent, tasses standardisees, refractometre... tout le necessaire pour une degustation professionnelle.'
                                }]
                            });
                        }
                    }
                });

                // The safe
                addObject(objects, {
                    id: 'safe',
                    x: '65%', y: '47%', w: '16%', h: '18%',
                    hint: Engine.hasFlag('ch1_safe_opened') ? 'Le coffre (ouvert)' : 'Un coffre-fort',
                    glow: Engine.hasFlag('ch1_has_carnet') && !Engine.hasFlag('ch1_safe_opened'),
                    onClick() {
                        interactWithSafe();
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch1_entered_backroom')) {
                    Engine.setFlag('ch1_entered_backroom', true);
                    await Engine.wait(600);
                    await Dialogue.start({
                        id: 'enter_backroom',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'L\'atelier de torrefaction. L\'odeur est plus dense ici — un melange terreux de cafe vert, de cafe torrefie, et de metal chaud.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Sur l\'etabli, un paquet en papier kraft attend. Il n\'etait pas la ce matin.',
                                onShow() {
                                    // Highlight the package
                                }
                            }
                        ]
                    });
                }
            }
        });
    }

    // ============================
    // Interactive object helper
    // ============================
    function addObject(container, config) {
        const obj = document.createElement('div');
        obj.className = 'scene-object' + (config.glow ? ' glow' : '');
        obj.style.cssText = `left:${config.x}; top:${config.y}; width:${config.w}; height:${config.h};`;
        obj.dataset.hint = config.hint || '';

        obj.addEventListener('pointerenter', () => {
            const hint = document.getElementById('interaction-hint');
            document.getElementById('hint-text').textContent = config.hint;
            hint.classList.remove('hidden');
            hint.classList.add('visible');
        });

        obj.addEventListener('pointerleave', () => {
            const hint = document.getElementById('interaction-hint');
            hint.classList.remove('visible');
        });

        obj.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            if (Dialogue.isActive()) return;
            Audio.playTap();
            const hint = document.getElementById('interaction-hint');
            hint.classList.remove('visible');
            if (config.onClick) config.onClick();
        });

        container.appendChild(obj);
    }

    // ============================
    // Marco dialogue
    // ============================
    function startMarcoDialogue() {
        if (!Engine.hasFlag('ch1_talked_marco')) {
            Dialogue.start({
                id: 'marco_first',
                nodes: [
                    {
                        speaker: 'marco',
                        name: 'Marco',
                        text: 'Eh, Emile ! T\'as une tete de lendemain de veille. Cafe ? ...Attends, c\'est vrai, tu bois pas de cafe le matin. Paradoxe du torrefacteur.'
                    },
                    {
                        speaker: 'emile',
                        name: 'Emile',
                        text: 'La notaire a appele. Il parait que mamie... qu\'elle a laisse quelque chose pour moi.',
                        choices: [
                            {
                                text: 'Elle a laisse un testament.',
                                next: 2,
                                setFlag: { key: 'ch1_talked_marco', value: true }
                            },
                            {
                                text: 'C\'est complique. Je t\'en parle plus tard.',
                                next: 4,
                                setFlag: { key: 'ch1_talked_marco', value: true }
                            }
                        ]
                    },
                    {
                        speaker: 'marco',
                        name: 'Marco',
                        text: 'Un testament ? Mais... ca fait trois ans qu\'elle a disparu. Comment...'
                    },
                    {
                        speaker: 'marco',
                        name: 'Marco',
                        text: 'Ecoute, il y a un paquet arrive ce matin par coursier. Pas de nom d\'expediteur, juste tes initiales. Je l\'ai pose dans l\'arriere-boutique, sur l\'etabli. Ca avait l\'air... important.',
                        onShow() {
                            Engine.setFlag('ch1_package_hint', true);
                        }
                    },
                    {
                        speaker: 'marco',
                        name: 'Marco',
                        text: 'OK, prends ton temps. Mais sache qu\'il y a un paquet bizarre qui est arrive ce matin. Je l\'ai mis dans l\'arriere-boutique. Ca te concerne peut-etre.',
                        onShow() {
                            Engine.setFlag('ch1_package_hint', true);
                        }
                    }
                ]
            });
        } else {
            Dialogue.start({
                id: 'marco_after',
                nodes: [{
                    speaker: 'marco',
                    name: 'Marco',
                    text: Engine.hasFlag('ch1_has_carnet') ?
                        'Le carnet de Beatrice, hein ? Elle etait toujours en train de griffonner dedans. Des dessins magnifiques... Tu devrais regarder dans l\'arriere-boutique, elle avait un coffre la-bas.' :
                        'Le paquet est dans l\'arriere-boutique, sur l\'etabli. Va voir.'
                }]
            });
        }
    }

    // ============================
    // Package interaction
    // ============================
    function interactWithPackage() {
        if (Engine.hasFlag('ch1_package_opened')) {
            Dialogue.start({
                id: 'package_again',
                nodes: [{
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'L\'emballage kraft est vide maintenant. Mais l\'odeur du cafe et de l\'encre y persiste encore.'
                }]
            });
            return;
        }

        Engine.setFlag('ch1_package_opened', true);

        Dialogue.start({
            id: 'package_open',
            nodes: [
                {
                    speaker: 'narrator',
                    name: '',
                    text: 'Le papier kraft crisse sous les doigts d\'Emile. Le cachet de cire rouge — les initiales B.T. entrelacees — cede avec un craquement doux.'
                },
                {
                    speaker: 'narrator',
                    name: '',
                    text: 'A l\'interieur : un carnet de voyage use, a la couverture en cuir brun fonce, ferme par un elastique. Et un petit sachet en toile contenant des grains de cafe inconnus.'
                },
                {
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Le carnet de mamie... Je reconnais son ecriture sur la premiere page. Des aquarelles, des annotations... C\'est son journal de voyage.'
                },
                {
                    speaker: 'narrator',
                    name: '',
                    text: 'Une enveloppe glisse du carnet. Cachetee elle aussi. "Pour Emile, quand il sera pret."'
                },
                {
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Quand il sera pret... Qu\'est-ce que tu voulais me dire, mamie ?',
                    onShow() {
                        Engine.setFlag('ch1_has_carnet', true);
                        Engine.setFlag('ch1_has_mystery_beans', true);
                        Inventory.add('carnet');
                        Inventory.add('grains_mystere');
                        Inventory.add('enveloppe');
                        Audio.playPickup();

                        Notebook.addClue({
                            text: '"Les temperatures racontent une histoire. 195, 210, 185, 225 — mais pas dans cet ordre."',
                            source: 'Annotation de Beatrice, page 3 du carnet'
                        });

                        Notebook.addClue({
                            text: '"Kaffa, 1978. La ou tout commence. La ou tout reviendra."',
                            source: 'Photo trouvee dans le carnet'
                        });
                    }
                }
            ],
            onEnd() {
                Dialogue.start({
                    id: 'package_envelope',
                    nodes: [
                        {
                            speaker: 'narrator',
                            name: '',
                            text: 'L\'enveloppe contient une lettre et une petite cle en laiton.',
                        },
                        {
                            speaker: 'beatrice',
                            name: 'Beatrice (lettre)',
                            text: 'Mon cher Emile, si tu lis ces mots, c\'est que le moment est venu. Le cafe que tu trouveras dans ce paquet n\'est pas un cafe ordinaire. Pour comprendre ce qu\'il est, tu devras refaire mon voyage.'
                        },
                        {
                            speaker: 'beatrice',
                            name: 'Beatrice (lettre)',
                            text: 'Commence par identifier ces grains — tu as tout le materiel necessaire. Puis ouvre le coffre de l\'atelier. La combinaison est cachee dans mes notes. Tu la trouveras si tu sais ou chercher.'
                        },
                        {
                            speaker: 'beatrice',
                            name: 'Beatrice (lettre)',
                            text: 'Je t\'ai prepare a ce voyage toute ta vie, Emile. Chaque tasse que je t\'ai fait gouter, chaque histoire que je t\'ai racontee... c\'etait pour ce moment. Fais-moi confiance. Et fais confiance au cafe.'
                        },
                        {
                            speaker: 'emile',
                            name: 'Emile',
                            text: '...',
                            onShow() {
                                Inventory.add('cle_coffre');
                                Audio.playPickup();
                            }
                        }
                    ]
                });
            }
        });
    }

    // ============================
    // Safe puzzle
    // ============================
    function interactWithSafe() {
        if (Engine.hasFlag('ch1_safe_opened')) {
            Dialogue.start({
                id: 'safe_opened',
                nodes: [{
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Le coffre est vide maintenant. Les pages du carnet et la photo sont avec moi.'
                }]
            });
            return;
        }

        if (!Inventory.has('cle_coffre')) {
            Dialogue.start({
                id: 'safe_locked',
                nodes: [{
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Un coffre-fort en acier, vieux mais solide. Il y a un cadran a combinaison et une serrure. Il me faut la cle et le code.'
                }]
            });
            return;
        }

        // Has key, needs combination
        Dialogue.start({
            id: 'safe_try',
            nodes: [
                {
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'La cle entre dans la serrure. Mais il faut aussi un code a 4 chiffres... Mamie a dit que la combinaison etait cachee dans ses notes.'
                },
                {
                    speaker: 'narrator',
                    name: '',
                    text: 'Dans le carnet, une annotation : "Les temperatures racontent une histoire. 195, 210, 185, 225 — mais pas dans cet ordre." Les temperatures de torrefaction... classees de la plus basse a la plus haute ?'
                }
            ],
            onEnd() {
                // Code: sorted temps = 185, 195, 210, 225 → take last digit of each = 5, 5, 0, 5
                // Actually let's make it simpler: 1-8-5 → 1978 (year from photo)
                // The hint says "not in this order" — the year Kaffa 1978
                Puzzles.show(Puzzles.createCombinationLock({
                    title: 'Le Coffre de l\'Atelier',
                    code: [1, 9, 7, 8],
                    hint: 'Les temperatures de torrefaction cachent un nombre. Mais peut-etre que la reponse est plus simple... "Kaffa, 1978. La ou tout commence."',
                    onSolve() {
                        Engine.setFlag('ch1_safe_opened', true);
                        Audio.playSuccess();
                        Engine.wait(500).then(() => {
                            Dialogue.start({
                                id: 'safe_contents',
                                nodes: [
                                    {
                                        speaker: 'narrator',
                                        name: '',
                                        text: 'Le coffre s\'ouvre avec un declic. A l\'interieur : trois pages detachees du carnet et une photographie en noir et blanc.'
                                    },
                                    {
                                        speaker: 'emile',
                                        name: 'Emile',
                                        text: 'Des pages arrachees du carnet... Chacune porte une aquarelle differente. Et cette photo — c\'est mamie, jeune, devant un cafeier sauvage.',
                                        onShow() {
                                            Inventory.add('page_carnet');
                                            Inventory.add('photo_beatrice');
                                            Audio.playPickup();
                                        }
                                    },
                                    {
                                        speaker: 'narrator',
                                        name: '',
                                        text: 'Les pages sont numerotees mais dans le desordre. Il faut les remettre dans le bon ordre pour reveler le message complet.'
                                    }
                                ],
                                onEnd() {
                                    // Trigger page assembly puzzle
                                    Engine.wait(500).then(() => startPagePuzzle());
                                }
                            });
                        });
                    }
                }));
            }
        });
    }

    // ============================
    // Cupping puzzle
    // ============================
    function startCuppingPuzzle() {
        Dialogue.start({
            id: 'cupping_intro',
            nodes: [
                {
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Ces grains mysterieux... Je peux utiliser le materiel de cupping pour identifier leur origine. L\'arome, l\'acidite, le corps — chaque terroir a sa signature.'
                }
            ],
            onEnd() {
                Puzzles.show(Puzzles.createCuppingPuzzle({
                    title: 'Identification des Grains',
                    description: 'Examinez les aromes des grains mysterieux et identifiez leur origine parmi les regions proposees.',
                    cups: [
                        {
                            label: 'Tasse A',
                            aromas: 'Notes florales de jasmin, acidite vive mais delicate, corps leger et soyeux. Finale de bergamote et de miel sauvage.'
                        },
                        {
                            label: 'Tasse B (temoin)',
                            aromas: 'Notes de chocolat noir, noisette, corps rond et veloute. Un Bresilien classique pour comparaison.'
                        },
                        {
                            label: 'Tasse C (temoin)',
                            aromas: 'Notes terreuses, tabac, bois de cedre, corps lourd. Un Sumatran typique pour comparaison.'
                        }
                    ],
                    origins: [
                        {
                            name: 'Bresil — Cerrado',
                            correct: false,
                            feedback: 'Non... le profil aromatique de la tasse A est bien plus floral et delicat qu\'un Bresilien.'
                        },
                        {
                            name: 'Ethiopie — Region de Kaffa',
                            correct: true,
                            feedback: 'Oui ! Le jasmin, la bergamote, cette acidite lumineuse... C\'est un Arabica sauvage d\'Ethiopie. Exactement comme sur la photo de mamie — "Kaffa, 1978".'
                        },
                        {
                            name: 'Sumatra — Mandheling',
                            correct: false,
                            feedback: 'Non, un Sumatran serait beaucoup plus terreux et lourd. Ces grains sont aeriens, floraux.'
                        },
                        {
                            name: 'Colombie — Huila',
                            correct: false,
                            feedback: 'Proche, mais un Colombien aurait plus de caramel et moins de notes florales sauvages.'
                        }
                    ],
                    onSolve() {
                        Engine.setFlag('ch1_cupping_done', true);
                        Audio.playSuccess();
                        Engine.wait(500).then(() => {
                            Dialogue.start({
                                id: 'cupping_result',
                                nodes: [
                                    {
                                        speaker: 'emile',
                                        name: 'Emile',
                                        text: 'Ethiopie. La region de Kaffa. Le berceau du cafe. Mamie y etait en 1978 — c\'est la premiere destination de son carnet.'
                                    },
                                    {
                                        speaker: 'emile',
                                        name: 'Emile',
                                        text: 'Mais ces grains... ils sont differents de tous les Ethiopiens que j\'ai goutes. Il y a quelque chose de plus. Quelque chose d\'ancien.',
                                        onShow() {
                                            Notebook.addClue({
                                                text: 'Les grains mysterieux sont un Arabica sauvage d\'Ethiopie, region de Kaffa. Variete inconnue — possiblement une souche ancestrale.',
                                                source: 'Analyse par cupping — Emile'
                                            });
                                        }
                                    }
                                ]
                            });
                        });
                    }
                }));
            }
        });
    }

    // ============================
    // Page assembly puzzle
    // ============================
    function startPagePuzzle() {
        Puzzles.show(Puzzles.createPageAssembly({
            title: 'Les Pages du Carnet',
            description: 'Remettez les trois pages dans le bon ordre chronologique en vous basant sur les aquarelles et les annotations.',
            pages: [
                {
                    order: 0,
                    icon: '\uD83C\uDF3F',
                    sketch: 'Un cafeier sauvage en fleur',
                    annotation: '"Tout commence par une graine. Kaffa, le berceau."'
                },
                {
                    order: 1,
                    icon: '\u2615',
                    sketch: 'Une ceremonie du cafe traditionnelle',
                    annotation: '"Trois rondes, trois benedictions. Abol, Tona, Baraka."'
                },
                {
                    order: 2,
                    icon: '\uD83D\uDDFA\uFE0F',
                    sketch: 'Une carte avec des lignes tracees',
                    annotation: '"Le chemin continue. Chaque tasse mene a la suivante."'
                }
            ],
            onSolve() {
                Engine.setFlag('ch1_pages_assembled', true);
                Audio.playSuccess();
                Engine.wait(500).then(() => {
                    Dialogue.start({
                        id: 'pages_complete',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Les pages s\'emboitent. Les aquarelles se repondent — le cafeier sauvage, la ceremonie du cafe, la carte. Un itineraire se dessine.'
                            },
                            {
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'C\'est un itineraire. Mamie veut que je refasse son voyage. La premiere etape... l\'Ethiopie. Addis-Abeba.'
                            },
                            {
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Il y a une adresse et un nom : "Tsega". Et une note : "Elle ne parlera qu\'apres la ceremonie. Montre-lui que tu sais."',
                                onShow() {
                                    Notebook.addJournalPage({
                                        left: `
                                            <h3>Chapitre 1 — Montreal</h3>
                                            <p class="note-hand">Le paquet de mamie contenait son carnet de voyage et des grains d'Ethiopie — region de Kaffa, variete inconnue.</p>
                                            <div class="note-sketch">[ Aquarelle : Brume & Grains, automne ]</div>
                                            <p class="note-hand">La combinaison du coffre etait 1978 — l'annee de son premier voyage a Kaffa.</p>
                                        `,
                                        right: `
                                            <h3 style="font-family:var(--font-hand); color:#8b6914;">Notes de Beatrice</h3>
                                            <p class="note-hand">"Mon cher Emile, ce voyage t'attend depuis ta naissance. Chaque tasse que tu as goutee t'a prepare."</p>
                                            <p class="note-hand" style="margin-top:16px;">"Premiere destination : Addis-Abeba. Trouve Tsega. Elle detient le premier indice."</p>
                                            <p class="note-hand" style="margin-top:16px; opacity:0.6;">"Buna dabo naw — Le cafe est notre pain."</p>
                                        `
                                    });

                                    Notebook.addRecipe({
                                        name: 'Espresso Montreal',
                                        origin: 'Brume & Grains — Mile-End, Montreal'
                                    });
                                }
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Fin du Chapitre 1. Le voyage commence...'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'A suivre — Chapitre 2 : Addis-Abeba, Ethiopie. "Buna Dabo Naw".'
                            }
                        ],
                        onEnd() {
                            Engine.setFlag('ch1_complete', true);
                            Engine.save();
                        }
                    });
                });
            }
        }));
    }

    // ============================
    // Travel to Chapter 2
    // ============================
    async function travelToChapter2() {
        Dialogue.start({
            id: 'travel_ch2_confirm',
            nodes: [
                {
                    speaker: 'emile',
                    name: 'Emile',
                    text: 'Addis-Abeba. Le berceau du cafe. C\'est la que mamie veut que j\'aille.',
                    choices: [
                        {
                            text: 'Prendre l\'avion pour l\'Ethiopie',
                            onSelect() {
                                Engine.state.chapter = 2;
                                Inventory.add('billet_avion');
                                Engine.save();
                                launchCh2Cutscene();
                            }
                        },
                        {
                            text: 'Pas encore, je veux explorer Montreal',
                            onSelect() {
                                // Just close
                            }
                        }
                    ]
                }
            ]
        });
    }

    async function launchCh2Cutscene() {
        await Engine.wait(500);
        await Engine.playCutscene({
            frames: [
                {
                    visual: '<div style="background:linear-gradient(135deg,#1a1209,#3a2a1a); width:100%; height:100%; display:flex; align-items:center; justify-content:center;"><div style="font-size:3rem;">\u2708\uFE0F</div></div>',
                    text: 'L\'avion decolle de Trudeau dans la lumiere grise de l\'automne montrealais. Destination : Addis-Abeba, Ethiopie.'
                },
                {
                    visual: '<div style="background:linear-gradient(180deg,#d4a050,#c89040); width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px;"><div style="font-family:\'Segoe Script\',cursive; font-size:1.5rem; color:#3a2210;">Chapitre 2</div><div style="font-family:Georgia; font-size:0.9rem; color:#5a4a3a;">Le Berceau</div><div style="font-family:Georgia; font-size:0.7rem; color:#7a6a4a; font-style:italic;">Buna Dabo Naw</div></div>',
                    text: '"Le cafe est notre pain." — proverbe ethiopien'
                }
            ]
        });
        await Engine.loadScene('ch2_piazza');
    }

    return { register };
})();
