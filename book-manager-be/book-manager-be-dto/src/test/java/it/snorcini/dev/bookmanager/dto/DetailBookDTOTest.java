package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import java.time.OffsetDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DetailBookDTOTest {

    private DetailBookDTO detailBookDTO;

    @Test
    void testDetailBookDTO01() {
        detailBookDTO = new DetailBookDTO();
        String toStringed = detailBookDTO.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

    @Test
    void testDetailBookDTO02() {
        OffsetDateTime now = OffsetDateTime.now();
        detailBookDTO = new DetailBookDTO(ActivitiesDTO.builder().dateInsert(OffsetDateTime.MIN).dateModify(now)
                .lastUserModify("lastUserModify").build());
        DetailBookDTO detailBookDTOSetter = new DetailBookDTO();
        detailBookDTOSetter.setActivities(ActivitiesDTO.builder().dateInsert(OffsetDateTime.MIN).dateModify(now)
                .lastUserModify("lastUserModify").build());
        assertEquals(detailBookDTOSetter, detailBookDTO, "These objects should be equal");
    }

}
