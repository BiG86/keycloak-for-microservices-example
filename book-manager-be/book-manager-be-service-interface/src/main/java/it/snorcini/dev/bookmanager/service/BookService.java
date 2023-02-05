package it.snorcini.dev.bookmanager.service;

import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.BookListResponse;
import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.exception.BookManagerServiceException;

import javax.validation.Valid;

/**
 * Service interface to manage Book data.
 */
public interface BookService {


    /**
     * Save a new Book.
     *
     * @param bookDTO The new book to be saved
     * @param username     the validated user who sent the dto
     * @return Generic response BookManagerBaseResponse
     */
    BookManagerBaseResponse saveBook(@Valid BookDTO bookDTO, String username)
            throws BookManagerServiceException;

    /**
     * Update an Book.
     *
     * @param updateBookDTO the new book values
     * @param username           the validated user who sent the dto
     * @return the operation result
     */
    BookManagerBaseResponse updateBook(@Valid UpdateBookDTO updateBookDTO, String username)
            throws BookManagerServiceException;


    /**
     * Retrieve Books with optional filter.
     *
     * @param id             book id optional filter
     * @param page           pagination page number
     * @param size           pagination page size
     * @param orderBy        pagination order by
     * @param orderDirection pagination order direction
     * @return The response containing the application list
     */
    BookListResponse getBooks(Long id,
                                        Integer page,
                                        Integer size,
                                        String orderBy,
                                        String orderDirection) throws BookManagerServiceException;

    /**
     * Delete a single book.
     *
     * @param id             book id to be deleted
     * @param lastUserModify The validated user who sent the request
     * @return The response containing the result
     */
    BookManagerBaseResponse deleteBook(Long id, String lastUserModify)
            throws BookManagerServiceException;

}
