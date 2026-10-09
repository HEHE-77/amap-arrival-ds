/**
 * <amap-taxi-bill> · 打车费用账单（Figma 765:7097，实例 765:7098）
 * 依赖 components/primitives/primitives.js（amap-link「费用说明」、amap-button 胶囊主按钮）
 *
 * 属性
 *   from / to       起点 / 终点（超长省略），圆点绿 / 红
 *   amount          金额数字，如「18.28」
 *   amount-prefix   默认「共计」
 *   amount-unit     默认「元」
 *   fee-label       默认「费用说明」
 *   pay-label       默认「立即支付」
 *   actions         JSON 数组，默认 [{"key":"lost","label":"物品遗失"},{"key":"contact","label":"联系司机"}]
 *                   key 决定图标：lost 物品遗失 / contact 联系司机；其他 key 不显示图标
 *   asset-base      素材目录（全局箭头）
 *
 * 事件（bubbles + composed）
 *   bill-pay                      立即支付
 *   bill-fee                      费用说明
 *   bill-action → { key, label }  快捷操作
 *   bill-more                     更多（竖排三点）
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // 图标取自 Figma 导出（765:7097），颜色改为 currentColor 以走 token
  const ICONS = {
    lost: `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true"><path d="M5.60254 0.700195H13.8975C14.8338 0.700223 15.7125 1.15222 16.2568 1.91406L18.7998 5.47363V14.4004C18.7996 16.0017 17.5017 17.2996 15.9004 17.2998H3.59961C1.99829 17.2996 0.700406 16.0017 0.700195 14.4004V5.47363L3.24316 1.91406C3.78753 1.15222 4.66618 0.700223 5.60254 0.700195Z" stroke="currentColor" stroke-width="1.4"/><path d="M8.75012 8.5C8.75012 7.94772 9.19784 7.5 9.75012 7.5C10.3024 7.5 10.7501 7.94772 10.7501 8.5V11C10.7501 11.5523 10.3024 12 9.75012 12C9.19784 12 8.75012 11.5523 8.75012 11V8.5Z" fill="currentColor"/><path d="M10.7501 13.75C10.7501 14.3023 10.3024 14.75 9.75012 14.75C9.19784 14.75 8.75012 14.3023 8.75012 13.75C8.75012 13.1977 9.19784 12.75 9.75012 12.75C10.3024 12.75 10.7501 13.1977 10.7501 13.75Z" fill="currentColor"/></svg>`,
    contact: `<svg width="20" height="21" viewBox="0 0 20 21" fill="currentColor" aria-hidden="true"><path d="M14.685 19.0658H14.672C13.654 19.0658 10.006 19.1204 6.27199 14.9372C2.55799 10.7834 0.299995 6.07833 2.45499 3.58248C2.84499 3.13098 3.20599 2.72043 3.52799 2.36343C3.72101 2.14995 3.95495 1.98186 4.21437 1.87027C4.47378 1.75868 4.75279 1.7061 5.03298 1.71603C5.31316 1.72595 5.58816 1.79814 5.83983 1.92783C6.0915 2.05753 6.31411 2.24178 6.49299 2.46843L8.33799 4.79733C8.66906 5.2201 8.84527 5.75322 8.83482 6.30044C8.82437 6.84767 8.62794 7.37294 8.28099 7.78143L7.58099 8.60043C7.88099 9.47088 8.99599 11.9751 12.152 13.6982C12.503 13.3149 12.791 12.9968 13.024 12.7406C13.3379 12.3923 13.7634 12.1782 14.2187 12.1394C14.6739 12.1007 15.1267 12.24 15.49 12.5306L17.169 13.8714C17.4147 14.0688 17.6181 14.3185 17.7657 14.604C17.9133 14.8896 18.0019 15.2046 18.0257 15.5285C18.0495 15.8524 18.0079 16.178 17.9037 16.4839C17.7995 16.7898 17.635 17.0692 17.421 17.3039C17.068 17.6903 16.696 18.0966 16.393 18.4326C16.019 18.8484 15.429 19.0658 14.685 19.0658ZM4.966 2.97348C4.85995 2.97308 4.75497 2.99562 4.65759 3.0397C4.56021 3.08378 4.47252 3.14845 4.39999 3.22968C4.08399 3.58038 3.72899 3.98358 3.34499 4.42878C2.17799 5.77908 2.78699 9.19683 7.14499 14.0751C10.658 18.0074 14.003 17.8037 14.676 17.8058H14.684C15.143 17.8058 15.418 17.684 15.522 17.5685C15.827 17.2314 16.2 16.823 16.555 16.4345C16.6517 16.3279 16.7259 16.2012 16.7729 16.0626C16.8199 15.924 16.8387 15.7765 16.8279 15.6298C16.8172 15.4831 16.7772 15.3403 16.7105 15.2109C16.6439 15.0814 16.552 14.9682 16.441 14.8784L14.763 13.5365C14.6346 13.434 14.4748 13.3849 14.3141 13.3984C14.1534 13.412 14.0031 13.4873 13.892 13.61C13.592 13.9376 13.204 14.366 12.71 14.9046C12.6228 14.9997 12.5094 15.0636 12.3858 15.0873C12.2622 15.111 12.1346 15.0934 12.021 15.0369C7.368 12.7154 6.36199 8.77053 6.32099 8.60358C6.29678 8.50316 6.29653 8.39802 6.32025 8.29747C6.34397 8.19692 6.39094 8.10407 6.45699 8.02713L7.38899 6.93933C7.54453 6.75619 7.63255 6.52067 7.63714 6.27533C7.64172 6.03 7.56257 5.79103 7.41399 5.60163L5.56999 3.27063C5.49955 3.18051 5.41148 3.10735 5.31176 3.05608C5.21204 3.00481 5.10299 2.97664 4.99199 2.97348H4.966ZM15.266 9.58848C15.1069 9.58848 14.9543 9.5221 14.8417 9.40396C14.7292 9.28581 14.666 9.12557 14.666 8.95848C14.6655 8.23897 14.3931 7.54907 13.9086 7.0402C13.4242 6.53133 12.7672 6.24506 12.082 6.24423C11.9229 6.24423 11.7703 6.17785 11.6577 6.05971C11.5452 5.94156 11.482 5.78131 11.482 5.61423C11.482 5.44714 11.5452 5.2869 11.6577 5.16875C11.7703 5.0506 11.9229 4.98423 12.082 4.98423C13.0853 4.98562 14.0472 5.40481 14.7566 6.14986C15.466 6.8949 15.8649 7.90497 15.866 8.95848C15.866 9.12557 15.8028 9.28581 15.6903 9.40396C15.5777 9.5221 15.4251 9.58848 15.266 9.58848Z"/><path d="M17.7051 9.58854C17.6263 9.58854 17.5482 9.57224 17.4754 9.54058C17.4027 9.50892 17.3365 9.46252 17.2808 9.40402C17.2251 9.34552 17.1809 9.27606 17.1507 9.19963C17.1206 9.12319 17.1051 9.04127 17.1051 8.95854C17.1035 7.56016 16.5738 6.21952 15.6322 5.23062C14.6905 4.24172 13.4138 3.68528 12.0821 3.68334C11.9229 3.68334 11.7703 3.61697 11.6578 3.49882C11.5453 3.38067 11.4821 3.22043 11.4821 3.05334C11.4821 2.88625 11.5453 2.72601 11.6578 2.60786C11.7703 2.48971 11.9229 2.42334 12.0821 2.42334C13.732 2.42556 15.3138 3.11484 16.4804 4.33997C17.647 5.56511 18.3032 7.22608 18.3051 8.95854C18.3051 9.12563 18.2418 9.28587 18.1293 9.40402C18.0168 9.52216 17.8642 9.58854 17.7051 9.58854Z"/></svg>`,
    more: `<svg viewBox="0 0 6 19" fill="currentColor" aria-hidden="true"><circle cx="3" cy="2" r="2"/><circle cx="3" cy="9" r="2"/><circle cx="3" cy="16" r="2"/></svg>`,
  };
  const DEFAULT_ACTIONS = [{ key: 'lost', label: '物品遗失' }, { key: 'contact', label: '联系司机' }];

  class AmapTaxiBill extends HTMLElement {
    static get observedAttributes() {
      return ['from', 'to', 'amount', 'amount-prefix', 'amount-unit', 'fee-label', 'pay-label', 'actions', 'asset-base'];
    }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    attr(n, d = '') { return this.getAttribute(n) ?? d; }

    render() {
      const a = (n, d) => this.attr(n, d);
      let actions = DEFAULT_ACTIONS;
      try { if (this.hasAttribute('actions')) actions = JSON.parse(a('actions')); } catch { /* 保持默认 */ }

      this.innerHTML = `
        <section class="amap-bill" aria-label="打车费用">
          <div class="amap-bill__top">
            <ol class="amap-bill__route">
              <li class="amap-bill__stop amap-bill__stop--start"><span class="amap-bill__place">${esc(a('from'))}</span></li>
              <li class="amap-bill__stop amap-bill__stop--end"><span class="amap-bill__place">${esc(a('to'))}</span></li>
            </ol>
            <div class="amap-bill__fare">
              <p class="amap-bill__price">
                <span>${esc(a('amount-prefix', '共计'))}</span><span class="amap-bill__amount">${esc(a('amount'))}</span><span>${esc(a('amount-unit', '元'))}</span>
              </p>
              <amap-link class="amap-bill__fee" label="${esc(a('fee-label', '费用说明'))}"></amap-link>
            </div>
          </div>
          <div class="amap-bill__bottom">
            <div class="amap-bill__actions">
              <button type="button" class="amap-bill__more" aria-label="更多">${ICONS.more}</button>
              ${actions.map((x, i) => `
                <button type="button" class="amap-bill__action" data-index="${i}">
                  <span class="amap-bill__icon">${ICONS[x.key] && x.key !== 'more' ? ICONS[x.key] : ''}</span>
                  <span>${esc(x.label)}</span>
                </button>`).join('')}
            </div>
            <amap-button class="amap-bill__pay" shape="pill" label="${esc(a('pay-label', '立即支付'))}"></amap-button>
          </div>
        </section>`;

      const fire = (type, detail) => this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
      this.querySelector('.amap-bill__pay').addEventListener('click', () => fire('bill-pay'));
      this.querySelector('.amap-bill__fee').addEventListener('click', () => fire('bill-fee'));
      this.querySelector('.amap-bill__more').addEventListener('click', () => fire('bill-more'));
      this.querySelectorAll('.amap-bill__action').forEach((btn) => btn.addEventListener('click', () => {
        const x = actions[Number(btn.dataset.index)];
        fire('bill-action', { key: x.key, label: x.label });
      }));
    }
  }

  if (!customElements.get('amap-taxi-bill')) customElements.define('amap-taxi-bill', AmapTaxiBill);
})();
