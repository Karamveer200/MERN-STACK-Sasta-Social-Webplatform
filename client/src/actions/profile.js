
import {setAlert} from "./alert"
import api from '../utils/api'
import {GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_REPOS} from "./types"


//GET CURRENT USER PROFILE
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await api.get('/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        const errors = err.response.data.msg;
        if(errors){
            //dispatch(setAlert(errors, "danger"))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}


//Get all user profiles
export const getProfiles = () => async dispatch =>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res = await api.get('/profile')
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
        const errors = err.response.data.msg;
        if(errors){
            //dispatch(setAlert(errors, "danger"))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}


//GET profile by user id
export const getProfileById = (userId) => async dispatch =>{
    try {
        const res = await api.get(`/profile/user/${userId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        const errors = err.response.data.msg;
        if(errors){
            //dispatch(setAlert(errors, "danger"))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}

//Get github repos
export const getGithubRepos = (githubUsername) => async dispatch =>{
    try {
        const res = await api.get(`/profile/github/${githubUsername}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (err) {
        const errors = err.response.data.msg;
        if(errors){
            //dispatch(setAlert(errors, "danger"))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}

//Create/update profile
export const createProfile = (formData, history, edit=false)=> async dispatch =>{

    try {
        const res = await api.post('/profile', formData)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert(edit? 'Profile Updated':'Profile Created', "success"))


        //We can't use <Redirect> inside actions, so use history which has push method
        history.push("/dashboard")
        
    } catch (err) {

        const errors = err.response.data.errors;
  
      if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText, status:err.response.status}

    })
    }
}

//ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch=>{
    try {
        const res = await api.put('/profile/experience', formData)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Experience Added', "success"))
        history.push("/dashboard")
        
    } catch (err) {
        const errors = err.response.data.errors;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}

//ADD EDUCATION
export const addEducation = (formData, history) => async dispatch=>{
    try {
        const res = await api.put('/profile/education', formData)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Education Added', "success"))
        history.push("/dashboard")
        
    } catch (err) {
        const errors = err.response.data.errors;
  
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}

//Delete Experience
export const deleteExperience = id => async dispatch=>{
    try {
        const res = await api.delete(`/profile/experience/$(id)`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed', "success"))

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}


//Delete Education
export const deleteEducation = id => async dispatch=>{
    try {
        const res = await api.delete(`/profile/education/$(id)`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed', "success"))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}

        })
    }
}

//DELETE ACCOUNT AND PROFILE
export const deleteAccount = () => async dispatch=>{

    if(window.confirm("Do you want to delete your account? This can't be undone!")){
        try {
            await api.delete('/profile')
    
            dispatch({
                type:CLEAR_PROFILE
            })
            dispatch({
                type:ACCOUNT_DELETED
            })
            dispatch(setAlert('Your Account has been deleted', "success"))
            
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText, status:err.response.status}
    
            })
        }
    }
}
