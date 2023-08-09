"use client";
import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Layout({ children }) {
  const size = useWindowSize();

  return (
    <div style={{ height: size.height }} className="w-full flex">
      {children}
    </div>
  );
}
