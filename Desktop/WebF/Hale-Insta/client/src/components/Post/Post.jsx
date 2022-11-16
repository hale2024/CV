import React, {useState} from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from "react-redux"
import {likePost} from '../../api/PostRequest'

const Post = ({data}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // data.likes.includes(user._id) return a boolean
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const handleLike = () => {
    // likePost makes the update on the server
    // data._id is the id of our post, user._id is the id of the user who has liked the post
    // we imported the likePost Api directly and use it
    likePost(data._id, user._id);
    // setLiked((prev) => !prev) likes/unlikes the post for us
    setLiked((prev) => !prev);
    // the below code updates the count based on whether it has previously liked or not
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  return (
    <div className="Post">
        {/* data.img stands for the name of the image */}
        {/* accessing image from the server public folder */}
          <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt=""/>
          <div className="postReact">
              <img src={liked?Heart: NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
              <img src={Comment} alt=""/>
              <img src={Share} alt=""/>
          </div>
          <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>
          <div className="detail">
              <span><b>{data.name}</b></span>
              <span> {data.desc}</span>
          </div>
    </div>
  )
}

export default Post
