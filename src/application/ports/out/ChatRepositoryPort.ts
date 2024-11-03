import { Message, Conversation } from '@/src/domain/model/Message';

export interface ChatRepositoryPort {
  findConversationsByUserId(userId: string): Promise<Conversation[]>;
  findMessagesByConversationId(conversationId: string): Promise<Message[]>;
  saveMessage(message: Omit<Message, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Message>;
  markMessageAsRead(messageId: string): Promise<Message>;
  markConversationAsRead(conversationId: string, userId: string): Promise<void>;
}