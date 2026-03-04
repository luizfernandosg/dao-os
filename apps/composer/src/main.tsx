import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

function showError(root: HTMLElement, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : '';
  root.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui; max-width: 600px;">
      <h2 style="color: #c00;">Failed to load DAO OS Composer</h2>
      <pre style="background: #f5f5f5; padding: 1rem; overflow: auto; font-size: 12px;">${msg}</pre>
      ${stack ? `<pre style="background: #f0f0f0; padding: 1rem; overflow: auto; font-size: 11px; margin-top: 0.5rem;">${stack}</pre>` : ''}
      <p style="margin-top: 1rem; color: #666;">Check the browser console (F12) for more details.</p>
    </div>
  `;
  console.error('DAO OS Composer failed:', err);
}

async function mountApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const loadTimeout = setTimeout(() => {
    if (root.querySelector('.loading-placeholder')) {
      root.innerHTML = `
        <div style="padding: 2rem; font-family: system-ui;">
          <h2 style="color: #c00;">Load timeout</h2>
          <p>App failed to load within 10 seconds. Check the browser console (F12) for errors.</p>
        </div>
      `;
    }
  }, 10000);

  try {
    const { App } = await import('./App');
    clearTimeout(loadTimeout);
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    clearTimeout(loadTimeout);
    showError(root, err);
  }
}

mountApp();
