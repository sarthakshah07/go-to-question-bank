import Image from "next/image";
import img from "@/app/assets/pngwing.com.png";



const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center ">
      <Image
        src={img}
        alt="Under Construction"
        width={300}
        height={300}
      />
    
    </div>
  );
};

export default UnderConstruction;