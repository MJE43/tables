/*
<ai_context>
Executive table generator extracted from the original templateGenerator file.
Produces a high-contrast, boardroom-style table with subtle interactions.
</ai_context>
*/
// executiveTable.ts
// Template for executive table layout (implementation coming soon)
import type { ParsedTableData } from '@/utils/markdownParser';
import { getSchemeColors } from '@/utils/colorSchemes';

export const generateExecutiveTableHTML = (data: ParsedTableData, scheme: string): string => {
  const schemeColors = getSchemeColors(scheme);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Data Presentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, ${schemeColors[0]} 0%, ${schemeColors[1]} 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
            color: #2d3748;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }

        .header h1 { font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; }
        .header p { font-size: 1.2rem; opacity: 0.9; }

        .table-container { padding: 2rem; overflow-x: auto; }

        .executive-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .executive-table thead th {
            background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
            color: white;
            padding: 1.5rem 1rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .executive-table tbody td {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
            background: white;
            transition: all 0.3s ease;
            font-size: 0.95rem;
        }

        .executive-table tbody tr:nth-child(even) td { background: rgba(247, 250, 252, 0.5); }

        .executive-table tbody tr:hover td {
            background: rgba(99, 102, 241, 0.05);
            transform: translateY(-2px);
        }

        .executive-table tbody tr:first-child td:first-child { border-top-left-radius: 16px; }
        .executive-table tbody tr:first-child td:last-child { border-top-right-radius: 16px; }

        @media (max-width: 768px) {
            body { padding: 1rem 0.5rem; }
            .header { padding: 2rem 1rem; }
            .header h1 { font-size: 2rem; }
            .table-container { padding: 1rem; }
            .executive-table thead th, .executive-table tbody td {
                padding: 1rem 0.75rem; font-size: 0.85rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📈 Executive Summary</h1>
            <p>Comprehensive Data Analysis</p>
        </div>

        <div class="table-container">
            <table class="executive-table">
                <thead>
                    <tr>
                        ${data.headers.map((header) => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.rows
                      .map(
                        (row) => `
                        <tr>
                            ${row.map((cell) => `<td>${cell}</td>`).join('')}
                        </tr>
                    `,
                      )
                      .join('')}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`;
};
