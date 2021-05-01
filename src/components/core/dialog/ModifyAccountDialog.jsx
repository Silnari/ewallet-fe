import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../../axios-instance";

const validationSchema = yup.object({
  name: yup.string("Enter account name").required("Account name is required"),
  startBalance: yup
    .number("Enter account start balance")
    .typeError("Start balance must be a number")
    .required("Start balance is required"),
});

export default function ModifyAccountDialog({ open, setOpen, account }) {
  const modifyAccount = async (values) => {
    const { name, startBalance } = values;

    const response = await axios({
      method: "put",
      url: `api/account/${account.id}`,
      data: {
        name,
        startBalance,
      },
    });
    if (response.status === 200) {
      setOpen(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: account ? account : { name: "", startBalance: "" },
    validationSchema: validationSchema,
    onSubmit: modifyAccount,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Modify account</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
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
            label="Start balance balance"
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
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
