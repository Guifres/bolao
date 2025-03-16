import { useEffect, useState } from "react";
import axios from "axios";

function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function fetchRanking() {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/ranking`);
      setRanking(response.data);
    }
    fetchRanking();
  }, []);

  return (
    <div>
      <h2>Ranking dos Apostadores</h2>
      <ul>
        {ranking.map((user, index) => (
          <li key={index}>
            {user.name} - {user.points} pontos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
