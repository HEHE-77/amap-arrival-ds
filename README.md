# 高德到达页 · 设计系统

> **设计规范（2026-10-15 更新）**：完整设计系统文档见 [`docs/design-system/DESIGN.md`](docs/design-system/DESIGN.md)，与 Figma「高德地图主项目」中的变量、样式和组件一一对应：
>
> - 基础 token：[颜色](docs/design-system/tokens/colors.md) · [字体](docs/design-system/tokens/typography.md) · [间距](docs/design-system/tokens/spacing.md) · [圆角](docs/design-system/tokens/radius.md) · [效果](docs/design-system/tokens/effects.md) · [断点](docs/design-system/tokens/breakpoints.md)
> - 可视化预览：[`docs/design-system/preview/index.html`](docs/design-system/preview/index.html)
> - 字体：中文 PingFang SC（非苹果平台回退 Noto Sans SC），数字 Helvetica Bold，TOP 奖牌 Khand SemiBold。
> - 卡片：统一 0.6px 描边（`stroke/card`）+ 16 圆角；仅扫街榜卡片额外加投影。
>
> 新版 token：`tokens/ds-tokens.css`，由 `python3 tokens/build_tokens.py` 从 `DESIGN.md` 生成，变量名与 Figma 变量的 code syntax 一致（如 `--color-text-primary`、`--space-md`），已通过 `tokens.css` 顶部的 `@import` 自动加载。
>
> 迁移进度：✅ 全部组件与页面布局已对齐新版 Figma / token（2026-10-15）。旧 `--ds-*` 只剩两处：收藏态星标黄 `--ds-color-favorite`（Figma 暂无对应变量）、TOP 奖牌 SVG 渐变色标 `--ds-rank-*`（数值与 `gradient/medal-*` 一致）。到店受阻提示条 `amap-notice` Figma 暂无设计，按 DESIGN.md 用 warning 状态色暂定。

逐个组件搭建。技术栈：原生 HTML / CSS 变量 / Web Component，无构建步骤，任何框架都能直接引用。

```
tokens/      tokens.json（真源）+ tokens.css（CSS 变量）
components/  primitives/ 为共用基础组件，其余每个复合组件一个目录：*.css + *.js
preview/     组件状态预览页
assets/      从 Figma 导出的素材
```

## 意图模拟器（整页）

打开 `app/index.html`：左侧按《到达页信息优先级模拟器 v17.2》的维度（出行方式、到访频次、常驻城市、终点类型、到店状态、时段、收藏）选择意图，右侧 iPhone 16 Pro（402 × 874）里用设计系统组件实时拼出整页。

- 场景样例：开车去商场（Figma `812:7852`）、外地游客到钟楼（`812:7853`）、上班族打车到公司（`812:7854`），点选套用默认参数；地址栏 `?scene=explore` 可直接打开。
- 样例只是一组预设：套用后每个维度都能改，和样例预设不一致时样例变为未选中。L3 终点类型为商场 / 景区 / 写字楼（AOI 片区）或餐饮单店（POI，沿用当前片区）。
- 餐饮单店按时段换店：早高峰麦当劳（早餐一键下单）、饭点胡大饭馆、平时满记甜品、21 点后木屋烧烤；分店名与地址随片区变化。
- 21 点后的末班车排在到达对象（打车付款卡 / 商家卡）之后、推荐之前。
- 附近精选固定 3 张：按原规则排序，不足时依次补其他榜单（单店先补非餐饮）；景区场景附近精选紧跟扫街榜。
- 早高峰单店（麦当劳）展示两条团购、不显示热评；点卡片上的某条团购，一键下单浮层的已选商品换成这条。
- 推荐按营业时间过滤：到达时已关门或还没开门的地点不出现（`app/intent.js` 的 `HOURS`）；午休去哪儿按 12:00、下班好去处按 18:30 判断。
- 写字楼分访客和上班族：0–3 次（首次到 / 偶尔来）按访客处理，周边服务把打印复印、ATM 提到最前，模块改叫「附近精选」（按到达时刻判断营业）「到早了先坐会儿」「忙完去哪儿」（大唐不夜城替换健身房）；≥4 次保留「午休去哪儿」「工作休息出来走走」「下班好去处」。21 点后统一叫「附近好去处」。外地 + ≥4 次 + 饭点，「吃腻了换换口味」排第一张。写字楼的当地特色菜至少排在第 3 个推荐模块（扫街榜算第 1 个），平时放到「忙完去哪儿 / 下班好去处」之后。
- 「本次调用结果」按页面顺序列出模块，点击定位到手机里对应位置；手机里点按钮、卡片会在下方显示触发的事件。
- `app/intent.js`：维度、编排规则（原表 `layout()`）与各模块数据；`app/render.js`：把模块映射到组件；`app/app.js`：面板与交互。

页面布局（场景页 Figma `925:8719` / `925:9812` / `925:10541`）：状态栏 51，上方另有 4，顶部区块为导航栏 / Header / 设施入口，间距 `space/md` 8；模块之间 `space/section-gap` 16；左右边距 `space/page-margin` 16；页面底色 `bg/page` #FEFEFE；底部留出 home indicator。

新增组件：`<amap-tier-label>`（「还有 20 分钟」「有 1 小时以上」分档小标题，Figma `765:5257`）、`<amap-notice>`（到店受阻提示条，Figma 暂无，样式暂定）；`amap-service-card` 新增 `avatar`（代驾卡，Figma `765:5304`）；`amap-place-card` 新增 `closed`（打烊态）；`amap-section` 新增 `subheading`；`amap-arrival-header` 的 `asset-base` 可从祖先继承。素材：`assets/page/`（状态栏、分档图标）、`assets/drive/daijia-avatar.jpg`。

下单浮层（Figma `1057:4138` 组件库，整屏稿 `812:7855` 饭店 / `812:7856` 景点 / `812:7857` 一键下单）：手机里点「看团购 / 看优惠」打开饭店浮层，「订门票」打开景点浮层，一键下单卡打开一键下单浮层。遮罩 `overlay/scrim`，面板自底部移入 400ms，点遮罩不关闭，只能点 × 关闭；选套餐 / 票种、加减数量、加购会联动底部栏价格。浮层内容按点开的那张卡生成：标题是店名，选项是卡片上的团购 / 券 / 门票（点卡片上的某条优惠会直接选中它），原价由折扣推算，满减券为免费领取；订门票的日期从今天起，场次按当前时段置灰已过场次；一键下单的取餐时间按当前时段推算，加购为该店商品。缺配图处显示「配图待补」。组件见 `components/order-sheet/`（`<amap-order-sheet>` 容器 + `amap-order-options` / `amap-order-set-detail` / `amap-order-quantity` / `amap-stepper` / `amap-order-item` / `amap-order-addons` / `amap-order-payment` / `amap-order-terms` / `amap-order-notice` / `amap-order-footer`），各店补充内容（菜品、规则、场次、加购）在 `app/orders.js`，素材 `assets/order/samples/`。

与 Figma 整页的差异（来自意图表规则，模拟器以意图表为准）：设施入口顺序按「出行方式首项 + 场景项」生成；外地游客「平时」的附近精选首张为下午茶榜；末班车排在收藏之前；商场样例为常驻城市，不出异地限行。

## 查看交互效果

在浏览器打开 `preview/` 下对应页面：`primitives.html`（基础组件）、`header.html`、`poi-card.html`（Figma 全部 9 个实例 + 边界情况）、`place-card.html`（Figma 三个场景实例 + 9 个页面实例 + 边界情况）、`poi-recommend.html`（9 个实例 + 状态）、`dish-card.html`（6 个实例 + 边界情况）、`nearby-list.html`（3 个实例 + 边界情况）、`taxi-bill.html`、`service-card.html`（停车场 / 加油站）、`reminders.html`（限行 / 末班车）、`nav-bar.html`、`place-row.html`（收藏地点）、`more-card.html`、`facility-bar.html`、`order-sheet.html`（三个下单浮层）。事件会显示在页面上。

加载顺序：`tokens.css` → `primitives.css/js` → 复合组件。

字体：全部无衬线。苹果设备用苹方，其他平台优先思源黑体；TOP 排名数字用 Khand SemiBold（`assets/fonts/`，SIL OFL 1.1，由 `tokens.css` 的 `@font-face` 加载）。

## Token 分层

| 层 | 作用 | 例子 |
|---|---|---|
| primitive | 原始值，不带语义 | `--ds-gray-900` `--ds-space-8` |
| semantic | 用途，组件只引用这一层 | `--ds-color-text-primary` `--ds-color-text-muted`（全系统唯一次要灰） |
| component | 组件私有尺寸/间距，可被覆盖 | `--header-fade-stop` |

## 基础组件（`components/primitives/`）

被多个复合组件共用，也可单独使用。素材目录读取自身或最近祖先的 `asset-base`。

| 组件 | 用法 | 用在 |
|---|---|---|
| `<amap-link label>` | 文字 + 全局箭头，原生 click | Header「行程回溯」、POI「完整榜单」 |
| `<amap-ranking-tag text [on-photo]>` | 扫街榜标签；`on-photo` 为照片上的半透明暖底白字版 | POI 标题区、推荐卡 |
| `<amap-rank-thumb rank src>` | 图片 + 排名角标，无图显示占位底色 | POI 列表行 |
| `<amap-fav-button pressed label>` | 收藏星标，切换后派发 `fav-change { favorited }` | POI 列表行 |
| `<amap-meta-line items sep accent-first>` | 分隔符串联的说明行，首段可强调；`--meta-gap` / `--meta-sep-color` 可调间距与分隔符颜色 | POI 列表行、饭店卡、服务卡 |
| `<amap-rank-ribbon rank [tier]>` | TOP 排名飘带，1 金 / 2 银 / 3 铜（Khand 字体随包） | 地点卡 |
| `<amap-score-badge score label>` | 评分徽标「4.8 超棒」 | 地点卡 |
| `<amap-status-tag text>` | 营业状态 | 地点卡 |
| `<amap-deal-tag type price discount>` | 团 / 券价格条 | 地点卡 |
| `<amap-media-pill text [icon=star] [muted]>` | 图片上的深色胶囊（收藏数、页码） | 地点卡 |
| `<amap-button label variant [price] [shape=pill]>` | `primary` 渐变 / `secondary` 描边 / `tonal` 浅底（34 高，13 Semibold），可带「\| ¥ 价格」，`pill` 为胶囊形，原生 click | 地点卡、一键下单、打车账单、服务卡 |
| `<amap-tag text tone [size=m\|l]>` | 小标签：`neutral` 灰底信息 / `tenure` 收录年限 / `promo` 商品促销 / `outline` 蓝描边 / `danger` 警示 / `deal` 优惠；`m` 18 高，`l` 22 高 11 号字 | 地点卡、一键下单、服务卡、限行卡 |
| `<amap-quick-order image title tag spec note price>` | 一键下单卡片，派发 `order-buy` / `order-swap` | 地点卡（上班） |
| `<amap-hot-review text count>` | 热评条，原生 click | 地点卡 |

## 组件

### 1. 到达头部卡（Figma `981:3041`）

> 2026-10-15 已按新版 Figma 组件对齐 token（地图素材不变）。

| 变体 | `variant` | Figma | 高度 |
|---|---|---|---|
| 常规到达 | `regular`（默认） | `981:3018` | 78 |
| 打车到达 | `taxi` | `981:3039` | 78，内容垂直居中 |

```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="components/header/header.css">
<script src="components/header/header.js"></script>

<amap-arrival-header address="长安南路 289 号 · 西安万象城(生命之树)" energy="28"></amap-arrival-header>

<amap-arrival-header variant="taxi" place="中贸广场 B 座" address="长安南路 79 号"
  provider="享道-经济型" driver="何师傅·陕 AA01306"></amap-arrival-header>
```

| 属性 | 变体 | 说明 |
|---|---|---|
| `variant` | — | `regular` / `taxi` |
| `heading` | 全部 | 标题，默认「已到达」 |
| `address` | 全部 | 地址；regular 超长省略 |
| `trip-label` | 全部 | 默认「行程回溯」 |
| `asset-base` | 全部 | 素材目录 |
| `energy` | regular | 绿色能量克数，不传则隐藏 |
| `place` | taxi | 地址行第一段，如「中贸广场 B 座」 |
| `provider` | taxi | 运力名称，橙色强调 |
| `driver` | taxi | 司机·车牌，超长省略（行程回溯始终可见） |

事件：`trip-replay`（点击行程回溯，内部为 `amap-link`）。

素材（`assets/`；矢量导出 SVG，位图导出 @3x PNG，地图只导出 header 内可见的那块）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `header-map-thumb.png` | `849:2921` image 8（可见区域） | 212×72 |
| `header-map-thumb-taxi.png` | `849:2939` image 7（可见区域） | 319×84 |
| `icon-green-energy.svg` | `849:2986` Frame | 18×17 |
| `icon-chevron-right.svg` | 全局统一箭头，所有组件共用 | 16×18 |


### 2. 扫街榜分榜卡片（Figma `970:2596`「扫街榜分榜卡片」，主题背景 `970:2595`，POI 行 `942:812`）

> 2026-10-15 已按新版 Figma 组件对齐 token（素材不变）。

由 `amap-ranking-tag` · `amap-link` · `amap-rank-thumb` · `amap-meta-line` · `amap-fav-button` 组成。

```html
<amap-poi-card theme="quality" heading="臻选好店品质生活" subtitle="精选 8 个热门店铺"></amap-poi-card>
<script>
  document.querySelector('amap-poi-card').items = [
    { name: '隐庐·会席料理', distance: '距您 320 米', details: ['人均 ¥328', '4.9分'], image: '…' },
    { name: '翠园·粤式茶餐厅', distance: '距您 485 米', details: ['人均 ¥168', '4.8分'], favorited: true },
  ];
</script>
```

| 属性 | 说明 |
|---|---|
| `theme` | Figma「主题背景」9 选 1：`smoky` 烟火小店（默认）`quality` 品质甄选 `destination` 专程前往 `hotel` 酒店 `local` 本地人爱去 `tea` 下午茶 `relax` 休闲按摩 `new` 近期新开 `slow` 慢饮时光；也可写中文名；旧色名 `orange` `blue` `green` `indigo` `pink` `amber` `purple` `red` `lime` 依次对应，继续兼容 |
| `heading` | 标题（Figma 属性「标题」），超长省略（不压水印） |
| `subtitle` | 副标题（Figma 属性「副标题」）= 扫街榜标签文案，如「精选10家热门酒店」 |
| `more-label` | 默认「完整榜单」 |
| `items` | JSON 数组或 `el.items = [...]`；字段 `name` `distance` `details[]` `image` `favorited` |
| `asset-base` | 素材目录 |

事件：`poi-more`、`poi-select`（`{ index, item }`）、`poi-favorite`（`{ index, item, favorited }`）。排名自动编号 01、02…

主题只换 3 个 token：`--color-rank-theme-{theme}-wash`（卡头底色，渐隐到 199 高的 51%）/ `-badge`（水印六边形）/ `-glow`（水印箭头高光），支持 `data-theme="dark"`。水印为内联 SVG（路径取自 `853:4827`），颜色随主题切换。

素材（`assets/poi/`）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `saojiebang-logo.png` | `853:4834` image 21（Figma 中为位图，按 @3x 渲染导出） | 34×12 |
| `rank-badge.svg` | `853:4845` / `853:4860`（两者相同，各名次共用） | 29×29 |
| `samples/*.png` | 18 张店铺图，仅预览用（按像素比对 Figma 缩略图对应到店铺） | 50×50 @3x |

箭头用全局 `icon-chevron-right.svg`；星标与水印内联在组件中。未收藏描边 `--color-icon-secondary`；收藏态填充 `--ds-color-favorite`（暂定 `#FFB300`，Figma 暂无对应变量）。

### 3. 扫街榜 POI 卡片（Figma `956:2869`「扫街榜POI卡片」，场景实例 `949:2281`，单 POI `1056:5349`）

> 2026-10-15 已按新版 Figma 组件对齐：单一主组件 + 属性组合，只引用新版 token（`tokens/ds-tokens.css`）。

`<amap-place-card>`；`<amap-restaurant-card>` 保留为别名。属性与 Figma 组件属性一一对应：

| Figma 属性 | 代码属性 |
|---|---|
| 名称 / 距离 | `name` / `distance` |
| 显示 TOP 角标 + TOP 角标（01 / 02 / 03） | `rank`：1 / 2 / 3，不传不显示 |
| 显示附加标签 + 附加标签 | `extra-tag` 文案 + `extra-tag-type`：`tenure`（收录年限，默认）/ `area`（区域，如「西安的市中心」） |
| 显示热评 | `review` + `review-count` |
| 优惠标签 1 / 2（团 / 票 / 券）、显示第二条优惠 | `deals` JSON，最多两条 `[{ type, price, discount, title }]`；`price` 可写「￥98」或「98」 |
| 显示查看更多 | `deal-more`（文案） |
| CTA · 类型 | `cta`：`group` 看团购（默认）/ `ticket` 订门票 / `order` 一键下单（需同时传 `order`） |
| 评分 / 营业状态（嵌套实例） | `score` + `score-label` / `status`（`closed` 改为灰色打烊标签） |

| Figma 场景实例 | 属性组合 |
|---|---|
| 上班到达 | `cta="order"` + `extra-tag="收录 2 年"` + `deal-more` + 一条优惠，无热评 |
| 饭店到达 | `cta="group"` + 热评 + 团 / 券两条优惠 |
| 景点到达 | `cta="ticket"` + `extra-tag-type="area"` + 热评 + 两条门票 |

| 布局 | `layout` | 宽 | 用途 |
|---|---|---|---|
| 默认 | — | 301 | 排行榜等多卡并列 |
| 单 POI | `single` | 365 | 单 POI 到达场景（Figma `1056:5349`）：不显示 TOP 角标、无投影，次按钮默认「联系商家」 |

```html
<link rel="stylesheet" href="components/place-card/place-card.css">
<script src="components/place-card/place-card.js"></script>

<amap-place-card cta="order" rank="1" name="Grid Coffee(万象城店)" distance="<100 米"
  score="4.8" score-label="超棒" details='["奶茶/甜品","￥27/人","662 人导航过"]'
  ranking="雁塔区咖啡榜·第 2 名" extra-tag="收录 2 年" status="正在营业"
  deals='[{"type":"团","price":"￥9.9","discount":"6.7折","title":"大杯葡萄冷萃美式"}]' deal-more="查看更多"
  order='{"title":"燕麦拿铁","tag":"上次那杯","spec":"大杯·少冰·标准糖","note":"随时退 | 不限购","price":"9.9"}'
  saves="4.7k+" image-index="1/12"></amap-place-card>
```

其余属性：`ranking`（扫街榜标签文案）、`details`（JSON，「·」串联）、`image` / `saves` / `image-index`、`primary-label` / `secondary-label`（覆盖 CTA 文案）、`order`（JSON `{ image, title, tag, spec, note, price, actionLabel, swapLabel }`）。

兼容旧写法：`scene`（restaurant / attraction / commute）只用来推断默认 `cta`；`tenure` → `extra-tag`；`info-tag` → `extra-tag` + `extra-tag-type="area"`；传了 `order` 且没写 `cta` 时自动为一键下单。

事件：`card-primary` / `card-secondary`（`{ label }`，次按钮可能是「查看路线」或「联系商家」）、`card-review`、`card-deal`（`{ index, deal }`）、`card-more`、`card-order-buy`、`card-order-swap`。

素材（`assets/restaurant/`，SVG 由 Figma 插件 API 直接导出；奖牌与麦穗为组件内联 SVG，数字色走 `--color-text-medal-*`）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `score-glow.svg` | `765:3889` Ellipse 11 | 26×10 |
| `icon-fire.svg` | `853:5096` ic:round-whatshot | 16×16 |
| `icon-star-white.svg` | `853:5072` Star 3 | 15×14 |
| `samples/*.jpg` | 主图 284×156 与一键下单商品图 48×48，仅预览用（按像素比对 Figma 对应到卡片；huda-fanguan 与 huda-fanguan-wide 为 1x，其余 @3x） | — |

### 4. POI 推荐卡（Figma `996:4773`，168×168）

> 2026-10-15 已按新版 Figma 组件对齐 token（素材不变）。不传 `tint` 时底部遮罩默认 `Gradient/Scrim Image`；传 `tint` 按图片主色覆盖。

168×168 的图片卡：渐进模糊 + 底部主色渐变 + 名称 / 扫街榜标签 / 收藏人数 + 右上玻璃收藏按钮。

```html
<link rel="stylesheet" href="components/poi-recommend/poi-recommend.css">
<script src="components/poi-recommend/poi-recommend.js"></script>

<amap-poi-recommend name="大唐不夜城" tag="特色街区" saves="44.6w+人收藏"
  tint="#936B3B" tint-end="#93543B" image="…/datang-buyecheng.jpg"></amap-poi-recommend>
```

| 属性 | 说明 |
|---|---|
| `name` | 地点名，超长省略 |
| `tag` | 扫街榜标签文案（如「特色街区」「文物古迹」），不传则隐藏 |
| `saves` | 收藏人数文案，如「44.6w+人收藏」 |
| `image` | **原图**（未模糊），渐进模糊由组件生成；缺图或加载失败显示 `tint` 底色 |
| `tint` / `tint-end` | 底部渐变颜色（取自图片主色），渐变为 tint α0 → tint-end α0.8；`tint-end` 不传同 `tint` |
| `fav-label` | 默认「收藏」 |
| `favorited` | 收藏态，星标填充 `--ds-color-favorite` |

事件：`recommend-select`（点击卡片）、`recommend-favorite`（`{ favorited }`，组件自行切换 `favorited`）。

渐进模糊：清晰图 + 一层 `blur(7.7px)` 的副本，副本用 `mask-image` 从 42.8% 渐入到 123.4%（对应 Figma progressive blur 15.4 的起止点）。图片外扩到 189×189（上 6 / 左 15），与 Figma 一致。可用组件变量 `--rec-blur` `--rec-blur-start` `--rec-blur-end` 微调。

各实例渐变色记录在 `tokens.json` → `component.poi-recommend.tints`。

9 个实例统一用同一套模糊参数（Figma 中「回民街」为半径 4、从顶部开始，已确认按其余卡片统一）。

素材：`assets/poi-recommend/samples/*.jpg`，9 张未模糊原图 189×189 @3x，仅预览用。

### 5. 必吃榜菜品卡（Figma `979:2811`「必吃榜/菜品卡」，状态：默认 / 按下 / 加载中）

> 2026-10-15 已按新版 Figma 组件对齐 token（素材不变）；新增 `loading` 属性（加载中骨架），按下态由 `:active` 呈现 `alpha/black-12` 遮罩。

84 宽的单品卡：84×84 菜品图 + 菜名 / 「必吃·第 N 名」/ 入选店铺数。在「当地特色菜」区块中横向排列、可滑动，卡片间距 8（`--ds-space-8`）。

```html
<link rel="stylesheet" href="components/dish-card/dish-card.css">
<script src="components/dish-card/dish-card.js"></script>

<amap-dish-card name="葫芦鸡" rank="1" stores="91家店入选" image="…/hulu-ji.jpg"></amap-dish-card>
```

| 属性 | 说明 |
|---|---|
| `name` | 菜名，超长省略 |
| `rank` | 排名数字 → 「必吃·第 N 名」，不传不显示 |
| `honor-label` | 荣誉前缀，默认「必吃」 |
| `honor` | 整行自定义文案，覆盖 `honor-label` + `rank` |
| `stores` | 入选店铺文案，如「91家店入选」 |
| `image` | 菜品图；无图或加载失败显示灰色占位 |

事件：`dish-select`（`{ name, rank }`）。

新增 token：`--ds-color-text-honor`（荣誉信息，同距离色 `#835B32`）。入选店铺数统一为正文灰（Figma 中「麻辣烫」为 `#646464`）。「麻辣烫」排名按第 6 名（Figma 中误写为第 5 名，已确认）。

素材：`assets/dish/samples/*.jpg`，6 张菜品图 84×84 @3x，仅预览用。

### 6. 附近 POI 列表（Figma `765:5256` 附近景点POI，实例 `765:5259` / `765:5757` / `765:7054`）

宽随容器撑满（场景页 370）的竖向列表：每行 50×50 图 + 名称 / 「距离｜说明…」+ 右侧「查看详情 >」，行顶 1px 分隔线。Figma 中固定 2 行，组件支持任意行数。

```html
<link rel="stylesheet" href="components/nearby-list/nearby-list.css">
<script src="components/nearby-list/nearby-list.js"></script>

<amap-nearby-list items='[
  {"name":"生命之树","distance":"距您 200 米","details":["免费","22:00 关"],"image":"…"},
  {"name":"西安电视塔","distance":"距您 580 米","details":["登塔 ¥50","20:00 关"],"image":"…"}]'></amap-nearby-list>
```

| 属性 | 说明 |
|---|---|
| `items` | JSON 数组或 `el.items = [...]`；每项 `{ name, distance, details[], image }`，说明行用「｜」串联，距离为棕色 |
| `detail-label` | 右侧入口文案，默认「查看详情」 |
| `asset-base` | 素材目录（全局箭头） |

事件：`nearby-select`（`{ index, item }`，整行可点，含「查看详情」）。

复用：`amap-meta-line`（`sep="｜" accent-first`）与 `ds-link` 样式。新增 token：`--ds-color-divider`（`#F2F2F2`）。实例 `765:7054` 中部分说明文字为 `#5A5A5A`、首行高 62，已统一为正文灰与 63。区块标题（如「还有 20 分钟」「工作休息出来走走」）不属于本组件。

素材：`assets/nearby/samples/*.jpg`，6 张 50×50 @3x，仅预览用。

### 7. 打车费用账单（Figma `765:7097`，实例 `765:7098`）

宽随容器撑满（场景页 370）、高 127 的卡片：上半区为起终点（绿 / 红圆点）与「共计 18.28 元」「费用说明 >」，下半区为「⋮ / 物品遗失 / 联系司机」与胶囊形「立即支付」。

```html
<link rel="stylesheet" href="components/taxi-bill/taxi-bill.css">
<script src="components/taxi-bill/taxi-bill.js"></script>

<amap-taxi-bill from="汇通太古城英皇之都(西1门)" to="壹号大院(南门)" amount="18.28"></amap-taxi-bill>
```

| 属性 | 说明 |
|---|---|
| `from` / `to` | 起点 / 终点，超长省略 |
| `amount` | 金额数字（Helvetica Bold 24） |
| `amount-prefix` / `amount-unit` | 默认「共计」/「元」 |
| `fee-label` / `pay-label` | 默认「费用说明」/「立即支付」 |
| `actions` | JSON，默认 `[{"key":"lost","label":"物品遗失"},{"key":"contact","label":"联系司机"}]`；`key` 决定图标 |

事件：`bill-pay`、`bill-fee`、`bill-more`、`bill-action`（`{ key, label }`）。

复用：`amap-link`（费用说明）、`amap-button`（新增 `shape="pill"`）。图标从 Figma 导出后内联，颜色走 token。新增 token：`--ds-color-route-start` / `-end`、`--ds-radius-pill`、`--ds-space-16`。

与 Figma 的统一：地址文字 `#1A1A1A`、费用说明与更多图标 `#5A5A5A`、分隔线 `#F1EEEE`、按钮渐变 `#1A68FE→#1989FE`，分别并入正文色、正文灰、`--ds-color-divider` 与主按钮渐变 token。

### 8. 模块容器 + 服务卡（Figma `765:5300` 停车场 / `765:5299` 加油站提示，实例 `765:5305` / `765:5306`）

两个 component 结构相同：模块标题 + 两张服务卡。拆成两个组件：

- `<amap-section heading [more-label] [layout=scroll]>`：通用模块容器，标题 16 Semibold，可带右侧「查看更多 >」（派发 `section-more`），`layout="scroll"` 时横向滑动、卡片保持原宽（间距 `--section-row-gap`，榜单 / 推荐卡为 12），左右内边距 `--section-inset`（全页统一 18，已确认；停车场 / 加油站原稿的 16 已改为 18），标题与内容、内容之间间距 8。子元素即内容。后续拼页面时所有模块都用它。
- `<amap-service-card>`：随容器撑满（统一边距后为 366 宽，原稿 370），左侧名称 / 说明行 / 标签，右侧浅底按钮。

```html
<link rel="stylesheet" href="components/section/section.css">
<link rel="stylesheet" href="components/service-card/service-card.css">
<script src="components/section/section.js"></script>
<script src="components/service-card/service-card.js"></script>

<amap-section heading="终点5公里内可优惠加油">
  <amap-service-card badge="团" name="中国石化加油站 (科技路站)" meta='["距终点 1.2 公里","92# 优惠 0.8 元/升"]'
    tags='[{"text":"直降 1.2 元","tone":"deal"},{"text":"免费洗车","tone":"neutral"}]' action-label="去加油"></amap-service-card>
</amap-section>
```

| `amap-service-card` 属性 | 说明 |
|---|---|
| `name` | 名称，超长省略 |
| `badge` | 名称前小标识，如「团」 |
| `meta` | JSON 数组，「\|」串联（分隔符 `#999999`） |
| `tags` | JSON `[{ text, tone }]`，tone 为 `outline` / `danger` / `deal` / `neutral` 等 |
| `action-label` | 右侧按钮文案，如「去停车」「去加油」 |

事件：`service-action`（`{ name, label }`）。

基础组件扩展：`amap-tag` 新增 `size="m"` 与 `outline` / `danger` / `deal` 三种 tone；`amap-button` 新增 `variant="tonal"`；`amap-meta-line` 间距与分隔符颜色可调。新增 token：`--ds-color-action-tonal-surface`、`--ds-color-tag-danger-*`、`--ds-color-text-separator`、`--ds-radius-6`、`--ds-type-button-s-*`。

与 Figma 的统一：「免费洗车」底色 `#F5F5F5` 并入已有灰色标签 `#EFEFEF`。

### 9. 限行提醒（Figma `765:5302`，实例 `765:5303`）与末班车提醒（Figma `766:8338`，实例 `766:8339`）

都放在 `<amap-section>` 里使用，卡片宽 366。

```html
<amap-section heading="异地限行规则">
  <amap-restriction-card plate="陕B·*****" text="您当前绑定的车辆今日在目的地区域处于限行时段。…"
    tags='[{"text":"今日限行 7:00 - 20:00","tone":"danger"},{"text":"避开限行路线已规划","tone":"neutral"}]'></amap-restriction-card>
</amap-section>

<amap-section heading="今晚末班车时间" more-label="查看更多">
  <amap-transit-list items='[{"line":"2 号线","color":"#C42D2A","title":"钟楼站 · B 口进站","subtitle":"往 北客站 方向 · 换乘 4 号线","time":"23:10"}]'></amap-transit-list>
</amap-section>
```

`<amap-restriction-card>`：`heading`（默认「今日限行提醒」）、`plate` 车牌、`text` 说明、`tags`（`amap-tag size="l"`）。纯展示，无事件。

`<amap-transit-list>`：`items` 每项 `{ line, color, title, subtitle, time, timeLabel }`；`color` 为线路色，属于数据（不进 token），缺省为灰。事件 `transit-select`（`{ index, item }`）。实例 `766:8339` 中第二条线路为「12路」，预览已单列。

与 Figma 的统一：限行图标底与「今日限行」标签底 `#FFF1F0` → `--ds-color-tag-danger-surface`（`#FFEDED`）；车辆图标 `#FF4D4F` → 警示红 `#FF3041`；车牌底 `#F0F0F2` 与「避开限行路线已规划」底 `#F5F5F5` → 灰色标签 `#EFEFEF`；两枚标签统一为 22 高、11 号字（Figma 中「今日限行」为 10 号字、另一枚 23 高）；末班车文字 `#222222` / `#111111` → 正文色；行分隔线 `#F3F3F3` → `--ds-color-divider`；「查看更多」`#5A5A5A` → 正文灰。

### 10. 顶部导航栏（Figma `777:3440`，实例 `777:3441`）

位于 Header 上方：左侧 36×36 圆形返回，右侧胶囊内「搜索 | 分享 | 更多」。

```html
<link rel="stylesheet" href="components/nav-bar/nav-bar.css">
<script src="components/nav-bar/nav-bar.js"></script>

<amap-nav-bar></amap-nav-bar>
<amap-nav-bar actions="share,more"></amap-nav-bar>
```

`actions`：右侧按钮，逗号分隔，默认 `search,share,more`。事件：`nav-back` / `nav-search` / `nav-share` / `nav-more`。图标从 Figma 导出后内联，颜色走 token。

与 Figma 的统一：图标 `#262626` → 正文色；胶囊内竖线 `#ECECEC` → `--ds-color-divider`。

### 11. 收藏地点行卡（Figma `766:8580` 收藏，实例 `766:8581` / `766:8596`）

放在 `<amap-section heading="你的收藏就在附近">` 中：56×56 图 + 名称 / 「距离 · 评分 · 类型」+ 右侧「导航过去」浅底按钮。

```html
<link rel="stylesheet" href="components/place-row/place-row.css">
<script src="components/place-row/place-row.js"></script>

<amap-place-row name="永兴坊" distance="1.2 公里" details='["4.8 分","美食街"]' image="…"></amap-place-row>
```

| 属性 | 说明 |
|---|---|
| `name` | 名称，超长省略 |
| `distance` | 距离（棕色） |
| `details` | JSON 数组，「·」串联 |
| `image` | 56×56 图片 |
| `action-label` | 默认「导航过去」，传空字符串隐藏 |

事件：`place-select`（`{ name }`，点图片或文字）、`place-action`（`{ name, label }`）。名称 `#222222` → 正文色。

素材：`assets/place-row/samples/*.jpg`，2 张 56×56 @3x，仅预览用。

### 12. 查看更多卡（Figma `765:5691` 查看更多 / `765:6006` 查看其他榜单 / `765:4869` 查看完整扫街榜）

三个 component 只有文案与高度不同，合为一个组件，共 10 个实例，都放在横向卡片列表的末尾。宽 100，高度随所在行撑满（168 / 199 / 370 / 390）。

```html
<link rel="stylesheet" href="components/more-card/more-card.css">
<script src="components/more-card/more-card.js"></script>

<amap-section heading="附近值得去" layout="scroll" style="--section-row-gap: 12px">
  <amap-poi-recommend …></amap-poi-recommend>
  <amap-more-card></amap-more-card>
</amap-section>

<amap-more-card label="查看其他榜单"></amap-more-card>
<amap-more-card label="看完整&#10;扫街榜"></amap-more-card>
```

`label` 默认「查看更多」，可换行。事件：`more-select`（`{ label }`）。

新增 token：`--ds-color-action-tonal-icon-surface`（`#D4E6FF`）。卡片底色 Figma 为 `#EBF3FE`，并入浅底按钮色 `#EDF3FF`。实例 `777:2659`（上班到达那行）高 384，比同行卡片（390）矮 6，组件按撑满处理。

### 13. 设施快捷入口（Figma `765:6203` 常规 / `777:2671` 景点 / `777:3333` 上班）

Header 下方一排横向滑动的入口。Figma 中每个入口是独立 component（共 16 种），这里合为一个组件，按 key 取图标与默认文案。

```html
<link rel="stylesheet" href="components/facility-bar/facility-bar.css">
<script src="components/facility-bar/facility-bar.js"></script>

<amap-facility-bar preset="attraction"></amap-facility-bar>
<amap-facility-bar items="parking,toilet,charging,store"></amap-facility-bar>
<amap-facility-bar items='[{"key":"parking","label":"地下停车场"},{"key":"atm"}]'></amap-facility-bar>
```

| 属性 | 说明 |
|---|---|
| `preset` | `regular`（停车场、公共厕所、充电桩、便利店、AED、电梯口、母婴室）/ `attraction`（游客服务中心、公共厕所、地铁站出入口、行李寄存、便利店、警务站、共享单车停放点）/ `commute`（便利店、快递柜、电梯口、打印复印、共享单车停放点、药房、ATM） |
| `items` | 逗号分隔的 key，或 JSON `[{ key, label }]`，优先于 `preset` |
| `asset-base` | 素材目录 |

key：`parking` `toilet` `charging` `store` `aed` `elevator` `nursing` `visitor-center` `metro` `luggage` `police` `bike` `locker` `print` `pharmacy` `atm`。事件：`facility-select`（`{ key, label }`）。

入口样式：32 高，圆角 12（新增 `--ds-radius-12`），`surface-card` 底 + 0.6 描边，图标与文字间距 5，左右边距 18，入口间距 4。

素材（`assets/facility/`，SVG 由 Figma 插件 API 导出，多色图标保留原色）：16 个，文件名即 key。两个「电梯口」component（`765:6201` / `777:3328`）图标相同，合为一个。

与 Figma 的统一：「公共厕所」图标与文字之间 Figma 为 0 间距，统一为 5（入口宽 95，原稿 90）。
