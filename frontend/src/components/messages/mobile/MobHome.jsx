import { useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "../MessageInput";
import Messages from "../Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext";

const MobHome = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="h-screen w-screen flex flex-col relative ">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={toggleOverlay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="text-2xl font-semibold text-center text-blue-400">
            ChatApp
          </h1>
        </div>
        <div className="navbar-end"></div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className=" h-[90vh] flex flex-col">
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              {/* Header */}
              <div className="bg-slate-500 px-4 py-2 mb-2">
                <span className="label-text">To:</span>{" "}
                <span className="text-gray-900 font-bold">
                  {selectedConversation.fullName}
                </span>
              </div>
              <Messages />
              <MessageInput />
            </>
          )}
        </div>
        {isOverlayVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-700 p-4 rounded shadow-lg">
            <div className="navbar">
  <div className="navbar-start">

    <button
                  onClick={toggleOverlay}
                  className="btn btn-circle btn-outline "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
  </div>
  <div className="navbar-center">
  <h1 className="text-2xl font-semibold text-center text-blue-400">
                    Contacts
                  </h1>
  </div>
  <div className="navbar-end">
    
  </div>
</div>
              <Sidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobHome;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
