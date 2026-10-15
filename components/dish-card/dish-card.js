/**
 * <amap-dish-card> · 必吃榜菜品卡（Figma 979:2811「必吃榜/菜品卡」，状态：默认 / 按下 / 加载中）
 * 不依赖 primitives，可单独使用；通常横向排列在「当地特色菜」列表中（卡片间距 8）
 *
 * 属性
 *   name          菜名，超长省略
 *   rank          排名数字 → 「必吃·第 N 名」；不传则不显示此行
 *   honor-label   荣誉前缀，默认「必吃」
 *   honor         整行自定义文案，传了就覆盖 honor-label + rank
 *   stores        入选店铺文案，如「91家店入选」
 *   image         菜品图（84×84，建议 @3x）
 *   loading       布尔，加载中：菜品图与三行文字显示 surface/sunken 骨架（Figma 状态「加载中」）
 *   按下态（Figma 状态「按下」）由 :active 自动呈现：菜品图上叠 alpha/black-12 遮罩
 *
 * 事件（bubbles + composed）
 *   dish-select → { name, rank }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';

  class AmapDishCard extends HTMLElement {
    static get observedAttributes() { return ['name', 'rank', 'honor-label', 'honor', 'stores', 'image', 'loading']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      if (this.hasAttribute('loading')) {
        this.innerHTML = `
          <span class="amap-dish is-loading" role="status" aria-label="加载中">
            <span class="amap-dish__media"></span>
            <span class="amap-dish__text">
              <span class="amap-dish__bone" style="--bone-w:56px;--bone-h:14px"></span>
              <span class="amap-dish__bone" style="--bone-w:64px;--bone-h:12px"></span>
              <span class="amap-dish__bone" style="--bone-w:48px;--bone-h:12px"></span>
            </span>
          </span>`;
        return;
      }
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
