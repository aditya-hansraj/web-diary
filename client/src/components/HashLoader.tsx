import { Container } from "react-bootstrap";
import { HashLoader as Loader } from "react-spinners";

export default function HashLoader() {
  return (
    <Container className="d-flex justify-content-center align-items-center h-90 loader-container">
      <Loader />
    </Container>
  );
}
