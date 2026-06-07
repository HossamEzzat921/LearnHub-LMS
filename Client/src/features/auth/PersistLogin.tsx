import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import axios from "axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

 useEffect(() => {
  console.log("PersistLogin mounted");

  const verifyRefreshToken = async () => {
    console.log("Calling refresh");

    try {
      const response = await axios.get(
        "http://localhost:3500/auth/refresh",
        { withCredentials: true }
      );

      console.log("Refresh success");

      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user,
        })
      );
    } catch (err) {
      console.log("Refresh failed");
    } finally {
      console.log("Loading false");
      setIsLoading(false);
    }
  };

  if (!token) {
    verifyRefreshToken();
  } else {
    setIsLoading(false);
  }
}, []);
  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;