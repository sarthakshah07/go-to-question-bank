"use client";
import WrapperComponent from "@/components/common/wrapperComponent";
import { authSelector } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import Categories from "@/components/dashboardComponents/categories";
import UserList from "@/components/dashboardComponents/usersList";
import UnderConstruction from "@/components/common/underContruction";
import UserSettings from "@/components/dashboardComponents/UserSettings";


const Page = () => {
  const { currentUser: user } = useSelector(authSelector);
  const userRole = user?.userRole;
 
  const categories = userRole === "admin" ? [
    {
      name: "Categories",
      posts: [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
        { id: 3, title: "Post 3" },
      ],
    },
    {
      name: "Questions",
      posts: [
        { id: 4, title: "Post 4" },
        { id: 5, title: "Post 5" },
      ]
    },
    {
      name: "Users",
      posts: [
        { id: 4, title: "Post 4" },
        { id: 5, title: "Post 5" },
      ]
    },
    {
      name: "settings",
      posts: [
        { id: 4, title: "Post 4" },
        { id: 5, title: "Post 5" },
      ]
    }
  ] : [
    {
      name: "My Questions",
      posts: []
    },
    {
      name: "settings"
    },
  ]
  // const [selectedTab, setSelectedTab] = useState(categories?.[0]);
  const renderUi = (name) => {
    switch (name) {
      case "Categories":
        return <Categories/>;
      case "Questions" :
        return <UnderConstruction/>;
      case "Users":
        return <UserList/>;
      case "settings":
        return <UserSettings/>;
        case "My Questions":
          return <UnderConstruction/>;
      default:
        return null;
    }
  }
  return (
    <WrapperComponent>
      <div className="flex flex-col items-center">
        {/* <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1> */}
        <div className="flex w-full justify-center h-100" >
          <div className="w-full ">
            <TabGroup >
              <TabList className="flex gap-4 justify-center" >
                <div className="glass-effect-dark flex gap-4 p-2 border rounded-full ">
                {categories.map(({ name }) => (
                  <Tab
                    key={name}
                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    value={name}
                    // onClick={(e) => setSelectedTab(name)}
                  >
                    {name}
                  </Tab>
                ))}
                </div>
                
              </TabList>
              <TabPanels className="mt-20 " >
                {categories.map(({ name, posts }) => (
                  <TabPanel key={name} className="rounded-xl bg-white/8 p-6">
                    {renderUi(name)}
                  </TabPanel>
                ))}
              </TabPanels>
              
            </TabGroup>
          </div>
        </div>
      </div>
    </WrapperComponent>
  );
};

export default Page;
