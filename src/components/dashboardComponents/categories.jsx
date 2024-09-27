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

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(categoriesSelector);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState({
    actions: "",
    selectedCategory: null,
  });
  const [selectedIndex, setSeletedIndex] = useState(null);
  const deleteCategories = (id) => {
    setLoading(true);
    const res = dispatch(deleteCategoriesAction({ id }));
    if (res) {
      setLoading(false);
    }
  };
  const close = () =>
    setOpenModal({ ...openModal, actions: "", selectedCategory: null });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      categoryName: "",
      categoryStatus: "inActive",
      // categorId :"",
      categoryImage: null,
      public_id: null,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category name is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values, "values");
      // const formData = new FormData();
      // formData.append("categoryName", values.categoryName);
      // formData.append(
      //   "categoryStatus",
      //   values.categoryStatus ? "active" : "inactive"
      // );
      // formData.append("action", openModal.actions);
      // formData.append("id", openModal.selectedCategory?._id || "");
      // if (values.categoryImage) {
      //   formData.append("file", values.categoryImage);
      // }
      //   if (openModal.actions === "edit" && openModal.selectedCategory?._id) {
      //         formData.append("id", openModal.selectedCategory?._id);
      //   }
      if (openModal.actions === "add") {
        dispatch(addCategoriesAction(values));
      } else if (openModal.actions === "edit") {
        dispatch(updateCategoriesAction({ ...values, categoryId: selectedId }));
      }
      close();
    },
  });
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      await dispatch(getCategoriesAction());
      setLoading(false);
    };

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (openModal.actions === "edit" && openModal.selectedCategory) {
      setFieldValue("categoryName", openModal.selectedCategory.categoryName);
      setFieldValue(
        "categoryStatus",
        openModal.selectedCategory.categoryStatus
      );
      console.log("openModal.selectedCategory", openModal.selectedCategory);
      // setFieldValue("categoryId", openModal.selectedCategory._id);
      setFieldValue("categoryImage", openModal.selectedCategory.categoryImage);
    } else if (openModal.actions === "add") {
      setFieldValue("categoryName", "");
      setFieldValue("categoryStatus", "inActive");
      // setFieldValue("categoryId", "");
      setFieldValue("categoryImage", null);
      setFieldValue("public_id", null);
    }
  }, [openModal.actions]);

  console.log("dfdfdcategories request", selectedId);
  return (
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
                  setOpenModal({
                    ...openModal,
                    actions: "edit",
                    selectedCategory: category,
                  });
                  setSelectedId(category._id || category.categoryId);
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                  edit
                </span>
              </ShimmerButton>
              <ShimmerButton
                className="mt-3 size-1 bg-[#ff0033]"
                onClick={(e) => {
                  e.preventDefault();
                  swalConfirmationFunc(
                    deleteCategories,
                    category._id || category.categoryId,
                    "You want to Delete!"
                  );
                  // dispatch(deleteCategoriesAction(category._id || category.categoryId));
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-red-500 dark:text-red-500 dark:from-grey dark:to-grey-900/10 ">
                  Delete
                </span>
              </ShimmerButton>
            </div>
          )}
        </div>
      ))}
      <div className="glass-effect-light cursor-pointer p-5 rounded-lg shadow-lg flex flex-col justify-center items-center ">
        <PlusIcon
          fontSize={20}
          height={30}
          width={30}
          onClick={(e) => {
            e.preventDefault();
            setOpenModal({
              ...openModal,
              actions: "add",
              selectedCategory: null,
            });
          }}
        />
      </div>

      <Dialog
        open={openModal.actions !== ""}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        // __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white "
              >
                <FlipText
                  className="text-1xl font-bold tracking-[-0.1em] text-left text-white dark:text-white md:text-2xl md:leading-[1rem] ext-base/7 font-medium text-white"
                  word={
                    openModal.actions == "add"
                      ? "Add Category"
                      : "Edit Category"
                  }
                />
              </DialogTitle>
              {/* <form onSubmit={handleSubmit}> */}
              <div className="mt-4 gap-2  flex flex-col justify-center items-center">
                <Field className="flex flex-col justify-center items-center" >
                  <Label className="text-sm/6 font-medium text-white text-transform-capitalize">
                    Icon
                  </Label>
                  {/* <Input
                    type="file"
                    name="categoryImage"
                    onChange={(e) =>
                      setFieldValue("categoryImage", e.target.files[0])
                    }
                  /> */}
                  {values?.categoryImage && (
                    <CldImage
                      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                      src={values?.categoryImage || ""} // Use this sample image or upload your own via the Media Explorer
                      width="200" // Transform the image: auto-crop to square aspect_ratio
                      height="200"
                      style={{marginBlock: "1rem"}}
                      crop={{
                        type: "auto",
                        source: true,
                      }}
                    />
                  )}
                  <CldUploadButton
                    uploadPreset="questionbank_preset"
                    options={{ maxFiles: 1 }}
                    style={{ color: "white", background: "red", width: "50%" }}
                    onSuccess={(response) => {
                      if (response?.event === "success") {
                        setFieldValue("public_id", response.info.public_id);
                        setFieldValue(
                          "categoryImage",
                          response.info.secure_url
                        );
                      }
                      // setFieldValue("categoryImage", secure_url)
                      // setFieldValue("public_id", public_id)
                    }}
                  />
                </Field>
                <CommonTextField
                  title="Category Name"
                  name="categoryName"
                  onChange={handleChange}
                  value={values.categoryName}
                  touched={touched.categoryName}
                  errors={touched.categoryName && errors.categoryName}
                />
                <Field style={{width:"100%"}}>
                  <Label className="text-sm/6 font-medium text-white text-transform-capitalize">
                    Category Status
                  </Label>
                  <Switch
                    checked={values.categoryStatus === "active" ? true : false}
                    onChange={() =>
                      setFieldValue(
                        "categoryStatus",
                        values.categoryStatus === "active"
                          ? "inActive"
                          : "active"
                      )
                    }
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#2A3047] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#24A148]"
                    name="categoryStatus"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                </Field>
                <div className="flex justify-center items-center w-full">
                  <ShimmerButton
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      // close();
                    }}
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                      Submit
                    </span>
                  </ShimmerButton>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Categories;
