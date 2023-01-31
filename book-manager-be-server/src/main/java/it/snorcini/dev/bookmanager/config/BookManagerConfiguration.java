package it.snorcini.dev.bookmanager.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Main spring configuration class.
 */
//@AllArgsConstructor
@Configuration
@EnableWebMvc
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "it.snorcini.dev.bookmanager.repository")
@EntityScan(basePackages = "it.snorcini.dev.bookmanager.entity")
public class BookManagerConfiguration implements WebMvcConfigurer {

//    @Bean
//    public DataSource getDataSource() {
//        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
//        return dataSourceBuilder.build();
//    }

//    @Bean
//    public EntityManagerFactory entityManagerFactory() {
//
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setGenerateDdl(true);
//
//        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
//        factory.setJpaVendorAdapter(vendorAdapter);
//        factory.setPackagesToScan("it.snorcini.dev.bookmanager");
//        factory.setDataSource(getDataSource());
//        factory.afterPropertiesSet();
//
//        return factory.getObject();
//    }

//    @Override
//    public void configureMessageConverters(final List<HttpMessageConverter<?>> converters) {
//        converters.add(new MappingJackson2HttpMessageConverter(objectMapper()));
//    }

    /**
     * Customization for mapping of date/timestamp
     */
//    private static ObjectMapper objectMapper() {
//        return new ObjectMapper()
//                .disable(WRITE_DATES_AS_TIMESTAMPS)
//                .registerModule(new JavaTimeModule());
//    }
}
