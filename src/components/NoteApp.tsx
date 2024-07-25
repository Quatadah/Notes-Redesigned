"use client";

import { FolderType, Note } from '@/lib/types';
import { useState } from 'react';
import Header from "./Header";
import NoteContent from "./NoteContent";
import Sidebar from "./Sidebar";

const NoteApp: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([
    {
      id: 1,
      name: "Personal",
      icon: "😎",
      notes: [
        {
          id: 1,
          title: "Review of My Personal Improvement Project",
          starred: true,
          content: `"When someone isn't talking, my brain tends to fill in the blanks with how I feel about myself." – Whitney Cummings.

We have probably all experienced getting caught up in our own thoughts at some point while communicating. It is when those thoughts interfere with our capability to communicate that you begin to run into problems.

In my life, I have experienced significant hardships. Consistent traumatic events plagued my childhood causing a fundamental change in my perception of self. Consequently, my attempts at socialization have been riddled with significant communication apprehension and at times complete stagnation of social endeavors. Living with PTSD has dramatically altered the way in which I communicate, the greatest change in my verbal skills when synchronous communication is the focus.

My cognitive processes are diminished greatly by anxiety and hypervigilance when attempting to speak in person with someone. The result of this looks like timely gaps between the message and my response, and sometimes even an inability to respond at all. This can make me seem disingenuous or indifferent to the communicator which in turn creates greater distance between myself and an authentic connection.

Although the effects of trauma on our systems create unorthodox issues within one's ability to communicate, I will focus on self-monitoring as a starting point to decrease social anxiety in attempts to become more confident in my verbal skills. When I was younger, saying or doing the "wrong" thing could have dangerous consequences, as a result, my self-monitor grew out of control as a means of survival. The ability to navigate fragile situations by anticipating and calculating negative responses was of vital importance back then.

Now that I am no longer in danger, my excessive self-monitoring only interferes with my ability to move...`,
        },
        {
          id: 2,
          title: "Psychometric Test And My P...",
          starred: false,
          content: "Content for Psychometric Test...",
        },
        {
          id: 3,
          title: "Personal Beliefs, Values And ...",
          starred: false,
          content: "Content for Personal Beliefs...",
        },
        {
          id: 4,
          title: "Life Twists and Turns",
          starred: false,
          content: "Content for Life Twists and Turns...",
        },
      ],
    },
    { id: 2, name: "Work", icon: "💼", notes: [] },
    { id: 3, name: "Design Insight", icon: "📘", notes: [] },
    { id: 4, name: "Business", icon: "🎯", notes: [] },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note>(folders[0].notes[0]);
  const [expandedFolders, setExpandedFolders] = useState<number[]>([1]);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((f) => f !== folderId)
        : [...prev, folderId]
    );
  };

  const addFolder = () => {
    const newFolder: FolderType = {
      id: folders.length + 1,
      name: `New Folder ${folders.length + 1}`,
      icon: "📁",
      notes: [],
    };
    setFolders([...folders, newFolder]);
    setExpandedFolders([...expandedFolders, newFolder.id]);
  };

  const updateFolderIcon = (folderId: number, newIcon: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId ? { ...folder, icon: newIcon } : folder
      )
    );
    setEditingFolderId(null);
  };

  const addNoteToFolder = (folderId: number) => {
    const newNote: Note = {
      id: Date.now(),
      title: "New Note",
      starred: false,
      content: "Start writing your new note here...",
    };
    setFolders(
      folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, notes: [...folder.notes, newNote] }
          : folder
      )
    );
    setSelectedNote(newNote);
  };

  const findFolderForNote = (noteId: number): FolderType | null => {
    for (const folder of folders) {
      const note = folder.notes.find((n) => n.id === noteId);
      if (note) return folder;
    }
    return null;
  };

  const updateNoteTitle = (noteId: number, newTitle: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => ({
        ...folder,
        notes: folder.notes.map((note) =>
          note.id === noteId ? { ...note, title: newTitle } : note
        ),
      }))
    );
    setSelectedNote((prevNote) => ({ ...prevNote, title: newTitle }));
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-light">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          folders={folders}
          expandedFolders={expandedFolders}
          editingFolderId={editingFolderId}
          selectedNote={selectedNote}
          onSelectContent={() => {}}
          onToggleFolder={toggleFolder}
          onAddFolder={addFolder}
          onUpdateFolderIcon={updateFolderIcon}
          onSetSelectedNote={setSelectedNote}
          onSetEditingFolderId={setEditingFolderId}
          onAddNoteToFolder={addNoteToFolder}
        />
        <NoteContent
          selectedNote={selectedNote}
          findFolderForNote={findFolderForNote}
          onUpdateNoteTitle={updateNoteTitle}
        />
      </div>
    </div>
  );
};

export default NoteApp;
