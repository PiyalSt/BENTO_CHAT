import React, { useEffect, useRef, useState } from "react";
import ActiveCard from "../components/ActiveCard";

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
                <p className="break-words">{msg.text}</p>
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
        <div className="flex justify-between py-4 border-b-2 border-slate-400">
          <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
          <div className="py-1 px-2 border border-slate-800/10 bg-amber-400/50 text-slate-800 font-bold rounded-2xl cursor-pointer active:scale-95 transition-all duration-200">
            Reset All
          </div>
        </div>
        <div className="w-full min-h-0 flex-1 my-4 space-y-2 overflow-y-scroll">
          <div className="w-full border-2 border-amber-200 text-white font-bold py-2 px-4 bg-amber-400 hover:bg-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200">
            My Profile
          </div>
          <div className="w-full border-2 border-amber-200 text-white font-bold py-2 px-4 bg-amber-400 hover:bg-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200">
            Notifications
          </div>
          <div className="w-full border-2 border-amber-200 text-white font-bold py-2 px-4 bg-amber-400 hover:bg-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200">
            Privacy & Security
          </div>
          <div className="w-full border-2 border-amber-200 text-white font-bold py-2 px-4 bg-amber-400 hover:bg-slate-800 hover:border-slate-600 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200">
            Account Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
