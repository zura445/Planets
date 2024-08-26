import { useState, useEffect } from "react";
import data from "../data.json";
import { useParams } from "react-router";

type DeviceType = "mobile" | "tablet" | "desktop";
type ImageType = "overview" | "structure" | "surface";

function Planet() {
  const [deviceType, setDeviceType] = useState<DeviceType>("mobile");
  const [imageType, setImageType] = useState<ImageType>("overview");
  const params = useParams();
  const planetName = params.planet;

  const planet = data.find(
    (planetObj) => planetObj.name.toLowerCase() === planetName?.toLowerCase()
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setImageType("overview");
  }, [planetName]);

  const getImageSource = () => {
    switch (imageType) {
      case "structure":
        return planet?.images.internal;
      case "surface":
        return planet?.images.geology;
      case "overview":
      default:
        return planet?.images.planet;
    }
  };

  const getContent = () => {
    switch (imageType) {
      case "structure":
        return planet?.structure.content;
      case "surface":
        return planet?.geology.content;
      case "overview":
      default:
        return planet?.overview.content;
    }
  };

  return (
    <>
      <div className="flex md:hidden justify-between text-xs px-8">
        <p
          className={`border-b-4 py-5 cursor-pointer ${
            imageType === "overview"
              ? "border-blue-500 text-blue-500"
              : "border-gray-500 text-gray-500"
          }`}
          onClick={() => setImageType("overview")}
        >
          OVERVIEW
        </p>
        <p
          className={`border-b-4 py-5 cursor-pointer ${
            imageType === "structure"
              ? "border-blue-500 text-blue-500"
              : "border-gray-500 text-gray-500"
          }`}
          onClick={() => setImageType("structure")}
        >
          STRUCTURE
        </p>
        <p
          className={`border-b-4 py-5 cursor-pointer ${
            imageType === "surface"
              ? "border-blue-500 text-blue-500"
              : "border-gray-500 text-gray-500"
          }`}
          onClick={() => setImageType("surface")}
        >
          SURFACE
        </p>
      </div>
      <div className="px-8 block mt-[126px]">
        <div className="h-[300px] m-auto flex justify-center items-center ">
          <img
            src={getImageSource()}
            style={{
              width: planet?.planetSize?.[deviceType]?.["width"],
              height: planet?.planetSize?.[deviceType]?.["height"],
            }}
            alt="planet image"
          />
        </div>
        <div className="pb-12 block md:flex">
          <div className="md:mr-[69px]">
            <div className="">
              <p className="text-white text-[40px]">{planet?.name}</p>
              <p className="text-xs text-white mt-4">{getContent()}</p>
            </div>
            <div className="flex items-center justify-center mt-8 text-white">
              <div className="flex items-center">
                <p>Source :</p>
                <a
                  href={planet?.overview.source}
                  target="blank"
                  className="ml-1"
                >
                  Wikipedia
                </a>
                <img
                  src={planet?.overview.linkErrow}
                  className="w-3 h-3 ml-1"
                  alt="source link"
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block w-full justify-between text-xs px-8 md:ml-10 lg:ml-20">
            <p
              className={`py-5 cursor-pointer border text-white ${
                imageType === "overview"
                  ? "border-[#D83A34] bg-[#D83A34]"
                  : "text-gray-500"
              }`}
              onClick={() => setImageType("overview")}
            >
              <span className="px-7">01</span> OVERVIEW
            </p>
            <p
              className={`py-5 cursor-pointer border text-white mt-4 ${
                imageType === "structure"
                  ? "border-[#D83A34] bg-[#D83A34]"
                  : "text-gray-500"
              }`}
              onClick={() => setImageType("structure")}
            >
              <span className="px-7">02</span> ITERNAL STRUCTURE
            </p>
            <p
              className={`py-5 cursor-pointer border text-white mt-4 ${
                imageType === "surface"
                  ? "border-[#D83A34] bg-[#D83A34]"
                  : "text-gray-500"
              }`}
              onClick={() => setImageType("surface")}
            >
              <span className="px-7">03</span> SURFACE GEOLOGY
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-0 w-full block md:flex md:justify-around">
        <div className="border px-6 py-3 flex md:block justify-between mt-2 lg:w-[225px]">
          <p>ROTATION TIME</p>
          <p className="text-xl text-white md:mt-2">{planet?.rotation}</p>
        </div>
        <div className="border px-6 py-3 flex md:block justify-between mt-2 lg:w-[225px]">
          <p>REVOLUTION TIME</p>
          <p className="text-xl text-white md:mt-2">{planet?.revolution}</p>
        </div>
        <div className="border px-6 py-3 flex md:block justify-between mt-2 lg:w-[225px]">
          <p>RADIUS</p>
          <p className="text-xl text-white md:mt-2">{planet?.radius}</p>
        </div>
        <div className="border px-6 py-3 flex md:block justify-between mt-2 lg:w-[225px]">
          <p>AVERAGE TEMP.</p>
          <p className="text-xl text-white md:mt-2">{planet?.temperature}</p>
        </div>
      </div>
    </>
  );
}

export default Planet;
