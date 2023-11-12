"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { api } from "~/trpc/react";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ChatProps {
    onClose: () => void;
}
interface Messages {
    isBot: boolean;
    message: string;
    sentAt: Date;
}

const renderTextWithLinks = (text:string) => {
    // Regex to match Markdown style links: [link text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = text.split(markdownLinkRegex);

    const elements = [];
    for (let i = 0; i < parts.length; i += 3) {
        elements.push(parts[i]);
        if (i + 1 < parts.length && i + 2 < parts.length) {
            elements.push(
                <span key={i}>
                    <a href={parts[i + 2]} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        {parts[i + 1]}
                    </a>
                    <br />
                </span>,
            );
        }
    }

    return elements;
};

const Chat: React.FC<ChatProps> = ({ onClose }) => {
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [messages, setMessages] = useState<Messages[]>([]);
    const getPrediction = api.ai.getPrediction.useMutation({
        onMutate: () => {
            setDisabled(true);
        },
        onSuccess: (data) => {
            setMessages([
                ...messages,
                { isBot: true, message: data.text, sentAt: new Date() },
            ]);
            setDisabled(false);
        },
    });

    const handleSendMessage = () => {
        if (!message) return;
        // Handle sending the message
        console.log(message);
        setMessages([...messages, { isBot: false, message, sentAt: new Date() }]);
        const prediction = getPrediction.mutate({ question: message });
        console.log(prediction);
        setMessage(""); // Clear the input after sending
    };

    return (
        <div className="w-96 h-96 bg-white border border-gray-300 rounded-lg p-4 shadow-lg relative flex flex-col">
            <div className="mb-4">
                <div className="flex items-center gap-5">
                    <Image width="40" height="40" src="/logo.png" alt="logo" />
                    <h2 className="text-lg font-semibold">AI ChatBot</h2>
                </div>
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
            </div>

            {/* Chat window content */}
            <div className="flex-1 overflow-y-auto mb-4 hide-scrollbar">
                {messages.map((message) => {
                    return message.isBot ? (
                        <ReceiverMessage
                            key={message.sentAt.getTime()}
                            message={message.message}
                        />
                    ) : (
                        <SenderMessage
                            key={message.sentAt.getTime()}
                            message={message.message}
                        />
                    );
                })}
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
                    disabled={disabled}
                    className="bg-primary h-full  hover:bg-primary/70 text-white py-2 px-4 rounded-r-md"
                    onClick={handleSendMessage}
                >
                    {disabled ? (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FaPaperPlane />
                    )}
                </button>
            </div>
        </div>
    );
};

const SenderMessage = ({ message }: { message: string }) => {
    return (
        <div className="text-right m-2">
            <p className="bg-blue-100 text-blue-800 p-3 rounded-lg inline-block max-w-xs break-words">
                {message}
            </p>
        </div>
    );
};

const ReceiverMessage = ({ message }: { message: string }) => {
    return (
        <div className="text-left m-2">
            <p className="bg-primary text-white p-3 rounded-lg inline-block max-w-xs break-words">
                {renderTextWithLinks(message)}
            </p>
        </div>
    );
};

export default Chat;
