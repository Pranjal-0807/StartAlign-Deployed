import React, { useEffect } from "react";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatSideBar from "./ChatSideBar";
import MessageInput from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { initializeSocket, setOnlineUsers } from '../../store/slices/socket/socketSlice';
import { setNewMessage } from '../../store/slices/messageSlice';

const ChatApp = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedChat.selectedChat);
  const user = useSelector((state) => state.auth.user);
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!user) return;
    dispatch(initializeSocket(user?.id));
  }, [])

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });
    socket.on("newMessage", (message) => {
      dispatch(setNewMessage(message));
    });
    return () => {
      // socket.close()
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect(); // Instead of socket.close()
    };
  }, [socket]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ChatSideBar />

      {/* Chat Window */}
      {selectedChat ?
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <Messages />
          <MessageInput />
        </div> : <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl">Select a chat to start messaging</h1>
        </div>
      }
    </div>
  );
};

export default ChatApp;
