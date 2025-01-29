/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Plus, User2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateRewardModal from "../../../components/reward/hospital/CreateRewardModal";
import { useQuery } from "react-query";
import * as apiClient from "../../../api-client.js";
import LoaderSpinner from "../../../components/LoaderSpinner.jsx";
const RewardPageHospital = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: rewards, isRewardsLoading } = useQuery(
    "rewards",
    apiClient.getRewards,
    {
      retry: false,
    }
  );

  return (
    <>
      <div className="px-4 py-6 w-full  mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reward</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Plus size={30}></Plus>
            <span>Create Reward</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b  border-gray-100">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "active"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Active Rewards
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "completed"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Completed Rewards
            </button>
          </div>

          <div className="p-4 grid md:grid-cols-2  gap-4">
            {activeTab === "active" ? (
              isRewardsLoading ? (
                <LoaderSpinner></LoaderSpinner>
              ) : (
                rewards?.rewards?.map((reward) => {
                  if (reward.quantity !== reward.usedQuantity) {
                    return (
                      <AvailableRewardBox
                        key={reward._id}
                        reward={reward}
                      ></AvailableRewardBox>
                    );
                  }
                })
              )
            ) : isRewardsLoading ? (
              <LoaderSpinner></LoaderSpinner>
            ) : (
              rewards?.rewards?.map((reward) => {
                if (reward.quantity === reward.usedQuantity) {
                  console.log(reward);
                  return (
                    <AvailableRewardBox
                      key={reward._id}
                      reward={reward}
                    ></AvailableRewardBox>
                  );
                }
              })
            )}
          </div>
        </div>
        <CreateRewardModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        ></CreateRewardModal>
      </div>
    </>
  );
};

const AvailableRewardBox = ({ reward }) => {
  return (
    <div className="flex relative bg-red-100/20 border gap-4 rounded-2xl p-2 border-red-200 flex-col">
      <div className="flex justify-between">
        <p className="flex flex-col">
          <span className="text-xl tracking-tight font-medium text-gray-700">
            {reward.name}
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
      <p className="text-gray-600 text-normal flex items-center gap-2">
        <User2Icon className="w-5 h-5"></User2Icon>
        {reward.usedQuantity} claimed / {reward.quantity} total
      </p>
      <p className="font-semibold text-lg text-primary">
        {reward.points_required} Points
      </p>
      <Link to={`${reward._id}`}>
        <button className="w-full bg-green-500/95 hover:bg-green-600 cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5">
          See Details
        </button>
      </Link>
    </div>
  );
};
export default RewardPageHospital;
