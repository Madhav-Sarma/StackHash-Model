const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'your-secret-key');
        req.userId = verified.userId;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;

