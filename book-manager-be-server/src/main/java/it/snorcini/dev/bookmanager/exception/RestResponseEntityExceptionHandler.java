package it.snorcini.dev.bookmanager.exception;

import it.snorcini.dev.bookmanager.dto.BookManagerBaseResponse;
import it.snorcini.dev.bookmanager.result.BookManagerResults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Centralized exceptions handler for the book manager.
 */
@Slf4j
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Overrides the default handler for MethodArgumentNotValidException.
     * Replies always with 400 Bad request.
     *
     * @param exception the intercepted exception
     * @param headers   request headers
     * @param status    the HTTP status
     * @param request   web request
     * @return response entity
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException exception,
                                                                  final HttpHeaders headers,
                                                                  final HttpStatus status,
                                                                  final WebRequest request) {
        logger.debug("Field validation failed: Bad request exception", exception);
        return instantiateResponse(exception,
                exception.getBindingResult().getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.toList()),
                request);
    }

    /**
     * Handler for ConstraintViolationException.
     * Replies always with 400 Bad Request.
     *
     * @param exception the intercepted exception
     * @param request   web request
     * @return response entity
     */
    @ExceptionHandler(value = {ConstraintViolationException.class})
    protected ResponseEntity<Object> handleGenericError(final ConstraintViolationException exception,
                                                        final WebRequest request) {
        // 1. Returns the response object initialized with the error result code and result infos
        logger.error("Validation failed: Bad request exception", exception);
        return instantiateResponse(exception,
                exception.getConstraintViolations().stream().map(ConstraintViolation::getMessage)
                        .collect(Collectors.toList()),
                request);
    }

    /**
     * Handler for BookManagerServiceException.
     * Replies always with 200 OK.
     *
     * @param exception the intercepted exception
     * @param request   web request
     * @return response entity
     */
    @ExceptionHandler(value = {BookManagerServiceException.class})
    protected ResponseEntity<Object> handleGenericError(final BookManagerServiceException exception,
                                                        final WebRequest request) throws NoSuchMethodException,
            IllegalAccessException,
            InvocationTargetException,
            InstantiationException {
        // 1. Returns the response object initialized with the error result code and result infos
        logger.error("Managed exception has been caught", exception);
        return handleExceptionInternal(exception,
                exception.getResponseClass()
                        .getConstructor(Integer.class, String.class, List.class)
                        .newInstance(exception.getBookManagerResults().getResultCode(),
                                exception.getBookManagerResults().getResultMessage(),
                                exception.getResultInfo()),
                new HttpHeaders(),
                HttpStatus.OK,
                request);
    }

    /**
     * Instantiates Response from Exception, errorList and WebRequest.
     *
     * @param exception the handled exception
     * @param errorList the error list to be returned
     * @param request   the WebRequest
     * @return the instantiated BookManagerBaseResponse
     */
    private ResponseEntity<Object> instantiateResponse(final Exception exception,
                                                       final List<String> errorList,
                                                       final WebRequest request) {
        // 1. Instantiates new Response from Exception, the error List and the webRequest
        return handleExceptionInternal(exception,
                this.instantiateBookManagerBaseResponse(
                        BookManagerResults.INVALID_REQUEST,
                        errorList),
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST,
                request);
    }

    /**
     * Instantiates new BookManagerBaseResponse.
     *
     * @param result     the operation result
     * @param resultInfo the result's detailed info
     * @return the instantiated BookManagerBaseResponse
     */
    protected BookManagerBaseResponse instantiateBookManagerBaseResponse(final BookManagerResults result,
                                                                                 final List<String> resultInfo) {
        // 1. Instantiates new BookManagerBaseResponse from Result and resultInfo
        return new BookManagerBaseResponse(result.getResultCode(), result.getResultMessage(), resultInfo);
    }
}
