package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

class BookListResponseTest {

    @Test
    void testBookListResponse01() {
        BookListResponse listResponse = new BookListResponse();
        listResponse.setPayload(new ArrayList<>());
        String toStringed = listResponse.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

}
