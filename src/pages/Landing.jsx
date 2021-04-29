import { makeStyles } from "@material-ui/core/styles";
import HeadLayout from "../components/HeadLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Landing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeadLayout />
      <main className={classes.content}></main>
    </div>
  );
}
