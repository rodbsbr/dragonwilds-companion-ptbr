// Imagens oficiais da Wiki do Dragonwilds (com fallback automático nos componentes)
export const wikiImg = (file) => {
  if (!file) return '';
  let clean = file;
  try {
    clean = decodeURIComponent(file);
  } catch {
    clean = file;
  }
  return `https://dragonwilds.runescape.wiki/images/${encodeURIComponent(clean.replace(/ /g, '_')).replace(/%2F/g, '/')}`;
};

// Camadas do mapa -> arquivo de ícone
export const LAYER_IMAGES = {
  Vaults: 'Dragonkin_Vault.png',
  Nodestone: 'Nodestone.png',
  'Dragon Shrine': 'Dragon_Shrine.png',
  'Tin Ore Node': 'Tin_Ore.png',
  'Copper Ore Node': 'Copper_Ore.png',
  'Clay Node': 'Clay.png',
  'Iron Ore Node': 'Iron_Ore.png',
  'Coal Node': 'Coal.png',
  'Silver Ore Node': 'Silver_Ore.png',
  'Gold Ore Node': 'Gold_Ore.png',
  'Mithril Ore Node': 'Mithril_Ore.png',
  'Gypsum Node': 'Gypsum.png',
  'Adamantite Ore Node': 'Adamantite_Ore.png',
  'Runite Ore Node': 'Runite_Ore.png',
  'Ash Tree': 'Ash_Logs.png',
  'Oak Tree': 'Oak_Logs.png',
  'Willow Tree': 'Willow_Logs.png',
  'Bloodwood Tree': 'Bloodwood_Sap.png',
  'Maple Tree': 'Maple_Logs.png',
  'Yew Tree': 'Yew_Logs.png',
  'Magic Tree': 'Magic_Logs.png',
  'Anima Tree': 'Anima-Infused_Bark.png',
  'Crystal Tree': 'Crystal_Bow.png',
  Flax: 'Flax.png',
  'Corpse Cotton Plant': 'Corpse_Cotton.png',
  'Bittercap Mushroom': 'Bittercap_Mushroom.png',
  Toadflax: 'Toadflax.png',
  Snapdragon: 'Snapdragon.png',
  'Redberry Bush': 'Redberries.png',
  'Dwellberry Bush': 'Dwellberries.png',
  'Cadavaberry Bush': 'Cadavaberries.png',
  'Barrel Cactus': 'Barrel_Cactus.png',
  'Bunny Cactus': 'Bunny_Cactus.png',
  'Air Anima Vent': 'Air_Rune.png',
  'Fire Anima Vent': 'Fire_Rune.png',
  'Water Anima Vent': 'Water_Rune.png',
  'Earth Anima Vent': 'Earth_Rune.png',
  'Astral Anima Vent': 'Astral_Rune.png',
  'Nature Anima Vent': 'Nature_Rune.png',
  'Law Anima Vent': 'Law_Rune.png',
  'Green Dragon': 'Green_Dragon.png',
  'Blue Dragon': 'Blue_Dragon.png',
  'Red Dragon': 'Red_Dragon.png',
  'Black Dragon': 'Black_Dragon.png',
  'Abyssal Demon': 'Abyssal_Demon.png',
  NPCs: 'Wise_Old_Man.png',
  'Wise Old Man': 'Wise_Old_Man.png',
  Doric: 'Doric.png',
  Vannaka: 'Vannaka.png',
  Zanik: 'Zanik.png',
  Death: 'Death.png',
  Icthlarin: 'Icthlarin.png',
  'Postie Pete': 'Postie_Pete.png',
  'Doctor Fenkenstrain': 'Doctor_Fenkenstrain.png',
  'Domri - The Merchant': 'Domri_-_The_Merchant.png',
  'Iasadair - The Merchant': 'Iasadair_-_The_Merchant.png',
  'Beartach - The Merchant': 'Beartach_-_The_Merchant.png',
  'Spectral Chest': 'Chest_Icon.png',
};
const CHEST_IMG = 'Chest_Icon.png';

export function layerImage(layerId) {
  if (LAYER_IMAGES[layerId]) return wikiImg(LAYER_IMAGES[layerId]);
  if (layerId.startsWith('Treasure Chest') || layerId.startsWith('Buried Treasure'))
    return wikiImg(CHEST_IMG);
  return '';
}

// Materiais -> arquivo (id do MATERIALS_DB)
const MATERIAL_FILES = {
  ash_logs: 'Ash_Logs.png', oak_logs: 'Oak_Logs.png', willow_logs: 'Willow_Logs.png',
  blightwood: 'Blightwood.png', maple_logs: 'Maple_Logs.png', yew_logs: 'Yew_Logs.png',
  magic_logs: 'Magic_Logs.png', stone: 'Stone.png', clay: 'Clay.png', tin_ore: 'Tin_Ore.png',
  copper_ore: 'Copper_Ore.png', iron_ore: 'Iron_Ore.png', coal: 'Coal.png',
  silver_ore: 'Silver_Ore.png', gold_ore: 'Gold_Ore.png', mithril_ore: 'Mithril_Ore.png',
  adamantite_ore: 'Adamantite_Ore.png', runite_ore: 'Runite_Ore.png', gypsum: 'Gypsum.png',
  flax: 'Flax.png', corpse_cotton: 'Corpse_Cotton.png', fleece: 'Fleece.png',
  swamp_weed: 'Swamp_Weed.png', swamp_tar: 'Swamp_Tar.png', desert_weed: 'Desert_Weed.png',
  animal_bone: 'Animal_Bone.png', animal_hide: 'Animal_Hide.png', dire_wolf_hide: 'Dire_Wolf_Hide.png',
  dragonwolf_hide: 'Dragonwolf_Hide.png', scorch_leather: 'Scorch_Leather.png',
  rune_essence: 'Rune_Essence.png', fire_rune: 'Fire_Rune.png', vault_shard: 'Vault_Shard.png',
  vault_core: 'Vault_Core.png', granite: 'Granite.png', ground_sandstone: 'Ground_Sandstone.png',
  jade: 'Jade.png', dragonstone: 'Dragonstone.png', abyssal_spine: 'Abyssal_Spine.png',
  shrapnel: 'Shrapnel.png', feathers: 'Feathers.png', ash_plank: 'Ash_Plank.png',
  oak_plank: 'Oak_Plank.png', charcoal: 'Charcoal.png', adhesive: 'Adhesive.png',
  gypsum_wax: 'Gypsum_Wax.png', coarse_thread: 'Coarse_Thread.png', wool_thread: 'Wool_Thread.png',
  swamp_thread: 'Swamp_Thread.png', fine_thread: 'Fine_Thread.png', desert_thread: 'Desert_Thread.png',
  rough_cloth: 'Rough_Cloth.png', wool_cloth: 'Wool_Cloth.png', padded_cloth: 'Padded_Cloth.png',
  fine_cloth: 'Fine_Cloth.png', desert_cloth: 'Desert_Cloth.png', leather: 'Leather.png',
  hard_leather: 'Hard_Leather.png', dire_wolf_leather: 'Dire_Wolf_Leather.png',
  draconic_leather: 'Draconic_Leather.png', bronze_bar: 'Bronze_Bar.png', iron_bar: 'Iron_Bar.png',
  silver_bar: 'Silver_Bar.png', gold_bar: 'Gold_Bar.png', steel_bar: 'Steel_Bar.png',
  mithril_bar: 'Mithril_Bar.png', adamant_bar: 'Adamant_Bar.png', runite_bar: 'Rune_Bar.png',
};
export const materialImage = (id) => wikiImg(MATERIAL_FILES[id]);

// Receitas -> arquivo (id do RECIPES_DB)
const RECIPE_FILES = {
  crafting_table: 'Crafting_Table.png', spinning_wheel: 'Spinning_Wheel.png', tannery: 'Tannery.png',
  rune_altar: 'Rune_Altar.png', kiln: 'Kiln.png', furnace: 'Furnace.png',
  blacksmith_bench: "Blacksmith's_Bench.png", armour_bench: 'Armour_Bench.png',
  fletching_bench: 'Fletching_Bench.png', mystic_forge: 'Mystic_Forge.png', loom: 'Loom.png',
  cooking_range: 'Cooking_Range.png', jewelers_bench: "Jeweler's_Bench.png",
  blast_furnace: 'Blast_Furnace.png', bronze_kit: 'Bronze_Pickaxe.png', iron_kit: 'Iron_Pickaxe.png',
  blightwood_longbow: 'Blightwood_Longbow.png', abysmal_whip: 'Abysmal_Whip.png',
  mithril_equipment: 'Mithril_Pickaxe.png', adamant_greatsword: 'Adamant_Greatsword.png',
  adamant_crossbow: 'Adamant_Crossbow.png', bronze_armour_set: 'Bronze_Platebody.png',
  iron_armour_set: 'Iron_Platebody.png', adamant_armour_set: 'Adamant_Platebody.png',
};
export const recipeImage = (id) => wikiImg(RECIPE_FILES[id]);

// Monstros (por prefixo ou palavra-chave do nome) e feitiços
const MONSTER_FILES = [
  ['General Velgar', 'Velgar.jpg'],
  ['Imaru', 'Imaru.png'],
  ['Titã', 'Black_Knight_Titan.png'],
  ['Fuzan', 'Fuzan.png'],
  ['Rainha Kuldra', 'Kuldra.png'],
  ['Guardião de Cofre', 'Vault_Guardian_Sentinel.png'],
  ['Rato Pútrido', 'Putrid_Rat.png'],
  ['Rei da Praga', 'Putrid_Rat.png'],
  ['Rato Gigante', 'Giant_Rat.png'],
  ['Goblin Arqueiro', 'Goblin_Archer.png'],
  ['Goblin', 'Goblin_Warrior.png'],
  ['Demônio Abissal', 'Abyssal_Demon.png'],
  ['Garou Berserker', 'Garou_Berserker.png'],
  ['Garou Druida', 'Garou_Druid.png'],
  ['Garou Caçador', 'Garou_Hunter.png'],
  ['Garou Thane', 'Garou_Thane.png'],
  ['Lobo', 'Dire_Wolf.png'],
  ['Dragão Verde', 'Green_Dragon.png'],
  ['Saqueador', 'Rotsworn_Necromancer.png'],
  ['Zumbi', 'Rotsworn_Zombie.png'],
  ['Cavaleiro Negro de Elite', 'Black_Knight_Guardian.png'],
  ['Cavaleiro Negro', 'Black_Knight_Warrior.png'],
  ['Dragão Azul', 'Blue_Dragon.png'],
  ['Dragão Vermelho', 'Red_Dragon.png'],
  ['Soldado', 'Kalphite_Queen.png'],
];
export const monsterImage = (name = '') => {
  const m = MONSTER_FILES.find(([p]) => name.includes(p));
  return m ? wikiImg(m[1]) : '';
};
export const spellImage = (name) => {
  const en = (name.match(/\(([^)]+)\)/) || [])[1] || name;
  return wikiImg(`${en.replace(/: /g, '-_').replace(/ /g, '_')}.png`);
};

