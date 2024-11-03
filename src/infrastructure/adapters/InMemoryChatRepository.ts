import { ChatRepositoryPort } from '@/src/application/ports/out/ChatRepositoryPort';
import { Message, Conversation } from '@/src/domain/model/Message';
import { db } from '@/src/lib/db';

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: 'conv1',
    senderId: '1',
    recipientId: '2',
    content: 'Hello! How can I help you today?',
    read: true,
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z',
  },
  {
    id: '2',
    conversationId: 'conv1',
    senderId: '2',
    recipientId: '1',
    content: 'I have some questions about React hooks.',
    read: false,
    createdAt: '2024-02-25T10:01:00Z',
    updatedAt: '2024-02-25T10:01:00Z',
  },
];

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [
      {
        id: '1',
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
    ],
    lastMessage: mockMessages[1],
    unreadCount: 1,
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:01:00Z',
  },
];

// Initialize mock data
mockMessages.forEach(message => {
  db.messages.set(message.id, message);
});

mockConversations.forEach(conversation => {
  db.conversations.set(conversation.id, conversation);
});

export class InMemoryChatRepository implements ChatRepositoryPort {
  async findConversationsByUserId(userId: string): Promise<Conversation[]> {
    return Array.from(db.conversations.values()).filter(conv =>
      conv.participants.some(p => p.id === userId)
    );
  }

  async findMessagesByConversationId(conversationId: string): Promise<Message[]> {
    return Array.from(db.messages.values())
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async saveMessage(message: Omit<Message, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Message> {
    const id = (db.messages.size + 1).toString();
    const now = new Date().toISOString();

    const newMessage: Message = {
      id,
      ...message,
      read: false,
      createdAt: now,
      updatedAt: now,
    };

    db.messages.set(id, newMessage);
    this.updateConversationLastMessage(message.conversationId, newMessage);
    return newMessage;
  }

  async markMessageAsRead(messageId: string): Promise<Message> {
    const message = db.messages.get(messageId);
    if (!message) {
      throw new Error('Message not found');
    }

    const updatedMessage = {
      ...message,
      read: true,
      updatedAt: new Date().toISOString(),
    };

    db.messages.set(messageId, updatedMessage);
    return updatedMessage;
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    const messages = Array.from(db.messages.values())
      .filter(m => m.conversationId === conversationId && m.recipientId === userId);

    messages.forEach(message => {
      db.messages.set(message.id, {
        ...message,
        read: true,
        updatedAt: new Date().toISOString(),
      });
    });

    const conversation = db.conversations.get(conversationId);
    if (conversation) {
      db.conversations.set(conversationId, {
        ...conversation,
        unreadCount: 0,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  private updateConversationLastMessage(conversationId: string, message: Message): void {
    const conversation = db.conversations.get(conversationId);
    if (conversation) {
      db.conversations.set(conversationId, {
        ...conversation,
        lastMessage: message,
        unreadCount: conversation.unreadCount + 1,
        updatedAt: message.createdAt,
      });
    }
  }
}