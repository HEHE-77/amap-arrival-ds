/**
 * 下单浮层 · Figma 1057:4138「下单组件库」；整屏稿 812:7855 饭店 / 812:7856 景点 / 812:7857 一键下单
 * 依赖 components/primitives/primitives.js（amap-tag）；只引用新版 token。
 *
 * ── 容器 ──
 *   <amap-order-sheet heading="胡大饭馆 24h (砺街总店)" subtitle="距你 32m · 11 家门店可用" [open]>
 *     …区块（放进可滚动的内容区）…
 *     <amap-order-terms> / <amap-order-notice>（可选，贴底，在底部栏上方）
 *     <amap-order-footer>（贴底）
 *   </amap-order-sheet>
 *   遮罩 overlay/scrim（70%），面板自底部移入 400ms；点遮罩不关闭，只能点右上角 ×。
 *   方法 open() / close()；事件 sheet-open / sheet-close。
 *   联动：区块里选中的商品（套餐 / 票种，item 带 price）× 数量 + 加购 → 自动改写底部栏价格。
 *
 * ── 区块 ──
 *   <amap-order-options kind="set|ticket|date|session|pickup" heading desc items='[…]' [selected="0"]>
 *       set     套餐选项 128×97：{ name, price, sold, badge, original?, detail? }
 *       ticket  票种选项 128×88：{ name, price, off, sold, badge, original? }
 *       date    日期选项 92×60 + 「更多日期」：{ date, price, badge }；more="更多日期" 显示更多
 *       session 场次选项 两列 44 高：{ time, note, badge, disabled }
 *       pickup  取餐时间 四列 50 高：{ time, note }
 *     事件 option-select → { kind, index, item }；date 的「更多日期」→ option-more
 *   <amap-order-set-detail image name rules summary groups='[{ name, items:[{ name, qty, price }] }]'>  套餐详情卡
 *   <amap-order-quantity heading="数量" [desc] value min max>   数量行（内含步进器）· 事件 quantity-change → { value }
 *   <amap-stepper value min max>                                  步进器 96×26 · 事件 stepper-change → { value }
 *   <amap-order-item image name tag spec link-label swap-label>   已选商品卡 · 事件 item-spec / item-swap
 *   <amap-order-addons heading desc items='[{ name, tag, price, original, image, tone }]'>  加购（tone = brand|warning|success|pink）· 事件 addon-change → { index, added }
 *   <amap-order-payment cups="1" method="微信支付 (已开通免密支付)">  杯数 + 支付方式 · 事件 quantity-change / payment-change
 *   <amap-order-terms text="到店出示取餐码 · 下单即同意《服务条款》">
 *   <amap-order-notice lines='["…","…"]' link-label="购买须知">  购买须知条 · 事件 notice-more
 *   <amap-order-footer price="98" original="136" note="已优惠 ¥38 · 随时退" action-label="去下单">  底部栏 · 事件 order-submit
 *
 * 素材目录：读取最近祖先的 asset-base 属性，默认 ../../assets/
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const parse = (v, d) => { try { return v ? JSON.parse(v) : d; } catch { return d; } };
  const has = (v) => v != null && v !== '';
  const fire = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
  const yuan = (n) => (Math.round(n * 100) / 100).toString();

  const ICON = {
    close: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 6 10" aria-hidden="true"><path d="M1 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronUp: '<svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 5l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    minus: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6h9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    plus: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6h9M6 1.5v9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    // 支付方式图标：通用绿色对话气泡（Figma 用 #00C800 填充）
    pay: '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="#00C800" d="M7.6 3C4.5 3 2 5.1 2 7.7c0 1.5.8 2.8 2.1 3.7l-.5 1.6 1.9-1c.6.2 1.3.3 2.1.3h.4a4.3 4.3 0 0 1-.2-1.2c0-2.6 2.5-4.6 5.5-4.6h.4C13.2 4.6 10.7 3 7.6 3Z"/><path fill="#00C800" d="M18 11.2c0-2.2-2.1-3.9-4.7-3.9s-4.7 1.7-4.7 3.9 2.1 3.9 4.7 3.9c.5 0 1.1-.1 1.6-.2l1.6.9-.4-1.4c1.1-.8 1.9-1.9 1.9-3.2Z"/><circle cx="5.7" cy="6.6" r=".75" fill="#fff"/><circle cx="9.5" cy="6.6" r=".75" fill="#fff"/><circle cx="11.8" cy="10.4" r=".6" fill="#fff"/><circle cx="14.8" cy="10.4" r=".6" fill="#fff"/></svg>',
  };

  // 缺图占位：配图待补（设计后续提供）
  const PH = '<span class="os-ph">配图待补</span>';

  class Base extends HTMLElement {
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }
  }

  /* ── 步进器 96×26：减号 surface/sunken、加号 bg/brand-soft，到下限时减号 icon/disabled ── */
  class AmapStepper extends Base {
    static get observedAttributes() { return ['value', 'min', 'max']; }
    get value() { return Number(this.attr('value', '1')) || 0; }
    render() {
      const v = this.value, min = Number(this.attr('min', '1')), max = Number(this.attr('max', '99'));
      this.innerHTML = `
        <div class="os-stepper" role="group" aria-label="数量">
          <button type="button" class="os-stepper__btn os-stepper__btn--minus" data-d="-1" aria-label="减少"${v <= min ? ' disabled' : ''}>${ICON.minus}</button>
          <span class="os-stepper__value" aria-live="polite">${v}</span>
          <button type="button" class="os-stepper__btn os-stepper__btn--plus" data-d="1" aria-label="增加"${v >= max ? ' disabled' : ''}>${ICON.plus}</button>
        </div>`;
      this.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
        const next = Math.min(max, Math.max(min, v + Number(b.dataset.d)));
        if (next === v) return;
        this.setAttribute('value', String(next));
        fire(this, 'stepper-change', { value: next });
      }));
    }
  }

  /* ── 区块卡片外壳：surface/card + border/default 0.6 内描边 + radius/container ── */
  const titleRow = (heading, desc) => `
    <div class="os-block__head">
      <h3 class="os-block__title">${esc(heading)}</h3>
      ${has(desc) ? `<span class="os-block__desc">${esc(desc)}</span>` : ''}
    </div>`;
  const badge = (text) => (has(text) ? `<span class="os-badge">${esc(text)}</span>` : '');

  /* ── 选项区块：套餐 / 票种 / 日期 / 场次 / 取餐时间 ── */
  class AmapOrderOptions extends Base {
    static get observedAttributes() { return ['kind', 'heading', 'desc', 'items', 'selected', 'more']; }
    get kind() { return ['set', 'ticket', 'date', 'session', 'pickup'].includes(this.attr('kind')) ? this.attr('kind') : 'set'; }
    get items() { return parse(this.attr('items'), []); }
    get selected() { return Number(this.attr('selected', '0')); }

    option(item, i) {
      const sel = i === this.selected;
      const dis = !!item.disabled;
      const price = (p) => (has(item.priceText)
        ? `<span class="os-opt__price">${esc(item.priceText)}</span>`
        : `<span class="os-opt__price"><small>¥</small>${esc(p)}</span>`);
      let body = '';
      switch (this.kind) {
        case 'set':
          body = `<span class="os-opt__name">${esc(item.name)}</span>
            <span class="os-opt__foot">${price(item.price)}<span class="os-opt__sold">${esc(item.sold)}</span></span>`;
          break;
        case 'ticket':
          body = `<span class="os-opt__name">${esc(item.name)}</span>
            <span class="os-opt__foot">
              <span class="os-opt__price-row">${price(item.price)}${has(item.off) ? `<span class="os-off">${esc(item.off)}</span>` : ''}</span>
              <span class="os-opt__sold">${esc(item.sold)}</span>
            </span>`;
          break;
        case 'date':
          body = `<span class="os-opt__text">${esc(item.date)}</span>${price(item.price)}`;
          break;
        case 'session':
          body = `<span class="os-opt__text">${esc(item.time)}</span><span class="os-opt__note">${esc(item.note)}</span>`;
          break;
        case 'pickup':
          body = `<span class="os-opt__time">${esc(item.time)}</span><span class="os-opt__note">${esc(item.note)}</span>`;
          break;
      }
      return `<button type="button" class="os-opt" data-index="${i}" aria-pressed="${sel}"${dis ? ' disabled' : ''}>
        ${dis ? '' : badge(item.badge)}${body}</button>`;
    }

    render() {
      const kind = this.kind;
      const items = this.items;
      const more = kind === 'date' && has(this.attr('more'))
        ? `<button type="button" class="os-opt os-opt--more"><span>${esc(this.attr('more')).replace(/(..)(.+)/, '$1<br>$2')}</span>${ICON.chevron}</button>` : '';
      const scroll = kind === 'set' || kind === 'ticket';
      this.innerHTML = `
        <section class="os-block os-block--${scroll ? 'scroll' : 'inset'}" data-kind="${kind}">
          ${titleRow(this.attr('heading'), this.attr('desc'))}
          <div class="os-opts os-opts--${kind}" role="group" aria-label="${esc(this.attr('heading'))}">${items.map((it, i) => this.option(it, i)).join('')}${more}</div>
        </section>`;
      this.querySelectorAll('.os-opt[data-index]').forEach((b) => b.addEventListener('click', () => {
        const index = Number(b.dataset.index);
        if (index !== this.selected) this.setAttribute('selected', String(index));
        fire(this, 'option-select', { kind, index, item: items[index] });
      }));
      this.querySelector('.os-opt--more')?.addEventListener('click', () => fire(this, 'option-more', { kind }));
    }
  }

  /* ── 套餐详情卡：图 64 + 名称 / 规则；「套餐内容」分组明细 ── */
  class AmapOrderSetDetail extends Base {
    static get observedAttributes() { return ['image', 'name', 'rules', 'summary', 'groups', 'heading']; }
    render() {
      const groups = parse(this.attr('groups'), []);
      this.innerHTML = `
        <section class="os-block os-detail">
          <div class="os-detail__info">
            <div class="os-detail__media">${has(this.attr('image')) ? `<img src="${esc(this.attr('image'))}" alt="">` : PH}</div>
            <div class="os-detail__text">
              <h3 class="os-detail__name">${esc(this.attr('name'))}</h3>
              ${has(this.attr('rules')) ? `<p class="os-detail__rules">${esc(this.attr('rules'))}</p>` : ''}
            </div>
          </div>
          ${groups.length ? `
          <div class="os-detail__content">
            <div class="os-detail__head"><h4>${esc(this.attr('heading', '套餐内容'))}</h4><span>${esc(this.attr('summary'))}</span></div>
            ${groups.map((g) => `
              <div class="os-detail__group">
                <span class="os-detail__group-name">${esc(g.name)}</span>
                ${(g.items || []).map((d) => `<div class="os-dish"><span class="os-dish__name">${esc(d.name)}</span><span class="os-dish__qty">${esc(d.qty)}</span><span class="os-dish__price">${esc(d.price)}</span></div>`).join('')}
              </div>`).join('')}
          </div>` : ''}
        </section>`;
    }
  }

  /* ── 数量行：标题（+ 说明）+ 步进器 ── */
  class AmapOrderQuantity extends Base {
    static get observedAttributes() { return ['heading', 'desc', 'value', 'min', 'max']; }
    render() {
      this.innerHTML = `
        <section class="os-block os-qty">
          <div class="os-qty__text">
            <h3 class="os-block__title">${esc(this.attr('heading', '数量'))}</h3>
            ${has(this.attr('desc')) ? `<span class="os-block__desc">${esc(this.attr('desc'))}</span>` : ''}
          </div>
          <amap-stepper value="${esc(this.attr('value', '1'))}" min="${esc(this.attr('min', '1'))}" max="${esc(this.attr('max', '99'))}"></amap-stepper>
        </section>`;
      this.querySelector('amap-stepper').addEventListener('stepper-change', (e) => {
        e.stopPropagation();
        this.setAttribute('value', String(e.detail.value));   // 重新渲染前已拿到值
        fire(this, 'quantity-change', { value: e.detail.value });
      });
    }
  }

  /* ── 已选商品卡（一键下单）：图 56 + 名称 / 标签 / 规格 + 「换一杯」 ── */
  class AmapOrderItem extends Base {
    static get observedAttributes() { return ['image', 'name', 'tag', 'spec', 'link-label', 'swap-label']; }
    render() {
      this.innerHTML = `
        <section class="os-block os-item">
          <div class="os-item__media">${has(this.attr('image')) ? `<img src="${esc(this.attr('image'))}" alt="">` : PH}</div>
          <div class="os-item__text">
            <div class="os-item__title"><h3>${esc(this.attr('name'))}</h3>${has(this.attr('tag')) ? `<span class="os-item__tag">${esc(this.attr('tag'))}</span>` : ''}</div>
            <div class="os-item__spec"><span>${esc(this.attr('spec'))}</span>
              <button type="button" class="os-item__link">${esc(this.attr('link-label', '改规格'))}${ICON.chevron}</button></div>
          </div>
          <button type="button" class="os-item__swap">${esc(this.attr('swap-label', '换一杯'))}</button>
        </section>`;
      this.querySelector('.os-item__link').addEventListener('click', () => fire(this, 'item-spec'));
      this.querySelector('.os-item__swap').addEventListener('click', () => fire(this, 'item-swap'));
    }
  }

  /* ── 加购区块：横滑商品卡 120×160，四种底色 ── */
  const ADDON_TONE = ['brand', 'warning', 'success', 'pink'];
  class AmapOrderAddons extends Base {
    static get observedAttributes() { return ['heading', 'desc', 'items', 'added']; }
    get added() { return parse(this.attr('added'), []); }
    render() {
      const items = parse(this.attr('items'), []);
      const added = this.added;
      this.innerHTML = `
        <section class="os-block os-block--scroll" data-kind="addon">
          ${titleRow(this.attr('heading'), this.attr('desc'))}
          <div class="os-opts os-opts--addon">${items.map((it, i) => `
            <div class="os-addon" data-tone="${ADDON_TONE.includes(it.tone) ? it.tone : ADDON_TONE[i % 4]}">
              <div class="os-addon__media">${has(it.image) ? `<img src="${esc(it.image)}" alt="">` : PH}</div>
              <div class="os-addon__info">
                <span class="os-addon__name">${esc(it.name)}</span>
                ${has(it.tag) ? `<amap-tag tone="tenure" text="${esc(it.tag)}"></amap-tag>` : ''}
              </div>
              <div class="os-addon__foot">
                <span class="os-addon__price"><span class="os-opt__price"><small>¥</small>${esc(it.price)}</span>${has(it.original) ? `<s>¥${esc(it.original)}</s>` : ''}</span>
                <button type="button" class="os-addon__add" data-index="${i}" aria-pressed="${added.includes(i)}" aria-label="加购 ${esc(it.name)}">${added.includes(i) ? ICON.minus : ICON.plus}</button>
              </div>
            </div>`).join('')}</div>
        </section>`;
      this.querySelectorAll('.os-addon__add').forEach((b) => b.addEventListener('click', () => {
        const index = Number(b.dataset.index);
        const on = !added.includes(index);
        const next = on ? [...added, index] : added.filter((x) => x !== index);
        this.setAttribute('added', JSON.stringify(next));
        fire(this, 'addon-change', { index, added: on, item: items[index] });
      }));
    }
  }

  /* ── 杯数 + 支付方式 ── */
  class AmapOrderPayment extends Base {
    static get observedAttributes() { return ['cups', 'cups-label', 'pay-label', 'method', 'min', 'max']; }
    render() {
      this.innerHTML = `
        <section class="os-block os-pay">
          <div class="os-pay__row os-pay__row--cups">
            <span class="os-pay__label">${esc(this.attr('cups-label', '杯数'))}</span>
            <amap-stepper value="${esc(this.attr('cups', '1'))}" min="${esc(this.attr('min', '1'))}" max="${esc(this.attr('max', '99'))}"></amap-stepper>
          </div>
          <button type="button" class="os-pay__row os-pay__row--method">
            <span class="os-pay__label">${esc(this.attr('pay-label', '支付'))}</span>
            <span class="os-pay__method"><span class="os-pay__icon">${ICON.pay}</span>${esc(this.attr('method'))}${ICON.chevron}</span>
          </button>
        </section>`;
      this.querySelector('amap-stepper').addEventListener('stepper-change', (e) => {
        e.stopPropagation();
        this.setAttribute('cups', String(e.detail.value));
        fire(this, 'quantity-change', { value: e.detail.value });
      });
      this.querySelector('.os-pay__row--method').addEventListener('click', () => fire(this, 'payment-change'));
    }
  }

  class AmapOrderTerms extends Base {
    static get observedAttributes() { return ['text']; }
    render() { this.innerHTML = `<p class="os-terms">${esc(this.attr('text'))}</p>`; }
  }

  /* ── 购买须知条：bg/ranking-soft · text/ranking ── */
  class AmapOrderNotice extends Base {
    static get observedAttributes() { return ['lines', 'link-label']; }
    render() {
      this.innerHTML = `
        <div class="os-notice">
          <ul class="os-notice__lines">${parse(this.attr('lines'), []).map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
          <button type="button" class="os-notice__link">${esc(this.attr('link-label', '购买须知'))}${ICON.chevronUp}</button>
        </div>`;
      this.querySelector('.os-notice__link').addEventListener('click', () => fire(this, 'notice-more'));
    }
  }

  /* ── 底部栏：价格 数字/Large · 原价划线 · 优惠说明 · 胶囊按钮 Gradient/Commerce ── */
  class AmapOrderFooter extends Base {
    static get observedAttributes() { return ['price', 'original', 'note', 'action-label'];  }
    render() {
      this.innerHTML = `
        <div class="os-footer">
          <div class="os-footer__price">
            <div class="os-footer__row"><span class="os-footer__now"><small>¥</small>${esc(this.attr('price'))}</span>${has(this.attr('original')) ? `<s class="os-footer__was">¥${esc(this.attr('original'))}</s>` : ''}</div>
            ${has(this.attr('note')) ? `<span class="os-footer__note">${esc(this.attr('note'))}</span>` : ''}
          </div>
          <button type="button" class="os-footer__action">${esc(this.attr('action-label', '去下单'))}</button>
        </div>`;
      this.querySelector('.os-footer__action').addEventListener('click', () =>
        fire(this, 'order-submit', { price: this.attr('price') }));
    }
  }

  /* ── 浮层容器 ── */
  const DURATION = 400;
  class AmapOrderSheet extends HTMLElement {
    static get observedAttributes() { return ['heading', 'subtitle', 'open']; }
    connectedCallback() {
      if (!this._built) this.build();
      if (this.hasAttribute('open')) this.show(false); else this.hidden = true;
    }
    attributeChangedCallback(name) {
      if (!this._built) return;
      if (name === 'open') { this.hasAttribute('open') ? this.show(true) : this.hide(true); return; }
      this.querySelector('.os-sheet__title').textContent = this.getAttribute('heading') ?? '';
      this.querySelector('.os-sheet__subtitle').textContent = this.getAttribute('subtitle') ?? '';
    }

    build() {
      this._built = true;
      const kids = [...this.childNodes];
      const pinned = kids.filter((n) => n.nodeType === 1 && /^AMAP-ORDER-(TERMS|NOTICE|FOOTER)$/.test(n.tagName));
      this.innerHTML = `
        <div class="os-sheet__scrim" aria-hidden="true"></div>
        <section class="os-sheet__panel" role="dialog" aria-modal="true" tabindex="-1">
          <header class="os-sheet__header">
            <div class="os-sheet__titles">
              <h2 class="os-sheet__title"></h2>
              <p class="os-sheet__subtitle"></p>
            </div>
            <button type="button" class="os-sheet__close" aria-label="关闭">${ICON.close}</button>
          </header>
          <div class="os-sheet__body"></div>
          <div class="os-sheet__bottom"></div>
        </section>`;
      const id = `os-title-${Math.random().toString(36).slice(2, 8)}`;
      this.querySelector('.os-sheet__title').id = id;
      this.querySelector('.os-sheet__panel').setAttribute('aria-labelledby', id);
      this.querySelector('.os-sheet__title').textContent = this.getAttribute('heading') ?? '';
      this.querySelector('.os-sheet__subtitle').textContent = this.getAttribute('subtitle') ?? '';
      const body = this.querySelector('.os-sheet__body');
      kids.filter((n) => !pinned.includes(n)).forEach((n) => body.appendChild(n));
      pinned.forEach((n) => this.querySelector('.os-sheet__bottom').appendChild(n));

      this.querySelector('.os-sheet__close').addEventListener('click', () => this.close());
      // 点遮罩不关闭（Figma 交互说明）：只拦截，不做处理
      this.querySelector('.os-sheet__scrim').addEventListener('click', (e) => e.stopPropagation());
      this.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });

      // 价格联动
      this.addEventListener('option-select', (e) => {
        const { kind, item } = e.detail;
        if ((kind === 'set' || kind === 'ticket') && item && item.price != null) { this._unit = item; this.syncDetail(item); this.reprice(); }
      });
      this.addEventListener('quantity-change', (e) => { this._qty = e.detail.value; this.reprice(); });
      this.addEventListener('addon-change', (e) => {
        this._addons = this._addons || new Map();
        if (e.detail.added) this._addons.set(e.detail.index, e.detail.item); else this._addons.delete(e.detail.index);
        this.reprice();
      });
    }

    /** 初始单价：取第一个 set / ticket 选项区块里选中的项，或底部栏现价 */
    baseline() {
      if (this._unit) return;
      const opts = this.querySelector('amap-order-options[kind="set"], amap-order-options[kind="ticket"]');
      if (opts) { this._unit = opts.items[opts.selected]; return; }
      const f = this.querySelector('amap-order-footer');
      if (f) this._unit = { price: f.getAttribute('price'), original: f.getAttribute('original'), keep: true };
    }

    syncDetail(item) {
      const d = this.querySelector('amap-order-set-detail');
      if (!d) return;
      const detail = item.detail || {};
      d.setAttribute('name', detail.name ?? item.name.replace(/\n/g, ''));
      if (detail.image) d.setAttribute('image', detail.image); else d.removeAttribute('image');
      d.setAttribute('heading', detail.heading ?? '套餐内容');
      d.setAttribute('rules', detail.rules ?? d.getAttribute('rules') ?? '');
      d.setAttribute('summary', detail.summary ?? '');
      d.setAttribute('groups', JSON.stringify(detail.groups ?? []));
    }

    reprice() {
      this.baseline();
      const f = this.querySelector('amap-order-footer');
      if (!f || !this._unit) return;
      const qty = this._qty ?? 1;
      const price = Number(this._unit.price), was = Number(this._unit.original ?? this._unit.price);
      let now = price * qty, orig = was * qty;
      for (const a of (this._addons || new Map()).values()) { now += Number(a.price); orig += Number(a.original ?? a.price); }
      const save = orig - now;
      if (!f.dataset.action) f.dataset.action = this._unit.action ? '去下单' : (f.getAttribute('action-label') || '去下单');
      f.setAttribute('action-label', this._unit.action || f.dataset.action);
      f.setAttribute('price', yuan(now));
      if (orig > now) f.setAttribute('original', yuan(orig)); else f.removeAttribute('original');
      const tail = this._unit.action ? '' : (f.dataset.noteTail ?? (f.getAttribute('note') || '').split('·').map((x) => x.trim()).filter((x) => x && !x.startsWith('已优惠')).join(' · '));
      if (f.dataset.noteTail == null) f.dataset.noteTail = tail;
      f.setAttribute('note', [save > 0 ? `已优惠 ¥${yuan(save)}` : '', tail].filter(Boolean).join(' · '));
    }

    open() { this.setAttribute('open', ''); }
    close() { this.removeAttribute('open'); }

    show(animate) {
      clearTimeout(this._t);
      this.hidden = false;
      this.dataset.state = animate ? 'entering' : 'open';
      if (animate) {
        void this.offsetWidth;
        requestAnimationFrame(() => { this.dataset.state = 'open'; });
      }
      this.querySelector('.os-sheet__panel')?.focus({ preventScroll: true });
      fire(this, 'sheet-open');
    }
    hide(animate) {
      if (this.hidden) return;
      this.dataset.state = 'leaving';
      clearTimeout(this._t);
      this._t = setTimeout(() => { this.hidden = true; this.dataset.state = ''; }, animate ? DURATION : 0);
      fire(this, 'sheet-close');
    }
  }

  const defs = {
    'amap-stepper': AmapStepper,
    'amap-order-options': AmapOrderOptions,
    'amap-order-set-detail': AmapOrderSetDetail,
    'amap-order-quantity': AmapOrderQuantity,
    'amap-order-item': AmapOrderItem,
    'amap-order-addons': AmapOrderAddons,
    'amap-order-payment': AmapOrderPayment,
    'amap-order-terms': AmapOrderTerms,
    'amap-order-notice': AmapOrderNotice,
    'amap-order-footer': AmapOrderFooter,
    'amap-order-sheet': AmapOrderSheet,
  };
  for (const [tag, cls] of Object.entries(defs)) if (!customElements.get(tag)) customElements.define(tag, cls);
})();
