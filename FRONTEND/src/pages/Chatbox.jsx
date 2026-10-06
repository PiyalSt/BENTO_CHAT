import React, { useEffect, useRef, useState } from "react";
import ActiveCard from "../components/ActiveCard";
import { FaArrowCircleLeft } from "react-icons/fa";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Assalamu alaikum! Kemon acho?",
      mine: false,
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "Walaikum assalam, ami valo. Tumi kemon acho?",
      mine: true,
      time: "10:31 AM",
    },
    {
      id: 3,
      text: "Alhamdulillah. Chat app er kaj kotodur holo?",
      mine: false,
      time: "10:32 AM",
    },
    {
      id: 4,
      text: "Login, Home shesh. Ekhon conversation er design korchi",
      mine: true,
      time: "10:33 AM",
    },
  ]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: text.trim(),
        mine: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setText("");
  };

  // SETTING PART

  const defaultSettings = {
    name: "Amar Naam",
    about: "Banshbagan e achi",
    sound: true,
    desktop: false,
    preview: true,
    showOnline: true,
    readReceipts: true,
    lastSeen: true,
    email: "you@example.com",
  };

  const menu = [
    { id: "profile", label: "My Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy & Security" },
    { id: "account", label: "Account Settings" },
  ];

  const Toggle = ({ label, desc, checked, onChange }) => (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-300">
      <div>
        <p className="font-semibold text-slate-800">{label}</p>
        {desc && <p className="text-xs text-slate-500">{desc}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full shrink-0 transition-all duration-200 ${
          checked ? "bg-amber-400" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );

  const inputClass =
    "w-full py-2 px-4 rounded-2xl border-2 border-slate-300 bg-white text-slate-800 outline-none focus:border-amber-400 transition-all duration-200";

  const btnClass =
    "w-full border-2 border-amber-200 text-white font-bold py-2 px-4 bg-amber-400 hover:bg-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200";

  const [settings, setSettings] = useState(defaultSettings);
  const [activeSetting, setActiveSetting] = useState(null);
  const [pwd, setPwd] = useState({ current: "", next: "" });

  const update = (key, value) => setSettings((p) => ({ ...p, [key]: value }));
  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));

  const handleReset = () => {
    setSettings(defaultSettings);
    setActiveSetting(null);
    setPwd({ current: "", next: "" });
    toast.success("Settings reset hoyeche");
  };

  const handleSaveProfile = () => {
    if (!settings.name.trim()) return toast.error("Naam khali rakha jabe na");
    // TODO: backend e PUT/PATCH request pathao
    toast.success("Profile save hoyeche");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!pwd.current || pwd.next.length < 6)
      return toast.error("Notun password kompokkhe 6 okkhor hote hobe");
    // TODO: backend e axios diye pathao
    toast.success("Password change hoyeche");
    setPwd({ current: "", next: "" });
  };

  const handleLogout = () => {
    // TODO: token muche login page e navigate koro
    toast.success("Logout hoyeche");
  };

  const currentTitle =
    menu.find((m) => m.id === activeSetting)?.label || "Settings";

  return (
    <div className="w-full h-screen bg-slate-100 px-10 flex gap-2">
      <div className="w-3/12 h-full flex flex-col ">
        <div className="flex justify-between py-4 border-b-2 border-slate-400">
          <h2 className="text-xl font-semibold text-slate-800">
            Active Contacts
          </h2>
          <div className="py-1 px-2 border border-slate-800 bg-amber-400 text-slate-800 font-bold rounded-2xl">
            Online 01
          </div>
        </div>
        <div className="w-full min-h-0 flex-1 my-4 space-y-2 overflow-y-scroll">
          <ActiveCard />
          <ActiveCard />
        </div>
      </div>

      <div className="w-6/12 h-full flex flex-col px-4 rounded-2xl bg-slate-400/10">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 border-b-2 border-slate-400">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-amber-400 border-2 border-slate-800 flex items-center justify-center font-bold text-slate-800">
              R
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-100 rounded-full"></span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-800 leading-tight">
              Rahim
            </h2>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 my-4 overflow-y-auto space-y-3 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                  msg.mine
                    ? "bg-amber-400 text-slate-800 rounded-br-sm"
                    : "bg-white text-slate-800 border border-slate-300 rounded-bl-sm"
                }`}
              >
                <p className="wrap-break-words">{msg.text}</p>
                <span className="block text-[11px] text-slate-500 text-right mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message likho..."
            className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-300 bg-white text-slate-800 outline-none focus:border-amber-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="py-3 px-5 rounded-2xl border-2 border-amber-200 bg-amber-400 text-white font-bold hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all duration-200"
          >
            Send
          </button>
        </form>
      </div>


      <div className="w-3/12 h-full flex flex-col ">
        <div className="flex justify-between items-center py-4 border-b-2 border-slate-400">
          <h2 className="text-xl font-semibold text-slate-800">
            {currentTitle}
          </h2>
          <div
            onClick={handleReset}
            className="py-1 px-2 border border-slate-800/10 bg-amber-400/50 text-slate-800 font-bold rounded-2xl cursor-pointer active:scale-95 transition-all duration-200"
          >
            Reset All
          </div>
        </div>

        <div className="w-full min-h-0 flex-1 my-4 space-y-2 overflow-y-auto pr-1">
          {/* Menu */}
          {!activeSetting &&
            menu.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveSetting(item.id)}
                className={btnClass}
              >
                {item.label}
              </div>
            ))}

          {/* Back button */}
          {activeSetting && (
            <button
              onClick={() => setActiveSetting(null)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 mb-2 bg-amber-400 py-2 px-4 rounded-2xl flex items-center gap-1"
            >
              <FaArrowCircleLeft />
              Back
            </button>
          )}

          {/* Profile */}
          {activeSetting === "profile" && (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-400 border-2 border-slate-800 flex items-center justify-center text-3xl font-bold text-slate-800">
                  {settings.name.charAt(0).toUpperCase() || "?"}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Naam
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  About
                </label>
                <textarea
                  rows={3}
                  value={settings.about}
                  onChange={(e) => update("about", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button onClick={handleSaveProfile} className={btnClass}>
                Save
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeSetting === "notifications" && (
            <div>
              <Toggle
                label="Message sound"
                desc="Notun message ashle shobdo hobe"
                checked={settings.sound}
                onChange={() => toggle("sound")}
              />
              <Toggle
                label="Desktop notification"
                desc="Browser e notification dekhabe"
                checked={settings.desktop}
                onChange={() => toggle("desktop")}
              />
              <Toggle
                label="Message preview"
                desc="Notification e message er likha dekhabe"
                checked={settings.preview}
                onChange={() => toggle("preview")}
              />
            </div>
          )}

          {/* Privacy */}
          {activeSetting === "privacy" && (
            <div>
              <Toggle
                label="Online status"
                desc="Onnora tomake online dekhte parbe"
                checked={settings.showOnline}
                onChange={() => toggle("showOnline")}
              />
              <Toggle
                label="Read receipts"
                desc="Message pora hole onno jon jante parbe"
                checked={settings.readReceipts}
                onChange={() => toggle("readReceipts")}
              />
              <Toggle
                label="Last seen"
                desc="Shesh kokhon active chile dekha jabe"
                checked={settings.lastSeen}
                onChange={() => toggle("lastSeen")}
              />
            </div>
          )}

          {/* Account */}
          {activeSetting === "account" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  readOnly
                  className={`${inputClass} bg-slate-200 cursor-not-allowed`}
                />
              </div>

              <form onSubmit={handleChangePassword} className="space-y-2">
                <p className="font-semibold text-slate-800">Password change</p>
                <input
                  type="password"
                  placeholder="Ager password"
                  value={pwd.current}
                  onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="password"
                  placeholder="Notun password"
                  value={pwd.next}
                  onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                  className={inputClass}
                />
                <button type="submit" className={btnClass}>
                  Update Password
                </button>
              </form>

              <button
                onClick={handleLogout}
                className="w-full border-2 border-red-300 text-white font-bold py-2 px-4 bg-red-500 hover:bg-red-700 rounded-2xl active:scale-95 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
