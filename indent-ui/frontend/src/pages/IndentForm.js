import React, { useState, useRef } from 'react';
import axios from 'axios';

const DEPARTMENTS = [
  'Administration', 'Finance', 'IT', 'HR',
  'Operations', 'Procurement', 'Engineering', 'Logistics'
];

const UNITS = ['Kg', 'Litre', 'Piece', 'Box', 'Meter', 'Pack'];
const PRIORITIES = ['Normal', 'Urgent'];

function IndentForm() {
  const [formData, setFormData] = useState({
    department: '',
    materialName: '',
    quantity: '',
    unit: '',
    purpose: '',
    priority: 'Normal',
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setAlert({ type: 'error', message: 'Only PDF files are allowed.' });
      return;
    }
    setPdfFile(file);
    setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setAlert({ type: 'error', message: 'Please upload a supporting PDF document.' });
      return;
    }

    if (!formData.department || !formData.materialName ||
        !formData.quantity || !formData.unit) {
      setAlert({ type: 'error', message: 'Please fill all required fields.' });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const data = new FormData();
      data.append('department',   formData.department);
      data.append('materialName', formData.materialName);
      data.append('quantity',     formData.quantity);
      data.append('unit',         formData.unit);
      data.append('purpose',      formData.purpose);
      data.append('priority',     formData.priority);
      data.append('document',     pdfFile);

      const response = await axios.post(
        'http://localhost:8080/api/indents', data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAlert({
        type: 'success',
        message: `✅ Indent ${response.data.indentNo} submitted successfully!`
      });

      // Reset form
      setFormData({
        department: '', materialName: '',
        quantity: '', unit: '',
        purpose: '', priority: 'Normal',
      });
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to submit indent. Is the backend running?'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px' }}>📋</span>
          <div>
            <h1 style={{ fontSize: '24px', color: '#1a237e', fontWeight: 700 }}>
              New Indent Request
            </h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
              Fill the form below and upload supporting document
            </p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Form */}
      <div className="card">
        <h2 className="card-title">Indent Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* Department */}
            <div className="form-group">
              <label>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label>Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Material Name */}
            <div className="form-group">
              <label>Material Name *</label>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="e.g. A4 Paper, Printer Ink"
                required
              />
            </div>

            {/* Quantity + Unit */}
            <div className="form-group">
              <label>Quantity *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="1"
                  required
                  style={{ flex: 2 }}
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  style={{ flex: 1 }}
                >
                  <option value="">Unit</option>
                  {UNITS.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose */}
            <div className="form-group full-width">
              <label>Purpose / Remarks</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Describe why this material is needed..."
              />
            </div>

            {/* PDF Upload */}
            <div className="form-group full-width">
              <label>Supporting Document (PDF) *</label>
              <div
                className="file-upload-area"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className="file-upload-icon">📄</div>
                <div className="file-upload-text">
                  Click to upload PDF document
                </div>
                {pdfFile && (
                  <div className="file-selected">
                    ✅ {pdfFile.name}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '⏳ Submitting...' : '🚀 Submit Indent'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({
                  department: '', materialName: '',
                  quantity: '', unit: '',
                  purpose: '', priority: 'Normal',
                });
                setPdfFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setAlert(null);
              }}
            >
              🔄 Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IndentForm;