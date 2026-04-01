import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  const loadData = () => {
    setLoading(true);
    setError(null);
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const results = data.results || data;
        setTeams(Array.isArray(results) ? results : [results]);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [apiUrl]);

  const keys = teams.length > 0 ? Object.keys(teams[0]) : [];

  return (
    <div className="container py-3">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Teams</h2>
          <div>
            <button className="btn btn-primary btn-sm me-2" onClick={loadData}>Reload</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(true)}>Info</button>
          </div>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}
          {!loading && (teams.length === 0 ? <p>No teams found.</p> : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    {keys.map(key => <th key={key}>{key}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {keys.map(key => <td key={`${index}-${key}`}>{JSON.stringify(row[key])}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <form className="mt-3">
            <div className="mb-3">
              <label htmlFor="teamName" className="form-label">Team lookup</label>
              <input id="teamName" className="form-control" placeholder="Example only" readOnly />
            </div>
            <button className="btn btn-success btn-sm" type="button">Add Team (UI demo)</button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Teams endpoint info</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p>API: {apiUrl}</p>
                <p>Found {teams.length} teams.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;