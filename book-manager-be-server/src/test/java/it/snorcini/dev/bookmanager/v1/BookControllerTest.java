package it.snorcini.dev.bookmanager.v1;

import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.BookListResponse;
import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.service.BookService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {BookController.class})
@DisplayName("Tests regarding the BookController class")
class BookControllerTest {

    @Autowired
    private BookController target;
    @MockBean
    private BookService bookServiceMock;
    @Mock
    private BookDTO bookDTOMock;
    @Mock
    private BookManagerBaseResponse responseMock;
    @Mock
    private BookListResponse responseListMock;
    @Mock
    private UpdateBookDTO updateBookDTOMock;

    public static final String PREFERRED_USERNAME = "preferred_username";

    private final String username = "usernameMock";
    private final Long bookId = 1L;

    @Test
    @DisplayName("Should call getFilteredList and return OK")
    void testGetFilteredList01() {
        // given
        doReturn(responseListMock).when(bookServiceMock).getBooks(bookId, null, null, null, null);

        // when
        ResponseEntity<BookListResponse> response = target
                .getFilteredList(bookId, null, null, null, null);

        // then
        verify(bookServiceMock, times(1)).getBooks(bookId, null, null, null, null);
        assertNotNull(response.getBody(), "These objects should be not null");
        assertEquals(HttpStatus.OK, response.getStatusCode(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should call saveBook and return OK")
    void testSaveBook01() {
        // given
        doReturn(responseMock).when(bookServiceMock).saveBook(bookDTOMock, username);

        // when
        ResponseEntity<BookManagerBaseResponse> response = target
                .saveBook(bookDTOMock, getJwtMock(username));

        // then
        verify(bookServiceMock, times(1)).saveBook(bookDTOMock, username);
        assertNotNull(response.getBody(), "These objects should be not null");
        assertEquals(HttpStatus.OK, response.getStatusCode(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should call updateBook and return OK")
    void testUpdateBook01() {
        // given
        doReturn(responseMock).when(bookServiceMock).updateBook(updateBookDTOMock, username);

        // when
        ResponseEntity<BookManagerBaseResponse> response = target
                .updateBook(updateBookDTOMock, getJwtMock(username));

        // then
        verify(bookServiceMock, times(1)).updateBook(updateBookDTOMock, username);
        assertNotNull(response.getBody(), "These objects should be not null");
        assertEquals(HttpStatus.OK, response.getStatusCode(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should call deleteBook and return OK")
    void testDeleteBook01() {
        // given
        doReturn(responseMock).when(bookServiceMock).deleteBook(bookId, username);

        // when
        ResponseEntity<BookManagerBaseResponse> response = target
                .deleteBook(bookId, getJwtMock(username));

        // then
        verify(bookServiceMock, times(1)).deleteBook(bookId, username);
        assertNotNull(response.getBody(), "These objects should be not null");
        assertEquals(HttpStatus.OK, response.getStatusCode(), "These objects should be equal");
    }

    public static Jwt getJwtMock(final String usernameMock) {
        Jwt jwtMock = mock(Jwt.class);
        doReturn(usernameMock).when(jwtMock).getClaimAsString(PREFERRED_USERNAME);
        return jwtMock;
    }
}
