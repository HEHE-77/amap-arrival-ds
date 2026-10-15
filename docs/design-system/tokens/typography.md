# Typography

> **字族（2026-10-15 确认）**：中文与英文用 **PingFang SC**，非苹果平台回退 **Noto Sans SC**（思源黑体）；独立数字用 **Helvetica Bold**；TOP 奖牌用 **Khand SemiBold**。Figma 文字样式的字族绑定在 `font/family/*` 变量上（`zh` / `zh-fallback` / `numeric` / `medal`）。
> 已确认：每级写死行高；最小字号 10px（原 8px TOP 文字并入 caption）；中文只用 400/500/600 三个字重（去掉 Light 300）；数字统一 Helvetica Bold（Helvetica 无 Medium）；Heading 行高为 Auto（单行标题，实际约 22px）。

## Primitives

一套字号与行高，中英共用。

| Step | Size | Line-height | Ratio |
|---|---|---|---|
| `display` | 24px | 30px | 1.25 |
| `heading` | 16px | auto | auto |
| `subheading` | 14px | 18px | 1.29 |
| `body` | 12px | 17px | 1.42 |
| `body-sm` | 11px | 15px | 1.36 |
| `caption` | 10px | 13px | 1.30 |
| `label` | 12px | 14px | 1.17 |

## Semantic Tokens — English

```yaml
family:
  display: '"PingFang SC", "Noto Sans SC", sans-serif'   # 苹方；非苹果平台回退 Noto Sans SC（思源黑体）
  body: '"PingFang SC", "Noto Sans SC", sans-serif'   # 中英共用一个字族；回退 Noto Sans SC
  numeric: 'Helvetica, "Helvetica Neue", Arial, sans-serif'   # Helvetica Bold + tabular-nums（原稿观测）；Helvetica 无 Medium，三档数字均为 Bold
  numeric-medal: '"Khand", sans-serif'   # 例外：TOP 奖牌用 Khand SemiBold（SIL OFL，随包加载）
scale:
  display: { size: 24px, weight: 600, line-height: 30px, letter-spacing: 0px }   # 「已到达」页面标题
  heading: { size: 16px, weight: 600, line-height: auto, letter-spacing: 0px }   # 区块标题「扫街榜 · 猜你想去」「附近精选」
  subheading: { size: 14px, weight: 500, line-height: 18px, letter-spacing: 0px }   # POI 名、卡片标题
  body: { size: 12px, weight: 400, line-height: 17px, letter-spacing: 0px }   # 卡片正文、元信息、推荐理由
  body-sm: { size: 11px, weight: 400, line-height: 15px, letter-spacing: 0px }   # 列表次要信息、浮层说明
  caption: { size: 10px, weight: 400, line-height: 13px, letter-spacing: 0px }   # 标签、角标、状态标签、TOP 文字（原 8px 统一提到 10）
  label: { size: 12px, weight: 500, line-height: 14px, letter-spacing: 0px }   # 按钮文字、价格、团购标签
numeric:   # font-variant-numeric: tabular-nums
  numeric-lg: { family: numeric, size: 24px, weight: 700, line-height: 28px }   # 大号价格 / 合计金额（共计 ¥18.28）
  numeric-md: { family: numeric, size: 14px, weight: 700, line-height: 18px }   # 班车时间、数量
  numeric-sm: { family: numeric, size: 12px, weight: 700, line-height: 14px }   # 价格「¥40」、距离数字
  numeric-medal: { family: numeric-medal, size: 24px, weight: 600, line-height: auto }   # TOP 角标排名数字 01/02/03 · Khand SemiBold
  medal-label: { family: numeric-medal, size: 12px, weight: 600, line-height: 13.44px }   # TOP 角标「TOP」字样 · Khand SemiBold · 字间距 1
```

## Semantic Tokens — 中文

```yaml
observed: true   # PingFang SC；非苹果平台回退 Noto Sans SC
family:
  display: '"PingFang SC", "Noto Sans SC", sans-serif'   # PingFang SC（原稿 98% 文字图层）；非苹果平台回退 Noto Sans SC
  body: '"PingFang SC", "Noto Sans SC", sans-serif'   # PingFang SC；非苹果平台回退 Noto Sans SC
weights: [400 Regular, 500 Medium, 600 Semibold]
scale:   # 与英文同字号同行高，letter-spacing 统一 0
  display: { size: 24px, weight: 600, line-height: 30px, letter-spacing: 0 }   # 来源：观测 24 Semibold
  heading: { size: 16px, weight: 600, line-height: auto, letter-spacing: 0 }   # 来源：变量「标题」
  subheading: { size: 14px, weight: 500, line-height: 18px, letter-spacing: 0 }   # 来源：变量「卡片副标题」16.9→18
  body: { size: 12px, weight: 400, line-height: 17px, letter-spacing: 0 }   # 来源：变量「卡片正文」×335
  body-sm: { size: 11px, weight: 400, line-height: 15px, letter-spacing: 0 }   # 来源：观测 11
  caption: { size: 10px, weight: 400, line-height: 13px, letter-spacing: 0 }   # 来源：观测 10/13.4
  label: { size: 12px, weight: 500, line-height: 14px, letter-spacing: 0 }   # 来源：变量「卡片团购价格」
```

## Usage Rules

- 中英文使用 PingFang SC，非苹果平台回退 Noto Sans SC；Figma 文字样式的字族绑定在 `font/family/*` 变量上，切换字体只需改变量值。
- **独立数字例外**：价格、时间、数量、合计用 `numeric-*`（Helvetica Bold，tabular-nums），即使嵌在中文卡片里也不换成中文字体，保证对齐、跳动时不抖。
- `numeric-medal`（数字，24 / Auto）与 `medal-label`（「TOP」，12/13.44，字间距 1）只给 TOP 奖牌，使用 Khand SemiBold，不得用于价格或正文。
- **最小字号 10px**：`caption` 是下限，任何文字不得小于 10px。原 8px TOP 文字统一并入 `caption`，需要强调时用 `中文/Caption Strong`（10/13 · 600）。
- 标题层级只靠字号 + 字重，不额外用颜色区分；颜色语义见 `colors.md`（价格 `text/price`、距离 `text/ranking`）。
