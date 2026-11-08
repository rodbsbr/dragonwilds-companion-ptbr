import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

/**
 * Barra de opções inteligente para PC e Celular:
 * - No celular: deslize suave com o polegar + botão opcional "Ver Todos" (Grade)
 * - No PC: botões visíveis ◀ e ▶ nas laterais + roda do mouse + arrastar com o mouse + botão "Grade"
 */
export default function ScrollStrip({
  children,
  className = '',
  allowWrapToggle = true,
  defaultWrapped = false,
}) {
  const scrollerRef = useRef(null);
  const [wrapped, setWrapped] = useState(defaultWrapped);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el || wrapped) {
      setCanLeft(false);
      setCanRight(false);
      return;
    }
    setCanLeft(el.scrollLeft > 6);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [wrapped, children]);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  return (
    <div className={`relative flex items-center gap-1 ${className}`}>
      {!wrapped && canLeft && (
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          title="Rolar para a esquerda"
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-slate-700 flex items-center justify-center shrink-0 shadow-md transition active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollerRef}
        className={
          wrapped
            ? 'flex flex-wrap items-center gap-1.5 flex-1'
            : 'flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 scroll-smooth py-0.5'
        }
      >
        {children}
      </div>

      {!wrapped && canRight && (
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          title="Rolar para a direita"
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-slate-700 flex items-center justify-center shrink-0 shadow-md transition active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {allowWrapToggle && (canLeft || canRight || wrapped) && (
        <button
          type="button"
          onClick={() => setWrapped(!wrapped)}
          title={wrapped ? 'Compactar em uma linha' : 'Expandir todas as opções na tela'}
          className={`px-2 py-1.5 rounded-lg text-[10px] font-extrabold border flex items-center gap-1 shrink-0 transition active:scale-95 ${
            wrapped
              ? 'bg-amber-500 text-slate-950 border-amber-300'
              : 'bg-slate-800/90 text-slate-300 hover:text-white border-slate-700'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{wrapped ? 'Compactar' : 'Ver Tudo'}</span>
        </button>
      )}
    </div>
  );
}
