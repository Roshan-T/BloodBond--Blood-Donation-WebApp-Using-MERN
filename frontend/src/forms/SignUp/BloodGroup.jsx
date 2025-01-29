import { useFormContext } from "react-hook-form";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodGroup = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const bloodGroup = watch("bloodGroup");
  console.log(bloodGroup);

  return (
    <div className="w-full mb-4">
      <p className="font-bold text-xl py-3">Select your blood group</p>

      <div className="grid-cols-2 grid sm:grid-cols-4">
        {bloodGroups.map((group) => (
          <label
            key={group}
            className={
              bloodGroup === group
                ? "cursor-pointer flex items-center justify-center  mt-5 w-20 h-20 p-5 font-bold border bg-red-500 text-xl text-white border-black rounded-lg"
                : "cursor-pointer bg-red-200 text-red-600 font-bold flex items-center justify-center  mt-5 w-20 h-20 p-5 border border-gray-300 rounded-lg"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={group}
              {...register("bloodGroup", {
                required: "blood group is required",
              })}
            />
            {group}
          </label>
        ))}
        {errors.bloodGroup && (
          <span className="text-red-500 text-sm font-bold">
            {errors.bloodGroup.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default BloodGroup;
