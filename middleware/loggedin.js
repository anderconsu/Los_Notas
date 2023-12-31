import jwt from "jsonwebtoken";
//SESSION CHECK
    //Checks if the user is log-in if not goes to the it.
const loggedInMiddleware = (req, res, next) => {
    if (req.session.client) {
        console.log(true);
        // El usuario está logueado, continuar con la siguiente función
        next();
    } else {
        // El usuario no está logueado, redirigir al login
        res.redirect("/client/login");
    }
};
//TOKEN CREATE
    //Create a bearer token
const jwtMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "No está autorizado",
        });
    }
};

export { loggedInMiddleware, jwtMiddleware };
