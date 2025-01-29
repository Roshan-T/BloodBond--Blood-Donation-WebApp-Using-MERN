import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full">
      <div className="grid-cols-2">
        <p className="font-bold text-xl py-3">Select your profile picture</p>

        <input
          type="file"
          accept="image/*"
          className="text-gray-700 font-normal"
          {...register("imageFile", {
            required: "Image is required",
          })}
        />
      </div>
      {errors.imageFile && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFile.message}
        </span>
      )}
    </div>
  );
};
export default ImageSection;
