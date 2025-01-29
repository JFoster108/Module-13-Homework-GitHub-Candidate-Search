import { useSavedCandidates } from '../context/SavedCandidatesContext';

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useSavedCandidates();

  return (
    <section>
      <h1>Saved Candidates</h1>
      {savedCandidates.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.name || 'No Name'}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'Not Provided'}</td>
                <td>{candidate.email || 'Not Provided'}</td>
                <td>{candidate.company || 'Not Provided'}</td>
                <td><a href={candidate.html_url} target="_blank">GitHub</a></td>
                <td>
                  <button onClick={() => removeCandidate(candidate.id)}>❌ Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates yet! 🧐</p>
      )}
    </section>
  );
};

export default SavedCandidates;
