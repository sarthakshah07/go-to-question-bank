import CategoriesSection from "@/components/common/categoriesSection";
import LandingSection from "@/components/common/landingSection";
import LoginDialog from "@/components/common/loginDialog";
import NavBar from "@/components/common/navbar";
import WrapperComponent from "@/components/common/wrapperComponent";



export default function Home() {
  return (
    <WrapperComponent>
      <LandingSection/>
      <CategoriesSection/>
    </WrapperComponent>
    // // <div className="dark h-full bg-background">
    //   {/* <NavBar/> */}
    //  {/* <ToastContainer/> */}
    // // </div>
  );
}
