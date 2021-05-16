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
import { useState } from "react";
import * as dateUtil from "../../utils/dateUtil";

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

  const nextDate = () => {
    setDate(dateUtil.addToDate(date, periodOfTime));
    if (dateUtil.isNextAvaible(date, periodOfTime)) setIsNextAvaible(false);
  };

  const prevDate = () => {
    setDate(dateUtil.substractFromDate(date, periodOfTime));
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
              {dateUtil.formatDate(date, periodOfTime)}
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
