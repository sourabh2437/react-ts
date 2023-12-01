import { UserNode } from "../typings/user.type";

export const sortUsersByColumn = (users: UserNode[], key: keyof UserNode, ascending: boolean) => {
  return users.sort((a: UserNode, b: UserNode) => {
    return ascending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
  });
};

export const isUserFormValid = (newUser: UserNode): boolean => {
  if (!newUser.city || !newUser.companyName || !newUser.email || !newUser.name) {
    return false;
  }
  return true;
};
