import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { Mail, LockKeyhole } from "lucide-react";
import Header from "../components/Header";
import * as apiClient from "./../api-client.js";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Sign in successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");

      navigate(location.state?.from?.pathName || "/");
      window.location.reload();
    },
    onError: async (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));
  return (
    <>
      <Header></Header>
      <div className="bg-gray-50 min-h-screen">
        <div className=" py-4 flex justify-center items-center">
          <div className=" flex flex-col items-center space-y-2">
            <p className="font-bold tracking-tight text-2xl">Welcome back</p>
            <p className=" text-lg tracking-tighter text-gray-500">
              Sign in to your account to continue
            </p>
          </div>
        </div>
        <div className=" flex  justify-center mt-5">
          <div className=" bg-gray-100 shadow-md p-5">
            <form className="flex flex-col p-4  gap-3 " onSubmit={onSubmit}>
              <label className=" text-gray-700 text-lg font-semibold ">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-0 pl-3 inset-y-0 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400"></Mail>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  className="border rounded w-full mr-3 pl-10 py-2 px-3 font-normal focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
              <label className=" text-gray-700 text-lg font-semibold mt-3">
                Password
              </label>

              <div className="relative">
                <div className="absolute left-0 pl-3 inset-y-0 flex items-center">
                  <LockKeyhole className="h-5 w-5  text-gray-400"></LockKeyhole>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "This filed is required",
                    minLength: {
                      value: 6,
                      message: "Password must be atleast 6 character",
                    },
                  })}
                  className="border rounded w-full mr-3 pl-10 py-2 px-3 font-normal focus:border-red-500 focus:ring-offset-0 focus:ring-red-500 focus:outline-none"
                />
              </div>
              {errors.password && (
                <span className="text-red-500 ">{errors.password.message}</span>
              )}
              <span className="flex mt-2  justify-between text-xs text-red-500">
                <span className="flex items-center gap-1">
                  <input type="checkbox"></input>
                  <label className="text-sm  tracking-tighter font-thin  text-black ">
                    Remember me
                  </label>
                </span>
                <span className="text-sm tracking-tighter font-semibold hover:cursor-pointer hover:text-red-600">
                  Forgot your password?
                </span>
              </span>
              <button
                type="submit"
                className="bg-primary mt-1 text-white p-2 rounded-md font-bold hover:bg-red-700 transition-colors duration-300 text-lg"
              >
                Sign in
              </button>

              <span className="flex justify-center items-center gap-1">
                <span className="text-sm ">Dont have an account?</span>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-primary hover:text-red-600"
                >
                  Sign Up
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
