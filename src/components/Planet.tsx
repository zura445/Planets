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
      <div className="text-white">{planet && planet.name}</div>
    </div>
  );
}

export default Planet;
