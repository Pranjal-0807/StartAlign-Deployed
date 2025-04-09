import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, emptyMessages } from "../../store/slices/messageSlice";

const Messages = () => {
  let lastDate = null;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.messages.messages);
  const selectedChatDetails = useSelector((state) => state.selectedChat.selectedChatDetails);

  const receiver = selectedChatDetails.participants.find(
    (participant) => participant._id !== user.id
  );

  useEffect(() => {
    dispatch(fetchMessages(receiver._id));
    return () => {
      dispatch(emptyMessages());
    };

  }, [selectedChatDetails, dispatch]);

  return (
    <>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.length > 0 ? (
          [...messages]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by time
            .map((msg) => {
              const messageDate = formatDate(msg.createdAt);
              const showDateSeparator = messageDate !== lastDate;
              lastDate = messageDate;
              // console.log(msg.sender);
              // console.log(user.id);
              return (
                <div key={msg._id}>
                  {showDateSeparator && <DateSeparator date={messageDate} />}
                  {msg.sender === user.id ? (
                    <SentMessage message={msg.message} time={msg.createdAt} />
                  ) : (
                    <ReceivedMessage
                      message={msg.message}
                      time={msg.createdAt}
                    />
                  )}
                </div>
              );
            })
        ) : (
          <p>No messages</p>
        )}
      </div>
    </>
  )
};

export default Messages;

const DateSeparator = ({ date }) => (
  <div className="flex justify-center my-2">
    <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs">
      {date}
    </span>
  </div>
);

const ReceivedMessage = ({ message, time }) => {
  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="flex justify-start" ref={msgRef}>
      <div className="relative max-w-xs p-3 bg-gray-200 text-black rounded-lg">
        <p>{message}</p>
        <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-200 rotate-45"></span>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {formatTime(time)}
        </p>
      </div>
    </div>
  );
};

const SentMessage = ({ message, time }) => {
  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex justify-end" ref={msgRef}>
      <div className="relative max-w-xs p-3 bg-blue-500 text-white rounded-lg">
        <p>{message}</p>
        <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rotate-45"></span>
        <p className="text-xs text-gray-300 mt-1 text-right">
          {formatTime(time)}
        </p>
      </div>
    </div>
  );
};


const formatDate = (isoString) => {
  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setUTCDate(today.getUTCDate() - 1);

  // Convert all dates to UTC for comparison
  const dateUTC = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const todayUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  const yesterdayUTC = new Date(
    Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate()
    )
  );

  if (dateUTC.getTime() === todayUTC.getTime()) return "Today";
  if (dateUTC.getTime() === yesterdayUTC.getTime()) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // Example: "25 Feb 2025"
};


// 📌 Format time to "HH:MM AM/PM"
const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
