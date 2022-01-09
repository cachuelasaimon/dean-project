import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { storage, imagesRef, pdfRef } from "firebaseUtils/utils";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import imageUpload from "services/imageUpload";

const fields = ["Title", "Author", "Abstract", "Description"];

const CustomField = (props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      fullWidth={true}
      {...props}
      {...field}
      helperText={meta.error ? meta.error : ""}
      error={meta.error && meta.touched}
    />
  );
};

export default function Uploader() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [pdf, setPdf] = useState(null);

  const handleChange = (event) => {
    let file = event.target.files[0];
    setPdf(file);
    enqueueSnackbar("File Received", { variant: "success" });
  };

  const handleSubmit = async (values) => {
    let reference = ref(pdfRef.parent, pdf.name);
    try {
      let url = await imageUpload(reference, pdf, "pictures", values);

      if (url) {
        enqueueSnackbar("File Uploaded", { variant: "success" });
        window.setTimeout(() => {
          closeSnackbar();
        }, 2000);
      }
    } catch (err) {
      enqueueSnackbar(err, { variant: "error" });
      window.setTimeout(() => {
        closeSnackbar();
      }, 2000);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Book</DialogTitle>

        <Formik
          initialValues={{
            title: "",
            author: "",
            abstract: "",
            description: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Min 3 char")
              .max(60, "Max 60 char")
              .required("This field is required"),
            author: Yup.string()
              .min(3, "Min 3 char")
              .max(60, "Max 60 char")
              .required("This field is required"),
            abstract: Yup.string()
              .min(3, "Min 3 char")
              .max(60, "Max 60 char")
              .required("This field is required"),
          })}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form>
              <DialogContent>
                <input
                  style={{ marginBottom: "1rem" }}
                  type="file"
                  onChange={handleChange}
                />
                <Grid container spacing={2}>
                  {fields.map((field) => (
                    <Grid item xs={12}>
                      <CustomField name={field.toLowerCase()} label={field} />
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Book
      </Button>
    </>
  );
}
