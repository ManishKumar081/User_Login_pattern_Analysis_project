import { useState } from "react";
import axios from "axios";

function MaterialEntry() {
  const initialState = {
    material_code: "",
    material_name: "",
    category: "",
    uom: "",
    standard_rate: "",
    material_group: "",
    hsn_code: "",
    description: "",
    manufacturer: "",
    brand: "",
    country: "",
    remarks: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // RESET

  const handleReset = () => {
    setFormData(initialState);
    alert("Form Reset");
  };

  // DRAFT

  const handleDraft = () => {
    localStorage.setItem(
      "materialDraft",
      JSON.stringify(formData)
    );
    alert("Draft Saved");
  };

  // SAVE

  const handleSave = async () => {
    // Required fields validation

    if (
      !formData.material_code ||
      !formData.material_name ||
      !formData.category ||
      !formData.uom ||
      !formData.standard_rate
    ) {
      alert("Fill required (*) fields");
      return;
    }

    try {
      const payload = {
        ...formData,

        standard_rate: Number(formData.standard_rate),

        material_group: formData.material_group || null,
        hsn_code: formData.hsn_code || null,
        description: formData.description || null,
        manufacturer: formData.manufacturer || null,
        brand: formData.brand || null,
        country: formData.country || null,
        remarks: formData.remarks || null
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/material",
        payload
      );

      alert(response.data.message);

      setFormData(initialState);
    } catch (error) {
      console.log(error);
      alert("Error Saving");
    }
  };

  return (
    <div className="content">

      <div className="card">
        <h2>Material Details</h2>

        <div className="form-grid">

          <input
            name="material_code"
            placeholder="Material Code *"
            value={formData.material_code}
            onChange={handleChange}
          />

          <input
            name="material_name"
            placeholder="Material Name *"
            value={formData.material_name}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category *"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            name="uom"
            placeholder="UOM *"
            value={formData.uom}
            onChange={handleChange}
          />

          <input
            name="standard_rate"
            placeholder="Standard Rate *"
            value={formData.standard_rate}
            onChange={handleChange}
          />

          <input
            name="material_group"
            placeholder="Material Group"
            value={formData.material_group}
            onChange={handleChange}
          />

          <input
            name="hsn_code"
            placeholder="HSN Code"
            value={formData.hsn_code}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>


      <div className="card">
        <h2>Other Details</h2>

        <div className="form-grid">

          <input
            name="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />

        <div className="button-group">

          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="draft-btn"
            onClick={handleDraft}
          >
            Save Draft
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default MaterialEntry;