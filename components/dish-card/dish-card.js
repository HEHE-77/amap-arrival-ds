/**
 * <amap-dish-card> · 当地特色菜单品卡（Figma 765:6257「本地菜」，实例 765:6258–765:6306）
 * 不依赖 primitives，可单独使用；通常横向排列在「当地特色菜」列表中（卡片间距 8）
 *
 * 属性
 *   name          菜名，超长省略
 *   rank          排名数字 → 「必吃·第 N 名」；不传则不显示此行
 *   honor-label   荣誉前缀，默认「必吃」
 *   honor         整行自定义文案，传了就覆盖 honor-label + rank
 *   stores        入选店铺文案，如「91家店入选」
 *   image         菜品图（84×84，建议 @3x）
 *
 * 事件（bubbles + composed）
 *   dish-select → { name, rank }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';

  class AmapDishCard extends HTMLElement {
    static get observedAttributes() { return ['name', 'rank', 'honor-label', 'honor', 'stores', 'image']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      const honor = has(a('honor')) ? a('honor')
        : has(a('rank')) ? `${a('honor-label', '必吃')}·第${a('rank')}名` : '';

      this.innerHTML = `
        <button type="button" class="amap-dish">
          <span class="amap-dish__media">
            ${has(a('image')) ? `<img class="amap-dish__photo" src="${esc(a('image'))}" alt="">` : ''}
          </span>
          <span class="amap-dish__text">
            <span class="amap-dish__name">${esc(a('name'))}</span>
            ${honor ? `<span class="amap-dish__honor">${esc(honor)}</span>` : ''}
            ${has(a('stores')) ? `<span class="amap-dish__stores">${esc(a('stores'))}</span>` : ''}
          </span>
        </button>`;

      this.querySelector('.amap-dish__photo')?.addEventListener('error', (e) => e.target.classList.add('is-missing'), { once: true });
      this.querySelector('.amap-dish').addEventListener('click', () =>
        this.dispatchEvent(new CustomEvent('dish-select', { bubbles: true, composed: true, detail: { name: a('name'), rank: a('rank') } })));
    }
  }

  if (!customElements.get('amap-dish-card')) customElements.define('amap-dish-card', AmapDishCard);
})();
