"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { loadMessageAsync, addMessageAsync } from '../store/chatslice';

const TextBoxCard = ({ msg, setMsg }: { msg: string; setMsg: (val: string) => void }) => {
  return <div className='bg-white rounded-lg p-4 text-white flex-1 '>
    <textarea 
      value={msg}
      onChange={(e) => setMsg(e.target.value)}
      placeholder="Type your answer here..."
      className='p-4 w-full rounded-lg text-black resize-none border border-gray-300 focus:border-blue-500 focus:outline-none'
    />
  </div>
}

const QuestionCard = ({ msg, setMsg, handleSendMessage, isLoading }: { 
  msg: string; 
  setMsg: (val: string) => void; 
  handleSendMessage: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-full h-full">
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🧠</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-green-600 mb-3">
          Learn to solve any Leetcode/Hackerrank problem
        </h1>
        <p className="text-green-700 text-xl font-medium">Master any dsa problems with personalized guidance</p>
      </div>
      
      <div className="flex flex-col w-[80vh] h-[30vh] p-8 rounded-2xl bg-white shadow-xl border-4 border-green-300 relative">
        <div className="flex flex-row items-center mb-4">
          <div className='bg-green-500 h-12 w-12 rounded-xl mr-4 shadow-md'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhyOBkI9m73a63Ayf9uQFQdDrLA5aTSJahQ&s" className='h-full w-full object-cover rounded-xl' alt="avatar" />
          </div>
          <p className="text-green-700 font-semibold text-lg">Paste the DSA problem you wanna learn? 👇</p> 
        </div>

        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="rounded-xl p-4 w-full h-full resize-none text-gray-800 border-2 border-green-200 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 text-lg font-medium"
          placeholder="e.g. Given an array nums of n integers, return an array..."
        />
        
        <button 
          onClick={handleSendMessage}
          disabled={isLoading || !msg.trim()}
          className={`absolute bottom-4 right-4 w-12 h-12 rounded-full text-white flex items-center justify-center shadow transition-colors ${
            isLoading || !msg.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            '🚀'
          )}
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-green-600 text-sm font-medium">Ready to level up your coding skills? 🚀</p>
      </div>
    </div>
  );
};
type MainCardProps = {
  uid: string;
};
const MainCard: React.FC<MainCardProps> = ({ uid }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState('');
  console.log(uid)
  const [isLoading, setIsLoading] = useState(false);
  const { messages } = useSelector((state: RootState) => state.chat);
  
  useEffect(() => {
    dispatch(loadMessageAsync());
  }, [dispatch]);

  const handleSendMessage = async () => {
    if (!msg.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await dispatch(addMessageAsync({ role: 'user', parts: msg }));
      setMsg(''); // Clear the text box
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className='flex flex-col h-[70vh] w-[70vh] bg-white overflow-visible border rounded-lg shadow-lg relative'>
        {messages.length === 0 ? (
          <QuestionCard msg={msg} setMsg={setMsg} handleSendMessage={handleSendMessage} isLoading={isLoading} />
        ) : (
          <>
            <div className='absolute top-4 left-4'>
              <div className='bg-white h-10 w-10 rounded-lg overflow-hidden'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhyOBkI9m73a63Ayf9uQFQdDrLA5aTSJahQ&s" className='h-10 w-10 object-cover' alt="avatar" />
              </div>
            </div>
            {/* Fills remaining space */}
            <p className='p-5 mt-12'>
              { JSON.parse(JSON.parse(messages[messages.length - 1]?.parts))['teacher_text'] }
            </p>
            <div className="flex-auto bg-red" />

            <div className='flex flex-row w-full items-center justify-center bg-red p-4'>
              <TextBoxCard msg={msg} setMsg={setMsg} />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !msg.trim()}
                className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow transition-colors ml-2 ${
                  isLoading || !msg.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  '🚀 '
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainCard;




