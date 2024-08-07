import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router";
import Planet from "./components/Planet";

function App() {
  return (
    <>
      <div className="bg-hero-pattern">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={"/earth"} />}></Route>
          <Route path="/:planet" element={<Planet />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
