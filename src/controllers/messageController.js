import Message from "../model/message.js";

class messageController {
  static async SendMessage(req, res) {
    try {
      const { Firstname, Lastname, email, Phonenumber, message } = req.body;

      const newMessage = await Message.create({
        Firstname,
        Lastname,
        email,
        Phonenumber,
        message
      });

      res.status(201).json({
        message: "new message sent successfully",
        data: newMessage
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server error"
      });
    }
  }
}

export default messageController;
