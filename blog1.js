import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  Articlename: {
    type: String,
    required: true,
  },
  ArticleDescription: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      author1: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
