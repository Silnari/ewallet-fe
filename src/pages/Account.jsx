import { Container, Grid } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "../components/core/DatePicker";
import moment from "moment";

export default function Account() {
  const [date, setDate] = useState(new Date());
  const [isNextAvaible, setIsNextAvaible] = useState(false);
  const [periodOfTime, setPeriodOfTime] = useState("M");

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
      </Grid>
    </Container>
  );
}
