import axios from "axios";

const GET_USERS = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    const res = await axios.get(GET_USERS);
    return res.data;
  } catch (error) {
    console.error("unable to fetch users", error);
    return [];
  }
};
