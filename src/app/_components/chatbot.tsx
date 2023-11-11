"use client"
import React, { useState } from 'react';
import { FaComment, FaComments, FaTimes } from 'react-icons/fa';
import Chat from './chat';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {isOpen && (
                <Chat onClose={() => setIsOpen(false)} />
            )}
            <button
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaComments />}

            </button>
        </div>
    );
};

export default Chatbot;
