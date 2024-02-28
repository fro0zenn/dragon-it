import { FC, useState, useEffect, useCallback } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { IUser } from "./components/interfaces";

const USERS_KEY_STORAGE = "users";

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // Fetch user data from local storage on component mount, If I use fetch I'll also add here AbortController.
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY_STORAGE) || "[]");
    setUsers(storedUsers);
  }, []);

  const handleUserSubmit = useCallback((userData: IUser) => {
    setUsers((prevUsers) => {
      const updatedUsers: Array<IUser> = [...prevUsers, userData];
      localStorage.setItem(USERS_KEY_STORAGE, JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, []);

  const clearUsers = () => {
    localStorage.removeItem(USERS_KEY_STORAGE);
    setUsers([]);
  }

  return (
    <div className="app">
      <UserForm onSubmit={handleUserSubmit} />
      <UserList users={users} />
      {users.length > 0 && <button onClick={clearUsers}>Clear</button>}
    </div>
  );
};

export default App;
