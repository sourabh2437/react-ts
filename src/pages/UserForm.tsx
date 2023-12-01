import React, { useState } from "react";
import { UserNode } from "../typings/user.type";
import { isUserFormValid } from "../utils/userUtils";
import { useNavigate } from "react-router-dom";
import "../index.css";

interface IProps {
  users: UserNode[];
  addNewUser: (newUser: UserNode) => void;
}

export default function UserForm(props: IProps) {
  const { users, addNewUser } = props;
  const navigateTo = useNavigate();

  const [newUser, setNewUser] = useState<UserNode>({
    id: "",
    name: "",
    email: "",
    city: "",
    companyName: "",
  });

  const handleOnChange = (key: keyof UserNode, value: string) => {
    setNewUser({
      ...newUser,
      [key]: value,
    });
  };

  const onSubmit = () => {
    if (!isUserFormValid(newUser)) {
      console.error("Please fill all the required values");
      return;
    }
    const newUserData = {
      ...newUser,
      id: (users.length + 1).toString(),
    };
    addNewUser(newUserData);
    navigateTo("/");
  };

  return (
    <div className="user-form">
      <div className="user-input">
        <label htmlFor="name">Name</label>
        <input name="name" onChange={(e) => handleOnChange("name", e.target.value)} />
      </div>
      <div className="user-input">
        <label htmlFor="email">Email</label>
        <input name="email" onChange={(e) => handleOnChange("email", e.target.value)} />
      </div>
      <div className="user-input">
        <label htmlFor="city">City</label>
        <input name="city" onChange={(e) => handleOnChange("city", e.target.value)} />
      </div>
      <div className="user-input">
        <label htmlFor="companyName">Company</label>
        <input name="companyName" onChange={(e) => handleOnChange("companyName", e.target.value)} />
      </div>
      <button className="user-submit-button" onClick={onSubmit}>
        Add
      </button>
    </div>
  );
}
