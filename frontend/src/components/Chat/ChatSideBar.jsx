import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../store/slices/selectedChatSlice";
import {
  fetchConversations,
  createPrivateConversation,
} from "../../store/slices/conversationSlice";

const ChatSideBar = () => {
  const dispatch = useDispatch();
  const [showUsers, setShowUsers] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);
  const conversations = useSelector((state) => state.conversations.conversations);

  useEffect(() => {
    if (!user) return;
    dispatch(fetchConversations(user.id));
    return () => { };
  }, [dispatch, user]);

  const handleCreatePrivateConversation = (id) => {
    dispatch(
      createPrivateConversation({
        // senderId: user.id,
        receiverId: id,
      })
    );
    setShowUsers(false);
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="w-1/3 md:w-1/4 border-r border-gray-700 p-2">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl">Chats</h1>
        <User size={24} className=" cursor-pointer" onClick={handleShowUsers} />
      </div>
      <input
        type="text"
        placeholder="Search or start a new chat"
        className="w-full p-2 rounded bg-gray-800 text-white mb-2"
      />
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            className="p-3 flex justify-between cursor-pointer hover:bg-gray-800"
            onClick={() => dispatch(setSelectedChat(conversation))}
          >
            <span>
              {conversation.participants
                .find((participant) => participant._id !== user.id)
                ?.name.replace(/^./, (char) => char.toUpperCase()) || "Unknown"}
            </span>
          </div>
        ))}
      </div>
      {showUsers && (
        <div className="absolute top-12 left-96 w-60 bg-gray-800 p-3 rounded-lg shadow-lg z-10">
          <h3 className="text-lg font-semibold mb-2">Start a new chat</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
                key={user._id}
                onClick={() => handleCreatePrivateConversation(user._id)}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white text-sm">
                  {user.name ? user.name[0].toUpperCase() : <User size={16} />}
                </div>
                <p>{`${user.name.charAt(0).toUpperCase()}${user.name.slice(
                  1
                )}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSideBar;
