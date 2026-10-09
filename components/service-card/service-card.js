/**
 * <amap-service-card> · 服务卡（Figma 765:5300「停车场」/ 765:5299「加油站提示」中的卡片）
 * 依赖 components/primitives/primitives.js（amap-meta-line、amap-tag、amap-button variant="tonal"）
 * 通常放在 <amap-section> 中纵向排列（间距 8）
 *
 * 属性
 *   name          名称（16 Semibold，超长省略）
 *   badge         名称前的小标识文字，如「团」；不传不显示
 *   avatar        左侧 44 圆形头像图（代驾卡，Figma 765:5304）；有头像时名称为 15 号
 *   meta          JSON 数组，「|」串联，如 ["步行 8 分钟", "距终点 450 米"]
 *   tags          JSON 数组 [{ text, tone }]，tone 取 amap-tag 的 outline | danger | deal | neutral …（尺寸 m）
 *   action-label  右侧浅底按钮文案，如「去停车」「去加油」；不传不显示
 *
 * 事件（bubbles + composed）
 *   service-action → { name, label }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = (v) => v != null && v !== '';
  const parse = (v) => { try { return v ? JSON.parse(v) : []; } catch { return []; } };

  class AmapServiceCard extends HTMLElement {
    static get observedAttributes() { return ['name', 'badge', 'avatar', 'meta', 'tags', 'action-label']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      const meta = parse(a('meta')).filter(has);
      const tags = parse(a('tags')).filter((t) => t && has(t.text));
      const label = a('action-label');

      this.innerHTML = `
        <article class="amap-svc${has(a('avatar')) ? ' has-avatar' : ''}" aria-label="${esc(a('name'))}">
          ${has(a('avatar')) ? `<img class="amap-svc__avatar" src="${esc(a('avatar'))}" alt="">` : ''}
          <div class="amap-svc__info">
            <h3 class="amap-svc__title">
              ${has(a('badge')) ? `<span class="amap-svc__badge">${esc(a('badge'))}</span>` : ''}
              <span class="amap-svc__name">${esc(a('name'))}</span>
            </h3>
            ${meta.length ? `<amap-meta-line class="amap-svc__meta" sep="|" items="${esc(JSON.stringify(meta))}"></amap-meta-line>` : ''}
            ${tags.length ? `<div class="amap-svc__tags">${tags.map((t) =>
              `<amap-tag size="m" tone="${esc(t.tone ?? 'neutral')}" text="${esc(t.text)}"></amap-tag>`).join('')}</div>` : ''}
          </div>
          ${has(label) ? `<amap-button class="amap-svc__action" variant="tonal" label="${esc(label)}"></amap-button>` : ''}
        </article>`;

      this.querySelector('.amap-svc__action')?.addEventListener('click', () =>
        this.dispatchEvent(new CustomEvent('service-action', { bubbles: true, composed: true, detail: { name: a('name'), label } })));
    }
  }

  if (!customElements.get('amap-service-card')) customElements.define('amap-service-card', AmapServiceCard);
})();
