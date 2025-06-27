import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { reducer } from "../reducer/userReducer";

const UserContext = createContext();

const initialState = {
  isLoading: false,
  userData: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const savedAuth = JSON.parse(localStorage.getItem("healthRankAuth"));

  const getUserDetails = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
        const response = await axios.post(
          `http://localhost:5000/${savedAuth.role}/email`, {email : savedAuth.email}
        );
        const User = response.data[savedAuth.role];
        dispatch({ type: "SET_USER_DATA", payload: User });
        console.log(response);

        localStorage.setItem("healthAuth", JSON.stringify(User));
    } catch (error) {
        console.log(error);
      console.log("Can't fetch user Data");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, getUserDetails}}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };
