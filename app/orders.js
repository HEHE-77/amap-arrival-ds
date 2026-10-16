/* 下单浮层内容 · 按点开的 POI 卡片生成（Figma 1057:4138 组件库，整屏样例 812:7855 / 812:7856 / 812:7857）
 *
 * ArrivalOrders.forCard(card, state, base, { deal }) → <amap-order-sheet> 标记
 *   card  = { c, kind, tag }：c 为扫街榜卡片数据（app/intent.js），kind 为 food / go / scenic / cafe
 *   deal  = 打开时选中第几条优惠（点卡片上的优惠行时传入），默认 0
 * ArrivalOrders.bind(sheet)：浮层插入页面后调用，处理「换票种 → 日期价格」「换日期 → 场次可选」的联动
 *
 * 规则
 *   · 标题 = 店名，副标题 = 距离 + 可用范围
 *   · 看团购 / 看优惠：选项 = 卡片上的优惠（团 / 券），详情卡按选中项展示内容
 *   · 订门票：票种 = 卡片上的票（+ 少量补充票种），日期从今天起 3 天，场次按当前时段置灰已过场次
 *   · 一键下单：已选商品 = 卡片推荐商品，取餐时间按当前时段推算，加购为该店商品
 *   · 原价由卡片折扣推算（5.6折 → 98 ÷ 0.56；省 2 元 → +2）；满减券为免费领取
 *   · 缺配图处显示「配图待补」
 */
(() => {
  const esc = (v) =>
    String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const json = (v) => esc(JSON.stringify(v));
  const r1 = (n) => Math.round(n * 10) / 10;

  /* ───────── 每家店的补充内容（菜品、规则、已售、场次、加购…）；键 = 卡片店名 ───────── */
  const XIAGONG = {
    rules: '周一至周日可用 · 不可叠加 · 随时退 · 可堂食', summary: '5 道 · 适合 2 人', image: 'order/samples/set-xiagong.jpg',
    groups: [
      { name: '主食', items: [['香辣小龙虾', '×1', '¥86']] },
      { name: '凉菜', items: [['腊牛肉', '1 份', '¥38'], ['糖蒜', '1 碟', '¥6']] },
      { name: '饮品', items: [['冰峰汽水', '×2', '¥10']] },
    ],
  };
  const SHOP = {
    '胡大饭馆 24h（砺街总店）': { where: '11 家门店可用', sold: ['已售 1.2 万', '已售 2.1 万'],
      deals: { 夏宫: XIAGONG,
        满汉全席: { rules: '周一至周日可用 · 需提前一天预约 · 随时退 · 可堂食', summary: '5 道 · 适合 2–3 人', groups: [
          { name: '热菜', items: [['蒜蓉酸辣螃蟹', '×1', '¥88'], ['水煮牛肉', '1 份', '¥58']] },
          { name: '凉菜', items: [['夫妻肺片', '1 份', '¥32']] },
          { name: '主食', items: [['担担面', '×2', '¥20']] }] } } },
    '巷子口砂锅居': { where: '本店可用', sold: ['已售 8600', '已售 3.4 万'],
      deals: {
        双人招牌: { rules: '周一至周日可用 · 需提前一天预约 · 随时退 · 可堂食', summary: '5 道 · 适合 2 人', groups: [
          { name: '砂锅', items: [['招牌羊肉砂锅', '×1', '¥128'], ['酸菜白肉砂锅', '×1', '¥88']] },
          { name: '凉菜', items: [['凉拌木耳', '1 份', '¥18'], ['蒜泥黄瓜', '1 份', '¥16']] },
          { name: '主食', items: [['手工锅盔', '×2', '¥12']] }] },
        午市单人: { image: 'order/samples/xiangzikou-lunch.jpg', rules: '周一至周五 11:00–14:00 可用 · 随时退 · 可堂食', summary: '4 道 · 适合 1 人', groups: [
          { name: '砂锅', items: [['酸菜白肉小砂锅', '×1', '¥58']] },
          { name: '小吃', items: [['卤蛋', '×1', '¥4']] },
          { name: '主食', items: [['米饭', '×1', '¥3']] },
          { name: '饮品', items: [['冰峰汽水', '×1', '¥5']] }] } } },
    '南门口卤味小馆': { where: '本店可用 · 可打包', sold: ['已售 5200', '已售 1.8 万'],
      deals: {
        卤味拼盘: { image: 'order/samples/luwei-platter.jpg', rules: '周一至周日可用 · 可堂食 · 可打包 · 随时退', summary: '4 样 · 适合 2–3 人', groups: [
          { name: '卤味', items: [['卤大肠', '1 份', '¥58'], ['卤猪蹄', '1 只', '¥48'], ['卤鸭翅', '4 只', '¥36'], ['卤豆干', '1 份', '¥18']] }] },
        宵夜: { image: 'order/samples/luwei-night.jpg', rules: '每天 18:00 后可用 · 仅限打包 · 随时退', summary: '5 样 · 适合 4 人', groups: [
          { name: '卤味', items: [['卤鸭脖', '2 根', '¥24'], ['卤鸡爪', '6 只', '¥18'], ['卤藕片', '1 份', '¥12']] },
          { name: '饮品', items: [['冰峰汽水', '×4', '¥20']] }] } } },
    '老孙家泡馍（东大街店）': { where: '3 家门店可用', sold: ['已售 2.6 万', '已售 9800'],
      deals: {
        单人: { image: 'order/samples/laosun-single.jpg', rules: '周一至周日可用 · 随时退 · 可堂食', summary: '3 道 · 适合 1 人', groups: [
          { name: '主食', items: [['优质牛肉泡馍', '×1', '¥58']] },
          { name: '小菜', items: [['糖蒜', '1 碟', '¥6']] },
          { name: '饮品', items: [['冰峰汽水', '×1', '¥5']] }] },
        双人: { image: 'order/samples/laosun-double.jpg', rules: '周一至周日可用 · 随时退 · 可堂食', summary: '5 道 · 适合 2 人', groups: [
          { name: '主食', items: [['羊肉泡馍', '×2', '¥96'], ['腊牛肉夹馍', '×1', '¥22']] },
          { name: '凉菜', items: [['秦镇凉皮', '1 份', '¥16']] },
          { name: '饮品', items: [['冰峰汽水', '×2', '¥10']] }] } } },
    '泡泡玛特城市乐园': { where: '本店可用', image: 'order/samples/popmart.jpg', sold: ['已售 3200', '已领 1.1 万'],
      deals: {
        盲盒: { rules: '到店核销 · 款式随机 · 随时退', summary: '2 件', heading: '包含内容', groups: [
          { name: '商品', items: [['城市限定系列盲盒', '×2', '¥74']] }] },
        满: { rules: '满 200 元可用 · 每人限领 1 张 · 7 天内有效' } } },
    '言几又书店（万象城店）': { where: '本店可用', image: 'order/samples/yanjiyou.jpg', sold: ['已售 1800', '已领 6400'],
      deals: {
        图书: { rules: '周一至周日可用 · 不可叠加 · 随时退', summary: '2 样', heading: '包含内容', groups: [
          { name: '图书', items: [['店内图书任选一本（定价 ¥30 内）', '×1', '¥30']] },
          { name: '饮品', items: [['手冲咖啡', '×1', '¥12']] }] },
        饮品: { rules: '饮品区满 50 元可用 · 每人限领 1 张 · 当日有效' } } },
    '话梅 HARMAY（万象城店）': { where: '本店可用', image: 'order/samples/harmay.jpg', sold: ['已领 2.3 万', '已售 7600'],
      deals: {
        满: { rules: '满 300 元可用 · 每人限领 1 张 · 7 天内有效' },
        旅行装: { rules: '到店自取 · 每人限购 1 份 · 随时退', summary: '3 件', heading: '包含内容', groups: [
          { name: '商品', items: [['洁面旅行装', '×1', ''], ['精华小样', '×1', ''], ['面霜小样', '×1', '']] }] } } },
  };

  // 单店按时段：平时满记甜品、21 点后木屋烧烤（饭点沿用胡大饭馆，早高峰麦当劳见 CAFE）
  Object.assign(SHOP, {
    '满记甜品': { where: '本店可用', sold: ['已售 6800', '已售 1.5 万'],
      deals: {
        双人下午茶: { rules: '周一至周日 14:00–18:00 可用 · 随时退 · 可堂食', summary: '3 样 · 适合 2 人', groups: [
          { name: '甜品', items: [['杨枝甘露', '×1', '¥36'], ['芒果班戟', '×1', '¥32']] },
          { name: '饮品', items: [['港式冻柠茶', '×2', '¥30']] }] },
        单人: { rules: '周一至周日可用 · 随时退 · 可堂食 · 可打包', summary: '2 道 · 适合 1 人', groups: [
          { name: '甜品', items: [['招牌芒果西米捞', '×1', '¥28']] },
          { name: '饮品', items: [['港式冻柠茶', '×1', '¥15']] }] } } },
    '木屋烧烤': { where: '营业至 02:00 · 本店可用', sold: ['已售 9300', '已售 2.2 万'],
      deals: {
        双人: { rules: '每天 17:00–02:00 可用 · 随时退 · 可堂食', summary: '6 样 · 适合 2 人', groups: [
          { name: '烤串', items: [['羊肉串', '×10', '¥60'], ['烤鸡翅', '×4', '¥32'], ['烤韭菜', '1 份', '¥12'], ['烤馒头片', '×4', '¥12']] },
          { name: '饮品', items: [['冰镇啤酒', '×2', '¥24'], ['冰峰汽水', '×2', '¥10']] }] },
        单人: { rules: '每天 21:00 后可用 · 随时退 · 可堂食', summary: '3 样 · 适合 1 人', groups: [
          { name: '烤串', items: [['羊肉串', '×5', '¥30'], ['烤馒头片', '×2', '¥6']] },
          { name: '饮品', items: [['冰镇啤酒', '×1', '¥12']] }] } } },
  });
  // 单店按片区换分店名（胡大饭馆 24h（钟楼店）等），内容沿用总店
  const SCENIC = {
    '西安钟楼': { where: '钟楼盘道东检票口', sold: ['已售 5.2 万', '已售 1.1 万'],
      extra: [{ at: 1, name: '优待票(学生/儿童)', price: 25, sold: '已售 2.4 万' }],
      sessions: [['08:30', '11:30'], ['11:30', '14:30'], ['14:30', '17:30', true], ['17:30', '21:00']],
      notice: ['年龄 18 周岁(不含)~65 周岁(不含) (按生日当天计算)', '随时退｜无需预约'] },
    '西安鼓楼': { where: '鼓楼北侧检票口', sold: ['已售 3.8 万', '已售 1.1 万'],
      sessions: [['08:30', '12:00'], ['12:00', '15:00'], ['15:00', '18:00', true], ['18:00', '21:30']],
      notice: ['1.2 米以下儿童免票，需成人陪同', '随时退｜无需预约'] },
    '西安碑林博物馆': { where: '三学街正门检票口', sold: ['已售 2.7 万', '已售 6300'],
      sessions: [['08:00', '11:00'], ['11:00', '14:00', true], ['14:00', '17:00'], ['17:00', '18:30']],
      notice: ['每周一闭馆（法定节假日除外）', '随时退｜需提前 1 天预约'] },
  };

  const CAFE = {
    '麦当劳': { where: '到店自取', original: 26, prep: 5, unit: '份数', swap: '换一份',
      addons: [
        { name: '脆薯饼', tag: '有 64 人换购', price: 5, original: 9 },
        { name: '热豆浆', tag: '有 31 人换购', price: 4, original: 7 },
        { name: '苹果派', tag: '有 22 人换购', price: 4.9, original: 8 },
        { name: '麦辣鸡翅', tag: '收录 2 年', price: 9.9, original: 15 }] },
    'Grid Coffee（万象城店）': { where: '到店自取', original: 18, prep: 12, unit: '杯数', swap: '换一杯',
      addons: [
        { name: '巴斯克芝士蛋糕', tag: '收录 2 年', price: 5.9, original: 16, image: 'order/samples/basque-cheesecake.jpg' },
        { name: '焦糖奶油布丁', tag: '有 21 人换购', price: 3.9, original: 12, image: 'order/samples/caramel-pudding.jpg' },
        { name: '巧克力曲奇', tag: '有 8 人换购', price: 3.9, original: 16, image: 'order/samples/choco-cookie.jpg' },
        { name: '草莓杯子蛋糕', tag: '收录 2 年', price: 4.9, original: 12, image: 'order/samples/strawberry-cupcake.jpg' }] },
    '早安山丘（银泰 B 座 B1）': { where: '到店自取', original: 26, prep: 8, unit: '份数', swap: '换一份',
      addons: [
        { name: '黄油可颂', tag: '有 36 人换购', price: 6.9, original: 12, image: 'order/samples/croissant.jpg' },
        { name: '肉桂卷', tag: '有 24 人换购', price: 7.9, original: 15, image: 'order/samples/cinnamon-roll.jpg' },
        { name: '海盐碱水结', tag: '有 12 人换购', price: 5.9, original: 10, image: 'order/samples/pretzel.jpg' }] },
    '小面日记（万象天地店）': { where: '到店自取', original: 28, prep: 6, unit: '份数', swap: '换一份',
      addons: [
        { name: '卤蛋', tag: '有 52 人换购', price: 2, original: 3, image: 'order/samples/lu-egg.jpg' },
        { name: '肉夹馍', tag: '收录 2 年', price: 9.9, original: 15, image: 'order/samples/roujiamo.jpg' },
        { name: '秦镇凉皮', tag: '有 18 人换购', price: 7.9, original: 12, image: 'order/samples/liangpi.jpg', tone: 'pink' },
        { name: '冰峰汽水', tag: '有 30 人换购', price: 3, original: 5, image: 'order/samples/bingfeng.jpg', tone: 'success' }] },
  };

  /* ───────── 工具 ───────── */
  // 先按完整店名找，找不到再按品牌（括号前）找：单店按片区换分店名，内容共用
  const brand = (t) => String(t).split('（')[0].trim();
  const store = (map, t) => map[t] || Object.entries(map).find(([k]) => brand(k) === brand(t))?.[1];
  const num = (p) => parseFloat(String(p).replace(/[^\d.]/g, '')) || 0;
  function originalOf(price, disc) {
    const m = String(disc || '').match(/([\d.]+)\s*折/);
    if (m) { const o = price / (Number(m[1]) / 10); return Number.isInteger(price) ? Math.round(o) : r1(o); }   // 原价取整
    const s = String(disc || '').match(/省\s*([\d.]+)/);
    if (s) return r1(price + Number(s[1]));
    return null;
  }
  const isFree = (disc) => /满减/.test(disc || '');
  const shortName = (t) => String(t).split(/[（(｜|]/)[0].trim();
  const dist = (d) => `距你 ${String(d).replace(/^距您\s*/, '')}`;
  const pick = (map, title) => Object.entries(map || {}).find(([k]) => title.includes(k))?.[1] || {};
  const hm = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const fmt = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
  const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayLabel = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${WEEK[d.getDay()]}`;
  const slotNote = (min) => {
    const h = Math.floor(min / 60);
    if (h < 10) return '上班间歇'; if (h < 11) return '上午茶歇'; if (h < 14) return '午餐时间';
    if (h < 17) return '下午茶歇'; if (h < 20) return '晚餐时间'; return '晚间';
  };
  const footer = (price, original, action, tail = '随时退') => {
    const save = original && original > price ? r1(original - price) : 0;
    return `<amap-order-footer price="${esc(r1(price))}"${save ? ` original="${esc(original)}"` : ''} note="${esc([save ? `已优惠 ¥${save}` : '', tail].filter(Boolean).join(' · '))}" data-note-tail="${esc(tail)}" action-label="${esc(action)}"></amap-order-footer>`;
  };
  const sheet = (c, where, kind, inner) =>
    `<amap-order-sheet heading="${esc(c.t)}" subtitle="${esc([dist(c.d), where].filter(Boolean).join(' · '))}" data-order="${kind}">${inner}</amap-order-sheet>`;

  /* ───────── 看团购 / 看优惠 ───────── */
  function groupSheet(c, s, base, sel) {
    const X = store(SHOP, c.t) || {};
    const items = c.deals.map(([type, p, disc, title], i) => {
      const extra = pick(X.deals, title);
      const free = isFree(disc);
      const price = free ? 0 : num(p);
      const groups = (extra.groups || []).map((g) => ({ name: g.name, items: g.items.map(([name, qty, pr]) => ({ name, qty, price: pr })) }));
      return {
        name: title, price, original: free ? null : originalOf(price, disc),
        priceText: free ? '免费领' : undefined, action: free ? '免费领取' : undefined,
        sold: X.sold?.[i] ?? '', badge: i === 0 && c.deals.length > 1 ? '最多人选' : (/午市/.test(title) ? '午市' : ''),
        detail: {
          name: title, image: (extra.image || X.image || c.img) ? base + (extra.image || X.image || c.img) : '',
          rules: extra.rules || (type === '券' ? '全场通用 · 不可叠加 · 随时退' : '周一至周日可用 · 随时退'),
          summary: extra.summary || '', heading: extra.heading || '套餐内容', groups,
        },
      };
    });
    const allCoupon = c.deals.every(([t]) => t === '券');
    const it = items[sel] || items[0];
    const d = it.detail;
    return sheet(c, X.where || '本店可用', 'restaurant', `
      <amap-order-options kind="set" heading="${allCoupon ? '选择优惠' : '选择套餐'}" selected="${items.indexOf(it)}" items="${json(items)}"></amap-order-options>
      <amap-order-set-detail${d.image ? ` image="${esc(d.image)}"` : ''} name="${esc(d.name)}" rules="${esc(d.rules)}" summary="${esc(d.summary)}" heading="${esc(d.heading)}" groups="${json(d.groups)}"></amap-order-set-detail>
      <amap-order-quantity heading="数量" value="1"></amap-order-quantity>
      ${footer(it.price, it.original, it.action || '去下单', it.action ? '' : '随时退')}`);
  }

  /* ───────── 订门票 ───────── */
  function sessionsFor(X, clock, isToday) {
    const now = hm(clock);
    const list = (X.sessions || []).map(([a, b, hot]) => {
      const past = isToday && hm(b) <= now;
      const live = isToday && hm(a) <= now && now < hm(b);
      return { time: `${a}–${b}`, note: past ? '已过场次' : (live ? '马上入园' : '余票充足'), disabled: past, badge: hot && !past ? '最多人选' : '', hot: !!hot };
    });
    return { list, first: list.findIndex((x) => !x.disabled) };
  }
  function scenicSheet(c, s, base, sel, clock) {
    const X = store(SCENIC, c.t) || {};
    let tickets = c.deals.map(([, p, disc, title], i) => {
      const price = num(p);
      return { name: shortName(title), price, original: originalOf(price, disc), off: /折|省/.test(disc) ? disc : '', sold: X.sold?.[i] ?? '' };
    });
    (X.extra || []).forEach((e) => tickets.splice(e.at, 0, { name: e.name, price: e.price, original: e.price, sold: e.sold }));
    tickets[0].badge = '最多人选';
    const t = tickets[c.deals.length > sel ? tickets.findIndex((x) => x.name === shortName(c.deals[sel][3])) : 0] || tickets[0];

    // 今天的场次都已过 → 默认选明天
    const today = sessionsFor(X, clock, true);
    const dayIdx = X.sessions && today.first < 0 ? 1 : 0;
    const ses = dayIdx ? sessionsFor(X, clock, false) : today;
    const base0 = new Date();
    const dates = [0, 1, 2].map((k) => {
      const d = new Date(base0); d.setDate(d.getDate() + k);
      return { date: dayLabel(d), price: t.price, badge: ['今天', '明天', ''][k] };
    });

    return sheet(c, X.where, 'scenic', `
      <amap-order-options kind="ticket" heading="景点门票/联票" selected="${tickets.indexOf(t)}" items="${json(tickets)}"></amap-order-options>
      <amap-order-options kind="date" heading="出游日期" selected="${dayIdx}" more="更多日期" items="${json(dates)}"></amap-order-options>
      ${X.sessions ? `<amap-order-options kind="session" heading="场次" desc="已过场次不可选" selected="${ses.first}" items="${json(ses.list)}" data-clock="${esc(clock)}"></amap-order-options>` : ''}
      <amap-order-quantity heading="数量" value="1"></amap-order-quantity>
      ${X.notice ? `<amap-order-notice lines="${json(X.notice)}" link-label="购买须知"></amap-order-notice>` : ''}
      ${footer(t.price, t.original, '去下单')}`);
  }

  /* ───────── 一键下单 ───────── */
  function quickSheet(c, s, base, tag, clock) {
    const X = store(CAFE, c.t) || { addons: [], prep: 10, unit: '份数', swap: '换一份' };
    const rec = c.rec || {};
    const price = num(rec.p);
    const now = hm(clock);
    const ready = now + (X.prep || 10);
    const s1 = Math.ceil((now + 45) / 30) * 30;
    const pickup = [
      { time: '现在', note: `约 ${fmt(ready)} 可取` },
      { time: fmt(s1), note: slotNote(s1) },
      { time: fmt(s1 + 60), note: slotNote(s1 + 60) },
      { time: '更多', note: '选其他时间' },
    ];
    const tones = ['brand', 'warning', 'success', 'pink'];
    const addons = X.addons.map((a, i) => ({ ...a, image: a.image ? base + a.image : '', tone: a.tone || tones[i % 4] }));
    return sheet(c, X.where || '到店自取', 'quick', `
      <amap-order-item${rec.img ? ` image="${esc(base + rec.img)}"` : ''} name="${esc(rec.n)}" tag="${esc(tag || rec.why || '')}" spec="${esc(String(rec.spec || '').replace(/·/g, ' · '))}" link-label="改规格" swap-label="${esc(X.swap)}"></amap-order-item>
      <amap-order-options kind="pickup" heading="什么时候取" desc="到点做好，不用等" selected="0" items="${json(pickup)}"></amap-order-options>
      ${addons.length ? `<amap-order-addons heading="顺手下单" desc="一起出餐，不用再排" items="${json(addons)}"></amap-order-addons>` : ''}
      <amap-order-payment cups="1" cups-label="${esc(X.unit)}" method="微信支付 (已开通免密支付)"></amap-order-payment>
      <amap-order-terms text="到店出示取餐码 · 下单即同意《服务条款》"></amap-order-terms>
      ${footer(price, X.original, '免密支付')}`);
  }

  /* ───────── 对外 ───────── */
  const CLOCKS = { am: '08:14', meal: '12:30', other: '15:20', night: '21:40' };
  function forCard(card, s = {}, base = 'assets/', opts = {}) {
    const { c, kind, tag } = card;
    const clock = CLOCKS[s.time] || '12:30';
    const sel = Math.max(0, Number(opts.deal) || 0);
    if (kind === 'cafe') return quickSheet(c, s, base, tag, clock);
    if (kind === 'scenic') return scenicSheet(c, s, base, sel, clock);
    return groupSheet(c, s, base, sel);
  }

  /** 景点浮层联动：换票种 → 日期价格；换日期 → 场次（只有今天会置灰已过场次） */
  function bind(el) {
    const ses = el.querySelector('amap-order-options[kind="session"]');
    const date = el.querySelector('amap-order-options[kind="date"]');
    if (!date) return;
    el.addEventListener('option-select', (e) => {
      const { kind, index, item } = e.detail;
      if (kind === 'ticket') {
        date.setAttribute('items', JSON.stringify(date.items.map((d) => ({ ...d, price: item.price }))));
      }
      if (kind === 'date' && ses) {
        const clock = ses.dataset.clock;
        const now = hm(clock);
        const list = ses.items.map((x) => {
          const [a, b] = x.time.split('–');
          const past = index === 0 && hm(b) <= now;
          const live = index === 0 && hm(a) <= now && now < hm(b);
          const hot = x.hot;
          return { time: x.time, note: past ? '已过场次' : (live ? '马上入园' : '余票充足'), disabled: past, badge: !past && hot ? '最多人选' : '', hot };
        });
        const cur = ses.selected;
        ses.setAttribute('items', JSON.stringify(list));
        if (list[cur]?.disabled || cur < 0) ses.setAttribute('selected', String(list.findIndex((x) => !x.disabled)));
      }
    });
  }

  window.ArrivalOrders = { forCard, bind };
})();
