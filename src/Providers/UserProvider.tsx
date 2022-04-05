import React, { useState } from "react";

interface IUser {
  id?: string;
  username: string;
  description: string;
  restaurantName: string;
}

interface UserContextInterface {
  user: IUser[];
  handleAddUser: (
    { username, description, restaurantName, id }: IUser,
  ) => void;
}

export const UserContext = React.createContext<UserContextInterface>({
  user: [],
  handleAddUser: () => {},
});

interface Props {
  children: JSX.Element;
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser[]>([]);

  const handleAddUser = (values: IUser,) => {
    const newUser = {
      id: values.id,
      username: values.username,
      description: values.description,
      restaurantName: values.restaurantName,
    };
    setUser([newUser]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleAddUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
