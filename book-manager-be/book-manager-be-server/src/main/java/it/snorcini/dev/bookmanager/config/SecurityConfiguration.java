package it.snorcini.dev.bookmanager.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

/**
 * Main spring configuration class.
 */
@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    /**
     * Spring security configuration method.
     *
     * @param http spring http security config
     * @throws Exception authorize requests exception
     */
    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        // Note:
        // Note that the CSRf token is enabled for all requests (change it as you wish...)
        var corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization",
                "Content-Type",
                "Strict-Transport-Security",
                "X-Content-Security-Policy",
                "X-Frame-Options",
                "X-XSRF-TOKEN"));
        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        corsConfiguration.setExposedHeaders(List.of("Authorization"));

        http.cors().configurationSource(request -> corsConfiguration)
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
                .authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .anyRequest().authenticated().and()
                .oauth2ResourceServer().jwt();
        return http.build();
    }
}
