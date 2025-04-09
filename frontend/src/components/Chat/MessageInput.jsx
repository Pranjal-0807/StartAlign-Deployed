import React from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store/slices/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const selectedChatDetails = useSelector((state) => state.selectedChat.selectedChatDetails);

  const receiver = selectedChatDetails.participants.find(
    (participant) => participant._id !== user.id
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (message) {
      dispatch(sendMessage({
        receiverId: receiver._id,
        message
      }));
      e.target.message.value = "";
    }
  }

  return (
    <div className="p-3 border-t border-gray-700 flex items-center gap-2">
      <FaPaperclip className="cursor-pointer text-gray-400" />

      <form onSubmit={handleSendMessage} className="flex flex-1 items-center bg-gray-800 rounded px-3 gap-3">
        <input
          type="text"
          name="message"
          placeholder="Type a message"
          className="w-full p-2 bg-transparent text-white outline-none placeholder-gray-400"
        />
        <button type="submit">
          <FaPaperPlane
            className={`cursor-pointer text-gray-500`}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
