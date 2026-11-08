// Rolagem horizontal no PC: roda do mouse + arrastar com o mouse nas barras ".no-scrollbar"
export function installDragScroll() {
  const findScroller = (el) => {
    while (el && el !== document.body) {
      if (el.classList?.contains('no-scrollbar') && el.scrollWidth > el.clientWidth + 2) return el;
      el = el.parentElement;
    }
    return null;
  };

  document.addEventListener(
    'wheel',
    (e) => {
      const el = findScroller(e.target);
      if (!el || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    },
    { passive: false }
  );

  let el = null;
  let startX = 0;
  let startLeft = 0;
  let moved = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    el = findScroller(e.target);
    if (!el) return;
    startX = e.clientX;
    startLeft = el.scrollLeft;
    moved = false;
  });
  document.addEventListener('mousemove', (e) => {
    if (!el) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    if (moved) {
      el.scrollLeft = startLeft - dx;
      el.style.cursor = 'grabbing';
    }
  });
  const end = () => {
    if (el) el.style.cursor = '';
    el = null;
  };
  document.addEventListener('mouseup', end);
  // Evita disparar clique em botão depois de arrastar
  document.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    },
    true
  );
}
