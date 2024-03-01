import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";
import {message} from 'antd';
import {useDispatch , useSelector} from 'react-redux'
import { hideLoading, showLoading } from "../redux/loaderSlice";


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  //random checks

  const getValidUser = async () => {
    try {
      //show loader
      dispatch(showLoading)
      const response = await GetCurrentUser();
      console.log(response);
      setUser(response.data);
      //hide loading
      dispatch(hideLoading)
    } catch (error) {
      setUser(null);
      message.error(error.message)
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return <div> {user && user.name} {children}</div>;
}

export default ProtectedRoute;
