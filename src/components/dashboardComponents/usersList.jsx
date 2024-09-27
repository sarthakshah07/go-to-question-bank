"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Switch,
} from "@headlessui/react";
import { useParams } from "next/navigation";
import { authSelector } from "@/redux/auth/authSlice";
import { getUsersListAction } from "@/redux/auth/middleware";
import CommonTable from "../common/commonTable";

const UserList = () => {
  const {userrole} = useParams();
  const dispatch = useDispatch();
  const {currentUser,userList} = useSelector(authSelector);

  console.log("userrole", userrole ,userList)
  useEffect(() => {
    if (userrole === "admin") {
          dispatch(getUsersListAction(currentUser?.userId));
    } else {
      
    }
  }, [])

  const handleUserStatus = (data) => {
    // dispatch(updateUserStatusAction({userId: data._id, userStatus: data.userStatus === "active" ? "inactive" : "active"}))
  }
  return (
    <div className="w-full flex justify-center items-center "  >
        {/* <UnderConstruction/> */}
        <CommonTable tableData={userList} setStatus={handleUserStatus}/>
    </div>
  );
};

export default UserList;
