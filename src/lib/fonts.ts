import localFont from "next/font/local";

/*
  Fonts are compressed WOFF2 subsets built from the OFL variable TTFs in
  src/fonts (Latin, Latin Extended and Vietnamese, with the weights the site
  uses): about 175 KB in all instead of about 1.1 MB. Rebuild with
  `/usr/bin/python3 scripts/build-fonts.py` after changing the source fonts.
  Shared by the English and Vietnamese root layouts.
*/
export const fraunces = localFont({
  src: [
    { path: "../fonts/Fraunces.woff2", style: "normal", weight: "400 600" },
    { path: "../fonts/Fraunces-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const instrument = localFont({
  src: [{ path: "../fonts/InstrumentSans.woff2", style: "normal", weight: "400 700" }],
  variable: "--font-instrument",
  display: "swap",
});
