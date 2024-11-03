'use client';

import { useChat } from '@/src/providers/ChatProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useAuth } from '@/src/providers/AuthProvider';

export function ConversationList() {
  const { conversations, selectConversation, currentConversation } = useChat();
  const { user } = useAuth();

  const getOtherParticipant = (conversation: any) => {
    return conversation.participants.find((p: any) => p.id !== user?.id);
  };

  return (
    <Card className="w-80">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <Input
            placeholder="Search conversations..."
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {conversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation);
            const isSelected = currentConversation?.id === conversation.id;

            return (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-muted flex items-center gap-3 ${
                  isSelected ? 'bg-muted' : ''
                }`}
                onClick={() => selectConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage
                    src={otherParticipant.image}
                    alt={otherParticipant.name}
                  />
                  <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">
                      {otherParticipant.name}
                    </p>
                    {conversation.lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          conversation.lastMessage.createdAt
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="ml-2">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}