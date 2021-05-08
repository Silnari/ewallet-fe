import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./providers/AuthProvider";
import Landing from "./pages/Landing";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#85bb65",
    },
    secondary: {
      main: "#cdb68e",
    },
    background: {
      default: "#fafafa",
    },
  },
  white: "#fff",
  green: green[500],
  red: red[500],
});

function App() {
  const { token } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
    </MuiThemeProvider>
  );
}

export default App;
