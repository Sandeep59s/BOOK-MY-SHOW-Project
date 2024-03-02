import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apiCalls/users";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import {setUser} from "../redux/userSlice";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  HomeTwoTone,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // using this in place useState

  const navItems = [
    {
      label: "Home",
      icon: <HomeTwoTone />,
    },
    {
      label: `${user ? user.name :''}`,
      icon: <UserOutlined />,
      children: [
        {
          label: "My Profile",
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  //random checks

  const getValidUser = async () => {
    try {
      //show loader
      dispatch(showLoading());
      const response = await GetCurrentUser();
      console.log(response);
      dispatch(setUser(response.data));
      //hide loading
      dispatch(hideLoading());
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
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

  return (
    <>
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
  );
}

export default ProtectedRoute;
