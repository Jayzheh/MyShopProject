# My Shop API - E-commerce Platform

## Project Overview
**My Shop** is an e-commerce platform built using Javascript, Vue.js, and Docker. It features a user authentication system, an admin interface for product, category, and user management, and a client-facing page displaying all products. This platform is designed to be responsive and optimized for various devices.

## Running the Project on Any Machine (Mac and Windows)

### For Mac:
1. **Install Docker Desktop for Mac**: Ensure Docker Desktop is installed and running to manage the application containers.
2. **Clone the Repository**: Clone the project repository to your local machine.
3. **Open Terminal**: Navigate to the project directory in the terminal.
4. **Enter Docker Directory**: `cd docker` to switch to the Docker environment directory.
5. **Build and Start Containers**: Run `docker-compose up -d --build` to build and start the Docker containers.
6. **Check Container Status**: Access http://localhost/ in your browser to verify if the containers are up and running.

### For Windows:
1. **Install Docker Desktop for Windows**: Ensure Docker Desktop is installed and running.
2. **Clone the Repository**: Clone the project repository to your local machine.
3. **Open Command Prompt or PowerShell**: Navigate to the project directory.
4. **Enter Docker Directory**: `cd docker` to access the Docker files.
5. **Build and Start Containers**: Execute `docker-compose up -d --build` to initialize the Docker containers.
6. **Verify Running Containers**: Visit http://localhost/ to confirm the containers are operational.

## Testing with Postman

1. **Launch Postman**: Open Postman on your machine.
2. **Configure API Request**: Set up a new request to your API's endpoint, such as `http://localhost/api/users` for user data.
3. **Authentication**: Include authentication tokens or credentials in the request header if required by your API.
4. **Send Request**: Execute the request and analyze the response.
5. **Test Various Endpoints**: Utilize different endpoints to fully test your API's functionalities.
6. **Experiment with Request Methods**: Create requests to test various HTTP methods like POST, PUT, DELETE as per your API's design.

Replace `http://localhost/` and `http://localhost/api/users` with your actual API URLs if they differ.
# My Shop API

## Prerequisites

- Docker and Docker Compose

## Installation

1) First, go into "*docker*" folder and run "*docker-compose up -d --build*" to install the environment
2) Now all your 4 containers should be running (it can take up to 1 minute before container are loaded: if you have the symfony default page on http://localhost/ that mean everything has been loaded correctly and you can pursue). Now you can go inside PHP container and follow the next steps.
3) Inside your PHP container, run "*bin/console doctrine:database:create*" (you should see a success message)
4) Then run "*bin/console doctrine:migrations:migrate*" to update your database
5) To use auth system you also run this "*bin/console lexik:jwt:generate-keypair*"
6) Last thing to do is to run "*bin/console app:add-user*" and follow the process to have your first user on the project.

## Manage Server

Here is the two commands to start and stop your docker environment:

- *docker-compose up -d* -> run docker containers
- *docker-compose down* -> stop docker containers

From there you can find the documentation to the API at the following url: *http://localhost/api/docs*