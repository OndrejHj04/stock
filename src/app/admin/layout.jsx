"use client";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="h-screen w-full flex flex-col">
      {children}
    </div>
  );
}
