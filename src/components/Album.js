import { GoTrashcan } from "react-icons/go";
// import { deleteUser } from "store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { useDeleteAlbumMutation } from "store";
import PhotosList from "./PhotosList";

const Album = ({ album }) => {
  const [deleteAlbum, results] = useDeleteAlbumMutation();
  const { isLoading } = results;

  const handleClick = () => {
    deleteAlbum(album.id);
  };

  const header = (
    <>
      <Button onClick={handleClick} loading={isLoading} className="mr-3">
        <GoTrashcan />
      </Button>
      {/* {error && <div>Error deleting album</div>} */}
      {album.title}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default Album;
