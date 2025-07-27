// src/utils/markdownParser.ts

export interface ParsedTableData {
  headers: string[];
  rows: string[][];
}

export const parseMarkdownTable = (markdown: string): ParsedTableData | null => {
  // Strip any leading/trailing whitespace and split into lines
  const lines = markdown
    .trim()
    .split('\n')
    .filter((line) => line.trim());

  // Need at least header + separator + one data row
  if (lines.length < 3) return null;

  // Parse headers - split by | and clean up
  const headers = lines[0]
    .split('|')
    .map((h) => h.trim())
    .filter((h) => h); // Remove empty strings

  // Validate separator line exists and contains dashes
  const separatorLine = lines[1];
  if (!separatorLine.includes('---')) return null;

  // Parse data rows - skip header and separator lines
  const rows = lines
    .slice(2)
    .map(
      (line) =>
        line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell !== ''), // Remove empty cells from pipe splits
    )
    .filter((row) => row.length > 0); // Remove completely empty rows

  // Basic validation - make sure we have data
  if (headers.length === 0 || rows.length === 0) return null;

  // Normalize row lengths to match headers (pad with empty strings if needed)
  const normalizedRows = rows.map((row) => {
    while (row.length < headers.length) {
      row.push('');
    }
    return row.slice(0, headers.length); // Trim if too long
  });

  return {
    headers,
    rows: normalizedRows,
  };
};
