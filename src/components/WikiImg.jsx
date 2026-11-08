import React, { useState } from 'react';

// Imagem oficial da Wiki com fallback (emoji/texto) caso o arquivo não exista
export default function WikiImg({ src, fallback = '📦', size = 36, className = '' }) {
  const [failed, setFailed] = useState(false);
  const box = { width: size, height: size };
  if (!src || failed) {
    return (
      <div
        style={box}
        className={`flex items-center justify-center rounded-lg bg-slate-800 shrink-0 ${className}`}
      >
        <span style={{ fontSize: size * 0.5 }}>{fallback}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      style={box}
      onError={() => setFailed(true)}
      className={`object-contain rounded-lg bg-slate-800/80 p-0.5 shrink-0 ${className}`}
    />
  );
}
