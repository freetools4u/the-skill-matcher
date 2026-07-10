import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from 'https://freetools4u.github.io/the-skill-matcher/App.tsx';
import 'https://freetools4u.github.io/the-skill-matcher/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
