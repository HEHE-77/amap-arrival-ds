# Effects

> 来源：Frame 254 全部 effect 统计 + 原型 Interaction 面板（Open overlay）。
> 已确认（2026-10-15）：所有卡片统一 0.6px 描边（`stroke/card`）；只有扫街榜卡片额外加 `shadow/card` 投影；内阴影描边保留为效果（颜色改引用 token）；浮层不加投影，靠 70% 遮罩分层。

## Primitives

- Blur：`4px`（毛玻璃）、`16px`（渐隐）
- Shadow offset / blur：`(0,4) 14`、`(0,-1) 0`
- Opacity：`0.05`、`0.25`、`0.4`、`0.7`、`0.8`

## Semantic Tokens

### Elevation / Shadow

| Token | Value | 用途 | 依据 |
|---|---|---|---|
| `stroke/card` | `0 0 0 0.6px {border/default}` | 所有卡片的描边（0.6px，不计入布局）——卡片的默认层级表达 | Figma 变量 stroke/card = 0.6（2026-10-15 确认） |
| `shadow/card` | `0 4px 14px {shadow/color}` | 扫街榜卡片（POI 卡、分榜卡）在描边之外额外加的轻投影 | 观测「卡片」变量 0 4 13.6 #000@5%（13.6→14） |
| `shadow/divider-top` | `0 -1px 0 {border/subtle}` | 底部操作栏（去下单 / 免密支付栏）顶部分隔 | 观测 #EEE (0,-1) ×3 |
| `shadow/inset-border` | `inset 0 0 0 1px {border/default}` | 以内阴影描边的卡片与输入框（保留为效果） | 观测 #E3E5E8 inset s1 ×16，颜色改引用 token |
| `shadow/inset-selected` | `inset 0 0 0 1.5px {border/selected}` | 选中的日期 / 场次卡 | 观测 #1A67FE inset s1/s1.5 |
| `highlight/button` | `inset 0 -1px 0 {alpha-white.25}` | 渐变实心按钮（订门票 / 去下单）与 TOP 奖牌盾形底部高光 | 观测 white@25% (0,-1) ×9 |

浮层（POI 浮层 / 一键下单浮层）：**不加投影**，层级由 `overlay/scrim` 70% 遮罩表达。

### Glass / Blur

| Token | Value | 用途 | 依据 |
|---|---|---|---|
| `glass/blur` | `backdrop-filter: blur(4px)` | 图片上的热度 / 收藏角标 | 观测 BACKGROUND_BLUR 4 ×67（5 ×9 合并为 4） |
| `glass/background` | `{glass/background}` | 毛玻璃底色（Light 白 80% / Dark 黑 50%） | 见 colors.md |
| `glass/border` | `1px solid {glass/border}` | 毛玻璃发丝描边 | 见 colors.md |
| `blur/fade-edge` | `filter: blur(16px)` | 横滑末尾「查看更多」渐隐卡 | 观测「卡片渐隐」变量 15.4（→16） |

### Opacity / State layers

| Token | Value | 用途 | 依据 |
|---|---|---|---|
| `opacity/disabled` | `0.4` | 不可选场次、禁用按钮 | 观测 40% 填充 |
| `state/pressed` | `{overlay/brand} 叠加` | 蓝色按钮 / 链接按下 | 扩展 |
| `overlay/scrim` | `{alpha-black.70}` | 浮层打开后的背景遮罩 | 原型 Open overlay：#000000 70% |
| `overlay/image` | `{alpha-black.80} / scrim-image 渐变` | 图片角标底、图片底部承载白字 | 观测 #131313@80% |

### Overlay motion（原型观测，记录备查）

| Token | Value | 用途 | 依据 |
|---|---|---|---|
| `motion/overlay-enter` | Move in · 自下而上 · 400ms · ease-in | 浮层打开（Position: Bottom center） | 原型观测 |
| `motion/overlay-dismiss` | 点击外部不关闭 | 浮层需通过关闭按钮 / 下滑收起 | 原型观测（Close when clicking outside 未勾选） |

## Usage Rules

- 卡片统一 `stroke/card`：0.6px `border/default` 描边，不计入布局（保证卡片高度为整数）。功能卡（停车场、加油站、收藏、代驾、打车账单、末班车列表）只用描边；扫街榜卡片（POI 卡、分榜卡）额外加 `shadow/card`，突出内容推荐。
- 浮层不叠加投影；打开时铺 `overlay/scrim` 70% 遮罩。底部操作栏用 `shadow/divider-top` 与浮层内容分隔。
- 用内阴影做描边时，颜色必须引用 `{border/default}` / `{border/selected}`，不写死 hex，以便暗色模式自动切换。
- 毛玻璃只用于压在图片上的小角标；不用于整块面板。
- 暗色模式：投影色取 `shadow/color` 的 Dark 值，但层级主要靠 `surface/elevated` 提亮表达。
- 备注：原型入场缓动为 ease-in；行业惯例入场多用 ease-out（先快后慢），后续做动效规范时可复核。
