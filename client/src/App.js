import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//Redux
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// import './App.css';

// if (typeof window != undefined && localStorage.token) {
//    setAuthToken(localStorage.token);
// }

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <React.Fragment>
         <Navbar />
         <Route exact path="/" component={Landing} />
         <section className="container">
            <Alert />
            <Switch>
               <Route exact path="/register" component={Register} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/profiles" component={Profiles} />
               <Route exact path="/profile/:id" component={Profile} />
               <PrivateRoute exact path="/dashboard" component={Dashboard} />
               <PrivateRoute
                  export
                  path="/create-profile"
                  component={CreateProfile}
               />
               <PrivateRoute
                  export
                  path="/edit-profile"
                  component={EditProfile}
               />
               <PrivateRoute
                  export
                  path="/add-experience"
                  component={AddExperience}
               />
               <PrivateRoute
                  export
                  path="/add-education"
                  component={AddEducation}
               />
               <PrivateRoute exact path="/posts" component={Posts} />
               <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
         </section>
      </React.Fragment>
   );
};

export default App;
