import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-[250px]">
            <Navbar />
            <div className="mt-[70px]">
              {" "}
              {/* Adjusts to compensate for the fixed navbar */}
              <AppRoutes />
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
