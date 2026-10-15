/**
 * <amap-poi-recommend> · POI 推荐卡（Figma 996:4773，168×168）
 * 依赖 components/primitives/primitives.js（扫街榜标签 amap-ranking-tag on-photo）
 *
 * 属性
 *   name        地点名（超长省略）
 *   tag         扫街榜标签文案，如「特色街区」；不传则隐藏
 *   saves       收藏人数文案，如「44.6w+人收藏」
 *   image       图片（原图即可，渐进模糊由组件生成）
 *   tint        底部遮罩主色（取自图片主色），如 #23406D；不传时用 Gradient/Scrim Image
 *   tint-end    渐变底端颜色，不传同 tint
 *   fav-label   收藏按钮文案，默认「收藏」
 *   favorited   收藏态（星标填充 --ds-color-favorite）
 *   asset-base  素材目录（扫街榜 logo）
 *
 * 事件（bubbles + composed）
 *   recommend-select              点击卡片
 *   recommend-favorite → { favorited }   切换收藏（组件自行切换 favorited 属性）
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const STAR = 'M5.26064 0.441793C5.21868 0.469114 5.18484 0.508191 5.16293 0.554615L4.00853 3.00794C3.93239 3.16958 3.81994 3.30939 3.68085 3.41534C3.54177 3.52129 3.38022 3.59021 3.2101 3.61616L0.627836 4.01203C0.578692 4.01931 0.532488 4.04093 0.494486 4.07441C0.456485 4.1079 0.428214 4.1519 0.412895 4.20141C0.397575 4.25092 0.395823 4.30395 0.407837 4.35445C0.419851 4.40496 0.445149 4.45091 0.480849 4.48707L2.34868 6.39404C2.47197 6.51996 2.56421 6.67545 2.61743 6.84709C2.67064 7.01873 2.68325 7.20137 2.65415 7.37926L2.21369 10.0738C2.20512 10.125 2.21043 10.1777 2.22902 10.2259C2.24761 10.2742 2.27872 10.3159 2.31883 10.3465C2.35894 10.3771 2.40643 10.3953 2.4559 10.399C2.50537 10.4027 2.55483 10.3917 2.59866 10.3674L4.90695 9.09433C5.05908 9.01056 5.22833 8.96679 5.40016 8.96679C5.57198 8.96679 5.74123 9.01056 5.89336 9.09433L8.20215 10.3674C8.246 10.3919 8.29552 10.4029 8.34507 10.3993C8.39462 10.3957 8.44221 10.3776 8.4824 10.3469C8.52259 10.3163 8.55376 10.2745 8.57237 10.2262C8.59097 10.1779 8.59626 10.1251 8.58762 10.0738L8.14666 7.37873C8.11769 7.20093 8.13036 7.0184 8.18357 6.84687C8.23678 6.67534 8.32895 6.51994 8.45213 6.39404L10.32 4.48654C10.3554 4.45034 10.3804 4.40447 10.3922 4.35412C10.4041 4.30377 10.4023 4.25094 10.387 4.20163C10.3717 4.15231 10.3435 4.10846 10.3057 4.07505C10.2679 4.04164 10.2219 4.01999 10.173 4.01255L7.59021 3.61616C7.42029 3.59 7.25896 3.52099 7.12006 3.41506C6.98117 3.30912 6.86886 3.16942 6.79278 3.00794L5.63788 0.554615C5.61597 0.508191 5.58213 0.469114 5.54017 0.441793C5.4982 0.414471 5.4498 0.399994 5.40041 0.399994C5.35101 0.399994 5.30261 0.414471 5.26064 0.441793Z';

  class AmapPoiRecommend extends HTMLElement {
    static get observedAttributes() { return ['name', 'tag', 'saves', 'image', 'tint', 'tint-end', 'fav-label', 'favorited', 'asset-base']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback(n) {
      if (!this.isConnected) return;
      if (n === 'favorited') return this.syncFav();   // 只同步状态，保留焦点
      this.render();
    }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    syncFav() {
      const btn = this.querySelector('.amap-rec__fav');
      if (btn) btn.setAttribute('aria-pressed', String(this.hasAttribute('favorited')));
    }

    render() {
      const a = (n, d) => this.attr(n, d);
      const name = a('name');
      const image = a('image');
      if (has(a('tint'))) this.style.setProperty('--rec-tint', a('tint')); else this.style.removeProperty('--rec-tint');
      if (has(a('tint-end'))) this.style.setProperty('--rec-tint-end', a('tint-end')); else this.style.removeProperty('--rec-tint-end');

      this.innerHTML = `
        <article class="amap-rec${has(a('tint')) ? ' has-tint' : ''}">
          ${has(image) ? `
            <div class="amap-rec__media" aria-hidden="true">
              <img class="amap-rec__photo" src="${esc(image)}" alt="">
              <img class="amap-rec__photo amap-rec__photo--blur" src="${esc(image)}" alt="">
            </div>` : ''}
          <div class="amap-rec__overlay"></div>
          <button type="button" class="amap-rec__cover" aria-label="${esc(name)}"></button>
          <div class="amap-rec__body">
            <h3 class="amap-rec__name">${esc(name)}</h3>
            ${has(a('tag')) ? `<amap-ranking-tag class="amap-rec__tag" on-photo text="${esc(a('tag'))}"></amap-ranking-tag>` : ''}
            ${has(a('saves')) ? `<span class="amap-rec__saves">${esc(a('saves'))}</span>` : ''}
          </div>
          <button type="button" class="amap-rec__fav" aria-pressed="${this.hasAttribute('favorited')}" aria-label="${esc(a('fav-label', '收藏'))} ${esc(name)}">
            <span>${esc(a('fav-label', '收藏'))}</span>
            <svg class="amap-rec__star" viewBox="0 0 11 11" aria-hidden="true"><path d="${STAR}" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </article>`;

      // 图片加载失败：移除整个图片层，露出 tint 占位色
      this.querySelector('.amap-rec__photo')?.addEventListener('error', () => {
        this.querySelector('.amap-rec__media')?.remove();
      }, { once: true });

      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      this.querySelector('.amap-rec__cover').addEventListener('click', () => fire('recommend-select'));
      this.querySelector('.amap-rec__fav').addEventListener('click', () => {
        const favorited = !this.hasAttribute('favorited');
        this.toggleAttribute('favorited', favorited);
        fire('recommend-favorite', { favorited });
      });
    }
  }

  if (!customElements.get('amap-poi-recommend')) customElements.define('amap-poi-recommend', AmapPoiRecommend);
})();
