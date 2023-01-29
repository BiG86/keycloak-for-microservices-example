package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class BookDTOTest {

    private BookDTO bookDTO;

    @Test
    void testBookDTO01() {
        bookDTO = new BookDTO();
        String toStringed = bookDTO.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

    @Test
    void testBookDTO02() {
        bookDTO = new BookDTO("isbn test", "title test", "author test");
        BookDTO bookDTOSetter = new BookDTO();
        bookDTOSetter.setIsbn("isbn test");
        bookDTOSetter.setTitle("title test");
        bookDTOSetter.setAuthor("author test");
        assertEquals(bookDTOSetter, bookDTO, "These objects should be equal");
    }

}
