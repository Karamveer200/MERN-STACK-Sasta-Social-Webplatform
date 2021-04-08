
import {REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE}
       from "./types"
import {setAlert} from "./alert"
import api from '../utils/api'
import setAuthToken from "../utils/setAuthToken"


//Load User
export const loadUser = ()=> async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await api.get('/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//Register USER
export const register = formData =>async dispatch=>{

    try {
        const res = await api.post('/users', formData)
        
        dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
        });
        dispatch(loadUser());
        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }
}


// Login User
export const login = (email, password) => async dispatch => {
    const body = { email, password };
  
    try {
      const res = await api.post('/auth', body);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  
export const logout = () => dispatch=>{
  dispatch({type:LOGOUT});
  dispatch({type:CLEAR_PROFILE})
   
}