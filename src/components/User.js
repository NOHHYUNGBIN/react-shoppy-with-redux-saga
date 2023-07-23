import React from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function User({ user }) {
  const defualutDisplayName = user.reloadUserInfo.email.split("@")[0];
  return (
    <div className="flex items-center shrink-0">
      {user.photoURL ? (
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={user.photoURL}
          alt={user.displayName}
        />
      ) : (
        <div className="flex items-center shrink-0 text-4xl">
          <AiOutlineUser />
        </div>
      )}
      <span className="hidden md:block">
        {user.displayName ? user.displayName : defualutDisplayName}
      </span>
    </div>
  );
}
