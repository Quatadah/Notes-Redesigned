export type Note = {
    id: number;
    title: string;
    starred: boolean;
    content: string;
  };
  
  export type FolderType = {
    id: number;
    name: string;
    icon: string;
    notes: Note[];
  };
  