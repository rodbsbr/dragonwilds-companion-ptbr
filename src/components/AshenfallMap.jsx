import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import rawMapSpawns from '../data/rawMapSpawns.json';
import { MAP_CATEGORIES, MAP_LAYERS, REGIONS, VAULTS_DB, QUESTS_DB } from '../data/gameData';
import { layerImage, wikiImg } from '../data/images';
import ScrollStrip from './ScrollStrip';
import {
  Target,
  CheckCircle2,
  Compass,
  RotateCcw,
  Sparkles,
  Crosshair,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
} from 'lucide-react';

// Tradução automática dos nomes e descrições dos Cofres e Pontos de Interesse
const VAULT_PT_NAMES = {
  'Crasorak Kara': { order: '#1', num: 1, area: 'Bosque do Templo (Nv. 2)', reward: 'Fragmentos e Núcleo de Cofre (Início)' },
  'Thishepen Kara': { order: '#2', num: 2, area: 'Vale de Bramblemead (Nv. 2)', reward: 'Senha da Efígie (Cajado da Luz) + Núcleos' },
  'Vertentis Kara': { order: '#3', num: 3, area: 'Pântano Sussurrante (Nv. 2)', reward: 'Projeto: Escudo Anti-Dragão + Spitfoot' },
  'Takla Kara': { order: '#4', num: 4, area: 'Planícies Fraturadas (Nv. 3)', reward: 'Armadura de Paladino + Arco Batedor + Blurita' },
  'Skeklac Kara': { order: '#5', num: 5, area: 'Vigília de Ashien (Nv. 4)', reward: 'Projeto: Malho de Granito (Granite Maul)' },
  'Kletterbuja Kara': { order: '#6', num: 6, area: 'Pântano da Praga Sangrenta (Nv. 3)', reward: 'Armadura Completa de Arqueiro Selvagem' },
  'Chaktan Kara': { order: '#7', num: 7, area: 'Terras Altas da Tempestade (Nv. 4)', reward: 'Armadura Mago Dragonkin + Adaga de Osso de Dragão' },
  'Kalistrakthen Kara': { order: '#8', num: 8, area: 'Bosque das Brasas / Fellhollow (Nv. 5)', reward: 'Armadura Completa de Hoplita Caído' },
  'Skekven Kara': { order: '#9', num: 9, area: 'Leste do Lago das Almas Perdidas (Nv. 5)', reward: 'Núcleos de Cofre + Progresso de Doric' },
  'Vekchenven Kara': { order: '#10', num: 10, area: 'Oeste do Lago das Almas Perdidas (Nv. 5)', reward: 'Cajado do Necromante (Atrás da Cachoeira)' },
  'Vault (Kalphite)': { order: '#11', num: 11, area: 'Pirâmide Sul de Manafem (Nv. 7)', reward: 'Projetos das Areias Umbrais / Kalphite' },
  'Vault (Mirrors)': { order: '#12', num: 12, area: 'Pirâmide Norte das Dunas de Uzzer (Nv. 7)', reward: 'Cofre dos Espelhos — Projetos de Deserto' },
};

const NPC_PT_INFO = {
  'Wise Old Man': { pt: 'Sábio Ancião (Wise Old Man)', role: 'Missões Principais (Dragon Slayer, Withering Heights)' },
  Doric: { pt: 'Doric (Mestre Anão)', role: 'Começando, Esmagado por Granito, A Missão de Doric, Buscando Salvação' },
  Vannaka: { pt: 'Vannaka (Instrutor de Combate)', role: 'Caçador de Ratos, Dias de Cão' },
  Zanik: { pt: 'Zanik', role: 'Mistérios Rúnicos, Diplomacia Goblin, Fantasmas Inquietos' },
  Death: { pt: 'Morte (Death)', role: 'A Fortaleza dos Cavaleiros Negros' },
  Icthlarin: { pt: 'Icthlarin', role: 'O Pequeno Ajudante de Icthlarin (Tapete Mágico)' },
  'Postie Pete': { pt: 'Postie Pete (Carteiro)', role: 'Correio e entrega de pacotes entre regiões' },
  'Doctor Fenkenstrain': { pt: 'Doutor Fenkenstrain', role: 'O Grande Roubo de Corpos (Braço de Zumbi)' },
  'Domri - The Merchant': { pt: 'Domri — O Mercador', role: 'Comércio de suprimentos e materiais' },
  'Iasadair - The Merchant': { pt: 'Iasadair — O Mercador', role: 'Comércio nas Areias Umbrais' },
  'Beartach - The Merchant': { pt: 'Beartach — O Mercador', role: 'Comércio de suprimentos raros' },
};

const CUSTOM_PIN_TYPES = [
  { id: 'base', icon: '🏠', label: 'Minha Base', color: '#10b981' },
  { id: 'lodestone', icon: '🔮', label: 'Minha Lodestone', color: '#38bdf8' },
  { id: 'farm', icon: '⭐', label: 'Ponto de Farm', color: '#f59e0b' },
  { id: 'grave', icon: '🪦', label: 'Meu Túmulo', color: '#f43f5e' },
];

export default function AshenfallMap({
  activeLayerIds,
  setActiveLayerIds,
  expeditionLayerIds,
  onlyExpeditionMode,
  setOnlyExpeditionMode,
  completedMarkers,
  toggleCompletedMarker,
  customPins = [],
  onAddCustomPin,
  onRemoveCustomPin,
  focusTarget,
  searchQuery = '',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [selectedCat, setSelectedCat] = useState('cofres');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [selectedLayerInfo, setSelectedLayerInfo] = useState(null);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Mobile-first: inicia recolhido para liberar 100% do mapa!
  const [zenMode, setZenMode] = useState(false); // Modo Foco / Tela Cheia do Mapa
  const [hideChips, setHideChips] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [selectedPinType, setSelectedPinType] = useState('base');

  // Camadas efetivamente visíveis no mapa
  const effectiveLayers = useMemo(() => {
    if (onlyExpeditionMode && expeditionLayerIds.length > 0) {
      return expeditionLayerIds;
    }
    return activeLayerIds;
  }, [onlyExpeditionMode, expeditionLayerIds, activeLayerIds]);

  // Busca rápida de camadas no mapa
  const matchingSearchLayers = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return [];
    return MAP_LAYERS.filter(
      (l) =>
        (l.name || '').toLowerCase().includes(q) ||
        (l.id || '').toLowerCase().includes(q) ||
        (l.region || '').toLowerCase().includes(q) ||
        (l.tip || '').toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Inicializa o mapa Leaflet com a projeção exata da Wiki Oficial
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const mult = 6144 / 420000 / 16;
    const offset_x = 11075;
    const offset_y = 100800 + 16885;

    const dragonwildsCRS = L.extend({}, L.CRS.Simple, {
      projection: L.Projection.LonLat,
      transformation: new L.Transformation(mult, mult * offset_x, mult, mult * offset_y),
    });

    const bounds = [
      [-offset_y, -offset_x],
      [420000 - offset_y, 420000 - offset_x],
    ];

    const map = L.map(mapContainerRef.current, {
      crs: dragonwildsCRS,
      maxBounds: [
        [-offset_y - 80000, -offset_x - 80000],
        [420000 - offset_y + 80000, 420000 - offset_x + 80000],
      ],
      zoom: 2,
      minZoom: 0.5,
      maxZoom: 4,
      zoomSnap: 0.5,
      attributionControl: false,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://maps.runescape.wiki/dw/tiles/{z}/{x}_{y}.png', {
      minZoom: 0,
      maxNativeZoom: 4,
      maxZoom: 4,
    }).addTo(map);

    map.fitBounds(bounds);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Recalcula o tamanho do canvas do Leaflet sempre que barras/gavetas recolhem ou expandem no celular
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize({ animate: false });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [zenMode, drawerOpen, matchingSearchLayers.length]);

  // Expõe função global para o botão de dentro do popup do Leaflet marcar concluído ou remover pin
  useEffect(() => {
    window.__toggleDWMarker = (markerKey) => {
      toggleCompletedMarker(markerKey);
    };
    window.__removeDWCustomPin = (pinId) => {
      if (onRemoveCustomPin) onRemoveCustomPin(pinId);
    };
    return () => {
      delete window.__toggleDWMarker;
      delete window.__removeDWCustomPin;
    };
  }, [toggleCompletedMarker, onRemoveCustomPin]);

  // Clique no mapa para adicionar Marcador Pessoal quando pinMode estiver ativo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const handleMapClick = (e) => {
      if (!pinMode || !onAddCustomPin) return;
      const pinMeta = CUSTOM_PIN_TYPES.find((p) => p.id === selectedPinType) || CUSTOM_PIN_TYPES[0];
      onAddCustomPin({
        id: `pin_${Date.now()}`,
        type: pinMeta.id,
        icon: pinMeta.icon,
        label: pinMeta.label,
        color: pinMeta.color,
        lat: Math.round(e.latlng.lat),
        lng: Math.round(e.latlng.lng),
      });
      setPinMode(false);
    };
    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [pinMode, selectedPinType, onAddCustomPin]);

  // Voa automaticamente para um alvo quando acionado de outra aba (ex: "Localizar no Mapa")
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusTarget) return;

    if (focusTarget.coords) {
      map.flyTo(focusTarget.coords, 3.5, { duration: 0.8 });
      return;
    }

    if (focusTarget.layerId) {
      const layerObj = MAP_LAYERS.find((l) => l.id === focusTarget.layerId);
      if (layerObj) {
        setSelectedCat(layerObj.category);
        setSelectedLayerInfo(layerObj);
      }
      const spawns = rawMapSpawns[focusTarget.layerId] || [];
      if (spawns.length === 1) {
        map.flyTo([spawns[0].y, spawns[0].x], 3.2, { duration: 0.8 });
      } else if (spawns.length > 1) {
        const latLngs = spawns.map((s) => [s.y, s.x]);
        map.flyToBounds(latLngs, { padding: [50, 50], maxZoom: 3, duration: 0.8 });
      }
    }
  }, [focusTarget]);

  // Atualiza os marcadores quando os filtros mudam
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = markersLayerRef.current;
    if (!map || !group) return;

    group.clearLayers();

    effectiveLayers.forEach((layerId) => {
      const layerMeta = MAP_LAYERS.find((l) => l.id === layerId);
      const spawns = rawMapSpawns[layerId] || [];
      if (!layerMeta || !spawns.length) return;

      spawns.forEach((spawn, idx) => {
        const markerKey = `${layerId}__${idx}`;
        const isDone = !!completedMarkers[markerKey];
        if (hideCompleted && isDone) return;

        // No Gadget-maps.js original: coordOrder = 'xy' inverte [x, y] para [y, x] no L.marker
        const latLng = [spawn.y, spawn.x];

        const vaultInfo = spawn.name && VAULT_PT_NAMES[spawn.name];
        const npcKey = spawn.npcKey || (layerMeta.category === 'npcs' ? layerId : null);
        const npcInfo = npcKey && NPC_PT_INFO[npcKey];

        const imgUrl = npcKey ? layerImage(npcKey) : layerImage(layerId);
        const badgeText = vaultInfo ? vaultInfo.order : layerMeta.symbol;
        const sz = vaultInfo ? 34 : 28;

        const iconHtml = `
          <div style="
            position:relative;
            display:flex;
            align-items:center;
            justify-content:center;
            width:${sz}px;
            height:${sz}px;
            border-radius:9999px;
            background:#0b1220;
            color:${layerMeta.color};
            font-weight:800;
            font-size:10px;
            border:3px solid ${isDone ? '#64748b' : layerMeta.color};
            box-shadow:0 3px 10px rgba(0,0,0,0.75);
            opacity:${isDone ? '0.5' : '1'};
            overflow:hidden;
          ">
            <span style="position:absolute;">${badgeText}</span>
            ${imgUrl ? `<img src="${imgUrl}" loading="lazy" decoding="async" onerror="this.style.display='none'" style="position:relative;width:${sz - 8}px;height:${sz - 8}px;object-fit:contain;" />` : ''}
            ${vaultInfo ? `<span style="position:absolute;bottom:0;right:0;background:#f59e0b;color:#090d16;font-size:9px;font-weight:900;padding:0 3px;border-radius:4px;">${vaultInfo.order}</span>` : ''}
            ${isDone ? '<span style="position:absolute;inset:0;background:rgba(16,185,129,.8);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;">✓</span>' : ''}
          </div>
        `;

        const divIcon = L.divIcon({
          className: 'dw-custom-marker',
          html: iconHtml,
          iconSize: [sz, sz],
          iconAnchor: [sz / 2, sz / 2],
        });

        const vaultFull =
          vaultInfo &&
          VAULTS_DB.find((v) => v.order === vaultInfo.num || v.name === spawn.name);

        const titlePt = vaultInfo
          ? `Cofre ${vaultInfo.order}: ${vaultFull?.name || spawn.name}`
          : npcInfo
          ? npcInfo.pt
          : spawn.name && layerId === 'NPCs'
          ? spawn.name
          : layerMeta.name;

        const subtitlePt = vaultInfo
          ? `${vaultInfo.area} • ${vaultInfo.reward}`
          : npcInfo
          ? `${spawn.description ? spawn.description + ' • ' : ''}${npcInfo.role}`
          : `${layerMeta.region} • ${layerMeta.tier}`;

        const popupPhoto = vaultFull
          ? `<img src="${wikiImg(vaultFull.imageFile)}" onerror="this.style.display='none'" style="width:100%;max-height:115px;object-fit:cover;border-radius:8px;margin-bottom:6px;" />`
          : imgUrl
          ? `<img src="${imgUrl}" onerror="this.style.display='none'" style="width:42px;height:42px;object-fit:contain;float:right;margin-left:6px;" />`
          : '';

        const vaultBp = vaultFull
          ? `<div style="font-size:11px;color:#fde68a;margin-top:6px;line-height:1.35;background:#1e293b;padding:7px;border-radius:8px;">📘 <b>Projetos neste Cofre:</b><br/>• ${vaultFull.blueprints.join('<br/>• ')}<br/><span style="color:#94a3b8;">⚙️ ${vaultFull.cores} Núcleos • 📦 ${vaultFull.chests} baús</span></div>`
          : '';

        const npcQuests =
          npcKey &&
          QUESTS_DB.filter((q) => q.npcMapKey === npcKey)
            .map((q) => `• ${q.name}`)
            .join('<br/>');
        const npcQuestsHtml = npcQuests
          ? `<div style="font-size:11px;color:#bae6fd;margin-top:6px;line-height:1.35;background:#0f172a;padding:7px;border-radius:8px;">📜 <b>Missões deste NPC:</b><br/>${npcQuests}</div>`
          : '';

        const toolReqHtml = layerMeta.toolReq
          ? `<div style="font-size:11px;font-weight:700;color:#fbbf24;margin-top:6px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);padding:5px 8px;border-radius:7px;">${layerMeta.toolReq}</div>`
          : '';

        const popupHtml = `
          <div style="min-width:220px; padding:2px;">
            ${popupPhoto}
            <div style="font-size:11px; font-weight:700; color:${layerMeta.color}; text-transform:uppercase; letter-spacing:0.04em;">
              ${layerMeta.tier}
            </div>
            <div style="font-size:15px; font-weight:800; color:#f8fafc; margin-top:2px;">
              ${titlePt}
            </div>
            <div style="font-size:12px; color:#94a3b8; margin-top:3px;">
              ${subtitlePt}
            </div>
            ${toolReqHtml}
            <div style="font-size:12px; color:#cbd5e1; margin-top:8px; background:#1e293b; padding:7px 9px; border-radius:8px; line-height:1.35;">
              💡 ${vaultFull ? vaultFull.walkthrough : layerMeta.tip}
            </div>
            ${vaultBp}
            ${npcQuestsHtml}
            <button
              onclick="window.__toggleDWMarker('${markerKey}')"
              style="
                margin-top:10px;
                width:100%;
                padding:8px 10px;
                border-radius:8px;
                font-weight:700;
                font-size:12px;
                cursor:pointer;
                border:none;
                background:${isDone ? '#334155' : '#f59e0b'};
                color:${isDone ? '#e2e8f0' : '#090d16'};
              "
            >
              ${isDone ? '↩️ Desmarcar Concluído' : '✅ Marcar como Coletado / Feito'}
            </button>
          </div>
        `;

        L.marker(latLng, { icon: divIcon }).bindPopup(popupHtml).addTo(group);
      });
    });

    // Renderiza sempre os Marcadores Pessoais do jogador (Base, Lodestone, Farm, Túmulo)
    customPins.forEach((pin) => {
      const sz = 34;
      const pinColor = pin.color || '#10b981';
      const iconHtml = `
        <div style="
          display:flex;
          align-items:center;
          justify-content:center;
          width:${sz}px;
          height:${sz}px;
          border-radius:9999px;
          background:#090d16;
          border:3px solid ${pinColor};
          box-shadow:0 0 12px ${pinColor};
          font-size:16px;
        ">
          <span>${pin.icon || '🏠'}</span>
        </div>
      `;
      const divIcon = L.divIcon({
        className: 'dw-custom-marker',
        html: iconHtml,
        iconSize: [sz, sz],
        iconAnchor: [sz / 2, sz / 2],
      });
      const popupHtml = `
        <div style="min-width:190px; padding:2px;">
          <div style="font-size:10px; font-weight:800; color:${pinColor}; text-transform:uppercase;">
            📌 Marcador Pessoal
          </div>
          <div style="font-size:15px; font-weight:800; color:#f8fafc; margin-top:2px;">
            ${pin.icon || '🏠'} ${pin.label || 'Minha Base'}
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
            Coords: [${pin.lat}, ${pin.lng}]
          </div>
          <button
            onclick="window.__removeDWCustomPin('${pin.id}')"
            style="
              margin-top:8px;
              width:100%;
              padding:7px 10px;
              border-radius:8px;
              font-weight:700;
              font-size:11px;
              cursor:pointer;
              border:none;
              background:#f43f5e;
              color:#fff;
            "
          >
            🗑️ Remover Marcador
          </button>
        </div>
      `;
      L.marker([pin.lat, pin.lng], { icon: divIcon }).bindPopup(popupHtml).addTo(group);
    });
  }, [effectiveLayers, completedMarkers, hideCompleted, customPins]);

  const toggleLayer = (id, fly = false) => {
    if (onlyExpeditionMode) {
      setOnlyExpeditionMode(false);
    }
    const layerObj = MAP_LAYERS.find((l) => l.id === id);
    setSelectedLayerInfo(layerObj || null);

    setActiveLayerIds((prev) => {
      const isRemoving = prev.includes(id) && !fly;
      const next = isRemoving ? prev.filter((item) => item !== id) : [...new Set([...prev, id])];
      if (!isRemoving && mapInstanceRef.current) {
        const spawns = rawMapSpawns[id] || [];
        if (spawns.length === 1) {
          mapInstanceRef.current.flyTo([spawns[0].y, spawns[0].x], 3.2, { duration: 0.7 });
        } else if (spawns.length > 1 && fly) {
          const latLngs = spawns.map((s) => [s.y, s.x]);
          mapInstanceRef.current.flyToBounds(latLngs, { padding: [50, 50], maxZoom: 2.8, duration: 0.7 });
        }
      }
      return next;
    });
  };

  const activateOnlyAndFly = (id) => {
    setOnlyExpeditionMode(false);
    const layerObj = MAP_LAYERS.find((l) => l.id === id);
    if (layerObj) {
      setSelectedCat(layerObj.category);
      setSelectedLayerInfo(layerObj);
    }
    setActiveLayerIds([id]);
    const spawns = rawMapSpawns[id] || [];
    if (mapInstanceRef.current && spawns.length > 0) {
      if (spawns.length === 1) {
        mapInstanceRef.current.flyTo([spawns[0].y, spawns[0].x], 3.2, { duration: 0.7 });
      } else {
        const latLngs = spawns.map((s) => [s.y, s.x]);
        mapInstanceRef.current.flyToBounds(latLngs, { padding: [50, 50], maxZoom: 2.8, duration: 0.7 });
      }
    }
  };

  const centerOnActiveMarkers = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const pts = [];
    effectiveLayers.forEach((id) => {
      (rawMapSpawns[id] || []).forEach((s) => pts.push([s.y, s.x]));
    });
    if (pts.length === 1) {
      map.flyTo(pts[0], 3.2, { duration: 0.7 });
    } else if (pts.length > 1) {
      map.flyToBounds(pts, { padding: [50, 50], maxZoom: 2.8, duration: 0.7 });
    }
  };

  const flyToRegion = (region) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(region.center, region.zoom, { duration: 0.8 });
  };

  const clearAllMapFilters = () => {
    setActiveLayerIds([]);
    setOnlyExpeditionMode(false);
    setSelectedLayerInfo(null);
  };

  const activatePreset = (layerIds) => {
    setOnlyExpeditionMode(false);
    setActiveLayerIds(layerIds);
    const pts = [];
    layerIds.forEach((id) => {
      (rawMapSpawns[id] || []).forEach((s) => pts.push([s.y, s.x]));
    });
    if (pts.length === 1 && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(pts[0], 3.2, { duration: 0.7 });
    } else if (pts.length > 1 && mapInstanceRef.current) {
      mapInstanceRef.current.flyToBounds(pts, { padding: [50, 50], maxZoom: 2.8, duration: 0.7 });
    }
  };

  const handleToggleExpeditionMode = () => {
    if (onlyExpeditionMode) {
      setOnlyExpeditionMode(false);
      setActiveLayerIds([]);
    } else {
      if (!expeditionLayerIds || expeditionLayerIds.length === 0) {
        alert('Sua lista de Farm na mochila está vazia! Adicione bancadas ou equipamentos na aba "Farm & Criar" primeiro.');
        return;
      }
      setOnlyExpeditionMode(true);
      setActiveLayerIds([...expeditionLayerIds]);
      const pts = [];
      expeditionLayerIds.forEach((id) => {
        (rawMapSpawns[id] || []).forEach((s) => pts.push([s.y, s.x]));
      });
      if (pts.length > 0 && mapInstanceRef.current) {
        mapInstanceRef.current.flyToBounds(pts, { padding: [50, 50], maxZoom: 2.8, duration: 0.8 });
      }
    }
  };

  const layersInCategory = MAP_LAYERS.filter((l) => l.category === selectedCat);
  const activeInCategory = layersInCategory.filter((l) => effectiveLayers.includes(l.id));
  const allCatSelected = layersInCategory.length > 0 && activeInCategory.length === layersInCategory.length;

  const markAllInCategory = () => {
    setOnlyExpeditionMode(false);
    const catIds = layersInCategory.map((l) => l.id);
    setActiveLayerIds((prev) => [...new Set([...prev, ...catIds])]);
  };

  const clearCategory = () => {
    setOnlyExpeditionMode(false);
    const catIds = new Set(layersInCategory.map((l) => l.id));
    setActiveLayerIds((prev) => prev.filter((id) => !catIds.has(id)));
  };

  const totalVisibleNodes = useMemo(() => {
    return effectiveLayers.reduce((acc, id) => acc + (rawMapSpawns[id]?.length || 0), 0);
  }, [effectiveLayers]);

  return (
    <div className="flex flex-col h-full select-none">
      {/* Barra de Salto Rápido por Região (Oculta no Modo Foco para liberar 100% do mapa) */}
      {!zenMode && (
        <div className="px-2.5 py-1.5 bg-[#0d131f] border-b border-slate-800/80 shrink-0">
          <ScrollStrip allowWrapToggle={false}>
            <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 shrink-0 mr-1">
              <Compass className="w-3.5 h-3.5" /> Regiões:
            </span>
            {REGIONS.map((reg) => (
              <button
                key={reg.id}
                onClick={() => flyToRegion(reg)}
                className="px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-xs font-semibold text-slate-200 shrink-0 flex items-center gap-1.5 border border-slate-700/70"
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: reg.color }} />
                <span>{reg.name}</span>
                <span className="text-[10px] text-slate-400">Nv.{reg.powerLevel}</span>
              </button>
            ))}
          </ScrollStrip>
        </div>
      )}

      {/* Resultados da Busca Rápida no Mapa */}
      {!zenMode && matchingSearchLayers.length > 0 && (
        <div className="px-2.5 py-1.5 bg-amber-500/10 border-b border-amber-500/30 shrink-0">
          <ScrollStrip allowWrapToggle={false}>
            <span className="text-[10px] font-black text-amber-300 uppercase shrink-0">
              🔎 No Mapa ({matchingSearchLayers.length}):
            </span>
            {matchingSearchLayers.map((l) => (
              <button
                key={l.id}
                onClick={() => activateOnlyAndFly(l.id)}
                className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-200 border border-amber-500/40 text-[11px] font-bold shrink-0 flex items-center gap-1.5 transition"
              >
                {layerImage(l.id) && (
                  <img src={layerImage(l.id)} alt="" className="w-3.5 h-3.5 object-contain" />
                )}
                <span className="truncate max-w-[110px]">{l.name}</span>
                <span className="text-[10px] opacity-75">({rawMapSpawns[l.id]?.length || 0})</span>
              </button>
            ))}
          </ScrollStrip>
        </div>
      )}

      {/* Área do Mapa Interativo */}
      <div className="relative flex-1 min-h-[260px]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Controles Flutuantes no Topo do Mapa (Linha única no mobile, nunca cobre a tela!) */}
        <div className="absolute top-2 left-2 right-2 z-[400] flex flex-col gap-1.5 pointer-events-none">
          {/* Barra Superior de Ações Rápidas (Rolagem horizontal suave sem quebra de linhas) */}
          <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full py-0.5">
            {/* Botão Limpar Mapa ou Indicador de Mapa Limpo */}
            {effectiveLayers.length > 0 ? (
              <button
                onClick={clearAllMapFilters}
                className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center gap-1 border border-rose-400 shrink-0"
              >
                <span>🧹</span>
                <span>Limpar ({effectiveLayers.length})</span>
              </button>
            ) : (
              <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs shadow-md flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>🗺️ Mapa Limpo</span>
              </div>
            )}

            {/* Botão Modo Foco / Tela Cheia (Salva o mapa no celular!) */}
            <button
              onClick={() => setZenMode(!zenMode)}
              title={zenMode ? 'Restaurar menus e categorias' : 'Modo Foco: esconde menus para ver 100% do mapa'}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1 active:scale-95 border transition shrink-0 ${
                zenMode
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-900/95 text-amber-300 border-amber-500/40 hover:bg-slate-800'
              }`}
            >
              {zenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{zenMode ? 'Sair Foco' : 'Foco'}</span>
            </button>

            {/* Botão Centralizar nos Pontos Ativos */}
            {effectiveLayers.length > 0 && (
              <button
                onClick={centerOnActiveMarkers}
                title="Centralizar nos pontos visíveis"
                className="px-2.5 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-sky-300 border border-sky-500/40 text-xs font-bold shadow-md flex items-center gap-1 active:scale-95 shrink-0"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Centralizar</span>
              </button>
            )}

            {/* Botão Focar na Expedição */}
            <button
              onClick={handleToggleExpeditionMode}
              className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1 transition active:scale-95 border shrink-0 ${
                onlyExpeditionMode
                  ? 'bg-amber-500 text-slate-950 border-amber-300'
                  : 'bg-slate-900/95 text-amber-300 border-amber-500/40 hover:bg-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5 shrink-0" />
              <span>
                {onlyExpeditionMode
                  ? `🎯 Mochila (${expeditionLayerIds.length})`
                  : expeditionLayerIds.length > 0
                  ? `🎯 Mochila (${expeditionLayerIds.length})`
                  : '🎯 Mochila'}
              </span>
            </button>

            {/* Botão Marcar Base / Pin */}
            <button
              onClick={() => setPinMode(!pinMode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 active:scale-95 border transition shrink-0 ${
                pinMode
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                  : 'bg-slate-900/95 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
              }`}
            >
              <span>📌</span>
              <span>{pinMode ? 'Toque no Mapa...' : 'Base'}</span>
            </button>

            {/* Botão Ocultar Concluídos */}
            <button
              onClick={() => setHideCompleted(!hideCompleted)}
              title={hideCompleted ? 'Exibir itens já feitos' : 'Ocultar itens feitos'}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border shadow-md flex items-center gap-1 shrink-0 ${
                hideCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-black'
                  : 'bg-slate-900/95 text-slate-300 border-slate-700/80'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{hideCompleted ? 'Ocultando' : 'Feitos'}</span>
            </button>
          </div>

          {/* Seção de Filtros Ativos (Chips em LINHA ÚNICA rolável, nunca quebra linhas!) */}
          {effectiveLayers.length > 0 && !hideChips && (
            <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl px-2 py-1 shadow-lg flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              <span className="text-[10px] font-black uppercase text-amber-400 shrink-0">
                Ativos ({effectiveLayers.length}):
              </span>
              {effectiveLayers.map((layerId) => {
                const layerMeta = MAP_LAYERS.find((l) => l.id === layerId);
                const count = rawMapSpawns[layerId]?.length || 0;
                return (
                  <button
                    key={layerId}
                    onClick={() => toggleLayer(layerId)}
                    className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500 text-[11px] font-bold text-slate-200 flex items-center gap-1 transition active:scale-95 group shadow-sm shrink-0"
                    title={`Desativar ${layerMeta?.name || layerId}`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: layerMeta?.color || '#f59e0b' }}
                    />
                    <span className="truncate max-w-[85px] sm:max-w-[130px]">
                      {layerMeta?.name || layerId}
                    </span>
                    <span className="text-[10px] text-slate-400">({count})</span>
                    <span className="text-slate-400 group-hover:text-rose-400 font-black ml-0.5">✕</span>
                  </button>
                );
              })}
              <button
                onClick={() => setHideChips(true)}
                title="Recolher barra de filtros ativos"
                className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 font-bold shrink-0 bg-slate-800 rounded"
              >
                ▲ Ocultar
              </button>
            </div>
          )}

          {effectiveLayers.length > 0 && hideChips && (
            <div className="pointer-events-auto self-start">
              <button
                onClick={() => setHideChips(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-800 text-[10px] font-black text-amber-300 flex items-center gap-1 shadow-md active:scale-95"
              >
                <span>▼ Ver {effectiveLayers.length} filtros ativos</span>
              </button>
            </div>
          )}

          {/* Se o Mapa estiver Limpo: Presets Rápidos em linha única */}
          {effectiveLayers.length === 0 && (
            <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-sm border border-slate-800/80 rounded-xl px-2.5 py-1 shadow-md flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Atalhos:</span>
              <button
                onClick={() => activatePreset(['Vaults'])}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 active:scale-95 shrink-0"
              >
                🏛️ 12 Cofres
              </button>
              <button
                onClick={() => activatePreset(['Nodestone'])}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold border border-slate-700 active:scale-95 shrink-0"
              >
                🔮 Lodestones
              </button>
              <button
                onClick={() => activatePreset(['Copper Ore Node', 'Tin Ore Node'])}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold border border-slate-700 active:scale-95 shrink-0"
              >
                ⛏️ Cobre & Estanho
              </button>
              <button
                onClick={() => activatePreset(['NPCs'])}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-bold border border-slate-700 active:scale-95 shrink-0"
              >
                🧑 NPCs
              </button>
            </div>
          )}

          {/* Seletor de Tipo de Pin quando o Modo Pin estiver ativo */}
          {pinMode && (
            <div className="pointer-events-auto bg-slate-900/95 border border-emerald-500/50 rounded-xl p-2 shadow-xl space-y-1">
              <div className="text-[10px] font-extrabold text-emerald-300 uppercase">
                Toque no mapa para posicionar:
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {CUSTOM_PIN_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPinType(pt.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                      selectedPinType === pt.id
                        ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                        : 'bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span>{pt.icon}</span>
                    <span>{pt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Atalhos Rápidos para os Marcadores Pessoais Salvos */}
          {customPins.length > 0 && (
            <div className="pointer-events-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
              {customPins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo([pin.lat, pin.lng], 3.5, { duration: 0.7 });
                    }
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-900/95 hover:bg-slate-800 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold flex items-center gap-1 shadow shrink-0"
                >
                  <span>{pin.icon}</span>
                  <span className="truncate max-w-[80px]">{pin.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botão de Retomar Menus Flutuante quando no Modo Foco */}
        {zenMode && (
          <div className="absolute bottom-3 right-3 z-[400] pointer-events-auto animate-fadeIn">
            <button
              onClick={() => setZenMode(false)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-1.5 border border-amber-300 active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros & Categorias</span>
            </button>
          </div>
        )}

        {/* Dica Rápida do Recurso Selecionado (Ultra-compacto de 1 linha por padrão no mobile!) */}
        {selectedLayerInfo && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-[400] bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-xl p-2 shadow-2xl space-y-1.5 max-w-lg mx-auto pointer-events-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {layerImage(selectedLayerInfo.id) && (
                  <img
                    src={layerImage(selectedLayerInfo.id)}
                    alt=""
                    className="w-6 h-6 object-contain rounded-md bg-slate-800 p-0.5 shrink-0"
                  />
                )}
                <div className="min-w-0 flex items-center gap-1.5">
                  <span className="font-black text-amber-300 text-xs truncate max-w-[130px] sm:max-w-none">
                    {selectedLayerInfo.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">
                    ({rawMapSpawns[selectedLayerInfo.id]?.length || 0} locais)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => activateOnlyAndFly(selectedLayerInfo.id)}
                  className="px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black active:scale-95"
                >
                  Focar
                </button>
                <button
                  onClick={() => setInfoExpanded(!infoExpanded)}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold"
                >
                  {infoExpanded ? 'Menos' : 'Dica'}
                </button>
                <button
                  onClick={() => {
                    setSelectedLayerInfo(null);
                    setInfoExpanded(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Detalhes expandidos sob demanda para não cobrir o mapa à toa */}
            {infoExpanded && (
              <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-xs animate-fadeIn">
                <p className="text-slate-200 text-[11px] leading-snug font-medium">
                  💡 {selectedLayerInfo.tip}
                </p>
                {selectedLayerInfo.toolReq && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                    <span>{selectedLayerInfo.toolReq}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Painel Inferior de Filtros (Oculto no Modo Foco para dar 100% de tela ao mapa!) */}
      {!zenMode && (
        <div className="bg-[#0d131f] border-t border-slate-800 px-2.5 pt-2 pb-2 space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <ScrollStrip allowWrapToggle={false}>
                {MAP_CATEGORIES.map((cat) => {
                  const isSelected = selectedCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (selectedCat === cat.id && drawerOpen) {
                          setDrawerOpen(false);
                        } else {
                          setSelectedCat(cat.id);
                          setDrawerOpen(true);
                        }
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition active:scale-95 border ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-black'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700/70 hover:bg-slate-700'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      {isSelected && drawerOpen && <span className="text-[10px]">▾</span>}
                    </button>
                  );
                })}
              </ScrollStrip>
            </div>

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              title={drawerOpen ? 'Recolher gaveta de filtros' : 'Expandir gaveta de filtros'}
              className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-bold flex items-center gap-1 shrink-0 active:scale-95"
            >
              <span className="text-[10px] hidden sm:inline">{drawerOpen ? 'Recolher' : 'Recursos'}</span>
              {drawerOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Botões dos Recursos da Categoria Selecionada */}
          {drawerOpen && (
            <ScrollStrip allowWrapToggle={false}>
              {/* Ações Rápidas da Categoria */}
              {activeInCategory.length > 0 ? (
                <button
                  onClick={clearCategory}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 border bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 transition active:scale-95 flex items-center gap-1"
                >
                  <span>✕</span>
                  <span>Limpar ({activeInCategory.length})</span>
                </button>
              ) : (
                <button
                  onClick={markAllInCategory}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 border bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 transition active:scale-95 flex items-center gap-1"
                >
                  <span>+</span>
                  <span>Todos ({layersInCategory.length})</span>
                </button>
              )}

              {/* Botão Limpar Todo o Mapa (se houver qualquer camada ativa) */}
              {effectiveLayers.length > 0 && (
                <button
                  onClick={clearAllMapFilters}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold shrink-0 border bg-rose-600 text-white border-rose-500 hover:bg-rose-500 transition active:scale-95 flex items-center gap-1 shadow"
                >
                  <span>🧹</span>
                  <span>Limpar Mapa</span>
                </button>
              )}

              {layersInCategory.map((layer) => {
                const isActive = effectiveLayers.includes(layer.id);
                const count = rawMapSpawns[layer.id]?.length || 0;
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition active:scale-95 border ${
                      isActive
                        ? 'bg-slate-800 text-white border-2 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: isActive ? layer.color : undefined,
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-slate-950 shrink-0 bg-slate-950 border-2 overflow-hidden relative"
                      style={{ borderColor: layer.color }}
                    >
                      <span className="absolute" style={{ color: layer.color }}>
                        {layer.symbol}
                      </span>
                      {layerImage(layer.id) && (
                        <img
                          src={layerImage(layer.id)}
                          alt=""
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="relative w-4 h-4 object-contain"
                        />
                      )}
                    </span>
                    <div className="text-left">
                      <div className="leading-none flex items-center gap-1">
                        <span className="truncate max-w-[100px] sm:max-w-none">{layer.name}</span>
                        {isActive && <span className="text-emerald-400 text-[10px] font-black">✓</span>}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {layer.tier} • {count}x
                      </div>
                    </div>
                  </button>
                );
              })}
            </ScrollStrip>
          )}
        </div>
      )}
    </div>
  );
}
