# 🌱 Trashify 🌱

## Description

Trashify is an application that allows users to create and locate trash bins near them. It provides an easy-to-use interface for managing trash bin locations and finding the nearest ones.

## Mircoservices:

The Trashify app uses one Python gRPC mircoservice to get the nearest location of different coordinates within your city. This is acheived through the SciKit Learn API within the Python environment. The codebase for said mircoservice is sepearetly maintained and can be found on the following link: [click here](https://github.com/Hemit99123/trashify-ai-mirco)!
## Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Caching**: [Memcached](https://memcached.org/) (run on Docker)
- **Google APIs**: Utilized for location services
- **RPC Framework**: [gRPC](https://grpc.io/) Utilized for server to server communication as there is an AI mircoservice used by this app. This AI mircoservice was used to find the nearest coordinates in a list based on current coordinates within the Ball Tree algorithm.

## Features

- **Create Trash Bins**: Users can add new trash bin locations.
- **Find Nearby Trash Bins**: Users can search for trash bins near their current location.
- **Optimized Performance**: Includes database indexing and caching to improve response times and reduce latency.
- **AI Integration**: Using Sci-Kit learn lib, I implemented a Ball Tree algorithm using AI models that were trained!

## Installation

### Prerequisites

- Node.js
- Memcached server
- PostgreSQL server 
- The gRPC microservice running 

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hemit99123/trashify.git
   cd trashify
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add all the variables that are defined in the example file (.env.example) 

4. **Run Memcached in Docker:**

   ```bash
   docker run --name memcached -d memcached
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate deploy
   ```

6. **Start the application:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Database Optimization

To enhance performance, the database has been optimized with indexing. These indexes are declared in the Prisma schema and have been migrated to the SQL database.

## Caching

To reduce latency from Google API calls, Memcached is used to cache frequently accessed data. This setup is managed through Docker for simplicity and scalability. All the logic/code for the caching can be found in ROOT DIRECTORY/utils/cache.ts

## API Documentation

We are using Swagger's UI and commenting system for documentation. Check out any of our backend code for an example on how to document for us! To access our documentation, simply visit `/api-docs` in your environment (whether it is local or production)

## Contributing

If you'd like to contribute to Trashify, please fork the repository and submit a pull request with your changes. We welcome contributions and appreciate your help in improving the application and keeping us FOSS!
