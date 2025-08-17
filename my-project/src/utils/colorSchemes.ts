/*
<ai_context>
Defines colorSchemes used by generators and UI.
Export shape preserved: { id, name, colors: string[] }.
This replaces prior stub while maintaining a simple, dependency-free structure.
</ai_context>
*/
// colorSchemes.ts
// Utility functions or constants for color schemes (implementation coming soon)

export interface ColorScheme {
  id: string;
  name: string;
  colors: string[]; // [primary, secondary, accent]
}

export const colorSchemes: ColorScheme[] = [
  { id: 'professional', name: 'Professional', colors: ['#667eea', '#764ba2', '#ff6b6b'] },
  { id: 'corporate', name: 'Corporate', colors: ['#2d3748', '#4a5568', '#3182ce'] },
  { id: 'friendly', name: 'Friendly', colors: ['#4ecdc4', '#45b7aa', '#ff9500'] },
  { id: 'minimal', name: 'Minimal', colors: ['#f7fafc', '#e2e8f0', '#4a5568'] },
  { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#0ea5e9', '#8b5cf6', '#d946ef'] },
  { id: 'aurora', name: 'Aurora', colors: ['#22d3ee', '#22c55e', '#a78bfa'] },
];

export const getSchemeColors = (schemeId: string): string[] => {
  return colorSchemes.find((s) => s.id === schemeId)?.colors || colorSchemes[0].colors;
};
