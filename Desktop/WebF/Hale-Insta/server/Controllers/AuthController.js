import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//register user
export const registerUser = async(req, res) => {
  

  const salt = await bcrypt.genSalt(10);
  // genSalt describes how much we have to change our password
  const hashedPass= await bcrypt.hash(req.body.password, salt);
  //
  req.body.password=hashedPass;
  const newUser = new UserModel(
    req.body
  );
  const {username} =req.body;

  try{
    // checking if the user has already been registered
    const oldUser =await UserModel.findOne({username});
    if(oldUser){
      return res.status(400).json({message: "username is already registered!"});
    }
    const user= await newUser.save();

    const token =jwt.sign({
      username: user.username, id: user._id
    }, process.env.JWT_KEY, {expiresIn: '1h'})

    // the user and the token will be stored in our local storage and in our redux store
    res.status(200).json({user, token})
    // we will see the newUser
    
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
//login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    }else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};