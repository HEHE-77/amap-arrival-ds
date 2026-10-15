# Breakpoints & Grid

> 原生 iOS 页面，「断点」= 适配的手机宽度，不做 Web 式响应。设计基准 402（iPhone 16 Pro）。
> 已确认：只做手机三档；边距/间距/字号固定，只有内容区随宽度变化；横滑卡固定 284。

## Primitives

| Token | Width | Content width | 4 列单列宽 | 设备 | 依据 |
|---|---|---|---|---|---|
| `device/compact` | 375pt | 343pt | 76.75pt | iPhone SE / mini、部分安卓小屏 | 推导：适配下限 |
| `device/base` | 402pt | 370pt | 83.50pt | iPhone 16 Pro —— 设计基准 | 观测：6 个画板均为 402 |
| `device/large` | 440pt | 408pt | 93.00pt | iPhone 16 Pro Max | 推导：适配上限 |

## Semantic Tokens

| Token | Value | 用途 | 依据 |
|---|---|---|---|
| `grid/columns` | 4 | 普通内容区栅格 | 推导：移动端标准 |
| `grid/gutter` | 12px | 列间距（= layout/carousel-gap） | 观测 |
| `grid/margin` | 16px | 左右边距（= layout/page-margin），各宽度固定 | 已确认 |
| `grid/content-width` | 100% − 2 × 16px | 内容区随屏宽自适应：343 / 370 / 408 | 已确认 |
| `carousel/card-width` | 284px | 扫街榜横滑卡，各宽度固定，始终露出下一张 | 观测，已确认固定 |

## Usage Rules

- **compact（375）**：内容区 343；横滑卡仍 284，露出下一张约 47pt；一行 3 张的图片推荐卡改为横滑，避免单卡过窄。
- **base（402）**：设计基准，所有标注以此为准。
- **large（440）**：内容区 408；不放大字号和间距，多出的宽度留给内容（横滑卡多露出、列表行更宽）。
- 不定义平板 / 折叠屏布局，列入 DESIGN.md 已知缺口。
