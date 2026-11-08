import React, { useState, useMemo, useEffect } from 'react';
import { PROGRESSION_CHAPTERS, VAULTS_DB, QUESTS_DB } from '../data/gameData';
import { wikiImg, layerImage, recipeImage, monsterImage } from '../data/images';
import { BY_NAME, FACILITY_PT, RAW_INFO, RAW_MAP_LAYER, ptName, matImageUrl, wikiRecipeId } from '../data/codex';
import WikiImg from './WikiImg';
import ScrollStrip from './ScrollStrip';
import TrophiesGuide from './TrophiesGuide';
import {
  CheckCircle2,
  Circle,
  MapPin,
  Plus,
  ShieldAlert,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

function Roteiro({
  completedSteps,
  toggleStep,
  onAddRecipeToCart,
  onJumpToMapLayer,
  searchQuery = '',
}) {
  const [openChapters, setOpenChapters] = useState({ cap1: true });

  const toggleChapter = (id) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectSingleChapter = (id) => {
    setOpenChapters({ [id]: true });
  };

  // Progresso global de todos os capítulos
  const { totalDone, totalAll, globalPct } = useMemo(() => {
    let done = 0;
    let all = 0;
    PROGRESSION_CHAPTERS.forEach((c) => {
      c.steps.forEach((s) => {
        all += 1;
        if (completedSteps[s.id]) done += 1;
      });
    });
    return {
      totalDone: done,
      totalAll: all,
      globalPct: all > 0 ? Math.round((done / all) * 100) : 0,
    };
  }, [completedSteps]);

  const query = searchQuery.trim().toLowerCase();

  const filteredChapters = useMemo(() => {
    if (!query) return PROGRESSION_CHAPTERS;
    return PROGRESSION_CHAPTERS.filter((chap) => {
      const inTitle = (chap.title || '').toLowerCase().includes(query);
      const inRegion = (chap.region || '').toLowerCase().includes(query);
      const inBoss = (chap.boss || '').toLowerCase().includes(query);
      const inQuest = (chap.quests || []).some((qStr) => (qStr || '').toLowerCase().includes(query));
      const inStep = (chap.steps || []).some((s) => (s.text || '').toLowerCase().includes(query));
      const inVault = (chap.vaults || []).some(
        (v) => (v.name || '').toLowerCase().includes(query) || (v.area || '').toLowerCase().includes(query)
      );
      return inTitle || inRegion || inBoss || inQuest || inStep || inVault;
    });
  }, [query]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* Cabeçalho Explicativo + Progresso Geral */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Roteiro de Progressão (Nível 1 ao 9)</span>
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold shrink-0">
            {totalDone}/{totalAll} ({globalPct}%)
          </span>
        </div>

        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${globalPct}%` }}
          />
        </div>

        {/* Atalhos Rápidos de Capítulo (Com Setas ◀ ▶ e Grade) */}
        <ScrollStrip allowWrapToggle={true}>
          {PROGRESSION_CHAPTERS.map((chap) => {
            const isOpen = !!openChapters[chap.id];
            return (
              <button
                key={chap.id}
                onClick={() => selectSingleChapter(chap.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 flex items-center gap-1.5 ${
                  isOpen
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isOpen ? '#090d16' : chap.color }}
                />
                <span>Cap. {chap.order}</span>
              </button>
            );
          })}
          <button
            onClick={() => {
              const allOpen = PROGRESSION_CHAPTERS.every((c) => openChapters[c.id]);
              if (allOpen) {
                setOpenChapters({ cap1: true });
              } else {
                const next = {};
                PROGRESSION_CHAPTERS.forEach((c) => {
                  next[c.id] = true;
                });
                setOpenChapters(next);
              }
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border bg-slate-900/90 text-amber-300 border-amber-500/30 active:scale-95"
          >
            Expandir Todos
          </button>
        </ScrollStrip>
      </div>

      {/* Lista de Capítulos */}
      <div className="space-y-3">
        {filteredChapters.map((chap) => {
          const isOpen = query ? true : !!openChapters[chap.id];
          const doneCount = chap.steps.filter((s) => completedSteps[s.id]).length;
          const totalCount = chap.steps.length;
          const progressPct = Math.round((doneCount / totalCount) * 100);
          const bossImg = monsterImage(chap.boss);

          return (
            <div
              key={chap.id}
              className="bg-slate-900/95 border border-slate-800 rounded-2xl transition"
            >
              {/* Cabeçalho do Capítulo com Imagem do Chefe */}
              <button
                onClick={() => toggleChapter(chap.id)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <WikiImg src={bossImg} fallback="🐉" size={50} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-950 uppercase"
                        style={{ backgroundColor: chap.color }}
                      >
                        {chap.power}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {doneCount}/{totalCount} concluídos ({progressPct}%)
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white mt-1">{chap.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{chap.region}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-300 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Barra de Progresso do Capítulo */}
              <div className="w-full h-1 bg-slate-950">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${progressPct}%`, backgroundColor: chap.color }}
                />
              </div>

              {/* Conteúdo Expandido */}
              {isOpen && (
                <div className="p-3.5 pt-3 space-y-3 border-t border-slate-800/80">
                  {/* Missões e Chefe do Capítulo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2.5">
                      <WikiImg src={wikiImg('Primary_quest_marker_icon.png')} fallback="📜" size={38} />
                      <div>
                        <div className="text-[10px] font-bold uppercase text-amber-400">
                          📜 Missões Principais
                        </div>
                        <div className="text-slate-200 font-semibold mt-0.5 leading-snug">
                          {chap.quests.join(' → ')}
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2.5">
                      <WikiImg src={bossImg} fallback="🐉" size={38} />
                      <div>
                        <div className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> Chefe da Região
                        </div>
                        <div className="text-slate-200 font-semibold mt-0.5 leading-snug">
                          {chap.boss}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Passo a Passo Interativo com Ícones dos Itens/Recursos */}
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                      ✅ Passo a Passo Recomendado (Toque para marcar)
                    </div>
                    {chap.steps.map((step) => {
                      const isDone = !!completedSteps[step.id];
                      const stepImg =
                        (step.recipeId && recipeImage(step.recipeId)) ||
                        (step.mapLayerId && layerImage(step.mapLayerId)) ||
                        '';
                      return (
                        <div
                          key={step.id}
                          className={`p-3 rounded-xl border transition space-y-2 ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-500/30 opacity-70'
                              : 'bg-slate-950/90 border-slate-800'
                          }`}
                        >
                          <button
                            onClick={() => toggleStep(step.id)}
                            className="w-full flex items-center gap-2.5 text-left"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                            )}
                            {stepImg && <WikiImg src={stepImg} fallback="📦" size={34} />}
                            <span
                              className={`text-xs font-semibold leading-relaxed ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-100'
                              }`}
                            >
                              {step.text}
                            </span>
                          </button>

                          {/* Botões de Ação Direta (Ver no Mapa / Jogar na Mochila) */}
                          {(step.mapLayerId || step.recipeId) && (
                            <div className="flex items-center gap-2 pl-7 flex-wrap">
                              {step.mapLayerId && (
                                <button
                                  onClick={() => onJumpToMapLayer(step.mapLayerId)}
                                  className="px-2.5 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold flex items-center gap-1 active:scale-95"
                                >
                                  <MapPin className="w-3.5 h-3.5" /> Localizar no Mapa
                                </button>
                              )}
                              {step.recipeId && (
                                <button
                                  onClick={() => onAddRecipeToCart(step.recipeId)}
                                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 active:scale-95"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Calcular Materiais
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Cofres Dragonkin desta Região com Fotos e Voo Direto */}
                  {chap.vaults.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-amber-300">
                          🏛️ Cofres Dragonkin desta Região
                        </span>
                        <button
                          onClick={() => onJumpToMapLayer('Vaults')}
                          className="text-[11px] font-bold text-amber-400 underline"
                        >
                          Ver todos os 12 no Mapa
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {chap.vaults.map((v) => {
                          const vFull = VAULTS_DB.find((x) => x.order === v.order);
                          return (
                            <div
                              key={v.name}
                              className="flex items-center justify-between text-xs bg-slate-950/80 border border-slate-800 px-2.5 py-2 rounded-xl gap-2.5"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <WikiImg
                                  src={vFull ? wikiImg(vFull.imageFile) : layerImage('Vaults')}
                                  fallback="🏛️"
                                  size={38}
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-white truncate">
                                    #{v.order} {v.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate">{v.area}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => onJumpToMapLayer('Vaults', vFull?.coords)}
                                className="px-2 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-bold shrink-0 flex items-center gap-1 active:scale-95"
                              >
                                <MapPin className="w-3 h-3" /> Mapa
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VaultsView({ onJumpToMapLayer, searchQuery = '' }) {
  const [openVaultId, setOpenVaultId] = useState(1);
  const q = searchQuery.trim().toLowerCase();
  const list = VAULTS_DB.filter(
    (v) =>
      !q ||
      (
        (v.name || '') +
        ' ' +
        (v.region || '') +
        ' ' +
        (v.area || '') +
        ' ' +
        (v.blueprints || []).join(' ') +
        ' ' +
        (v.enemies || '')
      )
        .toLowerCase()
        .includes(q)
  );
  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-2.5">
      <div className="text-[11px] font-semibold text-slate-400 px-1">
        Toque em qualquer Cofre para abrir o <strong className="text-amber-300">passo a passo e projetos</strong>:
      </div>
      <div className="space-y-2.5">
        {list.map((v) => {
          const isOpen = openVaultId === v.order || !!q;
          return (
            <div
              key={v.order}
              className="bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              {/* Cabeçalho Compacto do Cofre (Escaneável em 1 segundo!) */}
              <div className="p-3 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => setOpenVaultId(isOpen ? null : v.order)}
                  className="flex items-center gap-3 text-left min-w-0 flex-1"
                >
                  <WikiImg src={wikiImg(v.imageFile)} fallback="🏛️" size={50} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold">
                        Cofre #{v.order} • Nv. {v.power}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold truncate">
                        {v.region} ({v.area})
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white mt-0.5 truncate">{v.name}</h3>
                    <p className="text-[11px] text-amber-200/90 truncate mt-0.5">
                      📘 {v.blueprints.join(' • ')}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onJumpToMapLayer('Vaults', v.coords)}
                    className="px-2.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1 active:scale-95"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mapa</span>
                  </button>
                  <button
                    onClick={() => setOpenVaultId(isOpen ? null : v.order)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Detalhes do Cofre sob Demanda */}
              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-800/80 space-y-2.5 bg-slate-950/40">
                  <div className="text-xs bg-amber-500/10 border border-amber-500/25 rounded-xl p-2.5 space-y-1">
                    <div className="font-extrabold text-amber-300">
                      📘 Projetos & Recompensas neste Cofre:
                    </div>
                    {v.blueprints.map((b) => (
                      <div key={b} className="text-slate-200">
                        • {b}
                      </div>
                    ))}
                    <div className="text-slate-400 pt-1">
                      ⚙️ {v.cores} Núcleos de Cofre • 📦 {v.chests} baús
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 leading-relaxed">
                    ⚔️ <strong>Inimigos:</strong> {v.enemies}
                    <br />
                    🧭 <strong>Como fazer:</strong> {v.walkthrough}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestsView({ onJumpToMapLayer, onAddRecipeToCart, searchQuery = '' }) {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dw_quests_done') || '{}');
    } catch {
      return {};
    }
  });
  const [type, setType] = useState('Todas');
  const [regionFilter, setRegionFilter] = useState('Todas');
  const [openQuestId, setOpenQuestId] = useState(null);

  const toggle = (id) =>
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('dw_quests_done', JSON.stringify(next));
      return next;
    });

  const q = searchQuery.trim().toLowerCase();
  const regionOptions = [
    'Todas',
    'Brynmoor',
    'Ghornfell',
    'Fellhollow',
    'Alcance de Dowdun',
    'Areias Umbrais',
    'Ermos',
  ];

  const list = QUESTS_DB.filter((x) => {
    const matchType = type === 'Todas' || x.type === type;
    const matchReg =
      regionFilter === 'Todas' ||
      (x.region || '').toLowerCase().includes(regionFilter.toLowerCase());
    const matchQuery =
      !q ||
      (
        (x.name || '') +
        ' ' +
        (x.region || '') +
        ' ' +
        (x.npc || '') +
        ' ' +
        (x.reward || '') +
        ' ' +
        (x.summary || '') +
        ' ' +
        (x.req || '') +
        ' ' +
        (x.itemsNeeded || '') +
        ' ' +
        (x.steps || []).join(' ')
      )
        .toLowerCase()
        .includes(q);
    return matchType && matchReg && matchQuery;
  });

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* Filtros de Tipo e Região */}
      <div className="space-y-2 bg-[#0b1322]/90 border border-slate-800/80 rounded-2xl p-3 shadow-md">
        <div className="flex gap-1.5 items-center flex-wrap">
          {['Todas', 'Principal', 'Secundária'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${
                type === t
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {t === 'Todas' ? `Todas (${QUESTS_DB.length})` : t}
            </button>
          ))}
          <span className="ml-auto text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl">
            ✅ {Object.values(done).filter(Boolean).length}/{QUESTS_DB.length} feitas
          </span>
        </div>

        <ScrollStrip allowWrapToggle={true}>
          {regionOptions.map((reg) => (
            <button
              key={reg}
              onClick={() => setRegionFilter(reg)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition active:scale-95 ${
                regionFilter === reg
                  ? 'bg-sky-500 text-slate-950 border-sky-300 font-black shadow'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {reg === 'Todas' ? '🌍 Todas as Regiões' : reg}
            </button>
          ))}
        </ScrollStrip>
      </div>

      <div className="text-[11px] font-semibold text-slate-400 px-1">
        Toque em qualquer Missão para abrir o <strong className="text-amber-300">passo a passo, senhas e itens necessários</strong>:
      </div>

      {/* Lista Compacta de Missões (Acordeão: Toque para abrir!) */}
      <div className="space-y-2">
        {list.map((x) => {
          const isOpen = openQuestId === x.id || (!!q && list.length <= 5);
          const rewardItem = x.rewardWikiName ? BY_NAME[x.rewardWikiName] : null;
          const rewardRec = rewardItem?.r?.[0];

          return (
            <div
              key={x.id}
              className={`bg-slate-900/95 border rounded-2xl overflow-hidden transition ${
                done[x.id] ? 'border-emerald-500/30 opacity-70' : 'border-slate-800'
              }`}
            >
              {/* Cabeçalho Compacto da Missão */}
              <div className="p-3 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => toggle(x.id)}
                  title={done[x.id] ? 'Desmarcar missão' : 'Marcar missão como concluída'}
                  className="shrink-0 text-slate-400 hover:text-emerald-400 p-1"
                >
                  {done[x.id] ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => setOpenQuestId(isOpen ? null : x.id)}
                  className="flex items-center gap-2.5 text-left min-w-0 flex-1"
                >
                  <WikiImg src={wikiImg(x.rewardImg)} fallback="📜" size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          x.type === 'Principal'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        }`}
                      >
                        {x.type}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 truncate">
                        • {x.region}
                      </span>
                    </div>
                    <h3
                      className={`text-sm font-extrabold text-white mt-0.5 truncate ${
                        done[x.id] ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {x.name}
                    </h3>
                    <p className="text-[11px] text-emerald-300/90 truncate mt-0.5">
                      🎁 {x.reward}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setOpenQuestId(isOpen ? null : x.id)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-extrabold flex items-center gap-1 shrink-0"
                >
                  <span>{isOpen ? 'Fechar' : 'Guia'}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Detalhes Completos da Missão (Abertos sob demanda!) */}
              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-2.5 border-t border-slate-800/80 space-y-2.5 bg-slate-950/40">
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                    <span className="text-sky-300 font-semibold">
                      🗣️ Onde iniciar: <strong className="text-white">{x.npc.trim()}</strong>
                    </span>
                    {(x.npcMapKey || x.coords) && (
                      <button
                        onClick={() => onJumpToMapLayer(x.npcMapKey || 'NPCs', x.coords)}
                        className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Localizar no Mapa
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{x.summary}</p>

                  {x.req && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-200">
                      🛠️ <strong className="text-amber-300">Equipamento Mínimo:</strong> {x.req}
                    </div>
                  )}

                  {x.itemsNeeded && (
                    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 space-y-2 text-xs">
                      <div className="text-slate-200">
                        🎒 <strong className="text-sky-300">Itens Necessários:</strong>{' '}
                        {x.itemsNeeded}
                      </div>
                      {x.craftItems && x.craftItems.length > 0 && onAddRecipeToCart && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {x.craftItems.map((ci) => {
                            const cItem = BY_NAME[ci];
                            if (!cItem) return null;
                            return (
                              <button
                                key={ci}
                                onClick={() => onAddRecipeToCart(wikiRecipeId(ci))}
                                className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1.5 active:scale-95"
                              >
                                <WikiImg src={wikiImg(cItem.img)} fallback="🔨" size={18} />
                                <Plus className="w-3.5 h-3.5" />
                                <span>Calcular {cItem.pt} na Mochila</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {x.steps && x.steps.length > 0 && (
                    <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 space-y-1.5">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                        🧭 Passo a Passo ({x.steps.length} etapas):
                      </div>
                      <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                        {x.steps.map((st, idx) => (
                          <li key={idx} className="pl-0.5">
                            <span className="text-slate-200">{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Recompensa + Como Forjar/Criar o Item Desbloqueado */}
                  <div className="text-xs text-emerald-200 bg-emerald-950/30 border border-emerald-500/25 rounded-xl p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        🎁 <strong className="text-emerald-300">Recompensa:</strong> {x.reward}
                      </div>
                      {rewardRec && onAddRecipeToCart && (
                        <button
                          onClick={() => onAddRecipeToCart(wikiRecipeId(x.rewardWikiName))}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 shrink-0 active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Calcular {rewardItem.pt} na Mochila</span>
                        </button>
                      )}
                    </div>

                    {rewardRec && (
                      <div className="bg-slate-950/85 border border-emerald-500/20 rounded-lg p-2.5 space-y-1.5">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                          🔨 Como criar {rewardItem.pt} ({FACILITY_PT[rewardRec.f] || rewardRec.f}):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {rewardRec.m.map(([mn, mq]) => {
                            const rInfo = RAW_INFO[mn];
                            const subRec = BY_NAME[mn]?.r?.[0];
                            const mLayer = RAW_MAP_LAYER[mn];
                            return (
                              <div
                                key={mn}
                                className="bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 flex items-start justify-between gap-2"
                              >
                                <div className="flex items-start gap-2 min-w-0">
                                  <WikiImg src={matImageUrl(mn)} fallback="📦" size={20} />
                                  <div className="min-w-0">
                                    <div className="text-[11px] font-bold text-white">
                                      <span className="text-amber-400 font-extrabold">{mq}x</span>{' '}
                                      {ptName(mn)}
                                    </div>
                                    {rInfo?.where && (
                                      <div className="text-[10px] text-slate-400 leading-tight">
                                        📍 {rInfo.where}
                                      </div>
                                    )}
                                    {rInfo?.toolReq && (
                                      <div className="text-[10px] text-amber-300/90 font-semibold leading-tight">
                                        {rInfo.toolReq}
                                      </div>
                                    )}
                                    {subRec && (
                                      <div className="text-[10px] text-sky-300 leading-tight">
                                        ⚙️ {FACILITY_PT[subRec.f] || subRec.f}:{' '}
                                        {subRec.m
                                          .map(([sn, sq]) => `${sq}x ${ptName(sn)}`)
                                          .join(' + ')}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {mLayer && onJumpToMapLayer && (
                                  <button
                                    onClick={() => onJumpToMapLayer(mLayer)}
                                    className="px-1.5 py-1 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[10px] font-bold shrink-0 flex items-center gap-0.5"
                                  >
                                    <MapPin className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProgressionGuide(props) {
  const [mode, setMode] = useState('roteiro');
  useEffect(() => {
    if (props.externalMode) {
      setMode(props.externalMode);
    }
  }, [props.externalMode]);
  const tabs = [
    ['roteiro', '🧭 Roteiro'],
    ['vaults', '🏛️ Cofres'],
    ['quests', '📜 Missões'],
    ['trofeus', '🏆 Troféus (50)'],
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-4 gap-1 bg-[#0b1322]/90 p-1 mx-3 mt-3 rounded-2xl border border-slate-800/80 shadow-md shrink-0">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`py-2 px-1 rounded-xl font-black text-xs transition active:scale-95 truncate ${
              mode === id
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        {mode === 'roteiro' && <Roteiro {...props} />}
        {mode === 'vaults' && <VaultsView {...props} />}
        {mode === 'quests' && <QuestsView {...props} />}
        {mode === 'trofeus' && <TrophiesGuide {...props} />}
      </div>
    </div>
  );
}
