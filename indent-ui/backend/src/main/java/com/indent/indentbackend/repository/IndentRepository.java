package com.indent.indentbackend.repository;

import com.indent.indentbackend.model.Indent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * IndentRepository handles ALL database operations.
 * Just by extending JpaRepository, Spring automatically gives us:
 *
 *   save(indent)        → INSERT or UPDATE
 *   findAll()           → SELECT * FROM indents
 *   findById(id)        → SELECT * WHERE id = ?
 *   deleteById(id)      → DELETE WHERE id = ?
 *   count()             → SELECT COUNT(*) FROM indents
 *
 * We don't write any SQL — Spring does it all!
 */
@Repository
public interface IndentRepository extends JpaRepository<Indent, String> {

    // Find all indents ordered by creation date (newest first)
    List<Indent> findAllByOrderByCreatedAtDesc();

    // Find indents by status
    List<Indent> findByStatusOrderByCreatedAtDesc(String status);

    // Find indent by indent number
    Optional<Indent> findByIndentNo(String indentNo);

    // Count indents to generate next indent number
    @Query("SELECT COUNT(i) FROM Indent i")
    long countAllIndents();
}