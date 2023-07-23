import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import { useDispatch } from "react-redux";
import { LogOut } from "../store/user/action";
import { message } from "antd";

export default function Navbar() {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      dispatch(LogOut());
      message.success("로그아웃이 성공적으로 처리되었습니다.");
    } catch (error) {
      message.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <header className="flex justify-between border-b border-gray-300 p-2 font-semibold">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>BeenSoppy</h1>
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && (
          <Link to="/login">
            <Button text={"Login"} />
          </Link>
        )}
        {user && <Button text={"LogOut"} onClick={handleLogout} />}
      </nav>
    </header>
  );
}
