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

### 1. Header（Figma `849:2976`）

```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="components/header/header.css">
<script src="components/header/header.js"></script>

<amap-arrival-header address="长安南路 289 号 · 西安万象城(生命之树)" energy="28"></amap-arrival-header>
```

| 属性 | 说明 |
|---|---|
| `heading` | 标题，默认「已到达」 |
| `address` | 地址，超长省略 |
| `energy` | 绿色能量克数，不传则隐藏 |
| `trip-label` | 默认「行程回溯」 |
| `asset-base` | 素材目录 |

事件：`trip-replay`（点击行程回溯）。

素材（需从 Figma 导出到 `assets/`）：

| 文件名 | Figma 节点 | 尺寸 |
|---|---|---|
| `header-map-thumb.png` | `849:2977` image 6 | 216×216，导出 @2x/@3x |
| `icon-green-energy.png` | `849:2986` Frame | 18×17 |
| `icon-arrow-right.png` | `849:2992` ic:baseline-keyboard-arrow-right | 17×17 |
