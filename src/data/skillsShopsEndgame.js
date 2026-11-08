// Guia Completo de Habilidades (Skills 99), Mercadores (Morte & Garou da Lua) e Atividades Endgame 1.0

export const SKILLS_DB = [
  {
    id: 'attack',
    name: 'Ataque (Corpo a Corpo)',
    wikiName: 'Attack',
    category: 'Combate',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Attack_icon.png',
    summary: 'Aumenta o dano corpo a corpo, reduz o consumo de Vigor (Stamina) ao atacar/bloquear e desbloqueia combos de armas.',
    howToTrain: 'Cause dano e derrote inimigos usando Espadas, Adagas, Maças, Machados de Guerra, Lanças ou Malhos.',
    setBonuses: [
      { pieces: '1/3 Peças Corpo a Corpo', bonus: 'Bloqueios no tempo certo (Parry) têm chance de refletir dano de volta ao atacante.' },
      { pieces: '2/3 Peças Corpo a Corpo', bonus: 'Aparar (Parry) um ataque atordoa brevemente os inimigos próximos.' },
      { pieces: '3/3 Peças Corpo a Corpo', bonus: 'Reduz o consumo de Vigor ao atacar, além de conceder +25% de Defesa contra ataques À Distância e -10% de Defesa Mágica.' }
    ],
    milestones: [
      { lvl: 10, name: 'Maestria em Armas de 1 Mão e 2 Mãos', desc: 'Desbloqueia ataques especiais aprimorados e reduz custo de vigor em combos.' },
      { lvl: 25, name: 'Bloqueio Firme', desc: 'Reduz o vigor consumido ao bloquear ataques pesados com escudo.' },
      { lvl: 50, name: 'Veterano de Ashenfall', desc: 'Aumenta passivamente a precisão e chance de acerto crítico corpo a corpo.' },
      { lvl: 99, name: 'Capa da Maestria de Ataque', desc: 'Desbloqueia a Capa da Maestria de Ataque na Forja Mística.' }
    ],
    xpBoosts: [
      'Comida: Bife de Dragão Assado (Conhecimento de Ataque: +XP por 300s)',
      'Comida: Ensopado da Terra e Mar / Surf and Turf (Conhecimento Maior de Ataque: +XP por 600s)',
      'Poção: Poção de Foco em Ataque (+XP de Ataque por 300s)',
      'Amuleto: Faixa de Treino Pesada / Weighted Training Band (+10% XP de Ataque — vestígio comprado na Morte por 350 Fragmentos de Alma)'
    ]
  },
  {
    id: 'ranged',
    name: 'À Distância (Arquearia)',
    wikiName: 'Ranged',
    category: 'Combate',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Ranged_icon.png',
    summary: 'Domínio de Arcos Curtos, Arcos Longos e Bestas. Aumenta precisão, velocidade de tensão e recuperação de munição.',
    howToTrain: 'Atire em inimigos com Arcos Curtos, Arcos Longos ou Bestas (Crossbows). Acertos em pontos fracos (cabeça) dão mais dano e XP.',
    setBonuses: [
      { pieces: '1/3 Peças de Arqueiro', bonus: 'Esquivar de um ataque no último segundo ativa Evasão Perfeita, restaurando Vigor.' },
      { pieces: '2/3 Peças de Arqueiro', bonus: 'Disparar com o arco totalmente tensionado no momento exato causa dano extra.' },
      { pieces: '3/3 Peças de Arqueiro', bonus: 'Seus disparos têm chance de envenenar o alvo (+25% Defesa Mágica, -10% Defesa Corpo a Corpo).' }
    ],
    milestones: [
      { lvl: 15, name: 'Tensão Rápida', desc: 'Reduz o tempo necessário para puxar totalmente a corda do arco.' },
      { lvl: 30, name: 'Economia de Flechas', desc: 'Aumenta a chance de recuperar flechas e virotes intactos após o combate.' },
      { lvl: 50, name: 'Olho de Falcão', desc: 'Aumenta o multiplicador de dano crítico em disparos à distância.' },
      { lvl: 99, name: 'Capa da Maestria À Distância', desc: 'Desbloqueia a Capa da Maestria À Distância na Forja Mística.' }
    ],
    xpBoosts: [
      'Comida: Pato Assado (Conhecimento À Distância: +XP por 300s)',
      'Comida: Caça com Frutas Vermelhas / Berry Rich Game (Conhecimento Maior À Distância: +XP por 600s)',
      'Poção: Poção de Foco À Distância (+XP por 300s)',
      'Amuleto: Ponta de Flecha de Origem Antiga / Arrowhead of Ancient Origin (+10% XP À Distância — vestígio na Morte por 350 Fragmentos de Alma)'
    ]
  },
  {
    id: 'magic',
    name: 'Magia',
    wikiName: 'Magic',
    category: 'Combate',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Magic_icon.png',
    summary: 'Canalização de Anima através de Cajados Elementais (Ar, Água, Terra, Fogo, Astral e Natureza) e feitiços utilitários.',
    howToTrain: 'Cause dano com Cajados Mágicos ou lance feitiços do Roda de Feitiços (Spellbook) usando Runas.',
    setBonuses: [
      { pieces: '1/3 Peças de Mago', bonus: 'Concede chance de não consumir Runas ao atacar com cajados ou lançar feitiços.' },
      { pieces: '2/3 Peças de Mago', bonus: 'Reduz o tempo de recarga (Cooldown) de todos os feitiços.' },
      { pieces: '3/3 Peças de Mago', bonus: 'Ataques mágicos criam Orbes de Poder de Surto (Surge Power) que aumentam o dano dos próximos feitiços (+25% Defesa Corpo a Corpo, -10% Defesa À Distância).' }
    ],
    milestones: [
      { lvl: 12, name: 'Canalização Elemental', desc: 'Permite alternar o elemento do cajado usando Runas Elementais.' },
      { lvl: 30, name: 'Mente Arcana', desc: 'Reduz o tempo de recarga de feitiços de combate e utilidade.' },
      { lvl: 50, name: 'Ressonância Rúnica', desc: 'Aumenta a chance de economizar runas em ataques mágicos.' },
      { lvl: 99, name: 'Capa da Maestria em Magia', desc: 'Desbloqueia a Capa da Maestria em Magia na Forja Mística.' }
    ],
    xpBoosts: [
      'Comida: Torta de Frutas / Fruit Pie (Conhecimento Mágico: +XP por 300s)',
      'Comida: Pudim de Pêssego / Peach Cobbler (Conhecimento Maior de Magia: +XP por 600s)',
      'Poção: Poção de Foco Mágico (+XP por 300s)',
      'Amuleto: Orbe Vibrante Suave / Softly Vibrating Orb (+10% XP de Magia — vestígio na Morte por 350 Fragmentos de Alma)'
    ]
  },
  {
    id: 'mining',
    name: 'Mineração',
    wikiName: 'Mining',
    category: 'Coleta',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Mining_icon.png',
    summary: 'Extração de minérios, gemas, argila e essência rúnica. Desbloqueia o feitiço Explosão de Rocha (Rocksplosion).',
    howToTrain: 'Quebre rochas e veios de minério com Picaretas ou com o feitiço Explosão de Rocha (15 Runas da Terra + 5 Fogo).',
    setBonuses: [
      { pieces: 'Progressão de Picaretas', bonus: 'Nv.1 Osso (Poder 1) → Nv.2 Bronze (Poder 2: Cobre/Estanho/Argila) → Nv.3 Ferro (Poder 3: Ferro/Prata/Ouro/Carvão) → Nv.4 Aço (Poder 4: Mithril/Granito) → Nv.5 Mithril (Poder 5: Adamantita/Calcário) → Nv.6 Adamantita (Poder 6: Runita/Gipso) → Nv.7 Rúnica (Poder 7: Luminita/Obsidiana).' }
    ],
    milestones: [
      { lvl: 8, name: 'Feitiço: Explosão de Rocha (Rocksplosion)', desc: 'Detona instantaneamente um veio de minério inteiro (requer Poder de Picareta suficiente para aquele minério).' },
      { lvl: 16, name: 'Prospector de Gemas (Gem Prospector)', desc: 'CRÍTICO: Permite encontrar Opala, Jade, Topázio Vermelho, Safira, Diamante e Pedra de Dragão ao minerar veios comuns!' },
      { lvl: 40, name: 'Golpe Preciso', desc: 'Aumenta o dano causado a nós de minério e reduz o vigor gasto por picaretada.' },
      { lvl: 99, name: 'Capa da Maestria em Mineração', desc: 'Desbloqueia a Capa da Maestria em Mineração.' }
    ],
    xpBoosts: [
      'Comida: Batata Assada (Conhecimento de Mineração: +XP por 300s)',
      'Comida: Ensopado de Minhoca / Worm Crunch Stew (Conhecimento Maior de Mineração: +XP por 600s)',
      'Poção: Poção de Foco em Mineração (+XP por 300s)'
    ]
  },
  {
    id: 'woodcutting',
    name: 'Corte de Lenha',
    wikiName: 'Woodcutting',
    category: 'Coleta',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Woodcutting_icon.png',
    summary: 'Derrubada de árvores e coleta de seiva, casca com anima e gravetos. Desbloqueia Machados Astrais.',
    howToTrain: 'Derrube árvores e corte os troncos caídos em toras usando Machados de Lenha ou feitiços de Machadinha.',
    setBonuses: [
      { pieces: 'Progressão de Machados', bonus: 'Nv.1 Pedra (Freixo) → Nv.2 Bronze (Carvalho) → Nv.3 Ferro (Salgueiro/Madeira Maculada) → Nv.4 Aço (Bordo) → Nv.5 Mithril (Teixo) → Nv.6 Adamantita/Rúnico (Árvore Mágica).' }
    ],
    milestones: [
      { lvl: 10, name: 'Feitiço: Machadinha (Axtral Projection)', desc: 'Arremessa um machado astral que corta várias árvores em linha reta.' },
      { lvl: 20, name: 'Feitiço: Estilhaçar Madeira (Splinter)', desc: 'Parte instantaneamente todos os troncos caídos próximos em toras prontas.' },
      { lvl: 28, name: 'Mestre Lenhador', desc: 'Reduz drasticamente o vigor consumido por golpe de machado.' },
      { lvl: 99, name: 'Capa da Maestria em Corte de Lenha', desc: 'Desbloqueia a Capa da Maestria em Corte de Lenha.' }
    ],
    xpBoosts: [
      'Comida: Cogumelo Recheado (Conhecimento de Corte de Lenha: +XP por 300s)',
      'Poção: Poção de Foco em Corte de Lenha (+XP por 300s)',
      'Amuleto: Casco Resistente ao Tempo / Hardy Weathered Shell (+10% XP de Coleta — vestígio na Morte por 350 Fragmentos de Alma)'
    ]
  },
  {
    id: 'artisan',
    name: 'Artesão (Artisan)',
    wikiName: 'Artisan',
    category: 'Produção',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Artisan_icon.png',
    summary: 'Criação de armas, armaduras, ferramentas, curtimento de couros, tecelagem e fundição de metais.',
    howToTrain: 'Crie equipamentos na Bigorna de Ferraria, Bancada de Criação, Forja Mística, Fornalha, Roca de Fiar ou Olaria.',
    setBonuses: [],
    milestones: [
      { lvl: 15, name: 'Feitiço: Reparar (Mend)', desc: 'Conserta seus equipamentos instantaneamente em campo usando Runas da Terra e da Lei.' },
      { lvl: 30, name: 'Durabilidade Aprimorada', desc: 'Itens criados por você recebem bônus de durabilidade máxima.' },
      { lvl: 50, name: 'Eficiência de Bancada', desc: 'Acelera o tempo de processamento em fornalhas e bancadas.' },
      { lvl: 99, name: 'Capa da Maestria de Artesão', desc: 'Desbloqueia a Capa da Maestria de Artesão.' }
    ],
    xpBoosts: [
      'Poção: Poção de Foco de Artesão (+XP por 300s)',
      'Dica de Farm: Fundir Barras em massa na Fornalha e processar Fios na Roca de Fiar dá XP passivo contínuo!'
    ]
  },
  {
    id: 'construction',
    name: 'Construção',
    wikiName: 'Construction',
    category: 'Produção',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Construction_icon.png',
    summary: 'Ergue fortalezas, bancadas de trabalho, cofres, armadilhas defensivas e totens contra cercos (Warbands).',
    howToTrain: 'Construa fundações, paredes, telhados, decorações e estações de trabalho usando o Tomo de Construção.',
    setBonuses: [],
    milestones: [
      { lvl: 8, name: 'Feitiço: Visão do Olho (Eye View)', desc: 'Permite construir com câmera aérea livre sem precisar subir em andaimes.' },
      { lvl: 20, name: 'Estruturas de Carvalho e Pedra', desc: 'Desbloqueia paredes mais resistentes contra ataques de bandos de guerra e dragões.' },
      { lvl: 32, name: 'Lodestone Pessoal (Marco de Teleporte)', desc: 'Permite construir sua própria Lodestone para teleporte direto à sua base (requer 1 Núcleo de Teleporte).' },
      { lvl: 99, name: 'Capa da Maestria em Construção', desc: 'Desbloqueia a Capa da Maestria em Construção.' }
    ],
    xpBoosts: [
      'Poção: Poção de Foco em Construção (+XP por 300s)'
    ]
  },
  {
    id: 'cooking',
    name: 'Culinária & Herblore',
    wikiName: 'Cooking',
    category: 'Produção',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Cooking_icon.png',
    summary: 'Preparo de refeições gourmet, infusões de chá e poções alquímicas que aumentam Vida, Vigor e resistências.',
    howToTrain: 'Asse carnes na Fogueira, prepare pratos na Panela (Cooking Pot) ou destile poções no Caldeirão de Poções (Brewing Cauldron).',
    setBonuses: [],
    milestones: [
      { lvl: 12, name: 'Panela de Culinária & Caldeirão', desc: 'Permite combinar múltiplos ingredientes para refeições que não queimam e concedem buffs duplos.' },
      { lvl: 24, name: 'Feitiço: Purificar Água / Fogo Interno', desc: 'Ferve água suja e cozinha carnes instantaneamente usando Runas de Fogo e Água.' },
      { lvl: 40, name: 'Chef Mestre', desc: 'Aumenta a duração dos efeitos positivos (Buffs) de comidas preparadas por você.' },
      { lvl: 99, name: 'Capa da Maestria em Culinária', desc: 'Desbloqueia a Capa da Maestria em Culinária.' }
    ],
    xpBoosts: [
      'Poção: Poção de Foco em Culinária (+XP por 300s)'
    ]
  },
  {
    id: 'runecrafting',
    name: 'Criação de Runas',
    wikiName: 'Runecrafting',
    category: 'Produção',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Runecrafting_icon.png',
    summary: 'Extração de Essência Rúnica de gêiseres de anima e criação de todas as 9 Runas nos Altares Rúnicos.',
    howToTrain: 'Extraia Essência Rúnica e converta-a em Runas em qualquer Altar Rúnico ou construa seu próprio Altar na base.',
    setBonuses: [],
    milestones: [
      { lvl: 1, name: 'Runas de Ar e Astral', desc: 'Disponíveis desde o nível 1 em qualquer Altar Rúnico.' },
      { lvl: 5, name: 'Runa da Terra (Nv. 5) & Fogo (Nv. 11)', desc: 'Desbloqueia Explosão de Rocha (Nv. 5 Terra + Nv. 11 Fogo).' },
      { lvl: 14, name: 'Runa de Água (Nv. 14) & Lei (Nv. 16)', desc: 'Runa da Lei permite usar os Marcos de Teleporte (Lodestones) pelo mapa!' },
      { lvl: 20, name: 'Runa da Natureza (Nv. 20), Cósmica (Nv. 27) & Alma (Nv. 35)', desc: 'Desbloqueia feitiços avançados de cura, encantamento e combate.' },
      { lvl: 99, name: 'Capa da Maestria em Criação de Runas', desc: 'Desbloqueia a Capa da Maestria em Criação de Runas.' }
    ],
    xpBoosts: [
      'Poção: Poção de Foco em Criação de Runas (+XP por 300s)'
    ]
  },
  {
    id: 'farming',
    name: 'Fazenda (Farming)',
    wikiName: 'Farming',
    category: 'Coleta',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Farming_icon.png',
    summary: 'Cultivo de sementes de vegetais, ervas alquímicas, linho, algodão e árvores em canteiros agrícolas na sua base.',
    howToTrain: 'Plante sementes em Canteiros (Crop Plots), regue, aplique Composto (Compost) e colha as plantações maduras.',
    setBonuses: [],
    milestones: [
      { lvl: 5, name: 'Canteiros Pequenos e Caixa de Composto', desc: 'Permite plantar Batata, Repolho, Cebola, Linho e Marrentill na base.' },
      { lvl: 20, name: 'Feitiço: Solo Fértil (Humidify / Cure Plant)', desc: 'Rega e fertiliza múltiplos canteiros de uma só vez usando Runas de Água e Natureza.' },
      { lvl: 35, name: 'Colheita Abundante', desc: 'Aumenta o rendimento de ervas raras (Snapdragon, Toadflax, Irit) e chance de devolver sementes.' },
      { lvl: 99, name: 'Capa da Maestria em Fazenda', desc: 'Desbloqueia a Capa da Maestria em Fazenda.' }
    ],
    xpBoosts: [
      'Dica: Usar Composto / Supercomposto antes de plantar aumenta tanto a velocidade de crescimento quanto o XP na colheita.'
    ]
  },
  {
    id: 'agility',
    name: 'Agilidade',
    wikiName: 'Agility',
    category: 'Utilidade',
    maxLevel: 99,
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Agility_icon.png',
    summary: 'Aumenta a regeneração de Vigor (Stamina), reduz custo de corrida/pulo e desbloqueia atalhos pelo mapa.',
    howToTrain: 'Complete Percursos de Agilidade (Agility Courses), use atalhos de escalada/salto, inspecione Tocas de Kebbit (Kebbit Burrows) e faça saltos com Vento Sob Seus Pés.',
    setBonuses: [],
    milestones: [
      { lvl: 10, name: 'Feitiço: Vento Sob Seus Pés (Wind Step)', desc: 'Concede super salto para atravessar penhascos e subir em ruínas.' },
      { lvl: 25, name: 'Fôlego de Corredor', desc: 'Reduz o consumo de Vigor ao correr (Sprint) pelo mundo aberto.' },
      { lvl: 40, name: 'Mestre dos Atalhos', desc: 'Reduz o dano de queda e aumenta a velocidade de regeneração de Vigor.' },
      { lvl: 99, name: 'Capa da Maestria em Agilidade', desc: 'Desbloqueia a Capa da Maestria em Agilidade.' }
    ],
    xpBoosts: [
      'Dica: Tocas de Kebbit (Kebbit Burrows) espalhadas pelo mapa dão grandes pacotes instantâneos de XP de Agilidade ao serem inspecionadas!'
    ]
  }
];

export const SHOPS_DB = [
  {
    id: 'death',
    name: 'Morte (Death / Grim Reaper)',
    wikiName: 'Death (Grim Reaper)',
    region: 'Pântano Sussurrante / Vale dos Espinhos',
    location: 'Templo Esquecido (Forgotten Temple — Norte do Pântano Sussurrante)',
    coords: [-1997, 2610],
    currency: 'Fragmento de Alma (Soul Fragment)',
    currencyWiki: 'Soul Fragment',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Death_%28Grim_Reaper%29.png',
    unlockQuest: 'Buscando a Salvação (Seeking Salvation)',
    howToFarmCurrency: 'Derrote Mortos-Vivos no Vale dos Espinhos e nas Areias Umbrais (Guerreiros Esqueléticos, Arqueiros Esqueléticos, Necromantes Esqueléticos, Zumbis e Reis da Praga) ou saqueie baús de tumbas para obter Fragmentos de Alma.',
    buys: [],
    sells: [
      {
        tier: 'Armaduras Nv. 5 (Vestígios de Cavaleiro Branco, Patrulheiro e Necromante)',
        items: [
          { name: 'Viseira Branca Corroída (Corroded White Visor)', wiki: 'Corroded White Visor', cost: 200, unlocks: 'Elmo de Cavaleiro Branco (White Full Helm — Corpo a Corpo Nv. 5)', craftWiki: 'White Full Helm' },
          { name: 'Espaldeira Branca Amassada (Dented White Pauldron)', wiki: 'Dented White Pauldron', cost: 400, unlocks: 'Peitoral de Cavaleiro Branco (White Platebody — Corpo a Corpo Nv. 5)', craftWiki: 'White Platebody' },
          { name: 'Coxote Branco Esmagado (Crushed White Cuisse)', wiki: 'Crushed White Cuisse', cost: 300, unlocks: 'Perneiras de Cavaleiro Branco (White Platelegs — Corpo a Corpo Nv. 5)', craftWiki: 'White Platelegs' },
          { name: 'Pena Simplesmente Esplêndida (Simply Splendid Feather)', wiki: 'Simply Splendid Feather', cost: 200, unlocks: 'Chapéu de Patrulheiro (Ranger Hat — À Distância Nv. 5)', craftWiki: 'Ranger Hat' },
          { name: 'Protetor Peitoral Levemente Áspero (Slightly Chaffing Chestguard)', wiki: 'Slightly Chaffing Chestguard', cost: 400, unlocks: 'Túnica de Patrulheiro (Ranger Tunic — À Distância Nv. 5)', craftWiki: 'Ranger Tunic' },
          { name: 'Calças Rasgadas com Bom Gosto (Tastefully Torn Tights)', wiki: 'Tastefully Torn Tights', cost: 300, unlocks: 'Calças de Patrulheiro (Ranger Tights — À Distância Nv. 5)', craftWiki: 'Ranger Tights' },
          { name: 'Coroa Portadora de Maldição (Curse Carrying Crown)', wiki: 'Curse Carrying Crown', cost: 200, unlocks: 'Coroa de Necromante (Necromancer\'s Crown — Magia Nv. 5)', craftWiki: "Necromancer's Crown" },
          { name: 'Restos de Túnica Apodrecida (Remnants of a Rotting Robe)', wiki: 'Remnants of a Rotting Robe', cost: 400, unlocks: 'Túnica Superior de Necromante (Necromancer\'s Robe Top — Magia Nv. 5)', craftWiki: "Necromancer's Robe Top" },
          { name: 'Fivela de Cinto Polida (Burnished Belt Buckle)', wiki: 'Burnished Belt Buckle', cost: 300, unlocks: 'Saia de Necromante (Necromancer\'s Robe Bottom — Magia Nv. 5)', craftWiki: "Necromancer's Robe Bottom" }
        ]
      },
      {
        tier: 'Amuletos de XP e Sobrevivência (Vestígios de Trinkets)',
        items: [
          { name: 'Sigilo de uma Fênix (Sigil of a Phoenix)', wiki: 'Sigil of a Phoenix', cost: 800, unlocks: 'Anel de Fênix (Phoenix Ring — Cura automática ao ficar com vida crítica!)', craftWiki: 'Phoenix Ring' },
          { name: 'Faixa de Treino Pesada (Weighted Training Band)', wiki: 'Weighted Training Band', cost: 350, unlocks: 'Amuleto de +10% XP de Ataque Corpo a Corpo' },
          { name: 'Ponta de Flecha de Origem Antiga (Arrowhead of Ancient Origin)', wiki: 'Arrowhead of Ancient Origin', cost: 350, unlocks: 'Amuleto de +10% XP À Distância' },
          { name: 'Orbe Vibrante Suave (Softly Vibrating Orb)', wiki: 'Softly Vibrating Orb', cost: 350, unlocks: 'Amuleto de +10% XP de Magia' },
          { name: 'Casco Resistente ao Tempo (Hardy Weathered Shell)', wiki: 'Hardy Weathered Shell', cost: 350, unlocks: 'Amuleto de +10% XP de Coleta (Mineração e Corte de Lenha)' }
        ]
      },
      {
        tier: 'Montarias, Cristal de Salve e Capas (9 Cores)',
        items: [
          { name: 'MONTARIA: Caçador de Musgo (MOUNT: Mossbreak Hunter)', wiki: 'MOUNT: Mossbreak Hunter', cost: 2000, unlocks: 'Desbloqueia a Montaria Terrorbird Caçador de Musgo!' },
          { name: 'MONTARIA: Raptor Pena de Carvalho (MOUNT: Oakfeather Raptor)', wiki: 'MOUNT: Oakfeather Raptor', cost: 2000, unlocks: 'Desbloqueia a Montaria Terrorbird Raptor Pena de Carvalho!' },
          { name: 'Cristal de Salve (Salve Crystal)', wiki: 'Salve Crystal', cost: 25, unlocks: 'Material para criar mais Amuletos de Salve (+Dano contra Mortos-Vivos)', craftWiki: 'Salve Amulet' },
          { name: 'Pano Roído por Traças (9 Cores — Moth Eaten Cloth)', wiki: 'Moth Eaten Cloth (Red)', cost: 150, unlocks: 'Cada pano de 150 fragmentos desbloqueia uma cor de Capa Clássica (Vermelha, Preta, Azul, Verde, Amarela, Laranja, Rosa, Roxa e Ciano)' }
        ]
      }
    ]
  },
  {
    id: 'domri',
    name: 'Domri — O Mercador (Botânica, Tecidos & Magia)',
    wikiName: 'Domri - The Merchant',
    region: 'Areias Umbrais',
    location: 'Acampamento do Oásis Alcarrid (Oeste de Areias Umbrais)',
    coords: [-2901, 1894],
    currency: 'Ficha Garou (Garou Chit)',
    currencyWiki: 'Garou Chit',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Garou_Chit.png',
    unlockQuest: 'Aumente a Reputação do Acampamento vendendo itens da categoria dele (Tier 1 a Tier 4).',
    howToFarmCurrency: 'Melhor lucro em Domri: Venda Artefato Garou (500 fichas), Pano do Infinito (180), Pedra de Dragão (140), Pano do Deserto (120), Diamante (120), Safira (80), Pano Acolchoado (48) ou Fio Fino/Pano Fino (32).',
    buys: [
      { cat: 'Melhores Vendas (Lucro Rápido)', list: 'Artefato Garou (500) • Pano do Infinito (180) • Pedra de Dragão (140) • Pano do Deserto (120) • Diamante (120) • Safira (80) • Topázio Vermelho (60) • Pano Acolchoado (48) • Fio Místico (40) • Jade (40) • Pano Fino / Fio Fino (32)' },
      { cat: 'Plantas & Ervas', list: 'Algodão Cadavérico (8) • Abóbora / Melancia / Irit / Erva do Pântano (6) • Trigo / Linho / Cebola / Kwuarm / Snapdragon / Toadflax (4) • Batata / Repolho / Marrentill / Harralander (2)' }
    ],
    sells: [
      {
        tier: 'Tier 1 a 3 (Água, Tecelagem Garou e Sementes/Ervas)',
        items: [
          { name: 'Trama Garou (Garou Weave)', wiki: 'Garou Weave', cost: 150, unlocks: 'Material essencial para armaduras de Areias Umbrais (Tier 1)' },
          { name: 'Monóxido de Di-hidrogênio / Água Pura (Dihydrogen Monoxide)', wiki: 'Dihydrogen Monoxide', cost: 25, unlocks: 'Hidratação instantânea no deserto (Tier 1)' },
          { name: 'Folhas de Chá (Tea Leaves)', wiki: 'Tea Leaves', cost: 20, unlocks: 'Ingrediente para chás de vigor e calor (Tier 1)' },
          { name: 'Linho, Cogumelo Amargo, Batata, Repolho, Harralander, Marrentill', wiki: 'Flax', cost: 12, unlocks: 'Materiais agrícolas básicos (Tier 2: 3 a 12 fichas)' },
          { name: 'Toadflax, Snapdragon, Trigo, Cebola, Alcatrão do Pântano (12) • Bulbo Chocante, Casca com Anima, Erva do Pântano (18)', wiki: 'Snapdragon', cost: 12, unlocks: 'Ingredientes de poções e culinária média (Tier 3)' }
        ]
      },
      {
        tier: 'Tier 4 (Vestígios de Armadura Lunar Mágica Nv. 6 & Montarias)',
        items: [
          { name: 'Véu Selênico (Selenic Veil)', wiki: 'Selenic Veil', cost: 2500, unlocks: 'Desbloqueia o Chapéu Lunar Garou (Lunar Garou Hat — Magia Nv. 6)', craftWiki: 'Lunar Garou Hat' },
          { name: 'Xale Lunar (Lunate Shawl)', wiki: 'Lunate Shawl', cost: 7500, unlocks: 'Desbloqueia a Túnica Lunar Garou (Lunar Garou Robes — Magia Nv. 6)', craftWiki: 'Lunar Garou Robes' },
          { name: 'Enrolamentos Lunulares (Lunular Wrappings)', wiki: 'Lunular Wrappings', cost: 5000, unlocks: 'Desbloqueia a Saia Lunar Garou (Lunar Garou Robe Legs — Magia Nv. 6)', craftWiki: 'Lunar Garou Robe Legs' },
          { name: 'Turbante Desbotado pelo Sol (Sun-Bleached Head Wrap)', wiki: 'Sun-Bleached Head Wrap', cost: 2500, unlocks: 'Desbloqueia o Capuz do Deserto (Desert Hood)', craftWiki: 'Desert Hood' },
          { name: 'MONTARIA: Sela de Juramento Zamorakiana (MOUNT: Zamorakian Pledgesaddle)', wiki: 'MOUNT: Zamorakian Pledgesaddle', cost: 9999, unlocks: 'Montaria de Prestígio Zamorakiana!' },
          { name: 'MONTARIA: Bico-da-Praga Infernal (MOUNT: Infernal Blightbeak)', wiki: 'MOUNT: Infernal Blightbeak', cost: 9999, unlocks: 'Montaria Terrorbird Infernal!' },
          { name: 'Seiva de Bordo (30) • Algodão Cadavérico (24) • Irit, Melancia, Abóbora (18)', wiki: 'Maple Sap', cost: 30, unlocks: 'Recursos avançados em estoque infinito no Tier 4' }
        ]
      }
    ]
  },
  {
    id: 'beartach',
    name: 'Beartach — O Mercador (Minérios, Metais & Corpo a Corpo)',
    wikiName: 'Beartach - The Merchant',
    region: 'Areias Umbrais',
    location: 'Acampamento do Clã Manafem (Sul de Areias Umbrais)',
    coords: [-2172, 1697],
    currency: 'Ficha Garou (Garou Chit)',
    currencyWiki: 'Garou Chit',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Garou_Chit.png',
    unlockQuest: 'Aumente a Reputação do Acampamento vendendo Madeiras, Pedras e Barras Metálicas (Tier 1 a Tier 4).',
    howToFarmCurrency: 'Melhor lucro em Beartach: Venda Artefato Garou (500 fichas), Barra de Adamantita (60), Barra de Mithril / Barra de Metal Negro (48), Barra de Aço (36), Barra de Ouro / Prata (24), Barra de Ferro (18) ou Pelota de Combustível (9).',
    buys: [
      { cat: 'Metais & Barras (Lucro Rápido)', list: 'Artefato Garou (500) • Barra de Adamantita (60) • Barra de Mithril (48) • Barra de Metal Negro (48) • Barra de Aço (36) • Barra de Prata / Ouro (24) • Barra de Ferro (18) • Barra de Bronze / Minério de Adamantita (12) • Minério de Mithril (10) • Carvão (8)' },
      { cat: 'Madeiras & Pedras', list: 'Pelota de Combustível (9) • Tora de Teixo / Tábua de Teixo (6) • Tora de Bordo / Gipso (5) • Tora de Salgueiro / Madeira Maculada / Calcário (4) • Carvão Vegetal / Granito (3)' }
    ],
    sells: [
      {
        tier: 'Tier 1 a 3 (Trama Garou, Minérios de Ferro/Prata/Ouro e Madeiras)',
        items: [
          { name: 'Trama Garou (Garou Weave)', wiki: 'Garou Weave', cost: 150, unlocks: 'Material essencial para armaduras de Areias Umbrais (Tier 1)' },
          { name: 'Pedra (3), Argila (6), Tora de Freixo (3), Tora de Carvalho (6), Minério de Estanho (12), Minério de Cobre (16)', wiki: 'Copper Ore', cost: 16, unlocks: 'Minérios e toras básicas (Tier 2)' },
          { name: 'Minério de Ferro (18), Minério de Prata (18), Minério de Ouro (18), Granito (9), Madeira Maculada (9), Arenito (6)', wiki: 'Iron Ore', cost: 18, unlocks: 'Excelente para comprar Ferro, Prata e Ouro em massa! (Tier 3)' }
        ]
      },
      {
        tier: 'Tier 4 (Vestígios de Armadura de Obsidiana Nv. 6 & Mithril/Carvão)',
        items: [
          { name: 'Constructo de Obsidiana Lascado (Chipped Obsidian Construct)', wiki: 'Chipped Obsidian Construct', cost: 2500, unlocks: 'Desbloqueia o Elmo de Obsidiana (Corpo a Corpo Nv. 6 — Reduz dano na Caverna de Luta!)', craftWiki: 'Obsidian Helmet' },
          { name: 'Constructo de Obsidiana Fraturado (Fractured Obsidian Construct)', wiki: 'Fractured Obsidian Construct', cost: 7500, unlocks: 'Desbloqueia o Peitoral de Obsidiana (Obsidian Chest — Corpo a Corpo Nv. 6)', craftWiki: 'Obsidian Chest' },
          { name: 'Constructo de Obsidiana Esmagado (Crushed Obsidian Construct)', wiki: 'Crushed Obsidian Construct', cost: 5000, unlocks: 'Desbloqueia as Perneiras de Obsidiana (Obsidian Legs — Corpo a Corpo Nv. 6)', craftWiki: 'Obsidian Legs' },
          { name: 'Colete Desbotado pelo Sol (Sun-Bleached Vest)', wiki: 'Sun-Bleached Vest', cost: 7500, unlocks: 'Desbloqueia a Túnica do Deserto (Desert Robes)', craftWiki: 'Desert Robes' },
          { name: 'Minério de Mithril (30) • Carvão Mineral (24) • Tora de Bordo (15) • Tora de Salgueiro (12) • Calcário (12)', wiki: 'Mithril Ore', cost: 30, unlocks: 'Compra direta de Mithril e Carvão sem precisar minerar! (Tier 4)' }
        ]
      }
    ]
  },
  {
    id: 'iasadair',
    name: 'Iasadair — O Mercador (Couros, Kalphitas & Arquearia)',
    wikiName: 'Iasadair - The Merchant',
    region: 'Areias Umbrais',
    location: 'Acampamento do Clã Uzzer (Nordeste de Areias Umbrais)',
    coords: [-2155, 2903],
    currency: 'Ficha Garou (Garou Chit)',
    currencyWiki: 'Garou Chit',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Garou_Chit.png',
    unlockQuest: 'Aumente a Reputação do Acampamento vendendo Couros, Ossos, Quitina e Partes de Monstros (Tier 1 a Tier 4).',
    howToFarmCurrency: 'Melhor lucro em Iasadair: Venda Artefato Garou (500 fichas), Couro Amaldiçoado (40), Couro de Lobo Terrível / Couro Dracônico / Carapaça de Kalphita (32), Couro Dura (24), Quitina (16) ou Ossos de Dragão (12).',
    buys: [
      { cat: 'Couros, Quitina & Ossos (Lucro Rápido)', list: 'Artefato Garou (500) • Couro Amaldiçoado (40) • Couro Dracônico (32) • Couro de Lobo Terrível (32) • Carapaça de Kalphita (32) • Couro Duro (24) • Quitina / Couro Macio / Pelagem de Lobo Terrível / Pele Ácida (16) • Osso de Dragão / Pelagem Amaldiçoada (12)' },
      { cat: 'Carnes Cruas & Ovos', list: 'Bife de Dragão Cru / Carne de Kalphita / Carne de Terrorbird (6) • Ovo (6) • Carne de Besta / Caça / Ave / Rato (3)' }
    ],
    sells: [
      {
        tier: 'Tier 1 a 3 (Trama Garou, Couros, Ossos e Carnes)',
        items: [
          { name: 'Trama Garou (Garou Weave)', wiki: 'Garou Weave', cost: 150, unlocks: 'Material essencial para armaduras de Areias Umbrais (Tier 1)' },
          { name: 'Pele Macia (12), Pelagem (12), Ossos (6), Penas (6), Carnes Cruas Básicas (9)', wiki: 'Soft Animal Hide', cost: 12, unlocks: 'Materiais de caça básicos (Tier 2)' },
          { name: 'Pele Dura (18), Pelagem de Lobo Terrível (48), Pele Ácida (48), Presa (12), Chifre (18), Ovo (18), Carne de Terrorbird (18)', wiki: 'Hard Animal Hide', cost: 18, unlocks: 'Couros médios e Ovos para culinária (Tier 3)' }
        ]
      },
      {
        tier: 'Tier 4 (Vestígios de Armadura de Kalphita À Distância Nv. 6 & Quitina)',
        items: [
          { name: 'Antena Tremeluzente (Twitching Antenna)', wiki: 'Twitching Antenna', cost: 2500, unlocks: 'Desbloqueia o Elmo de Carapaça de Kalphita (À Distância Nv. 6)', craftWiki: 'Kalphite Carapace Helmet' },
          { name: 'Carapaça Quitinosa (Chitinous Carapace)', wiki: 'Chitinous Carapace', cost: 7500, unlocks: 'Desbloqueia o Peitoral de Carapaça de Kalphita (À Distância Nv. 6)', craftWiki: 'Kalphite Carapace Chest' },
          { name: 'Apêndice Farpado (Barbed Appendage)', wiki: 'Barbed Appendage', cost: 5000, unlocks: 'Desbloqueia as Perneiras de Carapaça de Kalphita (À Distância Nv. 6)', craftWiki: 'Kalphite Carapace Legs' },
          { name: 'Perneiras Desbotadas pelo Sol (Sun-Bleached Leggings)', wiki: 'Sun-Bleached Leggings', cost: 5000, unlocks: 'Desbloqueia as Perneiras do Deserto (Desert Robe Legs)', craftWiki: 'Desert Robe Legs' },
          { name: 'Carapaça de Kalphita (96) • Quitina (48) • Pelagem Amaldiçoada (36) • Osso de Dragão (36) • Osso Grande (18)', wiki: 'Kalphite Carapace', cost: 96, unlocks: 'Compra direta de Ossos de Dragão e Quitina no Tier 4!' }
        ]
      }
    ]
  }
];

export const ENDGAME_DB = [
  {
    id: 'mystic-forge-ascension',
    title: 'Forja Mística & Sistema de Ascensão (Núcleos Nv. 4 a 8)',
    category: 'Ascensão de Equipamentos',
    icon: '⚒️',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Ascension_Core_%28Power_Level_8%29.png',
    craftWiki: 'Mystic Forge',
    summary: 'Permite evoluir suas Armas Obra-Prima (Masterwork) e Armaduras de Vestígio favoritas para o Nível de Poder máximo do jogo (até Nv. 8)!',
    highlights: [
      'Como Desbloquear a Forja Mística: Basta obter 1 Barra de Bronze no inventário. Custo de construção: 6x Barra de Bronze, 20x Toras de Freixo, 8x Fio Grosso e 1x Núcleo de Cofre.',
      'Como Funciona a Ascensão: Coloque qualquer Arma Obra-Prima (ex: Chicote Abissal, Cimitarra de Dragão, Machado Zumbi, Ira do Titã, Arco de Cristal) ou Armadura de Vestígio na aba Ascensão da Forja Mística junto com 1 Núcleo de Ascensão (Ascension Core) do próximo tier.',
      'Núcleo de Ascensão Nv. 4 (Na Forja Mística): 99x Fragmento de Ascensão Nv.4 + 10x Barra de Ferro + 10x Couro de Lobo Terrível + 10x Pano Acolchoado.',
      'Núcleo de Ascensão Nv. 5 (Na Forja Mística): 99x Fragmento de Ascensão Nv.5 + 10x Barra de Aço + 10x Couro Dracônico + 10x Pano Fino.',
      'Núcleo de Ascensão Nv. 6 (Na Forja Mística): 99x Fragmento de Ascensão Nv.6 + 10x Barra de Mithril + 10x Couro Amaldiçoado + 10x Pano Místico.',
      'Núcleo de Ascensão Nv. 7 (EXCLUSIVO): NÃO pode ser fabricado! Obtido apenas vencendo as arenas do Crisol do Pesadelo (Nightmare Crucible) em Areias Umbrais.',
      'Núcleo de Ascensão Nv. 8 (Na Forja Mística): 99x Fragmento de Ascensão Nv.7 + 10x Barra Rúnica + 10x Couro de Dragão Negro + 10x Pano Vis.'
    ]
  },
  {
    id: 'nightmare-crucible',
    title: 'Crisol do Pesadelo (Nightmare Crucible — 4 Arenas)',
    category: 'Desafio de Combate (Nv. 7)',
    icon: '💀',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Ascension_Core_%28Power_Level_7%29.png',
    summary: 'As 4 arenas de chefes nas Areias Umbrais são a ÚNICA fonte de Núcleos de Ascensão Nv. 7 do jogo!',
    highlights: [
      'Como Entrar: Cada entrada consome 1 Engrama do Crisol (Crucible Engram) correspondente. Se morrer, sua lápide aparece do lado de fora da porta.',
      '1. Crisol da Humilhação (Nordeste das Dunas de Uzzer): Requer Engrama da Humilhação. Inimigos: 1x Dragão Azul + 1x Dragão Verde + 1x Dragão Vermelho.',
      '2. Crisol dos Acuados (Sudoeste das Planícies Manafem): Requer Engrama dos Acuados (The Hounded). Inimigos: 2x Zogres simultâneos.',
      '3. Crisol da Traição (Sudeste do Pináculo Ardente): Requer Engrama da Traição. Inimigos: 1x Titã Cavaleiro Negro + 1x Dragão Verde (ou Demônio Abissal).',
      '4. Crisol do Desamparo (Noroeste do Oásis Alcarrid): Requer Engrama do Desamparo (Helplessness). Inimigos: 2x Thanes Garou + 1x Dragão Verde.',
      'Recompensa no Pedestal Central: 1x Núcleo de Ascensão (Nível de Poder 7) garantido por Engrama concluído! (Atenção: se usar o Cetro do Faraó, espere a múmia invocada Buddy desaparecer para o pedestal liberar a recompensa).'
    ]
  },
  {
    id: 'fight-cave',
    title: 'Caverna de Luta (Fight Caves — 30 Ondas & Capa de Fogo)',
    category: 'Arena de Sobrevivência',
    icon: '🌋',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Fire_Cape.png',
    craftWiki: 'Fire Cape',
    summary: 'Localizada no Pináculo Ardente (Sudeste das Areias Umbrais, coords -1591, 2241). Enfrente ondas de guerreiros KotHaar e o chefe Fuzan!',
    highlights: [
      'Modo 1 — Provas de Fuzan (Trials of Fuzan): 10 Ondas + Chefe Fuzan (parte da missão O Pequeno Ajudante de Icthlarin). Concluir libera o Modo Completo.',
      'Modo 2 — Caverna de Luta Completa (Fight Caves): 30 Ondas intensas de KotHaar-Hur, KotHaar-Xil (Arqueiros), KotHaar-Ket (Guardiões), KotHaar-Kal (Magos) e Tok-Xil, culminando na batalha final contra Fuzan.',
      'Inimigos Prioritários: Elimine sempre os KotHaar-Kal (curandeiros/magos) e KotHaar-Xil (arqueiros de alto dano) primeiro usando as rochas vulcânicas como cobertura.',
      'Equipamento Recomendado: Armadura de Obsidiana (comprada no Beartach Tier 4) ou Armadura de Paladino Solar, Armas TzHaar/Obra-Prima Nv. 6+, Poções de Resistência ao Fogo e Ensopados Nv. 4.',
      'Recompensa Suprema: Receita e materiais para forjar a lendária Capa de Fogo (Fire Cape) e equipamentos TzHaar (Toktz-xil-ak, TzHaar-ket-om e Toktz-ket-xil)!'
    ]
  },
  {
    id: 'scorned-wilderness',
    title: 'Raid 1.0: Ermos Desprezados (Scorned Wilderness & Kuldra)',
    category: 'Raid Final (Nv. 8)',
    icon: '🐉',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Rune_Bar.png',
    craftWiki: 'Rune Bar',
    summary: 'A primeira Raid oficial de RuneScape: Dragonwilds! Ilhas flutuantes repletas de Runita, Luminita, Árvores Mágicas e o confronto final contra a Rainha Dragão Kuldra.',
    highlights: [
      'Requisito de Acesso: Concluir a missão principal O Pequeno Ajudante de Icthlarin e iniciar Regicídio (Regicide). Entrada a Noroeste das Planícies Fraturadas (Ghornfell).',
      'Zona 1 — Descanso de Rasthin (Rasthin\'s Rest): Único Hub seguro onde você pode construir uma Base! Bases aqui NUNCA sofrem ataques de Bandos de Guerra (Warbands), e morrer dentro da Raid traz seu túmulo direto para perto da Comandante Zilyana!',
      'Zona 2 — Vinhas Cauda-de-Dragão (Dragontail Vines): Rica em Minério de Runita, Depósitos de Luminita e Árvores Mágicas! Inimigos dropam Resíduo Discordante (Discordant Residue), essencial para equipamentos Nível de Poder 8.',
      'Zonas 3 a 5 — Fragmentos de Ghornfell, Fortaleza despedaçada e Bastilha do Cataclismo: Contêm Teleportadores de Zilyana (atalhos para voltar à base, reparar e reabastecer), Urnas Sanguíneas, Dragões Negros e Demônios Abissais.',
      'Zona 6 — Santuário de Kuldra (Kuldra\'s Sanctum): Minere os últimos depósitos de Runita e Luminita antes do Portão do Dragão e enfrente a Rainha Dragão Kuldra!'
    ]
  },
  {
    id: 'mounts-agility',
    title: 'Montarias (Mounts) & Percursos de Agilidade',
    category: 'Mobilidade & Exploração',
    icon: '🦅',
    img: 'https://runescape.wiki/images/RS_Dragonwilds_Flatpack_Magical_Rug.png',
    craftWiki: 'Flatpack Magical Rug',
    summary: 'Como desbloquear todas as Montarias (Terrorbirds e Tapete Mágico) para cruzar Ashenfall em alta velocidade.',
    highlights: [
      'Tapete Mágico (Flatpack Magical Rug): Desbloqueado de graça ao concluir a missão secundária Tapete Voador (Rugged) com Ali Morrisane no Oásis Alcarrid!',
      'Terrorbird Caçador de Musgo (Mossbreak Hunter): Comprado na Loja da Morte (Templo Esquecido) por 2.000 Fragmentos de Alma.',
      'Terrorbird Raptor Pena de Carvalho (Oakfeather Raptor): Comprado na Loja da Morte (Templo Esquecido) por 2.000 Fragmentos de Alma.',
      'Sela de Juramento Zamorakiana & Bico-da-Praga Infernal: Comprados no Tier 4 do mercador Domri (Oásis Alcarrid) por 9.999 Fichas Garou cada.',
      'Tocas de Kebbit (Kebbit Burrows): Existem dezenas de tocas espalhadas por todas as regiões (marcadas no nosso Mapa Interativo!). Inspecionar cada toca concede XP imediato de Agilidade.'
    ]
  }
];
