package it.snorcini.dev.bookmanager.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

/**
 * This class provides information about pagination and is inherited by each *ListResponse class.
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PageableListResponse extends BookManagerBaseResponse {

    /**
     * The total number of elements for the specific subclass entity, retrieved via a secondary count(*)
     * query automatically executed after the findAll method and populated in the Page object returned.
     */
    @PositiveOrZero
    @NotNull
    protected Long totalNumber;

}
