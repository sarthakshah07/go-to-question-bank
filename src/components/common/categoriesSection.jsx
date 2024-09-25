"use client";
import { categoriesSelector } from "@/redux/categories/categoriesSlice";
import { getCategoriesAction } from "@/redux/categories/middleware";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import SparklesText from "../magicui/sparkles-text";
import SlightFlip from "../magicui/flip-text";
import graphics from "@/app/assets/graph.png";
import Image from "next/image";
import ShimmerButton from "../magicui/shimmer-button";
import { CldImage } from "next-cloudinary";

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(categoriesSelector);
  const [selectedIndex, setSeletedIndex] = useState(null);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0.5,
  // });
  console.log(categories, "categories");
  return (
    <div className="h-full w-full border-none p-12"
    //  ref={ref}
     >
      {/* {inView && ( */}
        <SlightFlip
          word="Explore now.."

          className="text-2xl text-white float-left mb-5 p-0"
        />
      {/* )} */}
      {/* {inView && ( */}   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
      {categories?.map((category, index) => (
        <div
        className="glass-effect-dark  cursor-pointer p-5 rounded-lg col-2 shadow-lg relative flex justify-center flex-col items-center"
        key={index}
        onMouseEnter={() => setSeletedIndex(index)}
        onMouseLeave={() => setSeletedIndex(null)}
      >
        {category?.categoryStatus === "inActive" && (
          <div
            className="glass-effect-light absolute top-0 left-0 flex justify-center items-center text-center"
            style={{ height: "100%", width: "100%", fontSize: "26px", fontWeight: "bold", color:"red" }}

          >
              Comming Soon
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
        {index === selectedIndex && category?.categoryStatus !== "inActive" && (
          <div
            className="glass-effect-light flex flex-col justify-center items-center absolute top-0 left-0"
            style={{ height: "100%", width: "100%" }}
          >
            <ShimmerButton
             
            >
              <span className="whitespace-pre-wrap text-center text-sm font-small leading-none tracking-tight text-white dark:from-grey dark:to-grey-900/10 ">
                View
              </span>
            </ShimmerButton>
           
          </div>
        )}
      </div>
    ))}
     </div>
      
      {/* )} */}
    </div>
  );
};

export default CategoriesSection;
