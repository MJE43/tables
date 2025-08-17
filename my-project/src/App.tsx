
import TableBeautifier from './components/TableBeautifier';
import { Toaster } from 'sonner';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full">
        <TableBeautifier />
      </div>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
