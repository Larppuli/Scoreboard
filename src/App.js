import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; // Correct imports
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import AchievementPage from './views/AchievementsPage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/achievements" element={<AchievementPage />} />
      </Routes>
    </Router>
  );
};

export default App;
