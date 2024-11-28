# Backend Build Guide

This guide will walk you through the steps to build and run the backend for the project.

## Environment Requirements

Before you proceed, make sure you have the following tools installed on your machine:

1. **Docker**  
   Used to run MySQL in a containerized environment.  
   - Version: **8.0.36-debian** (MySQL server)
   
2. **MySQL Workbench**  
   A GUI tool to manage MySQL databases.  
   - Make sure you install the latest version of **MySQL Workbench**.

3. **IntelliJ IDEA**  
   Used for editing and running the Java Spring application.  
   - Make sure you have **IntelliJ IDEA** installed (Community or Ultimate edition).

4. **Java Spring Framework**  
   The backend is built using the **Spring Framework** with Java. Ensure you have **JDK 11 or higher** installed.

---

## Steps to Build the Backend

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/repository-name.git
```
### Step 2: Set Up Docker for MySQL

We will use Docker to run a MySQL instance for the backend.

Pull the MySQL Docker image:

```bash
docker pull mysql:8.0.36-debian
```
Create and run a MySQL container:
```bash
docker run --name mysql-backend -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0.36-debian
```
Replace rootpassword with your desired root password.
Replace your_database with the name of your database.

Check if the MySQL container is running:
```bash
docker ps
```
This will display all running containers. Your MySQL container should appear in the list.

### Step 3: Configure MySQL Workbench

Open MySQL Workbench and set up a new connection to your MySQL Docker container.

Use the following connection details:

        Hostname: 127.0.0.1
        Port: 3306
        Username: root
        Password: root (or whatever you used in Step 2)

Test the connection to ensure it's working properly.

### Step 4: Import Database Schema (if applicable)

Create a database schema name: identity_service

Or

If the project includes a .sql file for setting up the schema, import it using MySQL Workbench:

  + Open MySQL Workbench.
  
  + Navigate to File → Open SQL Script and select the .sql file.
  
  + Run the script to create the necessary database tables and structures.

### Step 5: Set Up the Spring Framework Project
  Open IntelliJ IDEA and import the project:
        
  + If it's a Gradle project, select "Import Project" and choose the build.gradle file.

  + Make sure your JDK version is set to 11 or higher:
        
     - Navigate to File → Project Structure → Project and set the Project SDK to JDK 11.

  + Configure MySQL connection: Edit your `src/main/resources/application.properties` (or application.yml) to configure your MySQL connection. Example:

        spring.datasource.url=jdbc:mysql://localhost:3306/identity_service
        spring.datasource.username=root
        spring.datasource.password=root
        spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  + Replace your_database with the database you created in Docker.
  + Replace rootpassword with the root password you set up for MySQL.

  Make sure your build.gradle (for Gradle) includes the necessary dependencies for MySQL and Spring Data JPA.


Gradle example (build.gradle):
```buid.grade
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'mysql:mysql-connector-java'
}
```

### Step 6: Build and Run the Application

Run the Spring Boot application:

In IntelliJ IDEA, navigate to the main application class (usually located in src/main/java/com/yourpackage/Application.java) and click the "Run" button.

Alternatively, you can run the following command from the terminal (for Maven):
```bash
./mvnw spring-boot:run
```
Or if you're using Gradle:

```bash
./gradlew bootRun
```
The backend should now be running, and you can access the application via `http://localhost:8080` (or the port you've configured).

### Step 7: Test the API

Once the backend is up and running, you can test the API endpoints using tools like Postman or Insomnia.

---

## Troubleshooting

+ MySQL Connection Issues: Make sure the MySQL Docker container is running (docker ps) and the database connection details in application.properties are correct.

+ Port Conflicts: If you can't connect to MySQL, check if another application is using port 3306. You can change the port in the docker run command if necessary.

+ IntelliJ Configuration: Ensure the correct JDK version is selected, and that dependencies are imported correctly. You can also try Reimporting Maven/Gradle Projects.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
