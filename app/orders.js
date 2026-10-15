/* 下单浮层样例数据 · 文案逐字取自 Figma 812:7855 饭店 / 812:7856 景点 / 812:7857 一键下单
 * ArrivalOrders.html(kind, base) → <amap-order-sheet> 标记；base 为素材目录（如 '../assets/'）
 * kind：restaurant（看团购）| scenic（订门票）| quick（一键下单）
 */
(() => {
  const esc = (v) =>
    String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const json = (v) => esc(JSON.stringify(v));

  const SET_DETAIL = (base) => ({
    image: `${base}order/samples/set-xiagong.jpg`,
    name: '【招牌】夏宫双人招牌套餐 (提前预约)',
    rules: '周一至周日可用 · 不可叠加 · 随时退 · 可堂食',
    summary: '5 道 · 适合 2 人',
    groups: [
      { name: '主食', items: [{ name: '香辣小龙虾', qty: '×1', price: '¥86' }] },
      { name: '凉菜', items: [{ name: '腊牛肉', qty: '1 份', price: '¥38' }, { name: '糖蒜', qty: '1 碟', price: '¥6' }] },
      { name: '饮品', items: [{ name: '冰峰汽水', qty: '×2', price: '¥10' }] },
    ],
  });

  const DATA = {
    restaurant: (base) => {
      const detail = SET_DETAIL(base);
      const sets = [
        { name: '【招牌】夏宫双人招牌套餐 (提前预约)', price: 98, original: 136, sold: '已售 1.2 万', badge: '最多人选', detail },
        { name: '3–4 人欢聚宴', price: 228, original: 298, sold: '已售 2100',
          detail: { name: '3–4 人欢聚宴', rules: '周一至周日可用 · 不可叠加 · 随时退 · 可堂食', image: detail.image } },
        { name: '单人工作日午餐', price: 32, original: 42, sold: '已售 4300', badge: '午市',
          detail: { name: '单人工作日午餐', rules: '周一至周五 11:00–14:00 可用 · 随时退', image: detail.image } },
        { name: '100 元代金券', price: 88, original: 100, sold: '已售 2.1 万',
          detail: { name: '100 元代金券', rules: '全场通用 · 不可叠加 · 随时退', image: detail.image } },
      ];
      return `
        <amap-order-sheet heading="胡大饭馆 24h (砺街总店)" subtitle="距你 32m · 11 家门店可用" data-order="restaurant">
          <amap-order-options kind="set" heading="选择套餐" selected="0" items="${json(sets)}"></amap-order-options>
          <amap-order-set-detail image="${esc(detail.image)}" name="${esc(detail.name)}" rules="${esc(detail.rules)}" summary="${esc(detail.summary)}" groups="${json(detail.groups)}"></amap-order-set-detail>
          <amap-order-quantity heading="数量" value="1"></amap-order-quantity>
          <amap-order-footer price="98" original="136" note="已优惠 ¥38 · 随时退" action-label="去下单"></amap-order-footer>
        </amap-order-sheet>`;
    },

    scenic: () => {
      const tickets = [
        { name: '成人票', price: 40, original: 42, off: '省 2 元', sold: '已售 5.2 万', badge: '最多人选' },
        { name: '优待票(学生/儿童)', price: 25, original: 25, sold: '已售 2.4 万' },
        { name: '钟鼓楼联票', price: 50, original: 62.5, off: '8.0折', sold: '已售 1.1 万' },
      ];
      const dates = [
        { date: '10-07 周三', price: 40, badge: '今天' },
        { date: '10-08 周四', price: 40, badge: '明天' },
        { date: '10-09 周五', price: 40 },
      ];
      const sessions = [
        { time: '08:30–11:30', note: '已过场次', disabled: true },
        { time: '11:30–14:30', note: '已过场次', disabled: true },
        { time: '14:30–17:30', note: '马上入园', badge: '最多人选' },
        { time: '17:30–21:00', note: '余票充足' },
      ];
      return `
        <amap-order-sheet heading="西安钟楼" subtitle="距你 32m · 钟楼盘道东检票口" data-order="scenic">
          <amap-order-options kind="ticket" heading="景点门票/联票" selected="0" items="${json(tickets)}"></amap-order-options>
          <amap-order-options kind="date" heading="出游日期" selected="0" more="更多日期" items="${json(dates)}"></amap-order-options>
          <amap-order-options kind="session" heading="场次" desc="已过场次不可选" selected="2" items="${json(sessions)}"></amap-order-options>
          <amap-order-quantity heading="数量" value="1"></amap-order-quantity>
          <amap-order-notice lines="${json(['年龄 18 周岁(不含)~65 周岁(不含) (按生日当天计算)', '随时退｜无需预约'])}" link-label="购买须知"></amap-order-notice>
          <amap-order-footer price="40" original="42" note="已优惠 ¥2 · 随时退" action-label="去下单"></amap-order-footer>
        </amap-order-sheet>`;
    },

    quick: (base) => {
      const pickup = [
        { time: '现在', note: '约 08:56 可取' },
        { time: '09:30', note: '上班间歇' },
        { time: '10:30', note: '上午茶歇' },
        { time: '更多', note: '选其他时间' },
      ];
      const addons = [
        { name: '巴斯克芝士蛋糕', tag: '收录 2 年', price: 5.9, original: 16, image: `${base}order/samples/basque-cheesecake.jpg`, tone: 'brand' },
        { name: '焦糖奶油布丁', tag: '有 21 人换购', price: 3.9, original: 12, image: `${base}order/samples/caramel-pudding.jpg`, tone: 'warning' },
        { name: '巧克力曲奇', tag: '有 8 人换购', price: 3.9, original: 16, image: `${base}order/samples/choco-cookie.jpg`, tone: 'success' },
      ];
      return `
        <amap-order-sheet heading="Grid Coffee (万象城店)" subtitle="距你 32m · 11 家门店可用" data-order="quick">
          <amap-order-item image="${esc(`${base}restaurant/samples/order-oat-latte.jpg`)}" name="燕麦拿铁" tag="上次那杯" spec="大杯 · 少冰 · 标准糖" link-label="改规格" swap-label="换一杯"></amap-order-item>
          <amap-order-options kind="pickup" heading="什么时候取" desc="到点做好，不用等" selected="0" items="${json(pickup)}"></amap-order-options>
          <amap-order-addons heading="顺手下单" desc="一起出餐，不用再排" items="${json(addons)}"></amap-order-addons>
          <amap-order-payment cups="1" method="微信支付 (已开通免密支付)"></amap-order-payment>
          <amap-order-terms text="到店出示取餐码 · 下单即同意《服务条款》"></amap-order-terms>
          <amap-order-footer price="9.9" original="18" note="已优惠 ¥8.1 · 随时退" action-label="免密支付"></amap-order-footer>
        </amap-order-sheet>`;
    },
  };

  window.ArrivalOrders = {
    kinds: Object.keys(DATA),
    html: (kind, base = 'assets/') => (DATA[kind] ? DATA[kind](base) : ''),
  };
})();
