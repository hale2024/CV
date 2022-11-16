import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";

const User = ({person}) => {
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  // we use the useSelector hook to interact with our store
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch=useDispatch();

  const [following, setFollowing] = useState(
    // person is the person getting followed
    // user is the guy who follows some user
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
    // the below reload makes us show all the posts that change when we follow a user
    window.location.reload()
  };
  return (
    <div className="follower">
                  <div>
                      <img src={person.coverPicture? serverPublic+person.coverPicture: serverPublic+"defaultProfile.png"} alt="" className='followerImage'/>
                      <div className="name">
                          <span>{person.firstname}</span>
                          <span>@{person.username}</span>
                      </div>
                  </div>
                  <button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>
                    {following ? "Unfollow" : "Follow"}
                  </button>
    </div>
  )
}

export default User