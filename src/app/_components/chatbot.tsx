"use client"
import React, { useState } from 'react';
import Chat from './chat';
import Image from 'next/image';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {isOpen && (
                <Chat onClose={() => setIsOpen(false)} />
            )}
            <button
                type="button"
                className="bg-white  p-2 hover:shadow-md hover:shadow-gray-300 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
              <Image width="50" height="50" src='/chatbot-icon.svg' alt="bot icon"/> 

            </button>
        </div>
    );
};

export default Chatbot;
