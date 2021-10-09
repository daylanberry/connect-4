import { Table } from "react-bootstrap";

const UserTable = ({ user1, user2, user }) => {
  return (
    <div
      className="text-center d-flex align-items-center justify-content-center pt-3"
      style={{}}
    >
      <Table striped bordered hover className="w-50">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className={user === user1 ? "bg-success" : ""}>{user1}</td>
          </tr>
          <tr>
            <td>2</td>
            <td className={user === user2 ? "bg-success" : ""}>{user2}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
