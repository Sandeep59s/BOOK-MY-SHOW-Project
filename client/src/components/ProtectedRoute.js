import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";
import {message , Layout, Menu} from 'antd';
import {useDispatch  } from 'react-redux'
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Header } from "antd/es/layout/layout";
import { HomeOutlined, UserOutlined } from "@ant-design/icons"


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      label : "Home",
      icon : <HomeOutlined/>
    },
    {
      label :"Profile",
      icon :<UserOutlined/>
    }

  ]

  const [user, setUser] = useState(null);

  //random checks

  const getValidUser = async () => {
    try {
      //show loader
      dispatch(showLoading())
      const response = await GetCurrentUser();
      console.log(response);
      setUser(response.data);
      //hide loading
      dispatch(hideLoading())
    } catch (error) {
      setUser(null);
      message.error(error.message)
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return<>
  <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
            
          </Header>
  </Layout>
  
  </>
}

export default ProtectedRoute;
