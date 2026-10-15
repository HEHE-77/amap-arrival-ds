---
version: alpha
name: "高德地图 · 导航到达页 Design System"
description: >
  到达页是导航的终点、也是下一段消费的起点：一个以冷灰白为底、信息密度很高的移动端列表页，
  用高德蓝承担「去哪、怎么去」的功能动作，用交易橙承担「买什么、多少钱」的成交动作，
  再用扫街榜金棕给榜单内容打上身份标记。PingFang SC 小字号（12px 正文）承载大量 POI 信息，
  层级靠字号与字重而非颜色；卡片统一 0.6px 描边（扫街榜卡片另加 5% 轻投影），圆角按嵌套递减；浮层以 70% 黑色遮罩分层。
colors:
  palette:
    brand: { 50: "#EBF3FE", 100: "#D4E6FF", 200: "#C0DCF9", 300: "#90C3FA", 400: "#52A5FC", 500: "#0980FE", 600: "#1A67FE", 700: "#0855A7", 800: "#0B4078", 900: "#0B2A4B", 950: "#09192A" }
    commerce: { 50: "#FFF3EB", 100: "#FFEBDE", 200: "#FFDEC8", 300: "#FAAD94", 400: "#FF7A3D", 500: "#FF4D13", 600: "#E13903", 700: "#AE3007", 800: "#7C260A", 900: "#4D1B0B", 950: "#2A1109" }
    ranking: { 50: "#FFF4E2", 100: "#FDE6D0", 200: "#FCD6B8", 300: "#DAC1A7", 400: "#CAA177", 500: "#B07A43", 600: "#926639", 700: "#835B32", 800: "#553E26", 900: "#4A240A", 950: "#211A12", tag-text: "#8B4424" }
    neutral: { 0: "#FFFFFF", 50: "#F8F8F8", 100: "#F4F5F7", 200: "#E8E9EB", 300: "#C8C8C8", 400: "#999999", 500: "#7A7D86", 600: "#60636C", 700: "#51535A", 800: "#2A2B2F", 900: "#191919", 950: "#0F1012", canvas: "#FEFEFE", card: "#FEFDFD" }
    cat-blue: { 50: "#E5F2FF", 100: "#DFEBFB", 200: "#C8DEF7", 300: "#A0C8F4", 400: "#6CACF2", 500: "#2E8BF0", 600: "#1372DA", 700: "#135BA9", 800: "#134378", 900: "#102C4B", 950: "#0B1928" }
    cat-green: { 50: "#E5FFF0", 100: "#D8FDE4", 200: "#BDEED5", 300: "#89E5B7", 400: "#47DB92", 500: "#1FA864", 600: "#1C8C54", 700: "#197045", 800: "#165435", 900: "#123A26", 950: "#0E251A" }
    cat-indigo: { 50: "#F2F1FD", 100: "#E5EDFF", 200: "#DBE4FD", 300: "#B6B7F5", 400: "#9092F4", 500: "#6366F1", 600: "#2E32E9", 700: "#191DC2", 800: "#171A88", 900: "#121451", 950: "#0C0C27" }
    cat-pink: { 50: "#FFE5EF", 100: "#FFD8EB", 200: "#F5CDDB", 300: "#F1A9C2", 400: "#ED7CA3", 500: "#E8457E", 600: "#DB1E60", 700: "#A91C4D", 800: "#78193A", 900: "#4A1326", 950: "#260D16" }
    cat-amber: { 50: "#FFF5E5", 100: "#FFEED0", 200: "#F4E2C4", 300: "#F0CF98", 400: "#EDB760", 500: "#E89A1C", 600: "#C28016", 700: "#976616", 800: "#6D4B14", 900: "#453110", 950: "#271D0C" }
    cat-purple: { 50: "#F3E5FF", 100: "#F2DDFF", 200: "#E2D0F3", 300: "#CFAFED", 400: "#B784E7", 500: "#9B51E0", 600: "#8128D4", 700: "#6624A3", 800: "#4B1E74", 900: "#301647", 950: "#1A0E25" }
    cat-red: { 50: "#FFE5E5", 100: "#FFDEDE", 200: "#F7CDCD", 300: "#F4A9A9", 400: "#F27B7B", 500: "#EF4444", 600: "#E71717", 700: "#B21717", 800: "#7E1515", 900: "#4D1111", 950: "#270C0C" }
    cat-lime: { 50: "#F3FFE5", 100: "#DDFFD8", 200: "#DBEEC5", 300: "#C2E59A", 400: "#A2DC62", 500: "#7CC52A", 600: "#68A325", 700: "#538020", 800: "#3F5E1B", 900: "#2A3D15", 950: "#1A240F" }
    success: { 50: "#E9FFED", 200: "#A0DBA4", 500: "#16A85A", 700: "#13713F", 900: "#103B24" }
    warning: { 50: "#FFF6E5", 200: "#F9E8C6", 500: "#FAB428", 700: "#CA7C1C", 900: "#4E380D" }
    danger: { 50: "#FFF1F0", 200: "#FAC8CC", 500: "#FF3041", 700: "#BE0817", 900: "#520B11" }
    info: { 50: "#E5F2FF", 200: "#C8DEF7", 500: "#2E8BF0", 700: "#135BA9", 900: "#102C4B" }
    medal: { gold-text: "#4A240A", silver-text: "#4F5568", bronze-text: "#7A4137" }
    canvas: { light: "{colors.palette.neutral.canvas}", dark: "{colors.palette.neutral.950}" }
    alpha:
      white: { 25: "rgba(255,255,255,0.25)", 40: "rgba(255,255,255,0.4)", 80: "rgba(255,255,255,0.8)", 90: "rgba(255,255,255,0.9)" }
      black: { 05: "rgba(19,19,19,0.05)", 12: "rgba(19,19,19,0.12)", 50: "rgba(19,19,19,0.5)", 70: "rgba(0,0,0,0.7)", 80: "rgba(19,19,19,0.8)" }
      brand: { 16: "rgba(9,128,254,0.16)", 24: "rgba(9,128,254,0.24)" }
      ranking: { 40: "rgba(255,227,201,0.4)" }
  semantic:
    bg:
      light: { "page": "{colors.palette.neutral.canvas}", "page-subtle": "{colors.palette.neutral.100}", "brand-soft": "{colors.palette.brand.50}", "commerce-soft": "{colors.palette.commerce.50}", "ranking-soft": "{colors.palette.ranking.50}", "ranking-tag": "{colors.palette.alpha.ranking.40}", "inverse": "{colors.palette.neutral.900}", "disabled": "{colors.palette.neutral.100}" }
      dark: { "page": "{colors.palette.neutral.950}", "page-subtle": "{colors.palette.neutral.900}", "brand-soft": "{colors.palette.brand.900}", "commerce-soft": "{colors.palette.commerce.900}", "ranking-soft": "{colors.palette.ranking.900}", "ranking-tag": "{colors.palette.alpha.ranking.40}", "inverse": "{colors.palette.neutral.50}", "disabled": "{colors.palette.neutral.800}" }
    surface:
      light: { "default": "{colors.palette.neutral.0}", "card": "{colors.palette.neutral.card}", "subtle": "{colors.palette.neutral.50}", "elevated": "{colors.palette.neutral.0}", "sunken": "{colors.palette.neutral.100}", "glass": "{colors.palette.alpha.white.80}", "accent": "{colors.palette.brand.50}", "selected": "{colors.palette.brand.100}", "hover": "{colors.palette.neutral.50}", "pressed": "{colors.palette.neutral.100}", "disabled": "{colors.palette.neutral.100}" }
      dark: { "default": "{colors.palette.neutral.900}", "card": "{colors.palette.neutral.900}", "subtle": "{colors.palette.neutral.950}", "elevated": "{colors.palette.neutral.800}", "sunken": "{colors.palette.neutral.950}", "glass": "{colors.palette.alpha.black.50}", "accent": "{colors.palette.brand.900}", "selected": "{colors.palette.brand.800}", "hover": "{colors.palette.neutral.800}", "pressed": "{colors.palette.neutral.700}", "disabled": "{colors.palette.neutral.800}" }
    text:
      light: { "primary": "{colors.palette.neutral.900}", "secondary": "{colors.palette.neutral.600}", "tertiary": "{colors.palette.neutral.400}", "placeholder": "{colors.palette.neutral.300}", "disabled": "{colors.palette.neutral.300}", "inverse": "{colors.palette.neutral.0}", "accent": "{colors.palette.brand.500}", "link": "{colors.palette.brand.500}", "price": "{colors.palette.commerce.500}", "ranking": "{colors.palette.ranking.700}", "ranking-tag": "{colors.palette.ranking.tag-text}", "success": "{colors.palette.success.700}", "warning": "{colors.palette.warning.700}", "danger": "{colors.palette.danger.700}", "info": "{colors.palette.info.700}", "medal-gold": "{colors.palette.medal.gold-text}", "medal-silver": "{colors.palette.medal.silver-text}", "medal-bronze": "{colors.palette.medal.bronze-text}" }
      dark: { "primary": "{colors.palette.neutral.50}", "secondary": "{colors.palette.neutral.300}", "tertiary": "{colors.palette.neutral.500}", "placeholder": "{colors.palette.neutral.600}", "disabled": "{colors.palette.neutral.700}", "inverse": "{colors.palette.neutral.900}", "accent": "{colors.palette.brand.400}", "link": "{colors.palette.brand.400}", "price": "{colors.palette.commerce.400}", "ranking": "{colors.palette.ranking.300}", "ranking-tag": "{colors.palette.ranking.tag-text}", "success": "{colors.palette.success.500}", "warning": "{colors.palette.warning.500}", "danger": "{colors.palette.danger.500}", "info": "{colors.palette.info.500}", "medal-gold": "{colors.palette.medal.gold-text}", "medal-silver": "{colors.palette.medal.silver-text}", "medal-bronze": "{colors.palette.medal.bronze-text}" }
    icon:
      light: { "primary": "{colors.palette.neutral.900}", "secondary": "{colors.palette.neutral.600}", "tertiary": "{colors.palette.neutral.400}", "disabled": "{colors.palette.neutral.300}", "inverse": "{colors.palette.neutral.0}", "accent": "{colors.palette.brand.500}", "price": "{colors.palette.commerce.500}", "ranking": "{colors.palette.ranking.700}", "success": "{colors.palette.success.700}", "warning": "{colors.palette.warning.500}", "danger": "{colors.palette.danger.700}", "info": "{colors.palette.info.700}" }
      dark: { "primary": "{colors.palette.neutral.50}", "secondary": "{colors.palette.neutral.300}", "tertiary": "{colors.palette.neutral.500}", "disabled": "{colors.palette.neutral.700}", "inverse": "{colors.palette.neutral.900}", "accent": "{colors.palette.brand.400}", "price": "{colors.palette.commerce.400}", "ranking": "{colors.palette.ranking.300}", "success": "{colors.palette.success.500}", "warning": "{colors.palette.warning.500}", "danger": "{colors.palette.danger.500}", "info": "{colors.palette.info.500}" }
    border:
      light: { "subtle": "{colors.palette.neutral.100}", "default": "{colors.palette.neutral.200}", "strong": "{colors.palette.neutral.400}", "accent": "{colors.palette.brand.500}", "commerce": "{colors.palette.commerce.200}", "brand-soft": "{colors.palette.brand.50}", "focus": "{colors.palette.brand.500}", "selected": "{colors.palette.brand.500}", "disabled": "{colors.palette.neutral.200}", "success": "{colors.palette.success.200}", "warning": "{colors.palette.warning.200}", "danger": "{colors.palette.danger.200}", "info": "{colors.palette.info.200}" }
      dark: { "subtle": "{colors.palette.neutral.800}", "default": "{colors.palette.neutral.700}", "strong": "{colors.palette.neutral.500}", "accent": "{colors.palette.brand.500}", "commerce": "{colors.palette.commerce.800}", "brand-soft": "{colors.palette.brand.900}", "focus": "{colors.palette.brand.400}", "selected": "{colors.palette.brand.500}", "disabled": "{colors.palette.neutral.800}", "success": "{colors.palette.success.700}", "warning": "{colors.palette.warning.700}", "danger": "{colors.palette.danger.700}", "info": "{colors.palette.info.700}" }
    overlay:
      light: { "scrim": "{colors.palette.alpha.black.70}", "image": "{colors.palette.alpha.black.80}", "brand": "{colors.palette.alpha.brand.16}" }
      dark: { "scrim": "{colors.palette.alpha.black.70}", "image": "{colors.palette.alpha.black.80}", "brand": "{colors.palette.alpha.brand.16}" }
    glass:
      light: { "background": "{colors.palette.alpha.white.80}", "border": "{colors.palette.alpha.white.40}" }
      dark: { "background": "{colors.palette.alpha.black.50}", "border": "{colors.palette.alpha.white.40}" }
    focus:
      light: { "ring": "{colors.palette.alpha.brand.24}", "ring-strong": "{colors.palette.brand.500}" }
      dark: { "ring": "{colors.palette.brand.400}", "ring-strong": "{colors.palette.brand.400}" }
    shadow:
      light: { "color": "{colors.palette.alpha.black.05}", "color-strong": "{colors.palette.alpha.black.12}" }
      dark: { "color": "{colors.palette.alpha.black.50}", "color-strong": "{colors.palette.alpha.black.80}" }
    rank-theme:
      light: { "smoky-wash": "{colors.palette.commerce.50}", "smoky-badge": "{colors.palette.commerce.100}", "smoky-glow": "{colors.palette.commerce.50}", "quality-wash": "{colors.palette.cat-blue.50}", "quality-badge": "{colors.palette.cat-blue.100}", "quality-glow": "{colors.palette.cat-blue.50}", "destination-wash": "{colors.palette.cat-green.50}", "destination-badge": "{colors.palette.cat-green.100}", "destination-glow": "{colors.palette.cat-green.50}", "hotel-wash": "{colors.palette.cat-indigo.100}", "hotel-badge": "{colors.palette.cat-indigo.200}", "hotel-glow": "{colors.palette.cat-indigo.50}", "local-wash": "{colors.palette.cat-pink.50}", "local-badge": "{colors.palette.cat-pink.100}", "local-glow": "{colors.palette.cat-pink.50}", "tea-wash": "{colors.palette.cat-amber.50}", "tea-badge": "{colors.palette.cat-amber.100}", "tea-glow": "{colors.palette.cat-amber.50}", "relax-wash": "{colors.palette.cat-purple.50}", "relax-badge": "{colors.palette.cat-purple.100}", "relax-glow": "{colors.palette.cat-purple.50}", "new-wash": "{colors.palette.cat-red.50}", "new-badge": "{colors.palette.cat-red.100}", "new-glow": "{colors.palette.cat-red.50}", "slow-wash": "{colors.palette.cat-lime.50}", "slow-badge": "{colors.palette.cat-lime.100}", "slow-glow": "{colors.palette.cat-lime.50}" }
      dark: { "smoky-wash": "{colors.palette.commerce.900}", "smoky-badge": "{colors.palette.commerce.800}", "smoky-glow": "{colors.palette.commerce.900}", "quality-wash": "{colors.palette.cat-blue.900}", "quality-badge": "{colors.palette.cat-blue.800}", "quality-glow": "{colors.palette.cat-blue.900}", "destination-wash": "{colors.palette.cat-green.900}", "destination-badge": "{colors.palette.cat-green.800}", "destination-glow": "{colors.palette.cat-green.900}", "hotel-wash": "{colors.palette.cat-indigo.900}", "hotel-badge": "{colors.palette.cat-indigo.800}", "hotel-glow": "{colors.palette.cat-indigo.900}", "local-wash": "{colors.palette.cat-pink.900}", "local-badge": "{colors.palette.cat-pink.800}", "local-glow": "{colors.palette.cat-pink.900}", "tea-wash": "{colors.palette.cat-amber.900}", "tea-badge": "{colors.palette.cat-amber.800}", "tea-glow": "{colors.palette.cat-amber.900}", "relax-wash": "{colors.palette.cat-purple.900}", "relax-badge": "{colors.palette.cat-purple.800}", "relax-glow": "{colors.palette.cat-purple.900}", "new-wash": "{colors.palette.cat-red.900}", "new-badge": "{colors.palette.cat-red.800}", "new-glow": "{colors.palette.cat-red.900}", "slow-wash": "{colors.palette.cat-lime.900}", "slow-badge": "{colors.palette.cat-lime.800}", "slow-glow": "{colors.palette.cat-lime.900}" }
    status:
      light:
        success: { bg: "{colors.palette.success.50}", text: "{colors.palette.success.700}", border: "{colors.palette.success.200}", icon: "{colors.palette.success.700}" }
        warning: { bg: "{colors.palette.warning.50}", text: "{colors.palette.warning.700}", border: "{colors.palette.warning.200}", icon: "{colors.palette.warning.700}" }
        danger: { bg: "{colors.palette.danger.50}", text: "{colors.palette.danger.700}", border: "{colors.palette.danger.200}", icon: "{colors.palette.danger.700}" }
        info: { bg: "{colors.palette.info.50}", text: "{colors.palette.info.700}", border: "{colors.palette.info.200}", icon: "{colors.palette.info.700}" }
      dark:
        success: { bg: "{colors.palette.success.900}", text: "{colors.palette.success.500}", border: "{colors.palette.success.700}", icon: "{colors.palette.success.500}" }
        warning: { bg: "{colors.palette.warning.900}", text: "{colors.palette.warning.500}", border: "{colors.palette.warning.700}", icon: "{colors.palette.warning.500}" }
        danger: { bg: "{colors.palette.danger.900}", text: "{colors.palette.danger.500}", border: "{colors.palette.danger.700}", icon: "{colors.palette.danger.500}" }
        info: { bg: "{colors.palette.info.900}", text: "{colors.palette.info.500}", border: "{colors.palette.info.700}", icon: "{colors.palette.info.500}" }
  gradients:
    theme: "linear-gradient(90deg, #1A67FE 0%, #198AFE 100%)"   # brand.600 → brand.500 区间
    theme-light: "linear-gradient(180deg, #E5F2FF 0%, #FEFEFE 51%)"   # cat-blue.50 → neutral.0
    theme-dark: "linear-gradient(180deg, #0B2A4B 0%, #191919 60%)"   # brand.900 → neutral.900
    commerce: "linear-gradient(90deg, #FF5B2E 0%, #FF7A3D 100%)"   # commerce.500 → commerce.400
    ranking-tag: "linear-gradient(90deg, #FCD6B8 10%, #FFF4E2 61%, #FFE3C9 100%)"   # ranking.200 → ranking.50
    medal-gold: "linear-gradient(160deg, #FEE495 2%, #FEF6E2 48%, #FEE493 100%)"   # 金 · TOP 01 盾形底
    medal-silver: "linear-gradient(160deg, #DFE4ED 0%, #F7F8FE 43%, #DFE4ED 100%)"   # 银 · TOP 02 盾形底
    medal-bronze: "linear-gradient(160deg, #F9DCC8 0%, #FCF3EE 49%, #F9DCC8 100%)"   # 铜 · TOP 03 盾形底
    medal-gold-laurel: "linear-gradient(165deg, #F4BD8D 0%, #BF8249 100%)"   # 金 · TOP 01 麦穗
    medal-silver-laurel: "linear-gradient(165deg, #DBDBDB 0%, #B1B1B3 100%)"   # 银 · TOP 02 麦穗
    medal-bronze-laurel: "linear-gradient(165deg, #EACAB5 0%, #D99D89 100%)"   # 铜 · TOP 03 麦穗
    header-fade: "linear-gradient(90deg, #FEFEFE 56%, rgba(254,254,254,0) 100%)"   # neutral.canvas → 透明
    hot-review: "linear-gradient(90deg, #FFE9E7 0%, rgba(254,244,243,0) 100%)"   # cat-red.50 → 透明
    scrim-image: "linear-gradient(180deg, rgba(30,30,30,0) 0%, rgba(30,30,30,1) 79%)"   # alpha-black 0 → 100%
typography:
  display: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "24px", fontWeight: 600, lineHeight: "30px", letterSpacing: "0px" }
  heading: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "16px", fontWeight: 600, lineHeight: "auto", letterSpacing: "0px" }
  subheading: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0px" }
  body: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "12px", fontWeight: 400, lineHeight: "17px", letterSpacing: "0px" }
  body-sm: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "11px", fontWeight: 400, lineHeight: "15px", letterSpacing: "0px" }
  caption: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "10px", fontWeight: 400, lineHeight: "13px", letterSpacing: "0px" }
  label: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "12px", fontWeight: 500, lineHeight: "14px", letterSpacing: "0px" }
  numeric-lg: { fontFamily: "Helvetica, \"Helvetica Neue\", Arial, sans-serif", fontSize: "24px", fontWeight: 700, lineHeight: "28px", fontVariantNumeric: "tabular-nums" }
  numeric-md: { fontFamily: "Helvetica, \"Helvetica Neue\", Arial, sans-serif", fontSize: "14px", fontWeight: 700, lineHeight: "18px", fontVariantNumeric: "tabular-nums" }
  numeric-sm: { fontFamily: "Helvetica, \"Helvetica Neue\", Arial, sans-serif", fontSize: "12px", fontWeight: 700, lineHeight: "14px", fontVariantNumeric: "tabular-nums" }
  numeric-medal: { fontFamily: "\"Khand\", sans-serif", fontSize: "24px", fontWeight: 600, lineHeight: "auto", fontVariantNumeric: "tabular-nums" }
  medal-label: { fontFamily: "\"Khand\", sans-serif", fontSize: "12px", fontWeight: 600, lineHeight: "13.44px", fontVariantNumeric: "tabular-nums" }
  zh-display: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "24px", fontWeight: 600, lineHeight: "30px", letterSpacing: "0" }
  zh-heading: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "16px", fontWeight: 600, lineHeight: "auto", letterSpacing: "0" }
  zh-subheading: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0" }
  zh-body: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "12px", fontWeight: 400, lineHeight: "17px", letterSpacing: "0" }
  zh-body-sm: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "11px", fontWeight: 400, lineHeight: "15px", letterSpacing: "0" }
  zh-caption: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "10px", fontWeight: 400, lineHeight: "13px", letterSpacing: "0" }
  zh-label: { fontFamily: "\"PingFang SC\", \"Noto Sans SC\", sans-serif", fontSize: "12px", fontWeight: 500, lineHeight: "14px", letterSpacing: "0" }
rounded:
  element: "2px"
  control: "4px"
  media: "8px"
  component: "12px"
  container: "16px"
  pill: "999px"
  shape-sheet-top: "16px 16px 0 0"
  shape-ranking-tag: "2px 0 4px 2px"
  shape-medal: "2px 2px 0 0"
  shape-bubble: "8px 8px 8px 0"
spacing:
  2xs: "2px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  page-margin: "16px"
  section-gap: "16px"
  section-title-gap: "8px"
  carousel-gap: "12px"
  component-control-padding-x: "10px"
  component-control-padding-y: "8px"
  component-card-inset-x: "14px"
  component-tag-padding: "2px 4px"
elevation:
  stroke-card: "0 0 0 0.6px {colors.semantic.border.light.default}"
  shadow-card: "0 4px 14px {colors.semantic.shadow.light.color}"
  shadow-divider-top: "0 -1px 0 {colors.semantic.border.light.subtle}"
  shadow-inset-border: "inset 0 0 0 1px {colors.semantic.border.light.default}"
  shadow-inset-selected: "inset 0 0 0 1.5px {colors.semantic.border.light.selected}"
  highlight-button: "inset 0 -1px 0 {colors.palette.alpha.white.25}"
  glass-blur: "backdrop-filter: blur(4px)"
  glass-background: "{colors.semantic.glass.light.background}"
  glass-border: "1px solid {colors.semantic.glass.light.border}"
  blur-fade-edge: "filter: blur(16px)"
  opacity-disabled: "0.4"
  state-pressed: "{colors.semantic.overlay.light.brand} 叠加"
  overlay-scrim: "{colors.palette.alpha.black.70}"
  overlay-image: "{colors.palette.alpha.black.80} / scrim-image 渐变"
motion:
  overlay-enter: "Move in · 自下而上 · 400ms · ease-in"
  overlay-dismiss: "点击外部不关闭"
breakpoints:
  compact: { width: "375pt", content: "343pt" }
  base: { width: "402pt", content: "370pt" }
  large: { width: "440pt", content: "408pt" }
grid:
  grid-columns: "4"
  grid-gutter: "12px"
  grid-margin: "16px"
  grid-content-width: "100% − 2 × 16px"
  carousel-card-width: "284px"
components:
  rank-list-card:
    figma: "扫街榜分榜卡片 (single component; nested 主题背景 set, 9 themes)"
    size: { width: "301px", height: "hug" }
    surface: { fill: "{colors.semantic.surface.light.default}", stroke: "{colors.semantic.border.light.default}", stroke-width: "{elevation.stroke-card}", radius: "{rounded.container}", shadow: "{elevation.shadow-card}" }
    padding: { top: "{spacing.lg}", x: "{spacing.md}", bottom: "{spacing.md}", gap: "{spacing.md}" }
    title: "{typography.zh-heading}"
    tag: { fill: "{colors.semantic.bg.light.ranking-tag}", text: "{colors.semantic.text.light.ranking-tag}", type: "{typography.zh-body}" }
    theme: "{colors.semantic.rank-theme}"
  rank-list-row:
    figma: "扫街榜分榜/POI 行"
    thumbnail: { size: "50px", radius: "{rounded.media}", rank: "{typography.numeric-md}", scrim: "{colors.gradients.scrim-image}" }
    name: "{typography.zh-subheading}"
    meta: { distance: "{colors.semantic.text.light.ranking}", extra: "{colors.semantic.text.light.secondary}", type: "{typography.zh-body}" }
  poi-card:
    figma: "扫街榜POI卡片 (single component; CTA nested set 类型: 一键下单 / 看团购 / 订门票)"
    size: { width: "301px", height: "hug" }
    surface: { fill: "{colors.semantic.surface.light.card}", stroke: "{colors.semantic.border.light.default}", stroke-width: "{elevation.stroke-card}", radius: "{rounded.container}", shadow: "{elevation.shadow-card}" }
    padding: { all: "{spacing.md}", gap: "{spacing.md}" }
    image: { radius: "{rounded.media}", chip: "{rounded.pill}" }
    name: "{typography.zh-heading}"
    meta: "{typography.zh-body}"
    tag: { radius: "{rounded.element}", type: "{typography.zh-caption}" }
    price: { color: "{colors.semantic.text.light.price}", type: "{typography.numeric-sm}" }
    hot-review: "{colors.gradients.hot-review}"
    button: { primary: "{colors.gradients.theme}", radius: "{rounded.control}" }
    cta: { figma: "扫街榜POI卡片/CTA (类型: 一键下单 / 看团购 / 订门票)", gap: "{spacing.md}", padding-x: "{spacing.lg}" }
  dish-card:
    figma: "必吃榜/菜品卡 (状态: 默认 / 按下 / 加载中) + 必吃榜/菜品横滑列表"
    image: { size: "84px", radius: "{rounded.media}", pressed: "{colors.palette.alpha.black.12}", skeleton: "{colors.semantic.surface.light.sunken}" }
    name: "{typography.zh-subheading}"
    rank: { color: "{colors.semantic.text.light.ranking}", type: "{typography.zh-body}" }
    count: { color: "{colors.semantic.text.light.secondary}", type: "{typography.zh-body}" }
    gap: { item: "{spacing.md}", text: "{spacing.xs}" }
  arrival-header:
    figma: "到达头部卡 (类型: 常规到达 / 打车到达)"
    surface: { fill: "{colors.semantic.surface.light.card}", radius-right: "{rounded.container}", fade: "{colors.gradients.header-fade}" }
    title: "{typography.zh-display}"
    address: { color: "{colors.semantic.text.light.secondary}", type: "{typography.zh-body}" }
    energy: { color: "{colors.semantic.text.light.success}", type: "{typography.zh-label}" }
    car: { color: "{colors.semantic.text.light.warning}", type: "{typography.zh-label}" }
  poi-image-card:
    figma: "POI 推荐卡 (168×168)"
    surface: { radius: "{rounded.container}", scrim: "{colors.gradients.scrim-image}" }
    name: "{typography.zh-subheading}"
    meta: { color: "{colors.semantic.text.light.inverse}", type: "{typography.zh-body}" }
    tag: { fill: "{colors.semantic.bg.light.ranking-tag}", logo: "{colors.gradients.ranking-tag}" }
    favorite: { fill: "{colors.semantic.overlay.light.image}", stroke: "{colors.semantic.glass.light.border}", radius: "{rounded.pill}" }
  parking-card:
    figma: "停车场卡 (车位状态: 紧张 / 充裕 / 已满) + 泊车指引 区块"
    surface: { fill: "{colors.semantic.surface.light.card}", stroke: "{colors.semantic.border.light.default}", stroke-width: "0.6px", radius: "{rounded.container}" }
    padding: { all: "{spacing.lg}", gap: "{spacing.sm}" }
    name: "{typography.zh-subheading}"
    meta: { color: "{colors.semantic.text.light.secondary}", type: "{typography.zh-body}" }
    button: { fill: "{colors.semantic.bg.light.brand-soft}", text: "{colors.semantic.text.light.accent}", type: "{typography.zh-label}", height: "36px", radius: "{rounded.control}" }
  gas-card:
    figma: "加油站卡（与停车场卡同规格）"
    deal-tag: { fill: "{colors.semantic.bg.light.commerce-soft}", text: "{colors.semantic.text.light.price}", type: "{typography.zh-caption}" }
    service-tag: { fill: "{colors.semantic.bg.light.page-subtle}", text: "{colors.semantic.text.light.secondary}" }
  last-bus-row:
    figma: "末班车行 + 今晚末班车时间 区块"
    stop: "{typography.zh-subheading}"
    time: "{typography.numeric-md}"
    divider: "{colors.semantic.border.light.subtle}"
---

# 高德地图 · 导航到达页 Design System

## Overview

到达页出现在导航结束的那一刻，用户的问题从「怎么去」变成「接下来做什么」。这套基础规范服务于这个转换：页面以 `{colors.semantic.bg.light.page}` 白底和 `{colors.semantic.bg.light.page-subtle}` 冷灰分组区为骨架，承载扫街榜、附近精选、末班车等高密度信息流。

视觉张力来自**双主色分工**：高德蓝 `{colors.palette.brand.500}` 只用于导航与功能动作（查看路线、导航过去、链接），交易橙 `{colors.palette.commerce.500}` 只用于价格和成交动作（¥40、订门票、去下单）。扫街榜金棕 `{colors.palette.ranking.700}` 不是强调色，而是榜单身份标记——距离、榜单标签、TOP 角标。

排版使用 PingFang SC（非苹果平台回退 Noto Sans SC；独立数字用 Helvetica Bold，TOP 奖牌用 Khand SemiBold），正文 `{typography.zh-body}` 只有 12px，层级完全靠字号与字重表达；独立数字用 `{typography.numeric-sm}` 的等宽数字，让价格和时间在中文环境里保持对齐。页面节奏固定：左右 `{spacing.page-margin}`，区块之间 `{spacing.section-gap}`，标题到内容 `{spacing.section-title-gap}`。

**Key Characteristics**

- 蓝做事，橙成交：`{colors.semantic.text.light.accent}` vs `{colors.semantic.text.light.price}`
- 扫街榜身份三件套：`{colors.gradients.ranking-tag}` 标签底 + `{rounded.shape-ranking-tag}` 不对称角 + TOP 奖牌（`{rounded.shape-medal}` 盾形、`{colors.gradients.medal-gold}` 底、`{colors.gradients.medal-gold-laurel}` 麦穗、`{typography.numeric-medal}` 数字）
- 12px 正文、10px 下限：`{typography.zh-body}`、`{typography.zh-caption}`
- 两档卡片圆角 `{rounded.component}` / `{rounded.container}`，统一 0.6px 描边 `{elevation.stroke-card}`；扫街榜卡片另加 `{elevation.shadow-card}`
- 浮层不加投影，靠 `{elevation.overlay-scrim}` 70% 遮罩分层

## Colors

### Primitives

五组原子色：Brand（高德蓝）与 Commerce（交易橙）构成双主色；Extended 包含扫街榜金棕 `ranking` 与 5 个场景色 `cat-*`（只做背景 wash，cat-blue 兼作 info）；Neutral 为低饱和冷灰（色相约 225°）；Functional 为 success / warning / danger / info 五阶；Alpha 为遮罩与玻璃用透明色。每族 11 阶，非线性明度曲线，饱和度两端收窄。

- `{colors.palette.brand}` — 高德蓝 · .50/.100/.500/.600 观测（主题蓝变量 #0980FE；按钮渐变起点 #1A67FE）；其余扩展
- `{colors.palette.commerce}` — 交易橙 · .100/.200/.400/.500 观测（.50 补齐）（价格、下单按钮、团购标签描边）；合并 #FF4F1F #FE5E33 #FF5B2E
- `{colors.palette.ranking}` — 扫街榜金棕 · .50/.200/.700/.900 观测（距离变量 #835B32、榜单标签渐变、深棕标题）；tag-text #8B4424 为扫街榜标签文字（观测 ×19，#BD581A 并入）；.500 由 .700 反推
- `{colors.palette.neutral}` — 冷灰 · .0/.50/.100/.200/.300/.400/.600/.900 观测（正文字体/正文灰/Stroke 变量）；37 种文字灰归并于此；canvas #FEFEFE（页面底）与 card #FEFDFD（顶部到达卡）按原稿指定值单列
- `{colors.palette.cat-blue}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-green}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-indigo}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-pink}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-amber}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-purple}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-red}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.cat-lime}` — 场景色 · .50 观测（附近精选 / 扫街榜分榜卡头），.100 回填分榜徽标观测色（indigo 另回填 .200）；purple/red/lime 为分榜卡片新增；.500 按色相扩展；cat-blue 兼作 info
- `{colors.palette.success}` — 「正在开放」绿 + #A0DBA4 描边、评分星黄、地铁标红均观测；info 复用 cat-blue；扩展到 5 阶因描边色 .200 被观测到
- `{colors.palette.warning}` — 「正在开放」绿 + #A0DBA4 描边、评分星黄、地铁标红均观测；info 复用 cat-blue；扩展到 5 阶因描边色 .200 被观测到
- `{colors.palette.danger}` — 「正在开放」绿 + #A0DBA4 描边、评分星黄、地铁标红均观测；info 复用 cat-blue；扩展到 5 阶因描边色 .200 被观测到
- `{colors.palette.info}` — 「正在开放」绿 + #A0DBA4 描边、评分星黄、地铁标红均观测；info 复用 cat-blue；扩展到 5 阶因描边色 .200 被观测到
- `{colors.palette.medal}` — 扫街榜 TOP 奖牌文字色 · 全部观测（源组件 01/02/03）；固定色，两模式不变
- `{colors.palette.canvas}` — 页面底：Light 为 neutral.canvas（#FEFEFE），Dark 为 neutral.950。
- `{colors.palette.alpha}` — white.80/.90、black.80（图片角标底 #131313@80%）、black.05（卡片投影）、black.70（原型 Open overlay 背景 #000 70%）、white.25（按钮高光）观测；其余补齐

### Themes

每个语义角色都有 Light / Dark 两值。中性角色首尾翻转（neutral.900 ↔ neutral.50）；强调与状态的文字、图标在暗色下提亮一档（brand.500 → brand.400），实心填充与描边保持不变；暗色下 `surface/elevated` 用更亮的 neutral.800 表达层级，而不是依赖投影。

### Background

- `{colors.semantic.bg.light.page}` / `{colors.semantic.bg.dark.page}` — 到达页整页底色（#FEFEFE，原稿指定）。Light `neutral.canvas`（#FEFEFE），Dark `neutral.950`（#0F1012）。
- `{colors.semantic.bg.light.page-subtle}` / `{colors.semantic.bg.dark.page-subtle}` — 分组区块底、横滑「查看更多」底。Light `neutral.100`（#F4F5F7），Dark `neutral.900`（#191919）。
- `{colors.semantic.bg.light.brand-soft}` / `{colors.semantic.bg.dark.brand-soft}` — 蓝色弱强调区（导航过去按钮底）。Light `brand.50`（#EBF3FE），Dark `brand.900`（#0B2A4B）。
- `{colors.semantic.bg.light.commerce-soft}` / `{colors.semantic.bg.dark.commerce-soft}` — 团购/优惠信息条底。Light `commerce.50`（#FFF3EB），Dark `commerce.900`（#4D1B0B）。
- `{colors.semantic.bg.light.ranking-soft}` / `{colors.semantic.bg.dark.ranking-soft}` — 扫街榜标签与榜单卡头底。Light `ranking.50`（#FFF4E2），Dark `ranking.900`（#4A240A）。
- `{colors.semantic.bg.light.ranking-tag}` / `{colors.semantic.bg.dark.ranking-tag}` — 列表/榜单内「扫街榜」小标签浅金底（#FFE3C9 40%，固定）。Light `alpha-ranking.40`（rgba(255,227,201,0.4)），Dark `alpha-ranking.40`（rgba(255,227,201,0.4)）。
- `{colors.semantic.bg.light.inverse}` / `{colors.semantic.bg.dark.inverse}` — 反色 Toast、深色角标。Light `neutral.900`（#191919），Dark `neutral.50`（#F8F8F8）。
- `{colors.semantic.bg.light.disabled}` / `{colors.semantic.bg.dark.disabled}` — 禁用控件底。Light `neutral.100`（#F4F5F7），Dark `neutral.800`（#2A2B2F）。

### Surface

- `{colors.semantic.surface.light.default}` / `{colors.semantic.surface.dark.default}` — POI 卡片、列表卡。Light `neutral.0`（#FFFFFF），Dark `neutral.900`（#191919）。
- `{colors.semantic.surface.light.card}` / `{colors.semantic.surface.dark.card}` — 顶部「已到达」信息卡（#FEFDFD，原稿指定）。Light `neutral.card`（#FEFDFD），Dark `neutral.900`（#191919）。
- `{colors.semantic.surface.light.subtle}` / `{colors.semantic.surface.dark.subtle}` — 卡内次级区（套餐行、班车时间行）。Light `neutral.50`（#F8F8F8），Dark `neutral.950`（#0F1012）。
- `{colors.semantic.surface.light.elevated}` / `{colors.semantic.surface.dark.elevated}` — 浮层（POI 浮层、一键下单浮层）。Light `neutral.0`（#FFFFFF），Dark `neutral.800`（#2A2B2F）。
- `{colors.semantic.surface.light.sunken}` / `{colors.semantic.surface.dark.sunken}` — 数量步进器、输入框底。Light `neutral.100`（#F4F5F7），Dark `neutral.950`（#0F1012）。
- `{colors.semantic.surface.light.glass}` / `{colors.semantic.surface.dark.glass}` — 图片上的毛玻璃角标（收藏、热度）。Light `alpha-white.80`（rgba(255,255,255,0.8)），Dark `alpha-black.50`（rgba(19,19,19,0.5)）。
- `{colors.semantic.surface.light.accent}` / `{colors.semantic.surface.dark.accent}` — 选中日期/场次卡。Light `brand.50`（#EBF3FE），Dark `brand.900`（#0B2A4B）。
- `{colors.semantic.surface.light.selected}` / `{colors.semantic.surface.dark.selected}` — 选中态强调。Light `brand.100`（#D4E6FF），Dark `brand.800`（#0B4078）。
- `{colors.semantic.surface.light.hover}` / `{colors.semantic.surface.dark.hover}` — 按压前的轻反馈（Web）。Light `neutral.50`（#F8F8F8），Dark `neutral.800`（#2A2B2F）。
- `{colors.semantic.surface.light.pressed}` / `{colors.semantic.surface.dark.pressed}` — 列表项按下。Light `neutral.100`（#F4F5F7），Dark `neutral.700`（#51535A）。
- `{colors.semantic.surface.light.disabled}` / `{colors.semantic.surface.dark.disabled}` — 不可选场次。Light `neutral.100`（#F4F5F7），Dark `neutral.800`（#2A2B2F）。

### Text

- `{colors.semantic.text.light.primary}` / `{colors.semantic.text.dark.primary}` — 标题、POI 名、正文。Light `neutral.900`（#191919），Dark `neutral.50`（#F8F8F8）。
- `{colors.semantic.text.light.secondary}` / `{colors.semantic.text.dark.secondary}` — 描述、元信息（¥40/人 · 4.5w+人导航过）。Light `neutral.600`（#60636C），Dark `neutral.300`（#C8C8C8）。
- `{colors.semantic.text.light.tertiary}` / `{colors.semantic.text.dark.tertiary}` — 弱提示、时间戳。Light `neutral.400`（#999999），Dark `neutral.500`（#7A7D86）。
- `{colors.semantic.text.light.placeholder}` / `{colors.semantic.text.dark.placeholder}` — 输入占位。Light `neutral.300`（#C8C8C8），Dark `neutral.600`（#60636C）。
- `{colors.semantic.text.light.disabled}` / `{colors.semantic.text.dark.disabled}` — 不可选场次文字。Light `neutral.300`（#C8C8C8），Dark `neutral.700`（#51535A）。
- `{colors.semantic.text.light.inverse}` / `{colors.semantic.text.dark.inverse}` — 实心按钮、图片上文字。Light `neutral.0`（#FFFFFF），Dark `neutral.900`（#191919）。
- `{colors.semantic.text.light.accent}` / `{colors.semantic.text.dark.accent}` — 「查看路线」「导航过去」等功能操作。Light `brand.500`（#0980FE），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.text.light.link}` / `{colors.semantic.text.dark.link}` — 「看完整扫街榜」等跳转。Light `brand.500`（#0980FE），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.text.light.price}` / `{colors.semantic.text.dark.price}` — 价格、折扣、优惠金额。Light `commerce.500`（#FF4D13），Dark `commerce.400`（#FF7A3D）。
- `{colors.semantic.text.light.ranking}` / `{colors.semantic.text.dark.ranking}` — 距离、扫街榜标签文字。Light `ranking.700`（#835B32），Dark `ranking.300`（#DAC1A7）。
- `{colors.semantic.text.light.ranking-tag}` / `{colors.semantic.text.dark.ranking-tag}` — 「扫街榜」小标签深棕字（固定色，压在金色底上）。Light `ranking.tag-text`（#8B4424），Dark `ranking.tag-text`（#8B4424）。
- `{colors.semantic.text.light.success}` / `{colors.semantic.text.dark.success}` — 正在开放、绿色能量。Light `success.700`（#13713F），Dark `success.500`（#16A85A）。
- `{colors.semantic.text.light.warning}` / `{colors.semantic.text.dark.warning}` — 即将关门、限行提醒。Light `warning.700`（#CA7C1C），Dark `warning.500`（#FAB428）。
- `{colors.semantic.text.light.danger}` / `{colors.semantic.text.dark.danger}` — 已售罄、错误。Light `danger.700`（#BE0817），Dark `danger.500`（#FF3041）。
- `{colors.semantic.text.light.info}` / `{colors.semantic.text.dark.info}` — 信息提示。Light `info.700`（#135BA9），Dark `info.500`（#2E8BF0）。
- `{colors.semantic.text.light.medal-gold}` / `{colors.semantic.text.dark.medal-gold}` — TOP 01 奖牌文字（固定色）。Light `medal.gold-text`（#4A240A），Dark `medal.gold-text`（#4A240A）。
- `{colors.semantic.text.light.medal-silver}` / `{colors.semantic.text.dark.medal-silver}` — TOP 02 奖牌文字（固定色）。Light `medal.silver-text`（#4F5568），Dark `medal.silver-text`（#4F5568）。
- `{colors.semantic.text.light.medal-bronze}` / `{colors.semantic.text.dark.medal-bronze}` — TOP 03 奖牌文字（固定色）。Light `medal.bronze-text`（#7A4137），Dark `medal.bronze-text`（#7A4137）。

### Icon

- `{colors.semantic.icon.light.primary}` / `{colors.semantic.icon.dark.primary}` — 导航栏返回/搜索/分享。Light `neutral.900`（#191919），Dark `neutral.50`（#F8F8F8）。
- `{colors.semantic.icon.light.secondary}` / `{colors.semantic.icon.dark.secondary}` — 列表右箭头、辅助图标。Light `neutral.600`（#60636C），Dark `neutral.300`（#C8C8C8）。
- `{colors.semantic.icon.light.tertiary}` / `{colors.semantic.icon.dark.tertiary}` — 弱化图标。Light `neutral.400`（#999999），Dark `neutral.500`（#7A7D86）。
- `{colors.semantic.icon.light.disabled}` / `{colors.semantic.icon.dark.disabled}` — 禁用图标。Light `neutral.300`（#C8C8C8），Dark `neutral.700`（#51535A）。
- `{colors.semantic.icon.light.inverse}` / `{colors.semantic.icon.dark.inverse}` — 图片上的收藏星、热度星。Light `neutral.0`（#FFFFFF），Dark `neutral.900`（#191919）。
- `{colors.semantic.icon.light.accent}` / `{colors.semantic.icon.dark.accent}` — 「还有 20 分钟」时间图标。Light `brand.500`（#0980FE），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.icon.light.price}` / `{colors.semantic.icon.dark.price}` — 热议火焰、团购图标。Light `commerce.500`（#FF4D13），Dark `commerce.400`（#FF7A3D）。
- `{colors.semantic.icon.light.ranking}` / `{colors.semantic.icon.dark.ranking}` — 扫街榜图标。Light `ranking.700`（#835B32），Dark `ranking.300`（#DAC1A7）。
- `{colors.semantic.icon.light.success}` / `{colors.semantic.icon.dark.success}` — 绿色能量叶子。Light `success.700`（#13713F），Dark `success.500`（#16A85A）。
- `{colors.semantic.icon.light.warning}` / `{colors.semantic.icon.dark.warning}` — 评分星（实心填充，两模式不变）。Light `warning.500`（#FAB428），Dark `warning.500`（#FAB428）。
- `{colors.semantic.icon.light.danger}` / `{colors.semantic.icon.dark.danger}` — 错误。Light `danger.700`（#BE0817），Dark `danger.500`（#FF3041）。
- `{colors.semantic.icon.light.info}` / `{colors.semantic.icon.dark.info}` — 信息。Light `info.700`（#135BA9），Dark `info.500`（#2E8BF0）。

### Border

- `{colors.semantic.border.light.subtle}` / `{colors.semantic.border.dark.subtle}` — 卡内分隔线。Light `neutral.100`（#F4F5F7），Dark `neutral.800`（#2A2B2F）。
- `{colors.semantic.border.light.default}` / `{colors.semantic.border.dark.default}` — 卡片描边、次按钮描边（Stroke 变量）。Light `neutral.200`（#E8E9EB），Dark `neutral.700`（#51535A）。
- `{colors.semantic.border.light.strong}` / `{colors.semantic.border.dark.strong}` — 强调分隔。Light `neutral.400`（#999999），Dark `neutral.500`（#7A7D86）。
- `{colors.semantic.border.light.accent}` / `{colors.semantic.border.dark.accent}` — 蓝色描边按钮（查看路线）——不作普通分割线。Light `brand.500`（#0980FE），Dark `brand.500`（#0980FE）。
- `{colors.semantic.border.light.commerce}` / `{colors.semantic.border.dark.commerce}` — 团购/票务标签描边。Light `commerce.200`（#FFDEC8），Dark `commerce.800`（#7C260A）。
- `{colors.semantic.border.light.brand-soft}` / `{colors.semantic.border.dark.brand-soft}` — 浅蓝按钮（导航过去、去停车）描边。Light `brand.50`（#EBF3FE），Dark `brand.900`（#0B2A4B）。
- `{colors.semantic.border.light.focus}` / `{colors.semantic.border.dark.focus}` — 键盘/无障碍焦点。Light `brand.500`（#0980FE），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.border.light.selected}` / `{colors.semantic.border.dark.selected}` — 选中日期/场次。Light `brand.500`（#0980FE），Dark `brand.500`（#0980FE）。
- `{colors.semantic.border.light.disabled}` / `{colors.semantic.border.dark.disabled}` — 禁用控件。Light `neutral.200`（#E8E9EB），Dark `neutral.800`（#2A2B2F）。
- `{colors.semantic.border.light.success}` / `{colors.semantic.border.dark.success}` — 「正在开放」标签描边。Light `success.200`（#A0DBA4），Dark `success.700`（#13713F）。
- `{colors.semantic.border.light.warning}` / `{colors.semantic.border.dark.warning}` — 警告标签描边。Light `warning.200`（#F9E8C6），Dark `warning.700`（#CA7C1C）。
- `{colors.semantic.border.light.danger}` / `{colors.semantic.border.dark.danger}` — 错误描边。Light `danger.200`（#FAC8CC），Dark `danger.700`（#BE0817）。
- `{colors.semantic.border.light.info}` / `{colors.semantic.border.dark.info}` — 信息标签描边。Light `info.200`（#C8DEF7），Dark `info.700`（#135BA9）。

### Overlay / Glass / Focus / Shadow

- `{colors.semantic.overlay.light.scrim}` / `{colors.semantic.overlay.dark.scrim}` — 浮层打开后的背景遮罩（原型观测 #000000 70%）。Light `alpha-black.70`（rgba(0,0,0,0.7)），Dark `alpha-black.70`（rgba(0,0,0,0.7)）。
- `{colors.semantic.overlay.light.image}` / `{colors.semantic.overlay.dark.image}` — 图片底部文字压暗（配合 scrim-image 渐变）。Light `alpha-black.80`（rgba(19,19,19,0.8)），Dark `alpha-black.80`（rgba(19,19,19,0.8)）。
- `{colors.semantic.overlay.light.brand}` / `{colors.semantic.overlay.dark.brand}` — 蓝色按压层。Light `alpha-brand.16`（rgba(9,128,254,0.16)），Dark `alpha-brand.16`（rgba(9,128,254,0.16)）。
- `{colors.semantic.glass.light.background}` / `{colors.semantic.glass.dark.background}` — 毛玻璃底。Light `alpha-white.80`（rgba(255,255,255,0.8)），Dark `alpha-black.50`（rgba(19,19,19,0.5)）。
- `{colors.semantic.glass.light.border}` / `{colors.semantic.glass.dark.border}` — 毛玻璃发丝描边。Light `alpha-white.40`（rgba(255,255,255,0.4)），Dark `alpha-white.40`（rgba(255,255,255,0.4)）。
- `{colors.semantic.focus.light.ring}` / `{colors.semantic.focus.dark.ring}` — 焦点光环（暗色提亮）。Light `alpha-brand.24`（rgba(9,128,254,0.24)），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.focus.light.ring-strong}` / `{colors.semantic.focus.dark.ring-strong}` — 高对比焦点。Light `brand.500`（#0980FE），Dark `brand.400`（#52A5FC）。
- `{colors.semantic.shadow.light.color}` / `{colors.semantic.shadow.dark.color}` — 卡片投影色（观测 #000@5%）。Light `alpha-black.05`（rgba(19,19,19,0.05)），Dark `alpha-black.50`（rgba(19,19,19,0.5)）。
- `{colors.semantic.shadow.light.color-strong}` / `{colors.semantic.shadow.dark.color-strong}` — 浮层投影色。Light `alpha-black.12`（rgba(19,19,19,0.12)），Dark `alpha-black.80`（rgba(19,19,19,0.8)）。

### Rank theme · 扫街榜分榜

- `{colors.semantic.rank-theme.light.smoky-wash}` / `{colors.semantic.rank-theme.dark.smoky-wash}` — 烟火小店 · 卡头底色（自上而下渐隐至卡片底）。Light `commerce.50`（#FFF3EB），Dark `commerce.900`（#4D1B0B）。
- `{colors.semantic.rank-theme.light.smoky-badge}` / `{colors.semantic.rank-theme.dark.smoky-badge}` — 烟火小店 · 右上箭头徽标。Light `commerce.100`（#FFEBDE），Dark `commerce.800`（#7C260A）。
- `{colors.semantic.rank-theme.light.smoky-glow}` / `{colors.semantic.rank-theme.dark.smoky-glow}` — 烟火小店 · 徽标高光（渐隐）。Light `commerce.50`（#FFF3EB），Dark `commerce.900`（#4D1B0B）。
- `{colors.semantic.rank-theme.light.quality-wash}` / `{colors.semantic.rank-theme.dark.quality-wash}` — 品质甄选 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-blue.50`（#E5F2FF），Dark `cat-blue.900`（#102C4B）。
- `{colors.semantic.rank-theme.light.quality-badge}` / `{colors.semantic.rank-theme.dark.quality-badge}` — 品质甄选 · 右上箭头徽标。Light `cat-blue.100`（#DFEBFB），Dark `cat-blue.800`（#134378）。
- `{colors.semantic.rank-theme.light.quality-glow}` / `{colors.semantic.rank-theme.dark.quality-glow}` — 品质甄选 · 徽标高光（渐隐）。Light `cat-blue.50`（#E5F2FF），Dark `cat-blue.900`（#102C4B）。
- `{colors.semantic.rank-theme.light.destination-wash}` / `{colors.semantic.rank-theme.dark.destination-wash}` — 专程前往 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-green.50`（#E5FFF0），Dark `cat-green.900`（#123A26）。
- `{colors.semantic.rank-theme.light.destination-badge}` / `{colors.semantic.rank-theme.dark.destination-badge}` — 专程前往 · 右上箭头徽标。Light `cat-green.100`（#D8FDE4），Dark `cat-green.800`（#165435）。
- `{colors.semantic.rank-theme.light.destination-glow}` / `{colors.semantic.rank-theme.dark.destination-glow}` — 专程前往 · 徽标高光（渐隐）。Light `cat-green.50`（#E5FFF0），Dark `cat-green.900`（#123A26）。
- `{colors.semantic.rank-theme.light.hotel-wash}` / `{colors.semantic.rank-theme.dark.hotel-wash}` — 酒店 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-indigo.100`（#E5EDFF），Dark `cat-indigo.900`（#121451）。
- `{colors.semantic.rank-theme.light.hotel-badge}` / `{colors.semantic.rank-theme.dark.hotel-badge}` — 酒店 · 右上箭头徽标。Light `cat-indigo.200`（#DBE4FD），Dark `cat-indigo.800`（#171A88）。
- `{colors.semantic.rank-theme.light.hotel-glow}` / `{colors.semantic.rank-theme.dark.hotel-glow}` — 酒店 · 徽标高光（渐隐）。Light `cat-indigo.50`（#F2F1FD），Dark `cat-indigo.900`（#121451）。
- `{colors.semantic.rank-theme.light.local-wash}` / `{colors.semantic.rank-theme.dark.local-wash}` — 本地人爱去 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-pink.50`（#FFE5EF），Dark `cat-pink.900`（#4A1326）。
- `{colors.semantic.rank-theme.light.local-badge}` / `{colors.semantic.rank-theme.dark.local-badge}` — 本地人爱去 · 右上箭头徽标。Light `cat-pink.100`（#FFD8EB），Dark `cat-pink.800`（#78193A）。
- `{colors.semantic.rank-theme.light.local-glow}` / `{colors.semantic.rank-theme.dark.local-glow}` — 本地人爱去 · 徽标高光（渐隐）。Light `cat-pink.50`（#FFE5EF），Dark `cat-pink.900`（#4A1326）。
- `{colors.semantic.rank-theme.light.tea-wash}` / `{colors.semantic.rank-theme.dark.tea-wash}` — 下午茶 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-amber.50`（#FFF5E5），Dark `cat-amber.900`（#453110）。
- `{colors.semantic.rank-theme.light.tea-badge}` / `{colors.semantic.rank-theme.dark.tea-badge}` — 下午茶 · 右上箭头徽标。Light `cat-amber.100`（#FFEED0），Dark `cat-amber.800`（#6D4B14）。
- `{colors.semantic.rank-theme.light.tea-glow}` / `{colors.semantic.rank-theme.dark.tea-glow}` — 下午茶 · 徽标高光（渐隐）。Light `cat-amber.50`（#FFF5E5），Dark `cat-amber.900`（#453110）。
- `{colors.semantic.rank-theme.light.relax-wash}` / `{colors.semantic.rank-theme.dark.relax-wash}` — 休闲按摩 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-purple.50`（#F3E5FF），Dark `cat-purple.900`（#301647）。
- `{colors.semantic.rank-theme.light.relax-badge}` / `{colors.semantic.rank-theme.dark.relax-badge}` — 休闲按摩 · 右上箭头徽标。Light `cat-purple.100`（#F2DDFF），Dark `cat-purple.800`（#4B1E74）。
- `{colors.semantic.rank-theme.light.relax-glow}` / `{colors.semantic.rank-theme.dark.relax-glow}` — 休闲按摩 · 徽标高光（渐隐）。Light `cat-purple.50`（#F3E5FF），Dark `cat-purple.900`（#301647）。
- `{colors.semantic.rank-theme.light.new-wash}` / `{colors.semantic.rank-theme.dark.new-wash}` — 近期新开 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-red.50`（#FFE5E5），Dark `cat-red.900`（#4D1111）。
- `{colors.semantic.rank-theme.light.new-badge}` / `{colors.semantic.rank-theme.dark.new-badge}` — 近期新开 · 右上箭头徽标。Light `cat-red.100`（#FFDEDE），Dark `cat-red.800`（#7E1515）。
- `{colors.semantic.rank-theme.light.new-glow}` / `{colors.semantic.rank-theme.dark.new-glow}` — 近期新开 · 徽标高光（渐隐）。Light `cat-red.50`（#FFE5E5），Dark `cat-red.900`（#4D1111）。
- `{colors.semantic.rank-theme.light.slow-wash}` / `{colors.semantic.rank-theme.dark.slow-wash}` — 慢饮时光 · 卡头底色（自上而下渐隐至卡片底）。Light `cat-lime.50`（#F3FFE5），Dark `cat-lime.900`（#2A3D15）。
- `{colors.semantic.rank-theme.light.slow-badge}` / `{colors.semantic.rank-theme.dark.slow-badge}` — 慢饮时光 · 右上箭头徽标。Light `cat-lime.100`（#DDFFD8），Dark `cat-lime.800`（#3F5E1B）。
- `{colors.semantic.rank-theme.light.slow-glow}` / `{colors.semantic.rank-theme.dark.slow-glow}` — 慢饮时光 · 徽标高光（渐隐）。Light `cat-lime.50`（#F3FFE5），Dark `cat-lime.900`（#2A3D15）。

### Status

每个状态是 bg + text + border + icon 四件套，必须配文字或图标形状，不能只靠颜色。

- `{colors.semantic.status.light.success}` / `{colors.semantic.status.dark.success}` — success 状态四件套。
- `{colors.semantic.status.light.warning}` / `{colors.semantic.status.dark.warning}` — warning 状态四件套。
- `{colors.semantic.status.light.danger}` / `{colors.semantic.status.dark.danger}` — danger 状态四件套。
- `{colors.semantic.status.light.info}` / `{colors.semantic.status.dark.info}` — info 状态四件套。

### Gradients

受控命名集，只用于主操作、品牌强调与关键背景，不用于正文区域；渐变上的文字按最浅点校验对比度。只有 `theme-light` 需要暗色对应 `theme-dark`，其余饱和渐变两模式通用。

- `{colors.gradients.theme}` — 主操作按钮（看团购、订门票蓝色实心）；两模式通用（brand.600 → brand.500 区间）。
- `{colors.gradients.theme-light}` — 浅色卡头、弱背景（cat-blue.50 → neutral.0）。
- `{colors.gradients.theme-dark}` — theme-light 的暗色版（brand.900 → neutral.900）。
- `{colors.gradients.commerce}` — 「去下单」「免密支付」商业主按钮（commerce.500 → commerce.400）。
- `{colors.gradients.ranking-tag}` — 扫街榜标签底（ranking.200 → ranking.50）。
- `{colors.gradients.medal-gold}` — 榜单第 1 名角标底（金 · TOP 01 盾形底）。
- `{colors.gradients.medal-silver}` — 榜单第 2 名角标底（银 · TOP 02 盾形底）。
- `{colors.gradients.medal-bronze}` — 榜单第 3 名角标底（铜 · TOP 03 盾形底）。
- `{colors.gradients.medal-gold-laurel}` — 奖牌两侧麦穗（金 · TOP 01 麦穗）。
- `{colors.gradients.medal-silver-laurel}` — 奖牌两侧麦穗（银 · TOP 02 麦穗）。
- `{colors.gradients.medal-bronze-laurel}` — 奖牌两侧麦穗（铜 · TOP 03 麦穗）。
- `{colors.gradients.header-fade}` — 到达头部卡：压在右侧地图上，左侧承载文字（neutral.canvas → 透明）。
- `{colors.gradients.hot-review}` — 扫街榜 POI 卡「热评」条底色，左→右渐隐（cat-red.50 → 透明）。
- `{colors.gradients.scrim-image}` — 图片卡底部渐隐，承载白字（alpha-black 0 → 100%）。

地铁 / 公交线路色由线路数据下发，不进 token。

## Typography

### English

正文字族 `"PingFang SC", "Noto Sans SC", sans-serif`（中英共用一个字族；回退 Noto Sans SC），标题 `"PingFang SC", "Noto Sans SC", sans-serif`。

| Token | Size / LH | Weight | 用途 |
|---|---|---|---|
| `{typography.display}` | 24/30 | 600 | 「已到达」页面标题 |
| `{typography.heading}` | 16/auto | 600 | 区块标题「扫街榜 · 猜你想去」「附近精选」 |
| `{typography.subheading}` | 14/18 | 500 | POI 名、卡片标题 |
| `{typography.body}` | 12/17 | 400 | 卡片正文、元信息、推荐理由 |
| `{typography.body-sm}` | 11/15 | 400 | 列表次要信息、浮层说明 |
| `{typography.caption}` | 10/13 | 400 | 标签、角标、状态标签、TOP 文字（原 8px 统一提到 10） |
| `{typography.label}` | 12/14 | 500 | 按钮文字、价格、团购标签 |

数字：

- `{typography.numeric-lg}` — 大号价格 / 合计金额（共计 ¥18.28），24/28 · 700。
- `{typography.numeric-md}` — 班车时间、数量，14/18 · 700。
- `{typography.numeric-sm}` — 价格「¥40」、距离数字，12/14 · 700。
- `{typography.numeric-medal}` — TOP 角标排名数字 01/02/03 · Khand SemiBold，24/auto · 600。
- `{typography.medal-label}` — TOP 角标「TOP」字样 · Khand SemiBold · 字间距 1，12/13.44 · 600。

### Principles

信息密度高，所以正文压到 12px、标签 10px，但每级都写死行高（约 1.3–1.4 倍），保证 POI 描述折行时可读。层级只有字号 + 字重两个维度；颜色承担语义（价格、距离），不承担标题层级。

### 中文 (Chinese)

中文使用 PingFang SC，非苹果平台回退 Noto Sans SC。字族 `"PingFang SC", "Noto Sans SC", sans-serif`，字重只用 400 Regular / 500 Medium / 600 Semibold（去掉只出现 3 次的 Light 300）。字号与行高和英文完全一致，letter-spacing 统一为 0。

| Token | Size / LH | Weight | 来源 |
|---|---|---|---|
| `{typography.zh-display}` | 24/30 | 600 | 观测 24 Semibold |
| `{typography.zh-heading}` | 16/auto | 600 | 变量「标题」 |
| `{typography.zh-subheading}` | 14/18 | 500 | 变量「卡片副标题」16.9→18 |
| `{typography.zh-body}` | 12/17 | 400 | 变量「卡片正文」×335 |
| `{typography.zh-body-sm}` | 11/15 | 400 | 观测 11 |
| `{typography.zh-caption}` | 10/13 | 400 | 观测 10/13.4 |
| `{typography.zh-label}` | 12/14 | 500 | 变量「卡片团购价格」 |

### Note on Font Substitutes

PingFang SC 与 Helvetica 为 Apple 系统字体，只在苹果设备上可用：Android / Web 端中文回退 Noto Sans SC（思源黑体，开源），数字回退 Arial；Khand 为开源字体（SIL OFL），随包加载。Figma 文字样式的字族绑定 `font/family/*` 变量（zh / zh-fallback / numeric / medal），需要时改变量值即可整体切换。

## Layout

4px 基准，2px 只作标签半步；零碎值 3 → 2、5 → 4、9 → 8、18 → 16。

- `{spacing.2xs}` = 2px — 标签上下内边距、图标与 10px 小字之间
- `{spacing.xs}` = 4px — 图标↔文字、元信息之间（古建登楼 · ¥40/人）、标签左右内边距
- `{spacing.sm}` = 6px — 卡片内文字行之间（标题→元信息→标签）
- `{spacing.md}` = 8px — 区块标题→内容、图片卡内边距、列表行之间
- `{spacing.lg}` = 12px — 横滑卡片之间、列表卡内行间距
- `{spacing.xl}` = 16px — 区块与区块之间
- `{spacing.2xl}` = 24px — 页面顶部信息区 → 首个内容区（预留）

- `{spacing.page-margin}` = 16px — 页面左右安全边距
- `{spacing.section-gap}` = 16px — 区块与区块之间（= xl）
- `{spacing.section-title-gap}` = 8px — 区块标题 → 区块内容（= md）
- `{spacing.carousel-gap}` = 12px — 横滑卡片之间（= lg）

组件专用（不进通用阶梯，页面布局不得引用）：

- `{spacing.component-control-padding-x}` = 10 — 按钮、服务入口胶囊左右内边距
- `{spacing.component-control-padding-y}` = 8 — 按钮上下内边距（9 → 8）
- `{spacing.component-card-inset-x}` = 14 — 列表卡左右内边距（今晚末班车时间卡）
- `{spacing.component-tag-padding}` = 2 / 4 — 标签内边距（上下 / 左右）

栅格（见 Responsive Behavior）：
- `{grid.grid-columns}` = 4 — 普通内容区栅格
- `{grid.grid-gutter}` = 12px — 列间距（= layout/carousel-gap）
- `{grid.grid-margin}` = 16px — 左右边距（= layout/page-margin），各宽度固定
- `{grid.grid-content-width}` = 100% − 2 × 16px — 内容区随屏宽自适应：343 / 370 / 408
- `{grid.carousel-card-width}` = 284px — 扫街榜横滑卡，各宽度固定，始终露出下一张

**留白原则**：层级越外，间距越大——标签内 2 → 文字行 6 → 卡片内边距 8 → 卡片之间 12 → 区块之间 16。密集的是内容，不是间距。

### Radius

嵌套递减：容器 16 › 内容卡 12 › 图片 8 › 按钮 4 › 标签 2。

- `{rounded.element}` = 2px — 评分徽标「4.8」、团购/票务/状态标签、线路标
- `{rounded.control}` = 4px — 订门票 / 查看路线按钮、数量步进器、日期与场次选项
- `{rounded.media}` = 8px — 卡片内图片、缩略图、图片推荐卡（有 1 小时以上）
- `{rounded.component}` = 12px — 扫街榜 POI 卡、附近精选卡、横滑「查看更多」卡
- `{rounded.container}` = 16px — 列表卡（末班车、你的收藏）、浮层（POI 浮层、一键下单）
- `{rounded.pill}` = 999px — 服务入口胶囊、图片上热度/收藏角标
- `{rounded.shape-sheet-top}` = `16px 16px 0 0` — 底部浮层顶部
- `{rounded.shape-ranking-tag}` = `2px 0 4px 2px` — 扫街榜标签（左上 2 · 右上 0 · 右下 4 · 左下 2）
- `{rounded.shape-medal}` = `2px 2px 0 0` — TOP 01/02/03 盾形角标：49×57.5，顶角 2，底部为矢量尖角（侧边 45 处收向底部中点 57.5）
- `{rounded.shape-bubble}` = `8px 8px 8px 0` — 提示气泡（左下指向）

## Elevation

卡片层级以**描边**为主：所有卡片统一 `{elevation.stroke-card}`（0.6px，不计入布局）。只有扫街榜卡片（POI 卡、分榜卡）额外叠加一档真实投影 `{elevation.shadow-card}`。浮层不加投影，打开时铺 `{elevation.overlay-scrim}` 遮罩。其余均为描边型内阴影与高光。

- `{elevation.stroke-card}` — 所有卡片的描边（0.6px，不计入布局）——卡片的默认层级表达（`0 0 0 0.6px {colors.semantic.border.light.default}`）
- `{elevation.shadow-card}` — 扫街榜卡片（POI 卡、分榜卡）在描边之外额外加的轻投影（`0 4px 14px {colors.semantic.shadow.light.color}`）
- `{elevation.shadow-divider-top}` — 底部操作栏（去下单 / 免密支付栏）顶部分隔（`0 -1px 0 {colors.semantic.border.light.subtle}`）
- `{elevation.shadow-inset-border}` — 以内阴影描边的卡片与输入框（保留为效果）（`inset 0 0 0 1px {colors.semantic.border.light.default}`）
- `{elevation.shadow-inset-selected}` — 选中的日期 / 场次卡（`inset 0 0 0 1.5px {colors.semantic.border.light.selected}`）
- `{elevation.highlight-button}` — 渐变实心按钮（订门票 / 去下单）与 TOP 奖牌盾形底部高光（`inset 0 -1px 0 {colors.palette.alpha.white.25}`）
- `{elevation.glass-blur}` — 图片上的热度 / 收藏角标（`backdrop-filter: blur(4px)`）
- `{elevation.glass-background}` — 毛玻璃底色（Light 白 80% / Dark 黑 50%）（`{colors.semantic.glass.light.background}`）
- `{elevation.glass-border}` — 毛玻璃发丝描边（`1px solid {colors.semantic.glass.light.border}`）
- `{elevation.blur-fade-edge}` — 横滑末尾「查看更多」渐隐卡（`filter: blur(16px)`）
- `{elevation.opacity-disabled}` — 不可选场次、禁用按钮（`0.4`）
- `{elevation.state-pressed}` — 蓝色按钮 / 链接按下（`{colors.semantic.overlay.light.brand} 叠加`）
- `{elevation.overlay-scrim}` — 浮层打开后的背景遮罩（`{colors.palette.alpha.black.70}`）
- `{elevation.overlay-image}` — 图片角标底、图片底部承载白字（`{colors.palette.alpha.black.80} / scrim-image 渐变`）

暗色模式下层级主要靠 `{colors.semantic.surface.dark.elevated}` 提亮表达。

动效（原型观测，非完整动效规范）：
- `{motion.overlay-enter}` — Move in · 自下而上 · 400ms · ease-in；浮层打开（Position: Bottom center）
- `{motion.overlay-dismiss}` — 点击外部不关闭；浮层需通过关闭按钮 / 下滑收起

## Components

基础元素之上已构建的组件（Figma 组件集，全部绑定本文件的 token）：

### `{components.rank-list-card}` 扫街榜分榜卡片

- 单一主组件。主题通过暴露的嵌套组件 `扫街榜分榜卡片/主题背景` 切换，9 选 1：烟火小店 / 品质甄选 / 专程前往 / 酒店 / 本地人爱去 / 下午茶 / 休闲按摩 / 近期新开 / 慢饮时光。主题只决定 `{colors.semantic.rank-theme}` 的三色：wash（卡头底色，经渐变蒙版自上而下渐隐）、badge（右上箭头徽标）、glow（徽标高光）；颜色是纯色变量，渐变由蒙版实现，因此支持 Light / Dark。
- 外壳：`{colors.semantic.surface.light.default}` 底 + `{colors.semantic.border.light.default}` 描边 + `{rounded.container}` + `{elevation.shadow-card}`；内边距上 `{spacing.lg}`、左右下 `{spacing.md}`。
- 卡头：标题 `{typography.zh-heading}`；扫街榜标签 `{colors.semantic.bg.light.ranking-tag}` 底 + `{colors.semantic.text.light.ranking-tag}` 字；「完整榜单」`{colors.semantic.text.light.secondary}`。
- 属性：标题、副标题（TEXT）；两行 POI 为暴露的嵌套实例，可在卡片层直接改。

### `{components.rank-list-row}` 扫街榜分榜 / POI 行

- 缩略图 50px、`{rounded.media}`，左上角排名 `{typography.numeric-md}` 白字压在 `{colors.gradients.scrim-image}` 角部压暗上；店名 `{typography.zh-subheading}` 单行截断；距离 `{colors.semantic.text.light.ranking}`，补充信息 `{colors.semantic.text.light.secondary}`；收藏星 `{colors.semantic.icon.light.secondary}`。
- 属性：排名、店名、距离、补充信息（TEXT）；图片通过覆盖 Image 图层的填充替换。

### `{components.poi-card}` 扫街榜 POI 卡片（猜你想去）

- 单一主组件，不再按场景拆变体：场景差异由属性组合实现（上班到达 = CTA 一键下单 + 附加标签「收录」+ 查看更多、无热评、单条优惠；饭店到达 = CTA 看团购 + 热评 + 团/券两条优惠；景点到达 = CTA 订门票 + 附加标签「区域」+ 热评 + 两条门票）。营业状态统一文案「正在营业」（景点用「正在开放」）。
- 外壳：`{colors.semantic.surface.light.card}` 底 + `{rounded.container}` + `{elevation.shadow-card}`，内边距 `{spacing.md}`；图片 `{rounded.media}`，图上热度与页码角标 `{rounded.pill}` + `{elevation.glass-blur}`。
- 文字：店名 `{typography.zh-heading}`，元信息 `{typography.zh-body}`，标签 `{typography.zh-caption}`（强调用 600 字重的「中文/Caption Strong」），价格数字 `{typography.numeric-sm}` + `{colors.semantic.text.light.price}`；标签圆角 `{rounded.element}`，按钮 `{rounded.control}`，主按钮 `{colors.gradients.theme}`；热评条 `{colors.gradients.hot-review}`。
- 操作区为嵌套组件 `扫街榜POI卡片/CTA`，「类型」三选一：一键下单（整块一键下单卡片：商品图、商品名、规格 + 一键下单/换一杯按钮）/ 看团购 + 查看路线 / 订门票 + 查看路线；主按钮 `{colors.gradients.theme}`，按钮间距 `{spacing.md}`，按钮左右内边距 `{spacing.lg}`，两按钮等宽填充。
- 属性：名称、距离（TEXT）；TOP 角标、附加标签、优惠标签 1/2（实例替换）；显示 TOP 角标、显示附加标签、显示热评、显示查看更多、显示第二条优惠（布尔）；CTA 类型（暴露的嵌套实例）。团 / 票 / 券、营业状态、评分、榜单标签、一键下单卡片为暴露的嵌套实例，各自带价格、折扣、状态、文案等文本属性。

### `{components.dish-card}` 必吃榜菜品卡

- 84px 菜品图（`{rounded.media}`）+ 菜名 `{typography.zh-subheading}` + 排名 `{colors.semantic.text.light.ranking}` + 入选店数 `{colors.semantic.text.light.secondary}`（均 `{typography.zh-body}`）。
- 状态：默认 / 按下（图片上叠 `{colors.palette.alpha.black.12}` 遮罩）/ 加载中（`{colors.semantic.surface.light.sunken}` 骨架，`{rounded.element}`）。属性：菜名、排名、入选数（TEXT）；图片覆盖「菜品图」填充。
- 横滑列表：6 张卡，间距 `{spacing.md}`，每张为暴露的嵌套实例。

### `{components.arrival-header}` 到达头部卡

- 类型：常规到达（地址 + 绿色能量 + 行程回溯）/ 打车到达（地址 + 车型｜司机车牌 + 行程回溯）。右侧地图图片，左侧压 `{colors.gradients.header-fade}`；底色 `{colors.semantic.surface.light.card}`，右侧圆角 `{rounded.container}`。
- 标题 `{typography.zh-display}`；地址与次要信息 `{typography.zh-body}` + `{colors.semantic.text.light.secondary}`；绿色能量 `{colors.semantic.text.light.success}`；车型 `{typography.zh-label}` + `{colors.semantic.text.light.warning}`。
- 属性：标题、地址、绿色能量、车型、司机车牌（TEXT）；显示行程回溯（布尔）；地图通过覆盖「地图」图层填充替换。

### `{components.poi-image-card}` POI 推荐卡

- 168×168 图片卡，`{rounded.container}`。图片铺满并叠底部渐进模糊（Figma 效果样式 Blur/Image Fade）与底部遮罩：默认 `{colors.gradients.scrim-image}`，实例按图片主色覆盖（主色随图片变化，不进 token）。
- 名称 `{typography.zh-subheading}`，分类与收藏数 `{typography.zh-body}`，均为 `{colors.semantic.text.light.inverse}`；扫街榜标签 `{colors.semantic.bg.light.ranking-tag}` 底 + `{colors.gradients.ranking-tag}` 徽标；右上收藏按钮 `{colors.semantic.overlay.light.image}`（75%）底 + `{colors.semantic.glass.light.border}` 描边 + 毛玻璃，`{rounded.pill}`。
- 属性：名称、分类、收藏数（TEXT）；显示收藏按钮、显示扫街榜标签（布尔）；图片覆盖「图片」图层填充。

### `{components.parking-card}` 停车场卡 / 泊车指引

- 卡片 `{colors.semantic.surface.light.card}` 底 + `{colors.semantic.border.light.default}` 描边，描边宽度统一 0.6px（Figma 变量 `stroke/card`，所有卡片共用），圆角 `{rounded.container}`，内边距 `{spacing.lg}`。
- 名称 `{typography.zh-subheading}` 单行截断；步行与距离 `{typography.zh-body}` + `{colors.semantic.text.light.secondary}`，分隔符统一「 · 」；停车类型标签 `{colors.semantic.border.light.accent}` 描边 + `{typography.zh-caption}`。
- 车位状态：紧张（`{colors.semantic.text.light.danger}`）/ 充裕（`{colors.semantic.text.light.success}`）/ 已满（`{colors.semantic.text.light.tertiary}`），底色用对应 status bg，`{rounded.element}`。按钮 `{colors.semantic.bg.light.brand-soft}` 底 + `{colors.semantic.text.light.accent}` 字，高 36，`{rounded.control}`。
- 区块：标题 `{typography.zh-heading}`，左右 `{spacing.page-margin}`，标题到列表 `{spacing.section-title-gap}`，卡片间距 `{spacing.md}`。

### `{components.gas-card}` 加油站卡

- 与停车场卡同一套卡片规格（底色、0.6 描边、`{rounded.container}`、`{spacing.lg}` 内边距、右侧 brand-soft 按钮）。名称前置「团」标识；优惠标签 `{colors.semantic.bg.light.commerce-soft}` + `{colors.semantic.text.light.price}`，服务标签 `{colors.semantic.bg.light.page-subtle}` + `{colors.semantic.text.light.secondary}`，均为 `{typography.zh-caption}` 字号。属性：名称、距离优惠、优惠标签、服务标签、按钮文案（TEXT）；显示团购标识 / 优惠标签 / 服务标签（布尔）。

### `{components.last-bus-row}` 末班车行

- 一张列表卡内放多行：线路标（线路色由数据下发，实例覆盖）+ 站点 `{typography.zh-subheading}` 与说明 + 右侧时间 `{typography.numeric-md}`。第 2 行起开启「显示分隔线」（`{colors.semantic.border.light.subtle}`）。列表卡沿用卡片规格。

### 同规格卡片族

- 停车场卡、加油站卡、收藏卡、代驾卡、末班车列表卡共用一套卡片规格：`{colors.semantic.surface.light.card}` 底、`{colors.semantic.border.light.default}` 0.6 描边（不计入布局，保证高度为整数）、`{rounded.container}`、`{spacing.lg}` 内边距；主标题 `{typography.zh-heading}` 单行截断，次要信息 `{typography.zh-body}`；右侧按钮统一为 `{colors.semantic.bg.light.brand-soft}` 底 + `{rounded.media}` + `{typography.zh-subheading}` · `{colors.semantic.text.light.accent}`。所在区块标题 `{typography.zh-heading}`，左右 `{spacing.page-margin}`。

## Responsive Behavior

| Token | 宽度 | 内容区 | 设备 |
|---|---|---|---|
| `{breakpoints.compact}` | 375pt | 343pt | iPhone SE / mini、部分安卓小屏 |
| `{breakpoints.base}` | 402pt | 370pt | iPhone 16 Pro —— 设计基准 |
| `{breakpoints.large}` | 440pt | 408pt | iPhone 16 Pro Max |

### Touch Targets

可点击区域最小 44×44pt（iOS HIG）。视觉上更小的元素（10px 标签、收藏星、横滑「查看更多」）需要用透明热区补足到 44pt；按钮视觉高度可以更小，但热区不得低于 44pt。

### Collapsing Strategy

- 边距、间距、字号在三档宽度下全部固定，只有内容区随宽度伸缩（343 / 370 / 408）。
- 扫街榜横滑卡固定 `{grid.carousel-card-width}`，在 compact 宽度露出约 47pt、large 宽度露出约 112pt。
- compact 宽度下，一行 3 张的图片推荐卡改为横滑，避免单卡过窄。
- 不定义平板与折叠屏布局。

## Known Gaps

- **组件**：目前只有扫街榜分榜卡片与 POI 行；按钮、标签、POI 主卡、浮层等尚未组件化。
- **动效**：只记录了浮层入场（原型观测：ease-in 400ms），缺少完整的时长 / 缓动 token；入场缓动建议复核为 ease-out。
- **z-index / 层级栈**：地图、到达页、浮层、Toast 的层级顺序未定义。
- **平板 / 折叠屏**：未覆盖。
- **扩展值**：场景色 `.100` 以上、各色阶深色段、`spacing.2xl`、断点 compact/large 为推导值，未经稿面验证。
- **无障碍对比度**：`text/tertiary`（#999999）与 10px 字号的组合未达 WCAG AA 4.5:1，仅可用于非关键信息。
- **图标**：图标体系不在本次范围内。
