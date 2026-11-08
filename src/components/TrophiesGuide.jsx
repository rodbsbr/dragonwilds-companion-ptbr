import React, { useState, useMemo, useEffect } from 'react';
import { TROPHIES_DB } from '../data/trophiesData';
import ScrollStrip from './ScrollStrip';
import {
  Trophy,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from 'lucide-react';

export default function TrophiesGuide({ searchQuery = '' }) {
  // Estado de troféus concluídos salvo localmente no navegador
  const [completedTrophies, setCompletedTrophies] = useState(() => {
    try {
      const saved = localStorage.getItem('dragonwilds_trophies_done');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedCat, setSelectedCat] = useState('todas');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [openCardId, setOpenCardId] = useState(null);

  // Persistir no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dragonwilds_trophies_done', JSON.stringify(completedTrophies));
    } catch {
      // Ignora erro de cota
    }
  }, [completedTrophies]);

  const toggleTrophy = (id) => {
    setCompletedTrophies((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
  };

  const categories = [
    { id: 'todas', label: 'Todos (50)' },
    { id: 'secretos', label: '🤫 Secretos (6)' },
    { id: 'feitiços', label: '🪄 Feitiços & Combos (8)' },
    { id: 'chefes', label: '👑 Chefes (5)' },
    { id: 'missões', label: '📜 Missões (5)' },
    { id: 'mestria', label: '⭐ Mestria 99 (12)' },
    { id: 'iniciante', label: '🔰 Básicos (14)' },
  ];

  const totalDone = useMemo(() => {
    return Object.values(completedTrophies).filter(Boolean).length;
  }, [completedTrophies]);

  const isPlatinum = totalDone === TROPHIES_DB.length;
  const pct = Math.round((totalDone / TROPHIES_DB.length) * 100);

  // Contadores por raridade
  const { bronzeDone, bronzeTotal, silverDone, silverTotal, goldDone, goldTotal } = useMemo(() => {
    let bD = 0, bT = 0, sD = 0, sT = 0, gD = 0, gT = 0;
    TROPHIES_DB.forEach((t) => {
      const done = !!completedTrophies[t.id];
      if (t.grade === 'Bronze') {
        bT++;
        if (done) bD++;
      } else if (t.grade === 'Prata') {
        sT++;
        if (done) sD++;
      } else if (t.grade === 'Ouro') {
        gT++;
        if (done) gD++;
      }
    });
    return { bronzeDone: bD, bronzeTotal: bT, silverDone: sD, silverTotal: sT, goldDone: gD, goldTotal: gT };
  }, [completedTrophies]);

  const q = (searchQuery || '').trim().toLowerCase();

  const filteredList = useMemo(() => {
    return TROPHIES_DB.filter((t) => {
      const matchesCat = selectedCat === 'todas' || t.category === selectedCat;
      const isDone = !!completedTrophies[t.id];
      if (hideCompleted && isDone) return false;

      if (!q) return matchesCat;

      const blob = [
        t.name || '',
        t.namePt || '',
        t.officialReq || '',
        t.howTo || '',
        t.ps5Tip || '',
        t.grade || '',
      ]
        .join(' ')
        .toLowerCase();

      return matchesCat && blob.includes(q);
    });
  }, [selectedCat, hideCompleted, q, completedTrophies]);

  return (
    <div className="h-full overflow-y-auto pb-28 px-3 pt-3 space-y-3">
      {/* Banner de Progresso da Platina PS5 */}
      <div className="bg-[#0b1322]/95 border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(245,158,11,0.4)] text-slate-950 font-black shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">Guia de Troféus PS5</h2>
                {isPlatinum ? (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/25 border border-purple-400/50 text-purple-300 text-[10px] font-black uppercase tracking-wider animate-pulse">
                    PLATINADO!
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase">
                    Rumo à Platina
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isPlatinum
                  ? 'Parabéns! Todos os 50 troféus foram conquistados no PS5.'
                  : `Faltam ${TROPHIES_DB.length - totalDone} troféus para conquistar a Platina.`}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-sm font-black text-amber-400">
              {totalDone}/{TROPHIES_DB.length}
            </div>
            <div className="text-[11px] font-black text-slate-400">{pct}%</div>
          </div>
        </div>

        {/* Barra de Progresso Dourada */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isPlatinum
                ? 'bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Contadores de Raridade (Bronze, Prata, Ouro) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-black text-[#cd7f32] uppercase">🥉 Bronze</div>
            <div className="text-xs font-black text-slate-200 mt-0.5">
              {bronzeDone}/{bronzeTotal}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-black text-slate-300 uppercase">🥈 Prata</div>
            <div className="text-xs font-black text-slate-200 mt-0.5">
              {silverDone}/{silverTotal}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-black text-amber-400 uppercase">🥇 Ouro</div>
            <div className="text-xs font-black text-slate-200 mt-0.5">
              {goldDone}/{goldTotal}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de Categorias & Ocultar Feitos */}
      <div className="space-y-2 bg-[#0b1322]/90 border border-slate-800/80 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filtrar Troféus</span>
          </span>
          <button
            onClick={() => setHideCompleted(!hideCompleted)}
            className={`px-3 py-1 rounded-xl text-xs font-bold border transition active:scale-95 ${
              hideCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-black'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {hideCompleted ? '✓ Ocultando Concluídos' : 'Ocultar Concluídos'}
          </button>
        </div>

        <ScrollStrip allowWrapToggle={true}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 ${
                selectedCat === c.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </ScrollStrip>
      </div>

      {/* Lista de Troféus */}
      <div className="space-y-2.5">
        {filteredList.map((t) => {
          const isDone = !!completedTrophies[t.id];
          const isOpen = openCardId === t.id || !!q;

          return (
            <div
              key={t.id}
              className={`bg-[#0b1322]/95 border rounded-2xl p-3.5 space-y-2.5 transition shadow-lg ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-950/15 opacity-80'
                  : 'border-slate-800/80 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Botão de Checkbox grande para sofá */}
                <button
                  onClick={() => toggleTrophy(t.id)}
                  title={isDone ? 'Desmarcar troféu' : 'Marcar como conquistado'}
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 flex items-center justify-center shrink-0 active:scale-90 transition mt-0.5"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500 hover:text-slate-300" />
                  )}
                </button>

                {/* Conteúdo Principal do Troféu */}
                <div
                  onClick={() => setOpenCardId(isOpen ? null : t.id)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        t.grade === 'Ouro'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : t.grade === 'Prata'
                          ? 'bg-slate-400/20 text-slate-200 border border-slate-400/40'
                          : 'bg-[#cd7f32]/20 text-[#e09858] border border-[#cd7f32]/40'
                      }`}
                    >
                      {t.grade === 'Ouro' ? '🥇 Ouro' : t.grade === 'Prata' ? '🥈 Prata' : '🥉 Bronze'}
                    </span>

                    {t.secret && (
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/35 text-[10px] font-black">
                        🤫 Oculto no PS5
                      </span>
                    )}

                    <span className="text-[11px] font-bold text-slate-400">
                      • {t.name}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-black mt-1 leading-snug flex items-center gap-1.5 ${
                      isDone ? 'line-through text-slate-400' : 'text-white'
                    }`}
                  >
                    <span>{t.badge}</span>
                    <span>{t.namePt}</span>
                  </h3>

                  <p className="text-xs text-slate-300 leading-snug mt-1 font-medium">
                    {t.officialReq}
                  </p>
                </div>

                {/* Botão de Expandir Guia */}
                <button
                  onClick={() => setOpenCardId(isOpen ? null : t.id)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white shrink-0 self-start"
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Guia Passo a Passo & Dica PS5 (Aberto por padrão na busca ou toque) */}
              {isOpen && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2 animate-fadeIn text-xs">
                  <div className="bg-slate-950/90 border border-amber-500/30 rounded-xl p-2.5 space-y-1">
                    <div className="font-black text-amber-300 uppercase tracking-wide text-[10px] flex items-center gap-1">
                      <span>💡 Como Conquistar:</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {t.howTo}
                    </p>
                  </div>

                  {t.ps5Tip && (
                    <div className="bg-sky-950/30 border border-sky-500/25 rounded-xl p-2.5 flex items-center gap-2 text-sky-200 leading-snug">
                      <span className="text-base shrink-0">🎮</span>
                      <div>
                        <strong className="text-sky-300 font-black">Dica no PS5:</strong> {t.ps5Tip}
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
