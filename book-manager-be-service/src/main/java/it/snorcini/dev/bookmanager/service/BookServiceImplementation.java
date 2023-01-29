package it.snorcini.dev.bookmanager.service;

import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.BookListResponse;
import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.exception.BookManagerServiceException;
import it.snorcini.dev.bookmanager.BookMapper;
import it.snorcini.dev.bookmanager.result.BookManagerResults;
import it.snorcini.dev.bookmanager.entity.Book;
import it.snorcini.dev.bookmanager.repository.BookRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service that computes data and
 * provides CRUD operations for the Book table
 * through the JPA repository.
 */
@Service
@Transactional
@Validated
@Slf4j
@AllArgsConstructor
public class BookServiceImplementation extends BaseService implements BookService {

    /**
     * JPA Repository to manage Book entity.
     */
    @NotNull
    private final BookRepository bookRepository;

    /**
     * Mapper to convert from DTO to Entity
     * and vice versa.
     */
    @NotNull
    private final BookMapper bookMapper;

    /**
     * Save a new Book.
     *
     * @param insertBookDTO The new book to be saved
     * @param username           the validated user who sent the dto
     * @return The new saved book containing the assigned id
     */
    @Override
    public BookManagerBaseResponse saveBook(@Valid final BookDTO insertBookDTO,
                                                     final String username)
            throws BookManagerServiceException {
        log.debug("BookServiceImplementation.saveBook[book = {}]", insertBookDTO);
        // 1. Code duplicates validation
        isbnDuplicateCheck(insertBookDTO);

        // 2. Activities population and save
        OffsetDateTime date = OffsetDateTime.now();
        bookRepository.save(bookMapper.bookDtoToBook(
                insertBookDTO, date, date, username));

        // 3. Return success
        return this.setOperationResult(new BookManagerBaseResponse(),
                BookManagerResults.OPERATION_SUCCESS, null);

    }

    /**
     * Update an Book.
     *
     * @param updateBookDTO the new book values
     * @param username           the validated user who sent the dto
     * @return the operation result
     */
    @Override
    public BookManagerBaseResponse updateBook(@Valid final UpdateBookDTO updateBookDTO,
                                                       final String username)
            throws BookManagerServiceException {
        log.debug("BookServiceImplementation.updateBook[book = {}]", updateBookDTO);

        // 1. Book existence check
        Optional.ofNullable(bookRepository
                .findById(updateBookDTO.getId())
                .orElseThrow(() -> new BookManagerServiceException(
                        BookManagerResults.BOOK_NOT_FOUND,
                        null,
                        BookManagerBaseResponse.class))).ifPresent((Book book) ->
                updateBook(updateBookDTO, username, book)
        );

        // 5. Return success
        return this.setOperationResult(new BookManagerBaseResponse(),
                BookManagerResults.OPERATION_SUCCESS, null);
    }

    private void updateBook(final UpdateBookDTO updateBookDTO
            , final String username, final Book book) {
        // 3. code duplication check
        isbnDuplicateCheck(updateBookDTO);
        // 4. update book
        OffsetDateTime date = OffsetDateTime.now();
        bookRepository.save(bookMapper.updateBookDTOToBookEntity(
                updateBookDTO,
                book.getId(),
                book.getDateInsert(),
                date,
                username));
    }

    /**
     * Determine if a DTO can be inserted/updated.
     *
     * @param bookDTO book DTO to be checked for insert/update operations
     */
    protected void isbnDuplicateCheck(@Valid final BookDTO bookDTO) {
        bookRepository.findByIsbn(bookDTO.getIsbn())
                .stream().filter(
                (Book book) -> bookDTO.getClass().equals(BookDTO.class)
                        || !book.getId().equals(((UpdateBookDTO) bookDTO).getId())
        ).findAny().ifPresent((Book book) -> {
            throw new BookManagerServiceException(BookManagerResults.BOOK_CODE_DUPLICATED, null,
                    BookManagerBaseResponse.class);
        });
    }

    /**
     * Retrieve Books with optional filter.
     *
     * @param id             book id optional filter
     * @param page           pagination page number
     * @param size           pagination page size
     * @param orderBy        pagination order by
     * @param orderDirection pagination order direction
     * @return The response containing the book list
     */
    @Override
    public BookListResponse getBooks(final Long id,
                                               final Integer page,
                                               final Integer size,
                                               final String orderBy,
                                               final String orderDirection) throws BookManagerServiceException {
        log.debug("BookServiceImplementation.getBooks[bookId = {}]", id);
        // 1. It retrieves books from DB optionally filtered by id, converts them into DTOs and return the
        // response object
        Page<Book> bookPage = bookRepository.findAll(
                id,
                this.buildPageable(page, size, orderBy, orderDirection)
        );
        BookListResponse bookListResponse = new BookListResponse(
                bookPage.getTotalElements(),
                bookPage
                        .stream()
                        .map(bookMapper::bookToDetailBookDTO)
                        .collect(Collectors.toList())
        );

        return (BookListResponse) this.setOperationResult(
                bookListResponse,
                BookManagerResults.OPERATION_SUCCESS,
                null
        );
    }

    /**
     * Delete an book
     *
     * @param id             an {@link Book} id
     * @param lastUserModify the user from the authorization token
     * @return a {@link BookManagerBaseResponse}
     * @throws BookManagerServiceException exception thrown
     */
    @Override
    public BookManagerBaseResponse deleteBook(final Long id, final String lastUserModify)
            throws BookManagerServiceException {
        log.debug("BookServiceImplementation.deleteBook[id = {}]", id);
        bookRepository.deleteById(id);
        return this.setOperationResult(new BookManagerBaseResponse(),
                BookManagerResults.OPERATION_SUCCESS, null);
    }

}
