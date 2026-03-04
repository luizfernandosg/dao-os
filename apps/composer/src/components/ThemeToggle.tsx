import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'functional' | 'daocore'>('functional');

  useEffect(() => {
    const savedTheme = localStorage.getItem('dao-os-theme');
    if (savedTheme === 'functional' || savedTheme === 'daocore') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'functional' ? 'daocore' : 'functional';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dao-os-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'functional' ? '→ DAOcore' : '→ Functional'}
    </button>
  );
}
