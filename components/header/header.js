/**
 * <amap-arrival-header> · 到达头部卡（Figma 981:3041）
 *
 * 变体（variant）
 *   regular  常规到达（默认）  Figma 981:3018
 *   taxi     打车到达          Figma 981:3039
 *
 * 通用属性
 *   heading      标题，默认「已到达」
 *   address      地址
 *   trip-label   行程回溯文案，默认「行程回溯」
 *   asset-base   素材目录；不传时读最近祖先的 asset-base，默认 ../../assets/
 *
 * regular 专属
 *   energy       绿色能量克数；不传则隐藏
 *
 * taxi 专属
 *   place        上车/到达点名称（地址行第一段），如「中贸广场 B 座」
 *   provider     运力名称，如「享道-经济型」
 *   driver       司机与车牌，如「何师傅·陕 AA01306」
 *
 * 依赖 components/primitives/primitives.js（「行程回溯」使用 amap-link）
 *
 * 事件
 *   trip-replay  点击「行程回溯」时派发（bubbles, composed）
 */
const ASSETS = {
  regular: { thumb: 'header-map-thumb.png', w: 212, h: 72 },
  taxi: { thumb: 'header-map-thumb-taxi.png', w: 319, h: 84 },
  eco: 'icon-green-energy.svg',
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const has = (v) => v != null && v !== '';

class AmapArrivalHeader extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'heading', 'address', 'energy', 'trip-label', 'asset-base', 'place', 'provider', 'driver'];
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  attr(name, fallback = '') { return this.getAttribute(name) ?? fallback; }

  tripButton() {
    return `<amap-link class="amap-header__trip" label="${esc(this.attr('trip-label', '行程回溯'))}"></amap-link>`;
  }

  regularMeta(base) {
    const energy = this.getAttribute('energy');
    const eco = has(energy) ? `
      <div class="amap-header__eco">
        <img class="amap-header__eco-icon" src="${base}${ASSETS.eco}" alt="" width="18" height="17">
        <span class="amap-header__eco-label">收获 ${esc(energy)}g 绿色能量</span>
      </div>` : '';
    const address = this.attr('address');
    return `
      <p class="amap-header__address" title="${esc(address)}">${esc(address)}</p>
      <div class="amap-header__actions">${eco}${this.tripButton()}</div>`;
  }

  taxiMeta(base) {
    const place = this.attr('place');
    const address = this.attr('address');
    const provider = this.attr('provider');
    const driver = this.attr('driver');
    const dot = '<span class="amap-header__dot" aria-hidden="true">·</span>';

    const addressParts = [place, address].filter(has).map((t) => `<span class="amap-header__seg">${esc(t)}</span>`);
    const full = [place, address].filter(has).join(' · ');

    const ride = has(provider) || has(driver) ? `
      <span class="amap-header__ride">
        ${has(provider) ? `<span class="amap-header__provider">${esc(provider)}</span>` : ''}${has(provider) && has(driver) ? '｜' : ''}${esc(driver)}
      </span>${dot}` : '';

    return `
      <p class="amap-header__line amap-header__line--address" title="${esc(full)}">${addressParts.join(dot)}</p>
      <div class="amap-header__line">${ride}${this.tripButton()}</div>`;
  }

  render() {
    const variant = this.attr('variant', 'regular') === 'taxi' ? 'taxi' : 'regular';
    const base = this.getAttribute('asset-base') ?? this.closest('[asset-base]')?.getAttribute('asset-base') ?? '../../assets/';
    const heading = this.attr('heading', '已到达');
    const thumb = ASSETS[variant];

    this.innerHTML = `
      <section class="amap-header amap-header--${variant}" aria-label="${esc(heading)}">
        <img class="amap-header__thumb" src="${base}${thumb.thumb}" alt="" width="${thumb.w}" height="${thumb.h}">
        <div class="amap-header__content">
          <h1 class="amap-header__title">${esc(heading)}</h1>
          <div class="amap-header__meta">
            ${variant === 'taxi' ? this.taxiMeta(base) : this.regularMeta(base)}
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
