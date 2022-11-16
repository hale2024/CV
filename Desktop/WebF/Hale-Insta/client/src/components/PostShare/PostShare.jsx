import React, { useRef, useState } from 'react';
import './PostShare.css'

import ProfileImage from '../../img/profileImg.jpg'
// The below are icons
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const loading = useSelector((state)=>state.postReducer.uploading)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();

  const {user}=useSelector((state) => state.authReducer.authData)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // the if condition checks if an image folder exists and if an image file exists
      //inside the folder specified, the image file is the image
      //we will upload using our input tag below
     
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    // user is the authData part from our reducer
    const newPost={
      userId: user._id,
      desc: desc.current.value,
    }
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    reset();

    
    // description of form data https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  }
  return (
    <div className="PostShare">
        <img src={user.coverPicture? serverPublic+user.coverPicture: serverPublic+"defaultProfile.png"} alt="" />
        <div>
          <input 
          ref={desc}
          required
          type="text" placeholder="What's happening"/>
          <div className="postOptions">

              <div className="option" style={{color: "var(--photo)"}} onClick={()=>imageRef.current.click()}>
                {/* Whenever we click the UilScenery the control is passed to the imageRef input below. (it is right below Share)  */}
                <UilScenery/>
                Photo
              </div>
              <div className="option" style={{color: "var(--video)"}}>
                <UilPlayCircle/>
                Video
              </div>
              <div className="option" style={{color: "var(--location)"}}>
                <UilLocationPoint/>
                Location
              </div>
              <div className="option" style={{color: "var(--sc hedule)"}}>
                <UilSchedule/>
                Schedule
              </div>
              <button
                  className="button ps-button"
                  onClick={handleSubmit}
                  disabled={loading}>
                  {loading ? "Uploading..." : "Share"}
              </button>
              {/* the below div is activated when the imageRef.current is clicked because imageRef.current points to it*/}
              <div style={{display: "none"}}>
                <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
              </div>

          </div>

                  {image && (
                    <div className="previewImage">
                      <UilTimes onClick={()=>setImage(null)}/>
                      {/* Url.createObjectUrL creates a url link for the image object */}
                      <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                  )}
        </div>

    </div>
  )
}

export default PostShare
