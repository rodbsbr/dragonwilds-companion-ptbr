import React, { useState, useMemo, useEffect } from 'react';
import { MATERIALS_DB, RECIPES_DB } from '../data/gameData';
import { materialImage, recipeImage, wikiImg } from '../data/images';
import WikiImg from './WikiImg';
import ItemCodex from './ItemCodex';
import {
  getMat,
  isWikiId,
  expandWiki,
  BY_NAME,
  ptName,
  FACILITY_PT,
  CODEX_ITEMS,
  calculateExpeditionTree,
} from '../data/codex';
import {
  Hammer,
  Plus,
  Minus,
  Trash2,
  MapPin,
  CheckCircle2,
  PackageCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export { calculateExpeditionTree };

export default function CraftingPlanner({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  collectedRaw,
  toggleCollectedRaw,
  setRawCount,
  onJumpToMapLayer,
  searchQuery,
  externalViewMode,
}) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [viewMode, setViewMode] = useState('mochila'); // 'mochila' | 'catalogo' | 'codex'

  useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode);
    }
  }, [externalViewMode]);

  const categories = ['Todas', 'Bancadas', 'Armas & Ferramentas', 'Armaduras'];

  const { rawTotals, intermediateTotals } = useMemo(() => calculateExpeditionTree(cart), [cart]);

  const cartEntries = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({
        recipe: isWikiId(id)
          ? BY_NAME[id.slice(2)] && {
              id,
              name: ptName(id.slice(2)),
              tier: BY_NAME[id.slice(2)].p
                ? 'Nv. ' + BY_NAME[id.slice(2)].p
                : BY_NAME[id.slice(2)].c === 'pocao'
                ? '🧪 Poção'
                : BY_NAME[id.slice(2)].c === 'comida'
                ? '🍖 Comida'
                : 'Item',
              station: FACILITY_PT[BY_NAME[id.slice(2)].r?.[0]?.f] || BY_NAME[id.slice(2)].r?.[0]?.f || '',
              img: BY_NAME[id.slice(2)].img,
            }
          : RECIPES_DB.find((r) => r.id === id),
        qty,
      }))
      .filter((item) => item.recipe);
  }, [cart]);

  const filteredRecipes = useMemo(() => {
    return RECIPES_DB.filter((r) => {
      const matchesCat = selectedCategory === 'Todas' || r.category === selectedCategory;
      const q = (searchQuery || '').trim().toLowerCase();
      if (!q) return matchesCat;
      const inName = (r.name || '').toLowerCase().includes(q);
      const inTier = (r.tier || '').toLowerCase().includes(q);
      const inIng = (r.ingredients || []).some((i) =>
        (MATERIALS_DB[i.id]?.name || '').toLowerCase().includes(q)
      );
      return matchesCat && (inName || inTier || inIng);
    });
  }, [selectedCategory, searchQuery]);

  const rawEntries = Object.entries(rawTotals);
  const intermediateEntries = Object.entries(intermediateTotals);

  const totalRawCount = rawEntries.length;
  const doneRawCount = rawEntries.filter(([matId, totalQty]) => {
    const rawVal = collectedRaw[matId];
    return rawVal === true || (typeof rawVal === 'number' && rawVal >= totalQty);
  }).length;
  const overallFarmPct = totalRawCount > 0 ? Math.round((doneRawCount / totalRawCount) * 100) : 0;

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* Alternador de 2 Modos — Ouro Dragonkin & Obsidiana */}
      <div className="grid grid-cols-2 gap-2 bg-[#0a0f1c] p-1.5 rounded-2xl border border-amber-500/20 shadow-md">
        <button
          onClick={() => setViewMode('mochila')}
          className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
            viewMode === 'mochila' && !(searchQuery || '').trim()
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>🎒 Minha Lista de Farm ({cartEntries.length})</span>
        </button>
        <button
          onClick={() => setViewMode('codex')}
          className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
            viewMode !== 'mochila' || (searchQuery || '').trim()
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>🔨 Criar Item / Bancada</span>
        </button>
      </div>

      {/* MODO 1: MOCHILA DE EXPEDIÇÃO (ÁRVORE DE RECURSOS) */}
      {viewMode === 'mochila' && !(searchQuery || '').trim() ? (
        <div className="space-y-3.5">
          {cartEntries.length === 0 ? (
            <div className="bg-[#0b1322]/90 border border-slate-800 rounded-3xl p-8 text-center space-y-3 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-3xl shadow-lg">
                🎒
              </div>
              <h3 className="text-base font-black text-white">
                Sua Lista de Farm está vazia
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Toque em <strong>Criar Item / Bancada</strong> para escolher o que você quer construir. O app calcula todos os recursos brutos, ferramentas necessárias e pontos de coleta no mapa!
              </p>
              <button
                onClick={() => setViewMode('codex')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs inline-flex items-center gap-2 active:scale-95 shadow-lg shadow-amber-500/20 transition"
              >
                <Plus className="w-4 h-4" /> Escolher Bancadas ou Equipamentos
              </button>
            </div>
          ) : (
            <>
              {/* Banner de Resumo da Caça / Expedição */}
              <div className="bg-gradient-to-r from-amber-950/40 via-[#0d1728] to-[#0a1120] border border-amber-500/30 rounded-2xl p-3.5 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <span>🎯</span> Minha Mochila de Expedição
                  </span>
                  <span className="text-[11px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {doneRawCount}/{totalRawCount} Recursos Prontos ({overallFarmPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${overallFarmPct}%` }}
                  />
                </div>
              </div>

              {/* Projetos Selecionados */}
              <div className="bg-[#0b1322]/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    🎯 Itens que você quer construir:
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 transition active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Limpar Tudo
                  </button>
                </div>

                <div className="space-y-2">
                  {cartEntries.map(({ recipe, qty }) => (
                    <div
                      key={recipe.id}
                      className="flex items-center justify-between gap-2 bg-[#070b14] border border-slate-800/90 rounded-xl px-3 py-2 shadow-sm"
                    >
                      <div className="min-w-0 flex items-center gap-2.5">
                        <WikiImg src={recipe.img ? wikiImg(recipe.img) : recipeImage(recipe.id)} fallback="🔨" size={36} />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{recipe.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {recipe.tier} • {recipe.station}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 bg-slate-900 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => removeFromCart(recipe.id)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white active:scale-90 transition font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-amber-400">
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(recipe.id)}
                          className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold active:scale-90 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ETAPA 1: Recursos Brutos para Coletar no Mundo */}
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <span>⛏️ 1. Recursos Brutos para Coletar no Mundo</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Veja onde pegar cada matéria-prima e qual equipamento mínimo levar antes de sair da base
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {rawEntries.map(([matId, totalQty]) => {
                    const mat = getMat(matId);
                    if (!mat) return null;
                    const rawVal = collectedRaw[matId];
                    const haveQty =
                      rawVal === true
                        ? totalQty
                        : typeof rawVal === 'number'
                        ? Math.min(totalQty, Math.max(0, rawVal))
                        : 0;
                    const isCollected = haveQty >= totalQty;
                    const missingQty = Math.max(0, totalQty - haveQty);
                    const pct = totalQty > 0 ? Math.round((haveQty / totalQty) * 100) : 0;

                    const updateQty = (next) => {
                      if (setRawCount) {
                        setRawCount(matId, Math.min(totalQty, Math.max(0, next)));
                      } else {
                        toggleCollectedRaw(matId);
                      }
                    };

                    return (
                      <div
                        key={matId}
                        className={`p-3.5 rounded-2xl border transition space-y-2.5 shadow-md ${
                          isCollected
                            ? 'bg-emerald-950/25 border-emerald-500/50'
                            : 'bg-[#0b1322]/95 border-slate-800 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2.5">
                          <button
                            onClick={() => updateQty(isCollected ? 0 : totalQty)}
                            className="flex items-start gap-2.5 text-left flex-1 min-w-0"
                          >
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 border-2 mt-0.5 shadow-sm ${
                                isCollected
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-black'
                                  : 'bg-slate-900 border-slate-700'
                              }`}
                            >
                              {isCollected ? (
                                '✓'
                              ) : (
                                <WikiImg
                                  src={mat.imgUrl || materialImage(matId)}
                                  fallback={mat.icon}
                                  size={36}
                                />
                              )}
                            </div>
                            <div className="min-w-0 space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-sm font-black text-amber-400">
                                  {totalQty}x
                                </span>
                                <span
                                  className={`text-sm font-extrabold ${
                                    isCollected ? 'line-through text-emerald-300/80' : 'text-white'
                                  }`}
                                >
                                  {mat.name}
                                </span>
                                {missingQty > 0 ? (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-extrabold">
                                    Faltam {missingQty}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black">
                                    ✓ Pronto para Criar!
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-300 leading-snug">
                                📍 <strong className="text-slate-200">Onde pegar:</strong>{' '}
                                {mat.where}
                              </p>
                              {mat.toolReq && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold">
                                  <span>{mat.toolReq}</span>
                                </div>
                              )}
                            </div>
                          </button>

                          {mat.mapLayerId && (
                            <button
                              onClick={() => onJumpToMapLayer(mat.mapLayerId)}
                              className="px-2.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold shrink-0 flex items-center gap-1 active:scale-95"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>Mapa</span>
                            </button>
                          )}
                        </div>

                        {/* Barra de Progresso + Contador Parcial ergonômico */}
                        <div className="bg-[#070b14]/90 border border-slate-800/80 rounded-xl p-3 space-y-2.5">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-300 flex items-center gap-1.5">
                              <span>🎒 Coletado:</span>
                              <strong className={isCollected ? 'text-emerald-400 font-black text-sm' : 'text-amber-400 font-black text-sm'}>
                                {haveQty}/{totalQty}
                              </strong>
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                              isCollected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {pct}%
                            </span>
                          </div>

                          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                            <div
                              className={`h-full rounded-full ${isCollected ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400'} transition-all duration-200`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-0.5">
                            <div className="flex items-center gap-1.5">
                              {totalQty >= 5 && (
                                <button
                                  onClick={() => updateQty(haveQty - 5)}
                                  className="h-8 min-w-[34px] px-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-black active:scale-95 transition-all shadow-sm flex items-center justify-center"
                                  title="Subtrair 5"
                                >
                                  -5
                                </button>
                              )}
                              <button
                                onClick={() => updateQty(haveQty - 1)}
                                className="h-8 min-w-[34px] px-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-black active:scale-95 transition-all shadow-sm flex items-center justify-center"
                                title="Subtrair 1"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => updateQty(haveQty + 1)}
                                className="h-8 min-w-[34px] px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-black active:scale-95 transition-all shadow-sm flex items-center justify-center"
                                title="Adicionar 1"
                              >
                                +1
                              </button>
                              {totalQty >= 5 && (
                                <button
                                  onClick={() => updateQty(haveQty + 5)}
                                  className="h-8 min-w-[34px] px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-black active:scale-95 transition-all shadow-sm flex items-center justify-center"
                                  title="Adicionar 5"
                                >
                                  +5
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => updateQty(isCollected ? 0 : totalQty)}
                              className={`h-8 px-3 rounded-lg text-xs font-black active:scale-95 transition-all flex items-center gap-1.5 ${
                                isCollected
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                              }`}
                            >
                              {isCollected ? '↩️ Desfazer' : '✓ Tudo'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ETAPA 2: Refino Intermediário nas Bancadas da Base */}
              {intermediateEntries.length > 0 && (
                <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-3.5 space-y-2.5">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>2. Refino nas Bancadas (Como Fazer Barras, Couros e Tecidos)</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Transforme os recursos brutos da Etapa 1 nestes materiais refinados antes de criar seu item final:
                  </p>

                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {intermediateEntries.map(([matId, qty]) => {
                      const mat = getMat(matId);
                      if (!mat) return null;
                      const craftsCount = Math.ceil(qty / (mat.outputQty || 1));
                      return (
                        <div
                          key={matId}
                          className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <WikiImg src={mat.imgUrl || materialImage(matId)} fallback={mat.icon} size={36} />
                              <div>
                                <div className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                                  <span className="text-sky-400 font-extrabold text-sm">{qty}x</span>
                                  <span className="text-sm">{mat.name}</span>
                                </div>
                                <div className="text-[11px] text-amber-300 font-semibold">
                                  🏭 Bancada: <span className="text-white">{mat.station}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sub-ingredientes detalhados de como fazer cada Barra / Couro / Tecido */}
                          {mat.ingredientsList && mat.ingredientsList.length > 0 && (
                            <div className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-2 space-y-1.5">
                              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                🔨 Como fazer {qty}x {mat.name} ({craftsCount}x refinos):
                              </div>
                              <div className="space-y-1.5">
                                {mat.ingredientsList.map((sub, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between gap-2 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800/70"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      {sub.imgUrl && (
                                        <WikiImg src={sub.imgUrl} fallback="📦" size={22} />
                                      )}
                                      <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-100">
                                          <span className="text-amber-400 font-extrabold">
                                            {sub.qty * craftsCount}x
                                          </span>{' '}
                                          {sub.name}{' '}
                                          <span className="text-[10px] text-slate-400 font-normal">
                                            ({sub.qty}x por receita)
                                          </span>
                                        </div>
                                        {sub.where && (
                                          <div className="text-[10px] text-slate-400 leading-tight">
                                            📍 {sub.where}
                                          </div>
                                        )}
                                        {sub.toolReq && (
                                          <div className="text-[10px] text-amber-300/90 font-semibold leading-tight mt-0.5">
                                            {sub.toolReq}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {sub.mapLayerId && (
                                      <button
                                        onClick={() => onJumpToMapLayer(sub.mapLayerId)}
                                        className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[10px] font-bold shrink-0 flex items-center gap-1"
                                      >
                                        <MapPin className="w-3 h-3" />
                                        <span>Mapa</span>
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                              {mat.altSummary && (
                                <div className="text-[10px] text-sky-300 bg-sky-950/30 border border-sky-500/20 rounded-md px-2 py-1">
                                  💡 {mat.altSummary}
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
            </>
          )}
        </div>
      ) : (
        <ItemCodex
          cart={cart}
          addWikiToCart={(id) => addToCart(id)}
          onJumpToMapLayer={onJumpToMapLayer}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}


