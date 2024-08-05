import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Planet from "./components/Planet";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Routes>
          <Route path="/:planet" element={<Planet />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
