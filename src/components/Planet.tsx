import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useMediaQuery } from "react-responsive";
import data from "../data.json";

type ImageType = "overview" | "structure" | "surface";

function Planet() {
  const [imageType, setImageType] = useState<ImageType>("overview");
  const params = useParams();
  const planetName = params.planet;

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const planet = data.find(
    (planetObj) => planetObj.name.toLowerCase() === planetName?.toLowerCase()
  );

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

  const getPlanetSize = () => {
    if (isDesktop) return planet?.planetSize?.desktop;
    if (isTablet) return planet?.planetSize?.tablet;
    return planet?.planetSize?.mobile;
  };

  const getGeologyImageSize = () => {
    if (isDesktop) {
      return { width: "163px", height: "199px", bottom: "-80px" };
    }
    if (isTablet) {
      return { width: "120px", height: "146px", bottom: "-60px" };
    }
    return { width: "80px", height: "98px", bottom: "-40px" };
  };

  return (
    <>
      {isMobile && (
        <div className="flex justify-between text-xs px-8">
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
      )}
      <div className="lg:px-[165px]">
        <div className="px-8 block mt-[126px] lg:flex justify-between">
          <div className="lg:w-[50%] w-full flex justify-center items-center">
            {imageType === "surface" ? (
              <div className="relative">
                <img
                  src={planet?.images.planet}
                  style={{
                    width: getPlanetSize()?.width,
                    height: getPlanetSize()?.height,
                  }}
                  alt="planet image"
                />
                <img
                  src={planet?.images.geology}
                  style={{
                    ...getGeologyImageSize(),
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  alt="geology image"
                />
              </div>
            ) : (
              <img
                src={getImageSource()}
                style={{
                  width: getPlanetSize()?.width,
                  height: getPlanetSize()?.height,
                }}
                alt="planet image"
              />
            )}
          </div>
          <div className="pb-12 block md:flex text-center md:text-left w-full lg:block lg:items-end lg:max-w-[350px]">
            <div className="">
              <div className="mt-10">
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
            {!isMobile && (
              <div className="md:ml-[69px] lg:ml-0 w-full justify-between text-xs mt-10">
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
            )}
          </div>
        </div>
        {!isMobile && !isDesktop && (
          <div className="flex items-center px-8 text-white">
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
        )}
        <div className="mt-20 w-full block md:flex md:justify-between px-8 gap-2">
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
