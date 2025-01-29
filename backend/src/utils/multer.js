import multer from "multer";
const storage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(res.status(400).send({ message: "Not an image" }), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});

// req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
// await sharp(req.files.imageCover[0].buffer)
//   .resize(2000, 1333)
//   .toFormat("jpeg")
//   .jpeg({ quality: 90 })
//   .toFile(`public/img/tours/${req.body.imageCover}`);
