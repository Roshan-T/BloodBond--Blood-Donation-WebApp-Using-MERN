import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useMutation } from "react-query";

import * as apiClient from "../../api-client.js";
const CampaignFrom = () => {
  const {
    register,
    formState: { errors },
    control,

    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate, isLoading: isSubmitting } = useMutation(
    apiClient.createCampagin,
    {
      onSuccess: () => {
        showToast({ message: "Campaign Created", type: "SUCCESS" });
        navigate("/");
      },
      onError: () => {
        showToast({ message: "Failed creating campaign", type: "Error" });
      },
    }
  );
  const handleSubmiting = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("banner", data.banner[0]);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    mutate(formData);
  });
  return (
    <div className="bg-gray-50 p-2 ">
      <form
        className="flex flex-col mx-auto w-auto md:w-2/3 lg:w-1/2 gap-5 items-center p-10 "
        onSubmit={handleSubmiting}
      >
        <h1 className="text-2xl min-w-full font-extrabold ">Create Campaign</h1>
        <div className="flex flex-col gap-3 mt-1 p-1 w-full  ">
          <label className="font-semibold text-lg text-gray-600">
            Campagin Name
          </label>
          <input
            type="text"
            placeholder="Enter campaign name"
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
          <label className="font-semibold text-lg text-gray-600">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter campaign description"
            {...register("description", {
              required: "This field is required",
            })}
            className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
          />
          {errors.description && (
            <span className="text-red-500 text-sm font-bold">
              {errors.description.message}
            </span>
          )}
          <label className="font-semibold text-lg text-gray-600">Address</label>
          <input
            type="text"
            placeholder="Enter campagin location"
            {...register("address", {
              required: "This field is required",
            })}
            className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
          />
          {errors.address && (
            <span className="text-red-500 text-sm font-bold">
              {errors.address.message}
            </span>
          )}
          <label className="font-semibold text-lg text-gray-600">
            Start Time
          </label>
          <Controller
            name="start_time"
            control={control}
            rules={{ required: "start_time is required" }}
            render={({ field }) => (
              <DatePicker
                id="start_time"
                placeholderText="Select a start_time"
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                // dateFormat="yyyy-MM-dd"
                dateFormat="Pp"
                className="border w-full rounded-md p-2 text-gray-800 font-normal"
              />
            )}
          />
          {errors.start_time && (
            <p className="text-red-500 text-sm font-bold">
              {errors.start_time.message}
            </p>
          )}
          <label className="font-semibold text-lg text-gray-600">
            End Time
          </label>
          <Controller
            name="end_time"
            control={control}
            rules={{ required: "end_time is required" }}
            render={({ field }) => (
              <DatePicker
                id="end_time"
                placeholderText="Select a end_time"
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                // dateFormat="yyyy-MM-dd"
                dateFormat="Pp"
                className="border w-full rounded-md p-2 text-gray-800 font-normal"
              />
            )}
          />
          {errors.end_time && (
            <p className="text-red-500 text-sm font-bold">
              {errors.end_time.message}
            </p>
          )}
          <div className="grid-cols-2">
            <p className="font-semibold text-lg text-gray-600 pb-3">
              Select Campaign Banner
            </p>

            <input
              type="file"
              accept="image/*"
              className="text-gray-700 font-normal "
              {...register("banner", {
                required: "Banner is required",
              })}
            />
          </div>
          {errors.banner && (
            <span className="text-red-500 text-sm font-bold">
              {errors.banner.message}
            </span>
          )}
        </div>
        <button
          // disabled={isSubmitting}
          type="submit"
          className="bg-red-600 w-full rounded-md text-white p-2 font-bold hover:bg-red-500 text-xl disabled:bg-gray-500"
        >
          {isSubmitting ? "Creating..." : "Create Campagin"}
        </button>
      </form>
    </div>
  );
};

export default CampaignFrom;
