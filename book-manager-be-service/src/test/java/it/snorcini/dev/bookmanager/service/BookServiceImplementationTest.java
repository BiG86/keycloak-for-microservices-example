package it.snorcini.dev.bookmanager.service;

import it.snorcini.dev.bookmanager.BookMapper;
import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.BookListResponse;
import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.entity.Book;
import it.snorcini.dev.bookmanager.exception.BookManagerServiceException;
import it.snorcini.dev.bookmanager.repository.BookRepository;
import it.snorcini.dev.bookmanager.result.BookManagerResults;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
@DisplayName("Tests regarding the BookServiceImplementation class")
class BookServiceImplementationTest {

    private final String username = "usernameMock";
    private final OffsetDateTime offsetDateTime = OffsetDateTime.now();
    private final Long bookId = 1L;
    private BookServiceImplementation target;
    private BookServiceImplementation bookServiceImplementationSpy;
    @MockBean
    private BookRepository bookRepositoryMock;
    @MockBean
    private BookMapper bookMapperMock;
    @Mock
    private Book bookMock;
    @Mock
    private BookDTO bookDTOMock;
    private BookDTO bookDTO;
    private UpdateBookDTO updateBookDTO;
    private List<Book> bookList;
    @Mock
    private Page<Book> bookPage;

    @BeforeEach
    private void initialize() {
        // Initialize objects
        bookDTO = new BookDTO();
        updateBookDTO = new UpdateBookDTO();
        bookDTO.setIsbn("isbn test");
        bookDTO.setAuthor("author test");
        bookDTO.setTitle("title test");
        updateBookDTO.setId(bookId);
        updateBookDTO.setIsbn("isbn test");
        updateBookDTO.setAuthor("author test");
        updateBookDTO.setTitle("title test");
        bookList = new ArrayList<>();
        bookList.add(new Book());
        doReturn(bookList.stream()).when(bookPage).stream();

        // Instantiate test target and spy
        target = new BookServiceImplementation(
                bookRepositoryMock,
                bookMapperMock
        );
        bookServiceImplementationSpy = spy(target);
    }

    @Test
    @DisplayName("When asking for an book the test should retrieve an Book inside a list")
    void testGetBooks01() {
        //PREPARE
        doReturn(bookPage).when(bookRepositoryMock).findAll(anyLong(), any(PageRequest.class));

        //RUN & VERIFY
        BookListResponse bookListResponse = target.getBooks(
                0L,
                0,
                10,
                "id",
                "DESC");

        assertEquals(bookListResponse.getPayload().size(), bookList.size(), "These objects should be equal");
        verify(bookRepositoryMock, times(1)).findAll(anyLong(), any(PageRequest.class));
        verify(bookMapperMock, times(1)).bookToDetailBookDTO(any(Book.class));
    }

    @Test
    @DisplayName("Should throw BookManagerServiceException with isbn duplicated when " +
            "findByIsbn returns an element")
    void testSaveBook01() {
        //PREPARE
        doReturn(List.of(bookMock)).when(bookRepositoryMock).findByIsbn(anyString());

        //RUN
        BookManagerServiceException bookManagerServiceException = assertThrows(
                BookManagerServiceException.class,
                () -> target.saveBook(bookDTO, username), "Should throw an BookManagerServiceException");

        //VERIFY
        verify(bookRepositoryMock, times(1)).findByIsbn(anyString());
        assertEquals(
                BookManagerResults.BOOK_CODE_DUPLICATED,
                bookManagerServiceException.getBookManagerResults(), "These objects should be equal");
        assertNull(bookManagerServiceException.getResultInfo(), "These objects should be null");
        assertEquals(BookManagerBaseResponse.class, bookManagerServiceException.getResponseClass(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should call save and setOperationResult with success")
    void testSaveBook02() {
        //PREPARE
        doReturn(List.of()).when(bookRepositoryMock)
                .findByIsbn(anyString());
        doReturn(bookMock).when(bookMapperMock)
                .bookDtoToBook(
                        bookDTOMock,
                        offsetDateTime,
                        offsetDateTime,
                        username);
        doReturn(new BookManagerBaseResponse()).when(bookServiceImplementationSpy)
                .setOperationResult(any(), any(), any());

        //RUN
        bookServiceImplementationSpy.saveBook(bookDTO, username);

        //VERIFY
        verify(bookRepositoryMock, times(1)).save(any());
        verify(bookServiceImplementationSpy, times(1))
                .setOperationResult(any(), any(), any());
    }

    @Test
    @DisplayName("Should throw BookManagerServiceException with element not found when findByIdAndDateDeleteIsNull " +
            "returns no elements")
    void testUpdateBook01() {
        //PREPARE
        doReturn(Optional.empty()).when(bookRepositoryMock).findById(bookId);

        //RUN
        BookManagerServiceException bookManagerServiceException = assertThrows(
                BookManagerServiceException.class,
                () -> target.updateBook(updateBookDTO, username), "Should throw an BookManagerServiceException");

        //VERIFY
        assertEquals(BookManagerResults.BOOK_NOT_FOUND, bookManagerServiceException.getBookManagerResults(), "These objects should be equal");
        assertNull(bookManagerServiceException.getResultInfo(), "These objects should be null");
        assertEquals(BookManagerBaseResponse.class, bookManagerServiceException.getResponseClass(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should call findFirstByCodeAndDateDeleteIsNull, save and setOperationResult with success")
    void testUpdateBook03() {
        //PREPARE
        doReturn(Optional.of(bookMock)).when(bookRepositoryMock).findById(bookId);
        doReturn(bookId).when(bookMock).getId();
        doReturn(bookMock).when(bookMapperMock).updateBookDTOToBookEntity(
                any(),
                any(),
                any(),
                any(),
                any()
        );

        //RUN
        BookManagerBaseResponse result = bookServiceImplementationSpy.updateBook(
                updateBookDTO,
                username);

        //VERIFY
        assertEquals(0, result.getResultCode(), "These objects should be equal");
        verify(bookRepositoryMock, times(1)).findByIsbn(anyString());
        verify(bookRepositoryMock, times(1)).save(bookMock);
        verify(bookServiceImplementationSpy, times(1)).setOperationResult(
                any(),
                any(),
                any()
        );
    }

    @Test
    @DisplayName("Should call findFirstByCodeAndDateDeleteIsNull, save and setOperationResult with success")
    void testUpdateBook04() {
        //PREPARE
        doReturn(Optional.of(bookMock)).when(bookRepositoryMock).findById(bookId);
        doReturn(bookId).when(bookMock).getId();
        Book fromDb = new Book();
        fromDb.setId(bookId);
        doReturn(List.of(fromDb)).when(bookRepositoryMock).findByIsbn(anyString());
        doReturn(bookMock).when(bookMapperMock).updateBookDTOToBookEntity(
                any(),
                any(),
                any(),
                any(),
                any()
        );

        //RUN
        BookManagerBaseResponse result = bookServiceImplementationSpy.updateBook(
                updateBookDTO,
                username);

        //VERIFY
        assertEquals(0, result.getResultCode(), "These objects should be equal");
        verify(bookRepositoryMock, times(1)).findByIsbn(anyString());
        verify(bookRepositoryMock, times(1)).save(bookMock);
        verify(bookServiceImplementationSpy, times(1)).setOperationResult(
                any(),
                any(),
                any()
        );
    }
}
