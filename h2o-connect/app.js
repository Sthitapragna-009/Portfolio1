(function () {
  "use strict";

  const TANK_CAPACITY = 2000; // litres, overhead tank
  const state = {
    tank: "overhead",
    level: 78,          // %
    fillStop: 90,        // %
    fillStart: 25,       // %
    motorOn: true,
    motorMode: "automatic", // automatic | manual | smart
    motorSecondsLeft: 4 * 60 + 12,
    motorTotalSeconds: 18 * 60,
    dryRun: true,
    eco: true,
    boost: false,
    quiet: true,
    range: "week",
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ---------------- Clock ----------------
  function tickClock() {
    const els = $$(".status-time");
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    h = h % 12; if (h === 0) h = 12;
    const label = h + ":" + String(m).padStart(2, "0");
    els.forEach((el) => (el.textContent = label));
  }
  tickClock();
  setInterval(tickClock, 15000);

  // ---------------- Ripple (tap feedback) ----------------
  function spawnRipple(el, evt) {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = (evt.clientX != null ? evt.clientX : rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (evt.clientY != null ? evt.clientY : rect.top + rect.height / 2) - rect.top - size / 2;
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = size + "px";
    span.style.height = size + "px";
    span.style.left = x + "px";
    span.style.top = y + "px";
    el.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }
  function attachRipple(selector) {
    $$(selector).forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.position === "static") el.style.position = "relative";
      el.style.overflow = el.style.overflow || "hidden";
      el.addEventListener("pointerdown", (e) => spawnRipple(el, e));
    });
  }
  attachRipple(".btn");

  // ---------------- Screen routing (push / pop / tab-crossfade) ----------------
  const TAB_ORDER = ["home", "usage", "motor", "automation"];
  function screenDepth(name) { return name === "fill-range" ? 1 : 0; }

  let cleanupTimer = null;
  function resetScreenInline() {
    $$(".screen").forEach((s) => {
      s.style.transition = "";
      s.style.transform = "";
      s.style.opacity = "";
      s.style.zIndex = "";
      s.classList.remove("screen-recede");
    });
  }

  function showScreen(target) {
    const activeEl = $(".screen.active");
    const currentName = activeEl ? activeEl.dataset.screen : null;
    if (currentName === target) return;
    const toEl = $(`.screen[data-screen="${target}"]`);
    if (!toEl || !activeEl) return;

    clearTimeout(cleanupTimer);
    resetScreenInline();

    const fromDepth = screenDepth(currentName);
    const toDepth = screenDepth(target);

    activeEl.classList.remove("active");
    toEl.classList.add("active");

    if (toDepth > fromDepth) {
      // PUSH: new screen slides in from the right, current screen recedes underneath
      toEl.style.zIndex = 6;
      toEl.style.transition = "none";
      toEl.style.transform = "translateX(100%)";
      void toEl.offsetWidth;
      toEl.style.transition = "";
      activeEl.style.zIndex = 1;
      activeEl.classList.add("screen-recede");
      requestAnimationFrame(() => { toEl.style.transform = "translateX(0)"; });
    } else if (toDepth < fromDepth) {
      // POP: current screen slides out to the right, target un-recedes (or crossfades in)
      activeEl.style.zIndex = 6;
      toEl.style.zIndex = 1;
      if (!toEl.classList.contains("screen-recede")) {
        toEl.style.transition = "none";
        toEl.style.transform = "none";
        toEl.style.opacity = "1";
        void toEl.offsetWidth;
        toEl.style.transition = "";
      }
      requestAnimationFrame(() => {
        toEl.classList.remove("screen-recede");
        activeEl.style.transform = "translateX(100%)";
      });
    } else {
      // TAB: soft crossfade + lift between sibling tabs
      toEl.style.zIndex = 6;
      toEl.style.transition = "none";
      toEl.style.opacity = "0";
      toEl.style.transform = "translateY(10px)";
      void toEl.offsetWidth;
      toEl.style.transition = "";
      activeEl.style.zIndex = 1;
      requestAnimationFrame(() => {
        toEl.style.opacity = "1";
        toEl.style.transform = "translateY(0)";
        activeEl.style.opacity = "0";
        activeEl.style.transform = "translateY(-10px)";
      });
    }

    cleanupTimer = setTimeout(resetScreenInline, 520);

    syncNavIcons();
    triggerContentReveal(toEl);
  }

  function syncNavIcons() {
    const activeEl = $(".screen.active");
    if (!activeEl) return;
    const active = activeEl.dataset.screen;
    $$(".nav-btn[data-nav]").forEach((btn) => {
      const key = btn.dataset.nav;
      btn.classList.toggle("active", key === active);
      const img = btn.querySelector("img");
      if (!img) return; // history/usage uses css bars, not img
      const isActive = key === active;
      const nextSrc =
        key === "home" ? (isActive ? "assets/nav-home-active.svg" : "assets/nav-home-inactive.svg") :
        key === "motor" ? (isActive ? "assets/nav-motor-active.svg" : "assets/nav-motor-inactive.svg") :
        key === "automation" ? (isActive ? "assets/nav-modes-active.svg" : "assets/nav-modes-inactive.svg") : null;
      if (nextSrc && !img.src.endsWith(nextSrc)) {
        img.style.opacity = "0";
        setTimeout(() => { img.src = nextSrc; img.style.opacity = "1"; }, 90);
      }
    });
  }

  // ---------------- Content entrance stagger ----------------
  function triggerContentReveal(screenEl) {
    const items = screenEl.querySelectorAll(".content > *");
    items.forEach((el, i) => {
      el.classList.remove("reveal-item");
      void el.offsetWidth;
      el.style.setProperty("--reveal-delay", Math.min(i * 45, 250) + "ms");
      el.classList.add("reveal-item");
    });
  }

  $$("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.nav;
      showScreen(target === "fill-range" ? "fill-range" : target);
    });
  });
  $$("[data-back]").forEach((el) => {
    el.addEventListener("click", () => showScreen(el.dataset.back));
  });
  $("#btn-logo").addEventListener("click", () => showScreen("home"));
  $("#home-usage-card").addEventListener("click", () => showScreen("usage"));
  $("#home-motor-card").addEventListener("click", () => showScreen("motor"));

  // ---------------- Toast ----------------
  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  // ---------------- Overlays ----------------
  function openOverlay(id) { $("#" + id).classList.add("active"); }
  function closeOverlay(id) { $("#" + id).classList.remove("active"); }
  $$("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      closeOverlay(el.dataset.close);
      if (el.dataset.action === "turn-on-motor") {
        state.motorOn = true;
        state.motorMode = "manual";
        renderMotor();
        renderHome();
        syncModeUI("manual", true);
        toast("Motor turned on");
      }
    });
  });

  // ---------------- Home render ----------------
  function litresFor(pct) {
    return Math.round((pct / 100) * TANK_CAPACITY).toLocaleString("en-US");
  }

  // Secondary tank shown when the "Sump" chip is selected on Home. Read-only —
  // the app's single motor fills the Overhead tank, so Sump has no fill simulation of its own.
  const SUMP_CAPACITY = 500;
  const SUMP_LEVEL = 61;

  function renderHome() {
    const isSump = state.tank === "sump";
    const capacity = isSump ? SUMP_CAPACITY : TANK_CAPACITY;
    const level = isSump ? SUMP_LEVEL : state.level;

    $("#home-pct").textContent = Math.round(level);
    $("#home-litres").textContent = Math.round((level / 100) * capacity).toLocaleString("en-US") + " of " + capacity.toLocaleString("en-US") + " L";
    $("#home-water").style.height = level + "%";

    const pill = $("#home-status-pill");
    const pillText = $("#home-status-text");
    const pillDot = pill.querySelector(".dot");
    if (isSump) {
      pillText.textContent = "Steady · feeds the motor";
      pill.style.background = "var(--card-raised)";
      pillDot.classList.remove("dot-live");
    } else if (state.level <= state.fillStart) {
      pillText.textContent = "Low · consider filling";
      pill.style.background = "var(--alert-low)";
      pillDot.classList.add("dot-live");
    } else if (state.motorOn) {
      pillText.textContent = "Filling · " + Math.max(1, Math.ceil(state.motorSecondsLeft / 60)) + " min left";
      pill.style.background = "var(--water)";
      pillDot.classList.add("dot-live");
    } else {
      pillText.textContent = "Steady";
      pill.style.background = "var(--card-raised)";
      pillDot.classList.remove("dot-live");
    }

    const motorWrap = $("#home-motor-card");
    motorWrap.classList.toggle("motor-idle", !state.motorOn);
    $("#home-motor-tag").textContent = state.motorOn
      ? "Motor running · " + state.motorMode
      : "Motor off";
    $("#home-motor-timer").textContent = fmtTime(state.motorSecondsLeft);
    $("#home-motor-meta").textContent = state.motorOn
      ? "0.75 kW · 4.2 units saved this week"
      : "Idle · 4.2 units saved this week";

    const homeMotorDot = $("#home-motor-card .tag-row .dot");
    if (homeMotorDot) homeMotorDot.classList.toggle("dot-live", state.motorOn);
    $("#home-motor-btn").classList.toggle("pulsing", state.motorOn);
  }

  function fmtTime(totalSeconds) {
    const s = Math.max(0, Math.round(totalSeconds));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  $("#home-motor-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    state.motorOn = !state.motorOn;
    renderHome();
    renderMotor();
    toast(state.motorOn ? "Motor started" : "Motor stopped");
  });

  $$(".chip[data-tank]").forEach((chip) => {
    chip.addEventListener("click", () => {
      if (chip.classList.contains("active")) return;
      $$(".chip[data-tank]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.tank = chip.dataset.tank;
      renderHome();
      toast(chip.dataset.tank === "sump" ? "Sump tank · 305 of 500 L" : "Overhead tank");
    });
  });

  // ---------------- Fill range drag ----------------
  const TANK_H = 232;
  const HANDLE_H = 28;

  function pctFromY(y) {
    const clamped = Math.min(Math.max(y, 0), TANK_H);
    return Math.round(100 - (clamped / TANK_H) * 100);
  }
  function yFromPct(pct) {
    return ((100 - pct) / 100) * TANK_H - HANDLE_H / 2;
  }

  function renderFillRange() {
    $("#stop-pct").textContent = state.fillStop + "%";
    $("#stop-litres").textContent = litresFor(state.fillStop) + " L";
    $("#start-pct").textContent = state.fillStart + "%";
    $("#start-litres").textContent = litresFor(state.fillStart) + " L";
    $("#handle-stop").style.top = yFromPct(state.fillStop) + "px";
    $("#handle-start").style.top = yFromPct(state.fillStart) + "px";
    $("#readout-stop").style.top = (yFromPct(state.fillStop) - 4) + "px";
    $("#readout-start").style.top = (yFromPct(state.fillStart) - 4) + "px";
    $("#range-water").style.height = state.level + "%";
  }

  function makeDraggable(handleEl, readoutEl, kind) {
    let dragging = false;
    const wrap = $(".range-tank-wrap");

    function setLiveTransition(on) {
      // disable the spring transition while actively tracking the pointer,
      // restore it on release so the handle settles with a snap.
      handleEl.style.transition = on ? "" : "none";
      readoutEl.style.transition = on ? "" : "none";
    }

    function onMove(clientY) {
      const rect = wrap.getBoundingClientRect();
      const localY = clientY - rect.top - HANDLE_H / 2;
      let pct = pctFromY(localY);
      if (kind === "stop") {
        pct = Math.max(state.fillStart + 5, Math.min(100, pct));
        state.fillStop = pct;
      } else {
        pct = Math.min(state.fillStop - 5, Math.max(0, pct));
        state.fillStart = pct;
      }
      renderFillRange();
    }

    handleEl.addEventListener("pointerdown", (e) => {
      dragging = true;
      handleEl.classList.add("dragging");
      setLiveTransition(false);
      handleEl.setPointerCapture(e.pointerId);
    });
    handleEl.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      onMove(e.clientY);
    });
    function release() {
      if (!dragging) return;
      dragging = false;
      handleEl.classList.remove("dragging");
      setLiveTransition(true);
    }
    handleEl.addEventListener("pointerup", release);
    handleEl.addEventListener("pointercancel", release);
  }
  makeDraggable($("#handle-stop"), $("#readout-stop"), "stop");
  makeDraggable($("#handle-start"), $("#readout-start"), "start");

  $("#save-range-btn").addEventListener("click", () => {
    showScreen("home");
    toast("Fill range saved: " + state.fillStart + "%–" + state.fillStop + "%");
  });

  // ---------------- Motor screen ----------------
  function renderMotor() {
    const card = $("#motor-running-card");
    card.classList.toggle("idle", !state.motorOn);
    $("#motor-tag").textContent = state.motorOn
      ? "RUNNING · " + state.motorMode.toUpperCase()
      : "IDLE · " + state.motorMode.toUpperCase();
    $("#motor-timer").textContent = fmtTime(state.motorSecondsLeft);
    $("#motor-sub").textContent = state.motorOn
      ? "of about " + Math.round(state.motorTotalSeconds / 60) + " min"
      : "Last ran 04:12 ago";
    const pct = state.motorOn
      ? Math.min(100, Math.round(100 - (state.motorSecondsLeft / state.motorTotalSeconds) * 100))
      : 0;
    $("#motor-progress").style.width = pct + "%";
    $("#motor-flow").textContent = state.motorOn ? "22" : "0";
    $("#motor-dot").classList.toggle("dot-live", state.motorOn);

    const stopBtn = $("#motor-stop-toggle");
    stopBtn.textContent = state.motorOn ? "Stop motor" : "Turn on motor";
    stopBtn.classList.toggle("btn-danger", state.motorOn);
    stopBtn.classList.toggle("btn-lime", !state.motorOn);
  }
  $("#motor-stop-toggle").addEventListener("click", (e) => {
    spawnRipple(e.currentTarget, e);
    state.motorOn = !state.motorOn;
    renderMotor();
    renderHome();
    toast(state.motorOn ? "Motor started" : "Motor stopped");
  });

  // countdown ticker while motor runs
  setInterval(() => {
    if (state.motorOn && state.motorSecondsLeft > 0) {
      state.motorSecondsLeft -= 1;
      state.level = Math.min(100, state.level + 0.01);
      const activeName = $(".screen.active").dataset.screen;
      if (activeName === "motor") renderMotor();
      if (activeName === "home") renderHome();
    }
  }, 1000);

  // ---------------- Toggles (generic) ----------------
  const TOGGLE_LABELS = {
    dryrun: "Dry-run protection",
    eco: "Eco mode",
    boost: "Boost",
    boost2: "Boost",
    quiet: "Quiet hours",
    quiet2: "Quiet hours",
    "manual-alert": "Low water alerts",
    "smart-shift": "Let Smart shift fill times",
  };
  $$(".toggle[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("on");
      const isOn = btn.classList.contains("on");
      const label = TOGGLE_LABELS[btn.dataset.toggle] || "Setting";
      toast(label + " turned " + (isOn ? "on" : "off"));
    });
  });

  // ---------------- Automation mode switch (sliding indicator) ----------------
  const panels = { automatic: $("#panel-automatic"), manual: $("#panel-manual"), smart: $("#panel-smart") };
  const modeSwitchEl = $("#mode-switch");
  const modeIndicator = $("#mode-switch-indicator");

  function positionModeIndicator(animate) {
    const activeSeg = modeSwitchEl.querySelector(".mode-seg.active");
    if (!activeSeg) return;
    if (!animate) modeIndicator.style.transition = "none";
    modeIndicator.style.width = activeSeg.offsetWidth + "px";
    modeIndicator.style.transform = "translateX(" + (activeSeg.offsetLeft - 4) + "px)";
    if (!animate) {
      void modeIndicator.offsetWidth;
      modeIndicator.style.transition = "";
    }
  }

  function syncModeUI(mode, animate) {
    $$(".mode-seg[data-mode]").forEach((s) => s.classList.toggle("active", s.dataset.mode === mode));
    positionModeIndicator(animate);
    Object.entries(panels).forEach(([key, el]) => {
      if (key === mode) {
        el.style.display = "flex";
        Array.from(el.children).forEach((child, i) => {
          child.classList.remove("reveal-item");
          void child.offsetWidth;
          child.style.setProperty("--reveal-delay", (i * 50) + "ms");
          child.classList.add("reveal-item");
        });
      } else {
        el.style.display = "none";
      }
    });
    $$(".mode-seg[data-mode='smart'] img").forEach((img) => {
      img.src = mode === "smart" ? "assets/sparkle-tab.svg" : "assets/sparkle-tab-muted.svg";
    });
  }

  $$(".mode-seg[data-mode]").forEach((seg) => {
    seg.addEventListener("click", () => {
      if (seg.classList.contains("active")) return;
      state.motorMode = seg.dataset.mode;
      syncModeUI(seg.dataset.mode, true);
    });
  });
  window.addEventListener("resize", () => positionModeIndicator(false));

  $("#why-time-btn").addEventListener("click", () => {
    toast("Off-peak tariff runs 10 PM–6 AM and this sits inside your quiet hours.");
  });

  // ---------------- Usage range tabs ----------------
  const usageData = {
    week: { water: "1,240", elec: "8.4", bars: [104, 71, 37, 83, 60, 104, 46], labels: ["M","T","W","T","F","S","S"], peak: 5 },
    month: { water: "5,120", elec: "31.6", bars: [70, 95, 60, 104, 45, 80, 55, 68, 90, 52, 104, 40], labels: ["1","2","3","4","5","6","7","8","9","10","11","12"], peak: 3 },
    year: { water: "58,400", elec: "372", bars: [60, 72, 88, 65, 55, 70, 104, 95, 60, 58, 62, 80], labels: ["J","F","M","A","M","J","J","A","S","O","N","D"], peak: 6 },
  };
  function renderUsageChart(range) {
    const d = usageData[range];
    $("#usage-water").textContent = d.water;
    $("#usage-elec").textContent = d.elec;
    const chart = $("#usage-bar-chart");
    chart.innerHTML = "";
    d.bars.forEach((h, i) => {
      const col = document.createElement("div");
      col.className = "col" + (i === d.peak ? " peak" : "");
      col.innerHTML =
        '<div class="track"><div class="fill" style="height:' + h + 'px; --bar-delay:' + (i * 45) + 'ms;"></div></div>' +
        '<span class="day-label">' + d.labels[i] + "</span>";
      chart.appendChild(col);
    });
  }
  $$(".range-tab[data-range]").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) return;
      $$(".range-tab[data-range]").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.range = tab.dataset.range;
      renderUsageChart(state.range);
    });
  });

  // ---------------- Demo panel ----------------
  function openDemoPanel() { $("#demo-panel").classList.add("active"); }
  function closeDemoPanel() { $("#demo-panel").classList.remove("active"); }
  $("#btn-menu").addEventListener("click", openDemoPanel);
  $("#demo-close").addEventListener("click", closeDemoPanel);
  $("#demo-panel").addEventListener("click", (e) => {
    if (e.target.id === "demo-panel") closeDemoPanel();
  });
  $("#btn-bell").addEventListener("click", () => openOverlay("overlay-leak"));

  // ---------------- Guided tour ----------------
  const tourSteps = [
    {
      screen: "home", target: ".card-level",
      title: "Live tank level",
      text: "The tank card always shows the real-time level, litres, and what the motor is doing right now — filling, steady, or low.",
    },
    {
      screen: "home", target: "#home-motor-card",
      title: "Motor at a glance",
      text: "Tap this card to open the full Motor screen, or tap the round button on the right to start or stop the motor directly from Home.",
    },
    {
      screen: "home", target: "#home-usage-card",
      title: "This week, at a glance",
      text: "A quick snapshot of water and electricity use. Tap it to see the full history broken down by week, month, or year.",
    },
    {
      screen: "home", target: ".tab-bar",
      title: "Get around",
      text: "The four circles switch between Home, Usage, Motor, and Automation. The lime button is Fill Now — the one action you'd need urgently.",
    },
    {
      screen: "fill-range", target: ".card-range",
      title: "Set your fill range",
      text: "Drag either handle right on the tank to choose when the motor should start filling and when it should stop.",
    },
    {
      screen: "motor", target: "#motor-running-card",
      title: "Motor detail",
      text: "Live flow rate, power draw, and today's run count — with a one-tap stop if you ever need to override it.",
    },
    {
      screen: "automation", target: "#mode-switch",
      title: "Automatic, Manual, or Smart",
      text: "Automatic runs on fixed thresholds, Manual leaves it to you with a low-water warning, and Smart predicts fill times from your household's pattern.",
    },
    {
      screen: "usage", target: ".card-week",
      title: "Track everything",
      text: "Water used, electricity drawn, and every motor run — so you can see exactly how automation is helping.",
    },
  ];
  let tourIndex = 0;

  function tourEl(sel) { return $(sel, $("#tour-overlay")); }

  function renderTourDots() {
    const dots = $("#tour-dots");
    dots.innerHTML = "";
    tourSteps.forEach((_, i) => {
      const d = document.createElement("span");
      if (i === tourIndex) d.classList.add("on");
      dots.appendChild(d);
    });
  }

  function startTour() {
    closeDemoPanel();
    tourIndex = 0;
    $("#tour-overlay").classList.add("active");
    runTourStep();
  }
  function endTour() {
    $("#tour-overlay").classList.remove("active");
  }
  function runTourStep() {
    const step = tourSteps[tourIndex];
    if (!step) { endTour(); return; }
    const activeEl = $(".screen.active");
    if (!activeEl || activeEl.dataset.screen !== step.screen) {
      showScreen(step.screen);
      setTimeout(() => positionTourStep(step), 480);
    } else {
      positionTourStep(step);
    }
  }
  function positionTourStep(step) {
    const screenEl = $(`.screen[data-screen="${step.screen}"]`);
    const targetEl = screenEl && screenEl.querySelector(step.target);
    const phone = $("#phone");
    const phoneRect = phone.getBoundingClientRect();
    if (!targetEl) { tourIndex++; runTourStep(); return; }

    if (typeof targetEl.scrollIntoView === "function") {
      targetEl.scrollIntoView({ block: "center", behavior: "instant" });
    }

    const rect = targetEl.getBoundingClientRect();
    const pad = 8;
    const left = rect.left - phoneRect.left - pad;
    const top = rect.top - phoneRect.top - pad;
    const width = rect.width + pad * 2;
    const height = rect.height + pad * 2;

    const spot = tourEl("#tour-spotlight");
    spot.style.left = left + "px";
    spot.style.top = top + "px";
    spot.style.width = width + "px";
    spot.style.height = height + "px";
    const radius = parseFloat(getComputedStyle(targetEl).borderRadius) || 20;
    spot.style.borderRadius = Math.min(radius + pad, 40) + "px";

    tourEl("#tour-step-count").textContent = (tourIndex + 1) + " / " + tourSteps.length;
    tourEl("#tour-title").textContent = step.title;
    tourEl("#tour-text").textContent = step.text;
    tourEl("#tour-back").style.visibility = tourIndex === 0 ? "hidden" : "visible";
    tourEl("#tour-next").textContent = tourIndex === tourSteps.length - 1 ? "Done" : "Next";
    renderTourDots();

    const tip = tourEl("#tour-tooltip");
    tip.style.animation = "none";
    void tip.offsetWidth;
    tip.style.animation = "";

    // measure after content is set, then place above or below the spotlight
    requestAnimationFrame(() => {
      const tipH = tip.offsetHeight;
      const tipW = tip.offsetWidth;
      const phoneW = phoneRect.width;
      const phoneH = phoneRect.height;
      const spaceBelow = phoneH - (top + height);
      let tipTop;
      if (spaceBelow > tipH + 24) {
        tipTop = top + height + 16;
      } else if (top > tipH + 24) {
        tipTop = top - tipH - 16;
      } else {
        tipTop = Math.max(16, (phoneH - tipH) / 2);
      }
      let tipLeft = left + width / 2 - tipW / 2;
      tipLeft = Math.max(16, Math.min(tipLeft, phoneW - tipW - 16));
      tip.style.top = tipTop + "px";
      tip.style.left = tipLeft + "px";
    });
  }
  $("#start-tour-btn").addEventListener("click", startTour);
  $("#tour-skip").addEventListener("click", endTour);
  $("#tour-next").addEventListener("click", () => {
    if (tourIndex >= tourSteps.length - 1) { endTour(); return; }
    tourIndex++;
    runTourStep();
  });
  $("#tour-back").addEventListener("click", () => {
    if (tourIndex === 0) return;
    tourIndex--;
    runTourStep();
  });
  window.addEventListener("resize", () => {
    if ($("#tour-overlay").classList.contains("active")) positionTourStep(tourSteps[tourIndex]);
  });

  // ---------------- Feedback ----------------
  const FEEDBACK_KEY = "h2oConnectFeedback";
  let feedbackRating = 0;

  function renderFeedbackStars() {
    $$("#feedback-stars .star").forEach((star, i) => {
      star.classList.toggle("filled", i < feedbackRating);
    });
  }
  function openFeedback() {
    closeDemoPanel();
    feedbackRating = 0;
    renderFeedbackStars();
    $("#feedback-text").value = "";
    $("#feedback-form-view").style.display = "flex";
    $("#feedback-thanks-view").style.display = "none";
    $("#feedback-modal").classList.add("active");
  }
  function closeFeedback() {
    $("#feedback-modal").classList.remove("active");
  }
  $("#open-feedback-btn").addEventListener("click", openFeedback);
  $("#feedback-close").addEventListener("click", closeFeedback);
  $("#feedback-done").addEventListener("click", closeFeedback);
  $("#feedback-modal").addEventListener("click", (e) => {
    if (e.target.id === "feedback-modal") closeFeedback();
  });
  $$("#feedback-stars .star").forEach((star, i) => {
    star.addEventListener("click", () => {
      feedbackRating = i + 1;
      renderFeedbackStars();
    });
  });
  $("#feedback-submit").addEventListener("click", () => {
    if (feedbackRating === 0) { toast("Pick a star rating first"); return; }
    try {
      const entry = {
        rating: feedbackRating,
        comment: $("#feedback-text").value.trim(),
        screen: $(".screen.active").dataset.screen,
        at: new Date().toISOString(),
      };
      const list = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
      list.push(entry);
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));
    } catch (err) { /* localStorage unavailable — still show thanks */ }
    $("#feedback-form-view").style.display = "none";
    $("#feedback-thanks-view").style.display = "flex";
  });

  $$("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const which = btn.dataset.demo;
      $("#demo-panel").classList.remove("active");
      if (which === "low-water") {
        state.level = 22;
        state.motorOn = false;
        state.motorMode = "manual";
        renderHome();
        renderMotor();
        showScreen("home");
        setTimeout(() => openOverlay("overlay-low"), 300);
      } else if (which === "leak") {
        openOverlay("overlay-leak");
      } else if (which === "reset") {
        state.level = 78;
        state.motorOn = true;
        state.motorMode = "automatic";
        state.motorSecondsLeft = 4 * 60 + 12;
        state.fillStop = 90;
        state.fillStart = 25;
        renderHome();
        renderMotor();
        renderFillRange();
        syncModeUI("automatic", true);
        showScreen("home");
        toast("Reset to default state");
      }
    });
  });

  // ---------------- init ----------------
  renderHome();
  renderFillRange();
  renderMotor();
  renderUsageChart("week");
  syncNavIcons();
  syncModeUI(state.motorMode, false);
  triggerContentReveal($(".screen.active"));

  attachRipple(".chip, .range-tab, .mode-seg, .demo-btn");
})();
