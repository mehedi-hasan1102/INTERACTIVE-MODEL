// script.js

(function () {
  const root = document.querySelector('[data-imw]');
  if (!root) return;

  const COPY = {
    cultural: [
      "An Indigenous Commissioner who is culturally capable; commissioned evaluation is adaptable to the community context, utilising their relationships and fostering trust.",
      "Commissioner trusts Indigenous Service Providers to commission an evaluation that respects and has relationships with Indigenous people, therefore evaluation is adaptable to the community context.",
      "Cultural capability of Commissioner grows through relationships with Indigenous peoples, enhancing community responsiveness and fostering trust. There may be compromises in stakeholders' preferred approaches.",
      "Commissioner’s limited cultural capability reduces cultural responsiveness of an evaluation leading to an evaluation which lacks respect for the community context undermining Indigenous people’s trust.",
      "Commissioner has no cultural capability, resulting in an evaluation that lacks any cultural responsiveness and fails to respect Indigenous community context, undermining trust."
    ],
    power: [
      "Indigenous led and self-determined, with accountability to Indigenous people and communities.",
      "Commissioner delegates evaluation responsibilities to Indigenous Service Providers. Service Providers are primarily accountable to Indigenous people rather than the Commissioner.",
      "Equal partnerships between Commissioners and Service Provider(s) with accountability to each other and Indigenous communities. There may be compromises in stakeholders' preferred approaches.",
      "Little engagement and no partnership with Indigenous people. Power is maintained by the Commissioner. Commissioners have no accountability to Indigenous people or organisations.",
      "No, or tokenistic, engagement with Indigenous people. Power is maintained by the Commissioner. Commissioners have no accountability to Indigenous people or organisations."
    ],
    reciprocity: [
      "An Indigenous organisation, as Commissioner, has responsibility to Indigenous people to ensure the evaluation benefits them and develops community capability.",
      "The Indigenous Service Providers(s) have the authority to commission the evaluation. They oversee an evaluation that is of benefit to Indigenous people and incorporates capability building.",
      "Equal partnership fosters two-way learning, allowing for an understanding of commissioning evaluations that benefits the community. Also builds capability. There may be compromises in stakeholders' preferred approaches.",
      "Superficial hospitality towards the Indigenous people or Service Providers; limited benefit to the community, two-way learning, or capability building.",
      "Commissioner demonstrates little to no reciprocity/ hospitality towards the Indigenous people or Service Providers. Little benefit to the community, two-way learning, or capability building."
    ]
  };
  const STAGES = ["Indigenous Led", "Delegative", "Co-Design", "Participatory", "Top Down"];

  const guideTop = document.getElementById('guideTop');
  const guideBot = document.getElementById('guideBottom');
  const baseline = document.getElementById('baseline');
  const midRow = document.getElementById('midRow');
  const dotline = midRow.querySelector('.dotline');

  const floatEl = document.getElementById('titleFloat');
  const popover = document.getElementById('imw-popover');
  const card = popover.querySelector('.popover-card');
  const titleEl = document.getElementById('imw-popover-title');
  const textEl = document.getElementById('imw-popover-text');
  const closeBtn = popover.querySelector('[data-close]');
  const POPOVER_SHIFT_X = -280; // negative value moves the popover card to the left
  const POPOVER_MIN_LEFT = -480; // allow stronger overflow to the left of midRow
  const POPOVER_EDGE_GAP = 10;

  const titleMap = {};
  let lastTrigger = null;
  const dots = Array.from(root.querySelectorAll('.dot'));
  document.querySelectorAll('.col-title').forEach(n => { titleMap[Number(n.dataset.stageTitle)] = n; });

  // column hover colorization (mouse)
  dotline.addEventListener('mousemove', (e) => {
    const r = dotline.getBoundingClientRect();
    const x = e.clientX - r.left;
    const col = Math.min(4, Math.max(0, Math.floor((x / r.width) * 5)));
    root.setAttribute('data-hover-col', String(col));
  });
  dotline.addEventListener('mouseleave', () => root.removeAttribute('data-hover-col'));

  // keyboard parity
  dots.forEach(btn => {
    btn.addEventListener('focus', () => root.setAttribute('data-hover-col', btn.getAttribute('data-stage')));
    btn.addEventListener('blur', () => root.removeAttribute('data-hover-col'));
  });

  function clearSelectedDot() {
    dots.forEach(dot => dot.classList.remove('is-selected'));
  }

  function centerXForStage(stage) {
    // middle (power) dot is the anchor
    const btn = dotline.querySelector(`.dot[data-stage="${stage}"][data-theme="power"]`);
    const r = btn.getBoundingClientRect();
    const m = midRow.getBoundingClientRect();
    return r.left - m.left + r.width / 2;
  }

  function placeFloatingTitle(stage, theme, cardRect) {
    const defaultTitle = titleMap[stage];
    if (!defaultTitle) return;

    // hide the default title while floating
    defaultTitle.style.visibility = 'hidden';

    // set content + theme-highlighting
    floatEl.innerHTML = `<span>${STAGES[stage]}</span><span class="title-arrows">↔</span>`;
    floatEl.dataset.theme = theme;
    floatEl.classList.add('active');

    // measure and place
    floatEl.style.transform = 'translate(-9999px,-9999px)';
    floatEl.style.display = 'block';

    const m = midRow.getBoundingClientRect();
    const fr = floatEl.getBoundingClientRect();

    const cx = centerXForStage(stage);
    const left = Math.max(8, Math.min(cx - fr.width / 2, m.width - fr.width - 8));
    const margin = 10;
    const top = (theme === 'reciprocity')
      ? (cardRect.bottom - m.top + margin)
      : (cardRect.top - m.top - fr.height - margin);

    floatEl.style.left = left + 'px';
    floatEl.style.top = top + 'px';
    floatEl.style.transform = 'none';
  }

  function clearFloatingTitle() {
    floatEl.classList.remove('active');
    delete floatEl.dataset.theme;
    floatEl.style.transform = 'translate(-9999px,-9999px)';
    floatEl.style.display = 'block';
    // restore all defaults
    Object.values(titleMap).forEach(n => n.style.visibility = '');
  }

  function openPopover(btn) {
    // NEW: restore any previously hidden default titles BEFORE opening a new popup
    clearFloatingTitle();
    clearSelectedDot();

    lastTrigger = btn;
    btn.classList.add('is-selected');

    const stage = Number(btn.getAttribute('data-stage'));
    const theme = btn.getAttribute('data-theme');

    titleEl.textContent = STAGES[stage];
    textEl.textContent = COPY[theme][stage];
    card.dataset.theme = theme;

    // show to get card size
    popover.hidden = false;

    // reset position to measure
    card.style.left = '0px';
    card.style.top = '0px';

    const rDot = btn.getBoundingClientRect();
    const rCard = card.getBoundingClientRect();
    const rMid = midRow.getBoundingClientRect(); // relative to midRow container

    // Center horizontally over dot
    let left = (rDot.left + rDot.width / 2) - (rCard.width / 2) - rMid.left;

    // Always position above the dot
    let top = (rDot.top - rMid.top) - rCard.height - 15;

    // Add arrow pointing down
    card.classList.remove('arrow-top');
    card.classList.add('arrow-bottom');

    // Move card slightly left, then clamp within midRow
    left += POPOVER_SHIFT_X;

    // Horizontal clamping: keep right side safe, allow extra left overflow
    left = Math.max(POPOVER_MIN_LEFT, Math.min(left, rMid.width - rCard.width - POPOVER_EDGE_GAP));

    card.style.left = left + 'px';
    card.style.top = top + 'px';

    // Calculate arrow offset to point at the dot
    // Dot center relative to midRow
    const dotCenterX = (rDot.left + rDot.width / 2) - rMid.left;
    // Card left position (after clamping)
    const cardLeft = left;
    // Arrow offset from card's left edge
    const arrowOffset = dotCenterX - cardLeft;

    // Set CSS custom property for arrow position
    card.style.setProperty('--arrow-offset', `${arrowOffset}px`);

    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onEsc);
  }

  function closePopover() {
    popover.hidden = true;
    clearFloatingTitle();
    clearSelectedDot();
    document.removeEventListener('keydown', onEsc);
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }
  function onEsc(e) { if (e.key === 'Escape') closePopover(); }
  if (closeBtn) closeBtn.addEventListener('click', closePopover);

  // click handlers
  dots.forEach(btn => {
    btn.type = 'button';
    btn.addEventListener('click', () => openPopover(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopover(btn);
      }
    });
  });
})();
