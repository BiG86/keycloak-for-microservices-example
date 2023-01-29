package it.snorcini.dev.bookmanager.exception;

import it.snorcini.dev.bookmanager.result.BookManagerResults;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("Tests regarding the BookManagerServiceException class")
class BookManagerServiceExceptionTest {

    private BookManagerServiceException bookManagerServiceException;
    private final BookManagerResults bookManagerResultsMock = BookManagerResults.GENERIC_ERROR;
    private final List<String> resultInfoMock = List.of("result", "Info", "Mock");
    private final Class<RuntimeException> responseClassMock = RuntimeException.class;

    @Test
    @DisplayName("Should set each field using setters")
    void testBookManagerServiceException01() {
        // given
        bookManagerServiceException = new BookManagerServiceException();

        // when
        bookManagerServiceException.setBookManagerResults(bookManagerResultsMock);
        bookManagerServiceException.setResultInfo(resultInfoMock);
        bookManagerServiceException.setResponseClass(responseClassMock);

        // then
        assertEquals(bookManagerResultsMock, bookManagerServiceException.getBookManagerResults(), "These objects should be equal");
        assertEquals(resultInfoMock, bookManagerServiceException.getResultInfo(), "These objects should be equal");
        assertEquals(responseClassMock, bookManagerServiceException.getResponseClass(), "These objects should be equal");
    }

    @Test
    @DisplayName("Should initialize an empty BookManagerServiceException")
    void testBookManagerServiceException02() {
        // when
        bookManagerServiceException = new BookManagerServiceException();

        // then
        assertNull(bookManagerServiceException.getBookManagerResults() , "These objects should be equal");
        assertNull(bookManagerServiceException.getResultInfo(), "These objects should be null");
        assertNull(bookManagerServiceException.getResponseClass(), "These objects should be equal");
    }

}
