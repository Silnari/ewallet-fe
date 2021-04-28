import { Button, CardContent, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import { LoginContainer } from "../components/LoginContainer";
import { LoginCard } from "../components/LoginCard";
import LoginTitle from "../components/LoginTitle";
import axios from "../axios-instance";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  login: yup.string("Enter your login").required("Login is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be of minimum 5 characters length")
    .required("Password is required"),
});

function Register() {
  const doRegister = async (values) => {
    const { login, email, password } = values;

    const response = await axios({
      method: "post",
      url: "api/user/register",
      data: {
        login,
        email,
        password,
      },
    });
    if (response.status === 200) {
      history.push("login/");
    }
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: doRegister,
  });

  const history = useHistory();
  return (
    <LoginContainer>
      <LoginCard>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  error={formik.touched.login && Boolean(formik.errors.login)}
                  helperText={formik.touched.login && formik.errors.login}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth="true"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
}

export default Register;
