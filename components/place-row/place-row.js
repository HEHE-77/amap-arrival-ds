/**
 * <amap-place-row> · 收藏地点行卡（Figma 766:8580「收藏」，实例 766:8581 / 766:8596）
 * 依赖 components/primitives/primitives.js（amap-meta-line、amap-button variant="tonal"）
 * 通常放在 <amap-section heading="你的收藏就在附近"> 中纵向排列
 *
 * 属性
 *   name          名称，超长省略
 *   distance      距离（棕色），如「369 米」
 *   details       JSON 数组，「·」串联，如 ["4.8 分", "酒吧"]
 *   image         图片（56×56，建议 @3x）
 *   action-label  右侧浅底按钮，默认「导航过去」；传空字符串则隐藏
 *
 * 事件（bubbles + composed）
 *   place-select → { name }    点击图片 / 文字区
 *   place-action → { name, label }  点击右侧按钮
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';

  class AmapPlaceRow extends HTMLElement {
    static get observedAttributes() { return ['name', 'distance', 'details', 'image', 'action-label']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      let details = [];
      try { details = JSON.parse(a('details', '[]')); } catch { details = []; }
      const meta = [a('distance'), ...details].filter(has);
      const label = a('action-label', '导航过去');

      this.innerHTML = `
        <article class="amap-prow">
          <button type="button" class="amap-prow__main">
            <span class="amap-prow__media">${has(a('image')) ? `<img class="amap-prow__photo" src="${esc(a('image'))}" alt="">` : ''}</span>
            <span class="amap-prow__text">
              <span class="amap-prow__name">${esc(a('name'))}</span>
              ${meta.length ? `<amap-meta-line class="amap-prow__meta" sep="·" ${has(a('distance')) ? 'accent-first' : ''} items="${esc(JSON.stringify(meta))}"></amap-meta-line>` : ''}
            </span>
          </button>
          ${has(label) ? `<amap-button class="amap-prow__action" variant="tonal" label="${esc(label)}"></amap-button>` : ''}
        </article>`;

      this.querySelector('.amap-prow__photo')?.addEventListener('error', (e) => e.target.classList.add('is-missing'), { once: true });
      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      this.querySelector('.amap-prow__main').addEventListener('click', () => fire('place-select', { name: a('name') }));
      this.querySelector('.amap-prow__action')?.addEventListener('click', () => fire('place-action', { name: a('name'), label }));
    }
  }

  if (!customElements.get('amap-place-row')) customElements.define('amap-place-row', AmapPlaceRow);
})();
