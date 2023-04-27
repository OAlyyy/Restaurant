const { verify } = require("jsonwebtoken");
const Cookies = require("universal-cookie");

const validateToken = (req, res, next) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("jwt_authorization");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
