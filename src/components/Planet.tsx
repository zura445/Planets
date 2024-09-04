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
      <div className="lg:px-[165px]">
        <div className="px-8 block mt-[126px] lg:flex justify-between">
          <div className="lg:w-[50%] w-full flex justify-center items-center ">
            <img
              src={getImageSource()}
              style={{
                width: planet?.planetSize?.[deviceType]?.["width"],
                height: planet?.planetSize?.[deviceType]?.["height"],
              }}
              alt="planet image"
            />
          </div>
          <div className="pb-12 block md:flex text-center md:text-left w-full lg:block lg:items-end lg:max-w-[350px]">
            <div className="">
              <div className="">
                <p className="text-white text-[40px]">{planet?.name}</p>
                <p className="text-xs text-white mt-4">{getContent()}</p>
              </div>
              <div className="flex items-center mt-8 text-white md:hidden lg:flex">
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
            <div className="hidden md:block md:ml-[69px] lg:ml-0 w-full justify-between text-xs mt-10">
              <p
                style={{
                  backgroundColor:
                    imageType === "overview"
                      ? planet?.style?.["background-color"]
                      : "",
                }}
                className={`py-5 cursor-pointer text-white ${
                  imageType === "overview" ? "" : "text-gray-500"
                }`}
                onClick={() => setImageType("overview")}
              >
                <span className="px-7">01</span> OVERVIEW
              </p>
              <p
                style={{
                  backgroundColor:
                    imageType === "structure"
                      ? planet?.style?.["background-color"]
                      : "",
                }}
                className={`py-5 cursor-pointer text-white mt-4 ${
                  imageType === "structure" ? "" : "text-gray-500"
                }`}
                onClick={() => setImageType("structure")}
              >
                <span className="px-7">02</span> INTERNAL STRUCTURE
              </p>
              <p
                style={{
                  backgroundColor:
                    imageType === "surface"
                      ? planet?.style?.["background-color"]
                      : "",
                }}
                className={`py-5 cursor-pointer text-white mt-4 ${
                  imageType === "surface" ? "" : "text-gray-500"
                }`}
                onClick={() => setImageType("surface")}
              >
                <span className="px-7">03</span> SURFACE GEOLOGY
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex hidden items-center px-8 text-white lg:hidden">
          <div className="flex items-center">
            <p>Source :</p>
            <a href={planet?.overview.source} target="blank" className="ml-1">
              Wikipedia
            </a>
            <img
              src={planet?.overview.linkErrow}
              className="w-3 h-3 ml-1"
              alt="source link"
            />
          </div>
        </div>
        <div className="mt-7 w-full block md:flex md:justify-between px-8">
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
      </div>
    </>
  );
}

export default Planet;
