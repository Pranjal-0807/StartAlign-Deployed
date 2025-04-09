const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user.user;
        // console.log(req.user);
        next();
    });
}

module.exports = authToken;

// {
//     id: '67b9b5125b858d35dfc34d19',
//     name: 'new',
//     email: 'new@gmail.com',
//     role: 'User',
//     gender: 'Male'
//   }
