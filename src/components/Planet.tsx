import data from "../data.json";
import { useParams } from "react-router";

function Planet() {
  const params = useParams();
  const planetName = params.planet;

  const planet = data.find((planetObg) => planetObg.name === planetName);

  return <div className="text-white">{planet?.name}</div>;
}

export default Planet;
