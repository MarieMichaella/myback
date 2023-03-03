import express from "express";
import blogController from "../controllers/blogController.js";
import restrictDelete from "../middleware/restrictDelete.js";
import multer from "multer";
import Joi from "joi"

const router = express.Router();

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// Create a multer middleware function
const upload = multer({ storage: storage });

// Validation schema for the createBlog route
const createBlogSchema = Joi.object({
  Articlename: Joi.string().required(),
  ArticleDescription: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
});

// Add the multer middleware and validation middleware to the route for creating a blog
router.post("/", upload.single("image"), (req, res, next) => {
  const result = createBlogSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }
  next();
}, blogController.createBlog);

// ... other routes ...


router.get("/", blogController.getBlogs);

router.get("/:id", blogController.getBlog);

router.put("/:id", blogController.updateBlog);

router.post("/:id/comments", blogController.addComment);

router.delete("/:id", restrictDelete, blogController.deleteblog);

export default router;
