import { Container } from "react-bootstrap";
import Entry from "../components/Entry";
import { useEntryContext } from "../contexts/entry.context";
import HashLoader from "../components/HashLoader";

export default function DiaryEntries() {
  const { entries, entriesLoading } = useEntryContext();

  return (
    <Container>
      {entriesLoading ? (
        <HashLoader />
      ) : (
        entries.map((entry) => (
          <Entry key={entry._id} title={entry.title} date={entry.createdAt} />
        ))
      )}
    </Container>
  );
}
