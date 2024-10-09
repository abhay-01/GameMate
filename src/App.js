import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./Routes";
import { Sidebar } from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

function App() {
  return (
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-0 lg:ml-[250px]">
            <Navbar />
            <div className="" >
            <TopBar />
            </div>
            <div className="flex-1 max-lg:mb-[60px]  max-lg:mt-[40px] lg:mt-[70px]">
            {/* <div className="flex-1 sm:mt-[80px] lg:mt-[70px]"> */}

              {" "}
              {/* Adjusts to compensate for the fixed navbar */}
              <AppRoutes />
            </div>
            <BottomBar />
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
