import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEntryContext } from "../contexts/entry.context";
import { EntryType } from "../types/components";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useTheme } from "../contexts/theme.context";

const EntryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { entries } = useEntryContext();
  const [entry, setEntry] = useState<EntryType | null>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const selectedEntry = entries.find((entry) => entry._id === id);
    if (selectedEntry) setEntry(selectedEntry);
  }, [id, entries]);

  if (!entry) return <div>Entry not found</div>;

  return (
    <Container className={`my-4 p-4 shadow-sm rounded ${darkMode ? "bg-dark" : "bg-light"}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">{entry.title}</h1>
        <div>
          <Dropdown align="end">
            <Dropdown.Toggle variant={darkMode ? "dark" : "light"} id="dropdown-basic">
              
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
              <Dropdown.Item href="#/delete">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Row>
        <Col>
          <p className="mb-4">{entry.body}</p>
          <div className="d-flex flex-wrap">
            {entry.tags.map((tag, index) => (
              <Button  key={index} variant="outline-secondary" className="me-2 mb-2">
                {tag}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EntryDetails;
