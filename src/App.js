import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Board from "./components/Board";
import UserTable from "./components/UserTable";
import SetUser from "./components/SetUser";

import VIEWS from "./helpers/views";

function App() {
  const [user, setUser] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [view, setView] = useState(VIEWS.STEP_1);
  const [error, setError] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("users");

    const [user1, user2] = userString.split("-");

    if (user1 && user2) {
      setView(VIEWS.STEP_3);
      setUser1(user1);
      setUser2(user2);
      setUser(user1);
    }
  }, []);

  return (
    <>
      {view === VIEWS.STEP_3 && (
        <UserTable user1={user1} user2={user2} user={user} />
      )}
      <Container className="pt-5">
        {view !== "started" ? (
          <SetUser
            changeUser1={(e) => view === "user1" && setUser1(e.target.value)}
            changeUser2={(e) => view === "user2" && setUser2(e.target.value)}
            user1={user1}
            user2={user2}
            view={view}
            setView={setView}
            error={error}
            setError={setError}
            setCurrentUser={setUser}
          />
        ) : (
          <Board user={user} setUser={setUser} user1={user1} user2={user2} />
        )}
      </Container>
    </>
  );
}

export default App;
