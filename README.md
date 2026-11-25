# FoodTrial

## Run locally

1. Start MongoDB locally, or use a MongoDB Atlas connection string.
2. In `FoodTrial\BackEnd`, copy `.env.example` to `.env`, set `MONGODB_URI` and a long random `JWT_SECRET`, then run:

   ```sh
   npm install
   npm run dev
   ```

3. In `FoodTrial\FrontEnd`, run:

   ```sh
   npm install
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000`. Register and log in
through the app; passwords are hashed in the backend, and JWTs protect the
admin screen and Food/Rider write endpoints. Public food listing stays available.
Do not commit `.env` or share your JWT secret.
