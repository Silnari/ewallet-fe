import { Typography } from "@material-ui/core";

export default function PageTitle({ title }) {
  return (
    <Typography variant="h4" align="center">
      {title}
    </Typography>
  );
}
