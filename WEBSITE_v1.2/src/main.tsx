import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {LanguageProvider, detectLang, applyDirection} from './i18n/LanguageContext.tsx';
import './index.css';

// Apply lang/dir/font synchronously before first paint so a saved Arabic (RTL)
// locale never flashes LTR on reload.
applyDirection(detectLang());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
