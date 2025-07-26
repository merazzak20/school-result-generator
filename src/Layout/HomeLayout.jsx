import React from "react";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-170px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
