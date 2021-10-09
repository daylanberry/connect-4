import { Form, Button, Alert } from "react-bootstrap";
import VIEWS from "../helpers/views";

const SetUser = ({
  changeUser1,
  changeUser2,
  setCurrentUser,
  view,
  setView,
  user1,
  user2,
  error,
  setError,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    console.log("clicked");

    if (!user1.length) {
      setError("You must enter you're name");
      hasError = true;
    }

    if (view === VIEWS.STEP_1 && !hasError) {
      setView(VIEWS.STEP_2);
    }

    if (view === VIEWS.STEP_2) {
      if (!user2) {
        hasError = true;
      }

      if (!hasError) {
        setView(VIEWS.STEP_3);
        setCurrentUser(user1);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="w-50" style={{ margin: "auto" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{view === "user1" ? "User 1" : "User 2"}</Form.Label>
        <Form.Control
          value={view === "user1" ? user1 : user2}
          onChange={view === "user1" ? changeUser1 : changeUser2}
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SetUser;
