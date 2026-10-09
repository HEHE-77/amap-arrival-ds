/**
 * <amap-transit-list> · 末班车列表（Figma 766:8338「末班车提醒」，实例 766:8339）
 * 通常放在 <amap-section heading="今晚末班车时间" more-label="查看更多"> 中
 *
 * 属性
 *   items   JSON 数组或 el.items = [...]；每项
 *           { line: '2 号线', color: '#C42D2A', title: '钟楼站 · B 口进站',
 *             subtitle: '往 北客站 方向 · 换乘 4 号线', time: '23:10', timeLabel: '末班' }
 *           color 为线路色（数据，非 token）；timeLabel 默认「末班」
 *
 * 事件（bubbles + composed）
 *   transit-select → { index, item }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const safeColor = (c) => (/^#[0-9a-f]{3,8}$|^rgba?\([\d\s.,%]+\)$/i.test(String(c ?? '')) ? c : '');

  class AmapTransitList extends HTMLElement {
    static get observedAttributes() { return ['items']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    get items() {
      if (this._items) return this._items;
      try { return JSON.parse(this.getAttribute('items') || '[]'); } catch { return []; }
    }
    set items(v) { this._items = Array.isArray(v) ? v : []; if (this.isConnected) this.render(); }

    render() {
      const items = this.items;
      this.innerHTML = `
        <ul class="amap-tr">
          ${items.map((it, i) => {
            const color = safeColor(it.color);
            return `
            <li class="amap-tr__item">
              <button type="button" class="amap-tr__row" data-index="${i}">
                <span class="amap-tr__badge"${color ? ` style="--line-color:${color}"` : ''}>${esc(it.line)}</span>
                <span class="amap-tr__text">
                  <span class="amap-tr__title">${esc(it.title)}</span>
                  ${has(it.subtitle) ? `<span class="amap-tr__sub">${esc(it.subtitle)}</span>` : ''}
                </span>
                <span class="amap-tr__time">
                  <span class="amap-tr__clock">${esc(it.time)}</span>
                  <span class="amap-tr__label">${esc(it.timeLabel ?? '末班')}</span>
                </span>
              </button>
            </li>`;
          }).join('')}
        </ul>`;

      this.querySelectorAll('.amap-tr__row').forEach((btn) => btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        this.dispatchEvent(new CustomEvent('transit-select', { bubbles: true, composed: true, detail: { index, item: items[index] } }));
      }));
    }
  }

  if (!customElements.get('amap-transit-list')) customElements.define('amap-transit-list', AmapTransitList);
})();
