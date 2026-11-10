(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const icon = (name, className = "") =>
    `<svg class="icon ${className}" aria-hidden="true"><use href="#${name}"></use></svg>`;
  const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return entities[character];
    });

  const demoClock = {
    startSeconds: 9 * 3600 + 42 * 60 + 18,
    startedAt: Date.now()
  };

  const simulatedSeconds = () =>
    demoClock.startSeconds + Math.floor((Date.now() - demoClock.startedAt) / 1000);

  const chileTime = (withSeconds = false) => {
    const total = simulatedSeconds();
    const hours = String(Math.floor(total / 3600) % 24).padStart(2, "0");
    const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const seconds = String(total % 60).padStart(2, "0");
    return withSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
  };

  const nowChile = () => chileTime(false);

  const riskMeta = {
    red: { label: "Riesgo alto", short: "Riesgo alto", icon: "i-alert", glyph: "zone-glyph-red", className: "red" },
    yellow: { label: "Riesgo moderado", short: "Moderado", icon: "i-eye", glyph: "zone-glyph-yellow", className: "yellow" },
    green: { label: "Preventivo", short: "Preventivo", icon: "i-shield", glyph: "zone-glyph-green", className: "green" }
  };

  const typeMeta = {
    aseo: { name: "Aseo", icon: "i-trash" },
    bacheo: { name: "Bacheo", icon: "i-road" },
    alumbrado: { name: "Alumbrado", icon: "i-lamp" }
  };

  const zones = [
    {
      id: "rinconada",
      shape: "rinconada",
      name: "Rinconada",
      risk: "red",
      detail: "Pasaje oscuro",
      x: 24,
      y: 29
    },
    {
      id: "ciudad-satelite",
      shape: "satelite",
      name: "Ciudad Satélite",
      risk: "yellow",
      detail: "Feria y accesos",
      x: 57,
      y: 19
    },
    {
      id: "pajaritos",
      shape: "pajaritos",
      name: "Pajaritos",
      risk: "red",
      detail: "Riesgo de caída",
      x: 41,
      y: 46
    },
    {
      id: "centro",
      shape: "centro",
      name: "Centro",
      risk: "yellow",
      detail: "Atención moderada",
      x: 29,
      y: 65
    },
    {
      id: "farfana",
      shape: "farfana",
      name: "La Farfana",
      risk: "green",
      detail: "Mantención",
      x: 22,
      y: 80
    },
    {
      id: "malloco",
      shape: "malloco",
      name: "Malloco",
      risk: "green",
      detail: "Ruta preventiva",
      x: 75,
      y: 69
    }
  ];

  const tickets = [
    {
      id: "M-2471",
      type: "alumbrado",
      title: "Luminaria intermitente en pasaje Los Aromos",
      address: "Pasaje Los Aromos, Rinconada",
      zoneId: "rinconada",
      risk: "red",
      urgency: "Alta",
      urgencyNote: "Vence en 38 min",
      severity: "Crítica",
      severityNote: "Pasaje sin luz",
      eta: "10:20",
      reports: "5 reportes",
      x: 32,
      y: 39,
      assignedCrew: null
    },
    {
      id: "M-2468",
      type: "bacheo",
      title: "Bache profundo en Av. Pajaritos con Los Pinos",
      address: "Av. Pajaritos con Av. Los Pinos",
      zoneId: "pajaritos",
      risk: "red",
      urgency: "Alta",
      urgencyNote: "Vence en 1 h 05",
      severity: "Crítica",
      severityNote: "Riesgo de caída",
      eta: "10:35",
      reports: "12 reportes",
      x: 60,
      y: 44,
      assignedCrew: null
    },
    {
      id: "M-2463",
      type: "aseo",
      title: "Microbasural en Av. 5 de Abril con Portales",
      address: "Av. 5 de Abril con Portales, Centro",
      zoneId: "centro",
      risk: "yellow",
      urgency: "Media",
      urgencyNote: "Vence en 2 h 10",
      severity: "Alta",
      severityNote: "Acceso peatonal",
      eta: "11:10",
      reports: "8 reportes",
      x: 43,
      y: 60,
      assignedCrew: null
    },
    {
      id: "M-2459",
      type: "aseo",
      title: "Contenedor rebosado frente a la feria",
      address: "Av. Los Pinos, Ciudad Satélite",
      zoneId: "ciudad-satelite",
      risk: "yellow",
      urgency: "Media",
      urgencyNote: "Vence en 3 h",
      severity: "Moderada",
      severityNote: "Riesgo sanitario",
      eta: "11:40",
      reports: "4 reportes",
      x: 67,
      y: 27,
      assignedCrew: null
    },
    {
      id: "M-2455",
      type: "alumbrado",
      title: "Recambio preventivo de luminaria en Av. Alberto Llona",
      address: "Av. Alberto Llona, La Farfana",
      zoneId: "farfana",
      risk: "green",
      urgency: "Baja",
      urgencyNote: "Programado 15:30",
      severity: "Preventiva",
      severityNote: "Sin riesgo activo",
      eta: "15:30",
      reports: "Planificado",
      x: 29,
      y: 72,
      assignedCrew: null
    },
    {
      id: "M-2451",
      type: "bacheo",
      title: "Sellado preventivo en Camino a Melipilla",
      address: "Camino a Melipilla, Malloco",
      zoneId: "malloco",
      risk: "green",
      urgency: "Baja",
      urgencyNote: "Programado 16:10",
      severity: "Preventiva",
      severityNote: "Sin riesgo activo",
      eta: "16:10",
      reports: "Planificado",
      x: 64,
      y: 82,
      assignedCrew: null
    }
  ];

  const fleet = [
    {
      id: "12",
      name: "Camión 12",
      route: "Rinconada · Ruta 2",
      zoneId: "rinconada",
      online: true,
      camera: "Activa",
      cameraDetail: "3 baches detectados",
      vibration: "0.18 g",
      speed: "18 km/h",
      location: "Av. Pajaritos, Rinconada",
      lastSync: "hace 4 s",
      pending: 0,
      x: 43,
      y: 31
    },
    {
      id: "07",
      name: "Camión 07",
      route: "Ciudad Satélite · Ruta 1",
      zoneId: "ciudad-satelite",
      online: true,
      camera: "Activa",
      cameraDetail: "Sin novedades",
      vibration: "0.12 g",
      speed: "12 km/h",
      location: "Av. Los Pinos, Ciudad Satélite",
      lastSync: "hace 8 s",
      pending: 0,
      x: 74,
      y: 18
    },
    {
      id: "03",
      name: "Camión 03",
      route: "Centro · Ruta 4",
      zoneId: "centro",
      online: true,
      camera: "Activa",
      cameraDetail: "1 contenedor lleno",
      vibration: "0.21 g",
      speed: "24 km/h",
      location: "Av. 5 de Abril, Centro",
      lastSync: "hace 3 s",
      pending: 0,
      x: 26,
      y: 53
    },
    {
      id: "09",
      name: "Camión 09",
      route: "Malloco · Ruta 6",
      zoneId: "malloco",
      online: false,
      camera: "En cola local",
      cameraDetail: "2 detecciones guardadas",
      vibration: "0.16 g",
      speed: "0 km/h",
      location: "Camino a Melipilla, Malloco",
      lastSync: "hace 24 min",
      pending: 14,
      x: 79,
      y: 63
    }
  ];

  const appState = {
    view: "dashboard",
    lastSync: Date.now() - 12000,
    mapMode: "status",
    activeLayers: new Set(["aseo", "bacheo", "alumbrado"]),
    activeRisk: "all",
    selectedZone: null,
    selectedTickets: new Set(),
    activeFleetId: null,
    isDispatching: false
  };

  let toastTimer = null;

  function showToast(message) {
    const toast = $("#toast");
    const text = $("#toast-message");
    if (!toast || !text) return;
    text.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 5200);
  }

  function getZone(zoneId) {
    return zones.find((zone) => zone.id === zoneId);
  }

  function getTicket(ticketId) {
    return tickets.find((ticket) => ticket.id === ticketId);
  }

  function getFleet(truckId) {
    return fleet.find((truck) => truck.id === truckId);
  }

  function zoneTicketCount(zoneId) {
    return tickets.filter((ticket) => ticket.zoneId === zoneId).length;
  }

  function visibleTickets() {
    return tickets.filter((ticket) => {
      if (appState.selectedZone && ticket.zoneId !== appState.selectedZone) return false;
      if (appState.activeRisk !== "all" && ticket.risk !== appState.activeRisk) return false;
      return true;
    });
  }

  function updateClock() {
    const clock = $("#live-clock");
    if (clock) {
      const displayTime = chileTime();
      clock.textContent = displayTime;
      clock.setAttribute("datetime", displayTime);
    }
  }

  function updateSyncLabel() {
    const sync = $(".sync-state");
    if (!sync) return;
    const seconds = Math.max(0, Math.floor((Date.now() - appState.lastSync) / 1000));
    const suffix = seconds < 60 ? `${seconds} s` : `${Math.floor(seconds / 60)} min`;
    sync.innerHTML = `<span class="sync-dot" aria-hidden="true"></span><span>Actualizado hace ${suffix}</span>`;
  }

  function updateCutLabels() {
    const mapCut = $("#map-cut");
    if (mapCut) mapCut.textContent = chileTime();
    const fleetUpdated = $(".fleet-updated");
    if (fleetUpdated) fleetUpdated.textContent = `Corte ${chileTime(true)}`;
  }

  function renderViewNavigation() {
    $$("[data-view-link]").forEach((link) => {
      const active = link.dataset.viewLink === appState.view;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function showView(viewName, options = {}) {
    const validView = viewName === "citizen" ? "citizen" : "dashboard";
    appState.view = validView;

    $$(".view").forEach((view) => {
      view.hidden = view.dataset.view !== validView;
    });
    renderViewNavigation();

    document.title =
      validView === "citizen"
        ? "Canal ciudadano · MiMaipú"
        : "Despacho municipal · MiMaipú";

    if (options.focus) {
      const heading = validView === "citizen" ? $("#citizen-title") : $("#dashboard-title");
      window.scrollTo({ top: 0, behavior: "auto" });
      heading?.focus({ preventScroll: true });
    }
  }

  function initialViewFromHash() {
    const hash = window.location.hash.replace("#", "");
    return hash === "ciudadano" ? "citizen" : "dashboard";
  }

  function setupRouting() {
    $$("[data-view-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const target = link.dataset.viewLink;
        const hash = target === "citizen" ? "#ciudadano" : "#despacho";
        if (window.location.hash !== hash) {
          window.history.pushState({}, "", hash);
        }
        showView(target, { focus: true });
      });
    });

    window.addEventListener("popstate", () => {
      showView(initialViewFromHash(), { focus: true });
    });

    window.addEventListener("hashchange", () => {
      showView(initialViewFromHash(), { focus: true });
    });
  }

  function setMapMode(mode, options = {}) {
    const nextMode = mode === "incidents" ? "incidents" : "status";
    if (nextMode === "incidents" && appState.mapMode !== "incidents" && appState.selectedZone) {
      appState.selectedZone = null;
      appState.selectedTickets.clear();
      renderTickets();
      updateBulkBar();
    }
    appState.mapMode = nextMode;
    const stage = $("#map-stage");
    if (stage) stage.dataset.mapMode = appState.mapMode;
    $$(".segment[data-map-mode]").forEach((button) => {
      const active = button.dataset.mapMode === appState.mapMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (!options.keepPopover) closeMapPopover();
    updateMapState();
  }

  function renderZones() {
    const container = $("#zones-layer");
    if (!container) return;
    container.innerHTML = zones
      .map((zone) => {
        const meta = riskMeta[zone.risk];
        const count = zoneTicketCount(zone.id);
        const countLabel = count === 1 ? "1 caso" : `${count} casos`;
        return `
          <button class="zone-label" type="button" data-zone-id="${zone.id}" style="left:${zone.x}%;top:${zone.y}%" aria-pressed="false">
            <span class="zone-glyph ${meta.glyph}">${icon(meta.icon)}</span>
            <span class="zone-copy">
              <strong>${escapeHTML(zone.name)}</strong>
              <small>${meta.short} · ${countLabel}</small>
            </span>
          </button>`;
      })
      .join("");
  }

  function renderPins() {
    const container = $("#pins-layer");
    if (!container) return;
    const ticketMarkup = tickets
      .map((ticket) => {
        const type = typeMeta[ticket.type];
        return `
          <button class="map-pin" type="button" data-ticket-id="${ticket.id}" style="left:${ticket.x}%;top:${ticket.y}%" aria-label="${escapeHTML(type.name)}, ${escapeHTML(ticket.title)}. ${riskMeta[ticket.risk].label}" title="${escapeHTML(ticket.id)} · ${escapeHTML(ticket.title)}">
            ${icon(type.icon)}
          </button>`;
      })
      .join("");

    const truckMarkup = fleet
      .map((truck) => {
        const zone = getZone(truck.zoneId);
        return `
          <button class="map-truck${truck.online ? "" : " is-offline"}" type="button" data-truck-id="${truck.id}" style="left:${truck.x}%;top:${truck.y}%" aria-label="${escapeHTML(truck.name)}, ${truck.online ? "en línea" : "modo offline"}. ${escapeHTML(zone?.name || "")}">
            ${icon("i-truck")}
          </button>`;
      })
      .join("");

    container.innerHTML = ticketMarkup + truckMarkup;
  }

  function updateMapState() {
    const riskFilter = appState.activeRisk;
    const zoneSelection = appState.selectedZone;

    $$(".zone-label").forEach((button) => {
      const zone = getZone(button.dataset.zoneId);
      if (!zone) return;
      const riskMatches = riskFilter === "all" || zone.risk === riskFilter;
      button.classList.toggle("is-muted", !riskMatches);
      button.disabled = !riskMatches;
      button.classList.toggle("is-selected", zoneSelection === zone.id);
      button.setAttribute("aria-pressed", String(zoneSelection === zone.id));
    });

    $$("[data-zone-shape]").forEach((shape) => {
      const zone = zones.find((item) => item.shape === shape.dataset.zoneShape);
      if (!zone) return;
      shape.classList.toggle("is-filtered", riskFilter !== "all" && zone.risk !== riskFilter);
      shape.classList.toggle("is-selected", zoneSelection === zone.id);
    });

    $$("[data-risk]").forEach((button) => {
      const active = button.dataset.risk === riskFilter;
      if (button.id === "reset-risk") {
        button.setAttribute("aria-pressed", String(riskFilter === "all"));
      } else {
        button.setAttribute("aria-pressed", String(active));
        button.classList.toggle("is-dimmed", riskFilter !== "all" && !active);
      }
    });

    const resetRisk = $("#reset-risk");
    if (resetRisk) {
      resetRisk.textContent = riskFilter === "all" ? "Ver todo" : "Quitar filtro";
      resetRisk.setAttribute("aria-pressed", String(riskFilter === "all"));
      resetRisk.disabled = riskFilter === "all";
    }

    $$(".map-pin").forEach((pin) => {
      const ticket = getTicket(pin.dataset.ticketId);
      if (!ticket) return;
      const layerOff = !appState.activeLayers.has(ticket.type);
      const riskOff = riskFilter !== "all" && ticket.risk !== riskFilter;
      const zoneOff = Boolean(zoneSelection) && ticket.zoneId !== zoneSelection;
      pin.classList.toggle("is-layer-off", layerOff);
      pin.classList.toggle("is-risk-off", riskOff);
      pin.classList.toggle("is-zone-off", zoneOff);
      pin.hidden = layerOff || riskOff || zoneOff;
    });

    $$(".map-truck").forEach((marker) => {
      marker.hidden = false;
      marker.classList.remove("is-zone-off");
    });

    const zoneFilterChip = $("#map-zone-filter");
    if (zoneFilterChip) {
      const selected = getZone(zoneSelection);
      if (selected && appState.mapMode === "incidents") {
        zoneFilterChip.hidden = false;
        zoneFilterChip.innerHTML = `${icon("i-x")}<span>Zona: <strong>${escapeHTML(selected.name)}</strong></span>`;
        zoneFilterChip.setAttribute("aria-label", `Quitar filtro de zona ${selected.name}`);
      } else {
        zoneFilterChip.hidden = true;
      }
    }

    $$("[data-layer]").forEach((button) => {
      const active = appState.activeLayers.has(button.dataset.layer);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const mapSummary = $(".map-summary");
    if (mapSummary) {
      const cases = tickets.filter((ticket) => {
        if (!appState.activeLayers.has(ticket.type)) return false;
        if (riskFilter !== "all" && ticket.risk !== riskFilter) return false;
        if (zoneSelection && ticket.zoneId !== zoneSelection) return false;
        return true;
      }).length;
      mapSummary.innerHTML = `
        <span class="map-summary-dot" aria-hidden="true"></span>
        <span><strong>${cases} ${cases === 1 ? "caso visible" : "casos visibles"}</strong> · ${appState.mapMode === "status" ? "vista semáforo" : "vista incidentes"}</span>`;
    }
  }

  let popoverReturnFocus = null;

  function closeMapPopover(options = {}) {
    const popover = $("#map-popover");
    if (!popover) return;
    popover.hidden = true;
    popover.innerHTML = "";
    if (options.restoreFocus && popoverReturnFocus?.isConnected) {
      popoverReturnFocus.focus({ preventScroll: true });
    }
  }

  function rememberPopoverTrigger() {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("#map-stage") && !active.closest("#map-popover")) {
      popoverReturnFocus = active;
    }
  }

  function focusPopoverHeading(popover) {
    const heading = popover.querySelector("h3");
    if (!heading) return;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  function openZonePopover(zone) {
    const popover = $("#map-popover");
    if (!popover) return;
    rememberPopoverTrigger();
    const meta = riskMeta[zone.risk];
    const zoneTickets = tickets.filter((ticket) => ticket.zoneId === zone.id);
    const typeSummary = [...new Set(zoneTickets.map((ticket) => typeMeta[ticket.type].name))].join(" · ");
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-modal", "false");
    popover.setAttribute("aria-label", `Detalle de la macrozona ${zone.name}`);
    popover.innerHTML = `
      <div class="map-popover-head">
        <div>
          <p class="ticket-label">Macrozona</p>
          <h3>${escapeHTML(zone.name)}</h3>
        </div>
        <button class="icon-button" type="button" data-close-popover aria-label="Cerrar detalle de ${escapeHTML(zone.name)}">${icon("i-x")}</button>
      </div>
      <span class="status-pill status-pill-${meta.className}">${meta.label}</span>
      <p>${escapeHTML(zone.detail)} · ${zoneTickets.length} ${zoneTickets.length === 1 ? "caso activo" : "casos activos"}${typeSummary ? ` · ${escapeHTML(typeSummary)}` : ""}</p>
      <button class="button button-primary" type="button" data-zone-to-tickets="${zone.id}">Ver en la lista</button>`;
    popover.hidden = false;
    focusPopoverHeading(popover);
  }

  function openTicketPopover(ticket) {
    const popover = $("#map-popover");
    if (!popover) return;
    rememberPopoverTrigger();
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-modal", "false");
    popover.setAttribute("aria-label", `Detalle del ticket ${ticket.id}`);
    popover.innerHTML = `
      <div class="map-popover-head">
        <div>
          <p class="ticket-label">${escapeHTML(ticket.id)} · ${escapeHTML(typeMeta[ticket.type].name)}</p>
          <h3>${escapeHTML(ticket.title)}</h3>
        </div>
        <button class="icon-button" type="button" data-close-popover aria-label="Cerrar detalle del ticket">${icon("i-x")}</button>
      </div>
      <span class="status-pill status-pill-${ticket.risk}">${riskMeta[ticket.risk].label}</span>
      <p>${escapeHTML(ticket.address)} · Llegada estimada ${escapeHTML(ticket.eta)}${ticket.assignedCrew ? ` · Cuadrilla ${escapeHTML(ticket.assignedCrew)}` : ""}</p>
      <button class="button button-primary" type="button" data-ticket-to-list="${ticket.id}">Abrir en la lista</button>`;
    popover.hidden = false;
    focusPopoverHeading(popover);
  }

  function focusTicketList() {
    const heading = $("#tickets-title");
    if (!heading) return;
    heading.focus({ preventScroll: true });
  }

  function filterToTicket(ticket) {
    appState.activeRisk = "all";
    appState.selectedZone = ticket.zoneId;
    appState.selectedTickets.clear();
    closeMapPopover();
    renderTickets();
    updateMapState();
    updateBulkBar();
    if (window.innerWidth < 1181) {
      $(".tickets-panel")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      focusTicketList();
    } else {
      const card = $(`.ticket-row[data-ticket-id="${ticket.id}"]`);
      card?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
      card?.classList.add("is-focused");
      window.setTimeout(() => card?.classList.remove("is-focused"), 1600);
      focusTicketList();
    }
  }

  function selectZone(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return;
    appState.selectedZone = appState.selectedZone === zoneId ? null : zoneId;
    appState.selectedTickets.clear();
    updateMapState();
    renderTickets();
    updateBulkBar();
    if (appState.selectedZone) {
      openZonePopover(zone);
    } else {
      closeMapPopover();
    }
  }

  function clearAllMapFilters() {
    appState.activeRisk = "all";
    appState.selectedZone = null;
    appState.selectedTickets.clear();
    updateMapState();
    renderTickets();
    updateBulkBar();
    closeMapPopover();
  }

  function setupMap() {
    renderZones();
    renderPins();
    updateMapState();

    $$(".segment[data-map-mode]").forEach((button) => {
      button.addEventListener("click", () => setMapMode(button.dataset.mapMode));
    });

    $$("[data-layer]").forEach((button) => {
      button.addEventListener("click", () => {
        const layer = button.dataset.layer;
        if (appState.activeLayers.has(layer)) {
          appState.activeLayers.delete(layer);
        } else {
          appState.activeLayers.add(layer);
        }
        if (appState.mapMode !== "incidents") setMapMode("incidents");
        updateMapState();
      });
    });

    $$("[data-risk]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextRisk = button.dataset.risk;
        appState.activeRisk = appState.activeRisk === nextRisk ? "all" : nextRisk;
        if (appState.selectedZone) {
          const selected = getZone(appState.selectedZone);
          if (selected && appState.activeRisk !== "all" && selected.risk !== appState.activeRisk) {
            appState.selectedZone = null;
          }
        }
        appState.selectedTickets.clear();
        closeMapPopover();
        updateMapState();
        renderTickets();
        updateBulkBar();
      });
    });

    $("#reset-risk")?.addEventListener("click", () => {
      if (appState.activeRisk === "all") return;
      appState.activeRisk = "all";
      appState.selectedTickets.clear();
      updateMapState();
      renderTickets();
      updateBulkBar();
    });

    $("#zones-layer")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-zone-id]");
      if (!button) return;
      selectZone(button.dataset.zoneId);
    });

    $("#pins-layer")?.addEventListener("click", (event) => {
      const pin = event.target.closest("[data-ticket-id]");
      if (pin) {
        const ticket = getTicket(pin.dataset.ticketId);
        if (ticket) openTicketPopover(ticket);
        return;
      }
      const truckButton = event.target.closest("[data-truck-id]");
      if (truckButton) openFleetDialog(truckButton.dataset.truckId);
    });

    $("#map-zone-filter")?.addEventListener("click", () => {
      appState.selectedZone = null;
      appState.selectedTickets.clear();
      closeMapPopover();
      updateMapState();
      renderTickets();
      updateBulkBar();
    });

    $("#map-popover")?.addEventListener("click", (event) => {
      const close = event.target.closest("[data-close-popover]");
      if (close) {
        closeMapPopover({ restoreFocus: true });
        return;
      }
      const zoneButton = event.target.closest("[data-zone-to-tickets]");
      if (zoneButton) {
        const zone = getZone(zoneButton.dataset.zoneToTickets);
        if (zone) {
          appState.selectedZone = zone.id;
          appState.activeRisk = appState.activeRisk !== "all" && appState.activeRisk !== zone.risk ? "all" : appState.activeRisk;
          appState.selectedTickets.clear();
          renderTickets();
          updateMapState();
          updateBulkBar();
          closeMapPopover();
          if (window.innerWidth < 1181) {
            $(".tickets-panel")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
          }
          focusTicketList();
        }
        return;
      }
      const ticketButton = event.target.closest("[data-ticket-to-list]");
      if (ticketButton) {
        const ticket = getTicket(ticketButton.dataset.ticketToList);
        if (ticket) filterToTicket(ticket);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const popover = $("#map-popover");
      if (popover && !popover.hidden) closeMapPopover({ restoreFocus: true });
    });
  }

  function ticketRowMarkup(ticket, index) {
    const type = typeMeta[ticket.type];
    const selected = appState.selectedTickets.has(ticket.id);
    const isUrgent = ticket.urgency === "Alta";
    const assigned = Boolean(ticket.assignedCrew);
    return `
      <article class="ticket-row${selected ? " is-selected" : ""}${assigned ? " is-assigned" : ""}" data-ticket-id="${ticket.id}">
        <span class="ticket-rank" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <div class="ticket-content">
          <div class="ticket-meta">
            <span class="ticket-meta-type">${icon(type.icon)}#${escapeHTML(ticket.id)} · ${escapeHTML(type.name)}</span>
            <span class="ticket-risk ticket-risk-${ticket.risk}">${riskMeta[ticket.risk].label}</span>
          </div>
          <h3 class="ticket-title">${escapeHTML(ticket.title)}</h3>
          <div class="ticket-context">
            <span class="ticket-location">${icon("i-pin")}${escapeHTML(ticket.address)}</span>
            <span class="ticket-time">${icon("i-clock")}Atención <strong>${escapeHTML(ticket.eta)}</strong> · ${escapeHTML(ticket.reports)}</span>
          </div>
          <div class="ticket-facts">
            <span class="ticket-fact${isUrgent ? " is-urgent" : ""}">
              <span>Urgencia</span><strong>${escapeHTML(ticket.urgency)}</strong><small>${escapeHTML(ticket.urgencyNote)}</small>
            </span>
            <span class="ticket-fact">
              <span>Severidad</span><strong>${escapeHTML(ticket.severity)}</strong><small>${escapeHTML(ticket.severityNote)}</small>
            </span>
          </div>
        </div>
        ${
          assigned
            ? `<span class="ticket-assigned" aria-label="Asignado a cuadrilla ${escapeHTML(ticket.assignedCrew)}">${icon("i-check-circle")}${escapeHTML(ticket.assignedCrew)}</span>`
            : `<button class="ticket-select" type="button" data-select-ticket="${ticket.id}" aria-pressed="${selected}" aria-label="${selected ? "Quitar" : "Sumar"} ${escapeHTML(ticket.title)} ${selected ? "del" : "al"} despacho agrupado" title="${selected ? "Quitar del despacho" : "Sumar al despacho"}">
                <span class="select-mark">${icon("i-check")}</span>
              </button>`
        }
      </article>`;
  }

  function renderTickets() {
    const list = $("#ticket-list");
    if (!list) return;
    const visible = visibleTickets();
    const isFiltered = appState.activeRisk !== "all" || Boolean(appState.selectedZone);
    list.innerHTML = visible.length
      ? visible.map(ticketRowMarkup).join("")
      : `<div class="ticket-empty">
          <p>No hay tickets para este filtro.</p>
          <button class="text-button" type="button" data-reset-filters>Ver todos los tickets</button>
        </div>`;

    const countLabel = $(".open-count");
    if (countLabel) {
      countLabel.innerHTML = `<strong>${visible.length}</strong> ${isFiltered ? "visibles" : "abiertos"}`;
    }

    const zoneButton = $("#clear-zone");
    if (zoneButton) {
      if (isFiltered) {
        zoneButton.hidden = false;
        const zoneName = appState.selectedZone ? getZone(appState.selectedZone)?.name : null;
        if (zoneName && appState.activeRisk !== "all") {
          zoneButton.textContent = "Limpiar filtros";
        } else if (zoneName) {
          zoneButton.textContent = `Quitar ${zoneName}`;
        } else {
          zoneButton.textContent = "Quitar filtro de estado";
        }
      } else {
        zoneButton.hidden = true;
      }
    }

    updateBulkBar();
  }

  function updateBulkBar() {
    const selected = tickets.filter((ticket) => appState.selectedTickets.has(ticket.id));
    const title = $("#bulk-title");
    const help = $("#bulk-help");
    const button = $("#group-dispatch");
    if (!title || !help || !button) return;

    if (selected.length === 0) {
      title.textContent = "Selecciona 2 o más casos";
      help.textContent = "Una cuadrilla multifuncional atiende fallas cercanas en una sola ruta.";
      button.disabled = true;
    } else if (selected.length === 1) {
      title.textContent = "1 caso seleccionado";
      help.textContent = "Suma otro caso cercano para activar el despacho agrupado.";
      button.disabled = true;
    } else {
      title.textContent = `${selected.length} casos seleccionados`;
      help.textContent = "Ruta cercana detectada. Una cuadrilla multifuncional puede cubrir ambos.";
      button.disabled = false;
    }
  }

  function toggleTicketSelection(ticketId) {
    const ticket = getTicket(ticketId);
    if (!ticket || ticket.assignedCrew) return;
    if (appState.selectedTickets.has(ticketId)) {
      appState.selectedTickets.delete(ticketId);
    } else {
      appState.selectedTickets.add(ticketId);
    }

    const card = $(`.ticket-row[data-ticket-id="${ticketId}"]`);
    const button = card?.querySelector("[data-select-ticket]");
    const selected = appState.selectedTickets.has(ticketId);
    card?.classList.toggle("is-selected", selected);
    if (button) {
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${selected ? "Quitar" : "Sumar"} ${ticket.title} ${selected ? "del" : "al"} despacho agrupado`);
      button.setAttribute("title", selected ? "Quitar del despacho" : "Sumar al despacho");
    }
    updateBulkBar();
  }

  function setupTickets() {
    renderTickets();

    $("#ticket-list")?.addEventListener("click", (event) => {
      const select = event.target.closest("[data-select-ticket]");
      if (select) {
        toggleTicketSelection(select.dataset.selectTicket);
        return;
      }
      if (event.target.closest("[data-reset-filters]")) {
        clearAllMapFilters();
      }
    });

    $("#clear-zone")?.addEventListener("click", clearAllMapFilters);

    $("#group-dispatch")?.addEventListener("click", () => {
      if (appState.selectedTickets.size >= 2) openDispatchDialog();
    });
  }

  function openDispatchDialog() {
    const dialog = $("#dispatch-dialog");
    const selected = tickets.filter((ticket) => appState.selectedTickets.has(ticket.id));
    if (!dialog || selected.length < 2) return;

    const container = $("#dispatch-selected");
    if (container) {
      container.innerHTML = selected
        .map(
          (ticket, index) => `
            <div class="dispatch-ticket">
              <span class="dispatch-route-index">${index + 1}</span>
              <div>
                <strong>${escapeHTML(ticket.title)}</strong>
                <small>${escapeHTML(ticket.id)} · ${escapeHTML(ticket.address)}</small>
              </div>
              <span class="status-pill status-pill-${ticket.risk}">${riskMeta[ticket.risk].label}</span>
            </div>`
        )
        .join("");
    }

    $("#confirm-dispatch").disabled = false;
    $("#confirm-dispatch").textContent = "Asignar cuadrilla";
    openAppDialog(dialog);
    window.setTimeout(() => $("#crew-select")?.focus(), 60);
  }

  async function confirmDispatch() {
    if (appState.isDispatching || appState.selectedTickets.size < 2) return;
    appState.isDispatching = true;
    const confirmButton = $("#confirm-dispatch");
    const crew = $("#crew-select")?.value || "M-04";
    const selected = tickets.filter((ticket) => appState.selectedTickets.has(ticket.id));
    confirmButton.disabled = true;
    confirmButton.textContent = "Asignando ruta...";

    await wait(780);
    selected.forEach((ticket) => {
      ticket.assignedCrew = crew;
    });
    appState.selectedTickets.clear();
    $("#dispatch-dialog")?.close();
    confirmButton.disabled = false;
    confirmButton.textContent = "Asignar cuadrilla";
    appState.isDispatching = false;
    closeMapPopover();
    renderTickets();
    updateMapState();
    focusTicketList();
    showToast(
      `Cuadrilla ${crew} asignada a ${selected.length} casos. Ruta agrupada activa y ahorro de 2,4 L de diésel proyectado.`
    );
  }

  function setupDispatchDialog() {
    $("#confirm-dispatch")?.addEventListener("click", confirmDispatch);
  }

  function fleetCardMarkup(truck) {
    const statusText = truck.online ? "En línea" : "Offline";
    const cameraText = truck.online ? truck.camera : "Guardando local";
    return `
      <button class="fleet-item${truck.online ? "" : " is-offline"}" type="button" data-truck-id="${truck.id}">
        <span class="fleet-top">
          <span class="fleet-icon">${icon("i-truck")}</span>
          <span class="fleet-name">
            <strong>${escapeHTML(truck.name)}</strong>
            <small>${escapeHTML(truck.route)}</small>
          </span>
          <span class="connectivity${truck.online ? "" : " is-offline"}">
            <span class="status-dot ${truck.online ? "status-dot-green" : "status-dot-yellow"}" aria-hidden="true"></span>${statusText}
          </span>
        </span>
        <span class="sensor-row">
          <span class="sensor">
            <span class="sensor-label">${icon("i-camera")}Cámara IA</span>
            <strong>${escapeHTML(cameraText)}</strong>
          </span>
          <span class="sensor">
            <span class="sensor-label">${icon("i-vibration")}Vibración</span>
            <strong>${escapeHTML(truck.vibration)}</strong>
          </span>
        </span>
        <span class="fleet-bottom">
          <span>${truck.online ? `${escapeHTML(truck.location)} · ${escapeHTML(truck.speed)}` : `${truck.pending} lecturas en cola local`}</span>
          <span class="detail-cue">Ver ficha</span>
        </span>
      </button>`;
  }

  function renderFleet() {
    const grid = $("#fleet-grid");
    if (!grid) return;
    grid.innerHTML = fleet.map(fleetCardMarkup).join("");
  }

  function fleetDialogMarkup(truck) {
    const statusText = truck.online ? "En línea · sincronización automática" : "Modo offline · guardando en el vehículo";
    return `
      <div class="fleet-dialog-body">
        <div class="fleet-dialog-top">
          <span class="truck-mark">${icon("i-truck")}</span>
          <div>
            <strong>${escapeHTML(truck.name)}</strong>
            <small>${escapeHTML(truck.route)} · ${statusText}</small>
          </div>
        </div>
        <div class="fleet-detail-grid">
          <div class="fleet-detail"><span>Cámara IA</span><strong>${escapeHTML(truck.camera)}</strong><small>${escapeHTML(truck.cameraDetail)}</small></div>
          <div class="fleet-detail"><span>Sensor de vibración</span><strong>${escapeHTML(truck.vibration)}</strong></div>
          <div class="fleet-detail"><span>Ubicación actual</span><strong>${escapeHTML(truck.location)}</strong></div>
          <div class="fleet-detail"><span>Última sincronización</span><strong>${escapeHTML(truck.lastSync)}</strong></div>
        </div>
        ${
          truck.online
            ? `<div class="authorized-box">${icon("i-check-circle")}Telemetría al día. Cámara y sensor transmitiendo por la red municipal.</div>`
            : `<div class="offline-banner">
                ${icon("i-cloud-off")}
                <div>
                  <strong>Modo offline activo</strong>
                  <p>${truck.pending} lecturas guardadas localmente. La cámara y el sensor siguen registrando. Los datos se sincronizarán al recuperar señal.</p>
                  <button class="button button-secondary" type="button" id="fleet-connection-button">Comprobar señal</button>
                </div>
              </div>`
        }
        <p class="dialog-note">${icon("i-info")}Datos de telemetría simulados para esta demostración.</p>
      </div>`;
  }

  function openFleetDialog(truckId) {
    const truck = getFleet(truckId);
    const dialog = $("#fleet-dialog");
    if (!truck || !dialog) return;
    appState.activeFleetId = truckId;
    $("#fleet-dialog-title").textContent = truck.name;
    $("#fleet-dialog-content").innerHTML = fleetDialogMarkup(truck);
    $("#fleet-map-button").textContent = "Ver en el mapa";
    openAppDialog(dialog);
  }

  function setupFleet() {
    renderFleet();

    $("#fleet-grid")?.addEventListener("click", (event) => {
      const card = event.target.closest("[data-truck-id]");
      if (card) openFleetDialog(card.dataset.truckId);
    });

    $("#fleet-dialog")?.addEventListener("click", async (event) => {
      const offlineButton = event.target.closest("#fleet-connection-button");
      if (!offlineButton) return;
      offlineButton.disabled = true;
      offlineButton.innerHTML = `<span class="spinner" aria-hidden="true"></span> Comprobando señal...`;
      await wait(1050);
      offlineButton.disabled = false;
      offlineButton.textContent = "Volver a comprobar";
      const banner = offlineButton.closest(".offline-banner");
      const message = banner?.querySelector("p");
      if (message) {
        const truck = getFleet(appState.activeFleetId);
        message.textContent = `Sin señal en el sector. Las ${truck?.pending || 14} lecturas siguen guardadas y se sincronizarán al reconectar.`;
      }
      showToast("Sin señal en el sector. La cola local permanece a salvo en el vehículo.");
    });

    $("#fleet-map-button")?.addEventListener("click", () => {
      const truck = getFleet(appState.activeFleetId);
      $("#fleet-dialog")?.close();
      if (!truck) return;
      if (appState.view !== "dashboard") {
        window.history.pushState({}, "", "#despacho");
        showView("dashboard");
      }
      appState.activeRisk = "all";
      appState.selectedZone = null;
      appState.selectedTickets.clear();
      renderTickets();
      updateBulkBar();
      setMapMode("incidents");
      const marker = $(`.map-truck[data-truck-id="${truck.id}"]`);
      $("#map-stage")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
      marker?.classList.add("is-focused");
      window.setTimeout(() => marker?.classList.remove("is-focused"), 2400);
      showToast(`${truck.name} ubicado en ${truck.location}.`);
    });
  }

  function setupRefresh() {
    const button = $("#refresh-dashboard");
    if (!button) return;
    button.addEventListener("click", async () => {
      if (button.classList.contains("is-loading")) return;
      button.classList.add("is-loading");
      button.disabled = true;
      const label = button.querySelector("span");
      if (label) label.textContent = "Sincronizando";
      await wait(640);
      appState.lastSync = Date.now();
      updateSyncLabel();
      updateCutLabels();
      button.classList.remove("is-loading");
      button.disabled = false;
      if (label) label.textContent = "Actualizar";
      showToast("Panel sincronizado. Los datos de demostración están al día.");
    });
  }

  function setupLiveMeta() {
    updateClock();
    updateSyncLabel();
    updateCutLabels();
    window.setInterval(updateClock, 30000);
    window.setInterval(updateSyncLabel, 1000);
  }

  function setBackgroundInert(hidden) {
    $$(".app-header, main, .app-footer, .skip-link").forEach((element) => {
      element.inert = hidden;
    });
  }

  function openAppDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog._returnFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    setBackgroundInert(true);
  }

  function setupDialogs() {
    $$("[data-close-dialog]").forEach((button) => {
      button.addEventListener("click", () => button.closest("dialog")?.close());
    });

    $$(".app-dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener("close", () => {
        setBackgroundInert(false);
        const trigger = dialog._returnFocus;
        window.setTimeout(() => {
          if (document.querySelector(".app-dialog[open]")) return;
          const active = document.activeElement;
          if (active === document.body || (active instanceof Node && dialog.contains(active))) {
            if (trigger?.isConnected && !trigger.disabled) {
              trigger.focus({ preventScroll: true });
            }
          }
        }, 0);
      });
    });
  }

  /* Citizen simulator */

  const chatCategories = {
    bacheo: {
      key: "bacheo",
      title: "Bache profundo en la calzada",
      location: "Av. Pajaritos con Av. Los Pinos",
      zone: "Pajaritos",
      closedTitle: "Calzada reparada en Av. Pajaritos",
      transcript: "Hola, hay un bache grande en Av. Pajaritos con Los Pinos. Pasa mucha gente por ahí."
    },
    alumbrado: {
      key: "alumbrado",
      title: "Luminaria apagada en el pasaje",
      location: "Pasaje Los Aromos, Rinconada",
      zone: "Rinconada",
      closedTitle: "Luminaria repuesta en Rinconada",
      transcript: "Buenas, en el pasaje Los Aromos hay una luz que se corta. Queda muy oscuro de noche."
    },
    aseo: {
      key: "aseo",
      title: "Microbasural en la vía pública",
      location: "Av. 5 de Abril con Portales",
      zone: "Centro",
      closedTitle: "Punto limpio en Av. 5 de Abril",
      transcript: "Hay basura acumulada en la esquina de 5 de Abril con Portales. Lleva varios días ahí."
    }
  };

  const chatState = {
    stage: "report",
    report: {
      ...chatCategories.bacheo,
      via: "nota de voz",
      duration: "0:08",
      userText: ""
    },
    authorized: false,
    rescheduled: false,
    visitWindow: "Hoy, 10:20 a 10:50",
    points: 340,
    redeemed: new Set(),
    photoURL: "",
    busy: false
  };

  let chatRenderToken = 0;
  let recordingTimer = null;
  let recordingSeconds = 0;

  const rewards = [
    {
      id: "huerto",
      title: "Taller de huertos comunitarios",
      description: "Dos sesiones en la Casa de la Juventud",
      cost: 250
    },
    {
      id: "piscina",
      title: "Entrada a la piscina municipal",
      description: "Acceso para una persona, temporada de demostración",
      cost: 300
    },
    {
      id: "compost",
      title: "Taller de compostaje",
      description: "Sábado de noviembre, cupo de demostración",
      cost: 200
    },
    {
      id: "aseo",
      title: "$5.000 en derechos de aseo",
      description: "Descuento simulado en la próxima boleta",
      cost: 500
    }
  ];

  function stageButtons() {
    return $$("[data-stage]");
  }

  function updateStageNavigation() {
    stageButtons().forEach((button) => {
      const active = button.dataset.stage === chatState.stage;
      button.classList.toggle("is-active", active);
      if (active) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function reportByCategory(categoryKey) {
    const category = chatCategories[categoryKey] || chatCategories.bacheo;
    chatState.report = {
      ...category,
      via: "nota de voz",
      duration: "0:08",
      userText: ""
    };
  }

  function reportCategoryFromText(text) {
    const normalized = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (/(luz|luminaria|poste|oscur|farol)/.test(normalized)) return "alumbrado";
    if (/(basura|contenedor|microbasural|aseo|residuo)/.test(normalized)) return "aseo";
    return "bacheo";
  }

  function chatTimeLabel() {
    return nowChile();
  }

  function avatarMarkup() {
    return `<span class="msg-avatar" aria-hidden="true">M</span>`;
  }

  function botBubbleMarkup(content, extraClass = "") {
    return `
      <div class="msg msg-bot${extraClass ? ` ${extraClass}` : ""}">
        ${avatarMarkup()}
        <div class="msg-body">
          <div class="bubble">${content}</div>
          <time class="msg-time">${chatTimeLabel()}</time>
        </div>
      </div>`;
  }

  function botCardMarkup(content) {
    return `
      <div class="msg msg-bot">
        ${avatarMarkup()}
        <div class="msg-body">
          ${content}
          <time class="msg-time">${chatTimeLabel()}</time>
        </div>
      </div>`;
  }

  function userBubbleMarkup(content, extraClass = "") {
    return `
      <div class="msg msg-user">
        <div class="msg-body">
          <div class="bubble${extraClass ? ` ${extraClass}` : ""}">${content}</div>
          <time class="msg-time">${chatTimeLabel()}</time>
        </div>
      </div>`;
  }

  function audioBubbleMarkup(duration, transcript = "") {
    return `
      <div class="audio-bubble">
        <span class="audio-play" aria-hidden="true">${icon("i-mic")}</span>
        <span class="audio-wave" aria-hidden="true">${Array.from({ length: 11 }, () => "<i></i>").join("")}</span>
        <span class="audio-duration">${escapeHTML(duration || "0:08")}</span>
      </div>
      ${transcript ? `<p class="audio-transcript">${escapeHTML(transcript)}</p>` : ""}`;
  }

  function voiceCardMarkup() {
    return `
      <div class="chat-card voice-card">
        <div class="voice-card-head">
          <span class="voice-icon">${icon("i-mic")}</span>
          <div>
            <strong>Reportar por nota de voz</strong>
            <p>Cuéntanos qué pasa y revisamos la dirección contigo. También puedes enviar una foto o escribir.</p>
          </div>
        </div>
        <button class="chat-primary" type="button" data-start-voice>${icon("i-mic")} Grabar nota de voz</button>
        <div class="chat-secondary-actions">
          <button class="chat-text-action" type="button" data-send-photo>${icon("i-photo")} Enviar una foto</button>
          <button class="chat-text-action" type="button" data-focus-input>${icon("i-keyboard")} Escribir</button>
        </div>
      </div>`;
  }

  function locationCardMarkup() {
    return `
      <div class="chat-card location-card">
        <p class="ticket-label">Confirma la ubicación</p>
        <h3>¿Es aquí la falla?</h3>
        <div class="location-line">
          ${icon("i-pin")}
          <div>
            <strong data-live-location>${escapeHTML(chatState.report.location)}</strong>
            <small data-live-zone>Maipú · sector ${escapeHTML(chatState.report.zone)}</small>
          </div>
        </div>
        <div class="card-actions">
          <button class="chat-primary" type="button" data-confirm-location>${icon("i-check")} Sí, es aquí</button>
          <button class="chat-secondary" type="button" data-open-location>Corregir</button>
        </div>
      </div>`;
  }

  function userReportMarkup() {
    if (chatState.report.via === "foto" && chatState.photoURL) {
      return userBubbleMarkup(
        `<div class="chat-photo">${icon("i-photo")}<span>Foto del problema</span></div>
         <img class="chat-photo-image" src="${chatState.photoURL}" alt="Foto del reporte enviada por la persona vecina" width="360" height="220">
         <p class="chat-photo-caption">Foto enviada para orientar a la cuadrilla.</p>`,
        "bubble-photo"
      );
    }
    if (chatState.report.via === "texto") {
      return userBubbleMarkup(escapeHTML(chatState.report.userText || chatState.report.title));
    }
    return userBubbleMarkup(audioBubbleMarkup(chatState.report.duration, chatState.report.transcript));
  }

  function progressMarkup() {
    return `
      <div class="ticket-progress" aria-label="Avance del reporte">
        <div class="progress-step is-done">Recibido<small>09:41</small></div>
        <div class="progress-step is-done">Priorizado<small>09:42</small></div>
        <div class="progress-step is-done">Cuadrilla M-04<small>${chatState.authorized ? "Confirmada" : "Asignada"}</small></div>
      </div>`;
  }

  function confirmationCardMarkup() {
    const authorized = chatState.authorized;
    const rescheduled = chatState.rescheduled;
    const statusLabel = authorized ? (rescheduled ? "Visita reprogramada" : "Visita confirmada") : "Cuadrilla asignada";
    return `
      <div class="chat-card ticket-chat">
        <div class="ticket-chat-head">
          <div>
            <p class="ticket-label">Folio del reporte</p>
            <strong class="ticket-folio">MM-2487</strong>
          </div>
          <span class="chat-status${rescheduled ? " is-yellow" : ""}">${statusLabel}</span>
        </div>
        <div class="chat-ticket-body">
          <h3>${escapeHTML(chatState.report.title)}</h3>
          <p class="chat-ticket-location">${icon("i-pin")}${escapeHTML(chatState.report.location)} · ${escapeHTML(chatState.report.zone)}</p>
          ${progressMarkup()}
          <div class="eta-box">
            ${icon("i-clock")}
            <div>
              <span>Llegada estimada</span>
              <strong>${escapeHTML(chatState.visitWindow)}</strong>
              <small>Cuadrilla mixta M-04 · prioridad ${escapeHTML(chatState.report.key === "aseo" ? "media" : "alta")}</small>
            </div>
          </div>
          ${
            authorized
              ? `<div class="authorized-box">${icon("i-check-circle")}${rescheduled ? "Nueva visita confirmada." : "Visita confirmada."} Te avisaremos cuando la cuadrilla esté a 10 minutos.</div>
                 <div class="card-actions">
                   <button class="chat-secondary" type="button" data-reschedule>Cambiar horario</button>
                 </div>
                 <button class="demo-continue" type="button" data-show-close>
                   <span>${icon("i-check-circle")}Ver cierre del reporte</span>
                   ${icon("i-arrow")}
                 </button>`
              : `<div class="card-actions">
                   <button class="chat-primary" type="button" data-authorize>${icon("i-check")} Autorizar visita</button>
                   <button class="chat-secondary" type="button" data-reschedule>Reprogramar</button>
                 </div>
                 <p class="closure-sub" style="margin:9px 0 0">La cuadrilla trabaja en la vía pública. No necesitas quedarte en casa.</p>`
          }
        </div>
      </div>`;
  }

  function beforeEvidenceSVG() {
    return `
      <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id="beforeAsphalt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#555550"></stop>
            <stop offset=".55" stop-color="#3b3b38"></stop>
            <stop offset="1" stop-color="#252624"></stop>
          </linearGradient>
          <filter id="beforeGrain">
            <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer><feFuncA type="table" tableValues="0 .16"></feFuncA></feComponentTransfer>
          </filter>
        </defs>
        <rect width="320" height="240" fill="url(#beforeAsphalt)"></rect>
        <rect width="320" height="240" fill="#fff" filter="url(#beforeGrain)" opacity=".48"></rect>
        <path d="M0 26 320 0v39L0 71Z" fill="#b8b3a5"></path>
        <path d="M0 71 320 39v10L0 82Z" fill="#79776d"></path>
        <path d="M244 240 300 88l16 4-47 148Z" fill="#d8d0bc" opacity=".48"></path>
        <path d="M18 240 76 89l15 5-45 146Z" fill="#d8d0bc" opacity=".32"></path>
        <path d="M104 146c14-17 42-24 64-16 22 8 35 26 26 42-8 15-30 22-53 20-24-2-48-24-37-46Z" fill="#111311"></path>
        <path d="M111 147c17-11 36-14 53-9 17 5 25 15 20 25-5 11-22 16-40 14-18-2-35-14-33-30Z" fill="#292a26"></path>
        <path d="M129 153c7-7 17-9 25-5 7 4 9 11 4 15-6 5-16 4-22 0-5-3-9-7-7-10Z" fill="#0b0c0b"></path>
        <path d="M158 144c8-4 14-3 22 2M147 181c10 4 17 3 26-1M89 152c-8-2-14 0-20 5M189 164c7 1 12 4 16 8" fill="none" stroke="#6e6c63" stroke-width="2" stroke-linecap="round"></path>
        <path d="M218 197c8-4 17-1 18 5 1 5-5 9-12 8-6-1-11-8-6-13ZM67 189c4-3 10-1 10 3 0 4-4 6-8 5-4-1-5-6-2-8Z" fill="#837d6d"></path>
        <path d="M42 123c2-10 9-18 17-23M58 100l-13 5M56 99l-1 12" fill="none" stroke="#4c5147" stroke-width="2" stroke-linecap="round"></path>
        <path d="M267 50c-7 8-8 18-3 26 7-5 11-13 10-22-1-2-4-3-7-4Z" fill="#6d8060"></path>
        <rect x="277" y="68" width="30" height="63" rx="4" fill="#dc6d28" transform="rotate(7 292 100)"></rect>
        <rect x="282" y="88" width="23" height="12" fill="#fff4df" transform="rotate(7 294 94)"></rect>
        <rect x="287" y="129" width="16" height="6" rx="2" fill="#bc571d" transform="rotate(7 295 132)"></rect>
      </svg>`;
  }

  function afterEvidenceSVG() {
    return `
      <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id="afterAsphalt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#565752"></stop>
            <stop offset=".6" stop-color="#42433f"></stop>
            <stop offset="1" stop-color="#30322f"></stop>
          </linearGradient>
          <filter id="afterGrain">
            <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer><feFuncA type="table" tableValues="0 .12"></feFuncA></feComponentTransfer>
          </filter>
        </defs>
        <rect width="320" height="240" fill="url(#afterAsphalt)"></rect>
        <rect width="320" height="240" fill="#fff" filter="url(#afterGrain)" opacity=".42"></rect>
        <path d="M0 26 320 0v39L0 71Z" fill="#beb9ab"></path>
        <path d="M0 71 320 39v10L0 82Z" fill="#858277"></path>
        <path d="M244 240 300 88l16 4-47 148Z" fill="#ded7c3" opacity=".62"></path>
        <path d="M18 240 76 89l15 5-45 146Z" fill="#ded7c3" opacity=".42"></path>
        <path d="M96 144c30-15 76-15 100-2 18 10 16 29-3 37-27 12-73 13-100 1-19-9-18-26 3-36Z" fill="#4d4e47"></path>
        <path d="M103 146c26-10 65-10 86 0 12 6 11 17-2 23-22 9-60 9-83 0-13-5-13-17-1-23Z" fill="#575850"></path>
        <path d="M104 159c19-5 42-6 61-2 12 2 17 5 16 7-4 5-30 8-51 6-13-1-22-4-26-7-2-1-1-3 0-4Z" fill="#606158"></path>
        <path d="M78 149c7-3 15-2 22 2M215 159c7-1 12-3 16-6" fill="none" stroke="#7b7c72" stroke-width="2" stroke-linecap="round"></path>
        <circle cx="259" cy="119" r="4" fill="#8e8d83"></circle>
        <circle cx="73" cy="188" r="3" fill="#8e8d83"></circle>
        <path d="M42 117c2-9 8-16 16-21M58 96l-12 4M56 95l-1 11" fill="none" stroke="#68775d" stroke-width="2" stroke-linecap="round"></path>
        <path d="M272 53c-6 7-7 16-2 24 6-5 9-12 8-20-1-2-3-3-6-4Z" fill="#8ba178"></path>
        <rect x="276" y="74" width="28" height="61" rx="4" fill="#e6812f" transform="rotate(9 290 104)"></rect>
        <rect x="281" y="93" width="21" height="12" fill="#fff4df" transform="rotate(9 291 99)"></rect>
        <rect x="284" y="133" width="16" height="6" rx="2" fill="#c15c1f" transform="rotate(9 292 136)"></rect>
        <path d="M20 220c19-7 44-9 62-4" fill="none" stroke="#6b6c63" stroke-width="2" stroke-linecap="round"></path>
      </svg>`;
  }

  function closureCardMarkup() {
    return `
      <div class="chat-card closure-card">
        <div class="closure-head">
          <div>
            <p class="ticket-label">Cierre del reporte</p>
            <strong class="ticket-folio">MM-2487</strong>
          </div>
          <span class="chat-status">Caso cerrado</span>
        </div>
        <div class="closure-body">
          <h3>${escapeHTML(chatState.report.closedTitle)}</h3>
          <p class="closure-sub">Resuelto en 1 h 26 min · Cuadrilla mixta M-04</p>
          <div class="evidence-compare">
            <div class="evidence-frame" role="img" aria-label="Antes: bache profundo en la calzada">
              ${beforeEvidenceSVG()}
              <span class="evidence-tag">Antes</span>
              <span class="evidence-time">09:12</span>
            </div>
            <div class="evidence-frame" role="img" aria-label="Después: calzada reparada y señalizada">
              ${afterEvidenceSVG()}
              <span class="evidence-tag">Después</span>
              <span class="evidence-time">10:38</span>
            </div>
          </div>
          <p class="evidence-caption">${icon("i-camera")} Registro simulado de la cuadrilla.</p>
          <div class="closure-impact">
            <div class="impact-mini">
              <span>Huella reducida</span>
              <strong>3,8 kg CO₂e</strong>
              <small>62% menos que un despacho sin ruta agrupada</small>
            </div>
            <div class="impact-mini">
              <span>Puntos MiMaipú</span>
              <strong>+40 pts</strong>
              <small>Acreditados al cerrar el caso</small>
            </div>
          </div>
          <div class="points-block">
            <div class="points-main">
              <span class="points-icon">${icon("i-coins")}</span>
              <div>
                <span>Saldo disponible</span>
                <strong><span class="js-points-balance">${chatState.points}</span> pts</strong>
              </div>
            </div>
            <button class="chat-secondary" type="button" data-open-rewards>Ver recompensas</button>
          </div>
        </div>
      </div>`;
  }

  function renderChatStage(options = {}) {
    const log = $("#chat-log");
    if (!log) return;
    chatRenderToken += 1;
    const token = chatRenderToken;

    if (chatState.stage === "report") {
      log.innerHTML = `
        <div class="chat-day">Hoy · ${chatTimeLabel()}</div>
        ${botBubbleMarkup("Hola, vecina o vecino. Soy <strong>MIMA</strong>, la asistente de MiMaipú. Cuéntame qué pasa en tu barrio. Puedes hablar, escribir o enviar una foto.")}
        ${botCardMarkup(voiceCardMarkup())}`;
    } else if (chatState.stage === "confirm") {
      log.innerHTML = `
        <div class="chat-day">Hoy · ${chatTimeLabel()}</div>
        ${userReportMarkup()}
        ${botBubbleMarkup(`Recibí tu reporte y lo ubiqué en <strong>${escapeHTML(chatState.report.location)}</strong>, sector ${escapeHTML(chatState.report.zone)}.`)}
        ${botBubbleMarkup(`Listo, ya tienes un folio. La cuadrilla mixta M-04 quedó asignada a este punto del barrio.`)}
        ${botCardMarkup(confirmationCardMarkup())}
        ${chatState.authorized ? botBubbleMarkup("Puedes revisar el cierre de este caso de demostración cuando quieras.") : ""}`;
    } else {
      log.innerHTML = `
        <div class="chat-day">Cierre del reporte</div>
        ${botBubbleMarkup(`La cuadrilla terminó el trabajo en <strong>${escapeHTML(chatState.report.location)}</strong>. Este es el registro del cierre.`)}
        ${botCardMarkup(closureCardMarkup())}
        ${botBubbleMarkup(`Gracias por cuidar Maipú. Tu reporte ayudó a resolver este punto del barrio.`)}`;
    }

    if (!options.keepRecording) stopRecording(false);
    updateStageNavigation();
    window.requestAnimationFrame(() => {
      if (token !== chatRenderToken) return;
      const focusedCard =
        chatState.stage === "close"
          ? $(".closure-card", log)
          : chatState.stage === "confirm"
            ? $(".ticket-chat", log)
            : null;
      if (focusedCard) {
        const logTop = log.getBoundingClientRect().top;
        const cardTop = focusedCard.getBoundingClientRect().top;
        log.scrollTop = Math.max(0, log.scrollTop + cardTop - logTop - 10);
        return;
      }
      scrollChatToBottom();
    });
  }

  function scrollChatToBottom() {
    const log = $("#chat-log");
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }

  function prepareNewConversation() {
    chatState.authorized = false;
    chatState.rescheduled = false;
    chatState.visitWindow = "Hoy, 10:20 a 10:50";
    chatState.photoURL = "";
    chatState.busy = false;
    chatState.report = {
      ...chatCategories.bacheo,
      via: "nota de voz",
      duration: "0:08",
      userText: ""
    };
  }

  function resetSimulation(options = {}) {
    prepareNewConversation();
    chatState.stage = options.stage || "report";
    if (!options.keepPoints) {
      chatState.points = 340;
      chatState.redeemed = new Set();
    }
    chatState.busy = false;
    closeOpenChatDialogs();
    syncPointBalances();
    renderChatStage();
    const input = $("#chat-input");
    if (input) {
      input.value = "";
      $("#chat-composer")?.classList.remove("has-text");
    }
  }

  function closeOpenChatDialogs() {
    ["#reschedule-dialog", "#location-dialog", "#rewards-dialog"].forEach((selector) => {
      const dialog = $(selector);
      if (dialog?.open) dialog.close();
    });
  }

  function goToStage(stage) {
    if (!["report", "confirm", "close"].includes(stage)) return;
    stopRecording(false);
    chatState.stage = stage;
    chatState.busy = false;
    if (stage === "report") {
      resetSimulation({ stage: "report" });
      return;
    }
    if (stage === "confirm") {
      chatState.authorized = false;
      chatState.rescheduled = false;
      chatState.visitWindow = "Hoy, 10:20 a 10:50";
    }
    if (stage === "close") {
      chatState.authorized = true;
    }
    renderChatStage();
    syncPointBalances();
  }

  function removeVoicePrompt() {
    const log = $("#chat-log");
    const voiceCard = $(".voice-card", log);
    if (voiceCard) voiceCard.closest(".msg")?.remove();
  }

  function appendToLog(html) {
    const log = $("#chat-log");
    if (!log) return;
    log.insertAdjacentHTML("beforeend", html);
    scrollChatToBottom();
  }

  function appendTyping() {
    const typing = `
      <div class="msg msg-bot" id="chat-typing">
        ${avatarMarkup()}
        <div class="msg-body">
          <div class="bubble typing-bubble" aria-label="MIMA está escribiendo">
            <i></i><i></i><i></i>
          </div>
        </div>
      </div>`;
    $("#chat-log")?.insertAdjacentHTML("beforeend", typing);
    scrollChatToBottom();
  }

  function removeTyping() {
    $("#chat-typing")?.remove();
  }

  async function showReportLocation(via) {
    const token = chatRenderToken;
    removeVoicePrompt();
    appendTyping();
    await wait(620);
    if (token !== chatRenderToken) return;
    removeTyping();
    appendToLog(botBubbleMarkup("Recibí tu reporte. Antes de crear el folio, revisa si el punto marcado es correcto."));
    appendToLog(botCardMarkup(locationCardMarkup()));
  }

  function startRecording() {
    if (chatState.stage !== "report") {
      goToStage("report");
    }
    const composer = $("#chat-composer");
    const bar = $("#recording-bar");
    if (!composer || !bar) return;
    stopRecording(false);
    recordingSeconds = 0;
    $("#recording-time").textContent = "0:00";
    composer.hidden = true;
    bar.hidden = false;
    bar.querySelector("#send-recording")?.focus();
    recordingTimer = window.setInterval(() => {
      recordingSeconds += 1;
      const minutes = Math.floor(recordingSeconds / 60);
      const seconds = String(recordingSeconds % 60).padStart(2, "0");
      const label = $("#recording-time");
      if (label) label.textContent = `${minutes}:${seconds}`;
      if (recordingSeconds >= 45) stopRecording(true);
    }, 1000);
  }

  function stopRecording(restoreComposer = true) {
    if (recordingTimer) {
      window.clearInterval(recordingTimer);
      recordingTimer = null;
    }
    const bar = $("#recording-bar");
    const composer = $("#chat-composer");
    if (bar) bar.hidden = true;
    if (composer && restoreComposer) composer.hidden = false;
  }

  async function sendVoiceReport() {
    if (chatState.busy) return;
    stopRecording(true);
    chatState.busy = true;
    chatState.stage = "report";
    updateStageNavigation();
    const duration =
      recordingSeconds > 0
        ? `${Math.floor(recordingSeconds / 60)}:${String(recordingSeconds % 60).padStart(2, "0")}`
        : "0:03";
    const category = chatCategories.bacheo;

    chatState.report = {
      ...category,
      via: "nota de voz",
      duration,
      userText: ""
    };
    removeVoicePrompt();
    appendToLog(userBubbleMarkup(audioBubbleMarkup(duration, category.transcript)));
    await showReportLocation("nota de voz");
    chatState.busy = false;
  }

  async function sendTextReport(rawText) {
    const text = rawText.trim();
    if (!text || chatState.busy) return;
    const input = $("#chat-input");
    if (input) input.value = "";
    $("#chat-composer")?.classList.remove("has-text");

    if (chatState.stage !== "report") {
      chatState.stage = "report";
      chatState.authorized = false;
      chatState.rescheduled = false;
      renderChatStage();
    }

    chatState.busy = true;
    updateStageNavigation();
    const categoryKey = reportCategoryFromText(text);
    const category = chatCategories[categoryKey];
    chatState.report = {
      ...category,
      via: "texto",
      duration: "",
      userText: text,
      transcript: text
    };
    removeVoicePrompt();
    appendToLog(userBubbleMarkup(escapeHTML(text)));
    await showReportLocation("texto");
    chatState.busy = false;
  }

  async function sendPhotoReport(file) {
    if (!file || chatState.busy) return;
    if (!file.type.startsWith("image/")) {
      showToast("Elige un archivo de imagen para adjuntarlo al reporte.");
      return;
    }
    if (chatState.stage !== "report") {
      chatState.stage = "report";
      chatState.authorized = false;
      chatState.rescheduled = false;
      renderChatStage();
    }
    chatState.busy = true;
    chatState.report = {
      ...chatCategories.bacheo,
      via: "foto",
      duration: "",
      userText: ""
    };
    chatState.photoURL = URL.createObjectURL(file);
    removeVoicePrompt();
    appendToLog(userReportMarkup());
    await showReportLocation("foto");
    chatState.busy = false;
  }

  async function confirmReportLocation() {
    const confirmButton = $("[data-confirm-location]");
    if (confirmButton) {
      confirmButton.disabled = true;
      confirmButton.textContent = "Creando folio...";
    }
    await wait(640);
    chatState.stage = "confirm";
    chatState.authorized = false;
    chatState.rescheduled = false;
    chatState.visitWindow = "Hoy, 10:20 a 10:50";
    renderChatStage();
    showToast("Reporte MM-2487 ingresado. La cuadrilla M-04 quedó asignada.");
  }

  function updateLiveLocation() {
    const location = $("[data-live-location]");
    const zone = $("[data-live-zone]");
    if (location) location.textContent = chatState.report.location;
    if (zone) zone.textContent = `Maipú · sector ${chatState.report.zone}`;
  }

  function openLocationDialog() {
    const dialog = $("#location-dialog");
    if (!dialog) return;
    const currentZone = chatState.report.zone;
    $$('input[name="report-location"]', dialog).forEach((input) => {
      input.checked = input.dataset.zone === currentZone;
    });
    openAppDialog(dialog);
  }

  function setRewardsPoints() {
    syncPointBalances();
    renderRewards();
  }

  function syncPointBalances() {
    $$(".js-points-balance").forEach((element) => {
      element.textContent = String(chatState.points);
    });
    const rewardsPoints = $("#rewards-points");
    if (rewardsPoints) rewardsPoints.textContent = String(chatState.points);
  }

  function rewardRowMarkup(reward) {
    const redeemed = chatState.redeemed.has(reward.id);
    const affordable = chatState.points >= reward.cost;
    const disabled = redeemed || !affordable;
    let label = "Canjear";
    if (redeemed) label = "Canjeado";
    if (!redeemed && !affordable) label = `Faltan ${reward.cost - chatState.points} pts`;
    return `
      <div class="reward-row">
        <div>
          <strong>${escapeHTML(reward.title)}</strong>
          <small>${escapeHTML(reward.description)}</small>
        </div>
        <div class="reward-cost">${reward.cost} pts</div>
        <button class="button button-secondary" type="button" data-redeem="${reward.id}" ${disabled ? "disabled" : ""}>${escapeHTML(label)}</button>
      </div>`;
  }

  function renderRewards() {
    const list = $("#reward-list");
    if (!list) return;
    list.innerHTML = rewards.map(rewardRowMarkup).join("");
    const points = $("#rewards-points");
    if (points) points.textContent = String(chatState.points);
  }

  function openRewardsDialog() {
    const dialog = $("#rewards-dialog");
    if (!dialog) return;
    renderRewards();
    openAppDialog(dialog);
  }

  function redeemReward(rewardId) {
    const reward = rewards.find((item) => item.id === rewardId);
    if (!reward || chatState.redeemed.has(reward.id) || chatState.points < reward.cost) return;
    chatState.points -= reward.cost;
    chatState.redeemed.add(reward.id);
    syncPointBalances();
    renderRewards();
    showToast(`Canje simulado: ${reward.title}. Tu saldo quedó en ${chatState.points} pts.`);
  }

  function openRescheduleDialog() {
    const dialog = $("#reschedule-dialog");
    if (!dialog) return;
    $$('input[name="visit-window"]', dialog).forEach((input) => {
      input.checked = input.value === chatState.visitWindow;
    });
    openAppDialog(dialog);
  }

  function confirmReschedule() {
    const selected = $('input[name="visit-window"]:checked');
    if (!selected) return;
    chatState.visitWindow = selected.value;
    chatState.authorized = true;
    chatState.rescheduled = true;
    $("#reschedule-dialog")?.close();
    renderChatStage();
    showToast(`Visita reprogramada: ${chatState.visitWindow}.`);
  }

  function confirmLocationChange() {
    const selected = $('input[name="report-location"]:checked');
    if (!selected) return;
    chatState.report.location = selected.value;
    chatState.report.zone = selected.dataset.zone;
    updateLiveLocation();
    $("#location-dialog")?.close();
    showToast(`Ubicación actualizada: ${selected.value}.`);
  }

  function setupChat() {
    const chatLog = $("#chat-log");
    const input = $("#chat-input");
    const composer = $("#chat-composer");
    const photoInput = $("#photo-input");

    renderChatStage();
    syncPointBalances();

    stageButtons().forEach((button) => {
      button.addEventListener("click", () => goToStage(button.dataset.stage));
    });

    $("#reset-chat")?.addEventListener("click", () => {
      resetSimulation({ stage: "report" });
      showToast("Simulación reiniciada.");
    });

    input?.addEventListener("input", () => {
      const hasText = input.value.trim().length > 0;
      composer?.classList.toggle("has-text", hasText);
    });

    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendTextReport(input.value);
      }
    });

    $("#composer-send")?.addEventListener("click", () => sendTextReport(input?.value || ""));
    $("#composer-mic")?.addEventListener("click", startRecording);
    $("#attach-button")?.addEventListener("click", () => photoInput?.click());
    $("#cancel-recording")?.addEventListener("click", () => stopRecording(true));
    $("#send-recording")?.addEventListener("click", sendVoiceReport);

    photoInput?.addEventListener("change", () => {
      const file = photoInput.files?.[0];
      if (file) sendPhotoReport(file);
      photoInput.value = "";
    });

    chatLog?.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.matches("[data-start-voice]")) {
        startRecording();
      } else if (button.matches("[data-send-photo]")) {
        photoInput?.click();
      } else if (button.matches("[data-focus-input]")) {
        $("#chat-input")?.focus();
      } else if (button.matches("[data-confirm-location]")) {
        confirmReportLocation();
      } else if (button.matches("[data-open-location]")) {
        openLocationDialog();
      } else if (button.matches("[data-authorize]")) {
        chatState.authorized = true;
        chatState.rescheduled = false;
        renderChatStage();
        showToast(`Visita autorizada para ${chatState.visitWindow}.`);
      } else if (button.matches("[data-reschedule]")) {
        openRescheduleDialog();
      } else if (button.matches("[data-show-close]")) {
        chatState.stage = "close";
        renderChatStage();
      } else if (button.matches("[data-open-rewards]")) {
        openRewardsDialog();
      }
    });

    $("#confirm-reschedule")?.addEventListener("click", confirmReschedule);
    $("#confirm-location")?.addEventListener("click", confirmLocationChange);

    $("#reward-list")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-redeem]");
      if (button) redeemReward(button.dataset.redeem);
    });

    $("#rewards-dialog")?.addEventListener("close", () => {
      syncPointBalances();
    });
  }

  function boot() {
    setupRouting();
    setupLiveMeta();
    setupMap();
    setupTickets();
    setupDispatchDialog();
    setupFleet();
    setupRefresh();
    setupDialogs();
    setupChat();
    showView(initialViewFromHash());
    updateSyncLabel();
    updateCutLabels();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
