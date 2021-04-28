import { Box, Typography } from "@material-ui/core";

export default function LoginTitle({ welcomeText }) {
  return (
    <Box mb={4}>
      <Typography display="inline" variant="h4" align="center">
        {welcomeText}&nbsp;
      </Typography>
      <Typography display="inline" variant="h4" color="primary">
        eWallet
      </Typography>
    </Box>
  );
}
