import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { Fragment, useEffect } from 'react';
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import './App.css';
import Alert from "./components/layout/Alert"
import ProfileForm from "./components/profile-forms/ProfileForm"
import AddExperience from "./components/profile-forms/AddExperience"
import AddEducation from "./components/profile-forms/AddEducation"

//Redux
import {Provider} from "react-redux" //Provider connects react with redux

import store from "./store"

import setAuthToken from "./utils/setAuthToken"
import {loadUser} from "./actions/auth"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/routing/PrivateRoute"

import Profiles from "./components/profiles/Profiles"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"
import Profile from "./components/profile/Profile"

const App = ()=> {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  // HERE, [] RUN THE CODE OF useEffect only once. if we change [] with int i =1, 
  // then everytime i changes, the snippet code with run

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing}/>
        <section className="container">
        <Alert />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/> 
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/create-profile" component={ProfileForm}/>
          <PrivateRoute exact path="/edit-profile" component={ProfileForm}/>
          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>
          <PrivateRoute exact path="/posts" component={Posts}/>
          <PrivateRoute exact path="/posts/:id" component={Post}/>
          
        </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;
