import { Form, Button, Alert } from "react-bootstrap";

const JoinRoom = ({ room, setRoom, setError, error, setView }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room?.length) {
      return setError();
    }

    setView();
  };

  return (
    <Form onSubmit={handleSubmit} className="w-50" style={{ margin: "auto" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Join a room!</Form.Label>
        <Form.Control value={room} onChange={setRoom} />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default JoinRoom;
