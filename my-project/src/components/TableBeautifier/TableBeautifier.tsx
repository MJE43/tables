/*
<ai_context>
UI container for the Table Beautifier.
- Pure presentation; state and actions come from useTableBeautifier hook.
- Uses shadcn Button and toast hook as in the original file.
- Renders template options and color schemes via presentational components.
- Preserves previous styling and copy.
Dependencies: hooks/useTableBeautifier, config/templates, utils/colorSchemes, lucide-react, shadcn ui.
</ai_context>
*/
import React from 'react';
import { Eye, Wand2, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useTableBeautifier from '@/hooks/useTableBeautifier';
import { TEMPLATES_META } from '@/config/templates';
import { colorSchemes } from '@/utils/colorSchemes';
import TemplateCard from './TemplateCard';
import ColorSchemeSwatch from './ColorSchemeSwatch';
import PreviewFrame from './PreviewFrame';

const TableBeautifier: React.FC = () => {
  const {
    markdownInput,
    setMarkdownInput,
    selectedTemplate,
    setSelectedTemplate,
    colorScheme,
    setColorScheme,
    isProcessing,
    generatedHTML,
    error,
    handleProcess,
    copyToClipboard,
    downloadHTML,
    loadSampleData,
  } = useTableBeautifier();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 tracking-tight">
            <Wand2 className="inline-block mr-4 text-purple-400" size={60} />
            TableBeautify Pro
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Turn your boring-ass markdown tables into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">
              absolutely fire
            </span>{' '}
            presentations that'll make everyone stop scrolling
          </p>
          <div className="mt-4 text-purple-300">
            ✨ Now with 5 premium templates & 6 color schemes that actually slap
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">1. Paste Your Table</h2>
                <Button
                  onClick={() => {
                    loadSampleData();
                    toast.success('📊 Sample data loaded!', {
                      description: 'Try generating a table with this example data.',
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Try Sample
                </Button>
              </div>
              <textarea
                value={markdownInput}
                onChange={(e) => {
                  setMarkdownInput(e.target.value);
                }}
                placeholder="| Product | Revenue | Growth |
|---------|---------|---------|
| iPhone  | $365B   | +15%    |
| Services| $190B   | +25%    |
| MacBook | $120B   | +8%     |"
                className="w-full h-52 p-4 bg-gray-900/80 border-2 border-gray-600 rounded-xl font-mono text-sm resize-none focus:border-purple-500 focus:outline-none text-gray-100 placeholder-gray-500 transition-colors"
                inputMode="text"
              />
              {error && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                  <span className="font-semibold">Error:</span> {error}
                </div>
              )}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">2. Choose Your Vibe</h2>
              <div className="grid gap-4">
                {TEMPLATES_META.map((meta) => (
                  <TemplateCard
                    key={meta.id}
                    meta={meta}
                    selected={selectedTemplate === meta.id}
                    onClick={() => setSelectedTemplate(meta.id)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">3. Color That Hits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colorSchemes.map((scheme) => (
                  <ColorSchemeSwatch
                    key={scheme.id}
                    scheme={scheme}
                    selected={colorScheme === scheme.id}
                    onClick={() => setColorScheme(scheme.id)}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleProcess}
              disabled={!markdownInput.trim() || isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 px-8 rounded-2xl font-black text-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl h-auto"
              style={{ background: isProcessing ? 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)' : undefined }}
            >
              {isProcessing ? '⚡ Creating Absolute Fire...' : '🚀 Make It Absolutely Slap'}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Live Preview</h2>
                {generatedHTML && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => copyToClipboard(generatedHTML)}
                      variant="outline"
                      className="text-gray-300 border-gray-600 hover:bg-gray-600 hover:text-white"
                    >
                      Copy HTML
                    </Button>
                    <Button
                      onClick={downloadHTML}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-600 rounded-2xl overflow-hidden bg-gray-900">
                {generatedHTML ? (
                  <PreviewFrame srcDoc={generatedHTML} title="Preview" />
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Eye size={60} className="mx-auto mb-4 opacity-50" />
                      <p className="text-xl">Your fire table will drop here</p>
                      <p className="text-gray-500 mt-2">Ready to make jaws drop? 👆</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">🔥 What You're Getting</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Neon cyberpunk aesthetics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Glassmorphism effects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Dark mode perfection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Mobile-first responsive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Animated gradients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <span>Executive-level polish</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <p className="text-purple-200 font-medium">
                  💡 <span className="font-bold">Pro tip:</span> These templates are designed to make your data
                  presentations go absolutely viral. No cap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBeautifier;
