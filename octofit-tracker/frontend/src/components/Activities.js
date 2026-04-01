import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const loadData = () => {
    setLoading(true);
    setError(null);
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const results = data.results || data;
        setActivities(Array.isArray(results) ? results : [results]);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [apiUrl]);

  const keys = activities.length > 0 ? Object.keys(activities[0]) : [];

  return (
    <div className="container py-3">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Activities</h2>
          <div>
            <button className="btn btn-primary btn-sm me-2" onClick={loadData}>Reload</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(true)}>Info</button>
          </div>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}
          {!loading && (activities.length === 0 ? <p>No activities found.</p> : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    {keys.map(key => <th key={key}>{key}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {activities.map((row, index) => (
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
              <label htmlFor="activitySearch" className="form-label">Search Activities</label>
              <input id="activitySearch" className="form-control" placeholder="Value search is UI only" readOnly />
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activities endpoint info</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p>API: {apiUrl}</p>
                <p>Found {activities.length} records.</p>
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

export default Activities;