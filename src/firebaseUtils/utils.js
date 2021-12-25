import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./config";

// Storage utils
export const storage = getStorage(firebaseApp);
export const imagesRef = ref(storage, "images/test.png");
export const pdfRef = ref(storage, "files/test.pdf");

// Firestore Utils
export const firestore = getFirestore(firebaseApp);
