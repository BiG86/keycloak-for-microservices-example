package it.snorcini.dev.bookmanager;

import it.snorcini.dev.bookmanager.dto.BookDTO;
import it.snorcini.dev.bookmanager.dto.DetailBookDTO;
import it.snorcini.dev.bookmanager.dto.UpdateBookDTO;
import it.snorcini.dev.bookmanager.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.OffsetDateTime;

/**
 * MapStruct mapper interface for the Book entity.
 */
@Mapper(componentModel = "spring")
public interface BookMapper {

    /**
     * From entity to dto.
     *
     * @param book the book entity
     * @return the DetailBookDTO
     */
    @Mapping(target = "activities.dateInsert", source = "dateInsert")
    @Mapping(target = "activities.dateModify", source = "dateModify")
    @Mapping(target = "activities.lastUserModify", source = "lastUserModify")
    DetailBookDTO bookToDetailBookDTO(Book book);

    /**
     * From dto to entity.
     *
     * @param bookDTO the book data transfer object
     * @return the Book entity
     */
    Book bookDtoToBook(BookDTO bookDTO,
                                      OffsetDateTime dateInsert,
                                      OffsetDateTime dateModify,
                                      String lastUserModify);

    /**
     * From update dto to entity.
     *
     * @param bookDTO   the application dto
     * @param id             entity id to be updated
     * @param dateInsert     entity creation date
     * @param dateModify     entity last modified date
     * @param lastUserModify entity last user modify
     * @return the book entity with activities
     */
    Book updateBookDTOToBookEntity(UpdateBookDTO bookDTO,
                                                  Long id,
                                                  OffsetDateTime dateInsert,
                                                  OffsetDateTime dateModify,
                                                  String lastUserModify);


}
