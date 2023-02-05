package it.snorcini.dev.bookmanager.v1;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.BookListResponse;
import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.error.BookManagerValidationErrors;
import it.snorcini.dev.bookmanager.exception.BookManagerServiceException;
import it.snorcini.dev.bookmanager.service.BookService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.ClaimAccessor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Validated
@RestController
@RequestMapping("/api/v1/book")
@Slf4j
@AllArgsConstructor
public class BookController extends BaseController {

    @NotNull
    private BookService bookService;

    /**
     * Insert a single book.
     *
     * @param bookDTO   book data transfer object
     * @param principal from the spring security context
     * @return operation result message
     */
    @PostMapping(value = "")
    @ApiOperation(value = "Save a new book")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Operation completed", response = BookManagerBaseResponse.class),
            @ApiResponse(code = 400, message = "Malformed Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 500, message = "Internal Server Error")})
    public ResponseEntity<BookManagerBaseResponse> saveBook(
            @Valid @RequestBody final BookDTO bookDTO,
            @AuthenticationPrincipal final ClaimAccessor principal)
            throws BookManagerServiceException {
        log.debug("bookController.saveBook[book = {}]", bookDTO);

        return new ResponseEntity<>(
                bookService.saveBook(bookDTO, principal.getClaimAsString(PREFERRED_USERNAME)),
                HttpStatus.OK);
    }

    /**
     * Update a book if not already used by a config.
     *
     * @param updateBookDTO the updated book data
     * @param principal     from the spring security context
     * @return the operation result
     */
    @PutMapping(value = "")
    @ApiOperation(value = "Update a book")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Operation completed", response = BookManagerBaseResponse.class),
            @ApiResponse(code = 400, message = "Malformed Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Internal Server Error")})
    public ResponseEntity<BookManagerBaseResponse> updateBook(
            @Valid @RequestBody final UpdateBookDTO updateBookDTO,
            @AuthenticationPrincipal final ClaimAccessor principal)
            throws BookManagerServiceException {
        log.debug("bookController.updateBook[application = {}]", updateBookDTO);
        String username = principal.getClaimAsString(PREFERRED_USERNAME);
        return new ResponseEntity<>(
                bookService.updateBook(updateBookDTO, username),
                HttpStatus.OK);
    }

    /**
     * Return all books available.
     *
     * @param page           : number of the page to retrieve
     * @param size           : number of the items for each page
     * @param orderBy        : column name to use for sorting
     * @param orderDirection : ascending or descending
     * @return a list of book
     */
    @GetMapping(value = "")
    @ApiOperation(value = "Retrieve books optionally filtered by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Operation completed", response = BookListResponse.class),
            @ApiResponse(code = 400, message = "Malformed Request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Resource not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")})
    public ResponseEntity<BookListResponse> getFilteredList(
            final Long id,
            @PositiveOrZero(message = BookManagerValidationErrors.PAGE_LESS_THAN_ZERO) final Integer page,
            @Positive(message = BookManagerValidationErrors.SIZE_NOT_POSITIVE) final Integer size,
            @Size(max = 128,
                    message = BookManagerValidationErrors.ORDER_BY_INVALID) final String orderBy,
            @Size(max = 4,
                    message = BookManagerValidationErrors.ORDER_DIRECTION_INVALID) final String orderDirection)
            throws BookManagerServiceException {
        log.debug("bookController.getFilteredList[bookId = {}]", id);
        return new ResponseEntity<>(
                bookService.getBooks(id, page, size, orderBy, orderDirection),
                HttpStatus.OK);
    }

    /**
     * Delete a single book.
     *
     * @param id        the id of the book to delete
     * @param principal from the spring security context
     * @return operation result message
     */
    @DeleteMapping(value = "")
    @ApiOperation(value = "Delete book")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Operation completed", response = BookManagerBaseResponse.class),
            @ApiResponse(code = 400, message = "Malformed request"),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Resource not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")})
    public ResponseEntity<BookManagerBaseResponse> deleteBook(
            @Valid
            @NotNull(message = BookManagerValidationErrors.EMPTY_ID) final Long id,
            @AuthenticationPrincipal final ClaimAccessor principal)
            throws BookManagerServiceException {

        log.debug("bookController.deleteBook[id = {}]", id);
        return new ResponseEntity<>(bookService.deleteBook(
                id,
                principal.getClaimAsString(PREFERRED_USERNAME)), HttpStatus.OK);
    }

}
