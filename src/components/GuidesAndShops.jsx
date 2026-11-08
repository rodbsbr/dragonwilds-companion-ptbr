import React, { useState, useMemo } from 'react';
import { SKILLS_DB, SHOPS_DB, ENDGAME_DB } from '../data/skillsShopsEndgame';
import { BY_NAME, ptName, matImageUrl, wikiRecipeId } from '../data/codex';
import WikiImg from './WikiImg';
import ScrollStrip from './ScrollStrip';
import {
  Store,
  TrendingUp,
  Flame,
  Plus,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function GuidesAndShops({
  searchQuery,
  subTab = 'lojas',
  setSubTab,
  onAddRecipeToCart,
  onFlyToMapPoint,
}) {
  const [selectedShop, setSelectedShop] = useState(null); // id do mercador aberto
  const [selectedSkillCat, setSelectedSkillCat] = useState('Todas');
  const [openSkillId, setOpenSkillId] = useState(null);
  const [openEndgameId, setOpenEndgameId] = useState('mystic-forge-ascension');

  const q = (searchQuery || '').trim().toLowerCase();
  const skillCategories = ['Todas', 'Combate', 'Coleta', 'Produção', 'Utilidade'];

  const filteredShops = useMemo(() => {
    if (!q) return SHOPS_DB;
    return SHOPS_DB.filter((sh) => {
      const blob = [
        sh.name || '',
        sh.region || '',
        sh.location || '',
        sh.currency || '',
        sh.howToFarmCurrency || '',
        ...(sh.buys || []).map((b) => `${b.cat || ''} ${b.list || ''}`),
        ...(sh.sells || []).flatMap((t) => [t.tier || '', ...(t.items || []).map((i) => `${i.name || ''} ${i.unlocks || ''}`)]),
      ]
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [q]);

  const filteredSkills = useMemo(() => {
    return SKILLS_DB.filter((sk) => {
      const matchesCat = selectedSkillCat === 'Todas' || sk.category === selectedSkillCat;
      if (!q) return matchesCat;
      const blob = [
        sk.name || '',
        sk.category || '',
        sk.summary || '',
        sk.howToTrain || '',
        ...(sk.setBonuses || []).map((b) => `${b.pieces || ''} ${b.bonus || ''}`),
        ...(sk.milestones || []).map((m) => `${m.name || ''} ${m.desc || ''}`),
        ...(sk.xpBoosts || []),
      ]
        .join(' ')
        .toLowerCase();
      return matchesCat && blob.includes(q);
    });
  }, [selectedSkillCat, q]);

  const filteredEndgame = useMemo(() => {
    if (!q) return ENDGAME_DB;
    return ENDGAME_DB.filter((eg) => {
      const blob = [eg.title || '', eg.category || '', eg.summary || '', ...(eg.highlights || [])].join(' ').toLowerCase();
      return blob.includes(q);
    });
  }, [q]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* 3 Sub-Abas Limpas: Mercadores, Habilidades e Endgame */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#0b1322]/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-md">
        <button
          onClick={() => setSubTab('lojas')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'lojas'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Store className="w-4 h-4 shrink-0" />
          <span>Mercadores ({SHOPS_DB.length})</span>
        </button>
        <button
          onClick={() => setSubTab('skills')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'skills'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 shrink-0" />
          <span>Skills ({SKILLS_DB.length})</span>
        </button>
        <button
          onClick={() => setSubTab('endgame')}
          className={`py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
            subTab === 'endgame'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Flame className="w-4 h-4 shrink-0" />
          <span>Endgame ({ENDGAME_DB.length})</span>
        </button>
      </div>

      {/* SUB-ABA 1: MERCADORES */}
      {subTab === 'lojas' && (
        <div className="space-y-2.5">
          <div className="text-[11px] font-semibold text-slate-400 px-1">
            Toque no mercador para ver o que ele compra e o estoque de armaduras:
          </div>

          <div className="space-y-2.5">
            {filteredShops.map((shop) => {
              const isOpen = selectedShop === shop.id || !!q;
              return (
                <div
                  key={shop.id}
                  className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  {/* Cabeçalho do Mercador */}
                  <div className="p-3.5 flex items-center justify-between gap-2.5">
                    <button
                      onClick={() => setSelectedShop(isOpen ? null : shop.id)}
                      className="flex items-center gap-3 text-left min-w-0 flex-1"
                    >
                      <WikiImg src={shop.img} fallback="🏪" size={46} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase">
                            {shop.region}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 text-[10px] font-bold">
                            {shop.currency.split('(')[0].trim()}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-white mt-0.5 truncate">
                          {shop.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          📍 {shop.location}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {shop.coords && onFlyToMapPoint && (
                        <button
                          onClick={() =>
                            onFlyToMapPoint({
                              coords: shop.coords,
                              label: shop.name,
                              sub: shop.location,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Mapa</span>
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedShop(isOpen ? null : shop.id)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo do Mercador Aberto */}
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/80 space-y-2.5 bg-slate-950/40">
                      {/* Como Farmar Moeda */}
                      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-2.5 text-xs text-emerald-200 space-y-1">
                        <div>
                          🔓 <strong>Desbloqueio:</strong> {shop.unlockQuest}
                        </div>
                        <div>
                          💰 <strong>Como Conseguir {shop.currency.split('(')[0]}:</strong>{' '}
                          {shop.howToFarmCurrency}
                        </div>
                      </div>

                      {/* O que ele compra */}
                      {shop.buys && shop.buys.length > 0 && (
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-1 text-xs">
                          <div className="text-[11px] font-extrabold uppercase text-amber-400">
                            📥 O que este mercador COMPRA de você:
                          </div>
                          {shop.buys.map((b, i) => (
                            <div key={i} className="text-slate-300 leading-snug">
                              <strong className="text-white">{b.cat}:</strong> {b.list}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Estoque à venda */}
                      <div className="space-y-2">
                        {shop.sells.map((tierObj, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 space-y-1.5"
                          >
                            <div className="text-xs font-extrabold text-amber-300 border-b border-slate-800 pb-1">
                              🛒 {tierObj.tier}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                              {tierObj.items.map((it, i) => {
                                const craftRec = it.craftWiki ? BY_NAME[it.craftWiki] : null;
                                return (
                                  <div
                                    key={i}
                                    className="bg-slate-950/90 border border-slate-800 rounded-lg p-2 flex flex-col justify-between gap-1.5"
                                  >
                                    <div className="flex items-start gap-2">
                                      <WikiImg src={matImageUrl(it.wiki)} fallback="🛍️" size={32} />
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-xs font-bold text-white truncate">
                                            {it.name}
                                          </span>
                                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-extrabold shrink-0">
                                            {it.cost} 🪙
                                          </span>
                                        </div>
                                        <p className="text-[10px] text-emerald-300 truncate mt-0.5">
                                          {it.unlocks}
                                        </p>
                                      </div>
                                    </div>

                                    {craftRec && onAddRecipeToCart && (
                                      <button
                                        onClick={() => onAddRecipeToCart(wikiRecipeId(craftRec.n))}
                                        className="w-full py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-extrabold flex items-center justify-center gap-1"
                                      >
                                        <Plus className="w-3 h-3" />
                                        <span>Calcular {ptName(craftRec.n)} na Mochila</span>
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-ABA 2: SKILLS (11 HABILIDADES NV. 99) */}
      {subTab === 'skills' && (
        <div className="space-y-2.5">
          <ScrollStrip allowWrapToggle={true}>
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition ${
                  selectedSkillCat === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-300'
                    : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollStrip>

          <div className="space-y-2">
            {filteredSkills.map((sk) => {
              const isOpen = openSkillId === sk.id || !!q;
              return (
                <div
                  key={sk.id}
                  className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenSkillId(isOpen ? null : sk.id)}
                    className="w-full p-3 flex items-center justify-between gap-2.5 text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <WikiImg src={sk.img} fallback="📊" size={40} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 text-[10px] font-extrabold uppercase">
                            {sk.category}
                          </span>
                          <span className="text-[11px] text-slate-400">Nv. Máx {sk.maxLevel}</span>
                        </div>
                        <h3 className="text-sm font-extrabold text-white mt-0.5">{sk.name}</h3>
                        <p className="text-[11px] text-slate-300 truncate mt-0.5">{sk.summary}</p>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/80 space-y-2 bg-slate-950/40 text-xs">
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-slate-200">
                        🎯 <strong>Como Upar:</strong> {sk.howToTrain}
                      </div>

                      {sk.setBonuses.length > 0 && (
                        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-2.5 space-y-1">
                          <div className="text-[11px] font-extrabold uppercase text-amber-300">
                            🛡️ Bônus de Conjunto / Tiers de Ferramenta:
                          </div>
                          {sk.setBonuses.map((b, i) => (
                            <div key={i} className="text-slate-200 leading-snug">
                              <strong className="text-amber-200">{b.pieces}:</strong> {b.bonus}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-1">
                        <div className="text-[11px] font-extrabold uppercase text-emerald-400">
                          🔓 Marcos Importantes:
                        </div>
                        {sk.milestones.map((ms, i) => (
                          <div key={i} className="text-slate-300 leading-snug">
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] mr-1">
                              Nv. {ms.lvl}
                            </span>
                            <strong className="text-white">{ms.name}:</strong> {ms.desc}
                          </div>
                        ))}
                      </div>

                      {sk.xpBoosts.length > 0 && (
                        <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-2.5 space-y-1">
                          <div className="text-[11px] font-extrabold uppercase text-purple-300">
                            ⚡ Bônus de XP & Dicas:
                          </div>
                          {sk.xpBoosts.map((xb, i) => (
                            <div key={i} className="text-purple-100 leading-snug">
                              • {xb}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-ABA 3: ENDGAME */}
      {subTab === 'endgame' && (
        <div className="space-y-2.5">
          {filteredEndgame.map((eg) => {
            const isOpen = openEndgameId === eg.id || !!q;
            const craftRec = eg.craftWiki ? BY_NAME[eg.craftWiki] : null;

            return (
              <div
                key={eg.id}
                className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <div className="p-3.5 flex items-center justify-between gap-2.5">
                  <button
                    onClick={() => setOpenEndgameId(isOpen ? null : eg.id)}
                    className="flex items-center gap-3 text-left min-w-0 flex-1"
                  >
                    <WikiImg src={eg.img} fallback={eg.icon} size={44} />
                    <div className="min-w-0 flex-1">
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-extrabold uppercase">
                        {eg.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-white mt-0.5 truncate">{eg.title}</h3>
                      <p className="text-[11px] text-slate-300 truncate mt-0.5">{eg.summary}</p>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {craftRec && onAddRecipeToCart && (
                      <button
                        onClick={() => onAddRecipeToCart(wikiRecipeId(craftRec.n))}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Calcular {ptName(craftRec.n)}</span>
                      </button>
                    )}
                    <button
                      onClick={() => setOpenEndgameId(isOpen ? null : eg.id)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/80 space-y-2 bg-slate-950/40 text-xs">
                    <p className="text-slate-300 leading-relaxed">{eg.summary}</p>
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                      {eg.highlights.map((hl, i) => (
                        <div key={i} className="text-slate-200 leading-relaxed flex items-start gap-1.5">
                          <span className="text-amber-400 font-extrabold shrink-0">▸</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
