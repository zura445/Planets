import data from "../data.json";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <div className="md:flex block justify-between pt-[22px] px-8 border-b pb-7">
          <div className="text-lg md:block text-center text-white">
            THE PLANETS
          </div>
          <ul className="hidden sm:flex gap-8 text-xs items-center">
            {data.map((planet, index) => {
              return (
                <li className="" key={index}>
                  <Link className="text-white" to={`/${planet.name}`}>
                    {planet.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
