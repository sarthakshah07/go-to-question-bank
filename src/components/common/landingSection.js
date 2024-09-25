"use client"

import IconCloud from "../magicui/icon-cloud";
import SparklesText from "../magicui/sparkles-text";
import TextRevealByWord from "../magicui/text-reveal";
import CategoriesSection from "./categoriesSection";

const LandingSection = () => {
    const slugs = [
        "typescript",
        "javascript",
        "dart",
        "java",
        "react",
        "flutter",
        "android",
        "html5",
        "css3",
        "nodedotjs",
        "express",
        "nextdotjs",
        "prisma",
        "amazonaws",
        "postgresql",
        "firebase",
        "nginx",
        "vercel",
        "testinglibrary",
        "jest",
        "cypress",
        "docker",
        "git",
        "jira",
        "github",
        "gitlab",
        "visualstudiocode",
        "androidstudio",
        "sonarqube",
        "figma",
      ];
    return (
      <section>
        <div className="relative flex flex-col h-full w-full  items-center justify-center px-0 pb-0 pt-0 ">
        {/* <TextRevealByWord text="Magic UI will change the way you design."  className="positon-fixed  h-10top-0 left-0 text-2xl text-red" /> */}
        <SparklesText text="Let's Learn Together"  className="text-2xl text-white position-absolute top-50 left-0"  />
        <IconCloud iconSlugs={slugs} />
        {/* <CategoriesSection/> */}
      </div>
      </section>
    )
}

export default LandingSection