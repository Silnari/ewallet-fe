import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./providers/AuthProvider";
import Landing from "./pages/Landing";

function App() {
  const { token } = useAuth();

  return (
    <Switch>
      {token ? (
        <Route path="/">
          <Landing />
        </Route>
      ) : (
        <>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route strict exact path="/">
            <Redirect to="/login" />
          </Route>
        </>
      )}
    </Switch>
  );
}

export default App;
