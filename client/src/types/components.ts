export interface EntryType {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  files: [];
}

export interface EntryContextType {
  entries: EntryType[];
  entriesLoading: boolean;
  searchKey: string | null;
  filterEntries: () => void;
  updateSearchKey: (event: any) => void;
  filteredEntries: EntryType[]
}