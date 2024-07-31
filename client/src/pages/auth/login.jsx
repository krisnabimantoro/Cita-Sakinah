import React, { useEffect, useState } from "react";
import LogoLogin from "../../assets/svg/logo.svg";
import InputField from "../../components/form/inputfield";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import Button from "../../components/ui/button";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Login";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("ea");
  };

  return (
    <div className="bg-main h-screen flex items-center justify-center">
      <div className="bg-white w-[350px] sm:w-[466px] h-[552px] rounded-3xl">
        <form
          className="flex flex-col items-center justify-between h-full py-11 px-10 sm:px-[61px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <img
              src={LogoLogin}
              alt="logo-login"
              draggable="false"
              width="172px"
            />
            <h1 className="text-main text-2xl font-semibold mt-8 mb-5">
              Login Administrator
            </h1>
            <div className="flex flex-col gap-[15px] sm:w-[344px]">
              <InputField
                icon={<FiUser />}
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <InputField
                icon={<CgLock />}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                passwordInput={true}
              />
            </div>
          </div>
          <Button name="Login" width="w-full" color="bg-button" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
