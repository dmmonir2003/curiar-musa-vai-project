import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import { useSocket } from "../../hooks/useSocket";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { selectAccessToken, selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const {
    sendMessage,
    joinConversation,
    listenForMessages,
    listenForErrors,
    isConnected,
    connectionError,
  } = useSocket();

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [convoloading, setConvoLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Set up socket error listener
  useEffect(() => {
    const handleError = (error) => {
      console.error("Socket error:", error);
    };

    const cleanup = listenForErrors(handleError);
    return cleanup;
  }, [listenForErrors]);

  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chat/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setConversations(response.data);
        if (response.data.length > 0) {
          setActiveConversation(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token]);

  // Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/chat/conversations/${activeConversation}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(response.data);
        joinConversation(activeConversation);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeConversation, token, joinConversation]);

  // Set up message listener for real-time updates
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId === activeConversation) {
        setMessages((prev) => [
          ...prev.filter((msg) => msg._id !== `temp-${newMessage.tempId}`),
          newMessage,
        ]);
      }

      // Update last message in conversations list
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === newMessage.conversationId
            ? { ...conv, lastMessage: newMessage }
            : conv
        )
      );
    };

    const cleanup = listenForMessages(handleNewMessage);
    return cleanup;
  }, [activeConversation, listenForMessages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "" || !activeConversation) return;

    const messageContent = message.trim();
    setMessage("");

    // Create temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;

    // Optimistically add the message to UI
    const optimisticMessage = {
      _id: tempId,
      tempId,
      content: messageContent,
      sender: {
        _id: user._id,
        firstName: user.firstName,
        profileImage: user.profileImage,
      },
      createdAt: new Date().toISOString(),
      conversationId: activeConversation,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    // Update last message in conversations list
    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === activeConversation
          ? { ...conv, lastMessage: optimisticMessage }
          : conv
      )
    );

    // Send via WebSocket
    try {
      await sendMessage({
        conversationId: activeConversation,
        content: messageContent,
        sender: user._id,
        tempId,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the optimistic message if there was an error
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getActiveConversationData = () => {
    return conversations.find((c) => c._id === activeConversation);
  };

  const isMyMessage = (message) => {
    return message.sender?._id === user._id;
  };

  useEffect(() => {
    setConvoLoading(false)
  }, [activeConversation])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p className="font-normal text-[13px] text-black-400 w-full p-5 bg-white rounded-xl text-center mt-[50px]">
            Loading conversations...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="font-bold text-[17px] w-full mt-10 mb-4">My Chat</h1>

      {/* Socket connection status */}
      {connectionError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          Connection error: {connectionError}
        </div>
      )}

      <div className="flex items-start bg-white rounded-2xl md:flex-row flex-col">
        {/* Conversations sidebar */}
        <div className="justify-between flex flex-col bg-white rounded-2xl md:w-[25%] w-full">
          <h1 className="font-bold text-[17px] w-full px-4 h-[57px] border-b border-[#EEEEF0] flex items-center">
            Conversations
          </h1>
          <div className="h-[66vh] overflow-auto chatconvo">
            {conversations.length === 0 && (
              <>
                <div className="text-red-400 p-10 text-center">
                  No Conversations Found
                </div>
              </>
            )}
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                className={`px-4 py-3 flex items-center w-full gap-2 border-b border-[#EEEEF0] relative cursor-pointer ${
                  activeConversation === conversation._id ? "bg-gray-50" : ""
                } chatbox`}
                onClick={() => {
                  setConvoLoading(true)
                  setActiveConversation(conversation._id);
                }}
              >
                <div className="w-[80%] flex items-center gap-2">
                  <img
                    src={
                      conversation.otherParticipant?.profileImage ||
                      `https://ui-avatars.com/api/?name=${conversation?.otherParticipant?.firstName}&background=0D8ABC&color=fff`
                    }
                    className="rounded-full w-10 h-10 object-cover"
                    alt={conversation.otherParticipant?.firstName}
                  />
                  <div className="">
                    <h3 className="flex justify-between items-center mb-2">
                      <span className="font-bold">
                        {conversation.otherParticipant?.firstName ||
                          "Unknown User"}
                      </span>
                      <span className="text-[11px] text-[#92939E]">
                        {conversation.lastMessage?.createdAt
                          ? formatTime(conversation.lastMessage.createdAt)
                          : ""}
                      </span>
                    </h3>
                    <p className="truncate text-[#92939E] text-[12px] w-[70%]">
                      {conversation.lastMessage?.content ||
                        "Start a conversation"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
       
        {activeConversation ? (
          <div className="justify-between flex flex-col bg-white rounded-r-2xl md:w-[75%] w-full border-l border-t md:border-t-0">
            <div className="flex sm:items-center justify-between border-b border-gray-200 py-2 px-4">
              <div className="flex items-center space-x-4">
                <div className="">
                  <img
                    src={
                      getActiveConversationData()?.otherParticipant
                        ?.profileImage ||
                      `https://ui-avatars.com/api/?name=${
                        getActiveConversationData()?.otherParticipant?.firstName
                      }&background=0D8ABC&color=fff`
                    }
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-sm mt-1 flex items-center">
                    <span className="font-semibold">
                      {getActiveConversationData()?.otherParticipant
                        ?.firstName || "Unknown User"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {isConnected
                      ? "Online"
                      : "Offline - Messages will be delivered when online"}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex flex-col space-y-4 p-5 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-[60vh]">
              {messages?.map((msg) => (
                <div key={msg._id} className="chat-message">
                  <div
                    className={`flex ${
                      isMyMessage(msg) ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* {
                    !isMyMessage(msg) && (
                      <img
                        src={msg?.sender?.profileImage }
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 mt-1"
                      />
                    )} */}
                    <div
                      className={`flex flex-col ${
                        isMyMessage(msg) ? "items-end" : "items-start"
                      }`}
                    >
                      {!isMyMessage(msg) && (
                        <span className="mr-1 text-[10px] font-semibold text-gray-400">
                          {msg.sender?.firstName || "User"}:
                        </span>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg max-w-xs ${
                          isMyMessage(msg)
                            ? "bg-[var(--primary-color)] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="border-t border-gray-200 px-4 pt-2 pb-2 sm:mb-0">
              <div className="flex items-center justify-between gap-2">
                <textarea
                  type="text"
                  placeholder="Write your message!"
                  className="w-full h-[50px] !pl-4 border border-[#EEEEF0] resize-none rounded-xl outline-none"
                  style={{ padding: "10px" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="">
                  <button
                    className={`p-2 rounded-xl ${
                      message.trim() === ""
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]"
                    }`}
                    onClick={handleSendMessage}
                    disabled={message.trim() === ""}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 9L2.25 2.25L16.5 9M4.5 9L2.25 15.75L16.5 9M4.5 9H16.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
          <div className="md:w-[75%] w-full flex items-center justify-center h-64">
            <p className="text-red-500">No active conversation selected</p>
          </div>
          </>
          
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
