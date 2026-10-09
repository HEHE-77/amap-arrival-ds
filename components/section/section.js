/**
 * <amap-section> · 模块容器：标题 + 内容
 * 来源：Figma 765:5300「停车场」/ 765:5299「加油站提示」中的 Section Header + section-content
 *
 * 用法：子元素即内容，组件只负责标题与内外边距
 *   <amap-section heading="泊车指引更省心">
 *     <amap-service-card …></amap-service-card>
 *     <amap-service-card …></amap-service-card>
 *   </amap-section>
 *
 * 属性
 *   heading     模块标题（16 Semibold），超长省略
 *   more-label  标题右侧入口文案，如「查看更多」；不传不显示（amap-link，需加载 primitives）
 *   layout      不传为竖向堆叠；scroll 为横向滑动（如当地特色菜）
 *
 * 事件：section-more（点击右侧入口）
 * 组件变量：--section-inset（左右内边距，默认 18）、--section-gap（默认 8）、--section-row-gap（横向滑动时卡片间距，默认同 gap）
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  class AmapSection extends HTMLElement {
    static get observedAttributes() { return ['heading', 'more-label']; }

    connectedCallback() {
      if (!this._body) {
        // 首次挂载：把已有子元素搬进内容区
        const frag = document.createDocumentFragment();
        while (this.firstChild) frag.appendChild(this.firstChild);
        this.innerHTML = `
          <section class="amap-section">
            <div class="amap-section__header"><h2 class="amap-section__title"></h2><span class="amap-section__more"></span></div>
            <div class="amap-section__body"></div>
          </section>`;
        this._title = this.querySelector('.amap-section__title');
        this._body = this.querySelector('.amap-section__body');
        this._body.appendChild(frag);
        this.querySelector('.amap-section__more').addEventListener('click', (e) => {
          if (!e.target.closest('amap-link')) return;
          this.dispatchEvent(new CustomEvent('section-more', { bubbles: true, composed: true }));
        });
      }
      this.syncHeading();
    }
    attributeChangedCallback() { if (this._title) this.syncHeading(); }
    syncHeading() {
      const h = this.getAttribute('heading') ?? '';
      const more = this.getAttribute('more-label') ?? '';
      this._title.innerHTML = esc(h);
      this.querySelector('.amap-section__more').innerHTML = more ? `<amap-link label="${esc(more)}"></amap-link>` : '';
      this.querySelector('.amap-section__header').hidden = !h && !more;
    }
    /** 内容区，便于脚本追加子元素 */
    get body() { return this._body; }
  }

  if (!customElements.get('amap-section')) customElements.define('amap-section', AmapSection);
})();
