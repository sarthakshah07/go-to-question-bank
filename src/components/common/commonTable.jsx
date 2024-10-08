// CommonTable.jsx
"use client";

import { Switch } from "@headlessui/react";
import moment from "moment/moment";
import { useEffect } from "react";

const CommonTable = ({ tableData, setStatus }) => {
  const headers =
    tableData?.length === 1
      ? Object.keys(tableData[0])
      : tableData
          ?.reduce((acc, curr) => [...acc, ...Object.keys(curr)], [])
          .filter((item, index, array) => array.indexOf(item) !== index) || [];

  const rows =
    tableData?.map((user) => {
      return (
        <tr key={user.id} className="border-b  dark:border-gray-700">
          {headers.map((header, index) => {
            console.log("user[header]", user[header], header);
            if (header === "_id") return;
            if (header?.toLowerCase().includes("status"))
              return (
                <td key={header} className="px-6 py-4">
                  {/* <Switch
                    checked={user[header] === "active" ? true : false}
                    onChange={() =>
                      setStatus(user)
                    }
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#2A3047] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#24A148]"
                    name="status"
                  /> */}
                  <Switch
                    checked={user[header] === "active" ? true : false}
                    onChange={
                      (e) =>
                        setStatus({
                          ...user,
                          [header]:
                            user[header] === "inactive" ? "active" : "inactive",
                        })
                      // console.log("user", user,e )
                    }
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                  </Switch>
                </td>
              );
            return (
              <td className="px-6 py-4" key={header}>
                {header === "createdAt"
                  ? moment(user[header]).format("MMMM Do YYYY, h:mm a")
                  : user[header]}
              </td>
            );
          })}
        </tr>
      );
    }) || [];
  const users = tableData;

  // useEffect(() => {
  //   console.log("users", users)

  // }, [users])

  return (
    <div class="relative overflow-x-auto w-full">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase glass-effect-dark dark:text-gray-400">
          <tr>
            {headers.map((header, index) => {
              if (header === "_id") return;
              return (
                <th scope="col" class="px-6 py-3" key={index + header}>
                  {header?.replace("_", " ")?.trim()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default CommonTable;
