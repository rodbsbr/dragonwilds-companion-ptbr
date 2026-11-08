import React, { useState, useMemo } from 'react';
import { MONSTERS_DB, SPELLS_DB, FOOD_POTIONS_DB, FOOD_PERKS_PT } from '../data/gameData';
import { wikiImg, monsterImage, spellImage } from '../data/images';
import WikiImg from './WikiImg';
import ScrollStrip from './ScrollStrip';
import {
  Swords,
  Wand2,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  MapPin,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';

export default function BestiarySpells({
  searchQuery,
  subTab = 'monstros',
  setSubTab,
  cart = {},
  onAddRecipeToCart,
  onRemoveRecipeFromCart,
  onJumpToMapLayer,
  onOpenPlanner,
}) {
  const [selectedRegion, setSelectedRegion] = useState('Todas');
  const [selectedSpellCat, setSelectedSpellCat] = useState('Todas');
  const [selectedFoodCat, setSelectedFoodCat] = useState('Todas');
  const [openMonsterTip, setOpenMonsterTip] = useState(null);

  const monsterRegions = [
    'Todas',
    'Chefes Principais',
    'Cofres Dragonkin',
    'Brynmoor',
    'Ghornfell',
    'Fellhollow',
    'Alcance de Dowdun',
    'Areias Umbrais',
  ];

  const spellCategories = ['Todas', 'Coleta & Farm', 'Base & Utilidade', 'Combate & Mobilidade'];

  const filteredMonsters = useMemo(() => {
    return MONSTERS_DB.filter((m) => {
      const matchesReg = selectedRegion === 'Todas' || m.region === selectedRegion;
      const q = (searchQuery || '').trim().toLowerCase();
      if (!q) return matchesReg;
      return (
        matchesReg &&
        ((m.name || '').toLowerCase().includes(q) ||
          (m.area || '').toLowerCase().includes(q) ||
          (m.weakness || []).some((w) => (w || '').toLowerCase().includes(q)) ||
          (m.tip || '').toLowerCase().includes(q))
      );
    });
  }, [selectedRegion, searchQuery]);

  const filteredSpells = useMemo(() => {
    return SPELLS_DB.filter((s) => {
      const matchesCat = selectedSpellCat === 'Todas' || s.category === selectedSpellCat;
      const q = (searchQuery || '').trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        ((s.name || '').toLowerCase().includes(q) ||
          (s.skill || '').toLowerCase().includes(q) ||
          (s.effect || '').toLowerCase().includes(q) ||
          (s.tipPS5 || '').toLowerCase().includes(q))
      );
    });
  }, [selectedSpellCat, searchQuery]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* 3 Sub-Abas Limpas de Combate: Inimigos, Feitiços e Comida */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#0b1322]/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-md">
        <button
          onClick={() => setSubTab('monstros')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'monstros'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Swords className="w-4 h-4 shrink-0" />
          <span>Inimigos ({filteredMonsters.length})</span>
        </button>
        <button
          onClick={() => setSubTab('feiticos')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'feiticos'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Wand2 className="w-4 h-4 shrink-0" />
          <span>Feitiços ({SPELLS_DB.length})</span>
        </button>
        <button
          onClick={() => setSubTab('comida')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'comida'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 shrink-0" />
          <span>Comida ({FOOD_POTIONS_DB.length})</span>
        </button>
      </div>

      {/* SUB-ABA 1: BESTIÁRIO & FRAQUEZAS (ESCANEÁVEL EM 1 SEGUNDO NO MEIO DA LUTA!) */}
      {subTab === 'monstros' && (
        <div className="space-y-2.5">
          <ScrollStrip allowWrapToggle={true}>
            {monsterRegions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 ${
                  selectedRegion === reg
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </ScrollStrip>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredMonsters.map((m) => {
              const isBoss =
                m.region === 'Chefes Principais' ||
                m.region === 'Cofres Dragonkin' ||
                (typeof m.level === 'number' && m.level >= 4) ||
                (typeof m.level === 'string' && m.level.includes('4')) ||
                m.name.includes('General') ||
                m.name.includes('Lord') ||
                m.name.includes('Imaru') ||
                m.name.includes('Fuzan') ||
                m.name.includes('Titã') ||
                m.name.includes('Dragão');

              return (
                <div
                  key={m.name}
                  className={`bg-[#0b1322]/95 border rounded-2xl p-3.5 space-y-2.5 transition shadow-lg ${
                    isBoss
                      ? 'border-amber-500/40 hover:border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Cabeçalho com Ícone, Nível, Título e HP */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                        <WikiImg src={monsterImage(m.name)} fallback={isBoss ? '👑' : '👹'} size={42} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-black uppercase">
                            Nv. {m.level}
                          </span>
                          {isBoss && (
                            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/25 to-amber-600/25 border border-amber-500/40 text-amber-300 text-[10px] font-black tracking-wider uppercase">
                              👑 CHEFE
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 truncate">{m.area}</span>
                        </div>
                        <h3 className="text-sm font-black text-white mt-0.5 leading-snug">{m.name}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-black text-rose-400 bg-rose-950/30 border border-rose-500/30 px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1">
                      <span>❤️</span>
                      <span>{m.hp}</span>
                    </span>
                  </div>

                  {/* ULTRA DESTAQUE: 1 OLHAR PARA VENCER (Fraqueza) */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-emerald-900/40 to-emerald-950/70 border border-emerald-500/50 shadow-sm space-y-1">
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>⚡ ATAQUE COM ISTO:</span>
                    </div>
                    <div className="text-xs font-black text-emerald-100 flex items-center gap-1.5 flex-wrap">
                      {m.weakness.length > 0 ? (
                        m.weakness.map((w, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-extrabold"
                          >
                            {w}
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-200">Qualquer Dano Bruto</span>
                      )}
                    </div>
                  </div>

                  {/* Resistências & Imunidades */}
                  {(m.resistance.length > 0 || m.immunity.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {m.resistance.length > 0 && (
                        <div className="flex items-center gap-1.5 bg-rose-950/30 border border-rose-500/25 rounded-lg px-2 py-1 text-rose-300 font-semibold">
                          <span className="text-rose-400 font-black text-[10px] uppercase">❌ Resiste:</span>
                          <span className="text-rose-200 font-bold">{m.resistance.join(', ')}</span>
                        </div>
                      )}
                      {m.immunity.length > 0 && (
                        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-300">
                          <span className="text-slate-400 font-black text-[10px] uppercase">🛡️ Imune:</span>
                          <span className="text-slate-300 font-bold">{m.immunity.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dica de Combate Rápida */}
                  {m.tip && (
                    <div className="text-xs text-slate-200 bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5 leading-relaxed">
                      <span className="text-amber-400 font-black">💡 Tática: </span>
                      {m.tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-ABA 2: GRIMÓRIO DE FEITIÇOS */}
      {subTab === 'feiticos' && (
        <div className="space-y-2.5">
          <ScrollStrip allowWrapToggle={true}>
            {spellCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSpellCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 ${
                  selectedSpellCat === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollStrip>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredSpells.map((s) => (
              <div
                key={s.name}
                className="bg-[#0b1322]/95 border border-slate-800/80 hover:border-purple-500/40 rounded-2xl p-3.5 space-y-2.5 transition shadow-lg"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                      <WikiImg src={spellImage(s.name)} fallback="🔮" size={38} />
                    </div>
                    <div className="min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase">
                        {s.skill}
                      </span>
                      <h3 className="text-sm font-black text-white mt-1 leading-snug">{s.name}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-300 bg-amber-500/15 border border-amber-500/35 px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 shadow-sm">
                    <span>🔮</span>
                    <span>{s.runes}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">{s.effect}</p>

                {s.tipPS5 && (
                  <div className="text-xs text-sky-200 bg-sky-950/35 border border-sky-500/30 rounded-xl p-2.5 leading-snug flex items-center gap-2">
                    <span className="shrink-0 text-base">🎮</span>
                    <div>
                      <strong className="text-sky-300">PS5:</strong> {s.tipPS5}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-ABA 3: CULINÁRIA & POÇÕES */}
      {subTab === 'comida' && (
        <div className="space-y-3">
          {/* Barra de Filtros Rápidos (Ergonômico) */}
          <ScrollStrip allowWrapToggle={true}>
            {[
              'Todas',
              '🛡️ Antiveneno',
              '🔥 Antifogo',
              '❤️ Cura',
              '🧪 Todas as Poções',
              '⚔️ Combate',
              '⛏️ Coleta & Profissões',
              '🍖 Comidas com Buff',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFoodCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 ${
                  selectedFoodCat === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollStrip>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FOOD_POTIONS_DB.filter((f) => {
              const q = (searchQuery || '').trim().toLowerCase();
              const matchesSearch =
                !q ||
                ((f.name || '') + ' ' + (f.tip || '') + ' ' + (f.ingredients || '') + ' ' + (f.perks || []).join(' '))
                  .toLowerCase()
                  .includes(q);

              let matchesCat = true;
              if (selectedFoodCat === '🛡️ Antiveneno') {
                matchesCat = f.potionSubCat === 'antiveneno' || (f.name || '').toLowerCase().includes('antiveneno') || (f.name || '').toLowerCase().includes('antipoison');
              } else if (selectedFoodCat === '🔥 Antifogo') {
                matchesCat = f.potionSubCat === 'antifogo' || (f.name || '').toLowerCase().includes('antifogo') || (f.name || '').toLowerCase().includes('antifire');
              } else if (selectedFoodCat === '❤️ Cura') {
                matchesCat = f.potionSubCat === 'cura' || f.category === 'cura' || (f.name || '').toLowerCase().includes('cura') || (f.name || '').toLowerCase().includes('healing');
              } else if (selectedFoodCat === '⚔️ Combate') {
                matchesCat = f.potionSubCat === 'combate' || (f.name || '').toLowerCase().includes('ataque') || (f.name || '').toLowerCase().includes('veneno para armas');
              } else if (selectedFoodCat === '⛏️ Coleta & Profissões') {
                matchesCat = f.potionSubCat === 'coleta' || f.potionSubCat === 'habilidade' || f.potionSubCat === 'mobilidade';
              } else if (selectedFoodCat === '🧪 Todas as Poções') {
                matchesCat = f.category === 'pocao' || (f.type || '').includes('Poção');
              } else if (selectedFoodCat === '🍖 Comidas com Buff') {
                matchesCat = f.category === 'buff' || (f.type || '').includes('Comida com Buff');
              }

              return matchesSearch && matchesCat;
            }).map((f) => {
              const recipeId = f.recipeId || f.id || `w:${f.name.replace(/\s*\(.*\)/, '').trim()}`;
              const inCart = cart[recipeId] || 0;

              return (
                <div
                  key={f.name}
                  className={`bg-[#0b1322]/95 border rounded-2xl p-3.5 space-y-3 transition shadow-lg flex flex-col justify-between ${
                    inCart > 0 ? 'border-amber-500/50 shadow-amber-500/10' : 'border-slate-800/80 hover:border-amber-500/40'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header do Card */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                        <WikiImg src={wikiImg(f.imageFile)} fallback={f.category === 'pocao' ? '🧪' : '🍖'} size={42} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            f.category === 'pocao'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}>
                            {f.type}
                          </span>
                          {f.station && (
                            <span className="text-[10px] font-bold text-slate-400">
                              • {f.station}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-black text-white mt-1 leading-snug">{f.name}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-1.5 text-xs font-bold">
                          {f.hp && (
                            <span className="px-2 py-0.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300">
                              ❤️ {f.hp}
                            </span>
                          )}
                          {f.sustenance && (
                            <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
                              🍖 {f.sustenance}
                            </span>
                          )}
                          {f.duration && (
                            <span className="px-2 py-0.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300">
                              ⏱️ {f.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Perks / Efeitos Especiais */}
                    {f.perks && f.perks.length > 0 && (
                      <div className="text-xs text-emerald-200 bg-emerald-950/30 border border-emerald-500/25 rounded-xl p-2.5 space-y-0.5">
                        {f.perks.map((p) => (
                          <div key={p} className="flex items-center gap-1.5 font-bold">
                            <span>✨</span>
                            <span>{FOOD_PERKS_PT[p] || p}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTROLE DA MOCHILA DE FARM */}
                    <div className="pt-0.5">
                      {inCart > 0 ? (
                        <div className="flex items-center justify-between gap-2 bg-[#070b14] border border-amber-500/40 rounded-xl p-2 shadow-inner">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <PackageCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-xs font-black text-emerald-300 truncate">
                              Na Mochila de Farm:
                            </span>
                            <span className="text-xs font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30 shrink-0">
                              {inCart}x
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => onRemoveRecipeFromCart && onRemoveRecipeFromCart(recipeId)}
                              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-black flex items-center justify-center active:scale-90 transition border border-slate-700"
                              title="Remover 1"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onAddRecipeToCart && onAddRecipeToCart(recipeId)}
                              className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center justify-center active:scale-90 transition shadow-md"
                              title="Adicionar 1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            {onOpenPlanner && (
                              <button
                                onClick={onOpenPlanner}
                                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1 active:scale-95 transition shadow-sm ml-0.5"
                                title="Abrir Lista de Farm Completa"
                              >
                                <span>Ver Mochila</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddRecipeToCart && onAddRecipeToCart(recipeId)}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition shadow-md shadow-amber-500/20"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Colocar na Lista de Farm (+ Mochila)</span>
                        </button>
                      )}
                    </div>

                    {/* DETALHAMENTO: Ingredientes & Onde Achar */}
                    <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1.5 tracking-wider">
                          <span>🌿</span>
                          <span>Ingredientes & Onde Achar:</span>
                        </div>
                        {f.station && (
                          <span className="text-[10px] text-slate-400 font-bold truncate max-w-[140px]">
                            {f.station}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 pt-0.5">
                        {f.ingredientsList && f.ingredientsList.length > 0 ? (
                          f.ingredientsList.map((ing, idx) => (
                            <div
                              key={idx}
                              className="bg-[#070b14] border border-slate-800/80 rounded-lg p-2 flex items-start justify-between gap-2 text-xs"
                            >
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="font-black text-white flex items-center gap-1.5">
                                  <span className="text-amber-400 font-black">{ing.qty}x</span>
                                  <span>{ing.name}</span>
                                </div>
                                <p className="text-[11px] text-slate-300 leading-snug">
                                  📍 <strong className="text-slate-200">Onde achar:</strong> {ing.where}
                                </p>
                                {ing.toolReq && (
                                  <span className="inline-block text-[10px] font-bold text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                    {ing.toolReq}
                                  </span>
                                )}
                              </div>
                              {ing.mapLayerId && onJumpToMapLayer && (
                                <button
                                  onClick={() => onJumpToMapLayer(ing.mapLayerId)}
                                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[11px] font-bold shrink-0 flex items-center gap-1 active:scale-95 transition"
                                  title={`Ver ${ing.mapLayerId} no Mapa`}
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>Mapa</span>
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-slate-300 bg-[#070b14] p-2 rounded-lg border border-slate-800">
                            🧂 {f.ingredients}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dica do Especialista */}
                    {f.tip && (
                      <div className="text-xs text-amber-300/95 bg-amber-950/20 border border-amber-500/20 rounded-xl p-2.5 leading-relaxed font-medium">
                        💡 <strong>Dica de Sobrevivência:</strong> {f.tip}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
