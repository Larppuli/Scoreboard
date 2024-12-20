import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import AchievementPage from './views/AchievementsPage';
import NewGamePage from './views/NewGamePage';
import GamesPage from './views/GamesPage';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedWinner, setSelectedWinner] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleDateChange = (newDate) => setSelectedDate(newDate);
  const handleParticipantsChange = (event) => setSelectedParticipants(event);
  const handleSportChange = (event) => setSelectedSport(event);
  const handleWinnerChange = (event) => setSelectedWinner(event);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/games`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const games = jsonData.map((row) => ({
          id: row.id,
          date: formatDate(row.date),
          winner: row.winner,
          participants: row.participants,
          sport: row.sport,
        }));
        setData(games);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/achievements" element={<AchievementPage data={data} />} />
        <Route
          path="/new-game"
          element={
            <NewGamePage
              selectedParticipants={selectedParticipants}
              selectedSport={selectedSport}
              selectedWinner={selectedWinner}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setSelectedParticipants={setSelectedParticipants}
              setSelectedSport={setSelectedSport}
              setSelectedWinner={setSelectedWinner}
              handleDateChange={handleDateChange}
              handleParticipantsChange={handleParticipantsChange}
              handleSportChange={handleSportChange}
              handleWinnerChange={handleWinnerChange}
            />
          }
        />
        <Route
          path="/games"
          element={
            <GamesPage
              data={data}
              selectedDate={selectedDate}
              selectedParticipants={selectedParticipants}
              selectedSport={selectedSport}
              selectedWinner={selectedWinner}
              setSelectedDate={setSelectedDate}
              setSelectedParticipants={setSelectedParticipants}
              setSelectedSport={setSelectedSport}
              setSelectedWinner={setSelectedWinner}
              handleDateChange={handleDateChange}
              handleParticipantsChange={handleParticipantsChange}
              handleSportChange={handleSportChange}
              handleWinnerChange={handleWinnerChange}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;