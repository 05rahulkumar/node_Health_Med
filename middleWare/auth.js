let jwt = require('jsonwebtoken');

module.exports = {
    isAuth: (req, res, next) => {
        try {
            let token = req.headers.authorization.split(" ")[1]; // Extract token from header
            let decode = jwt.verify(token, 'secret'); // Use the same secret key as in login
            req.userData = decode;
            console.log(token);
            next();
        } catch (error) {
            res.status(401).json({ msg: "Invalid token" });
        }
    }
};
