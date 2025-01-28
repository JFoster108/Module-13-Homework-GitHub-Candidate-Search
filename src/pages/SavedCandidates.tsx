import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [saved, setSaved] = useState<Candidate[]>([]);

  const removeCandidate = (id: number) => {
    setSaved(saved.filter((candidate) => candidate.id !== id));
  };

  return (
    <section>
      <h1>Saved Candidates</h1>
      {saved.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {saved.map((candidate) => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.login}</td>
                <td>
                  <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates yet!</p>
      )}
    </section>
  );
};

export default SavedCandidates;
