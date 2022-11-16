import React, {useState} from 'react'
import './Posts.css'
import Post from '../Post/Post';
import {PostsData} from '../../Data/PostsData';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import {getTimelinePosts} from '../../actions/postAction';
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);
  let {posts, loading} = useSelector((state)=>state.postReducer);
  
  // runs only on the first re-render
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
    
  },[])
  const params = useParams()
  if(!posts) return 'No Posts';
  // Getting the id param from your post
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
              {loading
                ? "Fetching posts...."
                : posts.map((post, id)=>{
                    return <Post data={post} id={id}/>
              })}
    </div>
  )
}

export default Posts
//   const params = useParams()
//   if(!posts) return 'No Posts';
//   // Getting the id param from your post
//   if(params.id) posts = posts.filter((post)=> post.userId===params.id)
//   return (
//     <div className="Posts">
//       {loading
//         ? "Fetching posts...."
//         : posts.map((post, id) => {
//             return <Post data={post} key={id} />;
//           })}
//     </div>
//   );
// };

// export default Posts;
 