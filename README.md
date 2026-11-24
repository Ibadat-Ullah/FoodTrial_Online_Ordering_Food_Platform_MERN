# FoodTrial

## Run locally

1. Start MongoDB locally, or use a MongoDB Atlas connection string.
2. In `FoodTrial\BackEnd`, copy `.env.example` to `.env`, set `MONGODB_URI`, then run:

   ```sh
   npm install
   npm run dev
   ```

3. In `FoodTrial\FrontEnd`, run:

   ```sh
   npm install
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000`. The API implements food
and rider CRUD. Login and registration remain frontend-only.
