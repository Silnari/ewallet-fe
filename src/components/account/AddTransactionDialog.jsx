import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../axios-instance";
import { useTransactionList } from "../../providers/TransactionListProvider";

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
    .typeError("Enter date with valid format (dd/mm/yyyy)")
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
});

export default function AddTransactionDialog({
  open,
  setOpen,
  selectedAccount,
  accountList,
  transactionType,
}) {
  const { setRefreshKey } = useTransactionList();

  const addTransaction = async (values) => {
    const { account, value, note, category, date } = values;
    const response = await axios({
      method: "post",
      url: "api/transaction",
      data: {
        accountId: account,
        value,
        note,
        category,
        date,
        transactionType,
      },
    });
    if (response.status === 200) {
      setOpen(false);
      setRefreshKey((oldKey) => oldKey + 1);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      account:
        selectedAccount?.id !== 0 ? selectedAccount.id : accountList[0].id,
      value: 0,
      note: "",
      category: "",
      date: new Date(new Date().setHours(0, 0, 0, 0)),
    },
    validationSchema: validationSchema,
    onSubmit: addTransaction,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add new {transactionType.toLowerCase()}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Select
            id="account"
            name="account"
            value={formik.values.account}
            fullWidth
            onChange={formik.handleChange}
            error={formik.touched.account && Boolean(formik.errors.account)}
          >
            {accountList
              .filter((account) => account.id !== 0)
              .map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
          </Select>
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
              onClick={() => setOpen(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
