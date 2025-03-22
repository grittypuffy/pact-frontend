<h1>PACT: Prompt Auto-Correction and Testing</h1>
<h6>"A golden gateway to improve prompt-engineering skills of the users."</h6>

# Frontend Development

Run the frontend locally by using Next.js development server

```shell
git clone https://github.com/grittypuffy/pact-frontend
cd pact-frontend
```

# Install dependencies
```shell
yarn install
```

# Start development server. 
Should be accessible at https://localhost:3000/ 
```shell
yarn dev --experimental-https 
```
Build the frontend and preview it by

```shell
yarn build
yarn start
```
## Docker

1. Build the Docker image using the following command:

```shell
docker buildx build -t pact-frontend:latest .
```

2. Deploy it using docker run command or by pushing to a container registry (Azure Container Registry or Docker Hub) by tagging the image appropriately.