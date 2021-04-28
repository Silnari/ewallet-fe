import { useAuth } from "../providers/AuthProvider";
import { Button, CardContent, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoginTitle from "../components/LoginTitle";
import { LoginContainer } from "../components/LoginContainer";
import { LoginCard } from "../components/LoginCard";

function Login() {
  const { login } = useAuth();
  const history = useHistory();

  return (
    <LoginContainer>
      <LoginCard>
        <CardContent>
          <Grid container align="center" direction="column" spacing={3}>
            <Grid item>
              <LoginTitle welcomeText="Log in to" />
            </Grid>
            <Grid item>
              <TextField
                id="login"
                label="Login"
                variant="outlined"
                fullWidth="true"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth="true"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth="true"
                onClick={() => login("xd")}
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                fullWidth="true"
                onClick={() => history.push("/register")}
              >
                No account? Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
