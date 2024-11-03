'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/src/providers/ChatProvider';
import { useAuth } from '@/src/providers/AuthProvider';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

export function ChatWindow() {
  const { currentConversation, messages, sendMessage, isTyping, startTyping, stopTyping } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentConversation) return;

    sendMessage(currentConversation.id, messageInput);
    setMessageInput('');
    stopTyping();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (e.target.value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

  if (!currentConversation) {
    return (
      <Card className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start chatting</p>
      </Card>
    );
  }

  const otherParticipant = currentConversation.participants.find(
    p => p.id !== user?.id
  );

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex-none flex flex-row items-center gap-4 py-4">
        <Avatar>
          <AvatarImage src={otherParticipant?.image} alt={otherParticipant?.name} />
          <AvatarFallback>{otherParticipant?.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{otherParticipant?.name}</h3>
          <p className="text-sm text-muted-foreground">
            {isTyping ? 'Typing...' : 'Online'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === user?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
          <Input
            ref={inputRef}
            value={messageInput}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!messageInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}