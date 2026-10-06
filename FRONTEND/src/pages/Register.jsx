import React, { useState } from "react";
import assets from "../assets/assets";
import { AtSign, EyeClosed, EyeIcon, Key, LockIcon, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Register = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!userName) {
      toast.error("Please enter your full name!");
      setUserNameError(true);
      return;
    }
    if (!email) {
      toast.error("Please enter your email address!");
      setEmailError(true);
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      setEmailError(true);
      return;
    }
    if (!password) {
      toast.error("Please enter your password!");
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Please type same confirm password!");
      setConfirmPasswordError(true);
    }

    try {
      toast.success("Registration successfully completed!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-10/12 bg-slate-400/10 flex flex-col md:flex-row gap-4 md:gap-4 p-4 border border-slate-300 rounded-2xl">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <h4 className="text-5xl lg:text-6xl font-bold tracking-wider text-slate-400/50">
              BentoChat
            </h4>
            <div className="w-full hidden md:flex justify-center">
              <img className="w-80" src={assets.loginImage} alt="" />
            </div>
            <p className="md:mt-4 font-medium text-sm md:text-base text-center text-slate-800">
              Real-time messaging dashboard - Access <br /> your team and
              projects.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-full bg-white py-12 px-8 space-y-6 rounded-xl border-2 border-slate-200">
            <div className="space-y-2">
              <div
                className={`w-full border-2 rounded-lg relative ${userNameError ? "text-red-500 border-red-500" : "border-slate-400"}`}
              >
                <User
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-1/2 ${userNameError ? "text-red-500" : "text-slate-500"}`}
                />
                <input
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setUserNameError(false);
                  }}
                  value={userName}
                  className={`w-full px-10 py-2 outline-0 font-semibold ${userNameError ? "text-red-500" : "text-slate-900"}`}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div
                className={`w-full border-2 rounded-lg relative ${emailError ? "text-red-500 border-red-500" : "border-slate-400"}`}
              >
                <AtSign
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-1/2 ${emailError ? "text-red-500" : "text-slate-500"}`}
                />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  value={email}
                  className={`w-full px-10 py-2 outline-0 font-semibold ${emailError ? "text-red-500" : "text-slate-900"}`}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div
                className={`w-full border-2 rounded-lg relative ${passwordError ? "text-red-500 border-red-500" : "border-slate-400"}`}
              >
                <LockIcon
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-1/2 ${passwordError ? "text-red-500" : "text-slate-500"}`}
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  value={password}
                  className={`w-full px-10 py-2 outline-0 font-semibold ${passwordError ? "text-red-500" : "text-slate-900"}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                ) : (
                  <EyeClosed
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                )}
              </div>
              <div
                className={`w-full border-2 rounded-lg relative ${confirmPasswordError ? "text-red-500 border-red-500" : "border-slate-400"}`}
              >
                <Key
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-1/2 ${confirmPasswordError ? "text-red-500" : "text-slate-500"}`}
                />
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(false);
                  }}
                  value={confirmPassword}
                  className={`w-full px-10 py-2 outline-0 font-semibold ${confirmPasswordError ? "text-red-500" : "text-slate-900"}`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                {showConfirmPassword ? (
                  <EyeIcon
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                ) : (
                  <EyeClosed
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleRegister}
                className="w-full py-3 bg-amber-400 text-white tracking-wider rounded-2xl font-bold cursor-pointer active:scale-95 transition-all duration-300"
              >
                Login
              </button>
              <p className="text-sm font-medium text-slate-600">
                Don't have an account?{" "}
                <Link to={"/login"}>
                  <span className="font-semibold cursor-pointer hover:underline">
                    Sign Up
                  </span>
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <h4 className="text-slate-800 font-medium">Or login with</h4>
              <div className="flex gap-2">
                <div className="flex gap-2 items-center border-2 border-slate-400 py-2 px-4 md:px-6 rounded-lg cursor-pointer active:scale-95 transition-all duration-300">
                  <FcGoogle className="text-lg" />
                  <p className="text-sm font-semibold">Google</p>
                </div>
                <div className="flex gap-2 items-center border-2 border-slate-400 py-2 px-4 md:px-6 rounded-lg cursor-pointer active:scale-95 transition-all duration-300">
                  <MdFacebook className="text-xl text-blue-600" />
                  <p className="text-sm font-semibold">Facebook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
