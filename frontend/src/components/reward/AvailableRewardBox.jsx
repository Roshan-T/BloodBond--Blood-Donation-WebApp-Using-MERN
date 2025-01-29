import { useMutation } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../api-client.js";

/* eslint-disable react/prop-types */
const AvailableRewardBox = ({ reward }) => {
  const { showToast } = useAppContext();
  console.log(reward);
  const mutation = useMutation(apiClient.redeemReward, {
    onSuccess: async () => {
      showToast({ message: "Request Accepted Successfully", type: "SUCCESS" });
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = () => mutation.mutate(reward._id);
  return (
    <div className=" ">
      <div className="flex relative bg-red-100/20 border gap-4 rounded-2xl p-2 border-red-200 flex-col">
        <div className="flex justify-between">
          <p className="flex flex-col">
            <span className="text-xl tracking-tight font-medium text-gray-700">
              {reward.name}{" "}
            </span>
            <span className="text-sm text-gray-600">
              {reward.hospitalId.name}
            </span>
          </p>
          <p className="bg-red-600 text-white absolute right-0 top-0 p-2 rounded-tr-2xl rounded-bl-2xl">
            {reward.quantity - reward.usedQuantity} remaining
          </p>
        </div>
        <p className="text-gray-600 text-normal">{reward.description}</p>
        <p className="font-semibold text-lg text-primary">
          {reward.points_required} Points
        </p>
        <button
          onClick={onSubmit}
          className="bg-red-500/95 hover:bg-red-600 cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5"
        >
          Redeem Now
        </button>
      </div>
    </div>
  );
};

export default AvailableRewardBox;
