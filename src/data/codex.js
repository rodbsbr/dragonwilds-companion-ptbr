import data from './wikiItems.json';
import { MATERIALS_DB, RECIPES_DB } from './gameData';
import { wikiImg } from './images';

export const CODEX_ITEMS = data.items;
export const BY_NAME = Object.fromEntries(CODEX_ITEMS.map((i) => [i.n, i]));

export const CODEX_CATEGORIES = [
  ['melee', '⚔️ Corpo a Corpo'],
  ['ranged', '🏹 Arcos & Bestas'],
  ['magia', '🔮 Magia'],
  ['armadura', '🛡️ Armaduras'],
  ['escudo', '🔰 Escudos'],
  ['joia', '💍 Joias'],
  ['ferramenta', '⛏️ Ferramentas'],
  ['material', '🧱 Materiais & Barras'],
  ['municao', '🎯 Munição'],
  ['comida', '🍖 Comida'],
  ['pocao', '🧪 Poções'],
  ['capa', '🧣 Capas'],
  ['outros', '📦 Outros'],
];

export const FACILITY_PT = {
  'Crafting Table': 'Mesa de Criação (Crafting Table)',
  "Blacksmith's Bench": 'Bancada de Ferreiro (Blacksmith\'s Bench)',
  'Armour Bench': 'Bancada de Armaduras (Armour Bench)',
  'Mystic Forge': 'Forja Mística (Mystic Forge)',
  'Smithing Forge': 'Forja de Ferreiro (Smithing Forge)',
  'Fletching Bench': 'Bancada de Arco e Flecha (Fletching Bench)',
  'Fletching Table': 'Mesa de Arco e Flecha',
  'Stone Range': 'Fogão de Pedra',
  'Cooking Range': 'Fogão de Cozinha (Cooking Range)',
  "Jeweler's Bench": 'Bancada de Joalheiro (Jeweler\'s Bench)',
  Campfire: 'Fogueira (Campfire)',
  Grill: 'Grelha (Grill)',
  'Cooking Pot': 'Panela (Cooking Pot)',
  Kiln: 'Forno de Cerâmica (Kiln)',
  Furnace: 'Fornalha (Furnace)',
  'Blast Furnace': 'Alto-Forno (Blast Furnace)',
  'Spinning Wheel': 'Roda de Fiar (Spinning Wheel)',
  'Advanced Spinning Wheel': 'Roda de Fiar Avançada',
  Loom: 'Tear (Loom)',
  Tannery: 'Curtume (Tannery)',
  'Advanced Tannery': 'Curtume Avançado',
  Sawmill: 'Serraria (Sawmill)',
  Grindstone: 'Moedor de Pedra (Grindstone)',
  'Rune Altar': 'Altar Rúnico (Rune Altar)',
  'Brewing Cauldron': 'Caldeirão de Poções (Brewing Cauldron)',
  'Imbuing Barrel': 'Barril de Imbuir (Imbuing Barrel)',
};

// Informações completas de Coleta, Onde Pegar, Equipamento Mínimo e Camada do Mapa para TODOS os recursos brutos
export const RAW_INFO = {
  // Madeiras & Árvores
  'Ash Logs': {
    where: 'Cortando Árvores de Freixo (Ash Trees) ou pegando galhos no chão em Brynmoor',
    toolReq: '🪓 Machado de Pedra (Nv. 1) ou apanhar galhos no chão',
    mapLayer: 'Ash Tree',
  },
  'Oak Logs': {
    where: 'Cortando Carvalhos (Oak Trees) em Brynmoor e Vale de Bramblemead',
    toolReq: '🪓 Requer: Machado de Lenha de Bronze (Nv. 2) ou superior (ou feitiço Projeção Axtral)',
    mapLayer: 'Oak Tree',
  },
  'Willow Logs': {
    where: 'Cortando Salgueiros (Willow Trees) no Pântano Sussurrante e Pântano da Praga Sangrenta',
    toolReq: '🪓 Requer: Machado de Lenha de Ferro (Nv. 3) ou superior (ou feitiço Projeção Axtral)',
    mapLayer: 'Willow Tree',
  },
  Blightwood: {
    where: 'Cortando as Raízes Pálidas (Blightwood Roots) nas árvores gigantes do Pântano da Praga Sangrenta',
    toolReq: '🪓 Requer: Machado de Lenha de Ferro (Nv. 3) ou superior + Poção Antiveneno',
    mapLayer: 'Bloodwood Tree',
  },
  'Maple Logs': {
    where: 'Cortando Árvores de Bordo (Maple Trees) em Fellhollow e no Alcance de Dowdun',
    toolReq: '🪓 Requer: Machado de Lenha de Mithril (Nv. 5) ou superior',
    mapLayer: 'Maple Tree',
  },
  'Yew Logs': {
    where: 'Cortando Árvores de Teixo (Yew Trees) no deserto das Areias Umbrais',
    toolReq: '🪓 Requer: Machado de Lenha de Adamantita (Nv. 6) ou superior + Proteção contra Calor',
    mapLayer: 'Yew Tree',
  },
  'Magic Logs': {
    where: 'Cortando Árvores Mágicas (Magic Trees) nos Ermos Desprezados (Endgame)',
    toolReq: '🪓 Requer: Machado de Lenha de Runita (Nv. 7) ou superior',
    mapLayer: 'Magic Tree',
  },
  'Anima-Infused Bark': {
    where: 'Cortando Árvores de Anima em Ghornfell, Fellhollow e Alcance de Dowdun',
    toolReq: '🪓 Requer: Machado de Lenha de Bronze/Ferro ou superior',
    mapLayer: 'Anima Tree',
  },
  'Hollow Bark': {
    where: 'Cortando Árvores Mortas (Dead Trees) em pântanos e Fellhollow',
    toolReq: '🪓 Requer: Machado de Lenha de Ferro (Nv. 3) ou superior',
    mapLayer: 'Willow Tree',
  },

  // Minérios & Rochas
  Stone: {
    where: 'Pedregulhos por toda Ashenfall ou coletando pedras soltas no chão',
    toolReq: '⛏️ Picareta de Pedra (Nv. 1) ou feitiço Rochasplosão (Nv. 11 Mineração)',
    mapLayer: 'Clay Node',
  },
  Clay: {
    where: 'Jazidas de Argila (Clay Nodes) no Pântano Sussurrante e margens de rios',
    toolReq: '⛏️ Requer: Picareta de Pedra (Nv. 1) ou superior',
    mapLayer: 'Clay Node',
  },
  'Tin Ore': {
    where: 'Jazidas de Estanho no Pântano Sussurrante, Planícies Fraturadas e Terras Altas',
    toolReq: '⛏️ Requer: Picareta de Osso (Nv. 1–2) ou superior (ou feitiço Rochasplosão)',
    mapLayer: 'Tin Ore Node',
  },
  'Copper Ore': {
    where: 'Jazidas de Cobre no Pântano Sussurrante, Planícies Fraturadas e Terras Altas',
    toolReq: '⛏️ Requer: Picareta de Osso (Nv. 1–2) ou superior (ou feitiço Rochasplosão)',
    mapLayer: 'Copper Ore Node',
  },
  'Iron Ore': {
    where: 'Jazidas de Ferro nas Planícies Fraturadas, Terras Altas, Cofre Chaktan Kara e Fellhollow',
    toolReq: '⛏️ Requer: Picareta de Bronze (Nv. 2) ou superior (ou feitiço Rochasplosão)',
    mapLayer: 'Iron Ore Node',
  },
  'Blurite Ore': {
    where: 'Exclusivo dentro do Cofre #4 Takla Kara (no alto da meseta oeste das Planícies Fraturadas)',
    toolReq: '⛏️ Requer: Picareta de Bronze (Nv. 2) ou superior',
    mapLayer: 'Vaults',
  },
  'Silver Ore': {
    where: 'Jazidas de Prata no Pântano da Praga Sangrenta, Planícies Fraturadas e Terras Altas',
    toolReq: '⛏️ Requer: Picareta de Ferro (Nv. 3) ou superior',
    mapLayer: 'Silver Ore Node',
  },
  'Gold Ore': {
    where: 'Jazidas de Ouro no Pântano da Praga Sangrenta, Terras Altas e Alcance de Dowdun',
    toolReq: '⛏️ Requer: Picareta de Ferro (Nv. 3) ou superior',
    mapLayer: 'Gold Ore Node',
  },
  Coal: {
    where: 'Jazidas de Carvão Mineral em Fellhollow, Alcance de Dowdun e Areias Umbrais',
    toolReq: '⛏️ Requer: Picareta de Ferro (Nv. 3) ou superior',
    mapLayer: 'Coal Node',
  },
  'Mithril Ore': {
    where: 'Jazidas de Mithril nas montanhas do Alcance de Dowdun',
    toolReq: '⛏️ Requer: Picareta de Aço (Nv. 4) ou superior',
    mapLayer: 'Mithril Ore Node',
  },
  'Adamantite Ore': {
    where: 'Jazidas de Adamantita no deserto das Areias Umbrais',
    toolReq: '⛏️ Requer: Picareta de Mithril (Nv. 5) ou superior + Proteção contra Insolação',
    mapLayer: 'Adamantite Ore Node',
  },
  Gypsum: {
    where: 'Jazidas de Gesso (Gypsum) nas Areias Umbrais',
    toolReq: '⛏️ Requer: Picareta de Mithril (Nv. 5) ou superior',
    mapLayer: 'Gypsum Node',
  },
  'Runite Ore': {
    where: 'Jazidas de Runita nos Ermos Desprezados (Scorned Wilderness)',
    toolReq: '⛏️ Requer: Picareta de Adamantita (Nv. 6) ou superior',
    mapLayer: 'Runite Ore Node',
  },
  'Luminite Ore': {
    where: 'Depósitos de Luminita nos Ermos Desprezados (Scorned Wilderness)',
    toolReq: '⛏️ Requer: Picareta de Adamantita (Nv. 6) ou superior',
    mapLayer: 'Runite Ore Node',
  },
  Sandstone: {
    where: 'Rochas de Arenito nas Planícies Fraturadas, Terras Altas, Dowdun e Areias Umbrais',
    toolReq: '⛏️ Requer: Picareta de Bronze/Ferro ou superior',
    mapLayer: 'Iron Ore Node',
  },
  Granite: {
    where: 'Depósitos de Granito em Ghornfell, Fellhollow e Alcance de Dowdun',
    toolReq: '⛏️ Requer: Picareta de Ferro (Nv. 3) ou superior',
    mapLayer: 'Coal Node',
  },
  Limestone: {
    where: 'Rochas de Calcário perto da água no Alcance de Dowdun',
    toolReq: '⛏️ Requer: Picareta de Aço (Nv. 4) ou superior',
    mapLayer: 'Mithril Ore Node',
  },
  Obsidian: {
    where: 'Depósitos de Obsidiana nas Areias Umbrais (Pináculo Ardente) e Ermos Desprezados',
    toolReq: '⛏️ Requer: Picareta de Mithril (Nv. 5) ou superior',
    mapLayer: 'Adamantite Ore Node',
  },

  // Gemas Preciosas
  Opal: {
    where: 'Drop ao minerar Estanho, Cobre e Pedregulhos',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Osso+',
    mapLayer: 'Tin Ore Node',
  },
  Jade: {
    where: 'Drop ao minerar Ferro ou abatendo Vinhas de Jade no Pântano da Praga Sangrenta',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Bronze+',
    mapLayer: 'Iron Ore Node',
  },
  'Red Topaz': {
    where: 'Drop ao minerar Jazidas de Prata (Silver Ore)',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Ferro+',
    mapLayer: 'Silver Ore Node',
  },
  Sapphire: {
    where: 'Drop ao minerar Jazidas de Ouro (Gold Ore)',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Ferro+',
    mapLayer: 'Gold Ore Node',
  },
  Diamond: {
    where: 'Drop ao minerar Jazidas de Carvão Mineral (Coal)',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Ferro+',
    mapLayer: 'Coal Node',
  },
  Ruby: {
    where: 'Drop ao minerar Jazidas de Mithril no Alcance de Dowdun',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Aço+',
    mapLayer: 'Mithril Ore Node',
  },
  Dragonstone: {
    where: 'Drop ao minerar Adamantita/Runita nas Areias Umbrais ou baús de Cofres Nv. 7',
    toolReq: '⛏️ Requer: Perk "Prospector de Gemas" (Nv. 16 de Mineração) + Picareta de Mithril+',
    mapLayer: 'Adamantite Ore Node',
  },

  // Peles, Couros e Drops de Criaturas
  'Animal Hide': {
    where: 'Drop de Cervos, Vacas e Lobos comuns em Brynmoor e Ghornfell',
    toolReq: '⚔️ Arma Nv. 1–2 (Arco ou arma corpo a corpo)',
  },
  'Coarse Animal Fur': {
    where: 'Drop de Ratos, Kebbits e Ninhos de Pássaros em Brynmoor',
    toolReq: '⚔️ Arma Nv. 1 (Perfuração contra ratos)',
  },
  'Soft Animal Fur': {
    where: 'Drop de Lobos e Lobos Atrozes em Ghornfell',
    toolReq: '⚔️ Arma Nv. 3 (Lobos são fracos contra Fogo 🔥)',
  },
  'Dire Wolf Hide': {
    where: 'Drop de Lobos Atrozes (Dire Wolves) nas Planícies Fraturadas e Terras Altas (Ghornfell)',
    toolReq: '⚔️ Equipamento Nv. 3–4 (Fracos contra Fogo 🔥)',
  },
  'Dragonwolf Hide': {
    where: 'Drop de Lobos-Dragão (Dragonwolves) em Fellhollow ou Suprimentos de Doric',
    toolReq: '⚔️ Equipamento Nv. 4–5 (Use Magia/Encantamento de Água 💧)',
    mapLayer: 'Green Dragon',
  },
  'Dragon Blood': {
    where: 'Drop de Lobos-Dragão e Dragões (Verdes, Azuis e Vermelhos)',
    toolReq: '⚔️ Equipamento Nv. 4–6 + Escudo Anti-Dragão + Ataques de Água 💧',
    mapLayer: 'Green Dragon',
  },
  'Dragon Tooth': {
    where: 'Minerando o crânio gigante de dragão nas Terras Altas da Tempestade ou abatendo dragões',
    toolReq: '⛏️ Picareta de Ferro (Nv. 3) ou Combate contra Dragões',
    mapLayer: 'Green Dragon',
  },
  'Green Dragon Hide': {
    where: 'Drop de Dragões Verdes em Fellhollow',
    toolReq: '⚔️ Equipamento Nv. 5 + Escudo Anti-Dragão + Água 💧',
    mapLayer: 'Green Dragon',
  },
  'Blue Dragonhide': {
    where: 'Drop de Dragões Azuis no Alcance de Dowdun',
    toolReq: '⚔️ Equipamento Nv. 6 + Escudo Anti-Dragão + Água 💧 (Resistem a flechas!)',
    mapLayer: 'Blue Dragon',
  },
  'Red Dragon Hide': {
    where: 'Drop de Dragões Vermelhos nas Areias Umbrais (aparecem à noite)',
    toolReq: '⚔️ Equipamento Nv. 7 + Poção Antifogo + Água 💧',
    mapLayer: 'Red Dragon',
  },
  'Black Dragon Hide': {
    where: 'Drop de Dragões Negros nos Ermos Desprezados',
    toolReq: '⚔️ Equipamento Nv. 7–8 + Escudo de Fogo Dracônico',
    mapLayer: 'Black Dragon',
  },
  'Animal Bone': {
    where: 'Drop de Ratos, Vacas, Cervos e Lobos (ou usando feitiço Casca em Ossos em árvores)',
    toolReq: '⚔️ Combate Nv. 1+ ou Feitiço Casca em Ossos (Nv. 11 Artesão)',
  },
  'Undead Bone': {
    where: 'Drop de Esqueletos e Zumbis Rotsworn em Fellhollow',
    toolReq: '⚔️ Equipamento Nv. 4–5 (Use armas de Esmagamento contra esqueletos!)',
  },
  'Abyssal Spine': {
    where: 'Drop de Demônio Abissal no Pântano Sussurrante e Planícies Fraturadas',
    toolReq: '⚔️ Equipamento Nv. 4 (Fraco contra Corte / Espadas)',
    mapLayer: 'Abyssal Demon',
  },
  'Kalphite Shell Fragments': {
    where: 'Drop de Soldados e Guardiões Kalphite nas Areias Umbrais',
    toolReq: '⚔️ Equipamento Nv. 6–7',
  },
  'Kalphite Ichor': {
    where: 'Drop de Kalphites e Ovos de Kalphite nas Areias Umbrais',
    toolReq: '⚔️ Equipamento Nv. 6–7',
  },
  'Poison Ichor': {
    where: 'Drop de Ratos Pútridos e Vinhas de Jade no Pântano Sussurrante / Praga Sangrenta',
    toolReq: '⚔️ Arma de Esmagamento Nv. 2–3 + Antiveneno',
  },
  'Cursed Essence': {
    where: 'Drop de inimigos corrompidos e Rotsworn em Fellhollow',
    toolReq: '⚔️ Equipamento Nv. 4–5',
  },
  'Garou Weave': {
    where: 'Comprado dos mercadores (Iasadair, Beartach, Domri) ou em baús das Areias Umbrais',
    toolReq: '🪙 Comércio com Mercadores ou Baús Nv. 6–7',
    mapLayer: 'NPCs',
  },
  'Mystic Fibres': {
    where: 'Abrindo Pacotes de Mago Zamorakiano (drops no Alcance de Dowdun)',
    toolReq: '⚔️ Equipamento Nv. 5–6',
  },
  Shrapnel: {
    where: 'Drop de Goblins, Garou e baús de acampamentos em Brynmoor e Ghornfell',
    toolReq: '⚔️ Combate Nv. 1–3',
  },
  Feathers: {
    where: 'Drop de Galinhas, Pegas (Magpie) e Terrorbirds',
    toolReq: '🏹 Arco ou arma Nv. 1+',
  },
  Fleece: {
    where: 'Drop de Ovelhas e Carneiros nas Planícies Fraturadas e Terras Altas',
    toolReq: '⚔️ Combate Nv. 2–3',
  },

  // Plantas, Fibras & Outros
  Flax: {
    where: 'Colhendo plantas de Linho azuis no Vale de Bramblemead e Brynmoor',
    toolReq: '🖐️ Coleta manual (Nv. 1) ou feitiço Arrancar Raízes (Nv. 15 Fazenda)',
    mapLayer: 'Flax',
  },
  'Corpse Cotton': {
    where: 'Colhendo Algodão Cadavérico em Fellhollow',
    toolReq: '🖐️ Coleta manual em Fellhollow ou feitiço Arrancar Raízes',
    mapLayer: 'Corpse Cotton Plant',
  },
  'Swamp Weed': {
    where: 'Plantas aquáticas no Pântano Sussurrante e Pântano da Praga Sangrenta',
    toolReq: '🖐️ Coleta manual no pântano',
  },
  'Swamp Tar': {
    where: 'Poças escuras de Alcatrão no Pântano Sussurrante e Pântano da Praga Sangrenta',
    toolReq: '🖐️ Coleta manual nas poças de lama do pântano',
  },
  'Desert Weed': {
    where: 'Plantas do deserto nas Areias Umbrais',
    toolReq: '🖐️ Coleta nas Areias Umbrais (leve proteção contra calor)',
    mapLayer: 'Barrel Cactus',
  },
  'Vault Shard': {
    where: 'Pilhados em baús, pedestais e Guardiões dentro dos Cofres Dragonkin (Vaults)',
    toolReq: '🔨 Arma de Esmagamento (Clava/Maça/Martelo) contra Guardiões de Cofre',
    mapLayer: 'Vaults',
  },
  'Vault Core': {
    where: 'Baú principal de recompensa nos Cofres Dragonkin (#1 a #12)',
    toolReq: '🔨 Arma de Esmagamento (Clava/Maça/Martelo) para limpar o Cofre',
    mapLayer: 'Vaults',
  },
  'Rune Essence': {
    where: 'Gêiseres de Essência Rúnica, Fendas de Anima, Guardiões de Cofre e Goblins',
    toolReq: '⛏️ Picareta de Pedra (Nv. 1) ou sifonar Fendas',
    mapLayer: 'Air Anima Vent',
  },
  'Fire Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima do Fogo',
    toolReq: '🔮 Essência Rúnica no Altar Rúnico ou Sifonar Fenda',
    mapLayer: 'Fire Anima Vent',
  },
  'Water Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima da Água',
    toolReq: '🔮 Altar Rúnico ou Fenda de Água',
    mapLayer: 'Water Anima Vent',
  },
  'Air Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima do Ar',
    toolReq: '🔮 Altar Rúnico ou Fenda de Ar',
    mapLayer: 'Air Anima Vent',
  },
  'Earth Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima da Terra',
    toolReq: '🔮 Altar Rúnico ou Fenda de Terra',
    mapLayer: 'Earth Anima Vent',
  },
  'Astral Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima Astral',
    toolReq: '🔮 Altar Rúnico ou Fenda Astral',
    mapLayer: 'Astral Anima Vent',
  },
  'Nature Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima da Natureza',
    toolReq: '🔮 Altar Rúnico ou Fenda da Natureza',
    mapLayer: 'Nature Anima Vent',
  },
  'Law Rune': {
    where: 'Criada no Altar Rúnico ou sifonando Fendas de Anima da Lei',
    toolReq: '🔮 Altar Rúnico ou Fenda da Lei',
    mapLayer: 'Law Anima Vent',
  },
  Snapdragon: {
    where: 'Colhendo erva Boca-de-Leão em Fellhollow e Alcance de Dowdun',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Snapdragon',
  },
  Toadflax: {
    where: 'Colhendo erva Linária em Ghornfell e Fellhollow',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Toadflax',
  },
  'Bittercap Mushroom': {
    where: 'Cogumelos em pântanos e florestas escuras',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Bittercap Mushroom',
  },
  Redberries: {
    where: 'Arbustos de Frutas Vermelhas no Bosque do Templo e Bramblemead',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Redberry Bush',
  },
  Dwellberries: {
    where: 'Arbustos de Dwellberry em Brynmoor e Ghornfell',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Dwellberry Bush',
  },
  Cadavaberries: {
    where: 'Arbustos de Cadavaberry em Fellhollow e pântanos',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Cadavaberry Bush',
  },

  // Materiais Especiais de Missões, Chefes e Regiões Avançadas
  'Shocking Plant Bulb': {
    where: 'Drop de Vinhas Lapulis Selvagens (Wild Lapulis Vines) nas Terras Altas da Tempestade e Cofres',
    toolReq: '🏹 Ataque à distância recomendado + Comida com buff Aterrado (Grounded)',
  },
  'Salve Crystal': {
    where: 'Recompensa da missão "Buscando Salvação" (Doric em Fellhollow) ou comprado na Loja da Morte (25 Fragmentos de Alma)',
    toolReq: '📜 Completar missão "Buscando Salvação" (Seeking Salvation)',
    mapLayer: 'Doric',
  },
  'Soul Fragment': {
    where: 'Drop de inimigos mortos-vivos Rotsworn, Espíritos e durante Fenda de Alma em Fellhollow',
    toolReq: '⚔️ Equipamento Nv. 4–5 (Armas de Esmagamento + Amuleto Salve)',
  },
  'Infernal Fragment': {
    where: 'Drop de Demônios Menores, Cães Infernais e Magos Zamorakianos no Alcance de Dowdun (ou trocando com a galinha Putrilius)',
    toolReq: '⚔️ Equipamento Nv. 5–6 (Use Magia/Encantamento de Água 💧)',
  },
  'Noxious Draconic Visage': {
    where: 'Recompensa da missão "O Matador de Dragões" ou abatendo novamente o General Velgar em Velgar\'s Rise',
    toolReq: '⚔️ Chifre de Desafio + Escudo Anti-Dragão + Poção Antiveneno',
  },
  'Undead Draconic Visage': {
    where: 'Recompensa da missão "Colinas Definhantes" ou abatendo Imaru na Torre de Imaru (Fellhollow)',
    toolReq: '⚔️ Equipamento Nv. 5 + 3 Fragmentos de Maldição',
  },
  'Smouldering Draconic Visage': {
    where: 'Recompensa da missão "O Pequeno Ajudante de Icthlarin" ou abatendo Fuzan na Caverna de Luta (Areias Umbrais)',
    toolReq: '⚔️ Equipamento Nv. 6–7 + Poção Antifogo + Ataques de Água 💧',
  },
  "Broken Titan's Wrath": {
    where: 'Drop do chefe Titã Cavaleiro Negro (Lord Rasmodel) no Bastião do Alcance de Dowdun',
    toolReq: '🔨 Arma de Esmagamento encantada com Água 💧',
  },
  'Shimmering Kalphite Scale': {
    where: 'Drop de Kalphites e da Rainha Kalphite nas Areias Umbrais',
    toolReq: '⚔️ Equipamento Nv. 6–7',
  },
  Egg: {
    where: 'Drop de Galinhas em Brynmoor ou Ninhos de Pássaro ao cortar árvores',
    toolReq: '🏹 Combate Nv. 1 ou Corte de Lenha',
  },
  Wheat: {
    where: 'Colhido plantando Sementes de Trigo (drop de Goblins) no Canteiro de Fazenda',
    toolReq: '🌱 Canteiro de Freixo + Pá de Madeira + Regador',
  },

  // Alquimia, Poções & Ervas Medicinais
  Irit: {
    where: 'Colhida de Raízes de Irit Espinhoso no Pântano da Praga Sangrenta e Fellhollow, ou drop de cultistas',
    toolReq: '🖐️ Coleta manual em pântanos ou foice',
    mapLayer: 'Bloodwood Tree',
  },
  'Blue Dragon Scale': {
    where: 'Drop de Dragões Azuis no Alcance de Dowdun ou minerando carcaças dracônicas',
    toolReq: '⚔️ Equipamento Nv. 6 + Escudo Anti-Dragão + Magia de Água 💧',
    mapLayer: 'Blue Dragon',
  },
  'Small Animal Fang': {
    where: 'Drop de Ratos Gigantes, Lobos e Kebbits em Brynmoor e Planícies Fraturadas',
    toolReq: '🏹 Caça com Arco ou adagas de combate Nv. 1–2',
    mapLayer: 'Ash Tree',
  },
  Avantoe: {
    where: 'Colhendo erva Avantoe nas Terras Altas da Tempestade e Dowdun ou cultivando sementes',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Snapdragon',
  },
  Kwuarm: {
    where: 'Colhendo erva Kwuarm ao redor dos oásis e cânions nas Areias Umbrais',
    toolReq: '🖐️ Coleta manual (leve proteção contra calor)',
    mapLayer: 'Barrel Cactus',
  },
  Marrentill: {
    where: 'Colhendo erva Marrentil nos limites do Bosque do Templo e Brynmoor',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Toadflax',
  },
  Harralander: {
    where: 'Colhendo erva Harralander nas Terras Altas de Ghornfell',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Toadflax',
  },
  Marrentil: {
    where: 'Colhendo erva Marrentil nos limites do Bosque do Templo e Brynmoor',
    toolReq: '🖐️ Coleta manual',
    mapLayer: 'Toadflax',
  },
  'Ram Horn': {
    where: 'Drop de Carneiros e Ovelhas nas Terras Altas de Ghornfell e Planícies Fraturadas',
    toolReq: '⚔️ Combate Nv. 2–3',
  },
  Antler: {
    where: 'Drop de Cervos machos com galhadas no Bosque do Templo e Brynmoor',
    toolReq: '🏹 Caça com Arco ou arma Nv. 1–2',
  },
  'Necrotic Bonemeal': {
    where: 'Ossos de mortos-vivos (Undead Bone) moídos no Moedor de Pedra (drop em Fellhollow)',
    toolReq: '🔨 Moedor de Pedra + Ossos de Morto-Vivo',
  },
  Weeds: {
    where: 'Arrancadas limpando ervas daninhas em canteiros de fazenda em Brynmoor',
    toolReq: '🖐️ Coleta manual em canteiros',
  },
  'Bronze Leaf': {
    where: 'Comprado com mercadores ou recompensa de artesanato / fazenda',
    toolReq: '🪙 Comércio ou Forja',
  },
  'Silver Leaf': {
    where: 'Comprado com mercadores ou recompensa de artesanato',
    toolReq: '🪙 Comércio com Doric / Mercadores',
  },
  'Gold Leaf': {
    where: 'Comprado com mercadores no Alcance de Dowdun ou baús de tesouro',
    toolReq: '🪙 Mercadores ou Baús Nv. 5+',
  },
  'Fried Sardine': {
    where: 'Sardinha pescada na costa de Brynmoor e frita na grelha',
    toolReq: '🎣 Pesca costeira + Grelha',
  },
  'Grilled Trout': {
    where: 'Truta pescada em rios de água doce de Brynmoor e grelhada',
    toolReq: '🎣 Vara de Pesca + Grelha',
  },
  'Sauteed Shrimp': {
    where: 'Camarão pescado com rede pequena na praia de Brynmoor e salteado',
    toolReq: '🎣 Rede de Pesca Pequena',
  },
  'Amylase Crystal': {
    where: 'Recompensa ao completar circuitos de agilidade e baús de batedores',
    toolReq: '🏃 Prática de Agilidade ou baús de tesouro',
  },
  'Wild Anima': {
    where: 'Sifonando Fendas de Anima ou colhendo Flores de Anima em Ashenfall',
    toolReq: '🔮 Sifonador de Anima ou Frasco em Fendas',
    mapLayer: 'Air Anima Vent',
  },

  // Culinária, Carnes, Peixes & Vegetais
  Cabbage: {
    where: 'Hortas de repolho ao norte do Vale de Bramblemead e fazendas abandonadas de Brynmoor',
    toolReq: '🖐️ Coleta manual em plantações',
  },
  Potato: {
    where: 'Canteiros de batata nas fazendas do Vale de Bramblemead',
    toolReq: '🖐️ Coleta manual',
  },
  Onion: {
    where: 'Plantações e hortas em Brynmoor e borda das Planícies Fraturadas',
    toolReq: '🖐️ Coleta manual',
  },
  Pumpkin: {
    where: 'Campos de abóbora silvestres ao sul do Vale de Bramblemead e clareiras de Fellhollow',
    toolReq: '🖐️ Coleta manual',
  },
  Tomato: {
    where: 'Estufas e canteiros rurais nas vilas de Brynmoor',
    toolReq: '🖐️ Coleta manual',
  },
  'Raw Bird Meat': {
    where: 'Drop de Galinhas em Brynmoor, Pegas (Magpie) e Terrorbirds nas florestas',
    toolReq: '🏹 Arco e flecha ou arma Nv. 1',
  },
  'Raw Game Meat': {
    where: 'Drop de Cervos e Kebbits nas clareiras do Bosque do Templo e Brynmoor',
    toolReq: '🏹 Arco e flecha Nv. 1–2',
  },
  'Raw Farm Meat': {
    where: 'Drop de Vacas e Touros nos pastos ao redor do Vale de Bramblemead',
    toolReq: '⚔️ Combate Nv. 1',
  },
  'Raw Bestial Meat': {
    where: 'Drop de Ursos, Lobos Atrozes e Feras nas Planícies Fraturadas e Terras Altas',
    toolReq: '⚔️ Combate Nv. 3–4',
  },
  'Dirty Water': {
    where: 'Coletada com Frasco ou Balde em rios, lagos e poços de água de Ashenfall',
    toolReq: '🫙 Frasco de Vidro ou Balde perto d’água',
  },
  'Maple Sap': {
    where: 'Extraído de Árvores de Bordo (Maple Trees) em Fellhollow com Torneira ou machado',
    toolReq: '🪓 Machado de Mithril (Nv. 5) em Árvores de Bordo',
    mapLayer: 'Maple Tree',
  },
  'Raw Undead Bass': {
    where: 'Pescado nas águas corrompidas do Lago das Almas Perdidas em Fellhollow',
    toolReq: '🎣 Vara de Pesca + Isca de Pesca',
  },
  'Raw Monkfish': {
    where: 'Pescado nas praias oceânicas ao sul das Areias Umbrais',
    toolReq: '🎣 Rede de Pesca Grande + Nv. 62 Pesca',
  },
  'Cactus Steak': {
    where: 'Cortando Cactos de Barril (Barrel Cactus) no deserto das Areias Umbrais',
    toolReq: '🗡️ Faca ou Espada cortando Cactos de Barril',
    mapLayer: 'Barrel Cactus',
  },
  'Raw Desert Sole': {
    where: 'Pescado nas margens de oásis e costa das Areias Umbrais',
    toolReq: '🎣 Vara de Pesca + Penas de isca',
  },
  'Raw Beltfish': {
    where: 'Pescado nas margens de rios e costas de Brynmoor e Ghornfell',
    toolReq: '🎣 Vara de Pesca comum',
  },
  'Goblin Pack': {
    where: 'Drop de Goblins e Hobgoblins em acampamentos e florestas de Brynmoor',
    toolReq: '⚔️ Combate Nv. 1 (Qualquer arma)',
  },
  'Black Metal Scraps': {
    where: 'Drop de Cavaleiros Negros no Alcance de Dowdun; fundido na Fornalha de Alta Temperatura',
    toolReq: '⚔️ Combate Nv. 5 contra Cavaleiros Negros',
  },
  'Vile Ashes': {
    where: 'Drop ao derrotar Demônios e criaturas corrompidas no Alcance de Dowdun',
    toolReq: '⚔️ Combate Nv. 5–6 (Magia de Água / Esmagamento)',
  },
  'Fibrous Pipe Cactus': {
    where: 'Cortando Cactos Tubulares nas dunas das Areias Umbrais; curtido para Couro de Cacto',
    toolReq: '🗡️ Faca afiada ou Machado cortando Cactos',
    mapLayer: 'Barrel Cactus',
  },
  'Elder Curiosities': {
    where: 'Relíquias antigas de obsidiana encontradas em ruínas vulcânicas do Alcance de Dowdun',
    toolReq: '⛏️ Picareta de Aço (Nv. 4) ou baús secretos',
  },
  'Dihydrogen Monoxide': {
    where: 'Água destilada purificada vendida por boticários e alquimistas experientes',
    toolReq: '🪙 Comércio com Alquimistas',
  },
  'Discordant Residue': {
    where: 'Drop de aparições na Torre de Kuldra; usado para tecer Tecido do Caos (Vis Cloth)',
    toolReq: '🔮 Combate Mágico Nv. 5+ na Torre de Kuldra',
  },
  'Withered Heart': {
    where: 'Drop raro de criaturas atrofiadas e chefes nas profundezas sombrias de Fellhollow',
    toolReq: '⚔️ Combate Nv. 5+ (Armas Sagradas / Amuleto Salve)',
  },
  'Kalphite Wing': {
    where: 'Drop de Kalphites Trabalhadores e Soldados nos túneis das Areias Umbrais',
    toolReq: '⚔️ Combate Nv. 4–5 (Esmagamento ou Fogo)',
  },
  'Greater Kalphite Wing': {
    where: 'Drop de Kalphites Guardiões e da Rainha Kalphite no ninho profundo',
    toolReq: '⚔️ Combate Nv. 6–7 (Requer Antiveneno)',
  },
  'Garou Artefact': {
    where: 'Encontrado em ruínas de pedra nas Terras Altas e saques de feras Garou',
    toolReq: '⚔️ Combate Nv. 4–5 ou Exploração',
  },
  'Zombie Pack': {
    where: 'Drop de Zumbis e Carniçais em Fellhollow e cemitérios abandonados',
    toolReq: '⚔️ Combate Nv. 4 (Armas de Esmagamento)',
  },
  'Raw Anchovies': {
    where: 'Pescada no litoral costeiro e águas rasas de Brynmoor com Rede Pequena',
    toolReq: '🎣 Rede de Pesca Pequena (Nv. 15 Pesca)',
  },
  'Raw Shrimp': {
    where: 'Pescado nas praias de água salgada em Brynmoor com Rede Pequena',
    toolReq: '🎣 Rede de Pesca Pequena (Nv. 1 Pesca)',
  },
  'Raw Lobster': {
    where: 'Pescada na costa rochosa ao sul e oeste com Gaiola de Lagosta',
    toolReq: '🦞 Gaiola de Lagosta (Lobster Pot - Nv. 40 Pesca)',
  },
  'Raw Giant Krill': {
    where: 'Pescado em águas profundas do oceano costeiro com Rede Grande de Pesca',
    toolReq: '🎣 Rede Grande de Pesca (Nv. 50+ Pesca)',
  },
  'Warped Feathers': {
    where: 'Drop de aves místicas (Gyrhawks) e falcões nas Terras Altas de Ghornfell',
    toolReq: '🏹 Caça com Arco ou Armadilha de Batedor',
  },
  'Raw Herring': {
    where: 'Pescado no mar aberto costeiro com Vara de Pesca e Isca',
    toolReq: '🎣 Vara de Pesca + Minhoca de Isca (Nv. 10 Pesca)',
  },
  'Raw Undead Eel': {
    where: 'Pescada nos rios e pântanos lamacentos corrompidos de Fellhollow',
    toolReq: '🎣 Vara de Pesca + Isca de Pesca (Nv. 35 Pesca)',
  },
  'Raw Armoured Catfish': {
    where: 'Pescado em lagos profundos e cavernas subterrâneas com Vara reforçada',
    toolReq: '🎣 Vara de Pesca Pesada + Isca de Minhoca (Nv. 55 Pesca)',
  },
  Peach: {
    where: 'Colhido em pomares e arbustos frutíferos ao redor de vilas em Brynmoor',
    toolReq: '🖐️ Coleta manual em pomares',
  },
  'Raw Rat Meat': {
    where: 'Drop de Ratos Gigantes nos esgotos, celeiros e cavernas de Brynmoor',
    toolReq: '⚔️ Combate Nv. 1 (Qualquer arma)',
  },
  'Undead Meat': {
    where: 'Drop de feras mortas-vivas e carniçais em Fellhollow',
    toolReq: '⚔️ Combate Nv. 3–4',
  },
  Watermelon: {
    where: 'Colhida em fazendas férteis ou cultivada no canteiro de agricultura',
    toolReq: '🌱 Canteiro de Agricultura + Sementes',
  },
  'Raw Salmon': {
    where: 'Pescado em rios de corredeira de água doce em Brynmoor',
    toolReq: '🎣 Vara de Pesca com Isca de Penas (Nv. 30 Pesca)',
  },
  'Raw Sardine': {
    where: 'Pescada na costa marítima com Rede de Pesca Pequena',
    toolReq: '🎣 Rede de Pesca Pequena (Nv. 5 Pesca)',
  },
  'Raw Trout': {
    where: 'Pescada em rios calmos de água doce de Brynmoor',
    toolReq: '🎣 Vara de Pesca com Isca de Penas (Nv. 20 Pesca)',
  },
  'Raw Infernal Eel': {
    where: 'Pescada na lava e fontes termais escaldantes do Alcance de Dowdun',
    toolReq: '🎣 Vara de Pesca Oleosa + Isca Resistente a Fogo (Nv. 80 Pesca)',
  },
  'Ascension Shard (Power Level 4)': {
    where: 'Recompensa de baús de Masmorras e Fendas de Alma de Poder Nível 4',
    toolReq: '⚔️ Equipamento Nv. 4 + Chave de Masmorra',
  },
  'Ascension Shard (Power Level 5)': {
    where: 'Drop de Chefes de Cofres Dragonkin e Bastiões de Poder Nível 5',
    toolReq: '⚔️ Equipamento Nv. 5–6 + Foco Mágico',
  },
  'Tea Leaves': {
    where: 'Colhidas de arbustos de chá em colinas e jardins de Brynmoor',
    toolReq: '🖐️ Coleta manual',
  },
  'Black Salvage Pile': {
    where: 'Pilha de destroços de acampamentos de Cavaleiros Negros desmontada para sucata',
    toolReq: '🖐️ Coleta em postos avançados de Dowdun',
  },
  'Obsidian Device': {
    where: 'Dispositivo ancestral de obsidiana recuperado no Bastião Vulcânico de Dowdun',
    toolReq: '⚔️ Saque de chefes do Bastião ou Picareta Nv. 5',
  },
};

// Compatibilidade para o ItemCodex mostrar botão de Mapa em qualquer ingrediente que tenha camada
export const RAW_MAP_LAYER = Object.fromEntries(
  Object.entries(RAW_INFO)
    .filter(([, v]) => v.mapLayer)
    .map(([k, v]) => [k, v.mapLayer])
);

export const wikiRecipeId = (name) => `w:${name}`;
export const isWikiId = (id) => typeof id === 'string' && id.startsWith('w:');

export const CUSTOM_PT_NAMES = {
  // Poções & Bebidas
  'Antipoison Potion': 'Poção Antiveneno',
  'Antifire Potion': 'Poção Antifogo',
  'Focused Attack Potion': 'Poção de Ataque Focado',
  'Healing Potion': 'Poção de Cura',
  'Stamina Potion': 'Poção de Estamina / Corrida',
  'Super Antifire Potion': 'Poção Super Antifogo',
  'Super Antipoison Potion': 'Poção Super Antiveneno',
  'Focused Mining Potion': 'Poção de Mineração Focada',
  'Focused Woodcutting Potion': 'Poção de Lenhador Focado',
  'Focused Artisan Potion': 'Poção de Artesão Focado',
  'Focused Cooking Potion': 'Poção de Culinária Focada',
  'Weapon Poison': 'Veneno para Armas',
  'Lesser Healing Potion': 'Poção de Cura Menor',
  'Lesser Antipoison Potion': 'Poção Antiveneno Menor',
  'Lesser Attack Potion': 'Poção de Ataque Menor',
  'Plant Cure': 'Cura de Plantas',

  // Ervas & Ingredientes de Alquimia
  Irit: 'Erva Irit',
  'Poison Ichor': 'Icor de Veneno',
  'Glass Vessel': 'Frasco de Vidro',
  'Molten Glass': 'Vidro Derretido',
  'Ground Limestone': 'Calcário Moído',
  'Ground Sandstone': 'Arenito Moído',
  'Ground Clay': 'Argila Moída',
  'Clay Vessel': 'Frasco de Argila',
  'Clay Vessel (Unfired)': 'Frasco de Argila (Não Queimado)',
  'Blue Dragon Scale': 'Escama de Dragão Azul',
  'Blue Dragon Scale Dust': 'Pó de Escama de Dragão Azul',
  'Small Animal Fang': 'Presa Pequena de Animal',
  Avantoe: 'Erva Avantoe',
  Kwuarm: 'Erva Kwuarm',
  Marrentill: 'Erva Marrentil',
  Harralander: 'Erva Harralander',
  'Amylase Crystal': 'Cristal de Amilase',
  'Wild Anima': 'Anima Selvagem',

  // Comidas & Ingredientes Culinários
  'Sweet Veg Ball': 'Almôndega Vegetal Doce',
  'Mixed Grill': 'Churrasco Misto',
  'Victoria Sponge Cake': 'Bolo Pão de Ló Victoria',
  'Mushroom Kebab': 'Espetinho de Cogumelo',
  'Meat Pizza': 'Pizza de Carne',
  'Steak Sandwich': 'Sanduíche de Bife Completo',
  'Glazed Pumpkin Sandwich': 'Sanduíche de Abóbora Glaceada',
  'Undead Delight': 'Delícia Morta-Viva',
  'Monkfish Skewers': 'Kebab de Tamboril & Cacto',
  'Swabbie Pie': 'Torta do Marinheiro',
  Cabbage: 'Repolho',
  'Fried Cabbage': 'Repolho Frito',
  Potato: 'Batata',
  'Baked Potato': 'Batata Assada',
  Redberries: 'Frutas Vermelhas',
  'Dried Redberries': 'Frutas Vermelhas Secas',
  'Redberry Infusion': 'Infusão de Frutas Vermelhas',
  Egg: 'Ovo',
  Wheat: 'Trigo',
  'Bag of Flour': 'Saco de Farinha',
  Bread: 'Pão',
  'Raw Bird Meat': 'Carne de Ave Crua',
  'Raw Game Meat': 'Carne de Caça Crua',
  'Raw Farm Meat': 'Carne de Fazenda Crua',
  'Raw Bestial Meat': 'Carne Feral Crua',
  Fillet: 'Filé de Ave Grelhado',
  Haunch: 'Pernil de Caça Assado',
  Steak: 'Bife Assado',
  'Flank Steak': 'Bife de Flanco Selado',
  'Dirty Water': 'Água Suja',
  'Clean Water': 'Água Limpa Potável',
  'Bittercap Mushroom': 'Cogumelo Chapéu-Amargo',
  'Grilled Mushrooms': 'Cogumelos Grelhados',
  Onion: 'Cebola',
  'Fried Onions': 'Cebolas Fritas',
  Pumpkin: 'Abóbora',
  'Roast Pumpkin': 'Abóbora Assada',
  'Maple Sap': 'Seiva de Bordo',
  'Maple Syrup': 'Xarope de Bordo',
  Tomato: 'Tomate',
  'Grilled Tomatoes': 'Tomates Grelhados',
  'Raw Undead Bass': 'Robalo Morto-Vivo Cru',
  'Grilled Undead Bass': 'Robalo Morto-Vivo Grelhado',
  'Raw Monkfish': 'Tamboril Cru',
  'Monkfish Fillets': 'Filé de Tamboril Grelhado',
  'Cactus Steak': 'Bife de Cacto Cru',
  'Seared Cactus Steak': 'Bife de Cacto Selado',
  'Raw Desert Sole': 'Linguado do Deserto Cru',
  'Sun Baked Sole': 'Linguado Assado ao Sol',
  'Raw Beltfish': 'Peixe-Cinto Cru',
  'Steamed Beltfish': 'Peixe-Cinto no Vapor',
  'Goblin Pack': 'Mochila de Goblin',
  'Garou Artefact': 'Artefato Garou',
  'Zombie Pack': 'Bolsa de Zumbi',
  'Raw Anchovies': 'Anchova Crua',
  'Raw Shrimp': 'Camarão Cru',
  'Raw Lobster': 'Lagosta Crua',
  'Raw Giant Krill': 'Krill Gigante Cru',
  'Vile Ashes': 'Cinzas Vis Demoníacas',
  'Raw Undead Eel': 'Enguia Morta-Viva Crua',
  'Raw Armoured Catfish': 'Bagre Blindado Cru',
  Peach: 'Pêssego Fresco',
  'Warped Feathers': 'Penas Distorcidas',
  'Raw Rat Meat': 'Carne de Rato Crua',
  'Undead Meat': 'Carne de Morto-Vivo',
  Watermelon: 'Melancia Suculenta',
  'Raw Salmon': 'Salmão Cru',
  'Raw Sardine': 'Sardinha Crua',
  'Raw Trout': 'Truta Crua',
  'Raw Herring': 'Arenque Cru',
  'Raw Infernal Eel': 'Enguia Infernal Crua',
  'Withered Heart': 'Coração Atrofiado',
  'Ascension Shard (Power Level 4)': 'Fragmento de Ascensão (Poder Nv. 4)',
  'Ascension Shard (Power Level 5)': 'Fragmento de Ascensão (Poder Nv. 5)',
  'Black Metal Scraps': 'Sucata de Metal Negro',
  'Black Salvage Pile': 'Pilha de Salvados Negros',
  'Dihydrogen Monoxide': 'Água Purificada (H2O)',
  'Fibrous Pipe Cactus': 'Cacto Tubular Fibroso',
  'Kalphite Wing': 'Asa de Kalphite',
  'Greater Kalphite Wing': 'Asa de Kalphite Superior',
  'Discordant Residue': 'Resíduo Dissonante (Vis)',
  'Tea Leaves': 'Folhas de Chá',
  'Elder Curiosities': 'Curiosidades dos Anciões (Obsidiana)',
  'Obsidian Device': 'Dispositivo Ancestral de Obsidiana',
};

export const ptName = (name) => CUSTOM_PT_NAMES[name] || data.matPt[name] || BY_NAME[name]?.pt || name;
export const matImageUrl = (name) => {
  const f = BY_NAME[name]?.img || data.matImgs[name];
  return f ? wikiImg(f) : '';
};

// Retorna informações ricas de um material (bruto ou refinado), incluindo como fazer e qual ferramenta mínima precisa!
export function getMat(id) {
  if (!isWikiId(id)) {
    const dbMat = MATERIALS_DB[id];
    if (!dbMat) return null;
    // Busca equivalência em RAW_INFO pelo mapLayerId ou nome
    const rawMatch = Object.values(RAW_INFO).find((r) => r.mapLayer && r.mapLayer === dbMat.mapLayerId);
    return {
      ...dbMat,
      toolReq: dbMat.toolReq || rawMatch?.toolReq || '🖐️ Coleta / Combate no mundo',
      ingredientsList: dbMat.ingredients?.map((ing) => ({
        name: MATERIALS_DB[ing.id]?.name || ing.id,
        qty: ing.qty,
        imgUrl: '',
      })),
    };
  }

  const name = id.slice(2);
  const item = BY_NAME[name];
  const rec = item?.r?.[0];
  const altRec = item?.r?.[1];
  const rawMeta = RAW_INFO[name];

  if (rec) {
    const ingredientsList = rec.m.map(([mn, mq]) => ({
      id: wikiRecipeId(mn),
      rawName: mn,
      name: ptName(mn),
      qty: mq,
      imgUrl: matImageUrl(mn),
      where: RAW_INFO[mn]?.where || (BY_NAME[mn]?.r?.[0] ? `Feito em: ${FACILITY_PT[BY_NAME[mn].r[0].f] || BY_NAME[mn].r[0].f}` : ''),
      toolReq: RAW_INFO[mn]?.toolReq || '',
      mapLayerId: RAW_INFO[mn]?.mapLayer,
    }));

    const altSummary = altRec
      ? `Ou alternativa em ${FACILITY_PT[altRec.f] || altRec.f}: ` +
        altRec.m.map(([mn, mq]) => `${mq}x ${ptName(mn)}`).join(' + ')
      : null;

    return {
      name: ptName(name),
      en: name,
      icon: '⚙️',
      imgUrl: matImageUrl(name),
      type: 'processed',
      station: FACILITY_PT[rec.f] || rec.f,
      outputQty: rec.o || 1,
      ingredientsList,
      altSummary,
    };
  }

  return {
    name: ptName(name),
    en: name,
    icon: '📦',
    imgUrl: matImageUrl(name),
    type: 'raw',
    where: rawMeta?.where || item?.d || 'Encontrado explorando a região correspondente ou em baús/saques',
    toolReq: rawMeta?.toolReq || '🖐️ Coleta manual ou saque de combate',
    mapLayerId: rawMeta?.mapLayer,
  };
}

// Expande recursivamente uma receita da Wiki em matérias-primas + etapas intermediárias
export function expandWiki(name, qty, raw, inter, depth = 0) {
  const rec = BY_NAME[name]?.r?.[0];
  if (!rec || depth > 8) {
    raw[wikiRecipeId(name)] = (raw[wikiRecipeId(name)] || 0) + qty;
    return;
  }
  const crafts = Math.ceil(qty / (rec.o || 1));
  inter[wikiRecipeId(name)] = (inter[wikiRecipeId(name)] || 0) + qty;
  rec.m.forEach(([mn, mq]) => expandWiki(mn, mq * crafts, raw, inter, depth + 1));
}

// Resolve recursivamente a mochila de farm em recursos brutos e intermediários
export function calculateExpeditionTree(cart) {
  const rawTotals = {};
  const intermediateTotals = {};

  function accumulateMaterial(matId, neededQty) {
    if (isWikiId(matId)) return;
    const mat = MATERIALS_DB[matId];
    if (!mat) return;

    if (mat.type === 'processed' && mat.ingredients) {
      const outQty = mat.outputQty || 1;
      const craftsNeeded = Math.ceil(neededQty / outQty);
      intermediateTotals[matId] = (intermediateTotals[matId] || 0) + neededQty;

      mat.ingredients.forEach((sub) => {
        accumulateMaterial(sub.id, sub.qty * craftsNeeded);
      });
    } else {
      rawTotals[matId] = (rawTotals[matId] || 0) + neededQty;
    }
  }

  Object.entries(cart).forEach(([recipeId, count]) => {
    if (count <= 0) return;
    if (isWikiId(recipeId)) {
      const wr = BY_NAME[recipeId.slice(2)]?.r?.[0];
      if (wr) wr.m.forEach(([mn, mq]) => expandWiki(mn, mq * count, rawTotals, intermediateTotals));
      return;
    }
    const recipe = RECIPES_DB.find((r) => r.id === recipeId);
    if (!recipe) return;

    recipe.ingredients.forEach((ing) => {
      accumulateMaterial(ing.id, ing.qty * count);
    });
  });

  return { rawTotals, intermediateTotals };
}
