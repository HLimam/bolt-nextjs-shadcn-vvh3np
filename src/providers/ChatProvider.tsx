'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { ChatPort } from '@/src/application/ports/in/ChatPort';
import { ChatUseCase } from '@/src/application/ChatUseCase';
import { InMemoryChatRepository } from '@/src/infrastructure/adapters/InMemoryChatRepository';
import { Message, Conversation } from '@/src/domain/model/Message';
import { useAuth } from './AuthProvider';
import { toast } from 'sonner';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isTyping: boolean;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  selectConversation: (conversation: Conversation) => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
  startTyping: () => void;
  stopTyping: () => void;
}

const chatRepository = new InMemoryChatRepository();
const chatUseCase = new ChatUseCase(chatRepository);

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock conversations for testing
const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [
      {
        id: '1',
        name: 'John Mentor',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
    ],
    lastMessage: {
      id: '2',
      conversationId: 'conv1',
      senderId: '2',
      recipientId: '1',
      content: 'I have some questions about React hooks.',
      read: false,
      createdAt: '2024-02-25T10:01:00Z',
      updatedAt: '2024-02-25T10:01:00Z',
    },
    unreadCount: 1,
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:01:00Z',
  },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchConversations();
    }
  }, [user?.id]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`/api/chat/conversations?userId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    try {
      const response = await fetch(`/api/chat/messages?conversationId=${conversation.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
      await markConversationAsRead(conversation.id);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!user) return;

    try {
      const message = {
        conversationId,
        senderId: user.id,
        content,
        recipientId: currentConversation?.participants.find(p => p.id !== user.id)?.id,
      };

      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      if (!response.ok) throw new Error();

      const newMessage = await response.json();
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation's last message
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? { ...conv, lastMessage: newMessage, updatedAt: new Date().toISOString() }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const startTyping = useCallback(() => {
    setIsTyping(true);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      stopTyping();
    }, 3000);
    setTypingTimeout(timeout);
  }, [typingTimeout]);

  const stopTyping = useCallback(() => {
    setIsTyping(false);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  }, [typingTimeout]);

  const markConversationAsRead = async (conversationId: string) => {
    try {
      await fetch(`/api/chat/conversations/${conversationId}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });

      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to mark conversation as read:', error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        messages,
        isTyping,
        sendMessage,
        selectConversation,
        markConversationAsRead,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}