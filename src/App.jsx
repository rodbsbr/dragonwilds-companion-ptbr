import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import AshenfallMap from './components/AshenfallMap';
import { getMat, isWikiId, ptName, CODEX_ITEMS, calculateExpeditionTree } from './data/codex';
import ScrollStrip from './components/ScrollStrip';

const CraftingPlanner = lazy(() => import('./components/CraftingPlanner'));
const ProgressionGuide = lazy(() => import('./components/ProgressionGuide'));
const BestiarySpells = lazy(() => import('./components/BestiarySpells'));
const GuidesAndShops = lazy(() => import('./components/GuidesAndShops'));
import {
  MATERIALS_DB,
  RECIPES_DB,
  MAP_LAYERS,
  VAULTS_DB,
  QUESTS_DB,
  MONSTERS_DB,
  SPELLS_DB,
  FOOD_POTIONS_DB,
} from './data/gameData';
import { SKILLS_DB, SHOPS_DB, ENDGAME_DB } from './data/skillsShopsEndgame';
import { TROPHIES_DB } from './data/trophiesData';
import {
  Map,
  Hammer,
  Compass,
  Swords,
  Store,
  Sun,
  Mic,
  Search,
  X,
  Gamepad2,
  Save,
  Copy,
  Upload,
} from 'lucide-react';

class TabErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Tab render error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900/90 text-slate-200">
          <div className="text-3xl">⚠️</div>
          <h3 className="text-sm font-bold text-amber-400">Ocorreu um erro ao exibir esta seção</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Tente limpar a busca atual ou recarregar para continuar a gameplay.
          </p>
          <div className="flex gap-2">
            {this.props.onResetSearch && (
              <button
                onClick={() => {
                  this.props.onResetSearch();
                  this.setState({ hasError: false, error: null });
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Limpar Busca
              </button>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Limpeza de legado da demo antiga: se o usuário ainda tinha o carrinho inicial de exemplo, inicia 100% limpo
    if (
      key === 'dw_cart_v1' &&
      parsed &&
      typeof parsed === 'object' &&
      Object.keys(parsed).length === 2 &&
      parsed.furnace === 1 &&
      parsed.blacksmith_bench === 1
    ) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('mapa'); // 'mapa' | 'forja' | 'progressao' | 'combate' | 'guias'
  const [craftingSubMode, setCraftingSubMode] = useState(null);
  const [progressionSubMode, setProgressionSubMode] = useState(null);
  const [combatSubTab, setCombatSubTab] = useState('monstros');
  const [guidesSubTab, setGuidesSubTab] = useState('lojas');

  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [importCode, setImportCode] = useState('');

  // Estado do Mapa (Inicia 100% limpo, sem marcadores poluindo a tela)
  const [activeLayerIds, setActiveLayerIds] = useState([]);
  const [onlyExpeditionMode, setOnlyExpeditionMode] = useState(false);
  const [mapFocusTarget, setMapFocusTarget] = useState(null);

  // Estados Persistidos no Dispositivo (Inicia vazio para o jogador montar)
  const [cart, setCart] = useState(() =>
    loadStorage('dw_cart_v1', {})
  );
  const [collectedRaw, setCollectedRaw] = useState(() =>
    loadStorage('dw_collected_raw_v1', {})
  );
  const [completedMarkers, setCompletedMarkers] = useState(() =>
    loadStorage('dw_completed_markers_v1', {})
  );
  const [completedSteps, setCompletedSteps] = useState(() =>
    loadStorage('dw_completed_steps_v1', {})
  );
  const [customPins, setCustomPins] = useState(() =>
    loadStorage('dw_custom_pins_v1', [])
  );

  useEffect(() => {
    localStorage.setItem('dw_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dw_collected_raw_v1', JSON.stringify(collectedRaw));
  }, [collectedRaw]);

  useEffect(() => {
    localStorage.setItem('dw_completed_markers_v1', JSON.stringify(completedMarkers));
  }, [completedMarkers]);

  useEffect(() => {
    localStorage.setItem('dw_completed_steps_v1', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('dw_custom_pins_v1', JSON.stringify(customPins));
  }, [customPins]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Calcula quais camadas do mapa correspondem aos materiais que ainda faltam na Mochila de Expedição
  const expeditionLayerIds = useMemo(() => {
    const { rawTotals } = calculateExpeditionTree(cart);
    const layers = new Set();
    Object.entries(rawTotals).forEach(([matId, totalQty]) => {
      const val = collectedRaw[matId];
      const isDone = val === true || (typeof val === 'number' && val >= totalQty);
      if (isDone) return; // já coletado no baú!
      const layerId = getMat(matId)?.mapLayerId;
      if (layerId) layers.add(layerId);
    });
    return Array.from(layers);
  }, [cart, collectedRaw]);

  // Busca Global Inteligente: conta resultados em todas as áreas do app em tempo real
  const globalSearchPills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    try {
      const mapCount = MAP_LAYERS.filter(
        (l) =>
          (l.name || '').toLowerCase().includes(q) ||
          (l.id || '').toLowerCase().includes(q) ||
          (l.region || '').toLowerCase().includes(q) ||
          (l.tip || '').toLowerCase().includes(q)
      ).length;

      const codexCount = CODEX_ITEMS.filter(
        (it) =>
          (it.pt || '').toLowerCase().includes(q) ||
          (it.n || '').toLowerCase().includes(q) ||
          (it.d || '').toLowerCase().includes(q)
      ).length;

      const questsCount = QUESTS_DB.filter(
        (qu) =>
          (qu.name || '').toLowerCase().includes(q) ||
          (qu.region || '').toLowerCase().includes(q) ||
          (qu.npc || '').toLowerCase().includes(q) ||
          (qu.reward || '').toLowerCase().includes(q) ||
          (qu.itemsNeeded || '').toLowerCase().includes(q) ||
          (qu.summary || '').toLowerCase().includes(q) ||
          (qu.steps || []).join(' ').toLowerCase().includes(q)
      ).length;

      const vaultsCount = VAULTS_DB.filter(
        (v) =>
          (v.name || '').toLowerCase().includes(q) ||
          (v.region || '').toLowerCase().includes(q) ||
          (v.area || '').toLowerCase().includes(q) ||
          (v.blueprints || []).join(' ').toLowerCase().includes(q) ||
          (v.walkthrough || '').toLowerCase().includes(q)
      ).length;

      const monstersCount = MONSTERS_DB.filter(
        (m) =>
          (m.name || '').toLowerCase().includes(q) ||
          (m.area || '').toLowerCase().includes(q) ||
          (m.weakness || []).some((w) => (w || '').toLowerCase().includes(q)) ||
          (m.tip || '').toLowerCase().includes(q)
      ).length;

      const spellsCount = SPELLS_DB.filter(
        (s) =>
          (s.name || '').toLowerCase().includes(q) ||
          (s.skill || '').toLowerCase().includes(q) ||
          (s.effect || '').toLowerCase().includes(q) ||
          (s.tipPS5 || '').toLowerCase().includes(q)
      ).length;

      const foodCount = FOOD_POTIONS_DB.filter((f) =>
        ((f.name || '') + ' ' + (f.tip || '') + ' ' + (f.ingredients || '') + ' ' + (f.perk || '')).toLowerCase().includes(q)
      ).length;

      const shopsCount = SHOPS_DB.filter((sh) => {
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
      }).length;

      const skillsCount = SKILLS_DB.filter((sk) => {
        const blob = [
          sk.name || '',
          sk.summary || '',
          sk.howToTrain || '',
          ...(sk.milestones || []).map((m) => `${m.name || ''} ${m.desc || ''}`),
          ...(sk.xpBoosts || []),
        ]
          .join(' ')
          .toLowerCase();
        return blob.includes(q);
      }).length;

      const endgameCount = ENDGAME_DB.filter((eg) =>
        [eg.title || '', eg.category || '', eg.summary || '', ...(eg.highlights || [])].join(' ').toLowerCase().includes(q)
      ).length;

      const trophiesCount = TROPHIES_DB.filter((t) => {
        const blob = [t.name || '', t.namePt || '', t.officialReq || '', t.howTo || '', t.ps5Tip || ''].join(' ').toLowerCase();
        return blob.includes(q);
      }).length;

      return [
        {
          id: 'trofeus',
          label: `🏆 Troféus (${trophiesCount})`,
          count: trophiesCount,
          onClick: () => {
            setActiveTab('progressao');
            setProgressionSubMode('trofeus');
          },
        },
        {
          id: 'forja-codex',
          label: `⚔️ Itens & Receitas (${codexCount})`,
          count: codexCount,
          onClick: () => {
            setActiveTab('forja');
            setCraftingSubMode('codex');
          },
        },
        {
          id: 'mapa',
          label: `🗺️ Mapa (${mapCount})`,
          count: mapCount,
          onClick: () => setActiveTab('mapa'),
        },
        {
          id: 'quests',
          label: `📜 Missões (${questsCount})`,
          count: questsCount,
          onClick: () => {
            setActiveTab('progressao');
            setProgressionSubMode('quests');
          },
        },
        {
          id: 'vaults',
          label: `🏛️ Cofres (${vaultsCount})`,
          count: vaultsCount,
          onClick: () => {
            setActiveTab('progressao');
            setProgressionSubMode('vaults');
          },
        },
        {
          id: 'monstros',
          label: `👹 Chefes (${monstersCount})`,
          count: monstersCount,
          onClick: () => {
            setActiveTab('combate');
            setCombatSubTab('monstros');
          },
        },
        {
          id: 'lojas',
          label: `🏪 Lojas (${shopsCount})`,
          count: shopsCount,
          onClick: () => {
            setActiveTab('guias');
            setGuidesSubTab('lojas');
          },
        },
        {
          id: 'feiticos',
          label: `🔮 Feitiços (${spellsCount})`,
          count: spellsCount,
          onClick: () => {
            setActiveTab('combate');
            setCombatSubTab('feiticos');
          },
        },
        {
          id: 'comida',
          label: `🍖 Comidas (${foodCount})`,
          count: foodCount,
          onClick: () => {
            setActiveTab('combate');
            setCombatSubTab('comida');
          },
        },
        {
          id: 'skills',
          label: `📊 Skills (${skillsCount})`,
          count: skillsCount,
          onClick: () => {
            setActiveTab('guias');
            setGuidesSubTab('skills');
          },
        },
        {
          id: 'endgame',
          label: `🔥 Endgame (${endgameCount})`,
          count: endgameCount,
          onClick: () => {
            setActiveTab('guias');
            setGuidesSubTab('endgame');
          },
        },
      ].filter((p) => p.count > 0);
    } catch (err) {
      console.error('Erro ao calcular busca global:', err);
      return [];
    }
  }, [searchQuery]);

  // Funções da Mochila de Expedição
  const addToCart = (recipeId) => {
    const rec = RECIPES_DB.find((r) => r.id === recipeId);
    setCart((prev) => ({ ...prev, [recipeId]: (prev[recipeId] || 0) + 1 }));
    if (rec) showToast(`+1 ${rec.name} na Mochila de Farm!`);
    else if (isWikiId(recipeId)) showToast(`+1 ${ptName(recipeId.slice(2))} na Mochila de Farm!`);
  };

  const removeFromCart = (recipeId) => {
    setCart((prev) => {
      const next = { ...prev };
      if ((next[recipeId] || 0) <= 1) {
        delete next[recipeId];
      } else {
        next[recipeId] -= 1;
      }
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
    setCollectedRaw({});
    setOnlyExpeditionMode(false);
    setActiveLayerIds([]);
    showToast('🎒 Mochila e marcadores do mapa 100% limpos!');
  };

  const toggleCollectedRaw = (matId) => {
    setCollectedRaw((prev) => ({ ...prev, [matId]: !prev[matId] }));
  };

  const setRawCount = (matId, count) => {
    setCollectedRaw((prev) => {
      const next = { ...prev };
      if (count <= 0) {
        delete next[matId];
      } else {
        next[matId] = count;
      }
      return next;
    });
  };

  const toggleCompletedMarker = (markerKey) => {
    setCompletedMarkers((prev) => ({ ...prev, [markerKey]: !prev[markerKey] }));
  };

  const toggleStep = (stepId) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const handleAddCustomPin = (pin) => {
    setCustomPins((prev) => [...prev, pin]);
    showToast(`📌 ${pin.icon} ${pin.label} fixado no mapa!`);
  };

  const handleRemoveCustomPin = (pinId) => {
    setCustomPins((prev) => prev.filter((p) => p.id !== pinId));
    showToast('🗑️ Marcador pessoal removido!');
  };

  // Pula de qualquer aba direto para o Mapa destacando e voando até o recurso ou cofre escolhido
  const handleJumpToMapLayer = (layerId, coords = null) => {
    setOnlyExpeditionMode(false);
    if (layerId) setActiveLayerIds([layerId]);
    setMapFocusTarget({ layerId, coords, ts: Date.now() });
    setActiveTab('mapa');
    showToast(`📍 Localizando no mapa: ${layerId || 'Ponto'}`);
  };

  const handleFlyToMapPoint = ({ coords, label }) => {
    setOnlyExpeditionMode(false);
    if (!activeLayerIds.includes('NPCs')) {
      setActiveLayerIds((prev) => [...new Set([...prev, 'NPCs'])]);
    }
    setMapFocusTarget({ coords, ts: Date.now() });
    setActiveTab('mapa');
    showToast(`📍 Voando até ${label}`);
  };

  const handleAddRecipeAndOpenPlanner = (recipeId) => {
    addToCart(recipeId);
    setCraftingSubMode('mochila');
    setActiveTab('forja');
  };

  // Backup / Sincronização PC <-> Celular
  const generateBackupString = () => {
    const payload = {
      v: 1,
      cart,
      collectedRaw,
      completedMarkers,
      completedSteps,
      customPins,
      vaults: loadStorage('dw_vaults_v1', {}),
      quests: loadStorage('dw_quests_v1', {}),
    };
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  };

  const handleCopyBackup = async () => {
    try {
      const code = generateBackupString();
      await navigator.clipboard.writeText(code);
      showToast('✅ Código de Backup copiado! Cole no seu celular ou PC.');
    } catch {
      showToast('Copie o código exibido na caixa de texto.');
    }
  };

  const handleRestoreBackup = () => {
    try {
      const raw = decodeURIComponent(escape(atob(importCode.trim())));
      const data = JSON.parse(raw);
      if (data.cart) setCart(data.cart);
      if (data.collectedRaw) setCollectedRaw(data.collectedRaw);
      if (data.completedMarkers) setCompletedMarkers(data.completedMarkers);
      if (data.completedSteps) setCompletedSteps(data.completedSteps);
      if (Array.isArray(data.customPins)) setCustomPins(data.customPins);
      if (data.vaults) localStorage.setItem('dw_vaults_v1', JSON.stringify(data.vaults));
      if (data.quests) localStorage.setItem('dw_quests_v1', JSON.stringify(data.quests));
      setShowSyncModal(false);
      setImportCode('');
      showToast('🎉 Progresso sincronizado com sucesso!');
    } catch {
      showToast('❌ Código inválido. Verifique se copiou o código inteiro.');
    }
  };

  // Wake Lock API (Impede a tela do celular de apagar enquanto joga no PS5)
  const toggleWakeLock = async () => {
    if (!('wakeLock' in navigator)) {
      showToast('Seu navegador não suporta bloqueio de tela automático.');
      return;
    }
    try {
      if (wakeLockActive && wakeLockSentinel) {
        await wakeLockSentinel.release();
        setWakeLockSentinel(null);
        setWakeLockActive(false);
        showToast('Modo Tela Sempre Ligada desativado.');
      } else {
        const sentinel = await navigator.wakeLock.request('screen');
        setWakeLockSentinel(sentinel);
        setWakeLockActive(true);
        showToast('☀️ Tela Sempre Ligada ativada para jogar no PS5!');
        sentinel.addEventListener('release', () => {
          setWakeLockActive(false);
        });
      }
    } catch {
      showToast('Toque novamente para manter a tela ligada.');
    }
  };

  // Busca por Voz em Português (Sem digitar com o controle na mão!)
  const startVoiceSearch = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      showToast('Busca por voz não disponível neste navegador.');
      return;
    }
    const recognition = new SpeechRec();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      showToast(`🎤 Buscando: "${transcript}"`);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-5xl mx-auto bg-[#060911] text-slate-100 overflow-hidden border-x border-slate-900 shadow-2xl">
      {/* Cabeçalho Compacto HUD — Ouro Dragonkin & Obsidiana */}
      <header className="px-3 pt-safe-header pb-2 bg-[#0a0f1c]/95 backdrop-blur-md border-b border-amber-500/20 shrink-0 space-y-2 z-30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0 text-base">
              🐉
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 truncate flex items-center gap-1.5">
                <span>DRAGONWILDS</span>
                <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 rounded-md">
                  PT-BR
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                Segunda Tela PS5 • Ashenfall 1.0 Completa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Atalho Rápido da Mochila de Farm no Topo */}
            {totalCartItems > 0 && (
              <button
                onClick={() => {
                  setCraftingSubMode('mochila');
                  setActiveTab('forja');
                }}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1 border bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40 transition active:scale-95 shadow-sm"
                title="Abrir Mochila de Farm ativa"
              >
                <span>🎒</span>
                <span>{totalCartItems}</span>
              </button>
            )}

            {/* Botão Sincronizar PC <-> Celular */}
            <button
              onClick={() => setShowSyncModal(true)}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 border bg-[#0d1527] hover:bg-slate-800 text-sky-300 border-slate-800 hover:border-sky-500/40 transition active:scale-95 shadow-sm"
              title="Sincronizar progresso entre PC e Celular"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>

            {/* Botão Tela Sempre Ligada (Wake Lock) */}
            <button
              onClick={toggleWakeLock}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border transition active:scale-95 shadow-sm ${
                wakeLockActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-amber-500/20'
                  : 'bg-[#0d1527] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Manter tela do smartphone sempre acesa"
            >
              <Sun className={`w-3.5 h-3.5 ${wakeLockActive ? 'text-amber-400 animate-pulse' : ''}`} />
              <span className="hidden sm:inline">
                {wakeLockActive ? 'Tela Ativa' : 'Manter Ligada'}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de Busca Rápida + Voz */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar minério, cofre, monstro, missão, bancada..."
              className="w-full bg-[#0b1222] border border-slate-800 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={startVoiceSearch}
            title="Buscar por Voz"
            className={`px-3 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1 shrink-0 active:scale-95 transition shadow-sm ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-[#0d1527] text-amber-400 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Voz</span>
          </button>
        </div>

        {/* Pílulas de Salto Rápido da Busca Global */}
        {searchQuery.trim() && (
          <div className="pt-0.5">
            {globalSearchPills.length > 0 ? (
              <ScrollStrip allowWrapToggle={false}>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase shrink-0 mr-1 flex items-center gap-1">
                  <span>⚡</span> Resultados:
                </span>
                {globalSearchPills.map((pill) => (
                  <button
                    key={pill.id}
                    onClick={pill.onClick}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/40 text-amber-200 text-[11px] font-extrabold shrink-0 transition shadow-sm"
                  >
                    {pill.label}
                  </button>
                ))}
              </ScrollStrip>
            ) : (
              <div className="text-[11px] text-slate-400 px-1 py-0.5">
                Nenhum resultado encontrado para &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        )}
      </header>

      {/* Modal de Sincronização / Backup PC <-> Celular */}
      {showSyncModal && (
        <div className="fixed inset-0 z-[1200] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Save className="w-4 h-4 text-sky-400" />
                <span>Sincronizar Progresso (PC ↔ Celular)</span>
              </h3>
              <button
                onClick={() => setShowSyncModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Transfira sua <strong>Mochila de Farm</strong>, <strong>Recursos Guardados</strong>,{' '}
              <strong>Pins da Base no Mapa</strong>, <strong>Cofres</strong> e{' '}
              <strong>Missões Concluídas</strong> entre o PC e o seu Smartphone:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="text-xs font-extrabold text-amber-400">
                1. Exportar deste dispositivo:
              </div>
              <input
                type="text"
                readOnly
                value={generateBackupString()}
                onClick={(e) => e.currentTarget.select()}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono"
              />
              <button
                onClick={handleCopyBackup}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código de Progresso</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="text-xs font-extrabold text-emerald-400">
                2. Importar de outro dispositivo:
              </div>
              <textarea
                rows={2}
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder="Cole aqui o código copiado do outro dispositivo..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none"
              />
              <button
                onClick={handleRestoreBackup}
                disabled={!importCode.trim()}
                className="w-full py-2 rounded-xl bg-emerald-500 disabled:opacity-40 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restaurar Progresso</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificação Flutuante (Toast) */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[1000] bg-amber-500 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-full shadow-2xl border border-amber-200 animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-hidden relative">
        <TabErrorBoundary onResetSearch={() => setSearchQuery('')}>
          {activeTab === 'mapa' && (
            <AshenfallMap
              activeLayerIds={activeLayerIds}
              setActiveLayerIds={setActiveLayerIds}
              expeditionLayerIds={expeditionLayerIds}
              onlyExpeditionMode={onlyExpeditionMode}
              setOnlyExpeditionMode={setOnlyExpeditionMode}
              completedMarkers={completedMarkers}
              toggleCompletedMarker={toggleCompletedMarker}
              customPins={customPins}
              onAddCustomPin={handleAddCustomPin}
              onRemoveCustomPin={handleRemoveCustomPin}
              focusTarget={mapFocusTarget}
              searchQuery={searchQuery}
            />
          )}

          <Suspense
            fallback={
              <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400 text-xs font-bold gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span>Carregando seção...</span>
              </div>
            }
          >
            {activeTab === 'forja' && (
              <CraftingPlanner
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                collectedRaw={collectedRaw}
                toggleCollectedRaw={toggleCollectedRaw}
                setRawCount={setRawCount}
                onJumpToMapLayer={handleJumpToMapLayer}
                searchQuery={searchQuery}
                externalViewMode={craftingSubMode}
              />
            )}

            {activeTab === 'progressao' && (
              <ProgressionGuide
                completedSteps={completedSteps}
                toggleStep={toggleStep}
                onAddRecipeToCart={handleAddRecipeAndOpenPlanner}
                onJumpToMapLayer={handleJumpToMapLayer}
                searchQuery={searchQuery}
                externalMode={progressionSubMode}
              />
            )}

            {activeTab === 'combate' && (
              <BestiarySpells
                searchQuery={searchQuery}
                subTab={combatSubTab}
                setSubTab={setCombatSubTab}
                cart={cart}
                onAddRecipeToCart={addToCart}
                onRemoveRecipeFromCart={removeFromCart}
                onJumpToMapLayer={handleJumpToMapLayer}
                onOpenPlanner={() => {
                  setCraftingSubMode('mochila');
                  setActiveTab('forja');
                }}
              />
            )}

            {activeTab === 'guias' && (
              <GuidesAndShops
                searchQuery={searchQuery}
                subTab={guidesSubTab}
                setSubTab={setGuidesSubTab}
                onAddRecipeToCart={handleAddRecipeAndOpenPlanner}
                onFlyToMapPoint={handleFlyToMapPoint}
              />
            )}
          </Suspense>
        </TabErrorBoundary>
      </main>

      {/* Barra de Navegação Inferior Ergonômica (Thumb Zone) */}
      <nav className="bg-[#070b14]/95 backdrop-blur-md border-t border-amber-500/25 px-2 pt-1.5 pb-safe-nav grid grid-cols-5 gap-1 shrink-0 z-50 shadow-2xl">
        <button
          onClick={() => setActiveTab('mapa')}
          className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
            activeTab === 'mapa'
              ? 'bg-gradient-to-t from-amber-500/25 to-amber-500/5 text-amber-300 font-black border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] leading-none">Mapa</span>
        </button>

        <button
          onClick={() => setActiveTab('forja')}
          className={`relative py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
            activeTab === 'forja'
              ? 'bg-gradient-to-t from-amber-500/25 to-amber-500/5 text-amber-300 font-black border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] leading-none">Farm & Criar</span>
          {totalCartItems > 0 && (
            <span className="absolute top-1 right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] shadow-sm animate-pulse">
              {totalCartItems}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('progressao')}
          className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
            activeTab === 'progressao'
              ? 'bg-gradient-to-t from-amber-500/25 to-amber-500/5 text-amber-300 font-black border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] leading-none">Missões</span>
        </button>

        <button
          onClick={() => setActiveTab('combate')}
          className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
            activeTab === 'combate'
              ? 'bg-gradient-to-t from-amber-500/25 to-amber-500/5 text-amber-300 font-black border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] leading-none">Combate</span>
        </button>

        <button
          onClick={() => setActiveTab('guias')}
          className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
            activeTab === 'guias'
              ? 'bg-gradient-to-t from-amber-500/25 to-amber-500/5 text-amber-300 font-black border border-amber-500/40 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-slate-200 font-medium'
          }`}
        >
          <Store className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] leading-none">Lojas & Guias</span>
        </button>
      </nav>
    </div>
  );
}
