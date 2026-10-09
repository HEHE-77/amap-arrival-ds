/**
 * <amap-poi-card> · POI 榜单卡片（Figma 853:4824 poi/secondary）
 *
 * 属性
 *   variant      目前只有 secondary（默认）
 *   heading      榜单标题，如「藏在街巷的烟火气」
 *   count        精选店铺数，生成「精选 N 个热门店铺」；不传则只显示扫街榜标识
 *   more-label   右上入口文案，默认「完整榜单」
 *   asset-base   素材目录，默认 ../../assets/
 *   items        JSON 数组（也可直接设置 el.items = [...]）
 *
 * item 字段
 *   name       店名（超长省略）
 *   distance   距离文案，如「距您 250 米」
 *   price      人均文案，如「人均 ¥18」
 *   image      店铺图片 URL；缺失时显示占位底色
 *   favorited  是否已收藏（布尔）
 *
 * 事件（均 bubbles + composed）
 *   poi-more      点击「完整榜单」
 *   poi-select    点击某一行 → detail: { index, item }
 *   poi-favorite  点击收藏 → detail: { index, item, favorited }（组件内已切换状态）
 */
(() => {
  const ASSETS = {
    watermark: 'poi/poi-watermark.svg',
    logo: 'poi/saojiebang-logo.png', // Figma 中为位图，按 @3x 导出
    chevron: 'icon-chevron-right.svg',
    rank: 'poi/rank-badge.svg', // 各名次共用
  };

  // 星标：路径取自 Figma 853:4854 导出的 SVG，内联以便用 token 控制描边/填充（收藏态）
  const STAR = '<svg class="amap-poi__fav-icon" width="26" height="25" viewBox="0 0 26 25" aria-hidden="true">'
    + '<path d="M12.2148 2.83594C12.5585 2.22247 13.4415 2.22247 13.7852 2.83594L16.0371 6.8584C16.3751 7.46221 16.9668 7.88199 17.6484 8.00098L22.2197 8.79883C22.9366 8.92396 23.2162 9.80427 22.7031 10.3203L19.5674 13.4746C19.0599 13.9852 18.8205 14.7041 18.9209 15.417L19.5381 19.8008C19.6375 20.5067 18.9155 21.0427 18.2686 20.7432L13.9668 18.751C13.3538 18.4672 12.6462 18.4672 12.0332 18.751L7.73145 20.7432C7.0845 21.0427 6.36251 20.5067 6.46191 19.8008L7.0791 15.417C7.17948 14.7041 6.94012 13.9852 6.43262 13.4746L3.29688 10.3203C2.78381 9.80427 3.06342 8.92396 3.78027 8.79883L8.35156 8.00098C9.03322 7.88199 9.62492 7.46221 9.96289 6.8584L12.2148 2.83594Z" stroke-width="1.4"/>'
    + '</svg>';

  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const pad2 = (n) => String(n).padStart(2, '0');

  class AmapPoiCard extends HTMLElement {
    static get observedAttributes() {
      return ['variant', 'heading', 'count', 'more-label', 'asset-base', 'items'];
    }

    constructor() {
      super();
      this._items = [];
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

    rowHTML(item, i, base) {
      const rank = i + 1;
      const fav = !!item.favorited;
      const metaParts = [
        has(item.distance) ? `<span class="amap-poi__distance">${esc(item.distance)}</span>` : '',
        has(item.distance) && has(item.price) ? '<span aria-hidden="true">|</span>' : '',
        has(item.price) ? `<span>${esc(item.price)}</span>` : '',
      ].join('');
      return `
        <li class="amap-poi__item" data-index="${i}">
          <button type="button" class="amap-poi__row" aria-label="第 ${rank} 名 ${esc(item.name)}">
            <span class="amap-poi__thumb">
              ${has(item.image) ? `<img class="amap-poi__photo" src="${esc(item.image)}" alt="">` : ''}
              <img class="amap-poi__rank-bg" src="${base}${ASSETS.rank}" alt="" width="29" height="29">
              <span class="amap-poi__rank" aria-hidden="true">${pad2(rank)}</span>
            </span>
            <span class="amap-poi__info">
              <span class="amap-poi__name">${esc(item.name)}</span>
              <span class="amap-poi__meta">${metaParts}</span>
            </span>
          </button>
          <button type="button" class="amap-poi__fav" aria-pressed="${fav}" aria-label="${fav ? '取消收藏' : '收藏'} ${esc(item.name)}">
            ${STAR}
          </button>
        </li>`;
    }

    render() {
      const base = this.attr('asset-base', '../../assets/');
      const heading = this.attr('heading');
      const count = this.getAttribute('count');
      const more = this.attr('more-label', '完整榜单');

      this.innerHTML = `
        <section class="amap-poi amap-poi--secondary" aria-label="${esc(heading)}">
          <div class="amap-poi__head">
            <h2 class="amap-poi__title">${esc(heading)}</h2>
            <img class="amap-poi__watermark" src="${base}${ASSETS.watermark}" alt="" width="73" height="61">
            <div class="amap-poi__sub">
              <span class="amap-poi__tag">
                <span class="amap-poi__tag-plate">
                  <img class="amap-poi__tag-logo" src="${base}${ASSETS.logo}" alt="扫街榜" width="34" height="12">
                </span>
                ${has(count) ? `<span class="amap-poi__tag-text">精选 ${esc(count)} 个热门店铺</span>` : ''}
              </span>
              <button type="button" class="amap-poi__more">
                <span>${esc(more)}</span>
                <img class="amap-poi__more-icon" src="${base}${ASSETS.chevron}" alt="" width="16" height="18">
              </button>
            </div>
          </div>
          <ol class="amap-poi__list">
            ${this._items.map((it, i) => this.rowHTML(it, i, base)).join('')}
          </ol>
        </section>`;

      this.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => img.classList.add('is-missing'), { once: true });
      });

      const fire = (type, detail) =>
        this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));

      this.querySelector('.amap-poi__more').addEventListener('click', () => fire('poi-more'));

      this.querySelectorAll('.amap-poi__item').forEach((li) => {
        const index = Number(li.dataset.index);
        li.querySelector('.amap-poi__row').addEventListener('click', () =>
          fire('poi-select', { index, item: this._items[index] }));

        const favBtn = li.querySelector('.amap-poi__fav');
        favBtn.addEventListener('click', () => {
          const item = this._items[index];
          item.favorited = !item.favorited;
          favBtn.setAttribute('aria-pressed', String(item.favorited));
          favBtn.setAttribute('aria-label', `${item.favorited ? '取消收藏' : '收藏'} ${item.name}`);
          fire('poi-favorite', { index, item, favorited: item.favorited });
        });
      });
    }
  }

  if (!customElements.get('amap-poi-card')) {
    customElements.define('amap-poi-card', AmapPoiCard);
  }
})();
