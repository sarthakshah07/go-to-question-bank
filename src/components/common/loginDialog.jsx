"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import CommonTextField from "./commonTextField";
import ShimmerButton from "../magicui/shimmer-button";
import FlipText from "../magicui/flip-text";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginByEmailAction, signUpAction } from "@/redux/auth/middleware";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function LoginDialog({ openLoginModal, setOpeLoginModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch()
  const router = useRouter();
  function open() {
    setOpeLoginModal(true);
  }

  function close() {
    setOpeLoginModal(false);
  }

  const signInInitialValues = {
    email: "",
    password: "",
  };

  const signUpInitialValues = {
    name: "",
    mobile_number: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile_number: Yup.string().required("Mobile number is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: isLogin ? signInInitialValues : signUpInitialValues,
      validationSchema: isLogin
        ? signInValidationSchema
        : signUpValidationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values , "values", isLogin);
        if (isLogin) {
          dispatch(loginByEmailAction(values)).then((res) => {
            if (res?.payload?.status === 200 || res?.payload?.status === 201) {
              close();
              console.log("res?.payload", res?.payload?.data?.userRole);
              if (res?.payload?.data?.userRole === "admin") {
                router.push("/dashboard/admin");
              }

            }
          })
        } else {
          dispatch(signUpAction(values)).then((res) => {
            if (res?.payload?.status === 200 || res?.payload?.status === 201) {
              close();
            }
          })
        }
      },
    });
  return (
    <>
      <Dialog
        open={openLoginModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
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
                  word={isLogin ? "Sign In" : "Sign Up"}
                />
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50  text-center">
                {isLogin
                  ? "Sign in to your account"
                  : "Sign up your account to add questions"}
              </p>
              {/* <form onSubmit={handleSubmit}> */}
                <div className="mt-4">
                  {!isLogin && (
                    <CommonTextField
                      title="Name"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      touched={touched.name}
                      errors={ touched.name && errors.name}
                    />
                  )}
                  <CommonTextField
                    title="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    touched={touched.email}
                    errors={ touched.email && errors.email}
                  />
                  {!isLogin && (
                    <CommonTextField
                      title="Mobile Number"
                      name="mobile_number"
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value.length <= 10 && /^\d+$/.test(value)) {
                            console.log("value", value);
                          handleChange(e);
                        }
                      }}
                    //   value={values.mobile_number}
                    value={values.mobile_number?.slice(0, 10)}
                      touched={touched.mobile_number}
                      errors={ touched.mobile_number && errors.mobile_number}
                      type="number"
                    />
                  )}
                  <CommonTextField
                    title="Password"
                    name="password"
                    isPassword
                    onChange={handleChange}
                    touched={touched.password}
                    errors={touched.password && errors.password}
                  />
                  {!isLogin && (
                    <CommonTextField
                      title="Confirm Password"
                      name="confirm_password"
                      isPassword
                      onChange={handleChange}
                      value={values.confirm_password}
                      touched={touched.confirm_password}
                      errors={ touched.confirm_password && errors.confirm_password}
                    />
                  )}
                  <div className="z-10 flex min-h-[1rem] pt-4 items-center justify-center">
                    <ShimmerButton
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                        {isLogin ? "Sign In" : "Sign Up"}
                      </span>
                    </ShimmerButton>
                  </div>
                  <div className="relative flex align-middle min-h-[1rem] pt-4 items-center justify-center">
                    <p className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                      {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    </p>
                    <Button
                      onClick={() => {
                        setIsLogin(!isLogin);
                      }}
                      className="z-10 flex ml-2 items-center justify-center"
                    >
                      <span
                        className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 
                    "
                        style={{ textDecoration: "none" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        {isLogin ? "Sign Up" : "Sign In"}
                      </span>
                    </Button>
                  </div>
                </div>
              {/* </form> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
