import Image from "next/image";
import NoDataImage from "@/app/assets/Nodata.png";
const NoDataFound = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Image src={NoDataImage} alt="No Data Found" width={300} height={300} />
        </div>
    );
};

export default NoDataFound;