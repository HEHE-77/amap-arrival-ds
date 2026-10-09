# 高德到达页 · 设计系统

逐个组件搭建。技术栈：原生 HTML / CSS 变量 / Web Component，无构建步骤，任何框架都能直接引用。

```
tokens/      tokens.json（真源）+ tokens.css（CSS 变量）
components/  每个组件一个目录：*.css + *.js
preview/     组件状态预览页
assets/      从 Figma 导出的素材
```

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
