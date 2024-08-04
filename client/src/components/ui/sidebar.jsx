import React from "react";
import LogoAdmin from "../../assets/svg/logo.svg";
import { LuLogOut } from "react-icons/lu";
import { dataSidebar } from "../../data/datasidebar";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <div className="w-[280px] flex flex-col justify-between border-r border-main min-h-screen">
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center py-4 gap-2">
        <img
          src={LogoAdmin}
          alt="logo-admin"
          draggable="false"
          className="w-20 h-20"
        />
        <h1 className="text-2xl text-main font-bold text-center">
          Cita Sakinah Administrator
        </h1>
        <div className="border-b border-main w-full" />
      </div>
      <div>
        <ul className="text-main font-medium text-base flex flex-col gap-3">
          {dataSidebar.map((menu, index) => {
            const isActive = location.pathname === menu.link;
            return (
              <NavLink key={index} to={menu.link}>
                <li
                  className={`rounded-[6px] px-6 py-2 mx-4 ${
                    isActive ? "bg-main text-white" : "text-main"
                  }`}
                >
                  <h4>{menu.name}</h4>
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
    <div
      className="border-t border-main text-main"
      style={{ boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-row items-center justify-between py-5 px-10">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium">Admin TPA</h2>
          <h4 className="text-xs">TPA Cita Sakinah</h4>
        </div>
        <button>
          <LuLogOut size={24} />
        </button>
      </div>
    </div>
  </div>
);

export default Sidebar;
