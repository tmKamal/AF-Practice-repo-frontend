import React, { useCallback, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./users/pages/users";
import NewPlaces from "./places/pages/new-places";
import MainNavigation from "./shared/components/navigation/main-navigation";
import UserPlaces from "./places/pages/user-places";
import UpdatePlace from "./places/pages/update-places";
import Auth from "./users/pages/auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
    
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []); //we have use callback here because we do not need to recreate(rerender) this element to the unwanted changes of the states and to prevent from infinite loops.

  let routes;
  if (isLoggedIn) {
    routes = (
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
        <Route path="/places/:placeId">
          {/* we have to keep this Route which contains dynamic segment, under the "places/new", because both are same, */}
          <UpdatePlace></UpdatePlace>{" "}
          {/* Otherwise "/places/new" also will identified as a  dynamic path */}
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users></Users>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces></UserPlaces>
        </Route>
        <Route path="/auth">
          <Auth></Auth>
        </Route>
        <Redirect to="/auth"></Redirect>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Route path="/">
          <MainNavigation></MainNavigation>
        </Route>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
