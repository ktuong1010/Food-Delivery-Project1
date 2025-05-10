// Importing the UserModel to interact with the user database
const UserModel = require('../models/userModel');

class LoginController {

    // Method to handle user authentication
    async authentication(req, res) {
        try {
            // Extracting username and password from the request body
            const { username, password } = req.body;

            // Basic input validation to ensure both fields are provided
            if (!username || !password) {
                return res.status(400).send('Username and password are required'); // Return 400 if inputs are missing
            }

            // Check if the user exists in the database with the provided credentials
            const user = await UserModel.findUserByCredentials(username, password);

            if (user) {
                // If user is found, store their details in the session
                req.session.user = {
                    id: user.id, // User ID
                    username: user.username, // Username
                    isAdmin: user.isAdmin // Admin status
                };
                console.log('User logged in:', req.session.user); // Log the session data for debugging

                // Redirect based on user role: Admins go to '/me', regular users go to '/user'
                return res.redirect(user.isAdmin ? '/me' : '/user');
            } else {
                // If credentials are invalid, return a 401 Unauthorized response
                return res.status(401).send('Invalid username or password!');
            }
        } catch (error) {
            // Log any errors and return a 500 Internal Server Error response
            console.error('Login error:', error);
            return res.status(500).send('Internal server error');
        }
    }

    // Method to render the login page
    login(req, res) {
        // If the user is already logged in, redirect them based on their role
        if (req.session.user) {
            return res.redirect(req.session.user.isAdmin ? '/me' : '/user');
        }

        // Render the login page with the 'login' layout
        res.render('login', { layout: 'login' });
    }

    // Method to handle user logout
    logout(req, res) {
        // Destroy the session to log the user out
        req.session.destroy(err => {
            if (err) {
                // Log any errors during logout and return a 500 Internal Server Error response
                console.error('Logout error:', err);
                return res.status(500).send('Internal server error');
            }

            // Redirect to the public home page after successful logout
            res.redirect('/');
        });
    }
}

// Exporting an instance of the LoginController class
module.exports = new LoginController();