const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

    // revisamos que el header no venga vacio
    if (!req.headers['authorization']) {
        return res.json({ error: 'Unauthorized' });
    }

    // obtenemos el token
    const token = req.headers['authorization'];

    let payload;
    
    // verificamos que el token sea el correcto
    try {
        payload = jwt.verify(token, 'password');
    } catch (error) {
        return res.json({ error: 'Unauthorized' });
    }

    next();
}

module.exports = { checkToken }