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
import { useState } from "react";

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
  setDate,
  periodOfTime,
  setPeriodOfTime,
}) {
  const [isNextAvaible, setIsNextAvaible] = useState(false);
  const classes = useStyles();

  const printDate = (date, periodOfTime) => {
    var m = moment(date);
    if (periodOfTime === "w")
      return (
        m.startOf("isoweek").format("MMMM Do") +
        " - " +
        m.clone().startOf("isoweek").add(6, "d").format("MMMM Do[, ]YYYY")
      );
    if (periodOfTime === "M") return m.format("MMMM[, ]YYYY");
    if (periodOfTime === "y") return m.format("YYYY");
  };

  const nextDate = () => {
    var m = moment(date);

    setDate(
      periodOfTime === "d"
        ? m.add(7, periodOfTime).toDate()
        : m.add(1, periodOfTime).toDate()
    );

    if (moment(new Date()).isSame(m, "day")) setIsNextAvaible(false);
  };

  const prevDate = () => {
    var m = moment(date);

    setDate(
      periodOfTime === "d"
        ? m.subtract(7, periodOfTime).toDate()
        : m.subtract(1, periodOfTime).toDate()
    );

    setIsNextAvaible(true);
  };

  const handlePeriodOfTimeChange = (event) => {
    const period = event.target.value;
    setPeriodOfTime(period);
    setIsNextAvaible(false);
    setDate(new Date());
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
          <IconButton color="inherit" onClick={prevDate}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <Box className={classes.dateBox}>
            <Typography variant="h6">
              {printDate(date, periodOfTime)}
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            onClick={nextDate}
            disabled={!isNextAvaible}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
