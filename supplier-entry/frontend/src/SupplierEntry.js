import React, { useState } from "react";
import axios from "axios";

function SupplierEntry() {
  const [supplierName, setSupplierName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    let newErrors = {};

    if (!supplierName.trim()) {
      newErrors.supplierName = "Supplier Name is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/supplier",
        {
          supplier_name: supplierName,
          address: address,
        }
      );

      setMessage(response.data.message);
      setMessageType("success");

      setSupplierName("");
      setAddress("");
      setErrors({});
    } catch (error) {
      console.error(error);

      setMessage("Failed to save supplier");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "550px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Supplier Entry
          </h2>
        </div>

        {/* Form */}
        <div style={{ padding: "30px" }}>
          {/* Supplier Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Supplier Name *
            </label>

            <input
              type="text"
              value={supplierName}
              onChange={(e) => {
                setSupplierName(e.target.value);
                setMessage("");
              }}
              placeholder="Enter Supplier Name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />

            {errors.supplierName && (
              <p
                style={{
                  color: "red",
                  marginTop: "5px",
                  fontSize: "13px",
                }}
              >
                {errors.supplierName}
              </p>
            )}
          </div>

          {/* Address */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Address *
            </label>

            <textarea
              rows="4"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setMessage("");
              }}
              placeholder="Enter Supplier Address"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                resize: "none",
                boxSizing: "border-box",
              }}
            />

            {errors.address && (
              <p
                style={{
                  color: "red",
                  marginTop: "5px",
                  fontSize: "13px",
                }}
              >
                {errors.address}
              </p>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "600",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Saving..." : "Save Supplier"}
          </button>

          {/* Success/Error Message */}
          {message && (
            <p
              style={{
                color:
                  messageType === "error"
                    ? "red"
                    : "green",
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "600",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupplierEntry;