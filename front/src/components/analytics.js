import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url_serv } from "./const.js";

function Analytics() {
  const [analytics, setAnalytics] = useState({ vacancies: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const result = await axios.get(url_serv + '/analytics/');
      setAnalytics(result.data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Аналитика</h2>
        <p className="card-text">Количество вакансий: {analytics.vacancies}</p>
      </div>
    </div>
  );
}

export default Analytics;
