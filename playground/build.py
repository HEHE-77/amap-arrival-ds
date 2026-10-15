"""把 tokens + 组件代码内联进组件台模板，输出 playground/dist/index.html。
每次改完组件运行一次：python3 playground/build.py
"""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parent.parent
tpl = (root / 'playground/playground.template.html').read_text()
css = (root / 'tokens/ds-tokens.css').read_text() + '\n' + (root / 'tokens/tokens.css').read_text().replace("@import url('ds-tokens.css');", '') + '\n' + (root / 'components/header/header.css').read_text()
js = (root / 'components/header/header.js').read_text()

out = tpl.replace('/*__COMPONENT_CSS__*/', css).replace('/*__COMPONENT_JS__*/', js)
dist = root / 'playground/dist'
(dist / 'assets').mkdir(parents=True, exist_ok=True)
(dist / 'index.html').write_text(out)
for f in (root / 'assets').glob('*.png'):
    shutil.copy(f, dist / 'assets' / f.name)
print('built', dist / 'index.html')
