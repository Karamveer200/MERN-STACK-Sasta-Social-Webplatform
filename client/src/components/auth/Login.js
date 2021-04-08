import React, {Fragment, useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import  {connect} from "react-redux"
import {login} from "../../actions/auth"
import PropTypes from "prop-types"

export const Login = ({login, isAuthenticated}) => {

  const[formdata, updateData] = useState({
    email:"",
    password:"",
  });

  const{email, password} = formdata;

  const onChange = (e=>updateData({...formdata, [e.target.name]:e.target.value}))

  const onSubmit = e=>{
    e.preventDefault();
    login(email, password)
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
    return (
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign in your Account</p>

        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <input type="email"
             placeholder="Email Address" 
             name="email" 
             value={email} 
             onChange = {e=>onChange(e)} 
             className="loginRegisterForm do"
             />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="loginRegisterForm do"
              name="password"
              minLength="6"
              value={password} 
              onChange = {e=>onChange(e)}
              />
          </div>
          
          <input type="submit" className="btn btn-primary round-btn-only btn-blue-gradient" value="Login" />
        </form>

        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

    </Fragment>
    )
}

Login.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login)