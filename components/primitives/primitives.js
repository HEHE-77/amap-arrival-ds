/**
 * 基础组件（primitives）· 被 Header / POI 卡片等复合组件共用，也可单独使用。
 * 需在复合组件之前加载。
 *
 *   <amap-link label="完整榜单">              文字 + 全局箭头，点击派发原生 click
 *   <amap-ranking-tag text="精选 13 个热门店铺" [on-photo]> 扫街榜标签（底板 + logo + 文案）；on-photo 为照片上的半透明白字版
 *   <amap-rank-thumb rank="1" src="…">         方形图片 + 左上排名角标
 *   <amap-fav-button pressed label="店名">     收藏星标，切换后派发 fav-change { favorited }
 *   <amap-meta-line sep="|" items='[…]' accent-first>  分隔符串联的一行说明，首段可强调（距离）
 *   <amap-rank-ribbon rank="1">               TOP 排名飘带，1 金 / 2 银 / 3 铜（tier 可覆盖）
 *   <amap-score-badge score="4.8" label="超棒"> 评分徽标
 *   <amap-status-tag text="营业中">            营业状态
 *   <amap-deal-tag type="团|票|券" price="￥98" discount="5.6折">  优惠标签（团购 / 门票 / 代金券）
 *   <amap-media-pill text="1/12" [icon="star"] [muted]>    压在图片上的深色胶囊
 *   <amap-button label="看团购" variant="primary|secondary|tonal" [price="9.9"] [shape="pill"]>  按钮，原生 click；pill 为胶囊形
 *   <amap-tag text tone="neutral|tenure|area|promo|outline|danger|success|deal" [size="m|l"]>  小标签；默认 16 高，m / l 按内容（上下 2·左右 6 / 上下 4·左右 8）
 *   <amap-quick-order image title tag spec note price>  一键下单卡片，派发 order-buy / order-swap
 *   <amap-hot-review text="…" count="252 人在说">          热评条，原生 click
 *
 * 素材目录：读取自身或最近祖先的 asset-base 属性，默认 ../../assets/
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const assetBase = (el) => el.closest('[asset-base]')?.getAttribute('asset-base') ?? '../../assets/';
  const markMissing = (root) => root.querySelectorAll('img').forEach((img) =>
    img.addEventListener('error', () => img.classList.add('is-missing'), { once: true }));

  const ASSETS = {
    chevron: 'icon-chevron-right.svg',
    rankingLogo: 'poi/saojiebang-logo.png',
    rankBadge: 'poi/rank-badge.svg',
  };

  // 星标路径取自 Figma 853:4854，内联以便 token 控制描边 / 填充
  const STAR_PATH = 'M12.2148 2.83594C12.5585 2.22247 13.4415 2.22247 13.7852 2.83594L16.0371 6.8584C16.3751 7.46221 16.9668 7.88199 17.6484 8.00098L22.2197 8.79883C22.9366 8.92396 23.2162 9.80427 22.7031 10.3203L19.5674 13.4746C19.0599 13.9852 18.8205 14.7041 18.9209 15.417L19.5381 19.8008C19.6375 20.5067 18.9155 21.0427 18.2686 20.7432L13.9668 18.751C13.3538 18.4672 12.6462 18.4672 12.0332 18.751L7.73145 20.7432C7.0845 21.0427 6.36251 20.5067 6.46191 19.8008L7.0791 15.417C7.17948 14.7041 6.94012 13.9852 6.43262 13.4746L3.29688 10.3203C2.78381 9.80427 3.06342 8.92396 3.78027 8.79883L8.35156 8.00098C9.03322 7.88199 9.62492 7.46221 9.96289 6.8584L12.2148 2.83594Z';

  class Base extends HTMLElement {
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }
  }

  /* ── amap-link ── */
  class AmapLink extends Base {
    static get observedAttributes() { return ['label']; }
    render() {
      this.innerHTML = `
        <button type="button" class="ds-link">
          <span>${esc(this.attr('label'))}</span>
          <img class="ds-link__icon" src="${assetBase(this)}${ASSETS.chevron}" alt="" width="16" height="18">
        </button>`;
      markMissing(this);
    }
  }

  /* ── amap-ranking-tag ── */
  class AmapRankingTag extends Base {
    static get observedAttributes() { return ['text', 'on-photo']; }
    render() {
      const text = this.attr('text');
      this.innerHTML = `
        <span class="ds-ranking-tag${this.hasAttribute('on-photo') ? ' is-on-photo' : ''}">
          <span class="ds-ranking-tag__plate">
            <img class="ds-ranking-tag__logo" src="${assetBase(this)}${ASSETS.rankingLogo}" alt="扫街榜" width="34" height="12">
          </span>
          ${text ? `<span class="ds-ranking-tag__text">${esc(text)}</span>` : ''}
        </span>`;
      markMissing(this);
    }
  }

  /* ── amap-rank-thumb ── */
  class AmapRankThumb extends Base {
    static get observedAttributes() { return ['rank', 'src']; }
    render() {
      const rank = Number(this.attr('rank', '0'));
      const src = this.attr('src');
      this.innerHTML = `
        <span class="ds-rank-thumb">
          ${src ? `<img class="ds-rank-thumb__photo" src="${esc(src)}" alt="">` : ''}
          ${rank > 0 ? `
            <img class="ds-rank-thumb__badge" src="${assetBase(this)}${ASSETS.rankBadge}" alt="" width="29" height="29">
            <span class="ds-rank-thumb__num" aria-hidden="true">${String(rank).padStart(2, '0')}</span>` : ''}
        </span>`;
      markMissing(this);
    }
  }

  /* ── amap-fav-button ── */
  class AmapFavButton extends Base {
    static get observedAttributes() { return ['pressed', 'label']; }
    get pressed() { return this.hasAttribute('pressed'); }
    set pressed(v) { this.toggleAttribute('pressed', !!v); }
    // 状态变化只更新属性，不重建按钮，保留键盘焦点
    attributeChangedCallback() { if (this.isConnected) this.sync(); }
    sync() {
      const btn = this.querySelector('button');
      if (!btn) return this.render();
      const on = this.pressed;
      const name = this.attr('label');
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', `${on ? '取消收藏' : '收藏'}${name ? ' ' + name : ''}`);
    }
    render() {
      this.innerHTML = `
        <button type="button" class="ds-fav">
          <svg class="ds-fav__icon" width="26" height="25" viewBox="0 0 26 25" aria-hidden="true"><path d="${STAR_PATH}" stroke-width="1.4"/></svg>
        </button>`;
      this.sync();
      this.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        this.pressed = !this.pressed;
        this.dispatchEvent(new CustomEvent('fav-change', { bubbles: true, composed: true, detail: { favorited: this.pressed } }));
      });
    }
  }

  /* ── amap-meta-line ── */
  class AmapMetaLine extends Base {
    static get observedAttributes() { return ['items', 'sep', 'accent-first']; }
    render() {
      let items = [];
      try { items = JSON.parse(this.attr('items', '[]')).filter((t) => t != null && t !== ''); } catch { items = []; }
      const sep = `<span class="ds-meta-line__sep" aria-hidden="true">${esc(this.attr('sep', '|'))}</span>`;
      const accent = this.hasAttribute('accent-first');
      this.innerHTML = `<span class="ds-meta-line">${items
        .map((t, i) => `<span class="ds-meta-line__item${accent && i === 0 ? ' is-accent' : ''}">${esc(t)}</span>`)
        .join(sep)}</span>`;
    }
  }

  /* ── amap-rank-ribbon：TOP 排名飘带，1 金 / 2 银 / 3 铜（Figma 764:3788 及实例） ──
   * 底板与麦穗路径取自 Figma 导出；颜色走 --ds-rank-{tier}-* token，渐变断点按各档原稿 */
  const RIBBON_STOPS = { gold: [0.0192, 0.4808, 1], silver: [0, 0.43, 1], bronze: [0, 0.49, 1] };
  const RIBBON_BG = 'M0 0H49V42.5503C49 44.0537 48.157 45.4301 46.8179 46.1133L26.3179 56.5725C25.176 57.1551 23.824 57.1551 22.6821 56.5725L2.18212 46.1133C0.842968 45.4301 0 44.0537 0 42.5503V0Z';
  const LAUREL_L = [
    'M2.47935 11.3801C3.24524 10.7146 4.24008 10.4463 5.21482 10.6288C6.1696 10.8221 7.04523 11.4659 7.76134 12.4964L8 12.8408L7.68179 13.0984C6.92587 13.6996 6.17956 14 5.45348 14H5.27448C4.24996 13.9248 3.28507 13.2481 2.3998 11.9812L2.16114 11.6377L2.47935 11.3801Z',
    'M0.638862 5.72182C1.6037 5.52857 2.59847 5.79768 3.37432 6.45259C4.13026 7.10751 4.61812 8.12759 4.79716 9.39445L4.85683 9.82379L4.45906 9.88819C4.21039 9.93114 3.95115 9.95259 3.69254 9.95259C3.07605 9.974 2.46941 9.79151 1.94237 9.45885C1.07706 8.87913 0.519623 7.78379 0.300762 6.21646L0.241097 5.78623L0.638862 5.72182Z',
    'M0.479756 0.0429338C2.61829 0.289866 3.89144 2.17915 3.64282 4.73435L3.60304 5.16368L3.20527 5.12075C0.867902 4.8523 -0.236242 3.23139 0.0422147 0.429338L0.0819912 0L0.479756 0.0429338Z',
  ];
  const LAUREL_R = [
    'M34.5206 11.3801C33.7548 10.7146 32.7599 10.4463 31.7852 10.6288C30.8304 10.8221 29.9548 11.4659 29.2387 12.4964L29 12.8408L29.3182 13.0984C30.0741 13.6996 30.8204 14 31.5465 14H31.7255C32.75 13.9248 33.7149 13.2481 34.6002 11.9812L34.8389 11.6377L34.5206 11.3801Z',
    'M36.3611 5.72182C35.3963 5.52857 34.4015 5.79768 33.6257 6.45259C32.8697 7.10751 32.3819 8.12759 32.2028 9.39445L32.1432 9.82379L32.5409 9.88819C32.7896 9.93114 33.0488 9.95259 33.3075 9.95259C33.924 9.974 34.5306 9.79151 35.0576 9.45885C35.9229 8.87913 36.4804 7.78379 36.6992 6.21646L36.7589 5.78623L36.3611 5.72182Z',
    'M36.5202 0.0429338C34.3817 0.289866 33.1086 2.17915 33.3572 4.73435L33.397 5.16368L33.7947 5.12075C36.1321 4.8523 37.2362 3.23139 36.9578 0.429338L36.918 0L36.5202 0.0429338Z',
  ];
  let ribbonUid = 0;
  const tierOf = (rank) => (rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze');

  class AmapRankRibbon extends Base {
    static get observedAttributes() { return ['rank', 'label', 'tier']; }
    render() {
      const rank = Number(this.attr('rank', '1'));
      const tier = ['gold', 'silver', 'bronze'].includes(this.attr('tier')) ? this.attr('tier') : tierOf(rank);
      const id = `ds-rib-${++ribbonUid}`;
      const [o1, o2, o3] = RIBBON_STOPS[tier];
      const v = (k) => `var(--ds-rank-${tier}-${k})`;
      this.innerHTML = `
        <span class="ds-ribbon" data-tier="${tier}" style="color:var(--color-text-medal-${tier})" aria-label="第 ${rank} 名">
          <svg class="ds-ribbon__bg" width="49" height="57" viewBox="0 0 49 57" aria-hidden="true">
            <defs>
              <linearGradient id="${id}-bg" x1="10.5" y1="0" x2="32" y2="52.5" gradientUnits="userSpaceOnUse">
                <stop offset="${o1}" style="stop-color:${v('bg-1')}"/><stop offset="${o2}" style="stop-color:${v('bg-2')}"/><stop offset="${o3}" style="stop-color:${v('bg-3')}"/>
              </linearGradient>
              <filter id="${id}-in" x="0" y="0" width="49" height="57.0095" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2="shape"/>
              </filter>
            </defs>
            <path d="${RIBBON_BG}" fill="url(#${id}-bg)" filter="url(#${id}-in)"/>
          </svg>
          <span class="ds-ribbon__label" aria-hidden="true">${esc(this.attr('label', 'TOP'))}</span>
          <span class="ds-ribbon__num" aria-hidden="true">${String(rank).padStart(2, '0')}</span>
          <svg class="ds-ribbon__laurel" width="37" height="14" viewBox="0 0 37 14" aria-hidden="true">
            <defs>
              <linearGradient id="${id}-l" x1="0.296" y1="-0.086" x2="7.741" y2="13.669" gradientUnits="userSpaceOnUse"><stop style="stop-color:${v('laurel-1')}"/><stop offset="1" style="stop-color:${v('laurel-2')}"/></linearGradient>
              <linearGradient id="${id}-r" x1="36.704" y1="-0.086" x2="29.259" y2="13.669" gradientUnits="userSpaceOnUse"><stop style="stop-color:${v('laurel-1')}"/><stop offset="1" style="stop-color:${v('laurel-2')}"/></linearGradient>
            </defs>
            ${LAUREL_L.map((d) => `<path d="${d}" fill="url(#${id}-l)"/>`).join('')}
            ${LAUREL_R.map((d) => `<path d="${d}" fill="url(#${id}-r)"/>`).join('')}
          </svg>
        </span>`;
    }
  }

  /* ── amap-score-badge：评分徽标「4.8 超棒」 ── */
  class AmapScoreBadge extends Base {
    static get observedAttributes() { return ['score', 'label']; }
    render() {
      const label = this.attr('label');
      this.innerHTML = `
        <span class="ds-score">
          <span class="ds-score__solid">
            <img class="ds-score__glow" src="${assetBase(this)}restaurant/score-glow.svg" alt="" width="26" height="10">
            <span class="ds-score__num">${esc(this.attr('score'))}</span>
          </span>
          ${label ? `<span class="ds-score__label">${esc(label)}</span>` : ''}
        </span>`;
    }
  }

  /* ── amap-status-tag：营业状态 ── */
  class AmapStatusTag extends Base {
    static get observedAttributes() { return ['text', 'tone']; }
    render() {
      this.innerHTML = `<span class="ds-status" data-tone="${esc(this.attr('tone', 'open'))}">${esc(this.attr('text', '营业中'))}</span>`;
    }
  }

  /* ── amap-deal-tag：团 / 券 价格条 ── */
  class AmapDealTag extends Base {
    static get observedAttributes() { return ['type', 'price', 'discount']; }
    render() {
      const discount = this.attr('discount');
      // Figma「数字/Small」：￥ 与数字同字号同字重；兼容只传数字的旧写法
      const raw = this.attr('price');
      const price = raw && !/^[￥¥]/.test(raw) ? `￥${raw}` : raw;
      this.innerHTML = `
        <span class="ds-deal">
          <span class="ds-deal__type">${esc(this.attr('type', '团'))}</span>
          <span class="ds-deal__price">${esc(price)}</span>
          ${discount ? `<span class="ds-deal__discount">${esc(discount)}</span>` : ''}
        </span>`;
    }
  }

  /* ── amap-media-pill：压在图片上的深色胶囊（收藏数 / 页码） ── */
  class AmapMediaPill extends Base {
    static get observedAttributes() { return ['text', 'icon', 'muted']; }
    render() {
      const icon = this.attr('icon');
      const muted = this.hasAttribute('muted');
      this.innerHTML = `
        <span class="ds-pill${muted ? ' is-muted' : ''}">
          ${icon === 'star' ? `<span class="ds-pill__icon"><img src="${assetBase(this)}restaurant/icon-star-white.svg" alt="" width="15" height="14"></span>` : ''}
          <span class="ds-pill__text">${esc(this.attr('text'))}</span>
        </span>`;
      markMissing(this);
    }
  }

  /* ── amap-button：主按钮（渐变）/ 次按钮（描边）；可带价格「一键下单 | ¥ 9.9」 ── */
  class AmapButton extends Base {
    static get observedAttributes() { return ['label', 'variant', 'price', 'shape']; }
    render() {
      const variant = ['secondary', 'tonal'].includes(this.attr('variant')) ? this.attr('variant') : 'primary';
      const price = this.attr('price');
      const pill = this.attr('shape') === 'pill' ? ' ds-btn--pill' : '';
      this.innerHTML = `<button type="button" class="ds-btn ds-btn--${variant}${pill}">
        <span>${esc(this.attr('label'))}</span>
        ${price ? `<span class="ds-btn__divider" aria-hidden="true"></span><span class="ds-btn__price"><span class="ds-btn__currency">¥ </span>${esc(price)}</span>` : ''}
      </button>`;
    }
  }

  /* ── amap-tag：小标签，tone = neutral（灰底信息）| tenure（收录 N 年）| promo（商品促销） ── */
  class AmapTag extends Base {
    static get observedAttributes() { return ['text', 'tone', 'size']; }
    render() {
      const tone = ['neutral', 'tenure', 'area', 'promo', 'outline', 'danger', 'success', 'deal'].includes(this.attr('tone')) ? this.attr('tone') : 'neutral';
      const size = ['m', 'l'].includes(this.attr('size')) ? this.attr('size') : 's';
      this.innerHTML = `<span class="ds-tag" data-tone="${tone}" data-size="${size}">${esc(this.attr('text'))}</span>`;
    }
  }

  /* ── amap-quick-order：一键下单卡片（Figma 769:8974） ──
   * 属性 image title tag spec note price action-label swap-label
   * 事件 order-buy / order-swap */
  class AmapQuickOrder extends Base {
    static get observedAttributes() { return ['image', 'title', 'tag', 'spec', 'note', 'price', 'action-label', 'swap-label']; }
    render() {
      const a = (n, d) => this.attr(n, d);
      this.innerHTML = `
        <div class="ds-order">
          <div class="ds-order__item">
            <span class="ds-order__thumb">${a('image') ? `<img src="${esc(a('image'))}" alt="">` : ''}</span>
            <span class="ds-order__info">
              <span class="ds-order__head">
                <span class="ds-order__title">${esc(a('title'))}</span>
                ${a('tag') ? `<amap-tag tone="promo" text="${esc(a('tag'))}"></amap-tag>` : ''}
              </span>
              <span class="ds-order__desc">${esc(a('spec'))}${a('spec') && a('note') && !/^[｜|]/.test(a('note')) ? ' | ' : ''}${esc(a('note'))}</span>
            </span>
          </div>
          <div class="ds-order__actions">
            <amap-button class="ds-order__buy" label="${esc(a('action-label', '一键下单'))}" price="${esc(a('price'))}"></amap-button>
            <amap-button class="ds-order__swap" variant="secondary" label="${esc(a('swap-label', '换一杯'))}"></amap-button>
          </div>
        </div>`;
      markMissing(this);
      const fire = (t) => this.dispatchEvent(new CustomEvent(t, { bubbles: true, composed: true }));
      this.querySelector('.ds-order__buy').addEventListener('click', () => fire('order-buy'));
      this.querySelector('.ds-order__swap').addEventListener('click', () => fire('order-swap'));
    }
  }

  /* ── amap-hot-review：热评条（火焰 + 评论 + N 人在说 >） ── */
  class AmapHotReview extends Base {
    static get observedAttributes() { return ['text', 'count']; }
    render() {
      const base = assetBase(this);
      const count = this.attr('count');
      this.innerHTML = `
        <button type="button" class="ds-hot">
          <img class="ds-hot__icon" src="${base}restaurant/icon-fire.svg" alt="" width="16" height="16">
          <span class="ds-hot__text">${esc(this.attr('text'))}</span>
          ${count ? `<span class="ds-hot__count">${esc(count)}<img class="ds-hot__chevron" src="${base}${ASSETS.chevron}" alt="" width="16" height="18"></span>` : ''}
        </button>`;
      markMissing(this);
    }
  }

  const defs = {
    'amap-link': AmapLink,
    'amap-ranking-tag': AmapRankingTag,
    'amap-rank-thumb': AmapRankThumb,
    'amap-fav-button': AmapFavButton,
    'amap-meta-line': AmapMetaLine,
    'amap-rank-ribbon': AmapRankRibbon,
    'amap-score-badge': AmapScoreBadge,
    'amap-status-tag': AmapStatusTag,
    'amap-deal-tag': AmapDealTag,
    'amap-media-pill': AmapMediaPill,
    'amap-button': AmapButton,
    'amap-hot-review': AmapHotReview,
    'amap-tag': AmapTag,
    'amap-quick-order': AmapQuickOrder,
  };
  for (const [tag, cls] of Object.entries(defs)) if (!customElements.get(tag)) customElements.define(tag, cls);

  window.AmapDS = Object.assign(window.AmapDS || {}, { esc, assetBase, markMissing });
})();
