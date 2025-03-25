# Home Stock Management System

A modern home stock management system built with Node.js, SQLite, and deployed using Docker and Kubernetes. This project implements a microservices architecture with a RESTful API backend and a persistent database layer.

## Project Overview

This system helps manage inventory items with features including:
- RESTful API endpoints for CRUD operations
- SQLite database for data persistence
- Docker containerization
- Kubernetes orchestration
- Automated CI/CD pipeline
- Nginx ingress for routing

## Architecture

The project follows a microservices architecture with the following components:

- **Backend API Service**: Node.js REST API service
- **Database Service**: SQLite database for data storage
- **Nginx Ingress**: For routing and load balancing

## Prerequisites

- Node.js (v14 or higher)
- Docker
- Kubernetes cluster (local or cloud)
- kubectl CLI tool

## Local Development

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DevOps_20rp17453
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run migrate
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Docker Development

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

## API Endpoints

- `GET /api/items` - List all stock items
- `POST /api/items` - Create a new item
- `GET /api/items/:id` - Get item details
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## Kubernetes Deployment

### Components

1. **Backend API Deployment**
   - 3 replicas for high availability
   - Resource limits and requests configured
   - Liveness and readiness probes

2. **Database Deployment**
   - Persistent volume claim for data storage
   - Single replica (SQLite limitation)

3. **Nginx Ingress**
   - Routes traffic to appropriate services
   - Handles path-based routing

### Deployment Steps

1. Apply Kubernetes manifests:
   ```bash
   kubectl apply -f k8s/database.yaml
   kubectl apply -f k8s/backend.yaml
   kubectl apply -f k8s/nginx-ingress.yaml
   ```

2. Verify deployments:
   ```bash
   kubectl get pods
   kubectl get services
   kubectl get ingress
   ```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **Build Stage**:
   - Runs tests
   - Builds Docker image
   - Pushes to container registry

2. **Deploy Stage**:
   - Deploys to Kubernetes cluster
   - Updates services
   - Performs health checks

## Project Structure

```
├── config/           # Configuration files
├── data/            # Database files
├── k8s/             # Kubernetes manifests
├── middleware/      # Express middleware
├── migrations/      # Database migrations
├── models/          # Data models
├── scripts/         # Utility scripts
├── services/        # Business logic
├── tests/           # Test files
└── server.js        # Application entry point
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is called **Home stock Management System** it is a part of a class assissment for the **BTech_IT 2024-2025** program at Tumba college.  
The code is provided for educational purposes under the following terms:

1. **Academic Use**:  
- Free to use, modify, and study for educational purposes.
 2. **Restrictions**:  
   - Commercial use is prohibited without permission.
   - The institution ("Tumba College of technology") retains the right to showcase this work as part of its curriculum.
   3. **Attribution**:  
   
   Copyright (c) 2025 Names:Andre NDAYIZEYE, Regno:24RP14753
  College: Tumba College ("Btech_IT")