import { React, forwardRef } from "react";
import { HomeIcon, SwatchIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

const Sidebar = forwardRef(({ showNav }, ref) => {
  const location = useLocation();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img src={require("../images/ciboox.png")} alt="Company Logo" className="w-32 h-auto" />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link to="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${location.pathname === "/" ? "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link to="/controls">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname === "/controls" ? "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <SwatchIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Controls</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
