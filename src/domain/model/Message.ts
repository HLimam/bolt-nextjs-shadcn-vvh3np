export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string; // Add recipientId to the interface
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    image?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}