import Header from "../../components/Header";
import { FormProvider, useForm } from "react-hook-form";
import RoleSelect from "./RoleSelect";
import Personalnfo from "./Personalnfo";
import ImageSection from "./ImageSection";
import { useMutation } from "react-query";
import * as apiClient from "./../../api-client.js";
import { useAppContext } from "../../context/AppContext.jsx";
const SignUp = () => {
  const formMethods = useForm();
  const { showToast } = useAppContext();
  const { handleSubmit } = formMethods;
  const { mutate, isLoading: isSubmitting } = useMutation(
    apiClient.registerUser,
    {
      onSuccess: () => {
        showToast({ message: "User Created", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Failed creating donor", type: "Error" });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    console.log(data);
    if (data.role === "Donor") {
      formData.append("imageFile", data.imageFile[0]);
      formData.append("role", data.role);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);
      formData.append("city", data.city);
      formData.append("phone_number", data.phone_number);
      formData.append("date", data.date);
      formData.append("bloodGroup", data.bloodGroup);
    } else {
      formData.append("imageFile", data.imageFile);
      formData.append("role", data.role);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);
      formData.append("city", data.city);
      formData.append("phone_number", data.phone_number);
    }
    mutate(formData);
  });
  return (
    <div className="bg-gray-50 ">
      <Header></Header>
      <div className="flex flex-col items-center  my-3 gap-2">
        <p className="text-3xl font-extrabold">Create an account</p>
        <p className="text-gray-600">Join us to start saving lives</p>
      </div>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col mx-auto w-auto md:w-2/3 lg:w-1/2 gap-5 items-center p-10 "
          onSubmit={onSubmit}
        >
          <ImageSection></ImageSection>
          <RoleSelect></RoleSelect>
          <Personalnfo></Personalnfo>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-red-600 w-full rounded-md text-white p-2 font-bold hover:bg-red-500 text-xl disabled:bg-gray-500"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
