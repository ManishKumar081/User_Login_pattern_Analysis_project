package com.indent.indentbackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @Entity  → tells JPA this class maps to a database table
 * @Table   → the table name in PostgreSQL will be "indents"
 * @Id     → this is the primary key
 * @GeneratedValue → auto generate the ID
 */
@Entity
@Table(name = "indents")
public class Indent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String indentNo;

    private LocalDate indentDate;
    private String department;
    private String materialName;
    private Double quantity;
    private String unit;

    @Column(length = 1000)
    private String purpose;

    private String priority;

    @Column(length = 2000)
    private String documentUrl;

    private String fileName;
    private String status;

    @Column(length = 500)
    private String verifierRemarks;

    private LocalDateTime createdAt;
    private LocalDateTime verifiedAt;

    // Constructor
    public Indent() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getIndentNo() { return indentNo; }
    public void setIndentNo(String indentNo) { this.indentNo = indentNo; }

    public LocalDate getIndentDate() { return indentDate; }
    public void setIndentDate(LocalDate indentDate) { this.indentDate = indentDate; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getMaterialName() { return materialName; }
    public void setMaterialName(String materialName) { this.materialName = materialName; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getDocumentUrl() { return documentUrl; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getVerifierRemarks() { return verifierRemarks; }
    public void setVerifierRemarks(String verifierRemarks) { this.verifierRemarks = verifierRemarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }
}