/**
 * <amap-arrival-header> · 到达页 Header（Figma 849:2976）
 *
 * 属性
 *   heading      标题，默认「已到达」
 *   address      地址行（超长省略）
 *   energy       绿色能量克数；不传则隐藏该项
 *   trip-label   行程回溯文案，默认「行程回溯」
 *   asset-base   素材目录，默认 ../../assets/
 *
 * 事件
 *   trip-replay  点击「行程回溯」时派发（bubbles, composed）
 */
const TEMPLATE_ASSETS = {
  thumb: 'header-map-thumb.png',
  eco: 'icon-green-energy.png',
  chevron: 'icon-arrow-right.png',
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

class AmapArrivalHeader extends HTMLElement {
  static get observedAttributes() {
    return ['heading', 'address', 'energy', 'trip-label', 'asset-base'];
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const base = this.getAttribute('asset-base') ?? '../../assets/';
    const heading = this.getAttribute('heading') ?? '已到达';
    const address = this.getAttribute('address') ?? '';
    const energy = this.getAttribute('energy');
    const tripLabel = this.getAttribute('trip-label') ?? '行程回溯';

    const eco = energy == null || energy === '' ? '' : `
      <div class="amap-header__eco">
        <img class="amap-header__eco-icon" src="${base}${TEMPLATE_ASSETS.eco}" alt="" width="18" height="17">
        <span class="amap-header__eco-label">收获 ${esc(energy)}g 绿色能量</span>
      </div>`;

    this.innerHTML = `
      <section class="amap-header" aria-label="${esc(heading)}">
        <img class="amap-header__thumb" src="${base}${TEMPLATE_ASSETS.thumb}" alt="" width="216" height="216">
        <div class="amap-header__content">
          <h1 class="amap-header__title">${esc(heading)}</h1>
          <div class="amap-header__meta">
            <p class="amap-header__address" title="${esc(address)}">${esc(address)}</p>
            <div class="amap-header__actions">
              ${eco}
              <button type="button" class="amap-header__trip">
                <span>${esc(tripLabel)}</span>
                <img class="amap-header__chevron" src="${base}${TEMPLATE_ASSETS.chevron}" alt="" width="17" height="17">
              </button>
            </div>
          </div>
        </div>
      </section>`;

    this.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', () => img.classList.add('is-missing'), { once: true });
    });
    this.querySelector('.amap-header__trip').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('trip-replay', { bubbles: true, composed: true }));
    });
  }
}

if (!customElements.get('amap-arrival-header')) {
  customElements.define('amap-arrival-header', AmapArrivalHeader);
}
