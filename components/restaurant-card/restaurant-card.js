/**
 * <amap-restaurant-card> · 饭店到达卡片（Figma 853:5068「饭店到达-1」）
 * 依赖 components/primitives/primitives.js（需先加载）
 *
 * 属性
 *   rank            排名，生成 TOP 飘带；不传则不显示
 *   name            店名（超长省略）
 *   distance        距离，如「<100 米」
 *   score / score-label   评分徽标，如 4.8 / 超棒
 *   details         JSON 数组，用「·」串联，如 ["川菜","￥150/人","3652 人导航过"]
 *   ranking         扫街榜标签文案，如「碑林区回头客榜单·第 1 名」
 *   status          营业状态文案，如「营业中」；不传则不显示
 *   review / review-count  热评与人数，如「252 人在说」
 *   deals           JSON 数组 [{ type: '团'|'券', price, discount, title }]
 *   image           主图 URL；缺失时显示占位底色
 *   saves           图片右上收藏数，如「10.7w+」
 *   image-index     图片页码，如「1/12」
 *   primary-label   主按钮，默认「看团购」
 *   secondary-label 次按钮，默认「查看路线」
 *   asset-base      素材目录（子组件自动继承）
 *
 * 事件（bubbles + composed）
 *   restaurant-primary   点击主按钮
 *   restaurant-route     点击次按钮
 *   restaurant-review    点击热评条
 *   restaurant-deal      点击某条团购 → { index, deal }
 *
 * 组成：amap-rank-ribbon · amap-media-pill · amap-score-badge · amap-meta-line ·
 *       amap-ranking-tag · amap-status-tag · amap-hot-review · amap-deal-tag · amap-button
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const json = (v) => { try { const x = JSON.parse(v || '[]'); return Array.isArray(x) ? x : []; } catch { return []; } };

  class AmapRestaurantCard extends HTMLElement {
    static get observedAttributes() {
      return ['rank', 'name', 'distance', 'score', 'score-label', 'details', 'ranking', 'status',
        'review', 'review-count', 'deals', 'image', 'saves', 'image-index', 'primary-label', 'secondary-label', 'asset-base'];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      const deals = json(a('deals'));
      const details = json(a('details'));

      this.innerHTML = `
        <article class="amap-rest" aria-label="${esc(a('name'))}">
          ${has(a('rank')) ? `<amap-rank-ribbon class="amap-rest__ribbon" rank="${esc(a('rank'))}"></amap-rank-ribbon>` : ''}

          <div class="amap-rest__media">
            ${has(a('image')) ? `<img class="amap-rest__photo" src="${esc(a('image'))}" alt="">` : ''}
            ${has(a('saves')) ? `<amap-media-pill class="amap-rest__saves" icon="star" text="${esc(a('saves'))}"></amap-media-pill>` : ''}
            ${has(a('image-index')) ? `<amap-media-pill class="amap-rest__page" muted text="${esc(a('image-index'))}"></amap-media-pill>` : ''}
          </div>

          <div class="amap-rest__body">
            <div class="amap-rest__row amap-rest__title">
              <h3 class="amap-rest__name">${esc(a('name'))}</h3>
              ${has(a('distance')) ? `<span class="amap-rest__distance">${esc(a('distance'))}</span>` : ''}
            </div>

            <div class="amap-rest__row amap-rest__details">
              ${has(a('score')) ? `<amap-score-badge score="${esc(a('score'))}" label="${esc(a('score-label'))}"></amap-score-badge>` : ''}
              <amap-meta-line sep="·" items="${esc(JSON.stringify(details))}"></amap-meta-line>
            </div>

            ${has(a('ranking')) || has(a('status')) ? `
              <div class="amap-rest__row amap-rest__badges">
                ${has(a('ranking')) ? `<amap-ranking-tag text="${esc(a('ranking'))}"></amap-ranking-tag>` : ''}
                ${has(a('status')) ? `<amap-status-tag text="${esc(a('status'))}"></amap-status-tag>` : ''}
              </div>` : ''}

            ${has(a('review')) ? `<amap-hot-review class="amap-rest__review" text="${esc(a('review'))}" count="${esc(a('review-count'))}"></amap-hot-review>` : ''}

            ${deals.map((d, i) => `
              <button type="button" class="amap-rest__row amap-rest__deal" data-index="${i}">
                <amap-deal-tag type="${esc(d.type ?? '团')}" price="${esc(d.price)}" discount="${esc(d.discount ?? '')}"></amap-deal-tag>
                <span class="amap-rest__deal-title">${esc(d.title)}</span>
              </button>`).join('')}
          </div>

          <div class="amap-rest__actions">
            <amap-button class="amap-rest__primary" variant="primary" label="${esc(a('primary-label', '看团购'))}"></amap-button>
            <amap-button class="amap-rest__secondary" variant="secondary" label="${esc(a('secondary-label', '查看路线'))}"></amap-button>
          </div>
        </article>`;

      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      this.querySelector('.amap-rest__primary').addEventListener('click', () => fire('restaurant-primary'));
      this.querySelector('.amap-rest__secondary').addEventListener('click', () => fire('restaurant-route'));
      this.querySelector('.amap-rest__review')?.addEventListener('click', () => fire('restaurant-review'));
      this.querySelectorAll('.amap-rest__deal').forEach((row) => {
        row.addEventListener('click', () => {
          const index = Number(row.dataset.index);
          fire('restaurant-deal', { index, deal: deals[index] });
        });
      });
    }
  }

  if (!customElements.get('amap-restaurant-card')) customElements.define('amap-restaurant-card', AmapRestaurantCard);
})();
