import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (

      <header className="header">
        <span>Logo</span>
        <span>{loading ? "Loading..." : userInfo && userInfo.user.name}</span>
        <button onClick={logoutHandler}>
        <FaSignOutAlt />
      </button>
      </header>


  );
};

export default Header;
