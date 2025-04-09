import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const selectedChatDetails = useSelector((state) => state.selectedChat.selectedChatDetails)
  return (
    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
      <span>
        {selectedChatDetails.participants
          .find((participant) => participant._id !== user.id)
          ?.name.replace(/^./, (char) => char.toUpperCase()) || "Unknown"}
      </span>
      <FaSearch className="cursor-pointer text-gray-400" />
    </div>
  );
};

export default ChatHeader;
