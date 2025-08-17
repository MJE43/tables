
/*
<ai_context>
Comparison grid generator extracted from the original templateGenerator file.
Responsive card grid for side-by-side comparisons with highlights.
</ai_context>
*/
// comparisonGrid.ts
// Template for comparison grid table layout (implementation coming soon)
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateComparisonGridHTML = (data: ParsedTableData, scheme: string): string => {
  const schemeColors = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparison Grid</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, ${schemeColors[0]} 0%, ${schemeColors[1]} 100%);
            min-height: 100vh;
            padding: 1rem;
            color: #1a1a1a;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: ${schemeColors[2]};
            color: white;
            padding: 2.5rem 2rem;
            text-align: center;
        }

        .header h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }

        .grid-container {
            padding: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .comparison-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            position: relative;
        }

        .comparison-card:hover {
            border-color: ${schemeColors[2]};
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateY(-4px);
        }

        .card-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid ${schemeColors[2]};
        }

        .feature-list { list-style: none; }

        .feature-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem;
        }

        .feature-item:last-child { border-bottom: none; }

        .feature-label { color: #64748b; font-weight: 500; }
        .feature-value { color: #1e293b; font-weight: 600; text-align: right; }

        .highlight-badge {
            position: absolute; top: -8px; right: 1rem;
            background: ${schemeColors[2]}; color: white; padding: 0.25rem 0.75rem;
            border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
        }

        @media (max-width: 768px) {
            .grid-container { grid-template-columns: 1fr; padding: 1rem; gap: 1rem; }
            .header { padding: 2rem 1rem; }
            .header h1 { font-size: 2rem; }
            .comparison-card { padding: 1.25rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ Side-by-Side Comparison</h1>
            <p>Compare options at a glance</p>
        </div>

        <div class="grid-container">
            ${data.rows
              .map(
                (row, index) => `
                <div class="comparison-card">
                    ${index === 0 ? '<div class="highlight-badge">Popular</div>' : ''}
                    <div class="card-title">${row[0]}</div>
                    <ul class="feature-list">
                        ${row
                          .slice(1)
                          .map(
                            (cell, cellIndex) => `
                            <li class="feature-item">
                                <span class="feature-label">${data.headers[cellIndex + 1]}</span>
                                <span class="feature-value">${cell}</span>
                            </li>
                        `,
                          )
                          .join('')}
                    </ul>
                </div>
            `,
              )
              .join('')}
        </div>
    </div>
</body>
</html>`;
};
