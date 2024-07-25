import { FolderType, Note } from "@/lib/types";
import { Bell, Folder, Plus, Settings, Star, Trash2 } from 'lucide-react';
import { ReactNode } from "react";
import FolderList from "./FolderList";

type SidebarItemProps = {
    icon: ReactNode;
    label: string;
    count?: number;
    onClick: () => void;
  };
  
  const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, count, onClick }) => {
    return (
      <div className="flex items-center px-2 py-1 rounded cursor-pointer hover:bg-muted" onClick={onClick}>
        <div className="w-4 h-4 mr-2">{icon}</div>
        <span>{label}</span>
        {count !== undefined && <span className="ml-auto">{count}</span>}
      </div>
    );
  };

  
type SidebarProps = {
  folders: FolderType[];
  expandedFolders: number[];
  editingFolderId: number | null;
  selectedNote: Note;
  onToggleFolder: (folderId: number) => void;
  onAddFolder: () => void;
  onUpdateFolderIcon: (folderId: number, newIcon: string) => void;
  onSetSelectedNote: (note: Note) => void;
  onSetEditingFolderId: (folderId: number | null) => void;
  onAddNoteToFolder: (folderId: number) => void;
  onSelectContent: (content: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
    folders,
    expandedFolders,
    editingFolderId,
    selectedNote,
    onToggleFolder,
    onAddFolder,
    onUpdateFolderIcon,
    onSetSelectedNote,
    onSetEditingFolderId,
    onAddNoteToFolder,
    onSelectContent,
  }) => {
    return (
      <div className="flex flex-col p-4 overflow-y-auto text-sm w-80 bg-secondary/10">
        <div className="">
          <SidebarItem 
            icon={<Star className="w-4 h-4 text-yellow-500 text-chart-1" />} 
            label="Starred" 
            count={3} 
            onClick={() => onSelectContent('Starred')}
          />
          <SidebarItem 
            icon={<Folder className="w-4 h-4 text-chart-2" />} 
            label="Archive" 
            count={6} 
            onClick={() => onSelectContent('Archive')}
          />
          <SidebarItem 
            icon={<Trash2 className="w-4 h-4 text-red-400" />} 
            label="Trash" 
            count={9} 
            onClick={() => onSelectContent('Trash')}
          />
          <SidebarItem
            icon={<Bell className="w-4 h-4" />} 
            label="Notifications"
            count={3}
            onClick={() => onSelectContent('Notifications')}
          />
          <SidebarItem 
            icon={<Settings className="w-4 h-4" />} 
            label="Settings" 
            onClick={() => onSelectContent('Settings')}
          />
        </div>
        <FolderList
          folders={folders}
          expandedFolders={expandedFolders}
          editingFolderId={editingFolderId}
          selectedNote={selectedNote}
          onToggleFolder={onToggleFolder}
          onUpdateFolderIcon={onUpdateFolderIcon}
          onSetSelectedNote={onSetSelectedNote}
          onSetEditingFolderId={onSetEditingFolderId}
          onAddNoteToFolder={onAddNoteToFolder}
        />
        <div className="flex items-center p-2 mt-2 rounded cursor-pointer hover:bg-muted" onClick={onAddFolder}>
          <Plus className="w-4 h-4 mr-2" />
          <span>New folder</span>
        </div>
      </div>
    );
  };

export default Sidebar;
