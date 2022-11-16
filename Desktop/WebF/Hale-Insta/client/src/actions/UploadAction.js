import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
    try {
      // console.log("Image upload Action start ho gya hy")
      await UploadApi.uploadImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      // the post json returned from the createPost function in the controller.
      const newPost = await UploadApi.uploadPost(data);
      // console.log(newPost.data)
      await dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
      // error occurs over here
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };