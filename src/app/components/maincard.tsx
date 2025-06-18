"use client"

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Car } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, } from '../store/store';
import { loadMessageAsync,addMessageAsync,MessageState } from '../store/chatslice';

const ShowHintDemo=()=>{
  return  <div className='bg-pink '>
  <Popover>
      <PopoverTrigger asChild>
        
       <a  className='text-black'>Show Hint 💡</a>
      </PopoverTrigger>
      <PopoverContent className="w-80">
     <p>djsnfkjdsn</p>
      </PopoverContent>
    </Popover>
    </div>
}

const QuestionCard=()=>{
    return <div className='flex flex-row bg-black'>
      
        <Avatar>
          
      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhyOBkI9m73a63Ayf9uQFQdDrLA5aTSJahQ&s" className='h-10 w-10' />
      
      <AvatarFallback>CN</AvatarFallback>
      <p>Name</p>
    </Avatar>


    </div>

}
const TextBoxCard=({msg,setMsg}:{ msg: string; setMsg: (val: string) => void })=>{
  return <div className='bg-white rounded-lg p-4 text-white flex-1 '>
    <textarea 
      value={msg}
      onChange={(e) => setMsg(e.target.value)}
      placeholder="Type your answer here..."
      className='p-4 w-full rounded-lg text-black resize-none border border-gray-300 focus:border-blue-500 focus:outline-none'
    />
    {/* <Popover >
      <PopoverTrigger asChild>
        
      <a  className='text-black'>Show Hint 💡</a>
      </PopoverTrigger>
      <PopoverContent  className="w-80" side="top" align="start"sideOffset={4}>
    <p>djsnfkjdsn</p>
      </PopoverContent>
    </Popover> */}
  </div>
}

const MainCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [msg, setMsg] = useState('');
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
      <Card className='flex flex-col h-[70vh] w-[70vh] bg-white overflow-visible '>
        <CardHeader><Avatar className='bg-white h-16 rounded-full w-16'>
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhyOBkI9m73a63Ayf9uQFQdDrLA5aTSJahQ&s" className='h-full w-full object-cover' />
        </Avatar></CardHeader>
        {/* Fills remaining space */}
        <p className='p-2'>
          {messages.length==0?'Enter the problem statement below ':messages.at(messages.length - 1)?.role=="model"?messages.at(messages.length - 1)?.parts:messages.at(messages.length - 2)?.parts}
        </p>
        <div className="flex-auto bg-red" />

        <div className='flex flex-row w-full items-center justify-center bg-red '>
          <TextBoxCard msg={msg} setMsg={setMsg} />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !msg.trim()}
            className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow transition-colors ${
              isLoading || !msg.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              '🚀'
            )}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default MainCard;




