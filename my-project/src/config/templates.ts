/*
<ai_context>
Central registry of template metadata for the UI.
Includes id, name, desc, and icon. IDs must match the router in utils/templateGenerator.
</ai_context>
*/
import { Zap, Sparkles, Trophy, Monitor, Layout, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TemplateId =
  | 'mobile-cards'
  | 'executive-table'
  | 'comparison-grid'
  | 'neon-cards'
  | 'glassmorphism-table'
  | 'executive-premium'
  | 'dark-mode-cards'
  | 'gradient-grid';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  desc: string;
  icon: LucideIcon;
}

export const TEMPLATES_META: TemplateMeta[] = [
  { id: 'neon-cards', name: 'Neon Cards', icon: Zap, desc: 'Cyberpunk aesthetic that slaps' },
  { id: 'glassmorphism-table', name: 'Glass Table', icon: Sparkles, desc: 'Modern glass effect vibes' },
  { id: 'executive-premium', name: 'Executive Premium', icon: Trophy, desc: 'C-suite level presentation' },
  { id: 'dark-mode-cards', name: 'Dark Cards', icon: Monitor, desc: 'Night mode perfection' },
  { id: 'gradient-grid', name: 'Gradient Grid', icon: Layout, desc: 'Instagram-worthy layouts' },
  { id: 'mobile-cards', name: 'Mobile Cards', icon: Smartphone, desc: 'Card layout for small screens' },
  { id: 'executive-table', name: 'Executive Table', icon: Trophy, desc: 'Boardroom-ready table' },
  { id: 'comparison-grid', name: 'Comparison Grid', icon: Layout, desc: 'Side-by-side option cards' },
];
