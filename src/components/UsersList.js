import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, createUser } from "store";
import useThunk from "hooks/useThunk";
import User from "./User";
import Button from "./Button";
import Skeleton from "./Skeleton";

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, usersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUsers, createUserError] = useThunk(createUser);

  const { users } = useSelector((state) => {
    return { users: state.users.data };
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleClick = () => {
    doCreateUser();
  };

  const renderUsers = () => {
    if (isLoadingUsers) {
      return <Skeleton times={5} className="h-10 w-full" />;
    }

    if (usersError) {
      return <div>An error occurred</div>;
    }

    return users.map((user) => <User key={user.id} user={user} />);
  };

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        {createUserError && "An error occurred"}
        <Button primary onClick={handleClick} loading={isCreatingUsers}>
          Add User
        </Button>
      </div>
      {renderUsers()}
    </div>
  );
};

export default UsersList;
