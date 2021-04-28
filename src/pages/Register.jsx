import { Button, CardContent, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import { LoginContainer } from "../components/LoginContainer";
import { LoginCard } from "../components/LoginCard";
import LoginTitle from "../components/LoginTitle";

function Register() {
  const history = useHistory();
  return (
    <LoginContainer>
      <LoginCard>
        <CardContent>
          <Grid container align="center" direction="column" spacing={3}>
            <Grid item>
              <LoginTitle welcomeText="Register to" />
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
                id="email"
                label="Email"
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
                onClick={() => history.push("/login")}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
}

export default Register;
