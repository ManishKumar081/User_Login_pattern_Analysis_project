import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IndentVerification() {
  const [indents, setIndents] = useState([]);
  const [selectedIndent, setSelectedIndent] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [filter, setFilter] = useState('ALL');

  // Fetch all indents on page load
  useEffect(() => {
    fetchIndents();
  }, []);

  const fetchIndents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/indents');
      setIndents(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to load indents. Is backend running?' });
    }
  };

  // Open detail modal
  const openIndent = (indent) => {
    setSelectedIndent(indent);
    setRemarks('');
    setAlert(null);
  };

  // Close modal
  const closeModal = () => {
    setSelectedIndent(null);
    setRemarks('');
    setAlert(null);
  };

  // Approve or Reject
  const handleVerify = async (action) => {
    if (!remarks.trim()) {
      setAlert({ type: 'error', message: 'Please enter remarks before proceeding.' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/indents/${selectedIndent.id}/verify`,
        { action, remarks }
      );

      // Update the list
      setIndents(prev =>
        prev.map(i => i.id === selectedIndent.id ? response.data : i)
      );

      setAlert({
        type: 'success',
        message: `✅ Indent ${selectedIndent.indentNo} has been ${action}.`
      });

      setSelectedIndent(response.data);

    } catch (error) {
      setAlert({ type: 'error', message: 'Action failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Filter indents
  const filteredIndents = indents.filter(i => {
    if (filter === 'ALL') return true;
    return i.status === filter;
  });

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px' }}>✅</span>
          <div>
            <h1 style={{ fontSize: '24px', color: '#1a237e', fontWeight: 700 }}>
              Indent Verification
            </h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
              Review and approve or reject submitted indents
            </p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && !selectedIndent && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      {/* Filter + Refresh */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                  background: filter === f ? '#1a237e' : '#e8eaf6',
                  color: filter === f ? 'white' : '#1a237e',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={fetchIndents}>
            🔄 Refresh
          </button>
        </div>

        {/* Indent Table */}
        {filteredIndents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">No indents found</div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Indent No</th>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Material</th>
                  <th>Qty</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndents.map(indent => (
                  <tr key={indent.id} onClick={() => openIndent(indent)}>
                    <td><strong>{indent.indentNo}</strong></td>
                    <td>{formatDate(indent.indentDate)}</td>
                    <td>{indent.department}</td>
                    <td>{indent.materialName}</td>
                    <td>{indent.quantity} {indent.unit}</td>
                    <td>
                      <span className={`priority-${indent.priority?.toLowerCase()}`}>
                        {indent.priority === 'Urgent' ? '🔴' : '🟢'} {indent.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${indent.status?.toLowerCase()}`}>
                        {indent.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={(e) => { e.stopPropagation(); openIndent(indent); }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedIndent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="modal-title">
                {selectedIndent.indentNo} — Details
              </h2>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#888' }}
              >✕</button>
            </div>

            {/* Alert inside modal */}
            {alert && (
              <div className={`alert alert-${alert.type}`}>{alert.message}</div>
            )}

            {/* Status Badge */}
            <div style={{ marginBottom: '16px' }}>
              <span className={`badge badge-${selectedIndent.status?.toLowerCase()}`}>
                {selectedIndent.status}
              </span>
            </div>

            {/* Detail Grid */}
            <div className="detail-grid">
              <div className="detail-item">
                <label>Indent No</label>
                <span>{selectedIndent.indentNo}</span>
              </div>
              <div className="detail-item">
                <label>Date</label>
                <span>{formatDate(selectedIndent.indentDate)}</span>
              </div>
              <div className="detail-item">
                <label>Department</label>
                <span>{selectedIndent.department}</span>
              </div>
              <div className="detail-item">
                <label>Priority</label>
                <span className={`priority-${selectedIndent.priority?.toLowerCase()}`}>
                  {selectedIndent.priority}
                </span>
              </div>
              <div className="detail-item">
                <label>Material Name</label>
                <span>{selectedIndent.materialName}</span>
              </div>
              <div className="detail-item">
                <label>Quantity</label>
                <span>{selectedIndent.quantity} {selectedIndent.unit}</span>
              </div>
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <label>Purpose</label>
                <span>{selectedIndent.purpose || '-'}</span>
              </div>
              {selectedIndent.verifierRemarks && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <label>Verifier Remarks</label>
                  <span>{selectedIndent.verifierRemarks}</span>
                </div>
              )}
            </div>

            {/* PDF Link */}
            {selectedIndent.documentUrl && (
              <div style={{ marginBottom: '20px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.open(selectedIndent.documentUrl, '_blank')}
                >
                  📄 View Uploaded Document
                </button>
              </div>
            )}

            {/* Approve / Reject — only if PENDING */}
            {selectedIndent.status === 'PENDING' && (
              <div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Remarks *</label>
                  <textarea
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                    placeholder="Enter your remarks here..."
                    style={{
                      width: '100%', padding: '10px',
                      borderRadius: '8px', border: '1.5px solid #ddd',
                      fontSize: '14px', minHeight: '80px', outline: 'none'
                    }}
                  />
                </div>
                <div className="modal-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleVerify('APPROVED')}
                    disabled={loading}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleVerify('REJECTED')}
                    disabled={loading}
                  >
                    ❌ Reject
                  </button>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Already verified */}
            {selectedIndent.status !== 'PENDING' && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ color: '#888', fontSize: '13px', marginBottom: '12px' }}>
                  This indent has already been {selectedIndent.status.toLowerCase()}.
                </p>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default IndentVerification;