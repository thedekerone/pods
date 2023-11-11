"use client";

import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

interface ChatProps {
    onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        // Handle sending the message
        console.log(message);
        setMessage(""); // Clear the input after sending
    };

    return (
        <div className="w-96 h-96 bg-white border border-gray-300 rounded-lg p-4 shadow-lg relative flex flex-col">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">ChatBot</h2>
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
            </div>

            {/* Chat window content */}
            <div className="flex-1 overflow-y-auto mb-4">
                {/* Messages will be displayed here */}
            </div>

            {/* Input field and send button */}
            <div className="flex items-center border-t border-gray-300 pt-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    placeholder="Type your message..."
                />
                <button
                    type="button"
                    className="bg-primary h-full  hover:bg-primary/70 text-white py-2 px-4 rounded-r-md"
                    onClick={handleSendMessage}
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Chat;
