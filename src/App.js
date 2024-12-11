import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; // Correct imports
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import AchievementPage from './views/AchievementsPage';


const App = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(apiUrl);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const games = result.data.map(row => ({
              date: row['Pelipäivä'],
              winner: row['Voittaja'],
              participants: row['Osallistujat'],
              sport: row['Laji'], 
            }));
            setData(games);
          },
        });
      };

      fetchData();
    }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/achievements" element={<AchievementPage data={data} />} />
      </Routes>
    </Router>
  );
};

export default App;
