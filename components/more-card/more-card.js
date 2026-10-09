/**
 * <amap-more-card> · 横向列表末尾的「查看更多」卡
 * Figma 765:5691「查看更多」/ 765:6006「查看其他榜单」/ 765:4869「查看完整扫街榜」，共 10 个实例
 * 三个 component 只有文案与高度不同，合为一个组件；高度随所在行撑满
 *
 * 属性
 *   label   文案，默认「查看更多」；可用换行（属性里写 &#10;，或 el.setAttribute('label', '看完整\n扫街榜')）
 *
 * 事件（bubbles + composed）
 *   more-select → { label }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CHEVRON = '<svg viewBox="0 0 7 13" fill="currentColor" aria-hidden="true"><path d="M7 6.5C7 6.68486 6.93166 6.86957 6.79497 7.0106L1.19494 12.7885C0.92157 13.0705 0.478551 13.0705 0.205029 12.7885C-0.0683428 12.5064 -0.0683428 12.0493 0.205029 11.7671L5.31003 6.5L0.20518 1.23289C-0.0681915 0.950835 -0.0681915 0.493748 0.20518 0.211539C0.478551 -0.0705131 0.92157 -0.0705131 1.19509 0.211539L6.79512 5.9894C6.93166 6.13043 7 6.31514 7 6.5Z"/></svg>';

  class AmapMoreCard extends HTMLElement {
    static get observedAttributes() { return ['label']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }

    render() {
      const label = this.getAttribute('label') ?? '查看更多';
      this.innerHTML = `
        <button type="button" class="amap-more" aria-label="${esc(label.replace(/\s+/g, ''))}">
          <span class="amap-more__icon">${CHEVRON}</span>
          <span class="amap-more__label">${esc(label)}</span>
        </button>`;
      this.querySelector('.amap-more').addEventListener('click', () =>
        this.dispatchEvent(new CustomEvent('more-select', { bubbles: true, composed: true, detail: { label } })));
    }
  }

  if (!customElements.get('amap-more-card')) customElements.define('amap-more-card', AmapMoreCard);
})();
