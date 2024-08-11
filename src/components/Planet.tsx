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
      <div className="">
        <div className="text-center">
          <p className="text-white text-[40px]">{planet?.name}</p>
          <p className="text-xs text-white mt-4">{planet?.overview.content}</p>
        </div>
        <div className="flex justify-center mt-8 text-white">
          <p>Source</p>
          <a href={planet?.overview.source}>Wikipedia</a>
          <img src={planet?.overview.linkErrow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Planet;
