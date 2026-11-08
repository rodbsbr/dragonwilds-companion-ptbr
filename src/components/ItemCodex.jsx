import React, { useMemo, useState } from 'react';
import { Plus, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import WikiImg from './WikiImg';
import ScrollStrip from './ScrollStrip';
import { wikiImg, recipeImage, materialImage } from '../data/images';
import { MATERIALS_DB, RECIPES_DB } from '../data/gameData';
import {
  CODEX_ITEMS,
  CODEX_CATEGORIES,
  FACILITY_PT,
  RAW_INFO,
  RAW_MAP_LAYER,
  BY_NAME,
  ptName,
  matImageUrl,
  wikiRecipeId,
} from '../data/codex';

const PAGE = 36;

function Stat({ label, value, tone = 'slate' }) {
  if (value === undefined || value === null || value === '') return null;
  const tones = {
    slate: 'bg-slate-800 text-slate-200',
    rose: 'bg-rose-500/15 text-rose-300',
    sky: 'bg-sky-500/15 text-sky-300',
    amber: 'bg-amber-500/15 text-amber-300',
    emerald: 'bg-emerald-500/15 text-emerald-300',
    purple: 'bg-purple-500/15 text-purple-300',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${tones[tone]}`}>
      {label} {value}
    </span>
  );
}

function ItemCard({ item, inCart, onAdd, onJumpToMapLayer }) {
  const [expanded, setExpanded] = useState(false);
  const rec = item.r?.[0];
  const altRecs = item.r?.slice(1) || [];
  const rawSelf = RAW_INFO[item.n];

  return (
    <div className="bg-slate-900/95 border border-slate-800 hover:border-slate-700 rounded-2xl p-3 space-y-2 flex flex-col justify-between transition">
      <div className="space-y-2">
        {/* Linha Principal Compacta (Escaneável em 1 segundo!) */}
        <div className="flex items-start gap-2.5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-start gap-2.5 text-left min-w-0 flex-1"
          >
            <WikiImg src={wikiImg(item.img)} fallback="📦" size={48} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.p && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase">
                    Nv. {item.p}
                  </span>
                )}
                {item.st && (
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 text-[10px] font-bold">
                    {item.st}
                  </span>
                )}
                {rec && (
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    • {FACILITY_PT[rec.f] || rec.f}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-extrabold text-white leading-snug mt-0.5">{item.pt}</h4>

              {/* Resumo Rápido de 1 Linha: Atributo Principal + Ingredientes */}
              <div className="flex flex-wrap gap-1 mt-1">
                <Stat label="⚔️" value={item.dmg} tone="rose" />
                <Stat label="🛡️" value={item.md} tone="amber" />
                <Stat label="🏹" value={item.rd} tone="emerald" />
                <Stat label="✨" value={item.gd} tone="purple" />
                <Stat label="❤️" value={item.hp && `+${item.hp}`} tone="rose" />
                <Stat label="🍖" value={item.su && `+${item.su}`} tone="amber" />
              </div>
            </div>
          </button>

          {rec ? (
            <button
              onClick={() => onAdd(wikiRecipeId(item.n), item.pt)}
              className={`px-3 py-2 rounded-xl font-extrabold text-xs shrink-0 flex items-center gap-1 active:scale-95 transition ${
                inCart
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{inCart ? `(${inCart})` : '+ Farm'}</span>
            </button>
          ) : (
            rawSelf?.mapLayer &&
            onJumpToMapLayer && (
              <button
                onClick={() => onJumpToMapLayer(rawSelf.mapLayer)}
                className="px-2.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-extrabold text-xs shrink-0 flex items-center gap-1 active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Mapa</span>
              </button>
            )
          )}
        </div>

        {/* Resumo compacto de ingredientes ou coleta + Botão "Ver Onde Pegar" */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800/90 text-left text-[11px] transition"
        >
          <span className="text-slate-300 truncate">
            {rec ? (
              <>
                <strong className="text-amber-400">Usa:</strong>{' '}
                {rec.m.map(([n, q]) => `${q}x ${ptName(n)}`).join(' + ')}
              </>
            ) : rawSelf ? (
              <>
                <strong className="text-amber-400">📍</strong> {rawSelf.where}
              </>
            ) : (
              item.d || 'Toque para ver detalhes'
            )}
          </span>
          <span className="text-amber-400 font-extrabold shrink-0 flex items-center gap-0.5 text-[10px]">
            <span>{expanded ? 'Ocultar' : 'Onde pegar'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>
      </div>

      {/* Área Expandida sob Demanda (Sem poluir a tela até o jogador tocar!) */}
      {expanded && (
        <div className="pt-2 border-t border-slate-800 space-y-2 animate-fadeIn">
          {rawSelf && (
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-xl p-2.5 space-y-1 text-[11px]">
              <div className="text-slate-200">
                📍 <strong className="text-amber-300">Onde pegar:</strong> {rawSelf.where}
              </div>
              {rawSelf.toolReq && (
                <div className="text-amber-300 font-bold">{rawSelf.toolReq}</div>
              )}
            </div>
          )}

          {item.sb && (
            <div className="text-[11px] text-emerald-200 bg-emerald-950/30 border border-emerald-500/25 rounded-xl p-2.5 space-y-0.5">
              <div className="font-extrabold text-emerald-300">🧩 Bônus de Conjunto (3/3 Peças)</div>
              {item.sb.map((b) => (
                <div key={b}>• {b}</div>
              ))}
            </div>
          )}

          {item.sp && (
            <div className="text-[11px] text-sky-200 bg-sky-950/30 border border-sky-500/25 rounded-xl p-2.5 leading-relaxed">
              ✨ <strong>Efeito Especial:</strong> {item.sp}
            </div>
          )}

          {rec && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>🔨 Passo a Passo ({FACILITY_PT[rec.f] || rec.f})</span>
                {rec.o > 1 && <span className="text-amber-300">Produz {rec.o}x</span>}
              </div>
              <div className="space-y-1.5">
                {rec.m.map(([n, q]) => {
                  const mapLayer = RAW_MAP_LAYER[n];
                  const rawMeta = RAW_INFO[n];
                  const subItem = BY_NAME[n];
                  const subRec = subItem?.r?.[0];

                  return (
                    <div
                      key={n}
                      className="p-2 rounded-xl bg-slate-950/90 border border-slate-800/90 text-[11px] space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <WikiImg src={matImageUrl(n)} fallback="📦" size={22} />
                          <strong className="text-amber-400">{q}x</strong>
                          <span className="font-bold text-slate-100 truncate">{ptName(n)}</span>
                        </div>
                        {mapLayer && onJumpToMapLayer && (
                          <button
                            onClick={() => onJumpToMapLayer(mapLayer)}
                            className="px-2 py-0.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1 shrink-0"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>Mapa</span>
                          </button>
                        )}
                      </div>

                      {rawMeta && (
                        <div className="pl-7 space-y-0.5 text-[10px]">
                          <div className="text-slate-400 leading-tight">📍 {rawMeta.where}</div>
                          {rawMeta.toolReq && (
                            <div className="text-amber-300/95 font-semibold leading-tight">
                              {rawMeta.toolReq}
                            </div>
                          )}
                        </div>
                      )}

                      {subRec && (
                        <div className="pl-7 space-y-1 text-[10px] border-l-2 border-sky-500/30 ml-2">
                          <div className="text-sky-300 font-semibold">
                            ⚙️ Feito em {FACILITY_PT[subRec.f] || subRec.f} (cada {subRec.o || 1}x usa):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {subRec.m.map(([sn, sq]) => {
                              const sRaw = RAW_INFO[sn];
                              const sMap = RAW_MAP_LAYER[sn];
                              return (
                                <div
                                  key={sn}
                                  className="bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-0.5"
                                >
                                  <div className="flex items-center gap-1 text-slate-200 font-bold">
                                    <WikiImg src={matImageUrl(sn)} fallback="📦" size={16} />
                                    <span className="text-amber-400">{sq}x</span>
                                    <span>{ptName(sn)}</span>
                                    {sMap && onJumpToMapLayer && (
                                      <button
                                        onClick={() => onJumpToMapLayer(sMap)}
                                        className="text-sky-400 hover:text-sky-300 ml-0.5"
                                      >
                                        <MapPin className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                  {sRaw?.where && (
                                    <div className="text-[9px] text-slate-400">📍 {sRaw.where}</div>
                                  )}
                                  {sRaw?.toolReq && (
                                    <div className="text-[9px] text-amber-300/90 font-semibold">
                                      {sRaw.toolReq}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {altRecs.length > 0 && (
                <div className="text-[10px] text-sky-300 bg-sky-950/30 border border-sky-500/20 rounded-lg px-2.5 py-1.5 space-y-0.5">
                  {altRecs.map((ar, idx) => (
                    <div key={idx}>
                      💡 <strong>Alternativa ({FACILITY_PT[ar.f] || ar.f}):</strong>{' '}
                      {ar.m.map(([mn, mq]) => `${mq}x ${ptName(mn)}`).join(' + ')}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ItemCodex({ cart, addWikiToCart, onJumpToMapLayer, searchQuery }) {
  const [cat, setCat] = useState('bancadas');
  const [style, setStyle] = useState('Todos');
  const [limit, setLimit] = useState(PAGE);

  const q = (searchQuery || '').trim().toLowerCase();

  const allCategories = useMemo(
    () => [['bancadas', '🏠 Bancadas & Kits'], ...CODEX_CATEGORIES],
    []
  );

  const list = useMemo(() => {
    if (!q && cat === 'bancadas') return [];
    const base = CODEX_ITEMS.filter((i) => (q ? true : i.c === cat));
    return base
      .filter((i) =>
        q
          ? (i.n + ' ' + i.pt + ' ' + (i.sp || '') + ' ' + (i.as || '') + ' ' + (i.dt || ''))
              .toLowerCase()
              .includes(q)
          : true
      )
      .filter((i) => (cat === 'armadura' && !q && style !== 'Todos' ? i.st === style : true))
      .sort((a, b) => (Number(a.p) || 0) - (Number(b.p) || 0) || a.pt.localeCompare(b.pt));
  }, [cat, style, q]);

  const filteredStations = useMemo(() => {
    if (!q && cat !== 'bancadas') return [];
    return RECIPES_DB.filter((r) => {
      if (!q) return true;
      return (
        (r.name || '').toLowerCase().includes(q) ||
        (r.tier || '').toLowerCase().includes(q) ||
        (r.note || '').toLowerCase().includes(q)
      );
    });
  }, [cat, q]);

  return (
    <div className="space-y-3">
      {!q && (
        <ScrollStrip allowWrapToggle={true} defaultWrapped={false}>
          {allCategories.map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setCat(id);
                setStyle('Todos');
                setLimit(PAGE);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition active:scale-95 ${
                cat === id
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </ScrollStrip>
      )}

      {!q && cat === 'armadura' && (
        <div className="flex flex-wrap gap-1.5">
          {['Todos', 'Corpo a Corpo', 'À Distância', 'Mágica'].map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                style === s
                  ? 'bg-sky-500 text-slate-950 border-sky-300'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Seção de Bancadas & Kits Essenciais */}
      {filteredStations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredStations.map((recipe) => {
            const inCartQty = cart[recipe.id] || 0;
            return (
              <div
                key={recipe.id}
                className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <WikiImg src={recipeImage(recipe.id)} fallback="🔨" size={46} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase">
                          {recipe.tier}
                        </span>
                        <span className="text-[10px] text-slate-400">{recipe.station}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white mt-0.5">{recipe.name}</h4>
                      <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{recipe.note}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => addWikiToCart(recipe.id)}
                    className={`px-3 py-2 rounded-xl font-extrabold text-xs shrink-0 flex items-center gap-1 active:scale-95 transition ${
                      inCartQty > 0
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-amber-500 text-slate-950'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{inCartQty > 0 ? `(${inCartQty})` : '+ Farm'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {recipe.ingredients.map((ing) => {
                    const mat = MATERIALS_DB[ing.id];
                    return (
                      <span
                        key={ing.id}
                        className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200 flex items-center gap-1"
                      >
                        <WikiImg
                          src={materialImage(ing.id)}
                          fallback={mat?.icon || '📦'}
                          size={18}
                        />
                        <strong className="text-amber-400">{ing.qty}x</strong>
                        <span>{mat?.name || ing.id}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lista de Itens do Códice (Compacta com expansão ao tocar!) */}
      {list.length > 0 && (
        <>
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>
              Toque em qualquer item para abrir <strong className="text-amber-300">Onde pegar & Como fazer</strong> ({list.length} itens)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {list.slice(0, limit).map((item) => (
              <ItemCard
                key={item.n}
                item={item}
                inCart={cart[wikiRecipeId(item.n)] || 0}
                onAdd={addWikiToCart}
                onJumpToMapLayer={onJumpToMapLayer}
              />
            ))}
          </div>

          {list.length > limit && (
            <button
              onClick={() => setLimit(limit + PAGE)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-extrabold active:scale-95"
            >
              Mostrar mais itens ({list.length - limit} restantes)
            </button>
          )}
        </>
      )}
    </div>
  );
}
