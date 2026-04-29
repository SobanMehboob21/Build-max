import React from "react";
import { NavLink, Link } from "react-router-dom";

const HeaderTwo = () => {
  return (
    <div className="header-two">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="filter_types">
              <div className="filer_heading">
                <i className="ri-filter-line"></i>
                Filter by type:
              </div>
              <div className="tabs">
                <NavLink
                  to="/core-materials"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  All
                </NavLink>

                <NavLink
                  to="/cement"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  cement
                </NavLink>

                <NavLink
                  to="/sands"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  sands
                </NavLink>

                <NavLink
                  to="/Bricks"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  Bricks
                </NavLink>

                <NavLink
                  to="/steel"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  steel
                </NavLink>

                <NavLink
                  to="/iron"
                  className={({ isActive }) =>
                    isActive ? "tab_link active" : "tab_link"
                  }
                >
                  iron
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTwo;
