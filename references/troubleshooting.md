# Troubleshooting Guide

## Common Issues

### 1. Gradient Banding (Concentric Circles)

**Symptom:** Radial gradients appear as visible concentric circles instead of smooth fades.

**Solution:**
- Ensure Puppeteer v22+ (uses new unified headless mode)
- Verify `emulateMediaType('screen')` is called before rendering
- If gradient is very subtle, increase opacity slightly

### 2. Ambient Glow Missing

**Symptom:** Background is flat, no warm glow effect.

**Cause:** `@media print` CSS rules hiding the `.ambient` element.

**Solution:**
- Script uses `emulateMediaType('screen')` which bypasses print styles
- Check if slide hides elements unconditionally
- Verify `.ambient` div exists in HTML

### 3. Speckles/Smudges in Background

**Symptom:** Small dots or artifacts in PDF background.

**Cause:** SVG `feTurbulence` noise textures render differently in PDF.

**Solution:** Remove noise textures. Delete any CSS with `feTurbulence` SVG filters.

### 4. Fonts Not Loading

**Symptom:** Text in fallback/system fonts instead of Cormorant Garamond or Outfit.

**Solution:**
- Script uses `waitUntil: 'networkidle0'` which waits for font loading
- For stubborn fonts, add explicit wait in workflow
- Consider local font hosting for offline use

### 5. Blank or White Pages

**Symptom:** Generated PDF has blank pages.

**Solution:**
- `printBackground: true` is set by default
- Add `-webkit-print-color-adjust: exact` to CSS
- Verify HTML file path is correct and accessible

### 6. Content Cut Off

**Symptom:** Slide content cropped or wrong aspect ratio.

**Solution:**
- Default is 1920x1080 (16:9) — adjust with `--width` and `--height`
- Ensure slide CSS uses fixed dimensions, not viewport units
- Check for absolute-positioned elements outside bounds

### 7. Memory Issues with Large Decks

**Symptom:** Process crashes with many slides (20+).

**Solution:**
- Generate in batches of 10-15 slides
- Merge resulting PDFs afterward
- Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096`

### 8. Colors Look Wrong

**Symptom:** Colors don't match browser preview.

**Solution:**
- Script uses `--force-color-profile=srgb` flag
- Verify CSS uses the exact palette values from SKILL.md
- Check that `--bg` is `#f5f3ee`, not `#ffffff`

## Debug Mode

Run Puppeteer in headed mode to visually debug:

```javascript
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 100,
});
```

## Verification

Open both HTML in browser and PDF side-by-side. Check:
1. Background gradient smoothness
2. Font rendering (correct family and weight)
3. Element positions (nothing shifted)
4. Color accuracy (warm cream, not pure white)
5. Corner frames visible and properly positioned
