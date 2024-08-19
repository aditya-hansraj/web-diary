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

  const { jwtToken, isAuthenticated } = useAuth();
  const getEntries = useCallback(
    async function getEntries(): Promise<void> {
      setEntriesLoading(true);
      const response = await getRequest(BASE_URL, jwtToken);
      setEntriesLoading(false);
      if (response.error) return;
      setEntries(response.data.entries);
    },
    [jwtToken],
  );

  useEffect(() => {
    if(isAuthenticated) getEntries();
  }, [getEntries]);

  return (
    <EntryContext.Provider
      value={{
        entries,
        entriesLoading,
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
}
