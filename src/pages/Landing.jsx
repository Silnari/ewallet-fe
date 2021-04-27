import { useAuth } from "../providers/AuthProvider";
import { Button } from "@material-ui/core";

function Landing() {
  const { logout } = useAuth();

  return (
    <>
      <h1>Hello</h1>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </>
  );
}

export default Landing;
