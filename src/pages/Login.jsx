import { useAuth } from "../providers/AuthProvider";
import { Button } from "@material-ui/core";

function Login() {
  const { login } = useAuth();

  return (
    <>
      <h1>Login</h1>
      <Button variant="contained" color="primary" onClick={() => login("xd")}>
        Login
      </Button>
    </>
  );
}

export default Login;
