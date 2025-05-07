FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN apk add --no-cache git
ENV LANG C.UTF-8
ENV JAVA_TOOL_OPTIONS -Dfile.encoding=UTF-8

RUN mvn clean package -DskipTests -Dproject.build.sourceEncoding=UTF-8

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]