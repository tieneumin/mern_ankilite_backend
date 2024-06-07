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

    console.log(user);

    if (
      // ? prevents error if null._id.toString()
      card?.creator.toString() === user?._id.toString() ||
      deck?.creator.toString() === user?._id.toString() ||
      user?.role === "admin"
    ) {
      req.user = user;
      next();
    } else {
      res
        .status(403)
        .send({ message: "You are not authorized to perform this action." });
    }
  } catch (error) {
    res
      .status(403)
      .send({ message: "You are not authorized to perform this action." });
  }
};

module.exports = { isLoggedIn, isAdmin, isCreatorOrAdmin };
