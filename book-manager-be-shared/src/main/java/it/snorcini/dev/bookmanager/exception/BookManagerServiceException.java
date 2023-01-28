package it.snorcini.dev.bookmanager.exception;

import it.snorcini.dev.bookmanager.result.BookManagerResults;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * This exception is throwable by any OtpManagerAdmin service.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookManagerServiceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private BookManagerResults bookManagerResults;
    private List<String> resultInfo;
    private Class responseClass;


    public BookManagerServiceException(final BookManagerResults bookManagerResults,
                                      final List<String> resultInfo,
                                      final Class responseClass,
                                      final Exception e) {
        super(e);
        this.bookManagerResults = bookManagerResults;
        this.resultInfo = resultInfo;
        this.responseClass = responseClass;

    }


}
