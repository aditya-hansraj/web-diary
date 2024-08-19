import { Container } from "react-bootstrap";
import Entry from "../components/Entry";
import { useEntryContext } from "../contexts/entry.context";
import HashLoader from "../components/HashLoader";
import EntryHeader from "../components/EntryHeader";

export default function DiaryEntries() {
  const { filteredEntries, entriesLoading } = useEntryContext();

  return (
    <Container>
      <EntryHeader />
      {entriesLoading ? (
        <HashLoader />
      ) : filteredEntries.length ? (
        filteredEntries.map((entry) => (
          <Entry
            key={entry._id}
            title={entry.title}
            date={entry.createdAt}
            tags={entry.tags}
          />
        ))
      ) : (
        <h3 className="text-center my-5">No Entries Found...</h3>
      )}
    </Container>
  );
}
