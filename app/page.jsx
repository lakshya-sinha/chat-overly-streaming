'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {

  const inputRef = useRef(null);
  const [chats, setChat] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputValue = inputRef.current.value;
    if(!inputValue) return;

    setChat((prev) => [...prev, { id: Date.now(), text: inputValue }]);
    inputRef.current.value = '';
  };

  const deleteChat = () => {
    setChat((prev) => prev.slice(1));
  };

  useEffect(() => {
    if (chats.length > 5) {
      deleteChat();
    }
    console.log(chats);
  }, [chats]);

  return (
    <>
      <div className="chats-container absolute bottom-20">

        <AnimatePresence>
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              className="cloud relative"

              initial={{ scale: 0, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.5}}
              transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
            >
              <Image src="/4.png" width={300} height={200} alt="not loaded :(" />

              <h2 className="absolute text-black font-bold top-2 left-6 p-1 text-xs mr-3">
                {chat.text}
              </h2>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border absolute bottom-0 w-screen p-3"
          ref={inputRef}
        />
        <button type="submit"></button>
      </form>
    </>
  );
}