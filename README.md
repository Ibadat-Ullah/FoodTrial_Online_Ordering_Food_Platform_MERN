# FoodTrial

## Run locally

1. Start MongoDB locally, or use a MongoDB Atlas connection string.
2. In `FoodTrial\BackEnd`, copy `.env.example` to `.env`, set `MONGODB_URI`, a long random `JWT_SECRET`, and an `ADMIN_SETUP_KEY` for the initial admin account, then run:

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
admin screen and admin-only Food/Rider endpoints. Public food browsing and
customer registration stay available. Set `ADMIN_SETUP_KEY` in `BackEnd\.env`
and enter it during registration to create the first admin account; later
registrations cannot use that key to create another admin. The current setup
supports one admin account; all registrations without the key receive the
customer role. Customers can add database-backed food to their cart, place
cash-on-delivery orders, and view their order history. Admins can update order
statuses. Order totals are calculated from current database prices.
Food and rider images can be uploaded as JPEG, PNG, or WebP files up to 4 MB
and are stored in Cloudinary. Configure `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in the backend environment
before uploading images. Food prices are entered and displayed in PKR. Food
records also support availability, preparation time, portion size,
ingredients, allergens, descriptive toppings, selectable priced toppings, and
other optional add-ons. Enter selectable toppings and add-ons in the admin food
form one per line as `Name: price`; customers can select them and their prices
are verified and calculated by the backend.
Rider profiles support a delivery zone and an optional profile photo. Do not
commit `.env` or share your JWT secret.

## Deploy on Vercel

Deploy the backend and frontend as separate Vercel projects from their
respective GitHub repositories.

### Backend

1. Import the backend repository into Vercel. Keep the project root at the
   repository root, where `server.js` and `package.json` are located. Vercel
   detects the Express app from `server.js`.
2. Add these environment variables to the backend Vercel project:
   `MONGODB_URI`, `JWT_SECRET` (at least 32 characters), `ADMIN_SETUP_KEY`,
   `CLIENT_URL` (the exact frontend origin), `CLOUDINARY_CLOUD_NAME`,
   `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Keep all credentials
   private and out of the frontend project.
3. Deploy and verify `https://<backend-project>.vercel.app/api/health`
   returns a connected database.

Image uploads are capped at 4 MB to stay below Vercel Functions' 4.5 MB
request-body limit, including multipart form data.

If existing Atlas records contain `/uploads/...` image paths, first back up the
database and ensure the corresponding files are in `BackEnd\uploads`. Add
Atlas and Cloudinary credentials to the local backend `.env`, then run
`npm run migrate:images` from `BackEnd` before deploying. This uploads those
files and updates their MongoDB URLs.

### Frontend

1. In the frontend Vercel project, set `VITE_API_URL` to
   `https://<backend-project>.vercel.app/api`.
2. Redeploy the frontend after adding or changing the variable.

The backend’s `CLIENT_URL` must exactly match the deployed frontend origin.
Atlas must allow connections from the backend. Vercel Hobby uses dynamic
outbound IPs, so fixed-IP allow-listing requires a Vercel plan with Static IPs;
check Vercel and Atlas networking options before production use.
