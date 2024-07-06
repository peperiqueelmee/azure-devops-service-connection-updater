# Azure DevOps Service Connection Updater

## Overview

This repository contains a Node.js application designed to update service connections in Azure DevOps across multiple projects. The application fetches all projects in your Azure DevOps organization, lists the service connections of specific types (`azurerm` and `dockerregistry`), and updates them.

By default, the service connections updated are of types `azurerm` and `dockerregistry`. If you want to modify the types of service connections being updated, you can do so by editing the array `serviceConnectionTypes` in `src/config/apiConfig.js` to include the desired types.

## Prerequisites

Ensure you have the following before you begin:
- Node.js (version 18 or higher)
- Docker (if you plan to use the Docker image)
- An Azure DevOps account with necessary permissions

## Permissions Required

The PAT (Personal Access Token) used needs the following permissions in Azure DevOps:
* Project and Team: Read & Write
* Service Connection: Read, Query & Manage

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```env
ORGANIZATION=<your_organization>
USERNAME=<your_username>
PAT=<your_pat>
```

- `ORGANIZATION`: Your Azure DevOps organization name.
- `USERNAME`: Your Azure DevOps username.
- `PAT`: Your Azure DevOps Personal Access Token (PAT) with the necessary permissions.

## How to Use

### Running Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/azure-devops-service-connection-updater.git
   cd azure-devops-service-connection-updater
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables as described above.

4. Run the application:
   ```sh
   npm start
   ```

### Running with Docker

1. Build the Docker image:
   ```sh
   docker build -t azure-devops-service-connection-updater .
   ```

2. Run the Docker container:
   ```sh
   docker run -e ORGANIZATION=<your_organization> -e USERNAME=<your_username> -e PAT=<your_pat> azure-devops-service-connection-updater
   ```

## Docker Hub

You can find the Docker image on Docker Hub:
[https://hub.docker.com/repository/docker/peperiquelmee/azure-devops-service-connection-updater/general](https://hub.docker.com/repository/docker/peperiquelmee/azure-devops-service-connection-updater/general)