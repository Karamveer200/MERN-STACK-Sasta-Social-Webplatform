import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts'>
          <i className='fas fa-comment-dots'></i>
          <span className=''> Posts </span>
        </Link>
      </li>

      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i> <span className=''> People </span>
        </Link>
      </li>

      <li>
        <Link to='/profile/651ceb3aacc727253850fb9e'>
          <i className='fas fa-user-shield'></i>
          <span className=''> Admin </span>
        </Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user-cog'></i>
          <span className='hide-sm'> Dashboard </span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'> Logout </span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i> People
        </Link>
      </li>
      <li>
        <Link to='/profile/606e6d17afcf4c49e8451301'>
          <i className='fas fa-user-shield'></i>
          <span className=''> Admin </span>
        </Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar navbar-gradient'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Sasta social platform
        </Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

Navbar.prototypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
