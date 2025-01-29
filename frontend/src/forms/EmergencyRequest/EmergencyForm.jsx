import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useMutation } from "react-query";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//navigate to homw page when success
import * as apiClient from "../../api-client.js";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const EmergencyForm = () => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate, isLoading: isSubmitting } = useMutation(
    apiClient.createRequest,
    {
      onSuccess: () => {
        showToast({ message: "Request Created", type: "SUCCESS" });
        navigate("/");
      },
      onError: () => {
        showToast({ message: "Failed creating request", type: "Error" });
      },
    }
  );
  const handleSubmiting = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("patient_name", data.patient_name);
    formData.append("medical_condition", data.medical_condition);
    formData.append("medical_report", data.medical_report[0]);
    formData.append("description", data.description);
    formData.append("blood_group", data.blood_group);
    formData.append("deadline", data.deadline);
    mutate(formData);
  });
  const bloodGroup = watch("blood_group");
  return (
    <div className="bg-gray-50 p-2 ">
      <form
        className="flex flex-col mx-auto w-auto md:w-2/3 lg:w-1/2 gap-5 items-center p-10 "
        onSubmit={handleSubmiting}
      >
        <h1 className="text-2xl min-w-full font-extrabold ">
          Create Emergency Request
        </h1>
        <div className="flex flex-col gap-3 mt-1 p-1 w-full  ">
          <label className="font-semibold text-lg text-gray-600">
            Patient Name
          </label>
          <input
            type="text"
            placeholder="Enter patient's full name"
            {...register("patient_name", {
              required: "This field is required",
            })}
            className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
          />
          {errors.patient_name && (
            <span className="text-red-500 text-sm font-bold">
              {errors.patient_name.message}
            </span>
          )}
          <label className="font-semibold text-lg text-gray-600">
            Medical Condition
          </label>
          <input
            type="text"
            placeholder="Enter patients medical condition"
            {...register("medical_condition", {
              required: "This field is required",
            })}
            className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
          />
          {errors.medical_condition && (
            <span className="text-red-500 text-sm font-bold">
              {errors.medical_condition.message}
            </span>
          )}
          <label className="font-semibold text-lg text-gray-600">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter patients medical condition"
            {...register("description", {
              required: "This field is required",
            })}
            className="border p-2 rounded-lg border-gray-400 focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
          />
          {errors.medical_condition && (
            <span className="text-red-500 text-sm font-bold">
              {errors.medical_condition.message}
            </span>
          )}
          <label className="font-semibold text-lg text-gray-600">
            Required Within
          </label>
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <DatePicker
                id="deadline"
                placeholderText="Select a deadline"
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                // dateFormat="yyyy-MM-dd"
                dateFormat="Pp"
                className="border w-full rounded-md p-2 text-gray-800 font-normal"
              />
            )}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm font-bold">
              {errors.deadline.message}
            </p>
          )}
          <div className="grid-cols-2">
            <p className="font-semibold text-lg text-gray-600 pb-3">
              Select patient medical report
            </p>

            <input
              type="file"
              accept="image/*"
              className="text-gray-700 font-normal "
              {...register("medical_report", {
                required: "Report is required",
              })}
            />
          </div>
          {errors.medical_report && (
            <span className="text-red-500 text-sm font-bold">
              {errors.medical_report.message}
            </span>
          )}
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
                    {...register("blood_group", {
                      required: "blood group is required",
                    })}
                  />
                  {group}
                </label>
              ))}
              {errors.blood_group && (
                <span className="text-red-500 text-sm font-bold">
                  {errors.blood_group.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-red-600 w-full rounded-md text-white p-2 font-bold hover:bg-red-500 text-xl disabled:bg-gray-500"
        >
          {isSubmitting ? "Creating..." : " Create Emergency Request"}
        </button>
      </form>
    </div>
  );
};

export default EmergencyForm;
