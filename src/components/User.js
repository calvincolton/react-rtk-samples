import { GoTrashcan } from "react-icons/go";
import useThunk from "hooks/useThunk";
import { deleteUser } from "store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsList from "./AlbumsList";

const User = ({ user }) => {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleClick = () => {
    doDeleteUser(user.id);
  };

  const header = (
    <>
      <Button onClick={handleClick} loading={isLoading} className="mr-3">
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header} className="mb-4">
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default User;
