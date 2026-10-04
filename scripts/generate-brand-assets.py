"""Regenerate the DKPS SVG marks from the bundled IBM Plex fonts.

Requires fonttools and brotli. The SVGs are committed, so this script is not
needed by the website build.
"""

from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "brand"
SANS = ROOT / "node_modules" / "@fontsource" / "ibm-plex-sans" / "files" / "ibm-plex-sans-latin-600-normal.woff2"
MONO = ROOT / "node_modules" / "@fontsource" / "ibm-plex-mono" / "files" / "ibm-plex-mono-latin-500-normal.woff2"


def outline(value: str, font_path: Path, size: float, x: float, baseline: float, tracking: float) -> tuple[str, float]:
    font = TTFont(font_path)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    paths = []
    cursor = x
    for character in value:
        glyph_name = cmap[ord(character)]
        pen = SVGPathPen(glyphs)
        glyphs[glyph_name].draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline)))
        if path := pen.getCommands():
            paths.append(path)
        cursor += font["hmtx"][glyph_name][0] * scale + tracking
    return " ".join(paths), cursor - tracking


def symbol(neutral: str, red: str) -> str:
    return f'''<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 29C18 16 28 9 40 9c15 0 26 13 26 34" stroke="{red}" stroke-width="6.5"/>
  <path d="M18 43c2-12 9-20 20-20 12 0 20 10 19 23" stroke="{neutral}" stroke-width="5.5"/>
  <path d="M33 50 17 62M40 51l7 14" stroke="{neutral}" stroke-width="5"/>
  <circle cx="37" cy="47" r="5.5" fill="{neutral}"/>
  <circle cx="13" cy="65" r="5.5" fill="{neutral}"/>
  <circle cx="49" cy="70" r="5.5" fill="{neutral}"/>
  <circle cx="55" cy="15" r="5" fill="{red}"/>
</g>'''


def full_logo(name: str, neutral: str, secondary: str, red: str) -> None:
    word, word_end = outline("DKPS", SANS, 58, 86, 57, 0.5)
    descriptor, descriptor_end = outline("COMMUNICATIONS", MONO, 15, 87, 78, 0.4)
    width = max(word_end + 4, descriptor_end + 4)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width:.1f}" height="84" viewBox="0 0 {width:.1f} 84">
  <title>DKPS Communications</title>
  {symbol(neutral, red)}
  <path fill="{neutral}" d="{word}"/>
  <path fill="{secondary}" d="{descriptor}"/>
</svg>'''
    (OUT / name).write_text(svg, encoding="utf-8")
    print(f"{name}: {width:.1f} × 84")


def favicon() -> None:
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <title>DKPS Communications</title>
  <rect width="64" height="64" rx="8" fill="#151719"/>
  <g transform="translate(3 3) scale(.76)">{symbol('#FAFBF9', '#E8483E')}</g>
</svg>'''
    (ROOT / "public" / "favicon.svg").write_text(svg, encoding="utf-8")
    (OUT / "dkps-symbol.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="76" height="82" viewBox="0 0 76 82"><title>DKPS signal and network symbol</title>{symbol("#151719", "#C52B25")}</svg>',
        encoding="utf-8",
    )


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    full_logo("dkps-logo-on-dark.svg", "#FAFBF9", "#D0D5D2", "#E8483E")
    full_logo("dkps-logo-on-light.svg", "#151719", "#4B5563", "#C52B25")
    favicon()
