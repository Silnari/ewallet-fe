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

export default function AddTransactionDialog({
  open,
  setOpen,
  selectedAccount,
  accountList,
  transactionType,
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add new {transactionType.toLowerCase()}</DialogTitle>
      <DialogContent>
        <Select id="account" value={"Cash"} fullWidth>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Main card">Main card</MenuItem>
          <MenuItem value="Savings">Savings</MenuItem>
        </Select>
        <TextField margin="dense" id="value" label="Value" fullWidth />
        <TextField margin="dense" id="note" label="Note" fullWidth />
        <TextField margin="dense" id="category" label="Category" fullWidth />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date"
            label="Date"
            value={new Date()}
            fullWidth={true}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
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
      </DialogContent>
    </Dialog>
  );
}
