import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { EntryType } from "../types/components";
import { getRequest } from "../utils/services";
import { useAuth } from "./auth.context";

const BASE_URL = "http://localhost:5000/api/entries";

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<EntryType[]>(entries);

  const { jwtToken, isAuthenticated } = useAuth();

  const getEntries = useCallback(
    async (): Promise<void> => {
      setEntriesLoading(true);
      const response = await getRequest(BASE_URL, jwtToken);
      setEntriesLoading(false);
      if (response.error) return;
      setEntries(response.data.entries);
    },
    [jwtToken],
  );

  const updateSearchKey = useCallback((event: any) => {
    setSearchKey(""+event.target.value);
  }, []);

  const filterEntries = useCallback(() => {
    if (searchKey === null || searchKey.trim() === '') {
      // If no search key, display all entries
      setFilteredEntries(entries);
      return;
    }
  
    const lowercasedSearchKey = searchKey.toLowerCase();
  
    const filtered = entries.filter((entry: EntryType) => {  
      const lowercasedTitle = entry.title.toLowerCase();
      const lowercasedTags = entry.tags.map(tag => tag.toLowerCase());
  
      return (
        lowercasedTitle.includes(lowercasedSearchKey) ||
        lowercasedTags.some(tag => tag.includes(lowercasedSearchKey))
      );
    });
  
    setFilteredEntries(filtered);
  }, [entries, searchKey]);
  
  // Call filterEntries whenever searchKey changes
  useEffect(() => {
    filterEntries();
  }, [searchKey, filterEntries]);

  useEffect(() => {
    if(isAuthenticated) getEntries();
  }, [getEntries]);

  return (
    <EntryContext.Provider
      value={{
        entries,
        entriesLoading,
        searchKey,
        updateSearchKey,
        filterEntries,
        filteredEntries
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export const useEntryContext = (): EntryContextType => {
  const context = useContext(EntryContext);
  if (context == undefined) throw new Error("UseEntryContextError");
  return context;
};

interface EntryContextType {
  entries: EntryType[];
  entriesLoading: boolean;
  searchKey: string | null;
  filterEntries: () => void;
  updateSearchKey: (event: any) => void;
  filteredEntries: EntryType[]
}
