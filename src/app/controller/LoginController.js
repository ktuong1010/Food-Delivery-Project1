const UserModel = require('../models/userModel');
class LoginController{
  
    async authentication(req, res) {
        try {
            const { username, password } = req.body;

            // Basic input validation
            if (!username || !password) {
                return res.status(400).send('Username and password are required');
            }

            // Check for user in database
            const user = await UserModel.findUserByCredentials(username, password);

            if (user) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin
                };
                console.log('User logged in:', req.session.user);
                return res.redirect(user.isAdmin ? '/me' : '/user');
            } else {
                return res.status(401).send('Invalid username or password!');
            }
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).send('Internal server error');
        }
    }

    login(req, res) {
        if (req.session.user) {
            return res.redirect(req.session.user.isAdmin ? '/me' : '/user');
        }
        res.render('login', { layout: 'login' });
    }

   
    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).send('Internal server error');
            }
            res.redirect('/'); // Redirect to public home after logout
        });
    }
}
module.exports = new LoginController();