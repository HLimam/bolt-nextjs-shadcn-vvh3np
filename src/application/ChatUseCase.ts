import { ChatPort } from './ports/in/ChatPort';
import { ChatRepositoryPort } from './ports/out/ChatRepositoryPort';
import { Message, Conversation } from '../domain/model/Message';

export class ChatUseCase implements ChatPort {
  constructor(private readonly chatRepository: ChatRepositoryPort) {}

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return await this.chatRepository.findConversationsByUserId(userId);
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return await this.chatRepository.findMessagesByConversationId(conversationId);
  }

  async sendMessage(
    message: Omit<Message, 'id' | 'read' | 'createdAt' | 'updatedAt'>
  ): Promise<Message> {
    return await this.chatRepository.saveMessage(message);
  }

  async markMessageAsRead(messageId: string): Promise<Message> {
    return await this.chatRepository.markMessageAsRead(messageId);
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    await this.chatRepository.markConversationAsRead(conversationId, userId);
  }
}