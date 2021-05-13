import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../axios-instance";

const validationSchema = yup.object({
  value: yup
    .number()
    .typeError("Value must be a number")
    .positive("Value must be grater than zero")
    .required("Value is required"),
  note: yup.string("Enter note"),
  date: yup
    .date("Enter date")
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
});

export default function ModifyTransferDialog({
  open,
  setOpen,
  accountList,
  transfer,
}) {
  const modifyTransfer = async (values) => {
    const { toAccount, fromAccount, value, note, date } = values;
    const response = await axios({
      method: "put",
      url: `api/transfer/${transfer.id}`,
      data: {
        toAccountId: toAccount,
        fromAccountId: fromAccount,
        value,
        note,
        date,
      },
    });
    if (response.status === 200) {
      setOpen(false);
    }
  };

  const deleteTransfer = async () => {
    const response = await axios({
      method: "delete",
      url: `/api/transfer/${transfer.id}`,
    });
    if (response.status === 200) {
      setOpen(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: transfer
      ? {
          fromAccount: transfer.fromAccountId,
          toAccount: transfer.toAccountId,
          value: transfer.value,
          note: transfer.note,
          date: transfer.date,
        }
      : {},
    validationSchema: validationSchema,
    onSubmit: modifyTransfer,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Modify transfer</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container align="center" direction="row">
            <Grid item xs={5}>
              <InputLabel align="left" htmlFor="fromAccount">
                From:
              </InputLabel>
              <Select
                id="fromAccount"
                name="fromAccount"
                fullWidth
                value={formik.values.fromAccount}
                onChange={formik.handleChange}
                error={
                  formik.touched.fromAccount &&
                  Boolean(formik.errors.fromAccount)
                }
              >
                {accountList.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} style={{ paddingTop: 20 }}>
              <ArrowRightAltIcon />
            </Grid>
            <Grid item xs={5}>
              <InputLabel align="left" htmlFor="toAccount">
                To:
              </InputLabel>
              <Select
                fullWidth
                id="toAccount"
                name="toAccount"
                value={formik.values.toAccount}
                onChange={formik.handleChange}
                error={
                  formik.touched.toAccount && Boolean(formik.errors.toAccount)
                }
              >
                {accountList
                  .filter((account) => account.id !== formik.values.fromAccount)
                  .map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            id="value"
            label="Value"
            fullWidth
            value={formik.values.value}
            onChange={formik.handleChange}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
          <TextField
            margin="dense"
            id="note"
            label="Note"
            fullWidth
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              maxDate={new Date()}
              format="MM/dd/yyyy"
              margin="normal"
              id="date"
              label="Date"
              fullWidth={true}
              autoOk
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("date", value)}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </MuiPickersUtilsProvider>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteTransfer}
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
