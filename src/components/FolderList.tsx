import { FolderType, Note } from "@/lib/types";
import { ChevronDown, ChevronRight, FileText, Plus, Star } from "lucide-react";
import { Input } from "./plate-ui/input";

type FolderListProps = {
  folders: FolderType[];
  expandedFolders: number[];
  editingFolderId: number | null;
  selectedNote: Note;
  onToggleFolder: (folderId: number) => void;
  onUpdateFolderIcon: (folderId: number, newIcon: string) => void;
  onSetSelectedNote: (note: Note) => void;
  onSetEditingFolderId: (folderId: number | null) => void;
  onAddNoteToFolder: (folderId: number) => void;
};

const FolderList: React.FC<FolderListProps> = ({
  folders,
  expandedFolders,
  editingFolderId,
  selectedNote,
  onToggleFolder,
  onUpdateFolderIcon,
  onSetSelectedNote,
  onSetEditingFolderId,
  onAddNoteToFolder,
}) => {
  return (
    <div className="flex-grow space-y-1">
      {folders.map((folder) => (
        <div key={folder.id}>
          <div className="flex items-center p-1 rounded cursor-pointer hover:bg-muted">
            <div onClick={() => onToggleFolder(folder.id)}>
              {expandedFolders.includes(folder.id) ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
            </div>
            {editingFolderId === folder.id ? (
              <Input 
                type="text" 
                value={folder.icon}
                onChange={(e) => onUpdateFolderIcon(folder.id, e.target.value)}
                onBlur={() => onSetEditingFolderId(null)}
                className="w-6 mr-2 bg-input"
                autoFocus
              />
            ) : (
              <span className="mr-2 cursor-pointer" onClick={() => onSetEditingFolderId(folder.id)}>{folder.icon}</span>
            )}
            <span>{folder.name}</span>
            <span className="ml-auto">{folder.notes.length}</span>
            <Plus className="w-4 h-4 ml-2 cursor-pointer" onClick={() => onAddNoteToFolder(folder.id)} />
          </div>
          {expandedFolders.includes(folder.id) && folder.notes.map((note) => (
            <div 
              key={note.id} 
              className={`ml-6 flex items-center cursor-pointer hover:bg-muted rounded p-1 ${selectedNote.id === note.id ? 'bg-muted' : ''}`} 
              onClick={() => onSetSelectedNote(note)}
            >
              <FileText className="w-4 h-4 mr-2" />
              <span className="truncate">{note.title}</span>
              {note.starred && <Star className="w-4 h-4 ml-auto text-chart-1" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
