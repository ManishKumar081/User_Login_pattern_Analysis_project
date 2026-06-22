package com.indent.indentbackend.controller;

import com.indent.indentbackend.dto.VerifyRequest;
import com.indent.indentbackend.model.Indent;
import com.indent.indentbackend.service.IndentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/indents")
@CrossOrigin(origins = "*")
public class IndentController {

    @Autowired
    private IndentService indentService;

    // ─────────────────────────────────────────
    // POST /api/indents
    // Submit new indent with PDF
    // ─────────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> createIndent(
            @RequestParam("department")   String department,
            @RequestParam("materialName") String materialName,
            @RequestParam("quantity")     Double quantity,
            @RequestParam("unit")         String unit,
            @RequestParam("purpose")      String purpose,
            @RequestParam("priority")     String priority,
            @RequestParam("document")     MultipartFile document
    ) {
        if (document.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Please upload a PDF document.");
        }

        String contentType = document.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return ResponseEntity.badRequest()
                    .body("Only PDF files are allowed.");
        }

        try {
            Indent indent = indentService.createIndent(
                    department, materialName, quantity,
                    unit, purpose, priority, document
            );
            return ResponseEntity.ok(indent);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to create indent: " + e.getMessage());
        }
    }

    // ─────────────────────────────────────────
    // GET /api/indents
    // Get all indents from PostgreSQL
    // ─────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Indent>> getAllIndents() {
        return ResponseEntity.ok(indentService.getAllIndents());
    }

    // ─────────────────────────────────────────
    // GET /api/indents/{id}
    // Get single indent by ID
    // ─────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> getIndentById(@PathVariable String id) {
        Indent indent = indentService.getIndentById(id);
        if (indent == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(indent);
    }

    // ─────────────────────────────────────────
    // PUT /api/indents/{id}/verify
    // Approve or Reject indent → saved to DB
    // ─────────────────────────────────────────
    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyIndent(
            @PathVariable String id,
            @RequestBody VerifyRequest request
    ) {
        if (!request.getAction().equals("APPROVED") &&
            !request.getAction().equals("REJECTED")) {
            return ResponseEntity.badRequest()
                    .body("Action must be APPROVED or REJECTED");
        }

        try {
            Indent indent = indentService.verifyIndent(id, request);
            return ResponseEntity.ok(indent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─────────────────────────────────────────
    // GET /api/indents/health
    // ─────────────────────────────────────────
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Indent Backend with PostgreSQL is running!");
    }
}