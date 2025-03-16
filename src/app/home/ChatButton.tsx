'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useChatStore from '@/app/hooks/useChatStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateUUID } from '@/lib/utils';

export default function ChatButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentChatId = useChatStore((state) => state.currentChatId);
  const setCurrentChatId = useChatStore((state) => state.setCurrentChatId);
  
  const handleClick = () => {
    setIsLoading(true);
    
    // Navigate to current chat or create new one
    if (currentChatId) {
      router.push(`/home/c/${currentChatId}`);
    } else {
      const newId = generateUUID();
      setCurrentChatId(newId);
      router.push(`/home/c/${newId}`);
    }
  };

  return (
    <Button 
      onClick={handleClick}
      size="lg" 
      className="rounded-full shadow-md group" 
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center">
          <span className="animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          <span>Start Chatting</span>
          <ArrowRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </Button>
  );
}