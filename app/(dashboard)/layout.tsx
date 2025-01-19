import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <center className=" h-screen w-full">
      <Navbar />
      <div className="w-full">{children}</div>
    </center>
  );
}

export default layout;
