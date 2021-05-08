import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  spinner: {
    height: "40vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

export default function Loading() {
  const classes = useStyle();

  return (
    <Box className={classes.spinner}>
      <CircularProgress />
    </Box>
  );
}
