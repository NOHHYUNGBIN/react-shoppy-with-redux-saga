import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-brand py-2 px-4 text-white rounded-xl hover:brightness-90"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
