import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../model/user.js"

const signupController = async (req, res) => {

  // Define the validation schema for the request body
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {fullname, email, password} = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({fullname, email, password: hashedpassword})

    res.status(201).json({
        message: "New user created successfully",
        data: newUser

    })

  } catch(error){
    console.log(error);
    res.status(500).json({
      message: "Server error "
    });
  }
};

export default signupController
