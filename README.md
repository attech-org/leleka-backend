## Getting started

1. Clone this repo to your local machine
2. Create _.env_ file from _.env.example_:
   ```sh
   cp .env.example .env
   ```
3. Ask team lead for missing variables
4. Install dependencies:
   ```sh
   npm i
   ```
5. Run project:
   ```sh
   npm run dev
   ```
6. Api:

- Registration - post: 127.0.0.1:3001/api/auth/register
- Log in - post: 127.0.0.1:3001/api/auth/login
- Refresh access token - post: 127.0.0.1:3001/api/auth/refresh
- test authorized - get: 127.0.0.1:3001/api/testAuthorized
