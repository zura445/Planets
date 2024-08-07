import data from "../data.json";
import { useParams } from "react-router";

function Planet() {
  const params = useParams();
  const planetName = params.planet;

  const planet = data.find(
    (planetObg) => planetObg.name.toLowerCase() === planetName?.toLowerCase()
  );

  console.log(planet);

  return <div className="text-white">{planet && planet.name}</div>;
}

export default Planet;
