import { Message, Conversation } from '@/src/domain/model/Message';

export interface ChatPort {
  getUserConversations(userId: string): Promise<Conversation[]>;
  getConversationMessages(conversationId: string): Promise<Message[]>;
  sendMessage(message: Omit<Message, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Message>;
  markMessageAsRead(messageId: string): Promise<Message>;
  markConversationAsRead(conversationId: string, userId: string): Promise<void>;
}