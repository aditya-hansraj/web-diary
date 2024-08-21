import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { EntryType, EntryContextType } from "../types/components";
import { getRequest, postRequest } from "../utils/services";
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
  // add entry
  const [newEntryTitle, setNewEntryTitle] = useState<string | null>(null);
  const [newEntryTags, setNewEntryTags] = useState<string[]>([]);
  const [newEntryContent, setNewEntryContent] = useState<string | null>(null);

  const updateNewEntryTitle = useCallback((newTitle: string) => {
    setNewEntryTitle(newTitle);
  }, []);

  const updateNewEntryTags = useCallback((tags: string[]) => {
    setNewEntryTags(tags);
  }, []);

  const updateNewEntryContent = useCallback((content: string) => {
    setNewEntryContent(content);
  }, []); 

  const { jwtToken, isAuthenticated } = useAuth();

  const getEntries = useCallback(async (): Promise<void> => {
    setEntriesLoading(true);
    const response = await getRequest(BASE_URL, jwtToken);
    setEntriesLoading(false);
    if (response.error) return;
    setEntries(response.data.entries);
  }, [jwtToken]);

  const addEntry = useCallback(async () => {
    const response = await postRequest(
      `${BASE_URL}/create`,
      JSON.stringify({
        title: newEntryTitle,
        tags: newEntryTags,
        body: newEntryContent
      }),
      jwtToken
    );
    setNewEntryContent(null);
    setNewEntryTags([]);
    setNewEntryTitle(null);

    if(response.error) {
      return console.log(response.error)
    }
    // setEntries((prev) => [...prev, response.data.entry]);
    console.log(response.data.message);
    
  }, [jwtToken]);

  const updateSearchKey = useCallback((event: any) => {
    setSearchKey("" + event.target.value);
  }, []);

  const filterEntries = useCallback(() => {
    if (searchKey === null || searchKey.trim() === "") {
      setFilteredEntries(entries);
      return;
    }

    const lowercasedSearchKey = searchKey.toLowerCase();

    const filtered = entries.filter((entry: EntryType) => {
      const lowercasedTitle = entry.title.toLowerCase();
      const lowercasedTags = entry.tags.map((tag) => tag.toLowerCase());

      return (
        lowercasedTitle.includes(lowercasedSearchKey) ||
        lowercasedTags.some((tag) => tag.includes(lowercasedSearchKey))
      );
    });

    setFilteredEntries(filtered);
  }, [entries, searchKey]);

  // Call filterEntries whenever searchKey changes
  useEffect(() => {
    filterEntries();
  }, [searchKey, filterEntries]);

  useEffect(() => {
    if (isAuthenticated) getEntries();
  }, [getEntries]);

  return (
    <EntryContext.Provider
      value={{
        entries,
        entriesLoading,
        searchKey,
        updateSearchKey,
        filterEntries,
        filteredEntries,
        newEntryTitle,
        newEntryTags,
        newEntryContent,
        updateNewEntryTitle,
        updateNewEntryTags,
        updateNewEntryContent,
        addEntry,
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
