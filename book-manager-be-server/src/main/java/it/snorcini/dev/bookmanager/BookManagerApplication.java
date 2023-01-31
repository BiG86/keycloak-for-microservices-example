package it.snorcini.dev.bookmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;

/**
 * Main executable class.
 */
@SpringBootApplication(exclude = {
        MultipartAutoConfiguration.class
})
public class BookManagerApplication {

    /**
     * Application starter.
     *
     * @param args application arguments
     */
    public static void main(final String[] args) {
        SpringApplication.run(BookManagerApplication.class, args);
    }
}
