import React from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAuth } from "../contexts/auth.context";
import { useTheme } from "../contexts/theme.context";
import moment from "moment";

const RecentActivities: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  // Dummy data for recent activities; replace with actual data fetching logic
  const activities = user?.activities || [];

  return (
    <Container className={`my-4 p-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} rounded`}>
      <Row>
        <Col>
          <h3 className="mb-4">Recent Activities</h3>
          {activities.length > 0 ? (
            <ListGroup>
              {activities.map((activity) => (
                <ListGroupItem
                  key={activity._id}
                  className={`d-flex justify-content-between align-items-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
                >
                  <div className="d-flex flex-column">
                    <span>{activity.name}</span>
                    <small className="text-secondary">{activity.userAgent}</small>
                  </div>
                  <small>{moment(activity.date).calendar()}</small>
                </ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <p>No recent activities found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecentActivities;
