"""从 docs/design-system/DESIGN.md 的 frontmatter 生成 tokens/ds-tokens.css。

变量名与 Figma 变量的 code syntax 一致（Dev Mode 里看到的 var(--color-text-primary) 等），
所以 Figma 标注可以直接对照代码。每次改完 DESIGN.md 运行一次：

    python3 tokens/build_tokens.py

旧的 --ds-* 变量仍在 tokens/tokens.css，供尚未迁移的组件使用。
"""
from pathlib import Path
import re
import yaml

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'docs/design-system/DESIGN.md'
OUT = ROOT / 'tokens/ds-tokens.css'

# Figma 变量实际值与 DESIGN.md 不一致、且以 Figma 为准的项（待设计确认后同步回文档）
FIGMA_OVERRIDES = {}

doc = yaml.safe_load(SRC.read_text(encoding='utf-8').split('---')[1])


def get(path):
    node = doc
    for part in path.split('.'):
        if isinstance(node, dict):
            if part in node:
                node = node[part]
            elif part.isdigit() and int(part) in node:
                node = node[int(part)]
            else:
                raise KeyError(path)
        else:
            raise KeyError(path)
    return node


def key(k):
    """色阶键：alpha 透明度补两位（05），其余原样。"""
    return str(k)


def palette_var(family, step):
    return f'--color-{family}-{key(step)}'


def ref_to_var(value):
    """{colors.palette.brand.500} → var(--color-brand-500)；其余 token 引用 → 解析成值。"""
    def sub(m):
        path = m.group(1)
        parts = path.split('.')
        if parts[:2] == ['colors', 'palette']:
            if parts[2] == 'alpha':
                return f'var(--color-alpha-{parts[3]}-{int(parts[4]):02d})'
            return f'var({palette_var(parts[2], parts[3])})'
        if parts[:3] == ['colors', 'semantic', parts[2]] and parts[3] in ('light', 'dark'):
            return f'var(--color-{parts[2]}-{parts[4]})'
        return ref_to_var(str(get(path)))
    return re.sub(r'\{([^}]+)\}', sub, str(value))


lines_root, lines_dark = [], []
add = lines_root.append

# ── Palette ────────────────────────────────────
add('  /* ── Palette（原子色，组件不直接引用） ── */')
pal = doc['colors']['palette']
for family, steps in pal.items():
    if family in ('alpha', 'canvas'):
        continue
    add('  ' + ' '.join(f'{palette_var(family, s)}: {v};' for s, v in steps.items()))
for family, steps in pal['alpha'].items():
    add('  ' + ' '.join(f'--color-alpha-{family}-{int(s):02d}: {v};' for s, v in steps.items()))

# ── Semantic colors（light 写 :root，dark 写 [data-theme="dark"]） ──
sem = doc['colors']['semantic']
for group, modes in sem.items():
    for mode, target in (('light', lines_root), ('dark', lines_dark)):
        target.append(f'  /* {group} */')
        for name, val in modes[mode].items():
            if isinstance(val, dict):  # status: success { bg, text, border, icon }
                for sub, v in val.items():
                    target.append(f'  --color-{group}-{name}-{sub}: {ref_to_var(v)};')
                continue
            val = FIGMA_OVERRIDES.get((group, mode, name), val)
            target.append(f'  --color-{group}-{name}: {ref_to_var(val)};')

# ── Gradients ──
add('  /* ── Gradients ── */')
for name, val in doc['colors']['gradients'].items():
    add(f'  --gradient-{name}: {val};')

# ── Typography ──
add('  /* ── Typography ── */')
add("  --font-family-zh: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Noto Sans SC', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Microsoft YaHei', sans-serif;")
add("  --font-family-numeric: Helvetica, 'Helvetica Neue', Arial, var(--font-family-zh);")
add("  --font-family-medal: 'Khand', var(--font-family-zh);")
add('  --font-weight-regular: 400; --font-weight-medium: 500; --font-weight-semibold: 600; --font-weight-bold: 700;')
for name, t in doc['typography'].items():
    if name.startswith('zh-'):
        continue  # 与同名英文 token 取值一致
    lh = t['lineHeight']
    lh = 'normal' if lh == 'auto' else lh
    add(f"  --font-size-{name}: {t['fontSize']}; --line-height-{name}: {lh}; --font-weight-{name}: {t['fontWeight']};")

# ── Radius / Spacing / Layout ──
add('  /* ── Radius ── */')
for name, val in doc['rounded'].items():
    prefix = '--shape' if name.startswith('shape-') else '--radius'
    add(f"  {prefix}-{name.removeprefix('shape-')}: {val};")
add('  /* ── Spacing ── */')
for name, val in doc['spacing'].items():
    add(f"  --space-{name}: {val};")
add('  /* ── Grid ── */')
for name, val in doc['grid'].items():
    if 'calc' in str(val) or '−' in str(val):
        continue
    add(f"  --{name if name.startswith('grid') else 'grid-' + name}: {val};")

# ── Elevation ──
add('  /* ── Elevation ── */')
add('  --stroke-card: 0.6px;')
add('  --shadow-card: 0 4px 14px var(--color-shadow-color);')
add('  --shadow-divider-top: 0 -1px 0 var(--color-border-subtle);')
add('  --shadow-inset-border: inset 0 0 0 1px var(--color-border-default);')
add('  --shadow-inset-selected: inset 0 0 0 1.5px var(--color-border-selected);')
add('  --highlight-button: inset 0 -1px 0 var(--color-alpha-white-25);')
add('  --blur-glass: 4px;')
add('  --blur-fade-edge: 16px;')
add('  --opacity-disabled: 0.4;')

# 组合 token 在声明处求值，暗色块里要重新声明，才会用上暗色的颜色
for line in [l for l in lines_root if l.strip().startswith(('--shadow-', '--highlight-'))]:
    lines_dark.append(line)

header = '''/* 高德到达页设计系统 · 新版 token（2026-10-15）
 * 由 tokens/build_tokens.py 从 docs/design-system/DESIGN.md 生成，请勿手改。
 * 变量名 = Figma 变量 code syntax；Light 写在 :root，Dark 通过 [data-theme="dark"] 启用。
 */
'''
css = header + ':root {\n' + '\n'.join(lines_root) + '\n}\n\n' \
    + '/* Dark：暂只支持显式 data-theme="dark"（未迁移组件还不支持暗色，避免页面一半变暗） */\n' \
    + '[data-theme="dark"] {\n' + '\n'.join(lines_dark) + '\n}\n'
OUT.write_text(css, encoding='utf-8')
print('wrote', OUT.relative_to(ROOT), f'({len(lines_root) + len(lines_dark)} lines)')
