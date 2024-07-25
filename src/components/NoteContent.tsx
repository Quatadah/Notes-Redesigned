'use client';

import { FolderType, Note } from '@/lib/types';
import { FileText, Link, MessageCircle, MoreHorizontal, RefreshCw, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import PlateEditor from './plate-editor';
import { Button } from './plate-ui/button';

type NoteContentProps = {
  selectedNote: Note | null;
  findFolderForNote: (noteId: number) => FolderType | null;
  onUpdateNoteTitle: (noteId: number, newTitle: string) => void;
};

const NoteContent: React.FC<NoteContentProps> = ({ selectedNote, findFolderForNote, onUpdateNoteTitle }) => {
  const [editableTitle, setEditableTitle] = useState<string>('');
  const [editableContent, setEditableContent] = useState<any[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  useEffect(() => {
    if (selectedNote) {
      setEditableTitle(selectedNote.title);
      try {
        setEditableContent(JSON.parse(selectedNote.content));
      } catch {
        setEditableContent([
          {
            type: 'paragraph',
            children: [{ text: selectedNote.content }],
          },
        ]);
      }
    }
  }, [selectedNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEditableTitle(newTitle);

    if (selectedNote) {
      onUpdateNoteTitle(selectedNote.id, newTitle);
    }
  };

  const handleSave = () => {
    if (selectedNote) {
      // Assuming there is a function to save the updated note
      // saveNote({ ...selectedNote, title: editableTitle, content: JSON.stringify(editableContent) });
      console.log('Note saved:', { ...selectedNote, title: editableTitle, content: JSON.stringify(editableContent) });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {selectedNote && (
        <div className="p-8 space-y-2">
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <span className="mr-2">{findFolderForNote(selectedNote.id)?.name}</span>
            <span>/</span>
            <input
              className="ml-2 text-lg bg-transparent border-none outline-none"
              value={editableTitle}
              onChange={handleTitleChange}
            />
            <Link className="w-4 h-4 ml-2" />
            <RefreshCw className="w-4 h-4 ml-2" />
          </div>
          <div className="flex items-center justify-between mb-4">
            <input
              className="w-full text-3xl font-bold bg-transparent border-none outline-none"
              value={editableTitle}
              onChange={handleTitleChange}
            />
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-chart-1" />
              <MessageCircle className="w-5 h-5" />
              <MoreHorizontal className="w-5 h-5" />
            </div>
          </div>

          <div className="border rounded-lg shadow bg-background">
            <PlateEditor />
          </div>
          <div className="flex items-center p-4 mb-4 rounded bg-secondary">
            <FileText className="w-4 h-4 mr-2" />
            <span className="mr-2 text-sm font-bold">Strength And Weakness While Communicating With People</span>
            <span className="mr-2 text-xs text-muted-foreground">20 min read</span>
            <span className="text-xs text-destructive">Must read</span>
          </div>
          <Button variant="default" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default NoteContent;
