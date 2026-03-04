import { useState } from 'react';
import { DAOComposer } from './components/DAOComposer';
import { ThemeToggle } from './components/ThemeToggle';
import type { DAOConfig } from '@dao-os/core';

export function App() {
  const [daoConfig, setDaoConfig] = useState<DAOConfig>({
    identity: {
      name: 'New DAO',
      description: 'A new DAO created with DAO OS',
      daoURI: '',
    },
    modules: [],
    theme: 'functional',
  });

  return (
    <div className="app" data-theme={daoConfig.theme || 'functional'}>
      <header className="app-header">
        <div className="header-left">
          <h1>DAO OS Composer</h1>
          <div className="dao-name">{daoConfig.identity.name}</div>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <button className="btn-export">Export Blueprint</button>
        </div>
      </header>

      <main className="app-main">
        <DAOComposer config={daoConfig} onChange={setDaoConfig} />
      </main>
    </div>
  );
}
