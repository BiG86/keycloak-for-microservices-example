package it.snorcini.dev.bookmanager.repository;

import it.snorcini.dev.bookmanager.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA interface to manage Algorithm Entities.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {


    List<Book> findByIsbn(@Param("isbn") String isbn);

    /**
     * Find all algorithms
     *
     * @param id       algorithm id to be queried
     * @param pageable whether the query is paged or not
     * @return the algorithm page
     */
    Page<Book> findAll(@Param("id") Long id,
                            Pageable pageable);

}
