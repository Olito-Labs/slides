# /slides

A Claude Code skill that turns plain-language prompts into consultant-grade HTML slide decks with one-command PDF export.

Three phases separate the thinking from the formatting:

1. **Narrative** — Builds a Minto Pyramid, writes dot-dash outlines with assertion headlines, validates MECE structure
2. **Slides** — Generates 1920×1080 self-contained HTML files with a warm light-mode design system (Cormorant Garamond + Outfit, gold accents)
3. **PDF** — Puppeteer renders at 2× retina scale, merges into a combined deck via pdf-lib

## Install

Copy this repo into your Claude Code skills directory:

```bash
git clone https://github.com/Olito-Labs/slides.git ~/.claude/skills/slides
```

Then install the PDF export dependencies:

```bash
cd ~/.claude/skills/slides/scripts && npm install
```

## Use

In Claude Code, describe the deck you need. The skill triggers on "slides," "pitch deck," "ghost deck," "dot-dash," or "presentation deck."

```
"Build a 4-slide deck making the case to the board
for a $500K AI infrastructure investment."
```

The AI builds a ghost deck (dot-dash outline with assertion headlines) first. You review, reshape, and approve. Then it generates the slides and exports to PDF.

## What's inside

```
slides/
├── SKILL.md              # Full skill definition (methodology + design rules)
├── assets/logo.png       # Default logo (replace with your own)
├── examples/             # 5 reference slide archetypes
│   ├── slide_01_cover.html
│   ├── slide_02_content.html
│   ├── slide_03_data.html
│   ├── slide_04_pipeline.html
│   └── slide_05_recommendations.html
├── deck/                 # Overview deck about this skill
├── references/           # Troubleshooting guide
└── scripts/
    └── generate-pdf.js   # PDF export (Puppeteer + pdf-lib)
```

## PDF Export

```bash
node scripts/generate-pdf.js --input <dir-or-file> --output deck.pdf
```

Options:
- `--order file1.html,file2.html` — specify slide order
- `--individual` — generate separate PDFs per slide
- `--width` / `--height` — custom dimensions

## Design System

| Element | Value |
|---------|-------|
| Background | `#f5f3ee` (warm cream) |
| Accent | `#5c4a12` (dark gold, 8:1 contrast) |
| Display font | Cormorant Garamond 300–600 |
| Body font | Outfit 300–700 |
| Dimensions | 1920×1080px |
| Borders | 1.5px minimum |
| Corner frames | L-shaped brackets, top-left + bottom-right |

## Methodology

The skill encodes McKinsey/BCG slide methodology:

- **Governing thought** — one sentence that captures the deck's entire argument
- **Dot-dash outlines** — assertion headlines (claims, not labels) with supporting evidence
- **MECE validation** — no overlaps, no gaps at every level
- **Headline test** — read all headlines in sequence as a paragraph; if the story holds, proceed
- **"So what?" test** — every headline connects to the governing thought or gets cut

21 design rules and 9 anti-patterns are codified in `SKILL.md`.

## License

MIT — Olito Labs Inc.
