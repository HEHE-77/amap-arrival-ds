# 高德到达页 · 设计系统

逐个组件搭建。技术栈：原生 HTML / CSS 变量 / Web Component，无构建步骤，任何框架都能直接引用。

```
tokens/      tokens.json（真源）+ tokens.css（CSS 变量）
components/  每个组件一个目录：*.css + *.js
preview/     组件状态预览页
assets/      从 Figma 导出的素材
```

## 查看交互效果

在浏览器打开 `preview/` 下对应组件的页面（如 `preview/poi-card.html`），列出全部状态，事件会显示在默认态下方。

## Token 分层

| 层 | 作用 | 例子 |
|---|---|---|
| primitive | 原始值，不带语义 | `--ds-gray-900` `--ds-space-8` |
| semantic | 用途，组件只引用这一层 | `--ds-color-text-primary` |
| component | 组件私有尺寸/间距，可被覆盖 | `--header-fade-stop` |

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

事件：`trip-replay`（点击行程回溯）。

素材（`assets/`，均为 @3x PNG；地图只导出 header 内可见的那块）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `header-map-thumb.png` | `849:2921` image 8（可见区域） | 212×72 |
| `header-map-thumb-taxi.png` | `849:2939` image 7（可见区域） | 319×84 |
| `icon-green-energy.png` | `849:2986` Frame | 18×17 |
| `icon-arrow-right.png` | `849:2992` ic:baseline-keyboard-arrow-right | 17×17 |

### 2. POI 榜单卡片（Figma `853:4824` poi/secondary）

```html
<link rel="stylesheet" href="components/poi-card/poi-card.css">
<script src="components/poi-card/poi-card.js"></script>

<amap-poi-card heading="藏在街巷的烟火气" count="13"></amap-poi-card>
<script>
  document.querySelector('amap-poi-card').items = [
    { name: '老白家肉丸胡辣汤', distance: '距您 250 米', price: '人均 ¥18', image: '…' },
    { name: '竹笆市甑糕', distance: '距您 780 米', price: '人均 ¥15', image: '…', favorited: true },
  ];
</script>
```

| 属性 | 说明 |
|---|---|
| `heading` | 榜单标题，超长省略（不压水印） |
| `count` | 生成「精选 N 个热门店铺」，不传只显示扫街榜标识 |
| `more-label` | 默认「完整榜单」 |
| `items` | JSON 数组或 `el.items = [...]`；字段 `name` `distance` `price` `image` `favorited` |
| `asset-base` | 素材目录 |

事件：`poi-more`、`poi-select`（`{ index, item }`）、`poi-favorite`（`{ index, item, favorited }`，组件内已切换状态）。排名序号按顺序自动生成 01、02…

素材（`assets/poi/`，@3x PNG）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `poi-watermark.png` | `853:4827` Group 18 | 73×70 |
| `saojiebang-logo.png` | `853:4834` image 21 | 34×12 |
| `icon-chevron-right-muted.png` | `853:4838` | 16×18 |
| `rank-badge-1.png` | `853:4845` | 29×29 |
| `rank-badge-2.png` | `853:4860` | 29×29 |
| `icon-star-outline.png` | `853:4854` | 26×25 |
| `icon-star-filled.png` | 收藏态（Figma 中未见） | 26×25 |
| `sample-poi-1.png` / `sample-poi-2.png` | `853:4844` / `853:4859`（仅预览用） | 50×50 |
