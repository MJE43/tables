
/*
<ai_context>
Mobile cards generator extracted from the original templateGenerator file.
Produces a responsive card-per-row layout.
</ai_context>
*/
// mobileCards.ts
// Template for mobile card table layout (implementation coming soon)
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateMobileCardsHTML = (data: ParsedTableData, scheme: string): string => {
  const schemeColors = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Presentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, ${schemeColors[0]} 0%, ${schemeColors[1]} 100%);
            min-height: 100vh;
            padding: 1rem 0.5rem;
            color: #1a1a1a;
            line-height: 1.5;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            overflow: hidden;
        }

        .header {
            background: ${schemeColors[2]};
            color: white;
            padding: 2rem 1rem;
            text-align: center;
        }

        .header h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
        .header p { opacity: 0.9; font-size: 1rem; }

        .cards-container { padding: 1rem 0.5rem; }

        .data-card {
            background: white;
            border: 2px solid #f0f0f0;
            border-radius: 12px;
            margin-bottom: 1rem;
            padding: 1.25rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            transition: all 0.2s ease;
        }

        .data-card:hover {
            border-color: ${schemeColors[2]};
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
        }

        .card-header {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f8f9fa;
        }

        .card-detail {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 0.5rem; font-size: 0.9rem;
        }

        .card-detail:last-child { margin-bottom: 0; }

        .detail-label { color: #666; font-weight: 500; flex: 1; }
        .detail-value { color: #1a1a1a; font-weight: 600; text-align: right; flex: 1; }

        @media (min-width: 768px) {
            .container { max-width: 600px; }
            .cards-container { padding: 1.5rem; }
            .data-card { padding: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Data Overview</h1>
            <p>Professional Data Presentation</p>
        </div>

        <div class="cards-container">
            ${data.rows
              .map(
                (row) => `
                <div class="data-card">
                    <div class="card-header">${row[0]}</div>
                    ${row
                      .slice(1)
                      .map(
                        (cell, cellIndex) => `
                        <div class="card-detail">
                            <span class="detail-label">${data.headers[cellIndex + 1]}</span>
                            <span class="detail-value">${cell}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            `,
              )
              .join('')}
        </div>
    </div>
</body>
</html>`;
};
