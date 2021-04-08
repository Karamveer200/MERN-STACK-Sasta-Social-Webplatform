import React from 'react'
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from "prop-types"

export const Landing = ({isAuthenticated}) => {

  //ALTERNATIVE
  // if(isAuthenticated)
  //   return (<Redirect to="/dashboard" />)
  
    return ( !isAuthenticated ?
      (<section className="landing">
        <div className="dark-overlay">
    
          <div className="landing-inner">
            <h1 className="x-large">Connecting the World</h1>
            <p className="lead">
              Create a profile/portfolio, share posts and get help from
              others
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-gradient round-btn-only margin2">Sign Up</Link>
              <Link to="/login" className="btn btn-light round-btn-only margin2">Login</Link>
            </div>
          </div>
        </div>
      </section>
      ):(<Redirect to="/dashboard" />))
   
};

Landing.protoTypes = {
  isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
