"""
Build the site's WOFF2 fonts from the OFL variable TTFs in src/fonts.

Keeps the axes and weights the site uses, pins the rest, and subsets to
Latin, Latin Extended and Vietnamese. Needs fontTools and brotli:
  /usr/bin/python3 -m pip install fonttools brotli
  /usr/bin/python3 scripts/build-fonts.py
"""

import io
import os

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONTS = os.path.join(os.path.dirname(__file__), "..", "src", "fonts")

UNICODES = (
    "U+0000-00FF,U+0100-017F,U+0131,U+0152-0153,U+01A0-01A1,U+01AF-01B0,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+2000-206F,U+2074,U+20AB,U+20AC,"
    "U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
)

JOBS = [
    # Display: Fraunces 400 to 600 with optical sizes; SOFT and WONK at their defaults.
    ("Fraunces-Variable.ttf", "Fraunces.woff2", {"wght": (400, 600), "SOFT": 0, "WONK": 1}),
    # The italic phrase in display headings is weight 400 only.
    ("Fraunces-Italic-Variable.ttf", "Fraunces-Italic.woff2", {"wght": 400, "SOFT": 0, "WONK": 1}),
    # UI: Instrument Sans 400 to 700 at normal width. No italic is used.
    ("InstrumentSans-Variable.ttf", "InstrumentSans.woff2", {"wdth": 100}),
]

for src, dst, limits in JOBS:
    font = instantiateVariableFont(TTFont(os.path.join(FONTS, src), lazy=False), limits)
    buf = io.BytesIO()
    font.save(buf)
    buf.seek(0)
    font = TTFont(buf, lazy=False)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    out = os.path.join(FONTS, dst)
    subset.save_font(font, out, opts)
    print(f"{dst}: {os.path.getsize(out) // 1024} KB")
