# mizya_bank

A full-stack banking application designed to manage accounts and track transactions efficiently.

---

## 🚀 Getting Started

This project is intended to be run in a local development environment. Follow the steps below to get the application up and running.

### 📋 Prerequisites

Before starting, make sure you have the following installed:
* **XAMPP** (with Apache and MySQL modules)
* **Composer** (PHP dependency manager)
* **Node.js & npm** (JavaScript runtime and package manager)
* **Angular CLI** (`npm install -g @angular/cli`)

---

## 🛠️ Installation & Setup

### 1. Database Configuration
1. Open **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Create a new database named `banca`.
4. Open the `init.sql` file from the repository, copy the code, and paste it into the **SQL** tab of the `banca` database to create the schema.

### 2. Backend Setup (PHP)
1. Move the `php` folder from `mini_banking_api` to your XAMPP web root: `C:\xampp\htdocs\`.
2. Open your terminal in the `mini_banking_api` folder.
3. Install dependencies by running:
   ```bash
   composer update
   composer install
   ```

### 3. Frontend Setup (Angular)
1. Open your terminal in the `mizya-bank-frontend` folder.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Once the build is complete, open your browser at [http://localhost:4200](http://localhost:4200).

---

## 📂 Project Structure

* **mini_banking_api**: PHP-based backend handling the database logic and API requests.
* **mizya-bank-frontend**: Angular-based frontend providing a dynamic user interface.
* **init.sql**: The SQL script required to initialize the database structure.

---

## 📝 License
This project is for educational purposes. Feel free to explore and modify the code.
