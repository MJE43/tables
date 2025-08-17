
/*
<ai_context>
Dark mode cards generator for 'dark-mode-cards'.
Low-luminance background with subtle elevation and accent separators.
</ai_context>
*/
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateDarkCardsHTML = (data: ParsedTableData, scheme: string): string => {
  const [primary, secondary, accent] = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Dark Cards</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: #0b0f19; color: #e5e7eb; min-height: 100vh; padding: 2rem 1rem;
  }
  .wrap { max-width: 1100px; margin: 0 auto; }
  .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .card {
    background: #0f172a; border: 1px solid #1f2937; border-radius: 16px; padding: 1.25rem;
    box-shadow: 0 6px 20px #00000066; transition: transform .18s ease, border-color .18s ease;
  }
  .card:hover { transform: translateY(-3px); border-color: ${accent}66; }
  .title { font-weight: 800; font-size: 2rem; text-align: center; margin-bottom: 1rem; color: #f8fafc; }
  .h { font-weight: 700; font-size: 1.05rem; margin-bottom: .5rem; color: #f1f5f9; }
  .row { display: flex; justify-content: space-between; padding: .45rem 0; border-bottom: 1px solid #1f293766; }
  .row:last-child { border-bottom: 0; }
  .k { color: #9ca3af; font-weight: 600; }
  .v { color: #e5e7eb; font-weight: 700; }
  .accent { height: 3px; background: linear-gradient(90deg, ${primary}, ${secondary}, ${accent}); border-radius: 9999px; margin: 0 0 0.75rem 0; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="title">Night Mode Snapshot</div>
    <div class="grid">
      ${data.rows
        .map(
          (row) => `
        <div class="card">
          <div class="accent"></div>
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
