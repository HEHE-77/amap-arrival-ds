# 高德到达页 · 设计系统

逐个组件搭建。技术栈：原生 HTML / CSS 变量 / Web Component，无构建步骤，任何框架都能直接引用。

```
tokens/      tokens.json（真源）+ tokens.css（CSS 变量）
components/  primitives/ 为共用基础组件，其余每个复合组件一个目录：*.css + *.js
preview/     组件状态预览页
assets/      从 Figma 导出的素材
```

## 查看交互效果

在浏览器打开 `preview/` 下对应页面：`primitives.html`（基础组件）、`header.html`、`poi-card.html`（Figma 全部 9 个实例 + 边界情况）、`place-card.html`（三种场景共 9 个实例 + 边界情况）。事件会显示在页面上。

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
| `<amap-ranking-tag text>` | 扫街榜标签 | POI 标题区 |
| `<amap-rank-thumb rank src>` | 图片 + 排名角标，无图显示占位底色 | POI 列表行 |
| `<amap-fav-button pressed label>` | 收藏星标，切换后派发 `fav-change { favorited }` | POI 列表行 |
| `<amap-meta-line items sep accent-first>` | 分隔符串联的说明行，首段可强调 | POI 列表行、饭店卡 |
| `<amap-rank-ribbon rank [tier]>` | TOP 排名飘带，1 金 / 2 银 / 3 铜（Khand 字体随包） | 地点卡 |
| `<amap-score-badge score label>` | 评分徽标「4.8 超棒」 | 地点卡 |
| `<amap-status-tag text>` | 营业状态 | 地点卡 |
| `<amap-deal-tag type price discount>` | 团 / 券价格条 | 地点卡 |
| `<amap-media-pill text [icon=star] [muted]>` | 图片上的深色胶囊（收藏数、页码） | 地点卡 |
| `<amap-button label variant [price]>` | 主按钮（渐变）/ 次按钮（描边），可带「\| ¥ 价格」，原生 click | 地点卡、一键下单 |
| `<amap-tag text tone>` | 小标签：`neutral` 灰底信息 / `tenure` 收录年限 / `promo` 商品促销 | 地点卡、一键下单 |
| `<amap-quick-order image title tag spec note price>` | 一键下单卡片，派发 `order-buy` / `order-swap` | 地点卡（上班） |
| `<amap-hot-review text count>` | 热评条，原生 click | 地点卡 |

## 组件

### 1. Header

| 变体 | `variant` | Figma | 高度 |
|---|---|---|---|
| 常规到达 | `regular`（默认） | `849:2920` | 72 |
| 打车到达 | `taxi` | `849:2938` | 84，内容垂直居中 |

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


### 2. POI 榜单卡片（Figma `853:4824` poi/secondary，实例 `853:4996`）

由 `amap-ranking-tag` · `amap-link` · `amap-rank-thumb` · `amap-meta-line` · `amap-fav-button` 组成。

```html
<amap-poi-card theme="blue" heading="臻选好店品质生活" subtitle="精选 8 个热门店铺"></amap-poi-card>
<script>
  document.querySelector('amap-poi-card').items = [
    { name: '隐庐·会席料理', distance: '距您 320 米', details: ['人均 ¥328', '4.9分'], image: '…' },
    { name: '翠园·粤式茶餐厅', distance: '距您 485 米', details: ['人均 ¥168', '4.8分'], favorited: true },
  ];
</script>
```

| 属性 | 说明 |
|---|---|
| `theme` | `orange`（默认）`amber` `red` `pink` `purple` `indigo` `blue` `green` `lime` |
| `heading` | 榜单标题，超长省略（不压水印） |
| `subtitle` | 扫街榜标签文案，如「精选10家热门酒店」 |
| `more-label` | 默认「完整榜单」 |
| `items` | JSON 数组或 `el.items = [...]`；字段 `name` `distance` `details[]` `image` `favorited` |
| `asset-base` | 素材目录 |

事件：`poi-more`、`poi-select`（`{ index, item }`）、`poi-favorite`（`{ index, item, favorited }`）。排名自动编号 01、02…

主题色读自 Figma 各实例填充，每套 3 个 token：`--ds-theme-{name}-surface`（卡片顶色）/ `-accent`（水印六边形）/ `-accent-soft`（水印箭头）。水印为内联 SVG（路径取自 `853:4827`），颜色随主题切换。

素材（`assets/poi/`）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `saojiebang-logo.png` | `853:4834` image 21（Figma 中为位图，按 @3x 渲染导出） | 34×12 |
| `rank-badge.svg` | `853:4845` / `853:4860`（两者相同，各名次共用） | 29×29 |
| `samples/*.png` | 18 张店铺图，仅预览用（按像素比对 Figma 缩略图对应到店铺） | 50×50 @3x |

箭头用全局 `icon-chevron-right.svg`；星标与水印内联在组件中。收藏态填充 `--ds-color-favorite`（暂定 `#FFB300`）。

### 3. 到达地点卡片（Figma `853:5068`，实例 `853:6420`，单 POI `858:6486`）

`<amap-place-card scene>`，三种场景共用一个组件；`<amap-restaurant-card>` 保留为别名（等同 `scene="restaurant"`）。

| 场景 | `scene` | 特有内容 | 高度 |
|---|---|---|---|
| 饭店到达 | `restaurant`（默认） | 热评、多条团购、看团购 / 查看路线 | 370 |
| 景点到达 | `attraction` | 灰色信息标签、门票（票 / 省 N 元 / 起）、订门票 / 查看路线 | 370 |
| 上班到达 | `commute` | 收录年限、单条团购 + 查看更多、一键下单卡片 | 390 |

| 布局 | `layout` | 宽 | 用途 |
|---|---|---|---|
| 默认 | — | 301 | 排行榜等多卡并列 |
| 单 POI | `single` | 365 | 单 POI 导航到达（Figma `858:6486`），通常不传 `rank`，次按钮如「联系商家」 |

卡片宽度跟随宿主，也可直接设置 CSS 变量 `--place-card-width`。

```html
<link rel="stylesheet" href="components/place-card/place-card.css">
<script src="components/place-card/place-card.js"></script>

<amap-place-card scene="commute" rank="1" name="Grid Coffee(万象城店)" distance="<100 米"
  score="4.8" score-label="超棒" details='["奶茶/甜品","￥27/人","662 人导航过"]'
  ranking="雁塔区咖啡榜·第 2 名" tenure="收录 2 年" status="正在营业"
  deals='[{"type":"团","price":"9.9","discount":"6.7折","title":"大杯葡萄冷萃美式"}]' deal-more="查看更多"
  order='{"title":"燕麦拿铁","tag":"上次那杯","spec":"大杯·少冰·标准糖","note":"｜随时退｜不限购","price":"9.9"}'
  saves="4.7k+" image-index="1/12"></amap-place-card>
```

| 属性 | 说明 |
|---|---|
| `scene` | `restaurant` / `attraction` / `commute`，决定默认按钮文案与间距 |
| `layout` | 不传为 301 宽；`single` 为 365 宽 |
| `rank` | 排名 → 飘带，1 金 / 2 银 / 3 铜（第 4 名起暂用铜） |
| `name` / `distance` | 店名（超长省略）/ 距离 |
| `score` / `score-label` | 评分徽标 |
| `details` | JSON 数组，「·」串联 |
| `ranking` / `info-tag` / `tenure` / `status` | 扫街榜 / 灰色信息 / 收录年限 / 营业状态，均可不传 |
| `review` / `review-count` | 热评条 |
| `deals` | JSON 数组 `[{ type: '团'\|'券'\|'票', price, discount, title }]`；`price` 可带「起」，`discount` 可写「省 2 元」 |
| `deal-more` | 第一条团购右侧入口，如「查看更多」 |
| `image` / `saves` / `image-index` | 主图 / 收藏数 / 页码 |
| `primary-label` / `secondary-label` | 底部按钮，默认 看团购（景点：订门票）/ 查看路线 |
| `order` | JSON `{ image, title, tag, spec, note, price, actionLabel, swapLabel }`；有它时替代底部按钮 |

事件：`card-primary` / `card-secondary`（`{ label }`，次按钮可能是「查看路线」或「联系商家」）、`card-review`、`card-deal`（`{ index, deal }`）、`card-more`、`card-order-buy`、`card-order-swap`。

素材（`assets/restaurant/`，SVG 由 Figma 插件 API 直接导出；飘带与麦穗改为组件内联 SVG，颜色走 `--ds-rank-{gold|silver|bronze}-*`）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `score-glow.svg` | `765:3889` Ellipse 11 | 26×10 |
| `icon-fire.svg` | `853:5096` ic:round-whatshot | 16×16 |
| `icon-star-white.svg` | `853:5072` Star 3 | 15×14 |
| `samples/*.jpg` | 主图 284×156 与一键下单商品图 48×48，仅预览用（按像素比对 Figma 对应到卡片；huda-fanguan 与 huda-fanguan-wide 为 1x，其余 @3x） | — |
