import { AtSign, EyeClosed, LockIcon } from "lucide-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import assets from "../assets/assets";

const Login = () => {
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
              <div className="w-full border-2 border-slate-400 rounded-lg relative">
                <AtSign
                  size={20}
                  className="absolute left-4 top-1/2 -translate-1/2 text-slate-500"
                />
                <input
                  className="w-full px-10 py-2 outline-0 text-slate-900 font-semibold"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="w-full border-2 border-slate-400 rounded-lg relative">
                <LockIcon
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-2 text-slate-500"
                />
                <input
                  className="w-full px-10 py-2 outline-0 text-slate-900 font-semibold"
                  type="password"
                  placeholder="Password"
                />
                <EyeClosed className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              <div className="text-end">
                <p className="text-xs text-slate-600 -mt-1 font-semibold cursor-pointer hover:underline">
                  Forgot Password?
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full py-3 bg-amber-400 text-white tracking-wider rounded-2xl font-bold cursor-pointer active:scale-95 transition-all duration-300">
                Login
              </button>
              <p className="text-sm font-medium text-slate-600">
                Don't have an account?{" "}
                <span className="font-semibold cursor-pointer hover:underline">
                  Sign Up
                </span>
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

export default Login;
