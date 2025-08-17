
/*
<ai_context>
Neon cards generator for 'neon-cards' template.
High-contrast dark background with neon borders and glow.
</ai_context>
*/
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateNeonCardsHTML = (data: ParsedTableData, scheme: string): string => {
  const [primary, secondary, accent] = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Neon Cards</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: radial-gradient(1200px 800px at 30% 20%, ${secondary}22, transparent),
                radial-gradient(1200px 800px at 70% 80%, ${accent}22, transparent),
                #0b1020;
    color: #e5e7eb;
    min-height: 100vh;
    padding: 2rem 1rem;
  }
  .wrap { max-width: 1100px; margin: 0 auto; }
  .title {
    text-align: center; margin-bottom: 1.5rem;
    font-weight: 800; font-size: 2.25rem;
    background: linear-gradient(90deg, ${primary}, ${accent});
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .grid {
    display: grid; gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .card {
    background: #0f172a;
    border: 1px solid ${primary}55;
    border-radius: 16px;
    padding: 1.25rem;
    box-shadow: 0 0 0.5rem ${primary}55, inset 0 0 0.5rem #00000040;
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 1rem ${accent}55, 0 8px 24px #00000080;
    border-color: ${accent}88;
  }
  .h {
    font-weight: 800; font-size: 1.1rem; margin-bottom: 0.75rem;
    color: #f8fafc;
    text-shadow: 0 0 8px ${accent}33;
  }
  .row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px dashed #33415566; }
  .row:last-child { border-bottom: 0; }
  .k { color: #94a3b8; font-weight: 600; }
  .v { color: #e2e8f0; font-weight: 700; }
  .badge {
    display:inline-block; margin: 0 0 .75rem 0; padding: .25rem .5rem; font-size: .7rem; font-weight:700;
    border:1px solid ${accent}88; color:${accent}; border-radius:8px; background:${accent}14; letter-spacing:.02em;
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="title">Neon Data Deck</div>
    <div class="grid">
      ${data.rows
        .map(
          (row) => `
        <div class="card">
          <div class="badge">FEATURE</div>
          <div class="h">${row[0]}</div>
          ${row
            .slice(1)
            .map(
              (cell, i) => `
            <div class="row">
              <div class="k">${data.headers[i + 1]}</div>
              <div class="v">${cell}</div>
            </div>`,
            )
            .join('')}
        </div>`,
        )
        .join('')}
    </div>
  </div>
</body>
</html>`;
};
