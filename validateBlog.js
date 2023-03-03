import Joi from "joi";
import multer from "multer";

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// Create a multer middleware function for validating the uploaded image
const uploadImage = multer({ storage: storage }).single("image");

// Create a Joi schema for validating the request body
const blogSchema = Joi.object({
  Articlename: Joi.string().required(),
  ArticleDescription: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.object({
    data: Joi.binary().required(),
    contentType: Joi.string().required(),
  }).required(),
});

// Create a middleware function for validating the request body
const validateBlog = (req, res, next) => {
  const { error, value } = blogSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Add the validated image object to the request body
  req.body.image = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  next();
};



export default validateBlog