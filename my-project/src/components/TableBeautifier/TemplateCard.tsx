/*
<ai_context>
Presentational component for a template option.
Renders icon, name, description, and selected styling.
Used by TableBeautifier container.
</ai_context>
*/
import React from 'react';
import type { TemplateMeta } from '@/config/templates';
export type { TemplateMeta } from '@/config/templates';

interface Props {
  meta: TemplateMeta;
  selected: boolean;
  onClick: () => void;
}

const TemplateCard: React.FC<Props> = ({ meta, selected, onClick }) => {
  const Icon = meta.icon;
  return (
    <div
      onClick={onClick}
      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
        selected
          ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/25'
          : 'border-gray-600 hover:border-purple-400 bg-gray-900/40'
      }`}
    >
      <div className="flex items-center space-x-4">
        <Icon size={28} className={selected ? 'text-purple-400' : 'text-gray-400'} />
        <div>
          <div className="font-bold text-white text-lg">{meta.name}</div>
          <div className="text-gray-400">{meta.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
