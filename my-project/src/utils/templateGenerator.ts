/*
<ai_context>
Router that maps template IDs to concrete HTML generator functions.
- Imports colorSchemes from utils/colorSchemes and re-exports it for backward compatibility.
- Moves individual generators into src/templates/* modules.
- Keeps the original function names for legacy IDs.
</ai_context>
*/
// src/utils/templateGenerator.ts

import type { ParsedTableData } from './markdownParser';
import { getSchemeColors, colorSchemes } from './colorSchemes';
import {
  generateMobileCardsHTML,
  generateExecutiveTableHTML,
  generateComparisonGridHTML,
  generateNeonCardsHTML,
  generateGlassTableHTML,
  generateDarkCardsHTML,
  generateGradientGridHTML,
} from '@/templates';

// Back-compat: some code may import { colorSchemes } from './templateGenerator'
export { colorSchemes };

export const generateHTML = (data: ParsedTableData, template: string, scheme: string): string => {
  switch (template) {
    case 'mobile-cards':
      return generateMobileCardsHTML(data, scheme);
    case 'executive-table':
    case 'executive-premium':
      return generateExecutiveTableHTML(data, scheme);
    case 'comparison-grid':
      return generateComparisonGridHTML(data, scheme);
    case 'neon-cards':
      return generateNeonCardsHTML(data, scheme);
    case 'glassmorphism-table':
      return generateGlassTableHTML(data, scheme);
    case 'dark-mode-cards':
      return generateDarkCardsHTML(data, scheme);
    case 'gradient-grid':
      return generateGradientGridHTML(data, scheme);
    default:
      return generateMobileCardsHTML(data, scheme);
  }
};

// Optional utility if a generator wants direct access
export const resolveScheme = (schemeId: string): string[] => getSchemeColors(schemeId);
