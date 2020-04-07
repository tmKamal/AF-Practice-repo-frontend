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
          <Route path="/u1/new-places" exact>
            <NewPlaces></NewPlaces>
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces></UserPlaces>
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
