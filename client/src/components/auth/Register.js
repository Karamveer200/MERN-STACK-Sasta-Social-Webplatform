import React, {Fragment, useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert"
import {register} from "../../actions/auth"
import PropTypes from 'prop-types'

export const Register = (props) => {

  const[formdata, updateData] = useState({
    name:"",
    email:"",
    password:"",
    password2:""
  });

  const{name, email, password, password2} = formdata;

  const onChange = (e)=>updateData({...formdata, [e.target.name]:e.target.value})

  const onSubmit = async e=>{
    e.preventDefault();
    

    if(password!==password2)
      props.setAlert("Password Don't match", "danger")
    else{
      props.register({name, email, password})
    }
  }
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
    return (
      <Fragment>
        <h1 className="large text-primary ">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group form-outline">
            <input type="text"
             className="form-control loginRegisterForm do" 
             placeholder="Name" 
             name="name" 
             value={name} 
             onChange = {e=>onChange(e)}
              />
          </div>
          <div className="form-group">
            <input type="email"
            className="loginRegisterForm do"
             placeholder="Email Address" 
             name="email" 
             value={email} 
             onChange = {e=>onChange(e)} 
             
             />
            <small className="form-text">  This site uses Gravatar</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="loginRegisterForm do"
              value={password} 
              onChange = {e=>onChange(e)}
              />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              className="loginRegisterForm do"
              value={password2} 
              onChange = {e=>onChange(e)}
              />
          </div>
          <input type="submit" className="btn btn-primary round-btn-only btn-blue-gradient" value="Register" />
        </form>

        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>

    </Fragment>
    )
}

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {setAlert, register})(Register);