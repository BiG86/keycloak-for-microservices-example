package it.snorcini.dev.bookmanager.error;

/**
 * Book manager Validation Error Codes complete list.
 */
public final class BookManagerValidationErrors {
    public static final String ORDER_DIRECTION_INVALID = "bookmanager.be.order.direction.invalid";
    public static final String ORDER_BY_INVALID = "bookmanager.be.order.by.invalid";
    public static final String PAGE_LESS_THAN_ZERO = "bookmanager.be.page.negative";
    public static final String SIZE_NOT_POSITIVE = "bookmanager.be.size.not.positive";
    public static final String EMPTY_ID = "bookmanager.be.id.empty";
    public static final String ISBN_NULL = "bookmanager.be.book.isbn.null";
    public static final String EMPTY_DATE_INSERT = "bookmanager.be.date.insert.empty";
    public static final String EMPTY_DATE_MODIFY = "bookmanager.be.date.modify.empty";
    public static final String EMPTY_LAST_USER_MODIFY = "bookmanager.be.lastusermodify.empty";
    public static final String LAST_USER_MODIFY_TOO_LONG = "bookmanager.lastusermodify.toolong";
    public static final String BOOK_ID_NULL = "bookmanager.be.book.id.null";
    public static final String TITLE_NULL = "bookmanager.be.book.title.null";
    public static final String AUTHOR_NULL = "bookmanager.be.book.author.null";
    public static final String ACTIVITIES_NULL = "bookmanager.be.activities.null";

    private BookManagerValidationErrors() {
    }
}
