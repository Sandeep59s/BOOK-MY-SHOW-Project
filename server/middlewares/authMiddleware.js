const jwt = require("jsonwebtoken");

module.exports= function authMiddleware(req, res , next) {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        throw new Error("Authorization header missing or invalid");
      }
    const token = req.headers.authorization.split(" ")[1];
    const verifiedTokenUser = jwt.verify(token, process.env.secret_key_jwt);
    req.body.userId = verifiedTokenUser.userId;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Token Invalid",
    });
  }
}
