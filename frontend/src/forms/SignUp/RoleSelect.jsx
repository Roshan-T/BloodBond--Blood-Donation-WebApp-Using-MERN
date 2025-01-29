import { Hospital, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
const roles = ["Donor", "Hospital"];
const RoleSelect = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const roleWatch = watch("role");
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold">Choose your role</h2>
      <div className="flex   gap-x-10  ">
        {roles.map((role) => (
          <label
            key={role}
            className={
              roleWatch === role
                ? "cursor-pointer flex items-center justify-center  mt-5 w-40 h-40 p-5 border border-red-600 rounded-lg"
                : "cursor-pointer flex items-center justify-center  mt-5 w-40 h-40 p-5 border border-gray-300 rounded-lg"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={role}
              {...register("role", { required: "Select the role" })}
            ></input>
            <span className="text-lg font-semibold">
              {role === "Donor" ? (
                <User
                  className={
                    roleWatch === "Donor"
                      ? "w-10 h-10 text-red-600"
                      : "w-10 h-10"
                  }
                ></User>
              ) : (
                <Hospital
                  className={
                    roleWatch === "Hospital"
                      ? "w-10 h-10 text-red-600"
                      : "w-10 h-10"
                  }
                ></Hospital>
              )}
              {role}
            </span>
          </label>
        ))}
      </div>
      {errors.role && (
        <span className="text-red-500 text-sm font-bold">
          {errors.role.message}
        </span>
      )}
    </div>
  );
};

export default RoleSelect;
