import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client.js";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation(apiClient.logout, {
    onSuccess: () => {
      navigate("/");
      window.location.reload();
    },
    onError: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading && (
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-50"></div>
      )}
    </div>
  );
};

export default Logout;
