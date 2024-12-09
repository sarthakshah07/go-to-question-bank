"use client";
import CommonQuestionDisplay from "@/components/common/commonQuestionDisplay";
import CommonTable from "@/components/common/commonTable";
import WrapperComponent from "@/components/common/wrapperComponent";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { getQuestionsByCategoryIdAction } from "@/redux/questionsData/middleware";
import { questionsSelector } from "@/redux/questionsData/questionDataSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const Page = () => {


  return (
    <WrapperComponent>
     <CommonQuestionDisplay/>
    </WrapperComponent>
  );
};

export default Page;