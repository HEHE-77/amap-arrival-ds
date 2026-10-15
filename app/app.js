/* 到达页意图模拟器 · 交互 */
(() => {
  const I = window.ArrivalIntent;
  const R = window.ArrivalRender;
  const $ = (id) => document.getElementById(id);
  const esc = (v) =>
    String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // 地址栏 ?scene=explore 可直接打开某个样例
  const initial = new URLSearchParams(location.search).get('scene');
  const s = { scene: I.SCENE[initial] ? initial : 'shop' };
  Object.assign(s, I.SCENE[s.scene].preset);

  const DIM_ORDER = ['move', 'grid', 'city', 'abs', 'poi', 'time', 'fav'];

  function renderPanel() {
    $('scenes').innerHTML = Object.entries(I.SCENE).map(([k, v]) => `
      <button type="button" class="scene" data-scene="${k}" aria-pressed="${s.scene === k}">
        <b>${esc(v.n)}</b><span>${esc(v.short)}</span><em>Figma ${esc(v.figma)}</em>
      </button>`).join('');

    $('dims').innerHTML = DIM_ORDER.map((key) => {
      const d = I.DIM[key];
      const legal = key === 'abs' ? I.SCENE[s.scene].abs : null;
      const off = key === 'poi' && s.abs !== 'point';
      return `<div class="dim"${off ? ' data-disabled' : ''}>
        <div class="dim__head"><span class="dim__label">${esc(d.label)}</span><span class="dim__hint">${esc(d.hint)}</span></div>
        <div class="chips" role="group" aria-label="${esc(d.label)}">${Object.entries(d.opts).map(([v, n]) => {
          const dis = off || (legal && !legal.includes(v));
          return `<button type="button" class="chip" data-k="${key}" data-v="${v}" aria-pressed="${s[key] === v && !dis}"${dis ? ' disabled' : ''}>${esc(n)}</button>`;
        }).join('')}</div></div>`;
    }).join('');

    const L = I.layout(s);
    $('order').innerHTML = L.map((k, i) => `
      <li><button type="button" class="order__item" data-goto="${k}">
        <span class="order__no">${i + 1}</span><span class="order__name">${esc(I.NAME[k])}</span><span class="order__desc">${esc(I.describe(k, s))}</span>
      </button></li>`).join('');
  }

  function renderPhone(resetScroll) {
    const page = $('page');
    page.className = `page${s.move === 'taxi' ? ' is-taxi' : ''}`;
    page.innerHTML = R.page(s);
    $('screen').querySelectorAll('amap-order-sheet').forEach((x) => x.remove());   // 换场景时收起浮层
    $('clock').textContent = I.CLOCK[s.time];
    $('statusbar').className = 'statusbar is-regular';   // 三个场景 Figma 顶部都有 4 的内边距
    if (resetScroll) $('scroll').scrollTop = 0;
  }

  function render(resetScroll = false) {
    const sc = I.SCENE[s.scene];
    if (!sc.abs.includes(s.abs)) s.abs = sc.abs[0];
    renderPanel();
    renderPhone(resetScroll);
  }

  document.addEventListener('click', (e) => {
    const scene = e.target.closest('[data-scene]');
    if (scene) {
      s.scene = scene.dataset.scene;
      Object.assign(s, I.SCENE[s.scene].preset);
      history.replaceState(null, '', `?scene=${s.scene}`);
      render(true);
      return;
    }
    const chip = e.target.closest('button[data-k]');
    if (chip && !chip.disabled) { s[chip.dataset.k] = chip.dataset.v; render(); return; }
    const go = e.target.closest('[data-goto]');
    if (go) {
      const el = $('page').querySelector(`[data-mod="${go.dataset.goto}"]`) || $('page').querySelector('.pg-top');
      if (!el) return;
      const scroll = $('scroll');
      scroll.scrollTo({ top: el.offsetTop - 51 - 8, behavior: 'smooth' });
      el.removeAttribute('data-flash'); void el.offsetWidth; el.setAttribute('data-flash', '');
    }
  });

  // 手机里组件派发的事件 → 左侧日志
  const EVENTS = ['nav-back', 'nav-search', 'nav-share', 'nav-more', 'trip-replay', 'facility-select', 'bill-pay', 'bill-fee', 'bill-more', 'bill-action',
    'card-primary', 'card-secondary', 'card-review', 'card-deal', 'card-more', 'card-order-buy', 'card-order-swap', 'poi-more', 'poi-select', 'poi-favorite',
    'more-select', 'dish-select', 'nearby-select', 'recommend-select', 'recommend-favorite', 'place-select', 'place-action', 'transit-select',
    'section-more', 'service-action'];
  EVENTS.forEach((type) => $('page').addEventListener(type, (e) => {
    const d = e.detail && Object.keys(e.detail).length ? JSON.stringify(e.detail, (k, v) => (k === 'item' || k === 'deal' ? undefined : v)) : '';
    $('log').innerHTML = `最近交互：<b>${esc(type)}</b> ${esc(d)}`;
  }));

  // CTA → 下单浮层（Figma 1057:4138）：看团购 / 看优惠 → 饭店；订门票 → 景点；一键下单 → 一键下单
  const ORDER_OF_CTA = { group: 'restaurant', ticket: 'scenic' };
  const assetBase = () => document.querySelector('[asset-base]')?.getAttribute('asset-base') ?? '../assets/';
  function openOrder(kind) {
    const screen = $('screen');
    let sheet = screen.querySelector(`amap-order-sheet[data-order="${kind}"]`);
    if (sheet) sheet.remove();   // 每次重新打开都从初始选择开始
    screen.insertAdjacentHTML('beforeend', window.ArrivalOrders.html(kind, assetBase()));
    sheet = screen.querySelector(`amap-order-sheet[data-order="${kind}"]`);
    requestAnimationFrame(() => sheet.open());
  }
  $('page').addEventListener('card-primary', (e) => {
    const card = e.target.closest('amap-place-card, amap-restaurant-card');
    const kind = ORDER_OF_CTA[card?.querySelector('.amap-place')?.dataset.cta];
    if (kind) openOrder(kind);
  });
  $('page').addEventListener('card-order-buy', () => openOrder('quick'));
  ['option-select', 'quantity-change', 'addon-change', 'order-submit', 'sheet-close'].forEach((type) => $('screen').addEventListener(type, (e) => {
    if (e.target.closest('#page')) return;
    const d = e.detail ? JSON.stringify(e.detail, (k, v) => (k === 'item' ? undefined : v)) : '';
    $('log').innerHTML = `最近交互：<b>${esc(type)}</b> ${esc(d)}`;
  }));

  // 视口不够高时整体缩小手机
  function fit() {
    const frame = $('frame');
    const need = 874 + 22 + 40;
    const k = window.innerWidth <= 960 ? Math.min(1, (window.innerWidth - 32) / 424) : Math.min(1, (window.innerHeight - 56) / need);
    frame.style.transform = k < 1 ? `scale(${k.toFixed(3)})` : '';
    frame.style.marginBottom = k < 1 ? `${-(1 - k) * (874 + 22)}px` : '';
  }
  window.addEventListener('resize', fit);

  render(true);
  fit();
})();
