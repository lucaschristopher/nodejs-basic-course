const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const tokenHeader = req.headers.auth;

  if (!tokenHeader)
    return res
      .status(401)
      .send({ error: "Authentication refused: token not sent!" });

  jwt.verify(tokenHeader, "nossacaraquelegal", (error, decoded) => {
    if (error) return res.status(401).send({ error: "Invalid token!" });
    res.locals.authData = decoded;
    return next();
  });
};

module.exports = auth;
