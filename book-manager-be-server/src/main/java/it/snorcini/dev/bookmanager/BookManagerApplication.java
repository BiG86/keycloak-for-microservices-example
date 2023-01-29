package it.snorcini.dev.bookmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * Main executable class.
 */
@SpringBootApplication(exclude = {
        MultipartAutoConfiguration.class
})
@EnableFeignClients(basePackages = {"it.snorcini.dev.shared", "it.snorcini.dev.bookmanager.feign"})
@EnableCaching
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
