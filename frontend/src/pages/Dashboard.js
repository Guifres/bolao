import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
      setGames(response.data);
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Jogos Disponíveis</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.team1} vs {game.team2} - {game.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
