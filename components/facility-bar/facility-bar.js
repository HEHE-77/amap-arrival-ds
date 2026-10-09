/**
 * <amap-facility-bar> · Header 下方的设施快捷入口，横向滑动
 * Figma 765:6203（饭店 / 常规）、777:2671（景点）、777:3333（上班）三排；每个入口在 Figma 中是独立 component（共 16 种）
 *
 * 属性
 *   items       逗号分隔的设施 key，或 JSON 数组 [{ key, label }]；label 不传用默认文案
 *               key：parking 停车场 · toilet 公共厕所 · charging 充电桩 · store 便利店 · aed AED · elevator 电梯口 ·
 *                    nursing 母婴室 · visitor-center 游客服务中心 · metro 地铁站出入口 · luggage 行李寄存 ·
 *                    police 警务站 · bike 共享单车停放点 · locker 快递柜 · print 打印复印 · pharmacy 药房 · atm ATM
 *   asset-base  素材目录（图标在 facility/ 下，SVG 从 Figma 导出，保留原色）
 *
 * 事件（bubbles + composed）
 *   facility-select → { key, label }
 */
(() => {
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // key → [默认文案, 图标尺寸]；尺寸同 Figma（地铁站 17，公厕 21，其余 20）
  const FACILITIES = {
    parking: ['停车场', 20], toilet: ['公共厕所', 21], charging: ['充电桩', 20], store: ['便利店', 20],
    aed: ['AED', 20], elevator: ['电梯口', 20], nursing: ['母婴室', 20], 'visitor-center': ['游客服务中心', 20],
    metro: ['地铁站出入口', 17], luggage: ['行李寄存', 20], police: ['警务站', 20], bike: ['共享单车停放点', 20],
    locker: ['快递柜', 20], print: ['打印复印', 20], pharmacy: ['药房', 20], atm: ['ATM', 20],
  };
  /** 场景预设，对应 Figma 三排 */
  const PRESETS = {
    regular: 'parking,toilet,charging,store,aed,elevator,nursing',
    attraction: 'visitor-center,toilet,metro,luggage,store,police,bike',
    commute: 'store,locker,elevator,print,bike,pharmacy,atm',
  };

  class AmapFacilityBar extends HTMLElement {
    static get observedAttributes() { return ['items', 'preset', 'asset-base']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }

    get list() {
      const raw = this.getAttribute('items') ?? PRESETS[this.getAttribute('preset')] ?? PRESETS.regular;
      let arr;
      try { arr = raw.trim().startsWith('[') ? JSON.parse(raw) : raw.split(','); } catch { arr = []; }
      return arr
        .map((x) => (typeof x === 'string' ? { key: x.trim() } : x))
        .filter((x) => x && FACILITIES[x.key])
        .map((x) => ({ key: x.key, label: x.label ?? FACILITIES[x.key][0] }));
    }

    render() {
      const base = this.closest('[asset-base]')?.getAttribute('asset-base') ?? '../../assets/';
      const list = this.list;
      this.innerHTML = `
        <ul class="amap-fac" aria-label="附近设施">
          ${list.map((f, i) => {
            const size = FACILITIES[f.key][1];
            return `<li><button type="button" class="amap-fac__chip" data-index="${i}">
              <img class="amap-fac__icon" src="${esc(base)}facility/${f.key}.svg" width="${size}" height="${size}" alt="">
              <span>${esc(f.label)}</span>
            </button></li>`;
          }).join('')}
        </ul>`;
      this.querySelectorAll('.amap-fac__icon').forEach((img) => img.addEventListener('error', () => img.classList.add('is-missing'), { once: true }));
      this.querySelectorAll('.amap-fac__chip').forEach((btn) => btn.addEventListener('click', () => {
        const f = list[Number(btn.dataset.index)];
        this.dispatchEvent(new CustomEvent('facility-select', { bubbles: true, composed: true, detail: f }));
      }));
    }
  }

  if (!customElements.get('amap-facility-bar')) customElements.define('amap-facility-bar', AmapFacilityBar);
})();
