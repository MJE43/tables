/*
<ai_context>
Isolated iframe preview. Accepts srcDoc and title.
Keeps the container clean and focused.
</ai_context>
*/
import React, { useRef, useEffect } from 'react';

interface Props {
  srcDoc: string;
  title?: string;
}

const PreviewFrame: React.FC<Props> = ({ srcDoc, title = 'Preview' }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Nothing special needed; srcDoc is enough. This keeps it simple and safe.
  }, [srcDoc]);

  return <iframe ref={ref} srcDoc={srcDoc} className="w-full h-96" title={title} />;
};

export default PreviewFrame;
