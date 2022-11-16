const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false },action) => {
    switch (action.type) {
        case "AUTH_START":
            return {...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            // saving the data in local storage
            // JSON.stringify({...action?.data} : if action is available it is stored as a JSON
                // console.log(JSON.stringify({ x: 5, y: 6 }));
                // expected output: "{"x":5,"y":6}"
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state,  authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
             return {...state, loading: false, error: true };
        case "UPDATING_START":
             return {...state, updateLoading: true , error: false}
        case "UPDATING_SUCCESS":

            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action.data, updateLoading: false, error: false}
        case "UPDATING_FAIL":
            return {...state, updateLoading: true, error: true}
        case "LOG_OUT":
             localStorage.clear();
             return {...state,  authData: null, loading: false, error: false, updateLoading: false }
        case "FOLLOW_USER":
            // action.data is the id of the person we want to follow
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
        case "UNFOLLOW_USER":
            // action.data is the id of the person we want to unfollow
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}
            // the filter is going to remove the person we want to remove from the list of ids
        default:
            return state;
    }
  };
  
  export default authReducer;