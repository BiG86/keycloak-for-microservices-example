FROM adoptopenjdk/openjdk11-openj9:jdk-11.0.10_9_openj9-0.24.0-alpine-slim

ARG JAR_FILE
ADD target/${JAR_FILE} /usr/book-manager-be-server.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/book-manager-be-server.jar"]
