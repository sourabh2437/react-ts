import React, { useEffect, useState } from "react";
import { UserNode } from "../typings/user.type";
import "../index.css";
import { sortUsersByColumn } from "../utils/userUtils";
import { Link } from "react-router-dom";

interface IProps {
  users: UserNode[];
}

type Sorter = {
  key: keyof UserNode;
  ascending: boolean;
};

export default function UserList(props: IProps) {
  const { users } = props;
  const [userList, setUserList] = useState<UserNode[]>(users);
  const [sorter, setSorter] = useState<Sorter>({
    key: "name",
    ascending: true,
  });

  const changeSorter = (key: keyof UserNode) => {
    let newDirection = true;

    if (key === sorter.key) {
      newDirection = !sorter.ascending;
    }
    const sortedList = sortUsersByColumn(userList, key, newDirection);
    setUserList(sortedList);
    setSorter({ key, ascending: newDirection });
  };

  useEffect(() => {
    const sortedList = sortUsersByColumn(users, sorter.key, sorter.ascending);
    setUserList(sortedList);
  }, [users]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => changeSorter("name")}>Name {sorter.ascending ? <span>^</span> : <span>{"v"}</span>}</th>
            <th onClick={() => changeSorter("email")}>Email {sorter.ascending ? <span>^</span> : <span>{"v"}</span>}</th>
            <th onClick={() => changeSorter("city")}>City {sorter.ascending ? <span>^</span> : <span>{"v"}</span>}</th>
            <th onClick={() => changeSorter("companyName")}>Company {sorter.ascending ? <span>^</span> : <span>{"v"}</span>}</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.city}</th>
                <th>{user.companyName}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add-new-user">
        <Link to="/add-user">Add New User</Link>
      </div>
    </div>
  );
}
