package it.snorcini.dev.bookmanager.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Constraint validator to validate field expected to respect predefined patterns.
 */
@Documented
@Constraint(validatedBy = PatternConstraintValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface PatternConstraint {

    PatternConstraintValidator.PatternConstraintFieldEnum fieldType();
    String message() default "bookmanager.be.format.wrong";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
