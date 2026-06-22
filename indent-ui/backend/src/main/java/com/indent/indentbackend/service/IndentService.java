package com.indent.indentbackend.service;

import com.indent.indentbackend.dto.VerifyRequest;
import com.indent.indentbackend.model.Indent;
import com.indent.indentbackend.repository.IndentRepository;
import io.minio.*;
import io.minio.http.Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class IndentService {

    @Autowired
    private MinioClient minioClient;

    @Autowired
    private IndentRepository indentRepository;

    @Value("${minio.bucket-name}")
    private String bucketName;

    // ─────────────────────────────────────────
    // CREATE INDENT + UPLOAD PDF TO MINIO
    // ─────────────────────────────────────────
    public Indent createIndent(
            String department,
            String materialName,
            Double quantity,
            String unit,
            String purpose,
            String priority,
            MultipartFile document
    ) throws Exception {

        // Step 1: Ensure bucket exists in MinIO
        ensureBucketExists();

        // Step 2: Upload PDF to MinIO
        String uniqueFileName = UUID.randomUUID().toString()
                + "_" + document.getOriginalFilename();

        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(uniqueFileName)
                        .stream(document.getInputStream(), document.getSize(), -1)
                        .contentType(document.getContentType())
                        .build()
        );

        // Step 3: Generate presigned URL (valid 24 hours)
        String documentUrl = minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(bucketName)
                        .object(uniqueFileName)
                        .expiry(24, TimeUnit.HOURS)
                        .build()
        );

        // Step 4: Generate Indent Number (IND-001, IND-002 ...)
        long count = indentRepository.countAllIndents();
        String indentNo = String.format("IND-%03d", count + 1);

        // Step 5: Build Indent object
        Indent indent = new Indent();
        indent.setIndentNo(indentNo);
        indent.setIndentDate(java.time.LocalDate.now());
        indent.setDepartment(department);
        indent.setMaterialName(materialName);
        indent.setQuantity(quantity);
        indent.setUnit(unit);
        indent.setPurpose(purpose);
        indent.setPriority(priority);
        indent.setDocumentUrl(documentUrl);
        indent.setFileName(document.getOriginalFilename());
        indent.setStatus("PENDING");
        indent.setCreatedAt(LocalDateTime.now());

        // Step 6: Save to PostgreSQL
        Indent saved = indentRepository.save(indent);
        System.out.println("✅ Indent saved to DB: " + saved.getIndentNo());

        return saved;
    }

    // ─────────────────────────────────────────
    // GET ALL INDENTS FROM DATABASE
    // ─────────────────────────────────────────
    public List<Indent> getAllIndents() {
        return indentRepository.findAllByOrderByCreatedAtDesc();
    }

    // ─────────────────────────────────────────
    // GET SINGLE INDENT BY ID
    // ─────────────────────────────────────────
    public Indent getIndentById(String id) {
        Optional<Indent> indent = indentRepository.findById(id);
        return indent.orElse(null);
    }

    // ─────────────────────────────────────────
    // APPROVE OR REJECT INDENT
    // ─────────────────────────────────────────
    public Indent verifyIndent(String id, VerifyRequest request) {
        Indent indent = indentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Indent not found: " + id));

        indent.setStatus(request.getAction());
        indent.setVerifierRemarks(request.getRemarks());
        indent.setVerifiedAt(LocalDateTime.now());

        // Save updated status to PostgreSQL
        Indent updated = indentRepository.save(indent);
        System.out.println("✅ Indent " + updated.getIndentNo()
                + " -> " + request.getAction());

        return updated;
    }

    // ─────────────────────────────────────────
    // ENSURE MINIO BUCKET EXISTS
    // ─────────────────────────────────────────
    private void ensureBucketExists() throws Exception {
        boolean exists = minioClient.bucketExists(
                BucketExistsArgs.builder().bucket(bucketName).build()
        );
        if (!exists) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder().bucket(bucketName).build()
            );
            System.out.println("✅ Bucket created: " + bucketName);
        }
    }
}