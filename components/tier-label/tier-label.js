/**
 * <amap-tier-label text> · 模块内的分档小标题（Figma 765:5257）
 * 蓝色渐变方块 + 白色星芒（assets/page/sparkle-tile.svg）+ 14 Medium 文案，左右边距 18
 * 用在「还能待多久」里区分「还有 20 分钟」/「有 1 小时以上」
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  class AmapTierLabel extends HTMLElement {
    static get observedAttributes() { return ['text']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const base = this.closest('[asset-base]')?.getAttribute('asset-base') ?? '../../assets/';
      this.innerHTML = `<img src="${esc(base)}page/sparkle-tile.svg" alt=""><span>${esc(this.getAttribute('text') ?? '')}</span>`;
    }
  }
  if (!customElements.get('amap-tier-label')) customElements.define('amap-tier-label', AmapTierLabel);
})();
