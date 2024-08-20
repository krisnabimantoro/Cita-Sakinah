import React, { useEffect, useState } from "react";
import LogoLogin from "../../assets/svg/logo.svg";
import InputField from "../../components/form/inputfield";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import Button from "../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/loading/loadingspinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    setTimeout(async () => {
      try {
        toast.success("Login Berhasil");
        navigate("/admin/dashboard");
      } catch (error) {
        toast.error("Error");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="bg-main h-screen flex items-center justify-center">
      <div className="bg-white w-[350px] sm:w-[466px] h-[540px] rounded-3xl">
        <form
          className="flex flex-col items-center justify-between h-full py-11 px-10 sm:px-[61px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <NavLink to="/">
              <img
                src={LogoLogin}
                alt="logo-login"
                draggable="false"
                width="172px"
              />
            </NavLink>
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
          <Button
            name={loading ? "Logging in..." : "Login"}
            width="w-full"
            color="bg-button"
            icon={loading ? <LoadingSpinner /> : null}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
