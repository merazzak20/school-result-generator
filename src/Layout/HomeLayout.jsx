import React from "react";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="bg-green-50">
      <div className="min-h-[calc(100vh-170px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
