const fs = require('fs');
const multer = require("multer");

const uploadImage = multer({
  storage: multer.diskStorage({}),
});

module.exports = uploadImage