import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../axios-instance";
import { useAuth } from "../../providers/AuthProvider";

const validationSchema = yup.object({
  name: yup.string("Enter account name").required("Account name is required"),
  startBalance: yup
    .number("Enter account start balance")
    .typeError("Start balance must be a number")
    .required("Start balance is required"),
});

export default function AddAcountDialog({ open, setOpen }) {
  const { token } = useAuth();

  const addAccount = async (values) => {
    const { name, startBalance } = values;

    const response = await axios({
      method: "post",
      url: "api/account",
      data: {
        name,
        startBalance,
        userId: token,
      },
    });
    if (response.status === 200) {
      setOpen(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      startBalance: 0,
    },
    validationSchema: validationSchema,
    onSubmit: addAccount,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add account</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText>Enter account details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Account name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            id="startBalance"
            label="Start balance"
            fullWidth
            value={formik.values.startBalance}
            onChange={formik.handleChange}
            error={
              formik.touched.startBalance && Boolean(formik.errors.startBalance)
            }
            helperText={
              formik.touched.startBalance && formik.errors.startBalance
            }
          />
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
