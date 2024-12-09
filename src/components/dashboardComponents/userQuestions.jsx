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
import { useParams, useRouter } from "next/navigation";
import { authSelector } from "@/redux/auth/authSlice";
import { getUsersListAction, updateUserStatusAction } from "@/redux/auth/middleware";
import CommonTable from "../common/commonTable";
import CommonEditableAccordian from "../common/commonEditableAccordian";
import { categoriesSelector } from "@/redux/categories/categoriesSlice";
import { useFormik } from "formik";
import { getCategoriesAction } from "@/redux/categories/middleware";
import { CldImage } from "next-cloudinary";
import ShimmerButton from "../magicui/shimmer-button";

const UserQuestions = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories } = useSelector(categoriesSelector);
  const { currentUser: user } = useSelector(authSelector);
  const userRole = user?.userRole;
  const [selectedIndex, setSeletedIndex] = useState(null);
 
  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getCategoriesAction());
    };

    fetchCategories();
  }, [dispatch]);

  console.log("user ", user);
 
  return (
    <div className="h-full w-full border-none p-12">
        <div className="col-span-1 w-full fs-16 font-bold text-white font-large mb-5"> Select Category</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
    
      {categories?.map((category, index) => (
        <div
          className="glass-effect-dark cursor-pointer p-5 rounded-lg shadow-lg relative flex justify-center flex-col items-center"
          key={index}
          onMouseEnter={() => setSeletedIndex(index)}
          onMouseLeave={() => setSeletedIndex(null)}
        >
          {category?.categoryStatus === "inActive" && (
            <div
              className="glass-effect-light absolute top-0 left-0 flex justify-center items-center"
              style={{ height: "100%", width: "100%", fontSize: "26px", fontWeight: "bold", color:"red" }}

            >
              In Active
            </div>
          )}
          {/* <Image
            src="/images/cat.png"
            alt={category.categoryImage}
            width={100}
            height={100}
            className="w-20 h-20"
          /> */}
          <CldImage
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            src={category?.categoryImage || ""} // Use this sample image or upload your own via the Media Explorer
            width="100" // Transform the image: auto-crop to square aspect_ratio
            height="100"
            crop={{
              type: "auto",
              source: true,
            }}
          />
          <h6 className="text-lg font-bold text-center text-white capitalize">
            {category.categoryName}
          </h6>
          {index === selectedIndex && (
            <div
              className="glass-effect-light flex flex-col justify-center items-center absolute top-0 left-0"
              style={{ height: "100%", width: "100%" }}
            >
              <ShimmerButton
                onClick={(e) => {
                  e.preventDefault();
                 router.push(`/dashboard/${userRole}/questionlist/${category?._id}`);
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                  Select
                </span>
              </ShimmerButton>
              
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
    // <div className="w-full flex justify-center" style={{background:"red"}}  >
      //   {/* <UnderConstruction/> */}
      //  {/* <CommonEditableAccordian/> */}
    // </div>
  );
};

export default UserQuestions;
