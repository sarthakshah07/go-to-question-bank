"use client";
import { authSelector } from "@/redux/auth/authSlice";
import { getUsersListAction } from "@/redux/auth/middleware";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const UserSettings = () => {
    const {userrole} = useParams();
    const dispatch = useDispatch();
    const {currentUser,userList} = useSelector(authSelector);
  
    // useEffect(() => {
    //   console.log("userrole", userrole ,userList)
    //   if (userrole === "admin") {
    //         dispatch(getUsersListAction(currentUser?.userId));
    //   } else {
        
    //   }
    // }, [])
  return (
        <div className="w-full">

        </div>
  );
};

export default UserSettings;
