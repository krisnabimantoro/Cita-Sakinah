import React, { useState } from "react";
import LogoAdmin from "../../assets/svg/logo.svg";
import { LuLogOut } from "react-icons/lu";
import { dataSidebar } from "../../data/datasidebar";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    toast.success("Logout Berhasil");
    navigate("/auth/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex flex-col justify-between border-r border-main min-h-screen transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <img
            src={LogoAdmin}
            alt="logo-admin"
            onClick={toggleSidebar}
            draggable="false"
            className="w-20 h-20 cursor-pointer"
          />
          {!isCollapsed && (
            <h1 className="text-2xl text-main font-bold text-center">
              Cita Sakinah Administrator
            </h1>
          )}
          <div className="border-b border-main w-full" />
        </div>
        <div>
          <ul className="text-main font-medium text-base flex flex-col gap-3">
            {dataSidebar.map((menu, index) => {
              const isActive = window.location.pathname === menu.link;
              return (
                <NavLink key={index} to={menu.link}>
                  <li
                    className={`flex items-center ${
                      isCollapsed ? "justify-center" : "gap-2"
                    } rounded-[6px] px-6 py-2 mx-4 hover:bg-main hover:text-white ${
                      isActive ? "bg-main text-white" : "text-main"
                    }`}
                  >
                    <span>{menu.icon}</span>
                    {!isCollapsed && <h4>{menu.name}</h4>}
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
        <div
          className={`flex items-center py-5 ${
            isCollapsed ? "justify-center" : "justify-between px-10"
          }`}
        >
          {!isCollapsed && (
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium">Admin TPA</h2>
              <h4 className="text-xs">TPA Cita Sakinah</h4>
            </div>
          )}
          <button onClick={handleLogoutClick}>
            <LuLogOut size={24} />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleLogout}
        onCancel={handleCancel}
        confirm="Log Out"
        width="w-[377px]"
        justify="justify-center"
      >
        <h2 className="text-2xl font-semibold text-main text-center">
          Apakah Anda Ingin Log Out?
        </h2>
      </Modal>
    </div>
  );
};

export default Sidebar;
