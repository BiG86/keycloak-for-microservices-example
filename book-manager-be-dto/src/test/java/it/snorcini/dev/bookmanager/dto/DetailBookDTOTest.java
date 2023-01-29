package it.snorcini.dev.bookmanager.dto;

import org.junit.jupiter.api.Test;

import java.time.OffsetDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DetailBookDTOTest {

    private DetailBookDTO detailAlgorithmDTO;

    @Test
    void testDetailBookDTO01() {
        detailAlgorithmDTO = new DetailBookDTO();
        String toStringed = detailAlgorithmDTO.toString();
        assertThat(toStringed).overridingErrorMessage("This element should not be null").isNotNull();
    }

    @Test
    void testDetailBookDTO02() {
        OffsetDateTime now = OffsetDateTime.now();
        detailAlgorithmDTO = new DetailBookDTO(ActivitiesDTO.builder().dateInsert(OffsetDateTime.MIN).dateModify(now)
                .lastUserModify("lastUserModify").build());
        DetailBookDTO detailAlgorithmDTOSetter = new DetailBookDTO();
        detailAlgorithmDTOSetter.setActivities(ActivitiesDTO.builder().dateInsert(OffsetDateTime.MIN).dateModify(now)
                .lastUserModify("lastUserModify").build());
        assertEquals(detailAlgorithmDTOSetter, detailAlgorithmDTO, "These objects should be equal");
    }

}
