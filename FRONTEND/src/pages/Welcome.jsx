import React from "react";
import { Link } from "react-router";

const features = [
  {
    icon: "⚡",
    title: "Ek nimeshe message",
    desc: "Bondhur sathe sathe sathe kotha bolo, kono deri nei.",
  },
  {
    icon: "🟢",
    title: "Online dekho",
    desc: "Kon bondhu ekhon online ache, ek nojore jene nao.",
  },
  {
    icon: "🔒",
    title: "Nirapod account",
    desc: "Tomar login ar tothyo thakbe surokkhito.",
  },
];

const Welcome = () => {
  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-10 py-4 flex items-center justify-between border-b-2 border-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-slate-800 flex items-center justify-center font-bold text-slate-800">
            B
          </div>
          <h1 className="text-xl font-bold text-slate-800">BentoChat</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="py-2 px-5 rounded-2xl font-bold text-slate-800 hover:bg-slate-200 active:scale-95 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="py-2 px-5 rounded-2xl border-2 border-amber-200 bg-amber-400 text-white font-bold hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all duration-200"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 px-10 py-12 flex items-center justify-center gap-12">
        {/* Left: text */}
        <div className="w-full max-w-xl">
          <span className="inline-block py-1 px-3 mb-4 text-sm font-bold text-slate-800 bg-amber-400/50 border border-slate-800/10 rounded-2xl">
            Notun chat app
          </span>
          <h2 className="text-5xl font-bold text-slate-800 leading-tight">
            Bondhuder sathe{" "}
            <span className="text-amber-500">mon khule</span> adda dao
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            BentoChat e account khulo, bondhu khujo, ar ekhoni chat shuru koro.
            Shohoj, druto ar shundor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="py-3 px-8 rounded-2xl border-2 border-amber-200 bg-amber-400 text-white font-bold hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all duration-200"
            >
              Shuru kori
            </Link>
            <Link
              to="/login"
              className="py-3 px-8 rounded-2xl border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white active:scale-95 transition-all duration-200"
            >
              Amar account ache
            </Link>
          </div>
        </div>

        {/* Right: chat preview */}
        <div className="hidden lg:flex w-full max-w-sm flex-col rounded-2xl bg-slate-400/10 border border-slate-300 p-4 shadow-lg">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-slate-400">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-slate-800 flex items-center justify-center font-bold text-slate-800">
                R
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-100 rounded-full"></span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 leading-tight">Rahim</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>

          <div className="py-4 space-y-3">
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl rounded-bl-sm bg-white border border-slate-300 text-slate-800 shadow-sm">
                Assalamu alaikum! Kemon acho?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl rounded-br-sm bg-amber-400 text-slate-800 shadow-sm">
                Valo achi, tumi?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl rounded-bl-sm bg-white border border-slate-300 text-slate-800 shadow-sm">
                Alhamdulillah. Adda dibi naki? 😄
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-10 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-2xl bg-white border-2 border-slate-300 hover:border-amber-400 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 mb-3 rounded-full bg-amber-400/50 flex items-center justify-center text-2xl">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-slate-500 border-t-2 border-slate-300">
        © 2026 BentoChaat. Shob odhikar songrokkhito.
      </footer>
    </div>
  );
};

export default Welcome;