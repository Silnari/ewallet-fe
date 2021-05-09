import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../axios-instance";

const validationSchema = yup.object({
  value: yup
    .number()
    .typeError("Value must be a number")
    .positive("Value must be grater than zero")
    .required("Value is required"),
  note: yup.string("Enter note"),
  category: yup.string("Enter category").required("Category is required"),
  date: yup
    .date("Enter date")
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
});

export default function ModifyTransactionDialog({
  open,
  setOpen,
  transaction,
}) {
  const modifyTransaction = async (values) => {
    const { value, note, category, date } = values;

    const response = await axios({
      method: "put",
      url: `/api/transaction/${transaction.id}`,
      data: {
        value,
        note,
        category,
        date,
      },
    });

    if (response.status === 200) {
      setOpen(false);
    }
  };

  const deleteTransaction = async () => {
    const response = await axios({
      method: "delete",
      url: `/api/transaction/${transaction.id}`,
    });
    if (response.status === 200) {
      setOpen(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: transaction ? transaction : {},
    validationSchema: validationSchema,
    onSubmit: modifyTransaction,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Modify</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
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
          <TextField
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
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
              onClick={deleteTransaction}
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
