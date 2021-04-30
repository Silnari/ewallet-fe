import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

export default function ConfirmDialog({ open, setOpen, handleAction }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
      <DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleAction}>
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
