const express = require("express");
const multer = require("multer"); // https://www.npmjs.com/package/multer

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST /images
router.post("/", upload.single("image"), async (req, res) => {
  try {
    res.status(200).send({ image_url: req.file.path });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
