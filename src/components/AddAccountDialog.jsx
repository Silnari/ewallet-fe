import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export default function AddAcountDialog({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={() => setOpen}>
      <DialogTitle>Add account</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter account details</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Account name"
          fullWidth
        />
        <TextField
          margin="dense"
          id="startingBalance"
          label="Starting balance"
          fullWidth
        />
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
