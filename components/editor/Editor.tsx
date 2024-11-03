'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Toolbar } from './Toolbar';

interface EditorProps {
  onChange?: (content: string) => void;
  content?: string;
  editable?: boolean;
}

export function Editor({ onChange, content = '', editable = true }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <div className="prose prose-sm max-w-none w-full min-h-[200px] border border-t-0 rounded-b-md">
        <EditorContent editor={editor} className="min-h-[200px] p-4" />
      </div>
    </div>
  );
}