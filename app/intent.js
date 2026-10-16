/**
 * 到达页意图编排 · 规则与数据
 * 来源：《高德到达页信息优先级模拟器 v17.2》（意图识别表）。维度、编排规则与文案按原表移植；
 * 能在 Figma 三张整页（812:7852 / 812:7853 / 812:7854）里找到的内容，以 Figma 为准（距离、图片、线路色等）。
 *
 * 暴露 window.ArrivalIntent = { DIM, SCENE, PRESET, state(), layout(s), modules: {...数据}, ... }
 */
(() => {
  /* ───────── 维度（左侧面板） ───────── */
  const SCENE = {
    shop:    { n: '开车去商场',       short: '商场 · 消费',   figma: '812:7852',
               preset: { move: 'car',   grid: 'mid',  city: 'in',  abs: 'area', time: 'meal',  fav: 'no',  poi: 'ok' } },
    explore: { n: '外地游客到钟楼',   short: '景区 · 体验',   figma: '812:7853',
               preset: { move: 'metro', grid: 'low',  city: 'out', abs: 'area', time: 'other', fav: 'yes', poi: 'ok' } },
    commute: { n: '上班族打车到公司', short: '写字楼 · 通勤', figma: '812:7854',
               preset: { move: 'taxi',  grid: 'high', city: 'in',  abs: 'area', time: 'am',    fav: 'no',  poi: 'ok' } },
  };
  const DIM = {
    move: { label: 'L1 出行方式', hint: '决定付款卡、末班车、工具条首项、驾车服务',
            opts: { car: '自驾', slow: '骑行 / 步行', metro: '公交地铁', taxi: '打车' } },
    grid: { label: 'L2 到访频次', hint: '近 90 天该 1km 网格到访次数，决定附近精选与「上次那杯」',
            opts: { low: '0–1 次（首次到访）', mid: '2–3 次（偶尔来）', high: '≥4 次（常去地点）' } },
    city: { label: 'L2 常驻城市', hint: '决定当地特色菜、酒店榜、首张前置、异地限行',
            opts: { out: '非常驻城市', in: '常驻城市内' } },
    // 终点类型：前三项是 AOI 片区（决定页头、扫街榜、周边推荐）；餐饮单店沿用当前片区
    dest: { label: 'L3 终点类型', hint: '商场 / 景区 / 写字楼为 AOI 片区；餐饮单店为 POI，沿用当前片区',
            opts: { shop: '商场（AOI）', explore: '景区（AOI）', commute: '写字楼（AOI）', point: '餐饮单店（POI）' } },
    poi:  { label: 'L3 到店状态', hint: '仅餐饮单店，决定扫街榜 TOP 3 是否被唤起',
            opts: { ok: '正常营业', queue: '排队 90 分钟', closed: '今日已打烊' } },
    time: { label: 'L4 时段', hint: '决定单店、TOP 3 标题、还能待多久、末班车、通勤时间线；已关门的地点不推荐',
            opts: { am: '早高峰', meal: '饭点（午 / 晚餐）', other: '平时', night: '21 点后' } },
    fav:  { label: 'L5 收藏', hint: '命中时出「你的收藏就在附近」，位于驾车服务之前',
            opts: { no: '附近无我的收藏', yes: '我收藏过的店就在附近' } },
  };
  const CLOCK = { am: '8:14', meal: '12:30', other: '15:20', night: '21:40' };
  const POIST = {
    ok:     { blocked: false },
    queue:  { blocked: true, alert: '当前等位 42 桌 · 约 90 分钟', sub: '等位太久？这三家不用等' },
    closed: { blocked: true, alert: '今日已打烊 · 明天 10:00 开始营业', sub: '今天打烊了，这三家还开着' },
  };

  /* ───────── 页头 ───────── */
  const HEAD = {
    shop:    { area:  { address: '长安南路 289 号 · 西安万象城(生命之树)', energy: '28' },
               point: { address: '胡大饭馆 24h（砺街总店）· 碑林区砺街 18 号', energy: '28' } },
    explore: { area:  { address: '地铁2号线 · 钟楼(地铁站)', energy: '54' } },
    commute: { area:  { address: '中贸广场 B 座 · 长安南路 79 号', energy: '28', place: '中贸广场 B 座', street: '长安南路 79 号' } },
  };
  const headOf = (s) => {
    const area = HEAD[s.scene].area;
    if (s.abs !== 'point') return area;
    const p = pointOf(s);
    return { address: `${p.t} · ${p.address}`, energy: area.energy, place: p.t, street: p.address };
  };
  const RIDE = { provider: '享道-经济型', driver: '何师傅·陕 AA01306' };

  /* ───────── 周边服务工具条（label → facility-bar key） ───────── */
  const FAC_KEY = { '停车场': 'parking', '充电桩': 'charging', '公共厕所': 'toilet', '便利店': 'store', 'AED': 'aed', '电梯口': 'elevator',
    '母婴室': 'nursing', '游客服务中心': 'visitor-center', '地铁站出入口': 'metro', '行李寄存': 'luggage', '警务站': 'police',
    '共享单车停放点': 'bike', '快递柜': 'locker', '打印复印': 'print', '药房': 'pharmacy', 'ATM': 'atm' };
  const UTIL_MOVE = { car: ['停车场', '充电桩'], slow: ['共享单车停放点'], metro: ['地铁站出入口'], taxi: [] };
  const UTIL_SCENE = {
    shop: ['公共厕所', '便利店', 'AED', '电梯口', '母婴室'],
    explore: ['游客服务中心', '公共厕所', '行李寄存', '便利店', '警务站', '共享单车停放点'],
    commute: ['便利店', '快递柜', '电梯口', '打印复印', '药房', '共享单车停放点', 'ATM'],
  };
  const utilOf = (s) => {
    const a = UTIL_MOVE[s.move].slice();
    UTIL_SCENE[s.scene].forEach((x) => { if (!a.includes(x)) a.push(x); });
    return a;
  };

  /* ───────── 扫街榜 TOP 3 ─────────
   * kind: food 看团购 · scenic 订门票 · cafe 一键下单 · go 看优惠 */
  const IMG = 'restaurant/samples/';
  const TOP = {
    shop_eat: { kind: 'food', cards: [
      { t: '胡大饭馆 24h（砺街总店）', d: '<100 米', sc: '4.8', sl: '超棒', cat: '川菜', pp: '¥150/人', nav: '3652', fav: '10.7w+', pg: '1/12', img: IMG + 'huda-fanguan.jpg',
        rank: '碑林区川菜榜 · 第 1 名', st: '营业中', rev: '关晓彤推荐来的！冲他家的蒜蓉酸辣螃蟹…', rc: 252,
        deals: [['团', '98', '5.6折', '夏宫双人招牌套餐（需提前预约）'], ['券', '88', '8.8折', '100 元代金券']] },
      { t: '巷子口砂锅居', d: '180 米', sc: '4.8', sl: '超棒', cat: '砂锅菜', pp: '¥52/人', nav: '1287', fav: '3.6w+', pg: '1/18', img: IMG + 'xiangzikou-shaguo.jpg',
        rank: '专程前往家常菜榜 · 第 1 名', st: '营业中', rev: '汤清如水却滋味十足，羊肉炖…', rc: 210,
        deals: [['团', '151', '4.6折', '双人招牌套餐（提前一天预约）'], ['团', '68', '7.8折', '工作日午市单人套餐']] },
      { t: '南门口卤味小馆', d: '450 米', sc: '4.7', sl: '超棒', cat: '卤味熟食', pp: '¥45/人', nav: '986', fav: '1.2w+', pg: '1/10', img: IMG + 'nanmenkou-luwei.jpg',
        rank: '烟火小店榜 · 第 2 名', st: '营业中', rev: '打包回家当宵夜刚好，卤大肠…', rc: 198,
        deals: [['团', '88', '4.8折', '招牌卤味拼盘'], ['团', '45', '6.6折', '四人份宵夜打包装']] }] },
    shop_go: { kind: 'go', cards: [
      { t: '泡泡玛特城市乐园', d: '200 米', sc: '4.7', sl: '超棒', cat: '潮玩', pp: '¥80/人', nav: '1.2w+', fav: '3.4w+', pg: '1/14',
        rank: '雁塔区潮玩榜 · 第 1 名', st: '营业中', rev: '限定款只有这家有，排队…', rc: 176,
        deals: [['券', '59', '8.0折', '城市限定盲盒两件套'], ['券', '20', '满减', '满 200 减 20 店铺券']] },
      { t: '言几又书店（万象城店）', d: '260 米', sc: '4.6', sl: '很棒', cat: '书店', pp: '¥35/人', nav: '8600', fav: '2.1w+', pg: '1/9',
        rank: '雁塔区书店榜 · 第 2 名', st: '营业中', rev: '下午坐一坐，咖啡区很安静…', rc: 132,
        deals: [['团', '29', '7.0折', '图书 + 手冲咖啡套餐'], ['券', '15', '满减', '饮品满 50 减 15']] },
      { t: '话梅 HARMAY（万象城店）', d: '120 米', sc: '4.7', sl: '超棒', cat: '美妆集合', pp: '¥120/人', nav: '5200', fav: '1.9w+', pg: '1/11',
        rank: '雁塔区美妆榜 · 第 3 名', st: '营业中', rev: '小样区可以随便试，逛很久…', rc: 98,
        deals: [['券', '30', '满减', '满 300 减 30'], ['团', '9.9', '', '旅行装三件体验']] }] },
    explore: { kind: 'scenic', cards: [
      { t: '西安钟楼', d: '<100 米', sc: '4.8', sl: '超棒', cat: '古建登楼', pp: '¥40/人', nav: '4.5w+', fav: '34.7w+', pg: '1/12', img: IMG + 'xian-bell-tower.jpg',
        rank: '2026 上榜景区', grey: '西安的市中心', st: '正在开放', rev: '中国现存最大且保存最完整的…', rc: 198,
        deals: [['票', '40', '省 2 元', '钟楼成人票（当日有效，刷身份证）'], ['票', '50', '8.0折', '钟鼓楼联票｜两天内分次使用']] },
      { t: '西安鼓楼', d: '350 米', sc: '4.8', sl: '超棒', cat: '古建登楼', pp: '¥35/人', nav: '2.3w+', fav: '26.5w+', pg: '1/12', img: IMG + 'xian-drum-tower.jpg',
        rank: '2026 上榜景区', grey: '晨钟暮鼓', st: '正在开放', rev: '中国现存最大的明代鼓楼，屹…', rc: 252,
        deals: [['票', '30', '7.5折', '鼓楼成人票（当日有效，刷身份证）'], ['票', '50', '8.0折', '钟鼓楼联票｜两天内分次使用']] },
      { t: '西安碑林博物馆', d: '859 米', sc: '4.5', sl: '很好', cat: '千年碑文', pp: '¥35/人', nav: '2.3w+', fav: '13.6w+', pg: '1/10', img: IMG + 'beilin-museum.jpg',
        rank: '2026 上榜景区', grey: '国家一级博物馆', st: '正在开放', rev: '北院门街穿过鼓楼门洞就是，…', rc: 252,
        deals: [['团', '78', '省 2 元', '景区门票（成人票）'], ['团', '21 起', '6.7折', '拼团人工讲解服务（不限人群票）']] }] },
    commute: { kind: 'cafe', cards: [
      { t: 'Grid Coffee（万象城店）', d: '<100 米', sc: '4.8', sl: '超棒', cat: '奶茶/甜品', pp: '¥27/人', nav: '662', fav: '4.7k+', pg: '1/12', img: IMG + 'grid-coffee.jpg',
        rank: '雁塔区咖啡榜 · 第 2 名', grey: '收录 2 年', st: '正在营业',
        deals: [['团', '9.9', '6.7折', '大杯葡萄冷萃美式']],
        rec: { n: '燕麦拿铁', why: '上次那杯', whyLow: '店长推荐', spec: '大杯·少冰·标准糖', note: '｜随时退｜不限购', p: '9.9', img: IMG + 'order-oat-latte.jpg' } },
      { t: '早安山丘（银泰 B 座 B1）', d: '<100 米', sc: '4.7', sl: '很棒', cat: '奶茶/甜品', pp: '¥27/人', nav: '462', fav: '3.7k+', pg: '1/12', img: IMG + 'zaoan-shanqiu.jpg',
        rank: '雁塔区面包榜 · 第 8 名', grey: '收录 2 年', st: '正在营业',
        deals: [['团', '21', '7.6折', '可颂两件 + 现磨豆浆']],
        rec: { n: '三明治 + 中杯拿铁', why: '最多人购买', spec: '含推荐菜', note: '｜随时退｜不限购', p: '12.9', img: IMG + 'order-sandwich-latte.jpg' } },
      { t: '小面日记（万象天地店）', d: '150 米', sc: '4.6', sl: '很棒', cat: '当地小吃', pp: '¥27/人', nav: '462', fav: '1.6k+', pg: '1/10', img: IMG + 'xiaomian-riji.jpg',
        rank: '雁塔区小吃榜 · 第 3 名', grey: '收录 2 年', st: '正在营业',
        deals: [['团', '15', '4.6折', '招牌小面 + 卤蛋']],
        rec: { n: '小面 + 豆腐脑早餐组', why: '最多收藏', spec: '含推荐菜', note: '｜随时退｜不限购', p: '18.9', img: IMG + 'order-xiaomian-doufunao.jpg' } }] },
  };
  /* 单 POI 到达：这家店本身（Figma 858:6486）；饭点为胡大饭馆，其他时段见 POINT */
  const POICARD = { t: '胡大饭馆 24h（砺街总店）', d: '距您 62 米', sc: '4.8', sl: '超棒', cat: '川菜', pp: '¥150/人', nav: '3652', fav: '10.7w+', pg: '1/12',
    img: IMG + 'huda-fanguan-wide.jpg', rank: '碑林区川菜榜单 · 第 1 名', st: '营业中', rev: '关晓彤推荐来的！冲他家的蒜蓉酸辣螃蟹…', rc: 252,
    deals: [['团', '98', '5.6折', '夏宫双人招牌套餐（提前一天预约）'], ['团', '128', '6.8折', '满汉全席招牌套餐（提前一天预约）']] };
  const TOP_SPARE = { t: '老孙家泡馍（东大街店）', d: '520 米', sc: '4.7', sl: '超棒', cat: '泡馍', pp: '¥48/人', nav: '2210', fav: '5.2w+', pg: '1/14', img: IMG + 'laosunjia.jpg',
    rank: '碑林区陕菜榜 · 第 2 名', st: '营业中', rev: '掰馍掰到手酸，汤是真的鲜…', rc: 176,
    deals: [['团', '58', '7.2折', '单人泡馍套餐'], ['团', '108', '6.9折', '双人优选套餐']] };
  /* 单 POI 到达按时段换店（真实品牌，分店名按所在片区）：早高峰麦当劳早餐 · 饭点胡大饭馆 · 平时满记甜品 · 21 点后木屋烧烤 */
  const BRANCH = {
    shop:    { tag: '万象城店', addr: '长安南路 289 号 · 西安万象城 B1', d: '距您 62 米' },
    explore: { tag: '钟楼店',   addr: '东大街 1 号 · 钟楼饭店 1 层',    d: '距您 80 米' },
    commute: { tag: '中贸广场店', addr: '长安南路 79 号 · 中贸广场 1 层', d: '距您 45 米' },
  };
  const POINT = {
    am: { brand: '麦当劳', kind: 'cafe', sc: '4.6', sl: '很棒', cat: '快餐 · 早餐', pp: '¥25/人', nav: '2310', fav: '8.2k+', pg: '1/9',
      rank: '雁塔区早餐榜 · 第 1 名', st: '营业中', rev: '早上赶时间，手机下单到店就能拿…', rc: 186, open: '06:00-23:00',
      deals: [['团', '13.9', '5.3折', '猪柳蛋麦满分 + 薯饼 + 中杯拿铁']],
      rec: { n: '猪柳蛋麦满分套餐', why: '上次那份', whyLow: '早餐热卖', spec: '猪柳蛋麦满分·薯饼·中杯拿铁', note: '｜随时退｜不限购', p: '13.9', img: '', swap: '换一份' } },
    meal: { brand: '胡大饭馆 24h', kind: 'food', ...POICARD, open: '00:00-24:00' },
    other: { brand: '满记甜品', kind: 'food', sc: '4.7', sl: '超棒', cat: '甜品', pp: '¥38/人', nav: '1460', fav: '2.3w+', pg: '1/10',
      rank: '雁塔区甜品榜 · 第 2 名', st: '营业中', rev: '杨枝甘露料很足，下午来不用排队…', rc: 143, open: '10:00-22:30',
      deals: [['团', '49', '6.2折', '杨枝甘露 + 芒果班戟双人下午茶'], ['团', '25', '7.5折', '单人招牌甜品套餐']] },
    night: { brand: '木屋烧烤', kind: 'food', sc: '4.6', sl: '很棒', cat: '烧烤 · 宵夜', pp: '¥95/人', nav: '1890', fav: '1.6w+', pg: '1/11',
      rank: '雁塔区宵夜榜 · 第 1 名', st: '营业至 02:00', rev: '凌晨还很热闹，羊肉串现烤…', rc: 208, open: '16:00-02:00',
      deals: [['团', '128', '6.4折', '夜宵双人烤串套餐'], ['团', '68', '7.6折', '单人宵夜烤串 + 啤酒']] },
  };
  /** 当前时段、当前片区的到达单店（卡片数据 + 店名 / 地址） */
  const pointOf = (s) => {
    const p = POINT[s.time] || POINT.meal;
    const b = BRANCH[s.scene] || BRANCH.shop;
    if (s.time === 'meal' && s.scene === 'shop') return { ...p, address: '碑林区砺街 18 号' };   // Figma 原稿
    const name = s.time === 'meal' ? `胡大饭馆 24h（${b.tag}）` : `${p.brand}（${b.tag}）`;
    return { ...p, t: name, d: b.d, address: b.addr, img: s.time === 'meal' ? p.img : '' };
  };
  const brandOf = (t) => String(t).split('（')[0];
  // 单店受阻时 TOP 3 也按时段：早高峰 / 平时 → 咖啡早餐（一键下单），饭点 / 21 点后 → 正餐
  const topKey = (s) => {
    if (s.abs === 'point') return (s.time === 'am' || s.time === 'other') ? 'commute' : 'shop_eat';
    return s.scene === 'shop' ? ((s.time === 'meal' || s.time === 'night') ? 'shop_eat' : 'shop_go') : s.scene;
  };
  const topCards = (s) => {
    const arr = TOP[topKey(s)].cards;
    if (s.abs !== 'point') return arr;
    const self = brandOf(pointOf(s).t);
    return arr.filter((c) => brandOf(c.t) !== self).concat([TOP_SPARE]).slice(0, 3);
  };
  const topTitle = (s) => {
    if (s.abs === 'point') return '猜你想吃';
    if (s.scene === 'commute' && s.grid === 'high') return '中贸商圈';
    if (s.scene === 'commute') return (s.time === 'am' || s.time === 'meal') ? '猜你想吃' : '猜你想去';
    if (s.scene === 'shop') return topKey(s) === 'shop_eat' ? '猜你想吃' : '猜你想逛';
    return '猜你想去';
  };
  const BTN = { food: '看团购', scenic: '订门票', go: '看优惠', cafe: '一键下单' };

  /* ───────── 还能待多久（短档用 Figma 的距离文案） ───────── */
  const NB = 'nearby/samples/';
  const PR = 'poi-recommend/samples/';
  const DWELL = {
    shop: { q: { am: null, meal: '吃完还能待多久？', other: '还打算逛多久？', night: '逛到这个点，还想待会儿吗？' },
      short: [{ name: '生命之树', distance: '距您 200 米', details: ['免费', '22:00 关'], image: NB + 'shengming-zhi-shu.jpg' },
              { name: '西安电视塔', distance: '距您 580 米', details: ['登塔 ¥50', '20:00 关'], image: NB + 'xian-tv-tower.jpg' }],
      long: ['datang', 'xiying', 'shaanxi'] },
    explore: { q: { am: '今天打算逛多久？', meal: '吃完接着逛？', other: '逛完还能待多久？', night: '夜场还能去哪？' },
      short: [{ name: '秦腔艺术博物馆', distance: '距您 200 米', details: ['门票 ¥20', '22:00 关'], image: NB + 'qinqiang-museum.jpg' },
              { name: '粉巷', distance: '距您 580 米', details: ['免费', '2:00 关'], image: NB + 'fenxiang.jpg' }],
      long: ['sajinqiao', 'yongningmen', 'huimin'] },
    commute: { rest: [{ name: '星巴克臻选店', distance: '距您 150 米', details: ['安静', '21:00 关'], image: NB + 'starbucks-reserve.jpg' },
                      { name: '小雁塔广场', distance: '距您 380 米', details: ['免费', '有长椅'], image: NB + 'xiaoyanta-square.jpg' }] },
  };
  /* 图片推荐卡（poi-recommend），tint 取自 Figma 各实例 */
  const SPOT = {
    datang:     { name: '大唐不夜城',     tag: '特色街区', saves: '44.6w+人收藏', tint: '#936B3B', tintEnd: '#93543B', image: PR + 'datang-buyecheng.jpg' },
    xiying:     { name: '西影电影园区',   tag: '特色街区', saves: '10.2w+人收藏', tint: '#23406D', image: PR + 'xiying-film-park.jpg' },
    shaanxi:    { name: '陕西历史博物馆', tag: '文物古迹', saves: '30.9w+人收藏', tint: '#3A4A4C', image: PR + 'shaanxi-history-museum.jpg' },
    sajinqiao:  { name: '洒金桥美食街',   tag: '特色街区', saves: '40.6w+人收藏', tint: '#23406D', image: PR + 'sajinqiao-food-street.jpg' },
    yongningmen:{ name: '永宁门',         tag: '文物古迹', saves: '36.1w+人收藏', tint: '#892929', tintEnd: '#894129', image: PR + 'yongningmen.jpg' },
    huimin:     { name: '回民街',         tag: '文化街区', saves: '20.7w+人收藏', tint: '#2D3157', tintEnd: '#2D3A57', image: PR + 'huimin-street.jpg' },
    tuode:      { name: '拓得时代训练馆', tag: '运动健身', saves: '1.1k+人收藏',  tint: '#202C50', image: PR + 'tuode-gym.jpg' },
    yisushe:    { name: '易俗社文化街区', tag: '文化街区', saves: '2.7w+人收藏',  tint: '#915C5C', image: PR + 'yisushe.jpg' },
    changan:    { name: '长安书院',       tag: '文化街区', saves: '4.1w+人收藏',  tint: '#6D5023', image: PR + 'changan-academy.jpg' },
  };
  const OFFWORK = ['tuode', 'yisushe', 'changan'];

  /* ───────── 当地特色菜 ───────── */
  const DS = 'dish/samples/';
  const DISH = [['葫芦鸡', 1, 91, 'hulu-ji'], ['水盆羊肉', 2, 67, 'shuipen-yangrou'], ['小酥肉', 3, 45, 'xiao-surou'],
    ['锅盔夹馍', 4, 40, 'guokui-jiamo'], ['浆水鱼鱼', 5, 37, 'jiangshui-yuyu'], ['麻辣烫', 6, 29, 'malatang']]
    .map(([name, rank, n, img]) => ({ name, rank, stores: `${n}家店入选`, image: DS + img + '.jpg' }));

  /* ───────── 附近精选：高德榜单（poi-card） ─────────
   * tint → poi-card theme：peach→orange · blue→blue · mint→green · pink→pink · sun→amber · lav→purple */
  const THEME = { peach: 'orange', blue: 'blue', mint: 'green', pink: 'pink', sun: 'amber', lav: 'purple', hotel: 'indigo' };
  const PS = 'poi/samples/';
  const PICK_IMG = [['老白家', 'laobai-hulatang'], ['甑糕', 'zhubashi-zenggao'], ['隐庐', 'yinlu-kaiseki'], ['翠园', 'cuiyuan-dimsum'],
    ['油茶麻花', 'youcha-mahua'], ['老焦', 'laojiao-dabing'], ['洒金桥菜市', 'sajinqiao-market'], ['德福巷', 'defuxiang-cafe'],
    ['亚朵', 'atour-hotel'], ['CitiGO', 'citigo-hotel'], ['Arabica', 'arabica'], ['喜茶', 'heytea'], ['松筋堂', 'songjintang'],
    ['筋膜', 'jinmo-lab'], ['巷子里的面', 'xiangzi-noodle'], ['松川', 'songchuan-tang'], ['Manner', 'manner'], ['蓝瓶', 'blue-bottle'],
    ['老陕面馆', 'laoshan-noodle'], ['凉皮铺', 'liangpi-shop'], ['全季', 'ji-hotel'], ['奈雪', 'naixue'],
    ['南稍门手工面', 'nanshaomen-noodle'], ['中贸后街肉夹馍', 'zhongmao-roujiamo'], ['桔子水晶', 'orange-crystal-hotel']];
  const pickImg = (name) => { const m = PICK_IMG.find(([k]) => name.includes(k)); return m ? PS + m[1] + '.png' : ''; };
  const PICK = {
    fire:    { src: '烟火小店榜', t: '藏在街巷的烟火气', sub: '精选 13 个热门店铺', tint: 'peach', food: true, items: {
      shop: [['老白家肉丸胡辣汤', '距您 250 米 | 人均 ¥18'], ['竹笆市甑糕', '距您 780 米 | 人均 ¥15']],
      explore: [['老白家肉丸胡辣汤', '距您 250 米 | 人均 ¥18'], ['竹笆市甑糕', '距您 780 米 | 人均 ¥15']],
      commute: [['张记炒饭', '距您 320 米 | 人均 ¥22'], ['望京小面', '距您 410 米 | 人均 ¥20']] } },
    quality: { src: '品质甄选榜', t: '臻选好店品质生活', sub: '精选 8 个热门店铺', tint: 'blue', food: true, items: {
      shop: [['隐庐 · 会席料理', '距您 320 米 | 人均 ¥328 | 4.9 分'], ['翠园 · 粤式茶餐厅', '距您 485 米 | 人均 ¥168 | 4.8 分']],
      commute: [['隐庐 · 会席料理', '距您 1.2 公里 | 人均 ¥328'], ['翠园 · 粤式茶餐厅', '距您 1.6 公里 | 人均 ¥168']] } },
    trip:    { src: '专程前往榜', t: '值得专程去吃一趟', sub: '精选 10 个热门店铺', tint: 'mint', food: true, items: {
      shop: [['建国路油茶麻花', '距您 60 米 | 现炸'], ['老焦熏肉大饼', '距您 160 米 | 现烤']],
      explore: [['建国路油茶麻花', '距您 60 米 | 现炸'], ['老焦熏肉大饼', '距您 160 米 | 现烤']] } },
    local:   { src: '本地人爱去榜', t: '本地人都在吃什么', sub: '精选 10 个热门店铺', tint: 'pink', food: true, items: {
      explore: [['洒金桥菜市', '距您 476 米 | 游客少'], ['德福巷咖啡街', '距您 508 米 | 坐得住']],
      shop: [['小寨老陕面馆', '距您 520 米 | 本地人多'], ['长安南路凉皮铺', '距您 380 米 | 游客少']],
      commute: [['南稍门手工面', '距您 430 米 | 本地人多'], ['中贸后街肉夹馍', '距您 260 米 | 游客少']] } },
    hotel:   { src: '酒店榜', t: '舒适好住品质之选', sub: '精选 10 家热门酒店', tint: 'hotel', food: false, outOnly: true, items: {
      explore: [['亚朵酒店（朱雀大街店）', '距您 980 米 | 4.9 分'], ['钟楼 CitiGO 欢阁（钟楼店）', '距您 740 米 | 4.8 分']],
      shop: [['亚朵酒店（小寨店）', '距您 1.4 公里 | 4.8 分'], ['全季酒店（万象城店）', '距您 300 米 | 4.7 分']],
      commute: [['亚朵酒店（南稍门店）', '距您 900 米 | 4.8 分'], ['桔子水晶（长安南路店）', '距您 450 米 | 4.7 分']] } },
    tea:     { src: '下午茶榜', t: '茶歇时间到', sub: '精选 13 家人气饮品店', tint: 'sun', food: false, timeOnly: 'other', items: {
      explore: [['% Arabica 咖啡', '距您 168 米 | 人均 ¥38'], ['喜茶 · 城市限定店', '距您 98 米 | 可自取']],
      shop: [['喜茶 · 万象城店', '距您 120 米 | 可自取'], ['奈雪的茶 · L2', '距您 180 米 | 人均 ¥28']],
      commute: [['喜茶 · 中贸店', '距您 210 米 | 可自取'], ['% Arabica 咖啡', '距您 560 米 | 人均 ¥38']] } },
    massage: { src: '休闲按摩榜', t: '疲惫一扫轻松享受', sub: '精选 10 家热门店铺', tint: 'lav', food: false, items: {
      commute: [['松筋堂（雁塔南路店）', '距您 742 米 | 团购 ¥38 起'], ['筋膜实验室', '距您 516 米 | 无需预约']],
      shop: [['松筋堂（万象城店）', '距您 210 米 | 团购 ¥38 起'], ['足道 · 小憩', '距您 390 米 | 可躺 40 分钟']] } },
    newly:   { src: '近期新开榜', t: '吃腻了换换口味', sub: '精选 10 家热门店铺', tint: 'pink', food: true, items: {
      commute: [['巷子里的面', '距您 653 米 | 4.9 分'], ['松川唐风料理', '距您 451 米 | 4.8 分']],
      shop: [['一坐一忘 云南菜 · 5F', '距您 90 米 | 本月新开'], ['松川唐风料理', '距您 1.1 公里 | 4.8 分']],
      explore: [['粉巷新开 · 唐风茶点', '距您 380 米 | 本月新开'], ['巷子里的面', '距您 720 米 | 4.9 分']] } },
    slow:    { src: '慢饮时光榜', t: '一杯慢饮享悠闲', sub: '精选 13 家人气饮品店', tint: 'mint', food: false, items: {
      commute: [['Manner 咖啡', '距您 56 米 | 人均 ¥18'], ['蓝瓶咖啡（高新旗舰店）', '距您 32 米 | 人均 ¥22']],
      shop: [['蓝瓶咖啡（万象城店）', '距您 140 米 | 人均 ¥30'], ['Manner 咖啡 · L1', '距您 200 米 | 人均 ¥18']] } },
  };
  const PICK_ORDER = {
    shop: { low: ['quality', 'fire', 'trip'], mid: ['fire', 'quality', 'trip'], high: ['newly', 'fire', 'slow'] },
    explore: { low: ['local', 'fire', 'trip'], mid: ['fire', 'local', 'trip'], high: ['newly', 'fire', 'trip'] },
    commute: { low: ['quality', 'fire', 'slow'], mid: ['fire', 'massage', 'slow'], high: ['massage', 'newly', 'slow'] },
  };
  const LEAD_OUT = { am: 'fire', meal: 'local', other: 'tea', night: 'hotel' };
  const picksOn = (s, at) => {
    const cap = s.abs === 'point' ? 2 : 3;
    let base = s.abs === 'point' ? ['slow', 'massage'] : PICK_ORDER[s.scene][s.grid].slice();
    base = base.filter((k) => k !== 'tea' && k !== 'hotel');
    let ord;
    if (s.city === 'out') { const lead = LEAD_OUT[s.time]; ord = [lead].concat(lead !== 'hotel' ? ['hotel'] : [], base); }
    else { ord = base.slice(); if (s.time === 'other') ord = ord.slice(0, cap - 1).concat(['tea']); }
    const out = []; const seen = {};
    for (const k of ord) {
      if (out.length >= cap) break;
      const p = PICK[k];
      if (seen[k] || !p || !p.items[s.scene]) continue;
      seen[k] = 1;
      if (p.outOnly && s.city !== 'out') continue;
      if (p.timeOnly && p.timeOnly !== s.time) continue;
      if (s.abs === 'point' && p.food) continue;
      const items = p.items[s.scene].filter(([name]) => openAt(name, s, at));
      if (items.length) out.push({ k, p, items });
    }
    return out;
  };

  /* ───────── 收藏 · 末班车（线路色按 Figma） ───────── */
  const FAVS = [
    { name: '魏世纪 Hey wego·Bistro', distance: '369 米', details: ['4.8 分', '酒吧'], image: 'place-row/samples/weishiji-bistro.jpg' },
    { name: '永兴坊', distance: '1.2 公里', details: ['4.8 分', '美食街'], image: 'place-row/samples/yongxingfang.jpg' },
  ];
  const LINE2 = '#C42D2A'; const NIGHT = '#7A5BD6';
  const LASTBUS = {
    explore: [{ line: '2 号线', color: LINE2, title: '钟楼站 · B 口进站', subtitle: '往 北客站 方向 · 换乘 4 号线', time: '23:10' },
              { line: '12路', color: NIGHT, title: '钟楼广场北 · 夜班公交', subtitle: '末班地铁错过也能到家 · 约 70 分钟', time: '00:40' }],
    shop: [{ line: '2 号线', color: LINE2, title: '体育场站 · C 口进站', subtitle: '往 北客站 方向 · 换乘 4 号线', time: '23:05' },
           { line: '610路', color: NIGHT, title: '长安南路 · 夜班公交', subtitle: '末班地铁错过也能到家 · 约 55 分钟', time: '00:30' }],
    commute: [{ line: '2 号线', color: LINE2, title: '南稍门站 · A 口进站', subtitle: '往 韦曲南 方向', time: '23:15' },
              { line: '12路', color: NIGHT, title: '中贸广场 · 夜班公交', subtitle: '末班地铁错过也能到家 · 约 60 分钟', time: '00:45' }],
  };

  /* ───────── 驾车服务 ───────── */
  const PARK = {
    shop: [['西安万象城西侧停车场', ['步行 3 分钟', '距终点 150 米']], ['西安万象城东侧停车场', ['步行 5 分钟', '距终点 320 米']]],
    explore: [['钟楼饭店地下停车场', ['步行 4 分钟', '距终点 260 米']], ['开元商城停车场', ['步行 6 分钟', '距终点 450 米']]],
    commute: [['中贸广场地下停车场', ['步行 2 分钟', '距终点 90 米']], ['银泰 B 座停车场', ['步行 6 分钟', '距终点 450 米']]],
  };
  const GAS = [['中国石化加油站 (科技路站)', ['距终点 1.2 公里', '92# 优惠 0.8 元/升'], '直降 1.2 元'],
               ['中国石油加油站（高新路站）', ['距终点 2.5 公里'], '直降 1.2 元']];

  /* ───────── 营业时间：到达时已关门（或还没开门）的地点不推荐 ─────────
   * 键为名称片段；'HH:MM-HH:MM'，结束早于开始表示跨午夜；未登记的地点视为营业 */
  const HOURS = [
    ['生命之树', '10:00-22:00'], ['西安电视塔', '09:00-20:00'], ['秦腔艺术博物馆', '09:00-22:00'], ['粉巷', '10:00-02:00'],
    ['星巴克臻选', '07:30-21:00'], ['小雁塔广场', '06:00-22:30'],
    ['大唐不夜城', '00:00-24:00'], ['西影电影园区', '09:00-21:00'], ['陕西历史博物馆', '08:30-18:00'], ['洒金桥美食街', '10:00-02:00'],
    ['永宁门', '08:00-22:00'], ['回民街', '09:00-01:00'], ['拓得时代训练馆', '06:00-23:00'], ['易俗社文化街区', '10:00-22:00'], ['长安书院', '09:00-21:30'],
    ['喜茶', '10:00-22:00'], ['奈雪', '10:00-22:00'], ['Arabica', '08:00-21:00'], ['Manner', '07:30-20:00'], ['蓝瓶咖啡', '08:00-20:00'],
    ['松筋堂', '11:00-02:00'], ['筋膜实验室', '11:00-23:00'], ['足道 · 小憩', '11:00-02:00'],
  ];
  const mins = (t) => { const [h, m] = String(t).split(':').map(Number); return h * 60 + (m || 0); };
  const hoursOf = (name) => (HOURS.find(([k]) => String(name).includes(k)) || [])[1];
  /** 到达时刻（CLOCK[s.time]）是否营业；at 指定其他时刻（午休 12:00、下班 18:30 这类面向之后时段的模块） */
  const openAt = (name, s, at) => {
    const h = hoursOf(name);
    if (!h) return true;
    const [a, b] = h.split('-').map(mins); const now = mins(at || CLOCK[s.time]);
    return a <= b ? (now >= a && now < b) : (now >= a || now < b);
  };

  /* ───────── 页面编排（原表 layout()） ───────── */
  const busOn = (s) => s.move === 'metro' && s.time !== 'am';
  /** 还能待多久：短档 / 长档按营业时间过滤；单店沿用所在片区的数据 */
  const dwellOf = (s) => {
    const d = DWELL[s.scene];
    if (!d || !d.short) return null;
    const short = d.short.filter((x) => openAt(x.name, s));
    const long = d.long.filter((k) => openAt(SPOT[k].name, s));
    return short.length || long.length ? { short, long } : null;
  };
  const dwellQ = (s) => {
    if (!dwellOf(s)) return null;
    if (s.abs === 'point') return '吃完还能待多久？';
    return DWELL[s.scene].q[s.time];
  };
  const restOf = (s) => DWELL.commute.rest.filter((x) => openAt(x.name, s));
  // 下班好去处面向下班后（按 18:30 判断；21 点后按到达时刻）
  const offworkOf = (s) => OFFWORK.filter((k) => openAt(SPOT[k].name, s, s.time === 'night' ? null : '18:30'));
  const LUNCH_AT = '12:00';   // 午休去哪儿按午休时刻判断
  const layout = (s) => {
    const L = ['util'];
    if (s.move === 'taxi') L.push('pay');
    if (s.abs === 'point') L.push('shop');
    // 21 点后末班车：排在到达对象（付款卡 / 商家卡）之后、所有推荐之前
    if (busOn(s) && s.time === 'night') L.push('bus');
    if (s.abs === 'point') {
      if (POIST[s.poi].blocked) L.push('top');
      L.push('dwell', 'picks');
    } else if (s.scene === 'shop') {
      L.push('top'); if (s.city === 'out') L.push('dish'); L.push('picks', 'dwell');
    } else if (s.scene === 'explore') {
      L.push('top', 'dwell'); if (s.city === 'out') L.push('dish'); L.push('picks');
    } else {
      L.push('top'); if (s.city === 'out') L.push('dish');
      if (s.time === 'am') L.push('rest', 'lunch', 'offwork');
      else if (s.time === 'meal') L.push('lunch', 'offwork');
      else if (s.time === 'other') L.push('rest', 'offwork');
      else L.push('offwork');
    }
    if (busOn(s) && s.time !== 'night') L.push('bus');
    if (s.fav === 'yes') L.push('fav');
    if (s.move === 'car') L.push('drive');
    const empty = { dwell: !dwellQ(s), picks: !picksOn(s).length, lunch: !picksOn(s, LUNCH_AT).length, rest: !restOf(s).length, offwork: !offworkOf(s).length };
    return L.filter((k) => !empty[k]);
  };
  const NAME = { pay: '打车付款', util: '周边服务', bus: '今晚末班车', shop: '到达商家卡', top: '扫街榜 TOP 3', dish: '当地特色菜',
    picks: '附近精选', dwell: '还能待多久', rest: '工作休息出来走走', lunch: '午休去哪儿', offwork: '下班好去处', fav: '你的收藏就在附近', drive: '驾车服务' };
  const describe = (k, s) => {
    switch (k) {
      case 'pay': return '起终点 · 共计 18.28 元 · 物品遗失 / 联系司机 · 立即支付';
      case 'util': { const u = utilOf(s); return `${u.length} 项：${u.slice(0, 4).join(' · ')} …`; }
      case 'bus': return '地铁 + 夜班公交 2 条' + (s.time === 'night' ? ' · 21 点后排在到达对象之后、推荐之前' : '');
      case 'shop': { const p = pointOf(s); return `${p.t} · ${p.kind === 'cafe' ? '早餐一键下单' : `团购 ${p.deals.length} 档 · 看团购 / 联系商家`}` + (s.poi === 'closed' ? '（今日已打烊）' : ''); }
      case 'top': { const k2 = TOP[topKey(s)].kind;
        return `扫街榜 · ${topTitle(s)} · 主按钮：${k2 === 'cafe' ? '一键下单' + (s.grid === 'high' ? '（首卡上次那杯）' : '') : BTN[k2]}${s.abs === 'point' ? ' · 受阻唤起' : ''}`; }
      case 'dish': return '6 道 · 必吃排名 · 仅外地游客';
      case 'picks': case 'lunch': return picksOn(s, k === 'lunch' ? LUNCH_AT : null).map((x) => `${x.p.t} → ${x.p.src}`).join('；');
      case 'dwell': { const d = dwellOf(s); return `${dwellQ(s)} · 短档 ${d.short.length} 条 + 1 小时以上 ${d.long.length} 张图片卡（已关门的不推荐）`; }
      case 'rest': return `短档 ${restOf(s).length} 条`;
      case 'offwork': return `图片卡 ${offworkOf(s).length} 张 + 查看更多`;
      case 'fav': return '命中 2 家 · 导航过去';
      case 'drive': return (s.city === 'out' ? '异地限行 · ' : '') + ((s.time === 'meal' || s.time === 'night') ? '代驾 · ' : '') + '泊车指引 2 · 优惠加油 2';
      default: return '';
    }
  };

  window.ArrivalIntent = {
    SCENE, DIM, CLOCK, POIST, HEAD, headOf, pointOf, RIDE, FAC_KEY, utilOf, TOP, POICARD, topKey, topCards, topTitle, BTN,
    DWELL, SPOT, OFFWORK, DISH, PICK, THEME, pickImg, picksOn, FAVS, LASTBUS, PARK, GAS,
    LUNCH_AT, busOn, dwellQ, dwellOf, restOf, offworkOf, openAt, layout, NAME, describe,
  };
})();
