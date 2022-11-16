import React, {useState} from 'react'
import './Auth.css'
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';
// we don't need to import our store react-redux will import it for us.

const Auth = () => {
  const dispatch = useDispatch();
  // authReducer is our combined reducer
  const loading =useSelector((state)=>state.authReducer.loading);
  console.log(loading)
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);
  
  const [data, setData] = useState(initialState);
  // setting the values of firstname, lasttname, ... for data
  const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
      // e.preventDefault prevents the form from being submitted
      e.preventDefault();
      if (isSignUp) {
        data.password === data.confirmpass 
        ? dispatch(signUp(data)) 
        : setConfirmPass(false);
     }else{
        dispatch(logIn(data));
     }
         
  };
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };
  return (
    <div className="Auth">
      {/* Left side with the logo */}
          <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                      <h1>Hale Media</h1>
                      <h6>Explore the ideas throughout the world</h6>
                </div>
          </div>
      {/* Right side with the logo  */}
          <div className="a-right">
              
              <form className="infoForm authForm" onSubmit={handleSubmit}>
                  <h3>{isSignUp ? "Sign Up" : "Login"}</h3>

                    {isSignUp && 
                        <div>
                          <input 
                            type="text" 
                            placeholder='First Name'
                            className='infoInput' 
                            name='firstname'
                            value={data.firstname}
                            onChange={handleChange}/>
                          <input 
                            type="text" 
                            placeholder='Last Name'
                            className='infoInput' 
                            name='lastname'
                            value={data.lastname}
                            onChange={handleChange}/>
                       </div>
                    }
                  

                  <div>
                      <input type="text" placeholder='Usernames'
                      className='infoInput' name='username'
                      onChange={handleChange}
                      value={data.username}/>
                  </div>
                  
                  <div>
                      <input type="password" placeholder='Password'
                      className='infoInput' name='password'
                      onChange={handleChange}
                      value={data.password}/>
                      {/* confirm password field */}
                      {isSignUp &&
                              <input type="password" placeholder='Confirm Password'
                              className='infoInput' name='confirmpass'
                              onChange={handleChange}/>
                      }
                  </div>
                      {/* we will display the span below if the password and confirm password are different */}
                      <span style={{display: confirmPass? "none" : "block", color: 'red', fontSize: '12px', alignSelf:'flex-end', marginRight: '5px'}}>
                        * Confirm Password is not same
                      </span>
                    
                  <div>
                      <span style={{fontSize: '12px', cursor: "pointer"}} onClick ={()=>{setIsSignUp((prev)=>!prev); resetForm();}}>{isSignUp? "Already have an account. Login!" : "Don't have an account? Sign Up!"}</span>
                  </div>
                  {/* when we touch the login button the text on it changes to loading */}

                  <button className="button infoButton" type="submit" disabled={loading}>{loading? "Loading..." : isSignUp ? "Sign Up" : "Login"}</button>
              </form>
            </div>
      </div>
  )
}

export default Auth
