"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoriesAction,
  deleteCategoriesAction,
  getCategoriesAction,
  updateCategoriesAction,
} from "@/redux/categories/middleware";
import { categoriesSelector } from "@/redux/categories/categoriesSlice";
import WrapperComponent from "@/components/common/wrapperComponent";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
import ShimmerButton from "../magicui/shimmer-button";
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
import CommonTextField from "../common/commonTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import FlipText from "../magicui/flip-text";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { swalConfirmationFunc } from "@/app/services/notification.services";
import { CommonTable } from "../common/commonTable";
import UnderConstruction from "../common/underContruction";

const UserList = () => {
  
  return (
    <div className="w-full flex justify-center items-center" >
        <UnderConstruction/>
        {/* <CommonTable />/////// */}
    </div>
  );
};

export default UserList;
