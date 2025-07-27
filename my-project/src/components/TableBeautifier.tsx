// src/components/TableBeautifier.tsx

import React, { useState, useRef } from 'react';
import { Copy, Download, Eye, Wand2, Smartphone, Monitor, Layout } from 'lucide-react';
import { parseMarkdownTable } from '../utils/markdownParser';
import { generateHTML, colorSchemes } from '../utils/templateGenerator';

interface Template {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
}

const templates: Template[] = [
  { id: 'mobile-cards', name: 'Mobile Cards', icon: Smartphone, desc: 'Perfect for phone viewing' },
  { id: 'executive-table', name: 'Executive Table', icon: Monitor, desc: 'Clean desktop presentation' },
  { id: 'comparison-grid', name: 'Comparison Grid', icon: Layout, desc: 'Side-by-side comparison' },
];

const TableBeautifier: React.FC = () => {
  // Core state
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('mobile-cards');
  const [colorScheme, setColorScheme] = useState<string>('professional');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedHTML, setGeneratedHTML] = useState<string>('');

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleProcess = async (): Promise<void> => {
    if (!markdownInput.trim()) return;

    setIsProcessing(true);

    // Simulate processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const parsed = parseMarkdownTable(markdownInput);
    if (!parsed) {
      alert('Invalid markdown table format. Please check your input.');
      setIsProcessing(false);
      return;
    }

    const html = generateHTML(parsed, selectedTemplate, colorScheme);
    setGeneratedHTML(html);
    setIsProcessing(false);
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const downloadHTML = (): void => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beautiful-table.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Wand2 className="inline-block mr-3 text-indigo-600" size={40} />
            TableBeautify
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ugly markdown tables into stunning, professional presentations that even your boss will love
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">1. Paste Your Markdown Table</h2>
              <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                placeholder="| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |"
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg font-mono text-sm resize-none focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">2. Choose Template</h2>
              <div className="grid gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <template.icon
                        size={24}
                        className={selectedTemplate === template.id ? 'text-indigo-600' : 'text-gray-400'}
                      />
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">3. Pick Color Scheme</h2>
              <div className="grid grid-cols-2 gap-3">
                {colorSchemes.map((scheme: { id: string; name: string; colors: string[] }) => (
                  <div
                    key={scheme.id}
                    onClick={() => setColorScheme(scheme.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      colorScheme === scheme.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {scheme.colors.map((color: string, i: number) => (
                          <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className="font-medium">{scheme.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleProcess}
              disabled={!markdownInput.trim() || isProcessing}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Creating Magic...' : '✨ Beautify My Table'}
            </button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Preview</h2>
                {generatedHTML && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(generatedHTML)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Copy size={16} />
                      <span>Copy HTML</span>
                    </button>
                    <button
                      onClick={downloadHTML}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                {generatedHTML ? (
                  <iframe ref={iframeRef} srcDoc={generatedHTML} className="w-full h-96" title="Preview" />
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Eye size={48} className="mx-auto mb-4" />
                      <p>Your beautiful table will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">🚀 What You Get</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Mobile-first responsive design</li>
                <li>✅ Professional color schemes</li>
                <li>✅ Copy-paste ready HTML</li>
                <li>✅ No technical skills required</li>
                <li>✅ Perfect for presentations</li>
                <li>✅ Boss-approval guaranteed*</li>
              </ul>
              <p className="text-xs text-gray-400 mt-2">*Results may vary depending on your boss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBeautifier;
