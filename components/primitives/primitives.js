/**
 * 基础组件（primitives）· 被 Header / POI 卡片等复合组件共用，也可单独使用。
 * 需在复合组件之前加载。
 *
 *   <amap-link label="完整榜单">              文字 + 全局箭头，点击派发原生 click
 *   <amap-ranking-tag text="精选 13 个热门店铺"> 扫街榜标签（底板 + logo + 文案）
 *   <amap-rank-thumb rank="1" src="…">         方形图片 + 左上排名角标
 *   <amap-fav-button pressed label="店名">     收藏星标，切换后派发 fav-change { favorited }
 *   <amap-meta-line sep="|" items='[…]' accent-first>  分隔符串联的一行说明，首段可强调（距离）
 *   <amap-rank-ribbon rank="1">               TOP 排名飘带
 *   <amap-score-badge score="4.8" label="超棒"> 评分徽标
 *   <amap-status-tag text="营业中">            营业状态
 *   <amap-deal-tag type="团" price="98" discount="5.6折">  团购 / 代金券价格条
 *   <amap-media-pill text="1/12" [icon="star"] [muted]>    压在图片上的深色胶囊
 *   <amap-button label="看团购" variant="primary|secondary">  按钮，原生 click
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
    static get observedAttributes() { return ['text']; }
    render() {
      const text = this.attr('text');
      this.innerHTML = `
        <span class="ds-ranking-tag">
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

  /* ── amap-rank-ribbon：TOP 排名飘带 ── */
  class AmapRankRibbon extends Base {
    static get observedAttributes() { return ['rank', 'label']; }
    render() {
      const base = assetBase(this);
      const rank = Number(this.attr('rank', '1'));
      this.innerHTML = `
        <span class="ds-ribbon" aria-label="第 ${rank} 名">
          <img class="ds-ribbon__bg" src="${base}restaurant/ribbon-bg.svg" alt="" width="49" height="57">
          <span class="ds-ribbon__label" aria-hidden="true">${esc(this.attr('label', 'TOP'))}</span>
          <span class="ds-ribbon__num" aria-hidden="true">${String(rank).padStart(2, '0')}</span>
          <img class="ds-ribbon__laurel" src="${base}restaurant/laurel.svg" alt="" width="37" height="14">
        </span>`;
      markMissing(this);
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
      this.innerHTML = `
        <span class="ds-deal">
          <span class="ds-deal__type">${esc(this.attr('type', '团'))}</span>
          <span class="ds-deal__price"><span class="ds-deal__currency">￥</span>${esc(this.attr('price'))}</span>
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

  /* ── amap-button：主按钮（渐变）/ 次按钮（描边） ── */
  class AmapButton extends Base {
    static get observedAttributes() { return ['label', 'variant']; }
    render() {
      const variant = this.attr('variant', 'primary') === 'secondary' ? 'secondary' : 'primary';
      this.innerHTML = `<button type="button" class="ds-btn ds-btn--${variant}">${esc(this.attr('label'))}</button>`;
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
  };
  for (const [tag, cls] of Object.entries(defs)) if (!customElements.get(tag)) customElements.define(tag, cls);

  window.AmapDS = Object.assign(window.AmapDS || {}, { esc, assetBase, markMissing });
})();
