import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { storage, imagesRef, pdfRef } from "firebaseUtils/utils";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import imageUpload from "services/imageUpload";

export default function Uploader() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [displayImage, setDisplayImage] = useState(null);

  const handleChange = async (event) => {
    let file = event.target.files[0];
    let reference = ref(pdfRef.parent, file.name);

    try {
      let url = await imageUpload(reference, file, "pictures", {
        author: "ako",
        title: "basta",
      });

      if (url) {
        setDisplayImage(url);
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

  return (
    <>
      <input onChange={handleChange} label="Test" type={"file"} />

      {/* {displayImage && (
        <img
          alt="image-upload"
          src={displayImage}
          style={{ height: "30rem" }}
        />
      )} */}
    </>
  );
}
