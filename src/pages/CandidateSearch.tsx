import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { useSavedCandidates } from '../context/SavedCandidatesContext';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { saveCandidate } = useSavedCandidates();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        if (Array.isArray(data)) {
          setCandidates(data);
        } else {
          throw new Error('Unexpected response format from GitHub API.');
        }
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to load candidates. Please check your API token or network.');
      }
    };
    fetchCandidates();
  }, []);

  const nextCandidate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      saveCandidate(candidates[currentIndex]);
    }
    nextCandidate();
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (currentIndex >= candidates.length) {
    return <h2 className="no-candidates">No more candidates available! 🎉</h2>;
  }

  const candidate = candidates[currentIndex];

  return (
    <section className="search-container">
      <h1>Candidate Search</h1>
      <div className="candidate-box">
        <img className="candidate-avatar" src={candidate.avatar_url} alt={candidate.login} />
        <h2>{candidate.name || 'No Name Available'}</h2>
        <p><strong>Username:</strong> {candidate.login}</p>
        <p><strong>Location:</strong> {candidate.location || 'Not Provided'}</p>
        <p><strong>Email:</strong> {candidate.email || 'Not Provided'}</p>
        <p><strong>Company:</strong> {candidate.company || 'Not Provided'}</p>
        <p><strong>GitHub:</strong> <a href={candidate.html_url} target="_blank">Profile</a></p>
      </div>
      <div className="button-group">
        <button className="save-btn" onClick={handleSaveCandidate}>➕ Save</button>
        <button className="skip-btn" onClick={nextCandidate}>➖ Skip</button>
      </div>
    </section>
  );
};

export default CandidateSearch;
