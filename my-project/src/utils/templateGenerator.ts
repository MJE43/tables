// src/utils/templateGenerator.ts

import type { ParsedTableData } from './markdownParser';

interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
}

export const colorSchemes: ColorScheme[] = [
  { id: 'professional', name: 'Professional', colors: ['#667eea', '#764ba2', '#ff6b6b'] },
  { id: 'corporate', name: 'Corporate', colors: ['#2d3748', '#4a5568', '#3182ce'] },
  { id: 'friendly', name: 'Friendly', colors: ['#4ecdc4', '#45b7aa', '#ff9500'] },
  { id: 'minimal', name: 'Minimal', colors: ['#f7fafc', '#e2e8f0', '#4a5568'] },
];

const getSchemeColors = (schemeId: string): string[] => {
  return colorSchemes.find((s) => s.id === schemeId)?.colors || colorSchemes[0].colors;
};

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

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

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

        .header h1 {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .header p {
            opacity: 0.9;
            font-size: 1rem;
        }

        .cards-container {
            padding: 1rem 0.5rem;
        }

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
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .card-detail:last-child {
            margin-bottom: 0;
        }

        .detail-label {
            color: #666;
            font-weight: 500;
            flex: 1;
        }

        .detail-value {
            color: #1a1a1a;
            font-weight: 600;
            text-align: right;
            flex: 1;
        }

        @media (min-width: 768px) {
            .container {
                max-width: 600px;
            }
            .cards-container {
                padding: 1.5rem;
            }
            .data-card {
                padding: 1.5rem;
            }
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

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

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

        .header h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .table-container {
            padding: 2rem;
            overflow-x: auto;
        }

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

        .executive-table tbody tr:nth-child(even) td {
            background: rgba(247, 250, 252, 0.5);
        }

        .executive-table tbody tr:hover td {
            background: rgba(99, 102, 241, 0.05);
            transform: translateY(-2px);
        }

        .executive-table tbody tr:first-child td:first-child {
            border-top-left-radius: 16px;
        }

        .executive-table tbody tr:first-child td:last-child {
            border-top-right-radius: 16px;
        }

        @media (max-width: 768px) {
            body {
                padding: 1rem 0.5rem;
            }
            .header {
                padding: 2rem 1rem;
            }
            .header h1 {
                font-size: 2rem;
            }
            .table-container {
                padding: 1rem;
            }
            .executive-table thead th,
            .executive-table tbody td {
                padding: 1rem 0.75rem;
                font-size: 0.85rem;
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

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

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

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

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

        .feature-list {
            list-style: none;
        }

        .feature-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 0.95rem;
        }

        .feature-item:last-child {
            border-bottom: none;
        }

        .feature-label {
            color: #64748b;
            font-weight: 500;
        }

        .feature-value {
            color: #1e293b;
            font-weight: 600;
            text-align: right;
        }

        .highlight-badge {
            position: absolute;
            top: -8px;
            right: 1rem;
            background: ${schemeColors[2]};
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: 1fr;
                padding: 1rem;
                gap: 1rem;
            }
            .header {
                padding: 2rem 1rem;
            }
            .header h1 {
                font-size: 2rem;
            }
            .comparison-card {
                padding: 1.25rem;
            }
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

export const generateHTML = (data: ParsedTableData, template: string, scheme: string): string => {
  switch (template) {
    case 'mobile-cards':
      return generateMobileCardsHTML(data, scheme);
    case 'executive-table':
      return generateExecutiveTableHTML(data, scheme);
    case 'comparison-grid':
      return generateComparisonGridHTML(data, scheme);
    default:
      return generateMobileCardsHTML(data, scheme);
  }
};
