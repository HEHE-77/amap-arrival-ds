/**
 * <amap-restriction-card> · 限行提醒卡（Figma 765:5302「限行」，实例 765:5303）
 * 依赖 components/primitives/primitives.js（amap-tag size="l"）；通常放在 <amap-section heading="异地限行规则"> 中
 *
 * 属性
 *   heading   卡片标题，默认「今日限行提醒」
 *   plate     车牌，如「陕B·*****」；不传不显示
 *   text      说明文字（多行）
 *   tags      JSON 数组 [{ text, tone }]，如 [{"text":"今日限行 7:00 - 20:00","tone":"danger"},{"text":"避开限行路线已规划","tone":"neutral"}]
 *
 * 纯展示组件，无事件。
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  // 车辆图标取自 Figma 导出（765:5302 car），颜色走 currentColor
  const CAR = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12.667 11.3339H14.0004C14.4005 11.3339 14.6672 11.0672 14.6672 10.6672V8.66724C14.6672 8.06724 14.2005 7.5339 13.6671 7.40057C12.467 7.06724 10.6668 6.66724 10.6668 6.66724C10.6668 6.66724 9.80011 5.7339 9.20006 5.1339C8.8667 4.86724 8.46667 4.66724 7.99996 4.66724H3.33292C2.93289 4.66724 2.59953 4.9339 2.39952 5.26724L1.46611 7.20057C1.37782 7.45805 1.33276 7.72837 1.33276 8.00057V10.6672C1.33276 11.0672 1.59945 11.3339 1.99948 11.3339H3.33292M12.667 11.3339C12.667 12.0703 12.07 12.6672 11.3336 12.6672C10.5971 12.6672 10.0001 12.0703 10.0001 11.3339M12.667 11.3339C12.667 10.5975 12.07 10.0006 11.3336 10.0006C10.5971 10.0006 10.0001 10.5975 10.0001 11.3339M3.33292 11.3339C3.33292 12.0703 3.92993 12.6672 4.66636 12.6672C5.4028 12.6672 5.9998 12.0703 5.9998 11.3339M3.33292 11.3339C3.33292 10.5975 3.92993 10.0006 4.66636 10.0006C5.4028 10.0006 5.9998 10.5975 5.9998 11.3339M10.0001 11.3339H5.9998" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  class AmapRestrictionCard extends HTMLElement {
    static get observedAttributes() { return ['heading', 'plate', 'text', 'tags']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      let tags = [];
      try { tags = JSON.parse(a('tags', '[]')).filter((t) => t && has(t.text)); } catch { tags = []; }

      this.innerHTML = `
        <article class="amap-rc">
          <div class="amap-rc__header">
            <h3 class="amap-rc__heading">
              <span class="amap-rc__icon">${CAR}</span>
              <span class="amap-rc__title">${esc(a('heading', '今日限行提醒'))}</span>
            </h3>
            ${has(a('plate')) ? `<span class="amap-rc__plate">${esc(a('plate'))}</span>` : ''}
          </div>
          ${has(a('text')) ? `<p class="amap-rc__desc">${esc(a('text'))}</p>` : ''}
          ${tags.length ? `<div class="amap-rc__tags">${tags.map((t) =>
            `<amap-tag size="l" tone="${esc(t.tone ?? 'neutral')}" text="${esc(t.text)}"></amap-tag>`).join('')}</div>` : ''}
        </article>`;
    }
  }

  if (!customElements.get('amap-restriction-card')) customElements.define('amap-restriction-card', AmapRestrictionCard);
})();
