import { FC } from "react";
import { IUser } from "../interfaces";
import "./index.css";

interface IUserList{
    users: IUser[]
}

const UserList: FC<IUserList> = ({users}) => {

  return (
    <div className="user-list">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Created:</strong> {user.createdAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
