const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");
const { getUserByEmail } = require("../controllers/auth");
const { getCard } = require("../controllers/card");
const { getDeck } = require("../controllers/deck");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email); // undefined if token invalid

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send({ message: "Action forbidden." });
    }
  } catch (error) {
    res.status(403).send({ message: "Action forbidden." });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);

    if (user?.role === "admin") {
      req.user = user;
      next();
    } else {
      res.status(403).send({ message: "Action forbidden." });
    }
  } catch (error) {
    res.status(403).send({ message: "Action forbidden." });
  }
};

const isCreatorOrAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);

    const { id } = req.params;
    const card = await getCard(id);
    const deck = await getDeck(id);

    if (
      card?.creator.toString() === user?._id.toString() || // ? prevents error when null._id.toString()
      deck?.creator._id.toString() === user?._id.toString() ||
      user?.role === "admin"
    ) {
      req.user = user;
      next();
    } else {
      res.status(403).send({ message: "Unauthorized action." });
    }
  } catch (error) {
    res.status(403).send({ message: "Unauthorized action." });
  }
};

module.exports = { isLoggedIn, isAdmin, isCreatorOrAdmin };
