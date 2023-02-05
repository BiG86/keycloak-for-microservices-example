package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


class BookManagerBaseResponseTest {

    private BookManagerBaseResponse bookManagerBaseResponse;

    @Test
    void testBookManagerBaseResponse01() {
        bookManagerBaseResponse = new BookManagerBaseResponse();
        String toStringed = bookManagerBaseResponse.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

    @Test
    void testBookManagerBaseResponse02() {
        int resultCode = 1;
        String resultMessage = "resultMessage";
        List<String> resultInfo = Arrays.asList("resultInfo");
        bookManagerBaseResponse = new BookManagerBaseResponse(resultCode, resultMessage, resultInfo);
        BookManagerBaseResponse bookManagerBaseResponseSetter = new BookManagerBaseResponse();
        bookManagerBaseResponseSetter.setResultCode(resultCode);
        bookManagerBaseResponseSetter.setResultMessage(resultMessage);
        bookManagerBaseResponseSetter.setResultInfo(resultInfo);
        assertEquals(bookManagerBaseResponseSetter, bookManagerBaseResponse, "These objects should be equal");
    }


}
