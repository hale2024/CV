import express from "express";
import { deleteUser, followUser, getUser,getAllUsers, UnFollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();
// router.get('/', async(req, res)=>{
//     res.send("user route");
// })
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', authMiddleWare, updateUser) //router.put to update

router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
// Put Request= localhost:5000/user:62fc7a36e773061f5c8954f0/follow
    // JSON Body= {"currentUserId":"62fc7a36e773061f5c8954f0"}
    // the person with the currentUserId will follow the person with the id=62fc7a36e773061f5c8954f0
router.put('/:id/unfollow', authMiddleWare, UnFollowUser)
export default router;