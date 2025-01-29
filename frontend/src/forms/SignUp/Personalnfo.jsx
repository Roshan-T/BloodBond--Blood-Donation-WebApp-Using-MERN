import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import BloodGroup from "./BloodGroup";
const Personalnfo = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext();

  async function getCityFromLatLong(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.address && data.address.city) {
        return data.address.city; // City is directly available
      } else if (data.address && data.address.town) {
        return data.address.town; // Some places might have 'town'
      } else {
        return "City not found";
      }
    } catch (error) {
      console.error("Error with Nominatim API:", error);
      return "Error fetching city";
    }
  }
  const fetchGPSAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await getCityFromLatLong(latitude, longitude);
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setValue("city", city);
          console.log("Coordinates:", latitude, longitude, city);
        },
        (error) => {
          console.error("Error fetching GPS location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const password = watch("password");
  const role = watch("role");

  return (
    <>
      <div className="text-xl font-bold w-full">Personal Information</div>
      <div className="flex flex-col gap-3 mt-1 p-1 w-full  ">
        <label className="font-semibold text-lg text-gray-600">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          {...register("name", {
            required: "This field is required",
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.name && (
          <span className="text-red-500 text-sm font-bold">
            {errors.name.message}
          </span>
        )}
        <label className="font-semibold text-lg text-gray-600">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "This field is required",
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-bold">
            {errors.email.message}
          </span>
        )}
        <label className="font-semibold text-lg text-gray-600">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 character",
            },
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.password && (
          <span className="text-red-500 text-sm font-bold">
            {errors.password.message}
          </span>
        )}
        <label className="font-semibold text-lg text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirm_password", {
            required: "This field is required",
            validate: (val) => val === password || "Password do not match",
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.confirm_password && (
          <span className="text-red-500 text-sm font-bold">
            {errors.confirm_password.message}
          </span>
        )}
        <label className="font-semibold text-lg text-gray-600">
          Mobile Number
        </label>
        <input
          type="number"
          placeholder="Enter your mobile number"
          {...register("phone_number", {
            required: "This field is required",
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.phone_number && (
          <span className="text-red-500 text-sm font-bold">
            {errors.phone_number.message}
          </span>
        )}
        {role === "Donor" && (
          <>
            <label className="font-semibold text-lg text-gray-600">
              Gender
            </label>
            <select
              className="border w-full rounded-md p-2 text-gray-700 font-normal"
              {...register("gender", { required: "Gender is required" })}
            >
              <option className="text-sm font-bold" value="">
                Select gender
              </option>
              {["Male", "Female", "Other"].map((gender) => (
                <option value={gender} key={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm font-bold">
                {errors.gender.message}
              </span>
            )}
            <label className="font-semibold text-lg text-gray-600">
              Date of Birth
            </label>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  id="date"
                  placeholderText="Select a date"
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                  className="border w-full rounded-md p-2 text-gray-800 font-normal"
                />
              )}
            />
            {errors.date && (
              <p className="text-red-500 text-sm font-bold">
                {errors.date.message}
              </p>
            )}
          </>
        )}
        {/* 
        <label className="font-semibold text-lg text-gray-600">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          {...register("address", {
            required: "This field is required",
          })}
          className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
        />
        {errors.address && (
          <span className="text-red-500 text-sm font-bold">
            {errors.address.message}
          </span>
        )} */}
        <div>
          <label className="font-semibold text-lg text-gray-600">Address</label>
          <input
            placeholder="Provide the address"
            type="text"
            onClick={fetchGPSAddress}
            {...register("city", { required: "Address is required" })}
            className="flex gap-3 border w-full p-1"
          ></input>
        </div>
        {role === "Donor" && <BloodGroup></BloodGroup>}
        <div className="flex">
          <input
            type="checkbox"
            {...register("terms", {
              required: "Please agree to terms and condtions",
            })}
          ></input>
          <span className="pl-1"> I accept the</span>
          <span className="text-red-600 pl-1"> Terms and Conditions</span>
        </div>
        {errors.terms && (
          <span className="text-red-500 text-sm font-bold">
            {errors.terms.message}
          </span>
        )}
      </div>
    </>
  );
};

export default Personalnfo;
