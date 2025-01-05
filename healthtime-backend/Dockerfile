FROM maven:3.8.4-openjdk-17 AS builder  
WORKDIR /app  

COPY ./pom.xml ./  
RUN mvn dependency:go-offline  

COPY ./src ./src  
RUN mvn clean package -DskipTests  

FROM openjdk:17-jdk-alpine  
VOLUME /tmp  
COPY --from=builder /app/target/*.jar app.jar  


EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app.jar"]
