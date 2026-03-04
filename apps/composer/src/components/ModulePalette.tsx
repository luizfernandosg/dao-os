import { useState } from 'react';
import { useComposerStore } from '../store/composerStore';
import { moduleLibrary } from '../data/moduleLibrary';
import type { DAOModule } from '@dao-os/core';

export function ModulePalette() {
  const [activeCategory, setActiveCategory] = useState('treasury');
  const [searchQuery, setSearchQuery] = useState('');
  const { addModule } = useComposerStore();

  const categories = [
    { id: 'treasury', name: 'Treasury', icon: '🏦' },
    { id: 'governance', name: 'Governance', icon: '🗳️' },
    { id: 'funding', name: 'Funding', icon: '💰' },
    { id: 'identity', name: 'Identity', icon: '🆔' },
    { id: 'coordination', name: 'Coordination', icon: '🤝' },
    { id: 'dao2dao', name: 'DAO2DAO', icon: '🔗' },
  ];

  const filteredModules = moduleLibrary.filter(
    (module) =>
      module.category === activeCategory &&
      (searchQuery === '' ||
        module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleModuleClick = (module: DAOModule) => {
    addModule(module);
  };

  return (
    <aside className="module-palette">
      <div className="palette-header">
        <h2>Modules</h2>
        <input
          type="text"
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="module-list">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => handleModuleClick(module)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/dao-module', module.id);
              e.dataTransfer.effectAllowed = 'copy';
            }}
          >
            <div className="module-header">
              <div
                className="module-icon"
                style={{ backgroundColor: module.color }}
              >
                {module.icon}
              </div>
              <div className="module-info">
                <div className="module-name">{module.name}</div>
                <div className="module-provider">{module.provider}</div>
              </div>
            </div>
            <div className="module-description">{module.description}</div>
            <div className="module-tags">
              {module.standards.slice(0, 2).map((standard) => (
                <span key={standard} className="tag">
                  {standard}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="palette-footer">
        <button className="btn-templates">DAO Templates</button>
      </div>
    </aside>
  );
}
