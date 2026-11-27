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
Food images can be uploaded as JPEG, PNG, or WebP files up to 5 MB and are
stored in `FoodTrial\BackEnd\uploads`. Food prices are entered and displayed in
PKR. Food records also support availability, preparation time, portion size,
ingredients, allergens, descriptive toppings, selectable priced toppings, and
other optional add-ons. Enter selectable toppings and add-ons in the admin food
form one per line as `Name: price`; customers can select them and their prices
are verified and calculated by the backend.
Rider profiles support a delivery zone and an optional profile photo. Keep the
uploads folder persistent in production. Do not commit `.env` or share your
JWT secret.
