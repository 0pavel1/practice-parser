import React from 'react';
import Analytics from './analytics';
import FetchVacancies from './fetchVacancies';

function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Платформа парсинга данных о вакансиях</h1>
        <FetchVacancies />
        <Analytics />
      </div>
    </div>
  );
}

export default App;
