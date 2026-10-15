/**
 * <amap-poi-card> · 扫街榜分榜卡片（Figma 970:2596「扫街榜分榜卡片」）
 * 依赖 components/primitives/primitives.js（需先加载）
 *
 * 属性
 *   theme        主题背景（Figma 9 个主题，只影响卡头底色 / 徽标 / 高光，即 rank-theme/* 变量）：
 *                  smoky 烟火小店（默认）| quality 品质甄选 | destination 专程前往 | hotel 酒店 | local 本地人爱去
 *                  | tea 下午茶 | relax 休闲按摩 | new 近期新开 | slow 慢饮时光
 *                也可写中文主题名；旧色名 orange | blue | green | indigo | pink | amber | purple | red | lime 继续兼容
 *   heading      榜单标题，超长省略（不压水印）
 *   subtitle     扫街榜标签文案，如「精选10家热门酒店」；不传只显示扫街榜标识
 *   count        （兼容）不传 subtitle 时生成「精选 N 个热门店铺」
 *   more-label   右上入口文案，默认「完整榜单」
 *   asset-base   素材目录，默认 ../../assets/（子组件自动继承）
 *   items        JSON 数组，或 el.items = [...]
 *
 * item 字段
 *   name       店名（超长省略）
 *   distance   距离文案，强调色显示，如「距您 250 米」
 *   details    其余说明，数组，用「|」串联，如 ['人均 ¥328', '4.9分']、['游客少']
 *   image      店铺图片 URL；缺失时显示占位底色
 *   favorited  是否已收藏
 *
 * 事件（bubbles + composed）
 *   poi-more      点击「完整榜单」
 *   poi-select    点击一行 → { index, item }
 *   poi-favorite  切换收藏 → { index, item, favorited }
 *
 * 组成：amap-ranking-tag · amap-link · amap-rank-thumb · amap-meta-line · amap-fav-button
 */
(() => {
  // Figma「扫街榜分榜卡片/主题背景」9 个主题；旧色名与中文名映射到同一主题
  const THEMES = ['smoky', 'quality', 'destination', 'hotel', 'local', 'tea', 'relax', 'new', 'slow'];
  const THEME_ALIAS = {
    orange: 'smoky', blue: 'quality', green: 'destination', indigo: 'hotel', pink: 'local',
    amber: 'tea', purple: 'relax', red: 'new', lime: 'slow',
    烟火小店: 'smoky', 品质甄选: 'quality', 专程前往: 'destination', 酒店: 'hotel', 本地人爱去: 'local',
    下午茶: 'tea', 休闲按摩: 'relax', 近期新开: 'new', 慢饮时光: 'slow',
  };
  const themeOf = (v) => (THEMES.includes(v) ? v : THEME_ALIAS[v] ?? 'smoky');
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  let uid = 0;

  // 水印：路径取自 Figma 853:4827 导出的 SVG；六边形与箭头颜色由主题变量控制
  const watermark = (id) => `
    <svg class="amap-poi__watermark" width="73" height="61" viewBox="0 0 73 61" aria-hidden="true">
      <path class="wm-shape" d="M35.0526 -8.60203C35.954 -9.0988 37.0471 -9.0988 37.9485 -8.60203L66.5585 7.16511C67.5159 7.69273 68.1105 8.69936 68.1105 9.79252V41.0892C68.1105 42.1824 67.5159 43.189 66.5585 43.7167L37.9485 59.4838C37.0471 59.9806 35.954 59.9806 35.0526 59.4838L6.44263 43.7167C5.48524 43.189 4.89062 42.1824 4.89062 41.0892V9.79252C4.89062 8.69936 5.48524 7.69273 6.44263 7.16511L35.0526 -8.60203Z"/>
      <path d="M6.87675 38.1949L49.5886 12.4629L56.0012 21.3424L13.2893 47.0744L6.87675 38.1949Z" fill="url(#${id})"/>
      <path d="M25.7886 13.1364L61.5423 11.3988L45.9883 41.1069L25.7886 13.1364Z" fill="url(#${id})"/>
      <defs>
        <linearGradient id="${id}" x1="61.677" y1="11.5852" x2="13.0307" y2="46.7163" gradientUnits="userSpaceOnUse">
          <stop offset="0.645213" style="stop-color: var(--poi-wm-arrow)"/>
          <stop offset="1" stop-color="#FFF4EA" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>`;

  class AmapPoiCard extends HTMLElement {
    static get observedAttributes() {
      return ['variant', 'theme', 'heading', 'subtitle', 'count', 'more-label', 'asset-base', 'items'];
    }

    constructor() {
      super();
      this._items = [];
      this._wmId = `poi-wm-${++uid}`;
    }

    get items() { return this._items; }
    set items(list) {
      this._items = Array.isArray(list) ? list.map((it) => ({ ...it })) : [];
      if (this.isConnected) this.render();
    }

    connectedCallback() { this.render(); }
    attributeChangedCallback(name, _old, value) {
      if (name === 'items') {
        try { this._items = JSON.parse(value || '[]'); } catch { this._items = []; }
      }
      if (this.isConnected) this.render();
    }

    attr(name, fallback = '') { return this.getAttribute(name) ?? fallback; }

    details(item) {
      if (Array.isArray(item.details)) return item.details;
      return has(item.price) ? [item.price] : []; // 兼容旧字段
    }

    rowHTML(item, i) {
      const meta = [item.distance, ...this.details(item)].filter(has);
      return `
        <li class="amap-poi__item" data-index="${i}">
          <button type="button" class="amap-poi__row" aria-label="第 ${i + 1} 名 ${esc(item.name)}">
            <amap-rank-thumb rank="${i + 1}" src="${esc(item.image ?? '')}"></amap-rank-thumb>
            <span class="amap-poi__info">
              <span class="amap-poi__name">${esc(item.name)}</span>
              <amap-meta-line sep="|" ${has(item.distance) ? 'accent-first' : ''} items="${esc(JSON.stringify(meta))}"></amap-meta-line>
            </span>
          </button>
          <amap-fav-button label="${esc(item.name)}" ${item.favorited ? 'pressed' : ''}></amap-fav-button>
        </li>`;
    }

    render() {
      const theme = themeOf(this.attr('theme'));
      const heading = this.attr('heading');
      const count = this.getAttribute('count');
      const subtitle = this.getAttribute('subtitle') ?? (has(count) ? `精选 ${count} 个热门店铺` : '');

      this.innerHTML = `
        <section class="amap-poi amap-poi--secondary" data-theme="${theme}" aria-label="${esc(heading)}">
          <div class="amap-poi__head">
            <h2 class="amap-poi__title">${esc(heading)}</h2>
            ${watermark(this._wmId)}
            <div class="amap-poi__sub">
              <amap-ranking-tag text="${esc(subtitle)}"></amap-ranking-tag>
              <amap-link class="amap-poi__more" label="${esc(this.attr('more-label', '完整榜单'))}"></amap-link>
            </div>
          </div>
          <ol class="amap-poi__list">
            ${this._items.map((it, i) => this.rowHTML(it, i)).join('')}
          </ol>
        </section>`;

      const fire = (type, detail) =>
        this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));

      this.querySelector('.amap-poi__more').addEventListener('click', () => fire('poi-more'));
      this.querySelectorAll('.amap-poi__item').forEach((li) => {
        const index = Number(li.dataset.index);
        li.querySelector('.amap-poi__row').addEventListener('click', () =>
          fire('poi-select', { index, item: this._items[index] }));
        li.querySelector('amap-fav-button').addEventListener('fav-change', (e) => {
          e.stopPropagation();
          this._items[index].favorited = e.detail.favorited;
          fire('poi-favorite', { index, item: this._items[index], favorited: e.detail.favorited });
        });
      });
    }
  }

  if (!customElements.get('amap-poi-card')) customElements.define('amap-poi-card', AmapPoiCard);
})();
