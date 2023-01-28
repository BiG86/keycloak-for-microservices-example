FROM adoptopenjdk/openjdk11-openj9:jdk-11.0.10_9_openj9-0.24.0-alpine-slim

RUN set -x

RUN mkdir -p /book/bin /book/lib /book/conf && \
    apk add --no-cache bash curl wget busybox-extras

COPY $PROJECT_DIR/book-manager-be-server/target/*.jar /book/lib/
COPY $PROJECT_DIR/book-manager-be-server/target/classes/application.yml /book/conf/
COPY $PROJECT_DIR/book-manager-be-server/target/classes/logback-spring.xml /book/conf/

RUN find /book/lib -type f -iname 'book-manager-be*jar' -exec mv '{}' '/book/bin/book-manager-be.jar' ';'

EXPOSE 8080

COPY cicd/startup.sh /book/bin
RUN chmod 755 /book/bin/startup.sh
CMD ["/book/bin/startup.sh"]
