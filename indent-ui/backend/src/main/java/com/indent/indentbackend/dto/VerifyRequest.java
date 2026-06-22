package com.indent.indentbackend.dto;

/**
 * VerifyRequest is the data sent from frontend
 * when verifier clicks Approve or Reject.
 *
 * Example JSON received:
 * {
 *   "action": "APPROVED",
 *   "remarks": "Approved for Q3 procurement"
 * }
 */
public class VerifyRequest {

    private String action;   // "APPROVED" or "REJECTED"
    private String remarks;  // Verifier's comments

    // Getters and Setters
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}