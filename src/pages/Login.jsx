import { useAuth } from "../providers/AuthProvider";
import { Button, CardContent, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoginTitle from "../components/LoginTitle";
import { LoginContainer } from "../components/LoginContainer";
import { LoginCard } from "../components/LoginCard";
import axios from "../axios-instance";
import { useFormik } from "formik";

function Login() {
  const { logIn } = useAuth();
  const history = useHistory();

  const doLogin = async (values) => {
    const { login, password } = values;

    const response = await axios({
      method: "post",
      url: "api/user/authenticate",
      data: {
        login,
        password,
      },
    });
    if (response.status === 200) {
      logIn(response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: doLogin,
  });

  return (
    <LoginContainer>
      <LoginCard>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.login}
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth="true"
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
          </form>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
