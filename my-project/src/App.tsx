
import TableBeautifier from './components/TableBeautifier';
import { Toaster } from 'sonner';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <h1>Table Beautifier</h1>
          <p>Transform your tables into beautiful, production-ready designs.</p>
        </header>
        <main>
          <TableBeautifier />
        </main>
        <footer className="app-footer">
          <span>© {new Date().getFullYear()} Table Beautifier. All rights reserved.</span>
        </footer>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;

// Local ErrorBoundary import kept at bottom to avoid reordering noise
import ErrorBoundary from './components/ErrorBoundary';
