package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class UpdateBookDTOTest {

    private UpdateBookDTO updateBookDTO;

    @Test
    void testUpdateBookDTOTest01() {
        updateBookDTO = new UpdateBookDTO();
        String toStringed = updateBookDTO.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

    @Test
    void testUpdateBookDTOTest02() {
        long id = 1L;
        updateBookDTO = new UpdateBookDTO(id);
        UpdateBookDTO updateBookDTOSetter = new UpdateBookDTO();
        updateBookDTOSetter.setId(id);
        assertEquals(updateBookDTOSetter, updateBookDTO, "These objects should be equal");
    }
}
