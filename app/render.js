/**
 * 到达页渲染：把意图编排结果（ArrivalIntent.layout）拼成设计系统组件
 * 依赖 app/intent.js 与 components/*（见 index.html 加载顺序）
 * 暴露 window.ArrivalRender.page(state) → 手机屏幕内的 HTML
 */
(() => {
  const I = window.ArrivalIntent;
  const esc = (v) =>
    String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const json = (v) => esc(JSON.stringify(v));
  const A = '../assets/';            // 素材目录（相对 app/index.html）
  const img = (p) => (p ? A + p : '');

  /* ───────── 页头 ───────── */
  function head(s) {
    const h = I.headOf(s);
    const header = s.move === 'taxi'
      ? `<amap-arrival-header variant="taxi" place="${esc(h.place || h.address)}" address="${esc(h.street || '')}"
           provider="${esc(I.RIDE.provider)}" driver="${esc(I.RIDE.driver)}"></amap-arrival-header>`
      : `<amap-arrival-header address="${esc(h.address)}" energy="${esc(h.energy)}"></amap-arrival-header>`;
    return `
      <div class="pg-top${s.move === 'taxi' ? ' is-taxi' : ''}">
        <amap-nav-bar></amap-nav-bar>
        <div class="pg-top__header">${header}</div>
        <amap-facility-bar items="${esc(I.utilOf(s).map((l) => I.FAC_KEY[l]).join(','))}"></amap-facility-bar>
      </div>`;
  }

  /* ───────── 扫街榜卡片 → amap-place-card ───────── */
  const SCENE_OF = { food: 'restaurant', go: 'restaurant', scenic: 'attraction', cafe: 'commute' };
  const CARDS = [];   // 本次渲染的卡片数据，按 data-card 取
  function placeCard(c, i, kind, s, extra = '') {
    const deals = c.deals.map(([type, price, discount, title]) => ({ type, price, discount, title }));
    const attrs = {
      scene: SCENE_OF[kind], rank: i == null ? '' : String(i + 1), name: c.t, distance: c.d,
      score: c.sc, 'score-label': c.sl, details: JSON.stringify([c.cat, c.pp.replace('¥', '￥'), `${c.nav} 人导航过`]),
      ranking: c.rank, status: c.st, image: img(c.img), saves: c.fav, 'image-index': c.pg,
    };
    if (kind === 'scenic' && c.grey) attrs['info-tag'] = c.grey;
    if (kind === 'cafe' && c.grey) attrs.tenure = c.grey;
    if (c.rev) { attrs.review = c.rev; attrs['review-count'] = `${c.rc} 人在说`; }
    if (kind === 'go') attrs['primary-label'] = I.BTN.go;
    if (kind === 'cafe') {
      attrs['deal-more'] = '查看更多';
      const why = (i === 0 && s.grid !== 'high' && c.rec.whyLow) ? c.rec.whyLow : c.rec.why;
      attrs.order = JSON.stringify({ image: img(c.rec.img), title: c.rec.n, tag: why, spec: c.rec.spec, note: c.rec.note,
        price: c.rec.p, actionLabel: '一键下单', swapLabel: c.rec.swap || '换一杯' });
    }
    // 登记卡片数据，点 CTA / 优惠时按这张卡生成下单浮层（app/orders.js）
    const tag = kind === 'cafe' ? ((i === 0 && s.grid !== 'high' && c.rec.whyLow) ? c.rec.whyLow : c.rec.why) : '';
    attrs['data-card'] = String(CARDS.push({ c, kind, tag }) - 1);
    const a = Object.entries(attrs).filter(([, v]) => v !== '' && v != null).map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
    return `<amap-place-card ${a} deals="${json(deals)}" ${extra}></amap-place-card>`;
  }

  const scrollSection = (heading, inner, more) =>
    `<amap-section heading="${esc(heading)}" layout="scroll">${inner}${more ? `<amap-more-card label="${esc(more)}"></amap-more-card>` : ''}</amap-section>`;
  const recommendRow = (keys) => keys.map((k) => {
    const p = I.SPOT[k];
    return `<amap-poi-recommend name="${esc(p.name)}" tag="${esc(p.tag)}" saves="${esc(p.saves)}" tint="${esc(p.tint)}"${p.tintEnd ? ` tint-end="${esc(p.tintEnd)}"` : ''} image="${esc(img(p.image))}"></amap-poi-recommend>`;
  }).join('');
  const nearby = (items) => `<amap-nearby-list items="${json(items.map((x) => ({ ...x, image: img(x.image) })))}"></amap-nearby-list>`;

  /* ───────── 模块 ───────── */
  const R = {
    util: () => '',                                   // 设施入口已在页头区块内
    pay: () => `<div class="pg-pad"><amap-taxi-bill from="汇通太古城英皇之都(西1门)" to="中贸广场 B 座(南门)" amount="18.28"></amap-taxi-bill></div>`,

    shop: (s) => {
      const st = I.POIST[s.poi];
      const c = I.pointOf(s);   // 按时段换店：早餐 / 正餐 / 甜品 / 宵夜
      const closed = s.poi === 'closed';
      const card = placeCard({ ...c, st: closed ? '今日已打烊' : c.st }, null, c.kind, s,
        `layout="single"${closed ? ' closed' : ''}`);
      return `<div class="pg-stack">${st.alert ? `<amap-notice text="${esc(st.alert)}"></amap-notice>` : ''}<div class="pg-pad">${card}</div></div>`;
    },

    top: (s) => {
      const T = I.TOP[I.topKey(s)];
      const cards = I.topCards(s).map((c, i) => placeCard(c, i, T.kind, s)).join('');
      const sub = s.abs === 'point' ? ` subheading="${esc(I.POIST[s.poi].sub)}"` : '';
      return scrollSection(`扫街榜 · ${I.topTitle(s)}`, cards, '看完整\n扫街榜').replace('<amap-section', `<amap-section${sub}`);
    },

    dish: () => `<amap-section heading="当地特色菜" layout="scroll">${I.DISH.map((d) =>
      `<amap-dish-card name="${esc(d.name)}" rank="${d.rank}" stores="${esc(d.stores)}" image="${esc(img(d.image))}"></amap-dish-card>`).join('')}</amap-section>`,

    picks: (s, title = '附近精选', at = null) => scrollSection(title, I.picksOn(s, at).map(({ p, items }) => {
      const list = items.map(([name, meta]) => {
        const [distance, ...details] = meta.split(' | ');
        return { name, distance, details, image: img(I.pickImg(name)) };
      });
      return `<amap-poi-card theme="${I.THEME[p.tint]}" heading="${esc(p.t)}" subtitle="${esc(p.sub)}" items="${json(list)}"></amap-poi-card>`;
    }).join(''), '查看其他榜单'),
    lunch: (s) => R.picks(s, '午休去哪儿', I.LUNCH_AT),

    dwell: (s) => {
      const d = I.dwellOf(s);   // 已按到达时刻过滤掉关门的地点
      return `<div class="pg-dwell">
        <amap-section heading="${esc(I.dwellQ(s))}">
          ${d.short.length ? `<amap-tier-label text="还有 20 分钟" style="--tier-inset: 0"></amap-tier-label>
          ${nearby(d.short)}` : ''}
        </amap-section>
        ${d.long.length ? `<div class="pg-dwell__long">
          <amap-tier-label text="有 1 小时以上"></amap-tier-label>
          ${scrollSection('', recommendRow(d.long), '查看更多')}
        </div>` : ''}</div>`;
    },
    rest: (s) => `<amap-section heading="工作休息出来走走">${nearby(I.restOf(s))}</amap-section>`,
    offwork: (s) => scrollSection('下班好去处', recommendRow(I.offworkOf(s)), '查看更多'),

    fav: () => `<amap-section heading="你的收藏就在附近">${I.FAVS.map((f) =>
      `<amap-place-row name="${esc(f.name)}" distance="${esc(f.distance)}" details="${json(f.details)}" image="${esc(img(f.image))}"></amap-place-row>`).join('')}</amap-section>`,

    bus: (s) => `<amap-section heading="今晚末班车时间" more-label="查看更多"><amap-transit-list items="${json(I.LASTBUS[s.scene])}"></amap-transit-list></amap-section>`,

    drive: (s) => {
      const out = [];
      if (s.city === 'out') out.push(`<amap-section heading="异地限行规则"><amap-restriction-card plate="陕B·*****"
        text="您当前绑定的车辆今日在目的地区域处于限行时段。建议合理规划出行路线，避免进入限行区域。"
        tags='[{"text":"今日限行 7:00 - 20:00","tone":"danger"},{"text":"避开限行路线已规划","tone":"neutral"}]'></amap-restriction-card></amap-section>`);
      if (s.time === 'meal' || s.time === 'night') out.push(`<amap-section heading="代驾服务随时可用"><amap-service-card
        avatar="${img('drive/daijia-avatar.jpg')}" name="高德代驾，8.8 元起叫代驾" meta='["全网比价，抢神券！"]' action-label="去抢券"></amap-service-card></amap-section>`);
      out.push(`<amap-section heading="泊车指引更省心">${I.PARK[s.scene].map(([name, meta]) =>
        `<amap-service-card name="${esc(name)}" meta="${json(meta)}" tags='[{"text":"地面/地下","tone":"outline"},{"text":"车位紧张","tone":"danger"}]' action-label="去停车"></amap-service-card>`).join('')}</amap-section>`);
      out.push(`<amap-section heading="终点5公里内可优惠加油">${I.GAS.map(([name, meta, deal]) =>
        `<amap-service-card badge="团" name="${esc(name)}" meta="${json(meta)}" tags="${json([{ text: deal, tone: 'deal' }, { text: '免费洗车', tone: 'neutral' }])}" action-label="去加油"></amap-service-card>`).join('')}</amap-section>`);
      return out.join('');
    },
  };

  function page(s) {
    CARDS.length = 0;
    const L = I.layout(s);
    const mods = L.filter((k) => k !== 'util').map((k) => {
      const html = R[k](s);
      // 驾车服务内部是多个模块，彼此也是 16 间距，直接展开
      return k === 'drive' ? html.replace(/<amap-section/g, '<amap-section data-mod="drive"') : `<div class="pg-mod" data-mod="${k}">${html}</div>`;
    }).join('');
    return `${head(s)}${mods}`;
  }

  window.ArrivalRender = { page, card: (k) => CARDS[Number(k)] };
})();
