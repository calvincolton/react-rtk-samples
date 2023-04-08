import { GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "store";

const Photo = ({ photo }) => {
  const [deletePhoto, result] = useDeletePhotoMutation();

  const handleClick = () => {
    deletePhoto(photo.id);
  };

  return (
    <div className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-gray-200 hover:opacity-70">
        <GoTrashcan className="text-3xl" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Photo;
