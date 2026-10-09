/**
 * <amap-nearby-list> · 附近 POI 列表（Figma 765:5256「附近景点POI」，实例 765:5259 / 765:5757 / 765:7054）
 * 依赖 components/primitives/primitives.js（amap-meta-line）与 primitives.css（ds-link 样式）
 *
 * 属性
 *   items         JSON 数组或 el.items = [...]；每项 { name, distance, details: [], image }
 *                 说明行为「距离（棕色）｜details…」，如 ["免费", "22:00 关"]
 *   detail-label  右侧入口文案，默认「查看详情」
 *   asset-base    素材目录（全局箭头）
 *
 * 事件（bubbles + composed）
 *   nearby-select → { index, item }   点击整行（含「查看详情」）
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';

  class AmapNearbyList extends HTMLElement {
    static get observedAttributes() { return ['items', 'detail-label', 'asset-base']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }

    get items() {
      if (this._items) return this._items;
      try { return JSON.parse(this.getAttribute('items') || '[]'); } catch { return []; }
    }
    set items(v) { this._items = Array.isArray(v) ? v : []; if (this.isConnected) this.render(); }

    render() {
      const items = this.items;
      const label = this.getAttribute('detail-label') ?? '查看详情';
      const base = this.closest('[asset-base]')?.getAttribute('asset-base') ?? '../../assets/';

      this.innerHTML = `
        <ul class="amap-nearby">
          ${items.map((it, i) => `
            <li class="amap-nearby__item">
              <button type="button" class="amap-nearby__row" data-index="${i}" aria-label="${esc(it.name)}，${esc(label)}">
                <span class="amap-nearby__media">
                  ${has(it.image) ? `<img class="amap-nearby__photo" src="${esc(it.image)}" alt="">` : ''}
                </span>
                <span class="amap-nearby__text">
                  <span class="amap-nearby__name">${esc(it.name)}</span>
                  <amap-meta-line class="amap-nearby__meta" sep="｜" ${has(it.distance) ? 'accent-first' : ''}
                    items="${esc(JSON.stringify([it.distance, ...(it.details || [])].filter(has)))}"></amap-meta-line>
                </span>
                <span class="ds-link amap-nearby__detail" aria-hidden="true">
                  <span>${esc(label)}</span>
                  <img class="ds-link__icon" src="${esc(base)}icon-chevron-right.svg" alt="" width="16" height="18">
                </span>
              </button>
            </li>`).join('')}
        </ul>`;

      this.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.classList.add('is-missing'), { once: true }));
      this.querySelectorAll('.amap-nearby__row').forEach((btn) => btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        this.dispatchEvent(new CustomEvent('nearby-select', { bubbles: true, composed: true, detail: { index, item: items[index] } }));
      }));
    }
  }

  if (!customElements.get('amap-nearby-list')) customElements.define('amap-nearby-list', AmapNearbyList);
})();
