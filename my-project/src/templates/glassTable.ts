/*
<ai_context>
Glassmorphism table generator for 'glassmorphism-table'.
Frosted glass container with soft shadows and gradient header.
</ai_context>
*/
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateGlassTableHTML = (data: ParsedTableData, scheme: string): string => {
  const [primary, secondary, accent] = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Glass Table</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: linear-gradient(120deg, ${primary} 0%, ${secondary} 50%, ${accent} 100%);
    min-height: 100vh; padding: 2rem 1rem;
  }
  .wrap {
    max-width: 1100px; margin: 0 auto;
    background: linear-gradient(180deg, #ffffffcc, #ffffffaa);
    backdrop-filter: blur(16px);
    border: 1px solid #ffffff80;
    border-radius: 24px;
    box-shadow: 0 20px 60px #00000033, inset 0 1px 0 #ffffffaa;
    overflow: hidden;
  }
  .hdr {
    padding: 2rem; text-align: center; color: #0f172a;
    background: linear-gradient(90deg, #ffffffcc, #ffffffaa);
    border-bottom: 1px solid #e2e8f0aa;
  }
  .hdr h1 { font-size: 2rem; font-weight: 800; }
  .table {
    width: 100%; border-collapse: separate; border-spacing: 0; color: #0f172a;
  }
  thead th {
    text-align: left; padding: 1rem; font-size: .9rem; letter-spacing: .04em;
    background: linear-gradient(90deg, ${primary}1a, ${secondary}1a);
    color: #0f172a; font-weight: 700; text-transform: uppercase;
  }
  tbody td {
    padding: 1rem; background: #ffffffee; border-bottom: 1px solid #e2e8f0aa;
  }
  tbody tr:hover td { background: #f8fafcdd; }
  tbody tr:last-child td { border-bottom: 0; }
  @media (max-width: 768px) {
    .hdr { padding: 1.25rem; }
    thead th, tbody td { padding: .75rem; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>✨ Glass Overview</h1>
      <p style="opacity:.7;margin-top:.25rem;">Clean, modern, readable</p>
    </div>
    <div style="overflow-x:auto;padding:1rem">
      <table class="table">
        <thead>
          <tr>
            ${data.headers.map((h) => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
};
