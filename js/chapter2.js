/* ============================================
   CHAPTER 2 — ADDIS-ABEBA, ÉTHIOPIE
   "Buna Dabo Naw" — Le Berceau
   ============================================ */

const Chapter2 = (() => {

    // Register all items for this chapter
    function registerItems() {
        Inventory.registerItem({
            id: 'billet_avion',
            name: 'Billet pour Addis-Abeba',
            icon: '\u2708\uFE0F',
            description: 'Un billet d\'avion Montreal-Addis-Abeba. Depart dans quelques heures.'
        });
        Inventory.registerItem({
            id: 'encens_itan',
            name: 'Encens itan',
            icon: '\uD83D\uDD6F\uFE0F',
            description: 'De l\'oliban ethiopien — la resine du Boswellia. Son parfum sacre accompagne chaque ceremonie du bunna.'
        });
        Inventory.registerItem({
            id: 'sini_cup',
            name: 'Sini de Tsega',
            icon: '\u2615',
            description: 'Une petite tasse a cafe sans anse, decoree aux couleurs du drapeau ethiopien. Offerte par Tsega apres la ceremonie.'
        });
        Inventory.registerItem({
            id: 'kaffa_cherry',
            name: 'Cerise de Kaffa',
            icon: '\uD83C\uDF52',
            description: 'Une cerise de cafe rouge ecarlate cueillie dans la foret de Kaffa. Elle porte un symbole ancien grave sur sa peau — le meme que dans le carnet de Beatrice.'
        });
        Inventory.registerItem({
            id: 'lettre_tsega',
            name: 'Lettre de Tsega',
            icon: '\uD83D\uDCDC',
            description: 'Une lettre de Tsega pour un contact a Istanbul. "Trouve Halide Hanim dans le kahvehane cache du Grand Bazar. Elle lira ce que les grains ont a dire."'
        });
        Inventory.registerItem({
            id: 'photo_kaffa',
            name: 'Photo de Kaffa',
            icon: '\uD83C\uDF3F',
            description: 'Une vieille photo polaroid de Beatrice dans la foret de Kaffa, une cerise de cafe dans la main. Au dos : "La mere de tous les cafes dort ici."'
        });
    }

    function register() {
        registerItems();

        // ============================
        // Scene: Piazza District
        // ============================
        Engine.registerScene('ch2_piazza', {
            id: 'ch2_piazza',
            chapter: 2,
            location: 'Addis-Abeba — Piazza',
            ambient: 'ethiopia-piazza',

            render() {
                Scenes.renderEthiopiaPiazza();
                const objects = document.getElementById('scene-objects');

                // Tsega's blue door
                addObject(objects, {
                    id: 'blue_door',
                    x: '32%', y: '52%', w: '10%', h: '18%',
                    hint: 'Porte bleue — Maison de Tsega',
                    glow: true,
                    onClick() {
                        if (Engine.hasFlag('ch2_tsega_invited')) {
                            Engine.loadScene('ch2_ceremony');
                        } else {
                            startDawitDialogue();
                        }
                    }
                });

                // Fruit cart
                addObject(objects, {
                    id: 'fruit_cart',
                    x: '10%', y: '72%', w: '12%', h: '12%',
                    hint: 'Charrette de fruits',
                    onClick() {
                        Dialogue.start({
                            id: 'fruit_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Des mangues, des papayes, des goyaves... Les couleurs sont si vives sous cette lumiere. L\'air est charge d\'odeurs que je ne connais pas — epices, terre chaude, eucalyptus.'
                            }]
                        });
                    }
                });

                // Cat Arabica
                addObject(objects, {
                    id: 'cat_arabica',
                    x: '60%', y: '66%', w: '8%', h: '8%',
                    hint: 'Un chat roux',
                    onClick() {
                        Dialogue.start({
                            id: 'cat_ethiopia',
                            nodes: [
                                {
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'Encore ce chat roux... Le meme qu\'a Montreal ? Non, c\'est impossible. Et pourtant, il me regarde comme s\'il me connaissait.'
                                },
                                {
                                    speaker: 'narrator',
                                    name: '',
                                    text: 'Le chat tourne lentement la tete vers la porte bleue, puis vous regarde a nouveau. Ses yeux verts semblent dire : "C\'est par la."'
                                }
                            ]
                        });
                    }
                });

                // Left building
                addObject(objects, {
                    id: 'colonial_bldg',
                    x: '0%', y: '10%', w: '25%', h: '60%',
                    hint: 'Batiment colonial italien',
                    onClick() {
                        Dialogue.start({
                            id: 'colonial_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'L\'architecture coloniale italienne se mele aux constructions ethiopiennes. Les fissures dans le stuc racontent des decennies d\'histoire. Les bougainvilliers magenta cascadent des balcons comme des cascades de couleur.'
                            }]
                        });
                    }
                });

                // Eucalyptus
                addObject(objects, {
                    id: 'eucalyptus',
                    x: '65%', y: '0%', w: '25%', h: '50%',
                    hint: 'Eucalyptus majestueux',
                    onClick() {
                        Dialogue.start({
                            id: 'eucalyptus_look',
                            nodes: [{
                                speaker: 'narrator',
                                name: '',
                                text: 'Un eucalyptus immense projette une ombre tachetee sur toute la ruelle. Son parfum menthole se mele a la chaleur seche de l\'apres-midi.'
                            }]
                        });
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch2_started')) {
                    Engine.setFlag('ch2_started', true);
                    await Engine.wait(800);
                    await Dialogue.start({
                        id: 'ch2_arrival',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Addis-Abeba. La "Nouvelle Fleur". A 2 300 metres d\'altitude, l\'air est plus leger, plus sec, charge d\'une energie palpable.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Le quartier Piazza — un dedale de ruelles ou l\'heritage colonial italien se fond dans l\'architecture ethiopienne traditionnelle.'
                            },
                            {
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Le carnet de mamie indique une adresse ici. Une certaine Tsega... et une porte bleue. "Buna Dabo Naw" — le cafe est notre pain.'
                            }
                        ]
                    });
                }
            }
        });

        // ============================
        // Scene: Ceremony Room
        // ============================
        Engine.registerScene('ch2_ceremony', {
            id: 'ch2_ceremony',
            chapter: 2,
            location: 'Maison de Tsega — Ceremonie',
            ambient: 'ethiopia-ceremony',

            render() {
                Scenes.renderEthiopiaCeremony();
                const objects = document.getElementById('scene-objects');

                // Exit
                addObject(objects, {
                    id: 'exit_ceremony',
                    x: '0%', y: '30%', w: '5%', h: '40%',
                    hint: 'Sortir',
                    onClick() {
                        Engine.loadScene('ch2_piazza');
                    }
                });

                // Tsega
                addObject(objects, {
                    id: 'tsega',
                    x: '8%', y: '42%', w: '12%', h: '28%',
                    hint: 'Parler a Tsega',
                    onClick() {
                        startTsegaDialogue();
                    }
                });

                // Jebena
                addObject(objects, {
                    id: 'jebena',
                    x: '37%', y: '62%', w: '12%', h: '15%',
                    hint: 'La jebena et les sini',
                    onClick() {
                        if (Engine.hasFlag('ch2_ceremony_ready') && !Engine.hasFlag('ch2_ceremony_done')) {
                            startCeremonyPuzzle();
                        } else if (Engine.hasFlag('ch2_ceremony_done')) {
                            Dialogue.start({
                                id: 'jebena_done',
                                nodes: [{
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'La jebena est encore chaude. L\'arome du bunna emplit la piece — terreux, floral, profond. Je comprends pourquoi mamie aimait tant ce rituel.'
                                }]
                            });
                        } else {
                            Dialogue.start({
                                id: 'jebena_look',
                                nodes: [{
                                    speaker: 'emile',
                                    name: 'Emile',
                                    text: 'La jebena — un pot en terre cuite noire a la forme magnifique. Les petites tasses sans anse, les sini, attendent sur le plateau. Tout est pret pour la ceremonie... mais Tsega doit d\'abord m\'y inviter.'
                                }]
                            });
                        }
                    }
                });

                // Brazier
                addObject(objects, {
                    id: 'brazier',
                    x: '35%', y: '55%', w: '15%', h: '10%',
                    hint: 'Brasero et charbons ardents',
                    onClick() {
                        Dialogue.start({
                            id: 'brazier_look',
                            nodes: [{
                                speaker: 'narrator',
                                name: '',
                                text: 'Les charbons rougeoyants du brasero emettent une chaleur douce. L\'encens — de l\'itan, de l\'oliban — se consume lentement, emplissant la piece de volutes bleuatres au parfum sacre et resineux.'
                            }]
                        });
                    }
                });

                // Mortar
                addObject(objects, {
                    id: 'mortar',
                    x: '60%', y: '63%', w: '8%', h: '10%',
                    hint: 'Mortier et pilon (mukecha)',
                    onClick() {
                        Dialogue.start({
                            id: 'mortar_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Le mukecha et le zenezena — mortier et pilon en bois sombre. C\'est avec ca qu\'on moud les grains fraichement torrefies. Le rythme du pilonnage est presque une musique.'
                            }]
                        });
                    }
                });

                // Grass floor
                addObject(objects, {
                    id: 'qetema',
                    x: '20%', y: '80%', w: '40%', h: '15%',
                    hint: 'Herbe fraiche (qetema)',
                    onClick() {
                        Dialogue.start({
                            id: 'qetema_look',
                            nodes: [{
                                speaker: 'narrator',
                                name: '',
                                text: 'Le sol est recouvert d\'herbes fraiches — le qetema. Leur parfum vert et terreux se mele a celui de l\'encens. Les petites fleurs jaunes — adey abeba — parsement le tapis vegetal.'
                            }]
                        });
                    }
                });

                // Decorative band
                addObject(objects, {
                    id: 'decor_band',
                    x: '0%', y: '25%', w: '80%', h: '6%',
                    hint: 'Frise decorative aux motifs de croix',
                    onClick() {
                        Dialogue.start({
                            id: 'decor_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'Des motifs geometriques en ocre rouge et noir — les croix ethiopiennes. Chaque region a son propre design. Mamie a dessine des variantes dans son carnet...'
                            }]
                        });
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch2_entered_ceremony')) {
                    Engine.setFlag('ch2_entered_ceremony', true);
                    await Engine.wait(600);
                    await Dialogue.start({
                        id: 'enter_ceremony',
                        nodes: [
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'La piece est baignee dans la fumee bleuatre de l\'encens. Le sol couvert d\'herbes fraiches craque doucement sous les pas. L\'air est charge de sacre.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'Tsega est assise sur son tabouret bas, immobile, les mains posees sur les genoux. Ses yeux perçants suivent chaque mouvement d\'Emile.'
                            }
                        ]
                    });
                }
            }
        });

        // ============================
        // Scene: Kaffa Forest (flashback)
        // ============================
        Engine.registerScene('ch2_kaffa', {
            id: 'ch2_kaffa',
            chapter: 2,
            location: 'Foret de Kaffa — Souvenir',
            ambient: 'ethiopia-forest',

            render() {
                Scenes.renderEthiopiaForest();
                const objects = document.getElementById('scene-objects');

                // Return (wake from flashback)
                addObject(objects, {
                    id: 'return_flashback',
                    x: '0%', y: '0%', w: '5%', h: '100%',
                    hint: 'Revenir...',
                    onClick() {
                        Engine.loadScene('ch2_ceremony');
                    }
                });

                // Coffee plant 1 — cherry with symbol
                addObject(objects, {
                    id: 'cherry_1',
                    x: '30%', y: '53%', w: '8%', h: '8%',
                    hint: 'Cerises de cafe rouges',
                    glow: !Engine.hasFlag('ch2_cherry1_found'),
                    onClick() {
                        if (!Engine.hasFlag('ch2_cherry1_found')) {
                            Engine.setFlag('ch2_cherry1_found', true);
                            Audio.playPickup();
                            Dialogue.start({
                                id: 'cherry1_find',
                                nodes: [{
                                    speaker: 'narrator',
                                    name: '',
                                    text: 'Parmi les cerises, une porte un symbole etrange grave sur sa peau — une spirale, comme le dessin sur la page 7 du carnet de Beatrice. Premier symbole trouve.'
                                }]
                            });
                            checkAllCherries();
                        } else {
                            Dialogue.start({id: 'c1_done', nodes: [{speaker:'emile', name:'Emile', text:'Le premier symbole — une spirale. Deja trouve.'}]});
                        }
                    }
                });

                // Coffee plant 2 — cherry with symbol
                addObject(objects, {
                    id: 'cherry_2',
                    x: '55%', y: '50%', w: '8%', h: '8%',
                    hint: 'Cerises jaunes et rouges',
                    glow: !Engine.hasFlag('ch2_cherry2_found'),
                    onClick() {
                        if (!Engine.hasFlag('ch2_cherry2_found')) {
                            Engine.setFlag('ch2_cherry2_found', true);
                            Audio.playPickup();
                            Dialogue.start({
                                id: 'cherry2_find',
                                nodes: [{
                                    speaker: 'narrator',
                                    name: '',
                                    text: 'Une cerise jaune or porte un second symbole — trois lignes convergentes, comme les rayons d\'un soleil. Le meme dessin figure dans les marges du carnet. Deuxieme symbole.'
                                }]
                            });
                            checkAllCherries();
                        } else {
                            Dialogue.start({id: 'c2_done', nodes: [{speaker:'emile', name:'Emile', text:'Trois lignes convergentes — le soleil. Deja trouve.'}]});
                        }
                    }
                });

                // Coffee plant 3 — cherry with symbol
                addObject(objects, {
                    id: 'cherry_3',
                    x: '75%', y: '60%', w: '8%', h: '8%',
                    hint: 'Cerises sur un cafeier sauvage',
                    glow: !Engine.hasFlag('ch2_cherry3_found'),
                    onClick() {
                        if (!Engine.hasFlag('ch2_cherry3_found')) {
                            Engine.setFlag('ch2_cherry3_found', true);
                            Audio.playPickup();
                            Dialogue.start({
                                id: 'cherry3_find',
                                nodes: [{
                                    speaker: 'narrator',
                                    name: '',
                                    text: 'La derniere cerise marquee porte un symbole en forme de graine ouverte — deux moities symetriques. Dans le carnet, ce symbole accompagne les mots "Le Dernier Grain". Troisieme symbole.'
                                }]
                            });
                            checkAllCherries();
                        } else {
                            Dialogue.start({id: 'c3_done', nodes: [{speaker:'emile', name:'Emile', text:'La graine ouverte — Le Dernier Grain. Deja trouve.'}]});
                        }
                    }
                });

                // Colobus monkey
                addObject(objects, {
                    id: 'colobus',
                    x: '22%', y: '8%', w: '8%', h: '12%',
                    hint: 'Un colobe en noir et blanc',
                    onClick() {
                        Dialogue.start({
                            id: 'colobus_look',
                            nodes: [{
                                speaker: 'narrator',
                                name: '',
                                text: 'Un colobe guereza se balance dans les branches, son pelage noir et blanc eclatant contre le vert de la canopee. Il vous observe avec une curiosite presque humaine.'
                            }]
                        });
                    }
                });

                // Canopy
                addObject(objects, {
                    id: 'canopy',
                    x: '10%', y: '0%', w: '80%', h: '15%',
                    hint: 'Canopee dense',
                    onClick() {
                        Dialogue.start({
                            id: 'canopy_look',
                            nodes: [{
                                speaker: 'emile',
                                name: 'Emile',
                                text: 'La foret de Kaffa... Le berceau originel du cafe. C\'est ici que le berger Kaldi a vu ses chevres danser apres avoir mange les cerises rouges, il y a des siecles. Tout a commence ici.'
                            }]
                        });
                    }
                });
            },

            async onEnter() {
                if (!Engine.hasFlag('ch2_kaffa_entered')) {
                    Engine.setFlag('ch2_kaffa_entered', true);
                    await Engine.wait(800);
                    await Dialogue.start({
                        id: 'kaffa_vision',
                        nodes: [
                            {
                                speaker: 'beatrice',
                                name: 'Beatrice (souvenir)',
                                text: 'Tu la vois, Emile ? La foret de Kaffa. C\'est ici que tout a commence. Le cafe sauvage pousse a l\'ombre de la canopee, nourri par des siecles d\'humus.'
                            },
                            {
                                speaker: 'beatrice',
                                name: 'Beatrice (souvenir)',
                                text: 'Cherche les cerises marquees. Trois symboles, trois cles. Ils te guideront vers la suite du chemin.'
                            },
                            {
                                speaker: 'narrator',
                                name: '',
                                text: 'La lumiere filtre a travers la canopee en colonnes dorees. L\'air est humide, charge de terre mouillée et d\'une note subtile de cafe mur. Trouvez les trois cerises marquees.'
                            }
                        ]
                    });
                }
            }
        });
    }

    // ============================
    // Helper (same as Chapter 1)
    // ============================
    function addObject(container, config) {
        const obj = document.createElement('div');
        obj.className = 'scene-object' + (config.glow ? ' glow' : '');
        obj.style.cssText = `left:${config.x}; top:${config.y}; width:${config.w}; height:${config.h};`;

        obj.addEventListener('pointerenter', () => {
            const hint = document.getElementById('interaction-hint');
            document.getElementById('hint-text').textContent = config.hint || '';
            hint.classList.remove('hidden');
            hint.classList.add('visible');
        });

        obj.addEventListener('pointerleave', () => {
            document.getElementById('interaction-hint').classList.remove('visible');
        });

        obj.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            if (Dialogue.isActive()) return;
            Audio.playTap();
            document.getElementById('interaction-hint').classList.remove('visible');
            if (config.onClick) config.onClick();
        });

        container.appendChild(obj);
    }

    // ============================
    // Dawit dialogue (gatekeeper)
    // ============================
    function startDawitDialogue() {
        if (!Engine.hasFlag('ch2_met_dawit')) {
            Dialogue.start({
                id: 'dawit_first',
                nodes: [
                    {
                        speaker: 'narrator',
                        name: '',
                        text: 'La porte bleue s\'entrouvre. Un jeune homme apparait — vingt ans environ, regard mefiant mais curieux.'
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Min tifeligaleh? Qu\'est-ce que tu veux ? On n\'attend personne aujourd\'hui.'
                    },
                    {
                        speaker: 'emile',
                        name: 'Emile',
                        text: '...',
                        choices: [
                            {
                                text: 'Je cherche Tsega. Beatrice Tessier m\'envoie.',
                                next: 2,
                                setFlag: { key: 'ch2_mentioned_beatrice', value: true }
                            },
                            {
                                text: 'Desole de deranger. Je suis un torrefacteur du Canada.',
                                next: 4
                            },
                            {
                                text: 'Buna Dabo Naw.',
                                next: 6,
                                setFlag: { key: 'ch2_said_proverb', value: true }
                            }
                        ]
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Beatrice ? Tu... tu connais Beatrice ?',
                        onShow() { Engine.setFlag('ch2_met_dawit', true); }
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Attends ici. Je vais parler a ma grand-mere.',
                        next: 8
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Un torrefacteur ? On en a assez vu passer, des Occidentaux qui veulent "decouvrir le cafe authentique".',
                        onShow() { Engine.setFlag('ch2_met_dawit', true); }
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Hmm. Mais qu\'est-ce que tu sais vraiment du cafe ? Attends ici.',
                        next: 8
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: '"Le cafe est notre pain." Tu parles bien... Mais les mots ne suffisent pas. Il faudra le prouver.',
                        onShow() { Engine.setFlag('ch2_met_dawit', true); }
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Attends ici.',
                        next: 8
                    },
                    {
                        speaker: 'narrator',
                        name: '',
                        text: 'Dawit disparait derriere la porte. De longues minutes passent. Puis la porte se rouvre.'
                    },
                    {
                        speaker: 'emile',
                        name: 'Dawit',
                        text: 'Ma grand-mere accepte de te recevoir. Mais sache ceci : elle ne parlera pas avant la ceremonie du bunna. Et tu devras y participer. Entre.',
                        onShow() {
                            Engine.setFlag('ch2_tsega_invited', true);
                        }
                    }
                ]
            });
        } else if (!Engine.hasFlag('ch2_tsega_invited')) {
            Dialogue.start({
                id: 'dawit_wait',
                nodes: [{
                    speaker: 'emile',
                    name: 'Dawit',
                    text: 'Je t\'ai dit d\'attendre. Ma grand-mere reflechit.'
                }]
            });
        }
    }

    // ============================
    // Tsega dialogue (trust puzzle)
    // ============================
    function startTsegaDialogue() {
        if (!Engine.hasFlag('ch2_ceremony_done') && !Engine.hasFlag('ch2_ceremony_ready')) {
            // First encounter — trust through dialogue
            Dialogue.start({
                id: 'tsega_first',
                nodes: [
                    {
                        speaker: 'narrator',
                        name: '',
                        text: 'Tsega leve les yeux. Son regard est perçant, penetrant — comme si elle lisait dans les ames aussi facilement que dans les pages d\'un livre.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega (en amharique, Dawit traduit)',
                        text: 'Alors c\'est toi, le petit-fils de Beatrice. Elle m\'avait prevenue que tu viendrais un jour. Mais prevenir n\'est pas prouver.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Avant que je te dise quoi que ce soit, tu dois montrer que tu comprends. Pas le cafe — ca, n\'importe quel etranger peut l\'apprendre. Le respect.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Dis-moi : que sais-tu de la ceremonie du bunna ?',
                        choices: [
                            {
                                text: 'C\'est un rituel sacre en trois rondes — Abol, Tona, Baraka. Chaque ronde est une benediction.',
                                next: 5,
                                setFlag: { key: 'ch2_answer1_good', value: true }
                            },
                            {
                                text: 'Je sais que c\'est une tradition importante en Ethiopie.',
                                next: 6
                            },
                            {
                                text: 'Mamie m\'a tout raconte. Les herbes fraiches, l\'encens, les trois services.',
                                next: 7,
                                setFlag: { key: 'ch2_answer1_good', value: true }
                            }
                        ]
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Bien. Tu as ecoute ta grand-mere. Abol, Tona, Baraka — les trois rondes, de la plus forte a la plus douce. C\'est plus qu\'un cafe. C\'est une priere.',
                        next: 8
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Hmm. "Important." Ce mot ne suffit pas. Le bunna n\'est pas "important" — il est sacre. Il est le lien entre les vivants et les ancetres.',
                        next: 8
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Beatrice t\'a bien enseigne. Les herbes — le qetema — purifient l\'espace. L\'itan appelle les esprits bienveillants. Bien.',
                        next: 8
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Une derniere question. Pourquoi es-tu ici ? Pas pour le cafe. Pour quoi ?',
                        choices: [
                            {
                                text: 'Pour comprendre le voyage de ma grand-mere. Et peut-etre... pour la retrouver.',
                                next: 9,
                                setFlag: { key: 'ch2_answer2_good', value: true }
                            },
                            {
                                text: 'Pour trouver le Dernier Grain.',
                                next: 10
                            },
                            {
                                text: 'Parce que le carnet de mamie m\'a conduit ici. Je fais confiance a son chemin.',
                                next: 11,
                                setFlag: { key: 'ch2_answer2_good', value: true }
                            }
                        ]
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'La retrouver... Oui. C\'est la bonne raison. Le cafe n\'est qu\'un pretexte — c\'est toujours l\'amour qui nous fait voyager.',
                        next: 12
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Le Dernier Grain ? Ce n\'est pas une quete, enfant. C\'est une responsabilite. Mais soit — tu comprendras en chemin.',
                        next: 12
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'La confiance... Oui. Beatrice disait toujours que la confiance est le premier ingredient d\'un bon cafe. Tu lui ressembles.',
                        next: 12
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Tres bien. Tu participeras a la ceremonie. Et si tes mains sont aussi sages que tes mots... je te dirai ce que je sais.',
                        onShow() {
                            Engine.setFlag('ch2_ceremony_ready', true);
                        }
                    },
                    {
                        speaker: 'narrator',
                        name: '',
                        text: 'Tsega designe la jebena et les outils de la ceremonie. C\'est une invitation silencieuse. Le rituel du bunna peut commencer.'
                    }
                ]
            });
        } else if (Engine.hasFlag('ch2_ceremony_done') && !Engine.hasFlag('ch2_kaffa_complete')) {
            Dialogue.start({
                id: 'tsega_after_ceremony',
                nodes: [
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'La ceremonie est accomplie. Tu as les mains d\'un vrai artisan du cafe. Beatrice serait fiere.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Maintenant, ecoute. Ta grand-mere est venue ici il y a des annees pour etudier le Coffea arabica sauvage dans les forets de Kaffa. Elle a trouve quelque chose... d\'extraordinaire.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Ferme les yeux. Laisse le cafe te parler. Je vais te montrer ce que Beatrice a vu dans la foret.',
                        onShow() {
                            Engine.setFlag('ch2_flashback_ready', true);
                        }
                    }
                ],
                onEnd() {
                    // Launch Kaffa flashback
                    launchKaffaFlashback();
                }
            });
        } else if (Engine.hasFlag('ch2_kaffa_complete')) {
            // After everything — give final items
            if (!Engine.hasFlag('ch2_complete')) {
                Dialogue.start({
                    id: 'tsega_finale',
                    nodes: [
                        {
                            speaker: 'tsega',
                            name: 'Tsega',
                            text: 'Tu as vu la foret. Tu as trouve les symboles. Maintenant tu sais ce que Beatrice protege — l\'origine meme du cafe.'
                        },
                        {
                            speaker: 'tsega',
                            name: 'Tsega',
                            text: 'Prends ceci.',
                            onShow() {
                                Inventory.add('sini_cup');
                                Inventory.add('lettre_tsega');
                                Inventory.add('photo_kaffa');
                                Inventory.add('kaffa_cherry');
                                Audio.playPickup();
                            }
                        },
                        {
                            speaker: 'tsega',
                            name: 'Tsega',
                            text: 'Le sini est un souvenir. La lettre est pour Halide Hanim, a Istanbul — elle lit l\'avenir dans le marc de cafe. Et la photo... Beatrice voulait que tu la voies.'
                        },
                        {
                            speaker: 'emile',
                            name: 'Emile',
                            text: 'Istanbul... C\'est la prochaine etape du carnet. Le marc de cafe turc...'
                        },
                        {
                            speaker: 'tsega',
                            name: 'Tsega',
                            text: 'Buna Dabo Naw, Emile. Le cafe est notre pain. Partage-le, et il te nourrira toujours. Bon voyage.',
                            onShow() {
                                Notebook.addJournalPage({
                                    left: `
                                        <h3>Chapitre 2 — Addis-Abeba</h3>
                                        <p class="note-hand">La ceremonie du bunna avec Tsega. Trois rondes — Abol, Tona, Baraka. Plus qu'un cafe, une priere.</p>
                                        <div class="note-sketch">[ Aquarelle : La jebena sur les charbons ]</div>
                                        <p class="note-hand">Dans la foret de Kaffa, trois symboles sur les cerises sauvages — spirale, soleil, graine ouverte.</p>
                                    `,
                                    right: `
                                        <h3 style="font-family:var(--font-hand); color:#8b6914;">Notes de Beatrice</h3>
                                        <p class="note-hand">"Kaffa est le sanctuaire. L'Arabica sauvage y pousse depuis des millenaires, a l'abri des hommes."</p>
                                        <p class="note-hand" style="margin-top:16px;">"Prochaine etape : Istanbul. Le kahvehane secret du Grand Bazar. Halide lit le marc comme d'autres lisent les etoiles."</p>
                                        <p class="note-hand" style="margin-top:16px; opacity:0.6;">"Kahve-i Kadim — Le cafe ancien."</p>
                                    `
                                });

                                Notebook.addRecipe({
                                    name: 'Bunna (Cafe ethiopien ceremoniel)',
                                    origin: 'Maison de Tsega — Addis-Abeba, Ethiopie'
                                });

                                Notebook.addClue({
                                    text: '"Trouve Halide Hanim dans le kahvehane cache du Grand Bazar. Derriere un etal de tapis, une main de Fatma en cuivre marque la porte."',
                                    source: 'Lettre de Tsega pour Istanbul'
                                });
                            }
                        },
                        {
                            speaker: 'narrator',
                            name: '',
                            text: 'Fin du Chapitre 2. Le voyage continue vers l\'ouest...'
                        },
                        {
                            speaker: 'narrator',
                            name: '',
                            text: 'A suivre — Chapitre 3 : Istanbul, Turquie. "Kahve-i Kadim".'
                        }
                    ],
                    onEnd() {
                        Engine.setFlag('ch2_complete', true);
                        Engine.state.chapter = 3;
                        Engine.save();
                    }
                });
            } else {
                Dialogue.start({
                    id: 'tsega_farewell',
                    nodes: [{
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Va, enfant. Istanbul t\'attend. Et souviens-toi — Buna Dabo Naw.'
                    }]
                });
            }
        }
    }

    // ============================
    // Coffee Ceremony Puzzle
    // ============================
    function startCeremonyPuzzle() {
        Dialogue.start({
            id: 'ceremony_intro',
            nodes: [{
                speaker: 'narrator',
                name: '',
                text: 'La ceremonie du bunna commence. Chaque etape doit etre accomplie dans le bon ordre et avec le bon geste. Tsega observe en silence.'
            }],
            onEnd() {
                Puzzles.show(createCeremonyPuzzle());
            }
        });
    }

    function createCeremonyPuzzle() {
        const correctOrder = [
            { id: 'wash', icon: '\uD83D\uDCA7', text: 'Laver les grains verts a l\'eau claire', desc: 'Purifier les grains avant la torrefaction' },
            { id: 'roast', icon: '\uD83D\uDD25', text: 'Torrefier les grains sur le brasero', desc: 'Remuer sans cesse jusqu\'a ce qu\'ils soient brun fonce' },
            { id: 'waft', icon: '\uD83D\uDCA8', text: 'Faire circuler l\'arome dans la piece', desc: 'Passer la poele sous le nez de chaque invite' },
            { id: 'grind', icon: '\u2699\uFE0F', text: 'Moudre au mortier (mukecha)', desc: 'Piler rythmiquement jusqu\'a obtenir une poudre fine' },
            { id: 'brew', icon: '\u2615', text: 'Infuser dans la jebena', desc: 'Verser l\'eau chaude, porter a ebullition trois fois' },
            { id: 'serve', icon: '\uD83C\uDF75', text: 'Servir les trois rondes', desc: 'Abol (forte), Tona (moyenne), Baraka (legere)' }
        ];

        let currentStep = 0;
        // Shuffle for display
        let shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

        return {
            title: 'La Ceremonie du Bunna',
            render(container) {
                const body = document.createElement('div');
                body.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:16px; width:100%; max-width:360px;';

                const desc = document.createElement('p');
                desc.style.cssText = 'font-family:var(--font-serif); font-size:0.82rem; color:var(--brass); text-align:center; line-height:1.5;';
                desc.textContent = 'Accomplissez les etapes de la ceremonie dans le bon ordre. Touchez l\'etape suivante.';
                body.appendChild(desc);

                // Progress
                const progress = document.createElement('div');
                progress.style.cssText = 'font-family:var(--font-serif); font-size:0.75rem; color:var(--cream); opacity:0.6;';
                progress.textContent = `Etape ${currentStep + 1} sur ${correctOrder.length}`;
                body.appendChild(progress);

                // Steps
                const stepsContainer = document.createElement('div');
                stepsContainer.className = 'ceremony-steps';

                function renderSteps() {
                    stepsContainer.innerHTML = '';
                    progress.textContent = `Etape ${currentStep + 1} sur ${correctOrder.length}`;

                    shuffled.forEach((step, idx) => {
                        const completedIdx = correctOrder.findIndex(s => s.id === step.id);
                        const isCompleted = completedIdx < currentStep;
                        const isNext = step.id === correctOrder[currentStep]?.id;

                        const el = document.createElement('div');
                        el.className = 'ceremony-step' + (isCompleted ? ' correct' : '');
                        el.innerHTML = `
                            <div class="step-num">${isCompleted ? '\u2713' : (completedIdx + 1)}</div>
                            <span class="step-icon">${step.icon}</span>
                            <div class="step-text">
                                <div style="font-size:0.82rem;">${step.text}</div>
                                <div style="font-size:0.68rem; color:var(--brass); opacity:0.6; margin-top:2px;">${step.desc}</div>
                            </div>
                        `;

                        if (!isCompleted) {
                            el.addEventListener('pointerup', () => {
                                if (isNext) {
                                    el.classList.add('correct');
                                    currentStep++;
                                    if (currentStep >= correctOrder.length) {
                                        // Ceremony complete!
                                        ceremonyComplete(container);
                                    } else {
                                        renderSteps();
                                    }
                                } else {
                                    el.classList.add('wrong');
                                    setTimeout(() => el.classList.remove('wrong'), 500);
                                }
                            });
                        }

                        stepsContainer.appendChild(el);
                    });
                }

                renderSteps();
                body.appendChild(stepsContainer);
                container.appendChild(body);
            }
        };
    }

    function ceremonyComplete(container) {
        Engine.setFlag('ch2_ceremony_done', true);
        Audio.playSuccess();

        container.innerHTML = '';
        const success = document.createElement('div');
        success.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; padding:40px; text-align:center;';
        success.innerHTML = `
            <div style="font-size:3rem;">\u2615</div>
            <div style="font-family:var(--font-hand); font-size:1.2rem; color:var(--brass);">La ceremonie est accomplie</div>
            <div style="font-family:var(--font-serif); font-size:0.85rem; color:var(--cream); line-height:1.6; max-width:300px;">
                Abol, Tona, Baraka — les trois rondes ont ete servies avec soin. L'arome du bunna emplit la piece comme une benediction.
                <br><br>
                Tsega hoche la tete. Pour la premiere fois, un sourire eclaire son visage ride.
            </div>
        `;
        container.appendChild(success);

        Inventory.add('encens_itan');

        setTimeout(() => {
            Puzzles.close();
            Dialogue.start({
                id: 'ceremony_aftermath',
                nodes: [
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Ishi. C\'est bien. Tes mains savent ce que ton coeur comprend deja. Beatrice t\'a bien prepare.'
                    },
                    {
                        speaker: 'emile',
                        name: 'Emile',
                        text: 'Merci, Tsega. C\'etait... C\'est la plus belle tasse de cafe que j\'ai jamais bue.'
                    },
                    {
                        speaker: 'tsega',
                        name: 'Tsega',
                        text: 'Ce n\'etait pas une tasse de cafe. C\'etait une conversation avec tes ancetres. Maintenant, je peux te parler de Beatrice et de la foret.'
                    }
                ]
            });
        }, 3000);
    }

    // ============================
    // Kaffa Forest Flashback
    // ============================
    async function launchKaffaFlashback() {
        await Engine.playCutscene({
            frames: [
                {
                    visual: '<div style="background:linear-gradient(180deg,#1a3a1a,#0a1a08); width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px;"><div style="font-size:3rem;">\uD83C\uDF3F</div><div style="font-family:Georgia; font-size:0.8rem; color:#7a8b6f;">Foret de Kaffa, Ethiopie</div></div>',
                    text: 'Les yeux se ferment. L\'arome du bunna de Tsega devient le parfum de la terre mouillée de Kaffa. Un souvenir qui n\'est pas le votre...'
                },
                {
                    visual: '<div style="background:#0a1a08; width:100%; height:100%; display:flex; align-items:center; justify-content:center;"><div style="font-family:\'Segoe Script\',cursive; font-size:1.2rem; color:#5a8a3a; text-align:center;">Le Berceau</div></div>',
                    text: 'La vision de Beatrice. La foret primordiale ou le cafe sauvage pousse depuis des millenaires.'
                }
            ]
        });
        await Engine.loadScene('ch2_kaffa');
    }

    // ============================
    // Cherry Collection Check
    // ============================
    function checkAllCherries() {
        if (Engine.hasFlag('ch2_cherry1_found') &&
            Engine.hasFlag('ch2_cherry2_found') &&
            Engine.hasFlag('ch2_cherry3_found')) {
            Engine.setFlag('ch2_kaffa_complete', true);
            Audio.playSuccess();

            setTimeout(() => {
                Dialogue.start({
                    id: 'all_cherries',
                    nodes: [
                        {
                            speaker: 'beatrice',
                            name: 'Beatrice (souvenir)',
                            text: 'Tu les as tous trouves. Spirale, soleil, graine ouverte. Les trois symboles de la lignee ancestrale du cafe. Souviens-t\'en, Emile.'
                        },
                        {
                            speaker: 'narrator',
                            name: '',
                            text: 'La vision se dissout lentement. La foret de Kaffa s\'efface, remplacee par la chaleur de la piece de Tsega et l\'arome de l\'encens.',
                            onShow() {
                                Notebook.addClue({
                                    text: 'Trois symboles dans la foret de Kaffa : spirale (cycle de la vie), soleil (lumiere de la connaissance), graine ouverte (le Dernier Grain). Ils forment une cle.',
                                    source: 'Vision dans la foret de Kaffa'
                                });
                            }
                        }
                    ],
                    onEnd() {
                        Engine.loadScene('ch2_ceremony');
                    }
                });
            }, 1000);
        }
    }

    return { register };
})();
