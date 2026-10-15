# Color

> 高德地图 · 导航到达页设计系统。来源：Figma `到达页hifi / Frame 254`（6 屏，2,459 图层逐一统计）。
> 结构：双主色（高德蓝 = 功能/导航，交易橙 = 商业转化）+ 扫街榜金棕 + 5 场景色 + 冷灰中性 + 功能色 + Alpha。每个语义角色均有 Light / Dark 两值。

## Primitives

### Brand · 高德蓝

_高德蓝 · .50/.100/.500/.600 观测（主题蓝变量 #0980FE；按钮渐变起点 #1A67FE）；其余扩展_

| Token | .50 | .100 | .200 | .300 | .400 | .500 | .600 | .700 | .800 | .900 | .950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `brand` | `#EBF3FE` | `#D4E6FF` | `#C0DCF9` | `#90C3FA` | `#52A5FC` | `#0980FE` | `#1A67FE` | `#0855A7` | `#0B4078` | `#0B2A4B` | `#09192A` |

### Commerce · 交易橙

_交易橙 · .100/.200/.400/.500 观测（.50 补齐）（价格、下单按钮、团购标签描边）；合并 #FF4F1F #FE5E33 #FF5B2E_

| Token | .50 | .100 | .200 | .300 | .400 | .500 | .600 | .700 | .800 | .900 | .950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `commerce` | `#FFF3EB` | `#FFEBDE` | `#FFDEC8` | `#FAAD94` | `#FF7A3D` | `#FF4D13` | `#E13903` | `#AE3007` | `#7C260A` | `#4D1B0B` | `#2A1109` |

### Extended · 扫街榜金棕

_扫街榜金棕 · .50/.200/.700/.900 观测（距离变量 #835B32、榜单标签渐变、深棕标题）；tag-text #8B4424 为扫街榜标签文字（观测 ×19，#BD581A 并入）；.500 由 .700 反推_

| Token | .50 | .100 | .200 | .300 | .400 | .500 | .600 | .700 | .800 | .900 | .950 | .tag-text |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `ranking` | `#FFF4E2` | `#FDE6D0` | `#FCD6B8` | `#DAC1A7` | `#CAA177` | `#B07A43` | `#926639` | `#835B32` | `#553E26` | `#4A240A` | `#211A12` | `#8B4424` |

### Extended · 扫街榜奖牌文字

_扫街榜 TOP 奖牌文字色 · 全部观测（源组件 01/02/03）；固定色，两模式不变_

| Token | .bronze-text | .gold-text | .silver-text |
|---|---|---|---|
| `medal` | `#7A4137` | `#4A240A` | `#4F5568` |

### Extended · 场景色

_场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info_

| Token | .50 | .100 | .200 | .300 | .400 | .500 | .600 | .700 | .800 | .900 | .950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `cat-blue` | `#E5F2FF` | `#DFEBFB` | `#C8DEF7` | `#A0C8F4` | `#6CACF2` | `#2E8BF0` | `#1372DA` | `#135BA9` | `#134378` | `#102C4B` | `#0B1928` |
| `cat-green` | `#E5FFF0` | `#D8FDE4` | `#BDEED5` | `#89E5B7` | `#47DB92` | `#1FA864` | `#1C8C54` | `#197045` | `#165435` | `#123A26` | `#0E251A` |
| `cat-indigo` | `#F2F1FD` | `#E5EDFF` | `#DBE4FD` | `#B6B7F5` | `#9092F4` | `#6366F1` | `#2E32E9` | `#191DC2` | `#171A88` | `#121451` | `#0C0C27` |
| `cat-pink` | `#FFE5EF` | `#FFD8EB` | `#F5CDDB` | `#F1A9C2` | `#ED7CA3` | `#E8457E` | `#DB1E60` | `#A91C4D` | `#78193A` | `#4A1326` | `#260D16` |
| `cat-amber` | `#FFF5E5` | `#FFEED0` | `#F4E2C4` | `#F0CF98` | `#EDB760` | `#E89A1C` | `#C28016` | `#976616` | `#6D4B14` | `#453110` | `#271D0C` |
| `cat-purple` | `#F3E5FF` | `#F2DDFF` | `#E2D0F3` | `#CFAFED` | `#B784E7` | `#9B51E0` | `#8128D4` | `#6624A3` | `#4B1E74` | `#301647` | `#1A0E25` |
| `cat-red` | `#FFE5E5` | `#FFDEDE` | `#F7CDCD` | `#F4A9A9` | `#F27B7B` | `#EF4444` | `#E71717` | `#B21717` | `#7E1515` | `#4D1111` | `#270C0C` |
| `cat-lime` | `#F3FFE5` | `#DDFFD8` | `#DBEEC5` | `#C2E59A` | `#A2DC62` | `#7CC52A` | `#68A325` | `#538020` | `#3F5E1B` | `#2A3D15` | `#1A240F` |

场景映射：`cat-blue` = 住宿 · 信息 · 品质甄选；`cat-green` = 生活服务 · 专程前往；`cat-indigo` = 文化 · 夜游 · 酒店；`cat-pink` = 美食 · 本地人爱去；`cat-amber` = 茶饮 · 下午茶；`cat-purple` = 休闲按摩；`cat-red` = 近期新开；`cat-lime` = 慢饮时光

### Neutral · 冷灰

_冷灰 · .0/.50/.100/.200/.300/.400/.600/.900 观测（正文字体/正文灰/Stroke 变量）；37 种文字灰归并于此；canvas #FEFEFE（页面底）与 card #FEFDFD（顶部到达卡）按原稿指定值单列_

| Token | .0 | .50 | .100 | .200 | .300 | .400 | .500 | .600 | .700 | .800 | .900 | .950 | .canvas | .card |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `neutral` | `#FFFFFF` | `#F8F8F8` | `#F4F5F7` | `#E8E9EB` | `#C8C8C8` | `#999999` | `#7A7D86` | `#60636C` | `#51535A` | `#2A2B2F` | `#191919` | `#0F1012` | `#FEFEFE` | `#FEFDFD` |

### Functional

_「正在开放」绿 + #A0DBA4 描边、评分星黄、地铁标红均观测；info 复用 cat-blue；扩展到 5 阶因描边色 .200 被观测到_

| Token | .50 | .200 | .500 | .700 | .900 |
|---|---|---|---|---|---|
| `success` | `#E9FFED` | `#A0DBA4` | `#16A85A` | `#13713F` | `#103B24` |
| `warning` | `#FFF6E5` | `#F9E8C6` | `#FAB428` | `#CA7C1C` | `#4E380D` |
| `danger` | `#FFF1F0` | `#FAC8CC` | `#FF3041` | `#BE0817` | `#520B11` |
| `info` | `#E5F2FF` | `#C8DEF7` | `#2E8BF0` | `#135BA9` | `#102C4B` |

### Alpha

_white.80/.90、black.80（图片角标底 #131313@80%）、black.05（卡片投影）、black.70（原型 Open overlay 背景 #000 70%）、white.25（按钮高光）观测；其余补齐_ 两模式共用（透明度相对于下层）。

| Token | Base | Opacity |
|---|---|---|
| `alpha-white.25` | `#FFFFFF` | 25% |
| `alpha-white.40` | `#FFFFFF` | 40% |
| `alpha-white.80` | `#FFFFFF` | 80% |
| `alpha-white.90` | `#FFFFFF` | 90% |
| `alpha-black.05` | `#131313` | 5% |
| `alpha-black.12` | `#131313` | 12% |
| `alpha-black.50` | `#131313` | 50% |
| `alpha-black.70` | `#000000` | 70% |
| `alpha-black.80` | `#131313` | 80% |
| `alpha-brand.16` | `#0980FE` | 16% |
| `alpha-ranking.40` | `#FFE3C9` | 40% |
| `alpha-brand.24` | `#0980FE` | 24% |

### 不进 token 的数据色

地铁 / 公交线路色（如 2 号线红、12 路紫）由城市线路数据下发，组件只提供承载容器，不在本色板中定义。

## Semantic Tokens

引用写法 `{ramp.step}`。Light / Dark 两列。

### Background

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `bg/page` | `{neutral.canvas}` | `{neutral.950}` | 到达页整页底色（#FEFEFE，原稿指定） |
| `bg/page-subtle` | `{neutral.100}` | `{neutral.900}` | 分组区块底、横滑「查看更多」底 |
| `bg/brand-soft` | `{brand.50}` | `{brand.900}` | 蓝色弱强调区（导航过去按钮底） |
| `bg/commerce-soft` | `{commerce.50}` | `{commerce.900}` | 团购/优惠信息条底 |
| `bg/ranking-soft` | `{ranking.50}` | `{ranking.900}` | 扫街榜标签与榜单卡头底 |
| `bg/ranking-tag` | `{alpha-ranking.40}` | `{alpha-ranking.40}` | 列表/榜单内「扫街榜」小标签浅金底（#FFE3C9 40%，固定） |
| `bg/inverse` | `{neutral.900}` | `{neutral.50}` | 反色 Toast、深色角标 |
| `bg/disabled` | `{neutral.100}` | `{neutral.800}` | 禁用控件底 |

### Surface

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `surface/default` | `{neutral.0}` | `{neutral.900}` | POI 卡片、列表卡 |
| `surface/card` | `{neutral.card}` | `{neutral.900}` | 顶部「已到达」信息卡（#FEFDFD，原稿指定） |
| `surface/subtle` | `{neutral.50}` | `{neutral.950}` | 卡内次级区（套餐行、班车时间行） |
| `surface/elevated` | `{neutral.0}` | `{neutral.800}` | 浮层（POI 浮层、一键下单浮层） |
| `surface/sunken` | `{neutral.100}` | `{neutral.950}` | 数量步进器、输入框底 |
| `surface/glass` | `{alpha-white.80}` | `{alpha-black.50}` | 图片上的毛玻璃角标（收藏、热度） |
| `surface/accent` | `{brand.50}` | `{brand.900}` | 选中日期/场次卡 |
| `surface/selected` | `{brand.100}` | `{brand.800}` | 选中态强调 |
| `surface/hover` | `{neutral.50}` | `{neutral.800}` | 按压前的轻反馈（Web） |
| `surface/pressed` | `{neutral.100}` | `{neutral.700}` | 列表项按下 |
| `surface/disabled` | `{neutral.100}` | `{neutral.800}` | 不可选场次 |

### Text

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `text/primary` | `{neutral.900}` | `{neutral.50}` | 标题、POI 名、正文 |
| `text/secondary` | `{neutral.600}` | `{neutral.300}` | 描述、元信息（¥40/人 · 4.5w+人导航过） |
| `text/tertiary` | `{neutral.400}` | `{neutral.500}` | 弱提示、时间戳 |
| `text/placeholder` | `{neutral.300}` | `{neutral.600}` | 输入占位 |
| `text/disabled` | `{neutral.300}` | `{neutral.700}` | 不可选场次文字 |
| `text/inverse` | `{neutral.0}` | `{neutral.900}` | 实心按钮、图片上文字 |
| `text/accent` | `{brand.500}` | `{brand.400}` | 「查看路线」「导航过去」等功能操作 |
| `text/link` | `{brand.500}` | `{brand.400}` | 「看完整扫街榜」等跳转 |
| `text/price` | `{commerce.500}` | `{commerce.400}` | 价格、折扣、优惠金额 |
| `text/ranking` | `{ranking.700}` | `{ranking.300}` | 距离、扫街榜标签文字 |
| `text/ranking-tag` | `{ranking.tag-text}` | `{ranking.tag-text}` | 「扫街榜」小标签深棕字（固定色，压在金色底上） |
| `text/success` | `{success.500}` | `{success.500}` | 正在营业 / 正在开放、绿色能量（Light 按 Figma 变量 #16A85A，2026-10-15 确认） |
| `text/warning` | `{warning.700}` | `{warning.500}` | 即将关门、限行提醒 |
| `text/danger` | `{danger.700}` | `{danger.500}` | 已售罄、错误 |
| `text/info` | `{info.700}` | `{info.500}` | 信息提示 |
| `text/medal-gold` | `{medal.gold-text}` | `{medal.gold-text}` | TOP 01 奖牌文字（固定色） |
| `text/medal-silver` | `{medal.silver-text}` | `{medal.silver-text}` | TOP 02 奖牌文字（固定色） |
| `text/medal-bronze` | `{medal.bronze-text}` | `{medal.bronze-text}` | TOP 03 奖牌文字（固定色） |

### Icon

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `icon/primary` | `{neutral.900}` | `{neutral.50}` | 导航栏返回/搜索/分享 |
| `icon/secondary` | `{neutral.600}` | `{neutral.300}` | 列表右箭头、辅助图标 |
| `icon/tertiary` | `{neutral.400}` | `{neutral.500}` | 弱化图标 |
| `icon/disabled` | `{neutral.300}` | `{neutral.700}` | 禁用图标 |
| `icon/inverse` | `{neutral.0}` | `{neutral.900}` | 图片上的收藏星、热度星 |
| `icon/accent` | `{brand.500}` | `{brand.400}` | 「还有 20 分钟」时间图标 |
| `icon/price` | `{commerce.500}` | `{commerce.400}` | 热议火焰、团购图标 |
| `icon/ranking` | `{ranking.700}` | `{ranking.300}` | 扫街榜图标 |
| `icon/success` | `{success.700}` | `{success.500}` | 绿色能量叶子 |
| `icon/warning` | `{warning.500}` | `{warning.500}` | 评分星（实心填充，两模式不变） |
| `icon/danger` | `{danger.700}` | `{danger.500}` | 错误 |
| `icon/info` | `{info.700}` | `{info.500}` | 信息 |

### Border

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `border/subtle` | `{neutral.100}` | `{neutral.800}` | 卡内分隔线 |
| `border/default` | `{neutral.200}` | `{neutral.700}` | 卡片描边、次按钮描边（Stroke 变量） |
| `border/strong` | `{neutral.400}` | `{neutral.500}` | 强调分隔 |
| `border/accent` | `{brand.500}` | `{brand.500}` | 蓝色描边按钮（查看路线）——不作普通分割线 |
| `border/commerce` | `{commerce.200}` | `{commerce.800}` | 团购/票务标签描边 |
| `border/brand-soft` | `{brand.50}` | `{brand.900}` | 浅蓝按钮（导航过去、去停车）描边 |
| `border/focus` | `{brand.500}` | `{brand.400}` | 键盘/无障碍焦点 |
| `border/selected` | `{brand.500}` | `{brand.500}` | 选中日期/场次 |
| `border/disabled` | `{neutral.200}` | `{neutral.800}` | 禁用控件 |
| `border/success` | `{success.200}` | `{success.700}` | 「正在开放」标签描边 |
| `border/warning` | `{warning.200}` | `{warning.700}` | 警告标签描边 |
| `border/danger` | `{danger.200}` | `{danger.700}` | 错误描边 |
| `border/info` | `{info.200}` | `{info.700}` | 信息标签描边 |

### Overlay / Glass / Focus / Shadow

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `overlay/scrim` | `{alpha-black.70}` | `{alpha-black.70}` | 浮层打开后的背景遮罩（原型观测 #000000 70%） |
| `overlay/image` | `{alpha-black.80}` | `{alpha-black.80}` | 图片底部文字压暗（配合 scrim-image 渐变） |
| `overlay/brand` | `{alpha-brand.16}` | `{alpha-brand.16}` | 蓝色按压层 |
| `glass/background` | `{alpha-white.80}` | `{alpha-black.50}` | 毛玻璃底 |
| `glass/border` | `{alpha-white.40}` | `{alpha-white.40}` | 毛玻璃发丝描边 |
| `focus/ring` | `{alpha-brand.24}` | `{brand.400}` | 焦点光环（暗色提亮） |
| `focus/ring-strong` | `{brand.500}` | `{brand.400}` | 高对比焦点 |
| `shadow/color` | `{alpha-black.05}` | `{alpha-black.50}` | 卡片投影色（观测 #000@5%） |
| `shadow/color-strong` | `{alpha-black.12}` | `{alpha-black.80}` | 浮层投影色 |

### Rank theme · 扫街榜分榜

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `rank-theme/smoky/wash` | `{commerce.50}` | `{commerce.900}` | 烟火小店 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/smoky/badge` | `{commerce.100}` | `{commerce.800}` | 烟火小店 · 右上箭头徽标 |
| `rank-theme/smoky/glow` | `{commerce.50}` | `{commerce.900}` | 烟火小店 · 徽标高光（渐隐） |
| `rank-theme/quality/wash` | `{cat-blue.50}` | `{cat-blue.900}` | 品质甄选 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/quality/badge` | `{cat-blue.100}` | `{cat-blue.800}` | 品质甄选 · 右上箭头徽标 |
| `rank-theme/quality/glow` | `{cat-blue.50}` | `{cat-blue.900}` | 品质甄选 · 徽标高光（渐隐） |
| `rank-theme/destination/wash` | `{cat-green.50}` | `{cat-green.900}` | 专程前往 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/destination/badge` | `{cat-green.100}` | `{cat-green.800}` | 专程前往 · 右上箭头徽标 |
| `rank-theme/destination/glow` | `{cat-green.50}` | `{cat-green.900}` | 专程前往 · 徽标高光（渐隐） |
| `rank-theme/hotel/wash` | `{cat-indigo.100}` | `{cat-indigo.900}` | 酒店 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/hotel/badge` | `{cat-indigo.200}` | `{cat-indigo.800}` | 酒店 · 右上箭头徽标 |
| `rank-theme/hotel/glow` | `{cat-indigo.50}` | `{cat-indigo.900}` | 酒店 · 徽标高光（渐隐） |
| `rank-theme/local/wash` | `{cat-pink.50}` | `{cat-pink.900}` | 本地人爱去 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/local/badge` | `{cat-pink.100}` | `{cat-pink.800}` | 本地人爱去 · 右上箭头徽标 |
| `rank-theme/local/glow` | `{cat-pink.50}` | `{cat-pink.900}` | 本地人爱去 · 徽标高光（渐隐） |
| `rank-theme/tea/wash` | `{cat-amber.50}` | `{cat-amber.900}` | 下午茶 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/tea/badge` | `{cat-amber.100}` | `{cat-amber.800}` | 下午茶 · 右上箭头徽标 |
| `rank-theme/tea/glow` | `{cat-amber.50}` | `{cat-amber.900}` | 下午茶 · 徽标高光（渐隐） |
| `rank-theme/relax/wash` | `{cat-purple.50}` | `{cat-purple.900}` | 休闲按摩 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/relax/badge` | `{cat-purple.100}` | `{cat-purple.800}` | 休闲按摩 · 右上箭头徽标 |
| `rank-theme/relax/glow` | `{cat-purple.50}` | `{cat-purple.900}` | 休闲按摩 · 徽标高光（渐隐） |
| `rank-theme/new/wash` | `{cat-red.50}` | `{cat-red.900}` | 近期新开 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/new/badge` | `{cat-red.100}` | `{cat-red.800}` | 近期新开 · 右上箭头徽标 |
| `rank-theme/new/glow` | `{cat-red.50}` | `{cat-red.900}` | 近期新开 · 徽标高光（渐隐） |
| `rank-theme/slow/wash` | `{cat-lime.50}` | `{cat-lime.900}` | 慢饮时光 · 卡头底色（自上而下渐隐至卡片底） |
| `rank-theme/slow/badge` | `{cat-lime.100}` | `{cat-lime.800}` | 慢饮时光 · 右上箭头徽标 |
| `rank-theme/slow/glow` | `{cat-lime.50}` | `{cat-lime.900}` | 慢饮时光 · 徽标高光（渐隐） |

### Status bundles

每个状态是 bg + text + border + icon 四件套，且必须配文字或图标形状，不能只靠颜色。

| State | bg (L / D) | text (L / D) | border (L / D) | icon (L / D) |
|---|---|---|---|---|
| success | `{success.50}` / `{success.900}` | `{success.700}` / `{success.500}` | `{success.200}` / `{success.700}` | `{success.700}` / `{success.500}` |
| warning | `{warning.50}` / `{warning.900}` | `{warning.700}` / `{warning.500}` | `{warning.200}` / `{warning.700}` | `{warning.700}` / `{warning.500}` |
| danger | `{danger.50}` / `{danger.900}` | `{danger.700}` / `{danger.500}` | `{danger.200}` / `{danger.700}` | `{danger.700}` / `{danger.500}` |
| info | `{info.50}` / `{info.900}` | `{info.700}` / `{info.500}` | `{info.200}` / `{info.700}` | `{info.700}` / `{info.500}` |

### Gradients

受控命名集，不为单个组件新建渐变。每个渐变提供 Fill + Stroke × 水平 + 垂直。

| Name | Value | 色阶来源 | 用途 |
|---|---|---|---|
| `gradient/theme` | `linear-gradient(90deg, #1A67FE 0%, #198AFE 100%)` | brand.600 → brand.500 区间 | 主操作按钮（看团购、订门票蓝色实心）；两模式通用 |
| `gradient/theme-light` | `linear-gradient(180deg, #E5F2FF 0%, #FEFEFE 51%)` | cat-blue.50 → neutral.0 | 浅色卡头、弱背景 |
| `gradient/theme-dark` | `linear-gradient(180deg, #0B2A4B 0%, #191919 60%)` | brand.900 → neutral.900 | theme-light 的暗色版 |
| `gradient/commerce` | `linear-gradient(90deg, #FF5B2E 0%, #FF7A3D 100%)` | commerce.500 → commerce.400 | 「去下单」「免密支付」商业主按钮 |
| `gradient/ranking-tag` | `linear-gradient(90deg, #FCD6B8 10%, #FFF4E2 61%, #FFE3C9 100%)` | ranking.200 → ranking.50 | 扫街榜标签底 |
| `gradient/medal-gold` | `linear-gradient(160deg, #FEE495 2%, #FEF6E2 48%, #FEE493 100%)` | 金 · TOP 01 盾形底 | 榜单第 1 名角标底 |
| `gradient/medal-silver` | `linear-gradient(160deg, #DFE4ED 0%, #F7F8FE 43%, #DFE4ED 100%)` | 银 · TOP 02 盾形底 | 榜单第 2 名角标底 |
| `gradient/medal-bronze` | `linear-gradient(160deg, #F9DCC8 0%, #FCF3EE 49%, #F9DCC8 100%)` | 铜 · TOP 03 盾形底 | 榜单第 3 名角标底 |
| `gradient/medal-gold-laurel` | `linear-gradient(165deg, #F4BD8D 0%, #BF8249 100%)` | 金 · TOP 01 麦穗 | 奖牌两侧麦穗 |
| `gradient/medal-silver-laurel` | `linear-gradient(165deg, #DBDBDB 0%, #B1B1B3 100%)` | 银 · TOP 02 麦穗 | 奖牌两侧麦穗 |
| `gradient/medal-bronze-laurel` | `linear-gradient(165deg, #EACAB5 0%, #D99D89 100%)` | 铜 · TOP 03 麦穗 | 奖牌两侧麦穗 |
| `gradient/header-fade` | `linear-gradient(90deg, #FEFEFE 56%, rgba(254,254,254,0) 100%)` | neutral.canvas → 透明 | 到达头部卡：压在右侧地图上，左侧承载文字 |
| `gradient/hot-review` | `linear-gradient(90deg, #FFE9E7 0%, rgba(254,244,243,0) 100%)` | cat-red.50 → 透明 | 扫街榜 POI 卡「热评」条底色，左→右渐隐 |
| `gradient/scrim-image` | `linear-gradient(180deg, rgba(30,30,30,0) 0%, rgba(30,30,30,1) 79%)` | alpha-black 0 → 100% | 图片卡底部渐隐，承载白字 |

## Usage Rules

- **蓝做事，橙成交。** `brand` 只用于功能与导航操作（查看路线、导航过去、链接、选中）；`commerce` 只用于价格与交易动作（价格、折扣、订门票/去下单）。同一卡片里两颗按钮并排时，交易主按钮在左、功能次按钮在右（描边蓝）。
- **`danger` 不是 `commerce`。** 交易橙是转化色，绝不用来表示错误；错误/售罄用 `danger`（偏玫红）。
- **扫街榜金棕只服务榜单身份**：榜单标签、距离、TOP 角标。不用于普通正文强调。
- **场景色只做背景 wash**（`.50` 卡头渐变），不做文字或按钮色；同屏最多 3 个场景色并列。
- 渐变只用于主操作、品牌强调与关键背景；渐变上的文字用 `text/inverse`，按渐变最浅点校验对比度。同屏不混用多个方向的主渐变。
- 暗色模式下，`surface/elevated` 以提亮（neutral.800）而非投影表达层级。
