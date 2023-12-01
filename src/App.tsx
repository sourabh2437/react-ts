import React, { useEffect, useState } from "react";
import UserList from "./pages/UserList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";
import { UserAPIs } from "./api";
import { UserAPIResponse, UserNode } from "./typings/user.type";

export default function App() {
  const [users, setUsers] = useState<UserNode[]>([]);

  const fetchUsers = async () => {
    const res = await UserAPIs.getUsers();
    const userData = res.map((user: UserAPIResponse) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
        companyName: user.company.name,
      };
    });
    setUsers(userData);
  };

  const addNewUser = (newUser: UserNode) => {
    console.log(newUser);
    setUsers([...users, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/add-user" element={<UserForm users={users} addNewUser={addNewUser} />} />
      </Routes>
    </Router>
  );
}
