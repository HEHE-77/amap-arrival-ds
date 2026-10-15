/**
 * <amap-place-card> · 扫街榜 POI 卡片（Figma 956:2869「扫街榜POI卡片」，单一主组件）
 * 别名 <amap-restaurant-card>（等同 scene="restaurant"）
 * 依赖 components/primitives/primitives.js（需先加载）
 *
 * 属性与 Figma 组件属性一一对应：
 *
 *   Figma 属性             代码属性
 *   ───────────────────    ──────────────────────────────────────────────
 *   名称 / 距离             name / distance
 *   显示 TOP 角标 + TOP 角标 rank：1 金 / 2 银 / 3 铜；不传不显示
 *   显示附加标签 + 附加标签  extra-tag 文案 + extra-tag-type：tenure（收录年限，默认）| area（区域）
 *   显示热评                review（文案）+ review-count
 *   优惠标签 1 / 2          deals[0] / deals[1]：[{ type: '团'|'票'|'券', price, discount, title }]
 *   显示第二条优惠           deals 传两条；Figma 最多两条，多余的忽略
 *   显示查看更多            deal-more（文案，如「查看更多」），挂在第一条优惠右侧
 *   CTA · 类型             cta：group（看团购，默认）| ticket（订门票）| order（一键下单）
 *   评分（嵌套实例）         score / score-label
 *   营业状态（嵌套实例）      status；closed 布尔改为灰色打烊标签
 *   图片区                 image / saves（收藏数）/ image-index（页码）
 *
 *   ranking         扫街榜标签文案（如「碑林区回头客榜单·第 1 名」）
 *   details         JSON 数组，「·」串联（品类 / 人均 / 导航人数）
 *   order           cta="order" 时的商品 JSON { image, title, tag, spec, note, price, actionLabel, swapLabel }
 *   primary-label / secondary-label   覆盖 CTA 按钮文案（单 POI 稿中次按钮为「联系商家」）
 *   layout="single" 宽 365（单 POI 导航到达），默认 301；也可设 --place-card-width
 *   asset-base      素材目录（子组件自动继承）
 *
 * 兼容旧写法：scene（restaurant / attraction / commute）只用来推断默认 cta；
 *   tenure → extra-tag（收录年限）；info-tag → extra-tag + extra-tag-type="area"；
 *   传了 order 且未指定 cta 时 → cta="order"。
 *
 * 事件（bubbles + composed）
 *   card-primary / card-secondary → { label }   CTA 主 / 次按钮（看团购、订门票 / 查看路线）
 *   card-review                  热评条
 *   card-deal → { index, deal }  某条优惠
 *   card-more                    查看更多
 *   card-order-buy / card-order-swap   一键下单 / 换一杯
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const parse = (v, fallback) => { try { return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

  // Figma「扫街榜POI卡片/CTA」类型：一键下单 / 看团购 / 订门票
  const CTA = { group: '看团购', ticket: '订门票', order: '一键下单' };
  const CTA_OF_SCENE = { restaurant: 'group', attraction: 'ticket', commute: 'order' };
  const MAX_DEALS = 2;

  class AmapPlaceCard extends HTMLElement {
    static get observedAttributes() {
      return ['scene', 'cta', 'rank', 'name', 'distance', 'score', 'score-label', 'details', 'ranking',
        'extra-tag', 'extra-tag-type', 'info-tag', 'tenure', 'status', 'closed',
        'review', 'review-count', 'deals', 'deal-more', 'image', 'saves', 'image-index',
        'primary-label', 'secondary-label', 'order', 'layout', 'asset-base'];
    }
    get defaultScene() { return 'restaurant'; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    /** 由属性解析出与 Figma 组件属性对应的配置 */
    config() {
      const a = (n, d) => this.attr(n, d);
      const order = parse(a('order'), null);
      const scene = a('scene', this.defaultScene);
      let cta = a('cta');
      if (!CTA[cta]) cta = order ? 'order' : (CTA_OF_SCENE[scene] === 'order' ? 'group' : CTA_OF_SCENE[scene] ?? 'group');
      if (cta === 'order' && !order) cta = 'group';

      let extra = null;
      if (has(a('extra-tag'))) extra = { text: a('extra-tag'), type: a('extra-tag-type') === 'area' ? 'area' : 'tenure' };
      else if (has(a('tenure'))) extra = { text: a('tenure'), type: 'tenure' };
      else if (has(a('info-tag'))) extra = { text: a('info-tag'), type: 'area' };

      return {
        cta, order, extra,
        deals: parse(a('deals'), []).slice(0, MAX_DEALS),
        details: parse(a('details'), []),
        rank: [1, 2, 3].includes(Number(a('rank'))) ? Number(a('rank')) : null,
      };
    }

    ctaHTML({ cta, order }) {
      const a = (n, d) => this.attr(n, d);
      if (cta === 'order') {
        return `
          <amap-quick-order class="amap-place__cta amap-place__order" image="${esc(order.image ?? '')}" title="${esc(order.title)}"
            tag="${esc(order.tag ?? '')}" spec="${esc(order.spec ?? '')}" note="${esc(order.note ?? '')}" price="${esc(order.price ?? '')}"
            action-label="${esc(order.actionLabel ?? CTA.order)}" swap-label="${esc(order.swapLabel ?? '换一杯')}"></amap-quick-order>`;
      }
      return `
        <div class="amap-place__cta amap-place__actions" data-cta="${cta}">
          <amap-button class="amap-place__primary" variant="primary" label="${esc(a('primary-label', CTA[cta]))}"></amap-button>
          <amap-button class="amap-place__secondary" variant="secondary" label="${esc(a('secondary-label', '查看路线'))}"></amap-button>
        </div>`;
    }

    render() {
      const a = (n, d) => this.attr(n, d);
      const cfg = this.config();
      const { deals, details, extra, rank } = cfg;
      const dealMore = a('deal-more');
      const closed = this.hasAttribute('closed');

      const dealRow = (d, i) => `
        <div class="amap-place__row amap-place__deal-row">
          <button type="button" class="amap-place__row amap-place__deal" data-index="${i}">
            <amap-deal-tag type="${esc(d.type ?? '团')}" price="${esc(d.price)}" discount="${esc(d.discount ?? '')}"></amap-deal-tag>
            <span class="amap-place__deal-title">${esc(d.title)}</span>
          </button>
          ${i === 0 && has(dealMore) ? `<amap-link class="amap-place__more" label="${esc(dealMore)}"></amap-link>` : ''}
        </div>`;

      // 标签行：榜单标签 → 附加标签 → 营业状态（Figma 956:2889）
      const tags = [
        has(a('ranking')) ? `<amap-ranking-tag text="${esc(a('ranking'))}"></amap-ranking-tag>` : '',
        extra ? `<amap-tag tone="${extra.type}" text="${esc(extra.text)}"></amap-tag>` : '',
        has(a('status'))
          ? (closed ? `<amap-tag tone="area" text="${esc(a('status'))}"></amap-tag>` : `<amap-status-tag text="${esc(a('status'))}"></amap-status-tag>`)
          : '',
      ].join('');

      this.innerHTML = `
        <article class="amap-place" data-cta="${cfg.cta}" aria-label="${esc(a('name'))}">
          ${rank ? `<amap-rank-ribbon class="amap-place__ribbon" rank="${rank}"></amap-rank-ribbon>` : ''}

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
            ${tags ? `<div class="amap-place__row amap-place__tags">${tags}</div>` : ''}
            ${has(a('review')) ? `<amap-hot-review class="amap-place__review" text="${esc(a('review'))}" count="${esc(a('review-count'))}"></amap-hot-review>` : ''}
            ${deals.map(dealRow).join('')}
          </div>

          ${this.ctaHTML(cfg)}
        </article>`;

      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      const on = (sel, ev, fn) => this.querySelector(sel)?.addEventListener(ev, fn);
      const primary = a('primary-label', CTA[cfg.cta]);
      const secondary = a('secondary-label', '查看路线');
      on('.amap-place__primary', 'click', () => fire('card-primary', { label: primary }));
      on('.amap-place__secondary', 'click', () => fire('card-secondary', { label: secondary }));
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
