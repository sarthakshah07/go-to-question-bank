// CommonTable.jsx
"use client";

import { Switch } from "@headlessui/react";
import moment from "moment/moment";
import { useEffect } from "react";

const CommonTable = ({tableData, setStatus}) => {
  const headers = tableData?.reduce((acc, curr) => [...acc, ...Object.keys(curr)], []).filter((item, index, array) => array.indexOf(item) !== index) || [];
 
  const rows = tableData?.map((user) => {
    return(
      <tr key={user.id} className="border-b  dark:border-gray-700">
        {headers.map((header,index) => {
          console.log("user[header]", user[header], header)
           if (header === "_id") return
           if (header?.toLowerCase().includes("status")) return (
            <td key={header} className="px-6 py-4">
              <Switch
                    checked={user[header] === "active" ? true : false}
                    onChange={() =>
                      setStatus(user)
                    }
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#2A3047] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-[#24A148]"
                    name="status"
                  />
            </td>
          )
          return(
          <td key={header} className="px-6 py-4">{header === "createdAt" ? moment(user[header]).format("MMMM Do YYYY, h:mm a") : user[header]}</td>
        )})}
      </tr>
    )
  }) || [];
  const users = tableData

  // useEffect(() => {
  //   console.log("users", users)

  // }, [users])
  console.log("users headers", users ,headers)
  
  return (
<div class="relative overflow-x-auto w-full">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase glass-effect-dark dark:text-gray-400">
            <tr>
              {headers.map((header, index) => {
               if (header === "_id") return
                return(
                <th scope="col" class="px-6 py-3" key={index}>
                    {header?.replace("_", " ")?.trim()}
                </th>
              )})}
            </tr>
        </thead>
        <tbody>
        {rows}
            
        </tbody>
    </table>
</div>

  );
};

export default CommonTable;