package it.snorcini.dev.bookmanager.error;

/**
 * Otp manager admin Validation Error Codes complete list.
 */
public final class BookManagerValidationErrors {
    public static final String ORDER_DIRECTION_INVALID = "otpmanager.admin.be.order.direction.invalid";
    public static final String ORDER_BY_INVALID = "otpmanager.admin.be.order.by.invalid";
    public static final String PAGE_LESS_THAN_ZERO = "otpmanager.admin.be.page.negative";
    public static final String SIZE_NOT_POSITIVE = "otpmanager.admin.be.size.not.positive";
    public static final String EMPTY_BODY = "otpmanager.admin.be.body.empty";
    public static final String EMPTY_CODE = "otpmanager.admin.be.code.empty";
    public static final String EMPTY_ID = "otpmanager.admin.be.id.empty";
    public static final String CODE_DESCRIPTION_DTO_NULL = "otpmanager.admin.be.codedescriptiondto.null";
    public static final String DESCRIPTION_TOO_LONG = "otpmanager.admin.be.description.toolong";
    public static final String CODE_TOO_LONG = "otpmanager.admin.be.code.toolong";
    public static final String EMPTY_DATE_INSERT = "otpmanager.admin.be.date.insert.empty";
    public static final String EMPTY_DATE_MODIFY = "otpmanager.admin.be.date.modify.empty";
    public static final String EMPTY_LAST_USER_MODIFY = "otpmanager.admin.be.lastusermodify.empty";
    public static final String LAST_USER_MODIFY_TOO_LONG = "otpmanager.admin.lastusermodify.toolong";
    public static final String TEMPLATE_REQUIRED_NULL = "otpmanager.admin.templaterequired.null";
    public static final String CONTACT_TYPE_ID_NULL = "otpmanager.admin.be.contacttypeid.null";
    public static final String APPLICATION_ID_NULL = "otpmanager.admin.be.application.id.null";
    public static final String CHANNEL_ID_NULL = "otpmanager.admin.be.channel.id.null";
    public static final String ALGORITHM_ID_NULL = "otpmanager.admin.be.algorithm.id.null";
    public static final String OTP_SIZE_NOT_POSITIVE = "otpmanager.admin.be.algorithm.otpsize.not.positive";
    public static final String OTP_SIZE_NULL = "otpmanager.admin.be.algorithm.otpsize.null";

    public static final String CONFIGURATION_ID_NULL = "otpmanager.admin.be.configuration.id.null";
    public static final String OPERATION_TYPE_ID_NULL = "otpmanager.admin.be.operationtype.id.null";
    public static final String SERVICE_TYPE_ID_NULL = "otpmanager.admin.be.servicetype.id.null";
    public static final String ACTIVITIES_NULL = "otpmanager.admin.be.activities.null";
    public static final String ENCRYPTION_ENCRYPTION_ALGORITHM_BLANK =
            "otpmanager.admin.be.encryption.encryptionAlgorithm.blank";
    public static final String ENCRYPTION_ID_NULL = "otpmanager.admin.be.encryption.id.null";
    public static final String ENCRYPTION_ENCRYPTION_ALGORITHM_TOO_LONG =
            "otpmanager.admin.be.encryption.encryptionAlgorithm.toolong";
    public static final String TEMPLATE_ID_NULL = "otpmanager.admin.be.template.id.null";
    public static final String DOMAIN_NULL = "otpmanager.admin.be.domain.null";
    public static final String DOMAIN_TOO_LONG = "otpmanager.admin.be.domain.toolong";
    public static final String BOOLEANVALUE_INVALID = "otpmanager.admin.be.booleanvalue.invalid";
    public static final String PEC_DOMAIN_ID_NULL = "otpmanager.admin.be.pecdomain.id.null";
    public static final String PEC_DOMAIN_ISPEC_NULL = "otpmanager.admin.be.pecdomain.ispec.null";
    public static final String EXPIRE_IN_NULL = "otpmanager.admin.be.expirein.null";
    public static final String MAXIMUM_CONCURRENT_OPERATIONS_NULL =
            "otpmanager.admin.be.maximumconcurrentoperations.null";
    public static final String MAXIMUM_RETRY_COUNT_NULL =
            "otpmanager.admin.be.maximumretrycount.null";
    public static final String MINIMUM_POLLING_INTERVAL_NULL =
            "otpmanager.admin.be.minimumpollinginterval.null";
    public static final String MINIMUM_CREATION_INTERVAL_NULL =
            "otpmanager.admin.be.minimumcreationinterval.null";
    public static final String EXPIRE_IN_NOT_POSITIVE = "otpmanager.admin.be.expirein.not.positive";
    public static final String MAXIMUM_CONCURRENT_OPERATIONS_NOT_POSITIVE =
            "otpmanager.admin.be.maximumconcurrentoperations.not.positive";
    public static final String MAXIMUM_RETRY_COUNT_NOT_POSITIVE =
            "otpmanager.admin.be.maximumretrycount.not.positive";
    public static final String MINIMUM_POLLING_INTERVAL_LESS_THAN_ZERO =
            "otpmanager.admin.be.minimumpollinginterval.negative";
    public static final String MINIMUM_CREATION_INTERVAL_LESS_THAN_ZERO =
            "otpmanager.admin.be.minimumcreationinterval.negative";


    private BookManagerValidationErrors() {
    }
}
