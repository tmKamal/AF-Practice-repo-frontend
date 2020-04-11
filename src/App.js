import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Users from "./users/pages/users";
import NewPlaces from "./places/pages/new-places";
import MainNavigation from "./shared/components/navigation/main-navigation";
import UserPlaces from "./places/pages/user-places";
import UpdatePlace from "./places/pages/update-places";
import Auth from './users/pages/auth';


function App() {
  return (
    <Router>
      <Route path="/">
        <MainNavigation></MainNavigation>
      </Route>
      <main>
        <Switch>
          <Route path="/" exact>
            <Users></Users>
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces></UserPlaces>
          </Route>
          <Route path="/places/new" exact>
            <NewPlaces></NewPlaces>
          </Route>
          <Route path="/places/:placeId">{/* we have to keep this Route which contains dynamic segment, under the "places/new", because both are same, */}                                             
            <UpdatePlace></UpdatePlace>  {/* Otherwise "/places/new" also will identified as a  dynamic path */}
          </Route>
          <Route path="/auth">
            <Auth></Auth>
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
