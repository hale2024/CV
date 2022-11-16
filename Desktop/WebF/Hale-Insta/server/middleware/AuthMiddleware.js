import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// we have to write dotenv.config to use the env variables inside server
dotenv.config();
const secret = process.env.JWT_KEY;
// the JWT middleware should contain the next variable
const authMiddleWare = async (req, res, next) => {
  try {
    // takes the authentication token from the authorization header of our request
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded)
    //   the user id will be replaced by the decoded.id if we are able to verify the user
      req.body._id = decoded?.id;
    }
    // the next means after doing all the above process correspond to the required route
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;