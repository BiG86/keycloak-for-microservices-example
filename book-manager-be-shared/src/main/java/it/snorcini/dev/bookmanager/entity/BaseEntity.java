package it.snorcini.dev.bookmanager.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.OffsetDateTime;

/**
 * Abstract Entity with common data.
 */
@Getter
@Setter
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Validated
public abstract class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * Primary key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    /**
     * Contains the code to identify the item.
     */
    @NotEmpty
    @Column(name = "ISBN")
    private String isbn;

    /**
     * Date insert.
     */
    @NotNull
    @Column(name = "DATE_INSERT", nullable = false)
    private OffsetDateTime dateInsert;
    /**
     * Date modify.
     */
    @Column(name = "DATE_MODIFY")
    private OffsetDateTime dateModify;

    /**
     * Last user modify.
     */
    @NotEmpty
    @Column(name = "LAST_USER_MODIFY", nullable = false)
    private String lastUserModify;
}
