import data from "../data.json";
import { useParams } from "react-router";

function Planet() {
  const params = useParams();
  const planetName = params.planet;

  const planet = data.find(
    (planetObg) => planetObg.name.toLowerCase() === planetName?.toLowerCase()
  );

  console.log(planet);

  return (
    <div className="px-8">
      <div className="flex md:hidden justify-between text-xs">
        <p className="border-b-4 py-5">
          <p>OVERVIEW</p>
        </p>
        <p className="border-b-4 py-5">STRUCTURE</p>
        <p className="border-b-4 py-5">SURPACE</p>
      </div>
      <div className="h-[300px] flex justify-center items-center">
        <img
          src={planet?.images.planet}
          style={{
            width: planet?.planetSize?.mobile?.["width"],
            height: planet?.planetSize?.mobile?.["height"],
          }}
          alt="planet image"
        />
      </div>
      <div className="pb-12">
        <div className="text-center">
          <p className="text-white text-[40px]">{planet?.name}</p>
          <p className="text-xs text-white mt-4">{planet?.overview.content}</p>
        </div>
        <div className="flex items-center justify-center mt-8 text-white">
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
        <div className="mt-6">
          <div className="border px-6 py-3 flex justify-between mt-2">
            <p>ROTATION TIME</p>
            <p className="text-xl text-white">58.6 DAYS</p>
          </div>
          <div className="border px-6 py-3 flex justify-between mt-2">
            <p>REVOLUTION TIME</p>
            <p className="text-xl text-white">87.97 DAYS</p>
          </div>
          <div className="border px-6 py-3 flex justify-between mt-2">
            <p>RADIUS</p>
            <p className="text-xl text-white">2,439.7 KM</p>
          </div>
          <div className="border px-6 py-3 flex justify-between mt-2">
            <p>AVERAGE TEMP.</p>
            <p className="text-xl text-white">430°C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planet;
