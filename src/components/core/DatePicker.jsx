import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
  dateBox: {
    borderRadius: 20,
    display: "inline-box",
    padding: "10px 20px 10px 20px",
    backgroundColor: "#fff",
    width: 410,
    // eslint-disable-next-line
    display: "flex",
    justifyContent: "center",
  },
  datePicker: {
    minWidth: 120,
  },
}));

export default function DatePicker({
  date,
  handleNext,
  handlePrev,
  periodOfTime,
  setPeriodOfTime,
  isNextAvaible,
}) {
  const classes = useStyles();

  const printDate = (date, periodOfTime) => {
    var m = moment(date);
    if (periodOfTime === "w")
      return (
        m.format("MMMM Do") +
        " - " +
        m.clone().add(7, "d").format("MMMM Do[, ]YYYY")
      );
    if (periodOfTime === "M") return m.format("MMMM[, ]YYYY");
    if (periodOfTime === "y") return m.format("YYYY");
  };

  const handlePeriodOfTimeChange = (event) => {
    setPeriodOfTime(event.target.value);
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Select
          id="period-of-time"
          value={periodOfTime}
          onChange={handlePeriodOfTimeChange}
          className={classes.datePicker}
        >
          <MenuItem value={"w"}>Week</MenuItem>
          <MenuItem value={"M"}>Month</MenuItem>
          <MenuItem value={"y"}>Year</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" justify="center">
          <IconButton color="inherit" onClick={handlePrev}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <Box className={classes.dateBox}>
            <Typography variant="h6">
              {printDate(date, periodOfTime)}
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            onClick={handleNext}
            disabled={!isNextAvaible}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
