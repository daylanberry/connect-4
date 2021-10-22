import { Form, Button, Alert } from "react-bootstrap";
import VIEWS from "../helpers/views";

const SetUser = ({
  setUser,
  view,
  setView,
  error,
  setError,
  user,
  setUser1,
  socket,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!user.length) {
      setError("You must enter you're name");
      hasError = true;
    }

    if (view === VIEWS.STEP_2 && !hasError) {
      setView(VIEWS.STEP_3);
      setUser1(user);
      socket.emit("setUser", user);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="w-50" style={{ margin: "auto" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your username</Form.Label>
        <Form.Control value={user} onChange={setUser} />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SetUser;
