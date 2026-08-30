# IQ-Style Puzzle Test

Static 20-question puzzle experience deployed at <https://dopabrain.com/iq-test/>.

## Current contract

- Pattern, sequence, logic, spatial, and language questions with a 30-second timer.
- Category breakdown, result card sharing, PWA support, and 12 locales.
- The displayed 0–100 score is exactly the percentage of the 20 questions answered correctly; no speed bonus, IQ conversion, grade, or population percentile is used.
- Detailed notes explain the category bars and the score's limits. This is not a standardized or professionally administered IQ assessment.
- No AI-generated analysis, rewarded-ad unlock, registration, or payment gate.

## Structure

- `index.html`: page structure, metadata, and structured data.
- `js/app.js`: quiz flow, scoring, result rendering, and analytics events.
- `js/questions.js`: question bank and random selection helpers.
- `js/i18n.js`, `js/locales/`: locale loading and translations.
- `css/style.css`: responsive presentation.
- `manifest.json`, `sw.js`: install and offline support.

The app has no build step. Serve the repository root over HTTP for local checks; do not open `index.html` directly because locale files are fetched at runtime.
