/*
<ai_context>
Gradient grid generator for 'gradient-grid'.
Responsive grid with gradient card borders and soft hover.
</ai_context>
*/
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateGradientGridHTML = (data: ParsedTableData, scheme: string): string => {
  const [primary, secondary, accent] = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Gradient Grid</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: linear-gradient(120deg, #0b1020, #111827);
    color: #e5e7eb;
    min-height: 100vh; padding: 2rem 1rem;
  }
  .wrap { max-width: 1100px; margin: 0 auto; }
  .title {
    text-align: center; margin-bottom: 1.25rem; font-weight: 800; font-size: 2rem;
    background: linear-gradient(90deg, ${primary}, ${accent});
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .card {
    position: relative; padding: 1.25rem; border-radius: 16px; background: #0f172a;
  }
  .card::before {
    content: ''; position: absolute; inset: 0; padding: 2px; border-radius: 18px;
    background: linear-gradient(135deg, ${primary}, ${secondary}, ${accent});
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }
  .h { font-weight: 800; font-size: 1.05rem; margin-bottom: .5rem; color: #f8fafc; }
  .row { display: flex; justify-content: space-between; padding: .45rem 0; border-bottom: 1px dashed #33415566; }
  .row:last-child { border-bottom: 0; }
  .k { color: #94a3b8; font-weight: 600; }
  .v { color: #e2e8f0; font-weight: 700; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="title">Gradient Grid Overview</div>
    <div class="grid">
      ${data.rows
        .map(
          (row) => `
        <div class="card">
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
