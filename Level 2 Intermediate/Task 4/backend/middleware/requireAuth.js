// middleware/requireAuth.js
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'Authorization token required' });

    const token = authorization.split(' ')[1];
    try {
        const { email } = jwt.verify(token, process.env.SECRET);
        req.user = { email };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
