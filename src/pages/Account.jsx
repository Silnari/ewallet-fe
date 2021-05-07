import { Box, Container, Grid, IconButton } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "../components/core/DatePicker";
import moment from "moment";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import LoopRoundedIcon from "@material-ui/icons/LoopRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import AddTransactionDialog from "../components/core/dialog/AddTransactionDialog";

const useStyles = makeStyles((theme) => ({
  incomeButton: {
    color: green[500],
  },
  outcomeButton: {
    color: red[500],
  },
}));

export default function Account() {
  const [date, setDate] = useState(new Date());
  const [isNextAvaible, setIsNextAvaible] = useState(false);
  const [periodOfTime, setPeriodOfTime] = useState("M");
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("INCOME");
  const classes = useStyles();

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

  const changePeriodOfTime = (period) => {
    setPeriodOfTime(period);
    setDate(new Date());
  };

  const addTransaction = (transactionType) => {
    setTransactionType(transactionType);
    setAddTransactionOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Grid container align="center" direction="column" spcing={3}>
        <Grid item>
          <DatePicker
            date={date}
            periodOfTime={periodOfTime}
            setPeriodOfTime={changePeriodOfTime}
            handleNext={nextDate}
            handlePrev={prevDate}
            isNextAvaible={isNextAvaible}
          />
        </Grid>
        <Grid item>
          <Box mt={1}>
            <IconButton
              className={classes.incomeButton}
              onClick={() => addTransaction("INCOME")}
            >
              <AddCircleOutlineRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => addTransaction("TRANSFER")}
            >
              <LoopRoundedIcon fontSize="large" />
            </IconButton>
            <IconButton
              className={classes.outcomeButton}
              onClick={() => addTransaction("OUTCOME")}
            >
              <RemoveCircleOutlineOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <AddTransactionDialog
        open={addTransactionOpen}
        setOpen={setAddTransactionOpen}
        transactionType={transactionType}
      />
    </Container>
  );
}
