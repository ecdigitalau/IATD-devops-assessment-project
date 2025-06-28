
# Intro to DevOps Assessment 

This project provides a Docker image specifically built to run unit tests for the Node.js application.

---

## 🧪 Running the Test Docker Image

The test image is published to Docker Hub and can be pulled and run directly.

### ✅ Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- Internet connection to download the image

---

### 🚀 Run the Test Image

Use this command to run the tests inside the container:

```bash
docker run --rm ecdigital/earnest-thomas-intro-to-devops-a2:test-latest
```

---

## 🐳 Running the User-Facing Docker Image

This project provides a user-facing Node.js application packaged in a Docker container. The application displays an interactive menu using `readline-sync`.
The image is published to Docker Hub and can be pulled and run directly.

### ✅ Prerequisites

- [Docker](https://docs.docker.com/get-docker/) must be installed
- Internet connection to download the image

---

### 🚀 Run the Image

Use the following command to run the application:

```bash
docker run -it --rm ecdigital/earnest-thomas-intro-to-devops-a2:user-latest
```

