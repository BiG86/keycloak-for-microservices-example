package it.snorcini.dev.bookmanager.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Application Entity.
 * <p>
 * Methods:
 * - constructor
 * - getter and setter
 * are auto-generated by Lombok.
 * <p>
 * This class @extends {@link BaseEntity} .
 */
@Entity
@Table(name = "BOOK")
@Getter
@Setter
@NoArgsConstructor
@Validated
public class Book extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "ISBN")
    private String isbn;

    @NotNull
    @Column(name = "TITLE")
    private String title;

    @NotNull
    @Column(name = "AUTHOR")
    private String author;

}
