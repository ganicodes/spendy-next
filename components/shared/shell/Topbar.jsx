"use client";
import axiosInstance from "@/helper/APIHelper";
import { updateUser } from "@/store/user";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dummyProfile from "../../../public/dummy_profile_pic.svg";
import { ToggleTheme } from "../../ui/themeToggle";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/auth") || pathname === "/") return;
    const getUserSetupDetails = async () => {
      try {
        const { data } = await axiosInstance.get("/user/me");
        const { firstName, lastName, _id, email } = data?.userDetails;
        dispatch(
          updateUser({
            name: firstName + " " + lastName,
            id: _id,
            email,
          })
        );
      } catch (error) {
        console.error("Error in user/me", error?.message);
      }
    };

    getUserSetupDetails();
  }, [dispatch, user, pathname]);

  if (pathname.includes("/auth") || pathname === "/") return null;

  return (
    <div className="flex items-center justify-end border-b p-2 dark:border-gray-700 w-full">
      <ToggleTheme />
      <div className="flex items-center justify-between ml-8">
        <Image
          height={40}
          width={40}
          priority={false}
          alt="dummy-profile"
          src={dummyProfile}
          className="mx-auto"
        />
        <p className="font-light align-middle ml-4">{user?.name}</p>
      </div>
    </div>
  );
};

export default Topbar;
