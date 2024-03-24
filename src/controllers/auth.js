const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorCode } = require('../utils/errorCode');

// In-memory data store
const users = [];

const userRegister = async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        users.push(user);
        return res.status(201).json({
            sucess: true,
            message: errorCode.register
        });
    } catch {
        return res.status(500).json({
            sucess: false,
            message: errorCode.notRegister
        });
    }
}

const loginUser = async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, process.env.UserSecrectKey);
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch {
        res.status(500).send('Wrong Creds');
    }
}


module.exports = {
    userRegister, loginUser
}
