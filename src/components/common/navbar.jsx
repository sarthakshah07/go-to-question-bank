"use client";
import {
  authSelector,
  getUserDetails,
  signOutAction,
} from "@/redux/auth/authSlice";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import ShimmerButton from "../magicui/shimmer-button";
import LoginDialog from "./loginDialog";
import { useEffect, useState } from "react";
import { swalConfirmationFunc } from "@/app/services/notification.services";
import Link from "next/link";

const navigation = [{ name: "Question Bank", href: "/", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getInitalOfName = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
export default function NavBar() {
  const { currentUser } = useSelector(authSelector);
  const [isLoading, setIsloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    dispatch(getUserDetails());
  }, []);
  const [openLoginModal, setOpeLoginModal] = useState(false);
  const handleLogout = () => {
    dispatch(signOutAction());
  };
  return (
    <Disclosure as="nav" className="sticky top-0  w-full">
      {/* className="fixed bg-black-800 z-50 w-full" */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            {/* <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton> */}
          </div>
          <div className="flex flex-1 ">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <div className="flex space-x-4 ml-5">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      "text-gray-300 font-medium hover:text-white"
                      //   'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {isLoading ? null : (
            <>
              {!currentUser?.userId ? (
                <>
                  {" "}
                  {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> */}
                  <div className="z-10 flex min-h-[16rem] items-center justify-center">
                    <ShimmerButton
                      onClick={() => {
                        console.log("clicked");
                        setOpeLoginModal(true);
                      }}
                    >
                      <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                        Sign in
                      </span>
                    </ShimmerButton>
                  </div>
                  {/* </div> */}
                </>
              ) : (
                <>
                  {" "}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button> */}
                    {/* <div className="hidden sm:block sm:ml-6"> */}
                    <div className="flex items-right">
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                          {currentUser?.name}
                        </p>
                        <p className="text-sm font-medium text-gray-300">
                          {currentUser?.userRole}
                        </p>
                      </div>
                    </div>
                    {/* </div> */}

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {/* <img
                    alt="asdf"
                    src=""
                    // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  /> */}
                          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                              {getInitalOfName(currentUser?.name)}
                            </span>
                          </div>
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          {/* <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        My Dashboard */}
                          <Link
                            href={`/dashboard/${currentUser?.userRole}`}
                            style={{
                              textDecoration: "none",
                              paddingLeft: "10px",
                            }}
                          >
                            {" "}
                            My Dashboard{" "}
                          </Link>
                          {/* </a> */}
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            Settings
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                            onClick={() => {
                              swalConfirmationFunc(
                                handleLogout,
                                null,
                                "Want to Sign out?"
                              );
                            }}
                          >
                            Sign out
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <LoginDialog
        openLoginModal={openLoginModal}
        setOpeLoginModal={setOpeLoginModal}
      />
      {/* <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel> */}
    </Disclosure>
  );
}
