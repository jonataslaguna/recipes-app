import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ProviderRecipes from './context/ProviderRecipes';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <ProviderRecipes>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProviderRecipes>,
  );
