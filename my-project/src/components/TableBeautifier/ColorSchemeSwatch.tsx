/*
<ai_context>
Presentational component for a color scheme option.
Renders color dots and scheme name with selected styling.
Used by TableBeautifier container.
</ai_context>
*/
import React from 'react';

export interface ColorScheme {
  id: string;
  name: string;
  colors: string[];
}

interface Props {
  scheme: ColorScheme;
  selected: boolean;
  onClick: () => void;
}

const ColorSchemeSwatch: React.FC<Props> = ({ scheme, selected, onClick }) => {
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
        <div className="flex space-x-1">
          {scheme.colors.map((color, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-700" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="font-bold text-white">{scheme.name}</span>
      </div>
    </div>
  );
};

export default ColorSchemeSwatch;
