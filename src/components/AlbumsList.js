import { useFetchAlbumsQuery, useCreateAlbumMutation } from "store";
import { faker } from "@faker-js/faker";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Album from "./Album";

const AlbumsList = ({ user }) => {
  const { isFetching, data, error } = useFetchAlbumsQuery(user.id);
  const [createAlbum, result] = useCreateAlbumMutation();

  const handleClick = () => {
    const title = faker.commerce.productName();
    createAlbum({ title, userId: user.id });
  };

  const renderAlbums = () => {
    if (isFetching) {
      return <Skeleton times={3} className="h-10 w-full" />;
    }

    if (error) {
      return <div>An error occurred</div>;
    }

    return data.map((album) => <Album key={album.id} album={album} />);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-1 items-center">
        <h3 className="text-lg">Albums</h3>
        {/* {result.error && "An error occurred"} */}
        <Button onClick={handleClick} loading={result.isLoading}>
          Add Album
        </Button>
      </div>
      <div className="p-1">{renderAlbums()}</div>
    </>
  );
};

export default AlbumsList;
