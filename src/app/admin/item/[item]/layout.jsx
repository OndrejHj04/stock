import React from "react";
export default function Layout({ children }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 flex justify-center items-center">{children}</div>
    </div>
  );
}
