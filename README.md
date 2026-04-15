# AppSec Curriculum — Angular App

A full Angular 17 SPA wrapping all 20 [AppSec lesson](https://vinayreddyj.github.io/appsec-lessons) HTML files with a
polished navigation shell, progress tracking, search, and prev/next routing.

---

## Project structure

```
appsec-curriculum/
├── src/
│   ├── index.html                          Root HTML
│   ├── main.ts                             Bootstrap entry
│   ├── styles.scss                         Global tokens + reset
│   └── app/
│       ├── app.component.*                 Shell layout (sidebar + router-outlet)
│       ├── app.config.ts                   provideRouter + provideAnimations
│       ├── app.routes.ts                   /lesson/:num routing
│       ├── lessons.ts                      Data model — all 20 lessons + modules
│       ├── components/
│       │   ├── sidebar/                    Search, collapsible modules, progress bar
│       │   └── lesson-viewer/              Topbar, iframe, skeleton loader, footer nav
│       ├── pipes/
│       │   ├── safe-url.pipe.ts            DomSanitizer wrapper for iframe src
│       │   └── lesson-done-count.pipe.ts   "3/5" badge in module headers
│       └── services/
│           └── progress.service.ts         localStorage-backed completion tracking
└── src/assets/lessons/                     ← Put your 20 HTML files here
```

---

## Quick start

### 1 — Prerequisites

```bash
node -v   # 18+ required
npm -v    # 9+ required
```

### 2 — Install

```bash
cd appsec-curriculum
npm install
```

### 3 — Copy lesson files

```bash
mkdir -p src/assets/lessons
cp /path/to/appsec_lesson*.html src/assets/lessons/
```

The app expects these exact filenames (as defined in `src/app/lessons.ts`):

```
appsec_lesson1_owasp.html
appsec_lesson2_secure_sdlc.html
appsec_lesson3_threat_modeling.html
appsec_lesson4_sast.html
appsec_lesson5_dast.html
appsec_lesson6_sca.html
appsec_lesson7_iast_rasp.html
appsec_lesson8_owasp_api_top10.html
appsec_lesson9_api_security_testing.html
appsec_lesson10_graphql_security.html
appsec_lesson11_devsecops_pipeline.html
appsec_lesson12_secrets_management.html
appsec_lesson13_container_security.html
appsec_lesson14_dependency_scanning.html
appsec_lesson15_sbom.html
appsec_lesson16_security_architecture.html
appsec_lesson17_supply_chain_security.html
appsec_lesson18_waf.html
appsec_lesson19_code_review.html
appsec_lesson20_rasp.html
```

### 4 — Run dev server

```bash
npm start
# → http://localhost:4200
```

### 5 — Build for production

```bash
npm run build:prod
# Output: dist/appsec-curriculum/
```

Serve the `dist/` folder with any static file server:

```bash
npx serve dist/appsec-curriculum/browser
```

---

## Features

| Feature | Detail |
|---|---|
| **Hash routing** | `/#/lesson/1` … `/#/lesson/20` — works without a server |
| **Progress tracking** | Completion stored in `localStorage` — persists across sessions |
| **Auto-advance** | Clicking "Next →" auto-marks current lesson complete |
| **Search** | Filters by title or tag (e.g. `jwt`, `owasp`, `14`) in real-time |
| **Collapsible modules** | Each of the 5 modules can be collapsed independently |
| **Skeleton loader** | Shimmer placeholder while iframe loads |
| **Lesson isolation** | Each lesson's CSS/JS is fully sandboxed in its own `<iframe>` |
| **Shell override** | The app injects CSS into the iframe to hide the lesson's own sidebar/topbar |
| **Mobile responsive** | Sidebar becomes a slide-over drawer on screens < 900 px |
| **Progress dots** | 20-dot strip in the topbar — clickable shortcuts to any lesson |

---

## Customisation

### Add/rename a lesson
Edit `src/app/lessons.ts` — each lesson entry has `num`, `title`, `file`,
`duration`, `level`, and `tags`.

### Change accent colour
All colour tokens are CSS variables in `src/styles.scss`. Change `--accent`
to any value and the entire UI updates.

### Disable hash routing
Remove `withHashLocation()` from `src/app/app.config.ts` and configure your
server to redirect all paths to `index.html`.
