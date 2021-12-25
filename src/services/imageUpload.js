import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytes } from "firebase/storage";

import { firestore } from "firebaseUtils/utils";

export default async function uploadImage(
  reference,
  file,
  firestoreReference,
  metaData
) {
  if (reference && file && firestoreReference) {
    let fileUpload = null;
    let url = null;
    const meta = metaData ? metaData : null;
    try {
      fileUpload = await uploadBytes(reference, file);
      if (fileUpload) {
        url = await getDownloadURL(reference);
        await addDoc(collection(firestore, firestoreReference), {
          url,
          timestamp: new Date().toString(),
          ...meta,
        });
        return url;
      }
    } catch (err) {
      throw err;
    }
  } else {
    throw Error("File or reference is empty");
  }
}
