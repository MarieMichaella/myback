import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true
  },
  Lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Phonenumber: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
