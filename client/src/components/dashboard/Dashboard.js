import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { DashboardActions } from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import PostForm from "../posts/PostForm";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="">
      <section className="">
        <Fragment>
          <div className="bg-primary p-1 round-btn-only p-2">
            <h2> Message from Karamveer-</h2>
            <h3>
              {" "}
              Thanks for your visit. Please do leave a review by uploading a
              post
            </h3>
            <div className="white-bg-adjust">
              <ul className="white-bg">
                <Link to="/profile/606e6d17afcf4c49e8451301">
                  <i className="fas fa-user-shield"></i>
                  <span className="hide-sm"> Admin </span>
                </Link>
              </ul>
            </div>
          </div>
          <h1 className="large text-primary my-marginup-only">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user">Welcome {user && user.name}</i>
          </p>
          <p className="my-3">Your email is {user && user.email}</p>
          {profile !== null ? (
            <Fragment>
              <div className="setPic">
                {profile.pic != null ? (
                  <img
                    className="mypic"
                    data-aos="example-anim3"
                    src={profile.pic}
                    alt=""
                  />
                ) : (
                  <img
                    className="mypic"
                    data-aos="example-anim3"
                    src={user.avatar}
                    alt=""
                  />
                )}
              </div>
              <DashboardActions />
              <div className="line" />
              <div className="PostFormDash" data-aos="fade-down">
                <PostForm />
              </div>
              <Experience experience={profile.experience} />
              <Education education={profile.education}></Education>
              <button
                className="btn-deleteAccount tablePosition deletebtn "
                onClick={() => deleteAccount()}
              >
                <p>
                  <i className="fas fa-user-minus"></i> Delete Account
                </p>
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p>Please Create your Profile</p>
              <Link
                to="/create-profile"
                className="btn btn-gradient round-btn-only my-1"
              >
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </div>
  );
};
//{user && user.name } means if user exists, show user.name

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
