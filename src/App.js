import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import AchievementPage from './views/AchievementsPage';
import NewGamePage from './views/NewGamePage';
import GamesPage from './views/GamesPage';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedWinner, setSelectedWinner] = useState("");
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);

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
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));

        if (dateA.getTime() === dateB.getTime()) {
          return a.id - b.id;
        }

        return dateA - dateB;
      });
      return games;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const { data, error } = useQuery({
    queryKey: ['games'],
    queryFn: fetchData,
  }, queryClient);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashScreenVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (splashScreenVisible) {
    if (window.innerWidth <= 768) {
      return (
        <img 
          src='/images/Splash_screen.png' 
          alt='Loading' 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 9999,
          }} 
        />
      );
    } else {
      return (
        <></>
      );
    }
  }

  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <QueryClientProvider client={queryClient}>
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
                queryClient={queryClient}
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
    </QueryClientProvider>
  );
};

export default App;
