import React from 'react'
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';

import './PostSide.css'


function PostSide() {
  return (
    <div className="Postside">
        <PostShare/>
        <Posts/>
    </div>
  )
}

export default PostSide
