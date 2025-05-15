# Food_Ordering_Website

Foodapp Project Setup
This guide explains how to set up the foodapp project locally, including cloning the repository, installing dependencies, importing the MySQL database, and running the application.
Prerequisites

Git: Install from git-scm.com.
MySQL: Install from MySQL Downloads. Ensure MySQL is in your system PATH.
Project Dependencies: Ensure you have the required runtime (e.g., Node.js, Python, PHP) installed. See "Install Dependencies" below for details.
Database Dump: Download the database_dump.sql file from [insert secure file-sharing link, e.g., Google Drive or Dropbox].

Setup Instructions
1. Clone the Repository
Clone the project to your local machine:
git clone https://github.com/your-username/your-repo.git
cd your-repo

Replace https://github.com/your-username/your-repo.git with the actual repository URL.


2. Install Dependencies
Install the project’s dependencies based on the tech stack:

For Node.js:npm install



Check for any additional setup steps in the project’s documentation (e.g., setting up a virtual environment).


3. Install MySQL

Ensure MySQL is installed and accessible. Verify by running:mysql --version


If MySQL is not recognized, add the MySQL bin directory to your PATH:
Windows: Add C:\Program Files\MySQL\MySQL Server 8.0\bin to System PATH via “Environment Variables” in System Settings.
Linux/Mac: Add to PATH in ~/.bashrc or ~/.zshrc:export PATH=$PATH:/usr/local/mysql/bin



Restart your terminal after updating PATH.


4. Import the MySQL Database

Download the Database Dump: Get database_dump.sql from [insert secure file-sharing link].
Create a Database:Log in to MySQL:

mysql -u your-username -p

Enter your MySQL password, then create the database:

CREATE DATABASE foodapp;
EXIT;


Import the Dump File: Import database_dump.sql into the foodapp database:

mysql -u your-username -p foodapp < path/to/database_dump.sql


Replace your-username with your MySQL username (e.g., root).
Replace path/to/database_dump.sql with the file’s location (e.g., ~/Downloads/database_dump.sql or C:\Users\YourName\Downloads\database_dump.sql).
Enter your MySQL password when prompted.


Verify the Import:Check that the database was imported correctly:mysql -u your-username -p

USE foodapp;
SHOW TABLES;

You should see the tables from the foodapp database.

5. Run the Project
Start the application:

Node.js:npm start


Access the app in your browser (e.g., http://localhost:3000 or http://localhost:8000, depending on the project).
Test the application to confirm it connects to the foodapp database (e.g., check if data loads correctly).
Troubleshooting

MySQL Not Recognized:Ensure MySQL is installed and the bin directory is in your PATH (see Step 3).
Access Denied:If mysql -u your-username -p fails, verify your username and password. Reset the password if needed:mysqladmin -u your-username -p password


Empty Database:If SHOW TABLES; shows no tables, re-run the import and ensure database_dump.sql is not empty (open it in a text editor to check).
Connection Errors:If the app fails to connect to the database, verify the credentials in the configuration file and ensure MySQL is running:net start mysql  # Windows
sudo service mysql start  # Linux


Dependency Issues:If dependency installation fails, ensure you have the correct runtime (e.g., Node.js, Python, PHP) installed. Check the error message for specifics.

