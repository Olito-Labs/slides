---
name: slides
description: Create professional HTML presentation decks using narrative-first methodology (dot-dash storylines, McKinsey/BCG pyramid structure, MECE assertion-evidence) with PDF export via Puppeteer. Three phases — (1) build ghost deck / dot-dash outline, (2) generate 1920x1080 pixel-perfect HTML slides with warm light-mode design system (Cormorant Garamond + Outfit, gold accent palette), (3) export combined PDF. Use this skill — NOT pptx — whenever building visually designed HTML slides. Triggers on "dot-dash", "ghost deck", "storyline", "HTML slides", "slide deck", "pitch deck", "recap deck", "enrollment deck", "presentation deck", or "export slides to PDF". Use pptx only when user specifically needs a .pptx file.
---

# Slides — Narrative-First Presentation Skill

Three-phase workflow: **Narrative Architecture** → **Slide Creation** → **PDF Export**.

---

## Phase 1: Narrative Architecture (Dot-Dash)

Before opening a single HTML file, build the storyline. A deck is an argument, not a slideshow.

### 1.1 Identify the Governing Thought

Every deck answers one question. The governing thought is your **answer** — a single assertion, not a topic. If you can't write it in one sentence, you don't have a deck yet.

> **Answer-first principle:** State your conclusion before your evidence. The governing thought appears on the cover slide. Every headline states the answer, never the question. Business audiences want the punchline immediately.

The governing thought sits atop a **pyramid** (Minto Pyramid Principle):
- **Vertical logic:** Each level answers "Why?" or "How?" from the level above
- **Horizontal logic:** Arguments at the same level relate by deduction or induction

Key line arguments become slide headlines. Supporting data becomes slide bodies.

### 1.2 Build the Ghost Deck (Dot-Dash Outline)

Write one **headline** per slide (the "dot") and 2-4 **supporting points** (the "dashes"). Headlines are assertions, never labels.

**Bad:** "Market Overview"  →  **Good:** "The market is shifting from compliance-driven to intelligence-driven"

**MECE check:** Every level is Mutually Exclusive (no overlap) and Collectively Exhaustive (no gaps). Test: "Do any overlap?" (merge). "What's missing?" (add).

### 1.3 The Headline Test

Read headlines aloud in sequence as a paragraph. They should tell a coherent story without supporting detail. If the narrative breaks, restructure. Then apply the "So What?" test per-slide — if you can't connect it to the governing thought in one sentence, cut the slide.

### 1.4 Narrative Arcs

| Arc | Pattern | Best For |
|-----|---------|----------|
| **SCR** | Situation → Complication → Resolution | Pitches, proposals, enrollment |
| **SCQA** | Situation → Complication → Question → Answer | Board papers, decision memos |
| **What-So What-Now What** | Finding → Implication → Action | Recap decks, session summaries |
| **Before/During/After** | Past → Transformation → Current | Progress reports, case studies |
| **Problem-Mechanism-Proof** | Pain → How we solve it → Evidence | Product decks, demos |

### 1.5 Slide Type Assignment

Tag each slide in your dot-dash with its visual type. This determines layout in Phase 2. Choose the type that best serves the content — don't force content into a template.

| Type | Use For | Key Elements |
|------|---------|-------------|
| `cover` | Slide 1 always | Hero title, subtitle, badge |
| `skills-showcase` | Workflow demos, before/after | Two-column: narrative left, visual right |
| `constellation` | Architecture, team structures, networks | SVG diagram: nodes + hub + connectors |
| `timeline` | Journeys, stage progressions, roadmaps | Horizontal line with alternating above/below cards |
| `feature-grid` | Program components, offerings | 2×2 icon grid + philosophy/tagline bar |
| `team` | Coaches, founders, leadership | Circular photo crops + bios, vertical divider |
| `proof-asymmetric` | Track record, case studies, social proof | Asymmetric columns (~38/62), panel headings + rules |
| `investment` | Pricing, what's included, CTA | Items list + vertical divider + price card |
| `comparison` | Gap analysis, before/after | Two equal columns with card stacks |
| `metrics` | Impact, KPIs, results | Hero numbers with context labels |
| `pipeline` | Workflows, processes | Horizontal stage cards with connectors |

See `examples/` for reference implementations of each type. Copy the closest archetype, then customize — don't reproduce examples exactly. Each deck should feel designed for its specific audience.

---

## Phase 2: Slide Creation

### 2.0 The Consistency Canon

This is the most important section in the entire skill. When you flip through a professional deck, headers, titles, and footers don't move between slides. This creates a feeling of precision and polish that audiences register subconsciously. Inconsistency — even by a few pixels — looks amateurish.

**Every content slide MUST use these exact values:**

```css
/* HEADER — identical on every slide */
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 48px 56px 0;
  position: relative; z-index: 10;
}
.logo-cluster { display: flex; align-items: center; gap: 16px; }
.logo-icon { height: 44px; width: auto; }
.logo-text {
  font-family: var(--font-body); font-size: 18px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted);
}
.slide-label {
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);
}

/* TITLE + SUBTITLE — same position, same size, every slide */
.page-title {
  font-family: var(--font-display); font-size: 48px; font-weight: 300;
  color: var(--text-primary); margin-bottom: 6px; letter-spacing: -0.01em;
}
.page-subtitle {
  font-family: var(--font-body); font-size: 22px; font-weight: 400;
  color: var(--text-muted); margin-bottom: 28px;
}

/* CONTENT AREA — always 56px horizontal padding */
.content {
  flex: 1; display: flex; flex-direction: column;
  padding: 20px 56px 0;
  position: relative; z-index: 10;
}

/* FOOTER — identical on every slide */
.footer {
  display: flex; justify-content: space-between; align-items: flex-end;
  padding: 16px 56px 48px;
  position: relative; z-index: 10;
}
.footer-label {
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);
}
```

**Non-negotiable rules:**
- Title is ALWAYS 48px Cormorant Garamond weight 300. Never vary between slides.
- Content horizontal padding is ALWAYS 56px. Never use 96px, 80px, or any other value.
- Subtitle is ALWAYS 22px Outfit weight 400. Never 20px, never 18px.
- The slide-label shows page number: "03 / 08" format.
- Footer left = "[Person] · [Organization]", footer right = "[website]"
- Header padding-top is 48px. Content padding-top is 20px. Footer padding-bottom is 48px.

**Titles should be descriptive assertions, not labels.** "What the Program Looks Like" is a label. "The Program Structure: Live Coaching, Community, and 24/7 AI Support" is an assertion that tells you what the slide says without reading further.

### 2.1 Color Palette (Light Mode)

```css
:root {
  --bg: #f5f3ee;                      /* warm cream — never pure #ffffff */
  --gold: #5c4a12;                    /* primary accent — 8:1 contrast */
  --gold-light: #4a3d10;
  --gold-glow: rgba(92, 74, 18, 0.12);
  --gold-subtle: rgba(92, 74, 18, 0.06);
  --gold-border: rgba(92, 74, 18, 0.40);
  --gold-card-fill: rgba(92, 74, 18, 0.06);
  --gold-card-border: rgba(92, 74, 18, 0.25);
  --card-fill: rgba(10, 25, 41, 0.05);
  --card-border: rgba(10, 25, 41, 0.12);
  --text-primary: #0a1929;
  --text-secondary: #162d48;
  --text-muted: #3a5068;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Outfit', sans-serif;
}
```

Background is `#f5f3ee`, never pure white. No red/green. Card fills: `rgba` at 0.05-0.09 opacity. Borders: always 1.5px.

### 2.2 Typography

**All sizes in px. Never rem.** Font weights bumped +100 from dark-mode equivalents.

On a 1920x1080 slide, 18-20px body text looks **tiny** — like fine print. The audience sees this on a screen or projector, not a phone. Size up aggressively. If you look at the slide and the body text doesn't feel immediately comfortable to read, it's too small.

| Element | Size | Font | Weight |
|---------|------|------|--------|
| Hero title (cover only) | 80-92px | Cormorant Garamond | 300-500 |
| Hero numbers (stats slides) | 100-120px | Cormorant Garamond | 300 |
| Page title (all content slides) | 48px | Cormorant Garamond | 300 |
| Panel/section headings | 44-48px | Cormorant Garamond | 400 |
| Card titles / column labels | 28-34px | Outfit | 600-700 |
| Body text / descriptions | 24-28px | Outfit | 400 |
| Supporting context | 22px | Outfit | 400 |
| Quote text | 26-34px | Cormorant Garamond | 400 italic |
| Labels, badges | 14-16px | Outfit | 600-700 |

**The old minimums (18px body, 12px labels) produced slides that consistently looked unprofessional.** These updated sizes reflect what actually works after production testing across dozens of slides.

### 2.3 Slide Skeleton

Every slide is a self-contained HTML file with inline `<style>`. No external CSS. See `examples/` for complete implementations. The skeleton follows the Consistency Canon (§2.0) exactly.

### 2.4 Signature Design Elements

**Corner frames:** L-shaped brackets at top-left and bottom-right. 100px arms, 40px offset, 1.5px stroke, `var(--gold-border)`.

**Ambient gradients:** Layered radial gradients on `.ambient` div. Gold-tinted default, vary per slide for visual interest.

**Contour lines:** Subtle SVG quadratic bezier curves at very low opacity (0.02-0.04).

**Gold divider:** `linear-gradient(90deg, transparent, var(--gold), transparent)` — 120px wide, 1.5px tall.

**Circular photo crops:** Use `clip-path: circle(50%)` with `background: transparent`. Never use `border-radius: 50%` + `overflow: hidden` alone — it fails in Puppeteer PDF rendering, creating visible square artifacts behind photos.

### 2.5 Layout Patterns

These patterns recur across slide types. Understanding them helps you compose new layouts.

**Vertical distribution with `space-between`:** The most common layout mistake is cramming content into the top 50-60% of the slide and leaving the bottom empty. Fix: wrap the content area in a flex column with `justify-content: space-between` and `flex: 1`. This distributes vertical space evenly without manual padding. Every content slide should use this pattern. If the bottom 30% of a slide is empty cream with no content, the layout is wrong.

**Asymmetric columns (38/62 or 40/60):** When one column has significantly more content, give it proportionally more space. Use a `1.5px` vertical gold divider between them (a separate div, not a border — borders can't be shortened). Control divider height with `margin-top` and `margin-bottom`.

**Columns with vertical dividers (no boxes):** For 2-3 equal items side by side (e.g., "Week 1 | Month 1 | Your Role"), use flex columns with vertical gold dividers between them — not bordered cards. Each column gets padding (0 32px), the divider is a `1.5px` wide div with `background: rgba(92,74,18,.20)`. This is cleaner than putting each item in a box.

**Panel headings with horizontal rules:** For sections within a slide (like "Managed Agent" and "Coaching"), use large Cormorant display headings (44-48px) followed by a context line (22px Outfit muted), then a full-width `1.5px` horizontal rule at `opacity: 0.25`. This replaces background boxes — cleaner, more professional.

**Icon circles for list items:** Instead of bullet points or small dots, use 40-56px circular icon containers for each list item. Pattern: `width: 40px; height: 40px; border-radius: 50%; background: rgba(92,74,18,.08); border: 1.5px solid rgba(92,74,18,.20); display: flex; align-items: center; justify-content: center`. Place a 20-24px inline SVG icon inside (stroke: #5c4a12, stroke-width: 1.5-1.8, fill: none). This transforms a plain text list into something that looks designed. Use different icons for each item — document, pen, clock, briefcase, routing arrow, shield, etc.

**Numbered circles for sequential items:** For phased/ordered content (Phase 1, Phase 2...), use numbered circle badges: `width: 36px; height: 36px; border-radius: 50%; background: var(--gold); color: white; font-family: var(--font-body); font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center`. Lay each phase as a horizontal flex row: [numbered circle] [text block with label + description].

**SVG diagrams — fill the space:** Diagrams are the visual centerpiece of architecture/flow slides. A 340px-tall diagram in a 1080px slide looks like a thumbnail. SVG viewBox height should be at least 450-500px for the diagram area, and the SVG element should use the full width available (1720-1808px). Input/output boxes in SVGs should be at least 280x130px with 22-24px text. Center agent/hub boxes should be at least 380x130px.

**SVG geometry in padded containers:** The `.content` div has 56px horizontal padding, making internal elements 1808px wide (not 1920px). When placing SVG elements with absolute coordinates, all x-positions are relative to the 1808px content box, not the slide. Card at `left: 0` in a padded content div = 56px from slide edge.

### 2.6 Design Rules

1. **All px, never rem** — every size, padding, gap
2. **No partial borders** — full `border: 1.5px solid` or no border. Exception: corner brackets (§2.4) use directional borders by design
3. **Subtle fills only** — `rgba(gold, 0.03-0.09)`. No opaque fills
4. **Fill vertical space aggressively** — `flex: 1` on content, `justify-content: space-between` on the main column. Content that floats in the top half of a 1080px slide is the #1 production defect. If your content only occupies ~600px of 1080px available, the layout is broken. Stretch it.
5. **Corner clearance** — header/footer clear corner brackets
6. **SVG connectors edge-to-edge** — lines end at box boundaries, not centers or inside boxes
7. **No overlapping elements** — lines/decorations must not cross text
8. **Body text minimum 24px** on 1920x1080. Labels >= 14px. Titles >= 28px. The old 18px minimum was wrong — it produces text that looks like fine print at presentation scale.
9. **Card text fills 60%+ of card area** — small text in big boxes looks unfinished
10. **No eyebrow labels** — uppercase category text above titles is AI slop
11. **Titles are assertions** — "What the Program Looks Like" → "The Program Structure: Live Coaching, Community, and 24/7 AI Support"
12. **Consistency is king** — see §2.0. Same title size, same padding, same footer on every slide
13. **No em dashes in slide text** — use commas, periods, or colons instead. Em dashes read as informal
14. **Photos use `clip-path: circle(50%)`** — not `border-radius` + `overflow: hidden`
15. **Boxes are the exception, not the default** — the natural instinct is to put every piece of content in a bordered rectangle. Resist this. Use vertical dividers between columns, horizontal rules under headings, and icon circles for list items. Only use bordered cards when the content genuinely represents a discrete, titled unit (like tiered pricing cards or tool cards in an architecture diagram). If removing the box doesn't lose information, remove the box.
16. **Every content slide needs a visual element** — pure text slides look like documents, not presentations. Add: icon circles (§2.5), SVG diagrams, hero numbers, or gold dividers. At minimum, one slide should have an architecture/flow SVG diagram.
17. **One font family per section** — don't mix 3-4 font styles in a CTA or closing section. Closing/CTA sections use ONE font (Outfit), 2 lines max. A CTA with italic Garamond tagline + Outfit body + italic Garamond action + Outfit email = 4 styles across 5 lines = a poem, not a slide.
18. **No boilerplate sections** — don't add "Ships first:" lines, formulaic quotes on every slide, or repeated bottom sections. Each slide should stand alone. Quotes are optional — only include when genuinely impactful, never as filler.
19. **Cover slide simplicity** — the person's name and context (e.g., "Brittany Christenson · AidKit · March 2026") should be plain text with no box, no dot, no badge. Reserve badges for actual status indicators.
20. **SVG logos over hand-drawn icons** — when referencing real tools (Notion, Slack, Granola), use actual SVG logos via `<image href="assets/logo.svg">` in diagrams. Download official SVGs from Wikipedia/brand resources. Only use hand-drawn SVG icons for generic concepts (clock, shield, document).

### 2.7 Branding (Customizable)

Default ships with Olito Labs assets. To customize:
1. Replace `assets/olito-brain.png` with your logo (transparent PNG, ~44px height)
2. Update `.logo-text` in each slide
3. Adjust `--gold` family to your accent (maintain >= 7:1 contrast on `#f5f3ee`)
4. Update footer text

---

## Phase 3: PDF Export

### 3.1 Prerequisites

```bash
cd ~/.claude/skills/olito-pdf/scripts && npm install
brew install ghostscript  # for PDF compression
```

### 3.2 Generate PDF

```bash
# Combined deck (most common)
node ~/.claude/skills/olito-pdf/scripts/generate-pdf.js \
  --input /path/to/slides/ \
  --output /path/to/deck.pdf \
  --order slide_01.html,slide_02.html,slide_03.html

# Single slide
node ~/.claude/skills/olito-pdf/scripts/generate-pdf.js \
  --input /path/to/slide.html \
  --output /path/to/slide.pdf
```

### 3.3 Compressed Shareable Version

Full PDFs from Puppeteer are 10-15MB (2x device scale). For email/sharing, compress with Ghostscript:

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 \
  -dPDFSETTINGS=/ebook \
  -dColorImageResolution=200 -dGrayImageResolution=200 \
  -dDownsampleColorImages=true -dDownsampleGrayImages=true \
  -dColorImageDownsampleType=/Bicubic -dGrayImageDownsampleType=/Bicubic \
  -dNOPAUSE -dBATCH -dQUIET \
  -sOutputFile="DeckName-Shareable.pdf" full-deck.pdf
```

This reduces 14MB → ~600KB while preserving photo/logo quality at 200dpi. Name the compressed version descriptively (e.g., `AgentNativeProgram-NERA.pdf`).

### 3.4 Rendering Notes

- Puppeteer uses `emulateMediaType('screen')` to preserve CSS gradients
- 1920x1080 viewport at 2x device scale
- Google Fonts, SVG, gradients, backdrop filters all render correctly
- Avoid: `feTurbulence` noise filters, complex CSS filters on large areas, animations

---

## Validation Checklist

Run after every slide, before PDF export. These are the production-tested checks that catch the issues that required 3-4 revision rounds to fix manually.

### Consistency (same on every slide)
- [ ] Title is 48px Cormorant weight 300, padding `20px 56px 0`
- [ ] Subtitle is 22px Outfit weight 400
- [ ] Header padding is `48px 56px 0` with logo-cluster left, slide-label right
- [ ] Footer padding is `16px 56px 48px` with context left, URL right
- [ ] Content horizontal padding is 56px (never 96px, 80px, etc.)

### Typography (the #1 revision issue)
- [ ] Body text >= 24px (not 18-20px — that's fine print at 1920x1080)
- [ ] Labels >= 14px
- [ ] Column/card labels >= 28px
- [ ] No rem/em — all px
- [ ] CTA/closing sections use ONE font family, not a mix of Garamond italic + Outfit regular + Garamond italic again

### Space utilization (the #2 revision issue)
- [ ] Content fills vertically — bottom 30% has content, not empty cream
- [ ] Content area uses `flex: 1` + `justify-content: space-between`
- [ ] SVG diagrams are >= 450px tall (not 340px thumbnails)
- [ ] No formulaic bottom sections ("Ships first:", quotes-on-every-slide)

### Visual weight (the #3 revision issue)
- [ ] Boxes used only when structurally necessary (tier cards, tool cards) — not wrapping every text block
- [ ] List items have icon circles or numbered badges, not plain dots or bare text
- [ ] At least one slide has an SVG diagram or visual element beyond text
- [ ] Vertical gold dividers between columns instead of bordered cards where possible

### Technical
- [ ] Within 1920x1080 — nothing overflows
- [ ] Card fills distinct from background (opacity >= 0.05)
- [ ] Borders are 1.5px (not 1px — disappears on light backgrounds)
- [ ] No red/green — only gold intensity levels
- [ ] SVG connectors end at box boundaries, not inside boxes
- [ ] Photos use `clip-path: circle(50%)`, not `border-radius` + `overflow: hidden`
- [ ] Palette: bg `#f5f3ee`, gold `#5c4a12`, text-primary `#0a1929`
- [ ] No eyebrow labels or em dashes
- [ ] Real SVG logos for named tools (Notion, Slack, etc.) — not hand-drawn approximations

---

## Reference Examples

Before building any slide, read the closest archetype from `examples/`. Copy its structure, then customize for your content and audience.

| Example | Type | Demonstrates |
|---------|------|-------------|
| `slide_01_cover.html` | Cover | Hero title, badge, ambient gradients |
| `slide_02_content.html` | Skills showcase | Two-column narrative + visual |
| `slide_03_data.html` | Metrics grid | Hero numbers, insight strip |
| `slide_04_pipeline.html` | Pipeline | Horizontal stages with connectors |
| `slide_05_recommendations.html` | Investment/CTA | Items list + price card |
| `slide_06_timeline.html` | Timeline | Alternating above/below cards on horizontal axis |
| `slide_07_feature_grid.html` | Feature grid | 2×2 icon grid + philosophy tagline bar |
| `slide_08_team.html` | Team | Circular photo crops + bios, center divider |
| `slide_09_proof.html` | Proof (asymmetric) | 38/62 split, panel headings, horizontal rules |
| `slide_10_constellation.html` | Constellation | SVG hub + nodes + dashed connectors |

Each example is anonymized and uses placeholder content. The layout patterns, CSS structure, and spacing are what matter — not the specific text.

---

## Full Workflow Summary

```
1. NARRATIVE (Phase 1)
   └─ Write governing thought
   └─ Build dot-dash outline (headlines + evidence)
   └─ Run headline test (read headlines only — does the story hold?)
   └─ Assign slide types from §1.5

2. BUILD (Phase 2)
   └─ Apply Consistency Canon (§2.0) — header/title/subtitle/footer identical on every slide
   └─ Copy closest example archetype per slide
   └─ Copy assets/ into your deck directory
   └─ Customize content (layout patterns from §2.5, rules from §2.6)
   └─ Run validation checklist per slide

3. EXPORT (Phase 3)
   └─ Generate combined PDF via Puppeteer
   └─ Compress with Ghostscript for sharing (~95% size reduction)
   └─ Verify: fonts, gradients, space utilization, readability
```
