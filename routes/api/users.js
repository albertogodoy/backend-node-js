const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12);
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        // comprobamos que el usuario exista
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ error: 'Error en email/contraseña' });
        }

        const eq = bcrypt.compareSync(req.body.password, user.password);

        if (!eq) {
            return res.json({ error: 'Error en email/contraseña' });
        }

        res.json({ success: 'Login correcto!', token: createToken(user) });
    } catch (error) {
        res.json({ error: error.message });
    }
});

function createToken(user) {
    const paylod = {
        user_id: user._id,
        user_role: user.role
    }

    return jwt.sign(paylod, 'password');

}



module.exports = router;