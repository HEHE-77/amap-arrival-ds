/**
 * <amap-notice text [sub]> · 到店受阻提示条（暂定样式，Figma 无对应）
 *   text  提示，如「当前等位 42 桌 · 约 90 分钟」
 *   sub   下方灰色补充，如「等位太久？这三家不用等」
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  class AmapNotice extends HTMLElement {
    static get observedAttributes() { return ['text', 'sub']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const sub = this.getAttribute('sub');
      this.setAttribute('role', 'status');
      this.innerHTML = `<div class="amap-notice">${esc(this.getAttribute('text') ?? '')}</div>${sub ? `<p class="amap-notice__sub">${esc(sub)}</p>` : ''}`;
    }
  }
  if (!customElements.get('amap-notice')) customElements.define('amap-notice', AmapNotice);
})();
