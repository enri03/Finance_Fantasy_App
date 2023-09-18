# Finance Fantasy App

## Project Setup

### Backend Setup

1. **Start Apache and MySQL**

2. **Set up backend:**

   - CD to the `backend` folder.
   - Ensure that the `.env` variables match your MySQL database configuration:

     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3307
     DB_DATABASE=laravel
     DB_USERNAME=root
     DB_PASSWORD=
     ```

   - Run the following database seeder commands (make sure to run them in the same order as provided):

     ```bash
     php artisan db:seed --class=UsersTableSeeder # Default user's password is 'password123'.
     php artisan db:seed --class=StockSeeder
     php artisan db:seed --class=TransactionsTableSeeder
     ```

   - To run the application, execute the following command:

     ```bash
     php artisan serve
     ```

   - Note: If you want to create your own user, you can use the following route (http://localhost:8000/api/add-new-client) with Postman. Make sure to provide these body parameters: `name`, `email`, `password`, and `balance`.

### Frontend Setup

1. **CD to frontend**

2. **Install Dependencies**

   - Run the following command to install the necessary dependencies:

     ```bash
     npm install
     ```

3. **Start the Application**

   - To start the frontend application, run:

     ```bash
     npm start
     ```

   - The app should now be up and running at [http://localhost:3000/](http://localhost:3000/). By default, a user login form will be displayed. You can log in using the following credentials: 
     - Email: user1@example.com
     - Password: password123
