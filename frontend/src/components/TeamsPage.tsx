// src/pages/TeamsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/api/teams');
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch teams');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleDeleteTeam = async (id: number) => {
    try {
      await axios.delete(`/api/teams/${id}`);
      // Update teams list after deletion
      const updatedTeams = teams.filter((team: any) => team.id !== id);
      setTeams(updatedTeams);
    } catch (error) {
      setError('Failed to delete team');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Teams</h1>
      <ul>
        {teams.map((team: any) => (
          <li key={team.id}>
            {team.name} - {team.description}
            <button onClick={() => handleDeleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsPage;
