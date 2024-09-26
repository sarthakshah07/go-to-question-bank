"use client";
import { useEffect } from "react";
import NavBar from "./navbar";
import { authSelector } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

 const WrapperComponent = ({ children }) => {
  // const { currentUser } = useSelector(authSelector);
const currentUser = typeof window !== "undefined" && localStorage.getItem("user")
  const router = useRouter();
  useEffect(() => {
    console.log("currentUseasfsadfsdfsdfr", currentUser);
    setTimeout(() => {
    if (!currentUser) {
        router.push("/");
      }
    }, 1500);
  }, [currentUser]);
    return (
      <div className="dark h-full bg-background flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 ">{children}</main>
      </div>
    );
  };
  export default WrapperComponent