import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";

export const uploadAvatar = async (file) => {
  const storageRef = ref(storage, `avatars/${uuidv4()}-${file.name}`);
  return uploadBytes(storageRef, file);
};
