"use client";

import { useSelector } from "react-redux";
import Auth from "./auth/Auth";
import Navbar from "./shared/shell/Navbar";
import Topbar from "./shared/shell/Topbar";

const ProtectedRoutes = ({ children }) => {
  const { userId } = useSelector((state) => state.user);
  return (
    <>
      {userId ? (
        <>
          <Topbar />
          <div className=" flex justify-start">
            <Navbar />
            {children}
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default ProtectedRoutes;
