import { auth } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signUpUsingMailAndPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    await createUserWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logInUsingMailAndPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: "Log In Successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};