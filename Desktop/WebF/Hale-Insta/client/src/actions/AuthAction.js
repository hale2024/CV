import * as AuthApi from '../api/AuthRequest';
// we have to use the below format everytime we interact with actions
export const logIn= (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
    try{
        const { data } = await AuthApi.logIn(formData);
        dispatch({type: "AUTH_SUCCESS", data: data});
    } catch(error){
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
    
} 
export const signUp= (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
    try{
        const { data } = await AuthApi.signUp(formData);
        // they will be sent as action.data and action.type to the reducer
        dispatch({type: "AUTH_SUCCESS", data: data});
    } catch(error){
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
    
} 
export const logout = ()=> async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
  }