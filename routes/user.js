const express = require('express');
const { handleUserSignup, handleUserLogin} = require('../controllers/user');
const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

// Route to handle logout
router.get('/logout', (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
    });
    return res.redirect('/login');
});

module.exports = router;