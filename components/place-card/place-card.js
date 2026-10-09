/**
 * <amap-place-card> · 到达地点卡片（Figma 853:5068 及实例 853:6420）
 * 别名 <amap-restaurant-card>（等同 scene="restaurant"）
 * 依赖 components/primitives/primitives.js（需先加载）
 *
 * 场景 scene
 *   restaurant  饭店到达（默认）：热评 + 多条团购 + 看团购 / 查看路线
 *   attraction  景点到达：灰色信息标签、门票、订门票 / 查看路线
 *   commute     上班到达：收录年限标签、单条团购 + 查看更多、一键下单卡片
 *
 * 布局 layout
 *   （默认）   宽 301，排行榜等多卡场景
 *   single     宽 365，单 POI 导航到达（Figma 858:6486），通常不传 rank
 *   也可直接设置 CSS 变量 --place-card-width
 *
 * 通用属性
 *   rank            排名 → TOP 飘带（1 金 / 2 银 / 3 铜）；不传不显示
 *   name / distance 店名（超长省略）/ 距离
 *   score / score-label   评分徽标
 *   details         JSON 数组，「·」串联
 *   ranking         扫街榜标签文案
 *   info-tag        灰色信息标签，如「西安的市中心」
 *   tenure          收录年限标签，如「收录 2 年」
 *   status          营业状态，如「营业中」「正在开放」
 *   closed          布尔，打烊态：status 改用灰色标签（如「今日已打烊」）
 *   review / review-count  热评条
 *   deals           JSON 数组 [{ type: '团'|'券'|'票', price, discount, title }]
 *   deal-more       第一条团购右侧入口文案，如「查看更多」
 *   image / saves / image-index   主图 / 收藏数 / 页码
 *   primary-label / secondary-label  底部按钮；默认 看团购 | 订门票（景点）/ 查看路线（单 POI 稿中为「联系商家」）
 *   order           JSON，一键下单卡片 { image, title, tag, spec, note, price, actionLabel, swapLabel }；
 *                   有 order 时替代底部按钮
 *   asset-base      素材目录（子组件自动继承）
 *
 * 事件（bubbles + composed）
 *   card-primary / card-secondary → { label }   底部主 / 次按钮
 *   card-review                  热评条
 *   card-deal → { index, deal }  某条团购
 *   card-more                    查看更多
 *   card-order-buy / card-order-swap   一键下单 / 换一杯
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const parse = (v, fallback) => { try { return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
  const SCENES = ['restaurant', 'attraction', 'commute'];
  const PRIMARY_DEFAULT = { restaurant: '看团购', attraction: '订门票', commute: '看团购' };

  class AmapPlaceCard extends HTMLElement {
    static get observedAttributes() {
      return ['scene', 'rank', 'name', 'distance', 'score', 'score-label', 'details', 'ranking', 'info-tag', 'tenure', 'status', 'closed',
        'review', 'review-count', 'deals', 'deal-more', 'image', 'saves', 'image-index', 'primary-label', 'secondary-label', 'order', 'layout', 'asset-base'];
    }
    get defaultScene() { return 'restaurant'; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      const scene = SCENES.includes(a('scene')) ? a('scene') : this.defaultScene;
      const deals = parse(a('deals'), []);
      const details = parse(a('details'), []);
      const order = parse(a('order'), null);
      const dealMore = a('deal-more');

      const dealRow = (d, i) => `
        <div class="amap-place__row amap-place__deal-row">
          <button type="button" class="amap-place__row amap-place__deal" data-index="${i}">
            <amap-deal-tag type="${esc(d.type ?? '团')}" price="${esc(d.price)}" discount="${esc(d.discount ?? '')}"></amap-deal-tag>
            <span class="amap-place__deal-title">${esc(d.title)}</span>
          </button>
          ${i === 0 && has(dealMore) ? `<amap-link class="amap-place__more" label="${esc(dealMore)}"></amap-link>` : ''}
        </div>`;

      const badges = [
        has(a('ranking')) ? `<amap-ranking-tag text="${esc(a('ranking'))}"></amap-ranking-tag>` : '',
        has(a('info-tag')) ? `<amap-tag tone="neutral" text="${esc(a('info-tag'))}"></amap-tag>` : '',
        has(a('tenure')) ? `<amap-tag tone="tenure" text="${esc(a('tenure'))}"></amap-tag>` : '',
        has(a('status')) ? (this.hasAttribute('closed') ? `<amap-tag tone="neutral" text="${esc(a('status'))}"></amap-tag>` : `<amap-status-tag text="${esc(a('status'))}"></amap-status-tag>`) : '',
      ].join('');

      this.innerHTML = `
        <article class="amap-place" data-scene="${scene}" aria-label="${esc(a('name'))}">
          ${has(a('rank')) ? `<amap-rank-ribbon class="amap-place__ribbon" rank="${esc(a('rank'))}"></amap-rank-ribbon>` : ''}

          <div class="amap-place__media">
            ${has(a('image')) ? `<img class="amap-place__photo" src="${esc(a('image'))}" alt="">` : ''}
            ${has(a('saves')) ? `<amap-media-pill class="amap-place__saves" icon="star" text="${esc(a('saves'))}"></amap-media-pill>` : ''}
            ${has(a('image-index')) ? `<amap-media-pill class="amap-place__page" muted text="${esc(a('image-index'))}"></amap-media-pill>` : ''}
          </div>

          <div class="amap-place__body">
            <div class="amap-place__row amap-place__title">
              <h3 class="amap-place__name">${esc(a('name'))}</h3>
              ${has(a('distance')) ? `<span class="amap-place__distance">${esc(a('distance'))}</span>` : ''}
            </div>
            <div class="amap-place__row amap-place__details">
              ${has(a('score')) ? `<amap-score-badge score="${esc(a('score'))}" label="${esc(a('score-label'))}"></amap-score-badge>` : ''}
              <amap-meta-line sep="·" items="${esc(JSON.stringify(details))}"></amap-meta-line>
            </div>
            ${badges ? `<div class="amap-place__row amap-place__badges">${badges}</div>` : ''}
            ${has(a('review')) ? `<amap-hot-review class="amap-place__review" text="${esc(a('review'))}" count="${esc(a('review-count'))}"></amap-hot-review>` : ''}
            ${deals.map(dealRow).join('')}
          </div>

          ${order ? `
            <amap-quick-order class="amap-place__order" image="${esc(order.image ?? '')}" title="${esc(order.title)}" tag="${esc(order.tag ?? '')}"
              spec="${esc(order.spec ?? '')}" note="${esc(order.note ?? '')}" price="${esc(order.price ?? '')}"
              action-label="${esc(order.actionLabel ?? '一键下单')}" swap-label="${esc(order.swapLabel ?? '换一杯')}"></amap-quick-order>` : `
            <div class="amap-place__actions">
              <amap-button class="amap-place__primary" variant="primary" label="${esc(a('primary-label', PRIMARY_DEFAULT[scene]))}"></amap-button>
              <amap-button class="amap-place__secondary" variant="secondary" label="${esc(a('secondary-label', '查看路线'))}"></amap-button>
            </div>`}
        </article>`;

      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      const on = (sel, ev, fn) => this.querySelector(sel)?.addEventListener(ev, fn);
      on('.amap-place__primary', 'click', () => fire('card-primary', { label: a('primary-label', PRIMARY_DEFAULT[scene]) }));
      on('.amap-place__secondary', 'click', () => fire('card-secondary', { label: a('secondary-label', '查看路线') }));
      on('.amap-place__review', 'click', () => fire('card-review'));
      on('.amap-place__more', 'click', () => fire('card-more'));
      on('.amap-place__order', 'order-buy', (e) => { e.stopPropagation(); fire('card-order-buy'); });
      on('.amap-place__order', 'order-swap', (e) => { e.stopPropagation(); fire('card-order-swap'); });
      this.querySelectorAll('.amap-place__deal').forEach((btn) => btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        fire('card-deal', { index, deal: deals[index] });
      }));
    }
  }

  class AmapRestaurantCard extends AmapPlaceCard {
    get defaultScene() { return 'restaurant'; }
  }

  if (!customElements.get('amap-place-card')) customElements.define('amap-place-card', AmapPlaceCard);
  if (!customElements.get('amap-restaurant-card')) customElements.define('amap-restaurant-card', AmapRestaurantCard);
})();
