/*
<ai_context>
Hook that centralizes state and actions for TableBeautifier.
- Holds markdown input, selected template, color scheme, loading, error, and generated HTML.
- Implements parse → generate flow using utils.
- Provides copy and download helpers with shadcn toasts.
No external libraries added.
</ai_context>
*/
import { useState } from 'react';
import { toast } from 'sonner';
import { parseMarkdownTable } from '@/utils/markdownParser';
import { generateHTML } from '@/utils/templateGenerator';

const SAMPLE_DATA = `| Product | Revenue | Growth | Market Share |
|---------|---------|---------|--------------|
| iPhone | $365.8B | +15.6% | 23.4% |
| Services | $190.2B | +25.3% | 15.8% |
| MacBook | $120.4B | +8.2% | 12.1% |
| iPad | $95.6B | +12.9% | 18.7% |
| Apple Watch | $45.3B | +18.4% | 9.2% |`;

export default function useTableBeautifier() {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('neon-cards');
  const [colorScheme, setColorScheme] = useState<string>('cyberpunk');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleProcess = async (): Promise<void> => {
    if (!markdownInput.trim()) {
      setError('Please paste some markdown table data');
      return;
    }

    setIsProcessing(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const parsed = parseMarkdownTable(markdownInput);
    if (!parsed) {
      setError(
        'Invalid markdown table format. Check your table syntax - make sure you have proper | separators and a --- separator row.',
      );
      setIsProcessing(false);
      return;
    }

    const html = generateHTML(parsed, selectedTemplate, colorScheme);
    setGeneratedHTML(html);
    setIsProcessing(false);

    toast.success('🎉 Table generated successfully!', {
      description: 'Your beautiful table is ready to copy or download.',
    });
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('📋 Copied to clipboard!', {
        description: 'HTML code is ready to paste anywhere.',
      });
    } catch {
      toast.error('❌ Copy failed', {
        description: 'Please select and copy the HTML manually.',
      });
    }
  };

  const downloadHTML = (): void => {
    try {
      const blob = new Blob([generatedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTemplate}-table.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('⬇️ Download started!', {
        description: 'Your HTML file is being downloaded.',
      });
    } catch {
      toast.error('❌ Download failed', {
        description: 'Please try again or copy the HTML manually.',
      });
    }
  };

  const loadSampleData = (): void => {
    setMarkdownInput(SAMPLE_DATA);
    setError('');
  };

  return {
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
  };
}
