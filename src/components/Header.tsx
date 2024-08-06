import data from "../data.json";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <div className="flex">
          <div className="text-lg">THE PLANETS</div>
          <ul className="flex">
            {data.map((planet, index) => {
              return (
                <li key={index}>
                  <Link to={`/${planet.name}`}>{planet.name}</Link>
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
