import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        if (Array.isArray(data)) {
          setCandidates(data);
        } else {
          throw new Error('Unexpected response format from the GitHub API.');
        }
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates. Please check your API token or network.');
      }
    };
    fetchCandidates();
  }, []);
  
  

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>Search Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.login} width="50" />
              </td>
              <td>{candidate.login}</td>
              <td>
                <button>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CandidateSearch;
