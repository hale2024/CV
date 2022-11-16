import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Creat new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post

export const getPost = async (req, res) => {
  const id = req.params.id;
//   the id we use is the objectid of the post not the id of the user

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
//  checking if the userId of the person editing is the same as the owner of the post
    if (post.userId === userId) {
        // set is used to update the post. for example req.body's value can be {"desc":"I like hale"}
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("POst deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  // the user with the specified userid likes the post with the specific post id
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      // liking a post
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      // disliking a post: liking after liking
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline POsts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    // currentUserPosts is a list of the person's own post
    const currentUserPosts = await PostModel.find({ userId: userId });
    // a new array of const followingPosts will be created and it would contain a set of field following posts
    // const followingPosts=[{"followingPosts":[{post info from post database},{post info...}]}]
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          // mongoose.Types.ObjectId gives the userId a proper id format with ObjectId(...)
          _id: new mongoose.Types.ObjectId(userId),
          // we want to see user with this specific _id
        },
      },
      {
        $lookup: {
          // specifying the other database we want to get results from
          from: "posts",
          // we want to look through the "following" field of users
          localField: "following",
          //  and go through posts and filter the ones that have the userId values that are inside user.following field 
          foreignField: "userId",
          // the name of the new array field created in combination with the user table will be followingPosts
          as: "followingPosts",
        },
      },
      {
        $project: {
          // project is nothing more but the return type of our aggregation mean which fields you want to return as the result of aggregation so i want to return just one field which is the followingPosts that i have made here. We don't want to see the contents of our posts fields
          // username:1,
          followingPosts: 1,
          // neglect the id field: eventhough it comes by default
          _id: 0,
        },
      },
    ]);
// const followingPosts=[{"followingPosts":[{post info from post database},{post info...}]}]
    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
      .sort((a,b)=>{
          return b.createdAt - a.createdAt;
      })
      // we are gonna compare posts based on there creation date and sort them based on that in descending order
      );
  } catch (error) {
    res.status(500).json(error);
  }
};