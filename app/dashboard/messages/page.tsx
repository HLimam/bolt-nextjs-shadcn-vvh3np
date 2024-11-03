'use client';

import { ChatWindow } from './_components/ChatWindow';
import { ConversationList } from './_components/ConversationList';

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <ConversationList />
      <ChatWindow />
    </div>
  );
}