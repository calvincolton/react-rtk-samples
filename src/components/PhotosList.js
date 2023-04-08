import { faker } from "@faker-js/faker";
import { useFetchPhotosQuery, useCreatePhotoMutation } from "store";
import Photo from "./Photo";
import Skeleton from "./Skeleton";
import Button from "./Button";

const PhotosList = ({ album }) => {
  const { isFetching, data, error } = useFetchPhotosQuery(album.id);
  const [createPhoto, result] = useCreatePhotoMutation();

  const handleClick = () => {
    const url = faker.image.abstract(150, 150, true); // faker returns the url of some photo online. 'true' ensuers it's random
    createPhoto({ url, albumId: album.id });
  };

  const renderPhotos = () => {
    if (isFetching) {
      return <Skeleton times={4} className="h-8 w-8" />;
    }

    if (error) {
      return <div>An error occurred</div>;
    }

    return data.map((photo) => <Photo key={photo.id} photo={photo} />);
  };

  return (
    <>
      <div className="flex flex-row justify-between p-1 items-center">
        <h3 className="text-lg">Photos</h3>
        {/* {result.error && "An error occurred"} */}
        <Button onClick={handleClick} loading={result.isLoading}>
          Add Photo
        </Button>
      </div>
      <div className="flex flex-row flex-wrap justify-center p-1">{renderPhotos()}</div>
    </>
  );
};

export default PhotosList;
