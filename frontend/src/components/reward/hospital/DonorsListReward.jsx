/* eslint-disable react/prop-types */
import { CheckCircle, Phone, User } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import * as apiClient from "../../../api-client.js";
const DonorListReward = ({ id, all_donors, used_donors }) => {
  const donatedDonorsIds = used_donors.map((item) => item._id);
  const interestedDonors = all_donors.filter(
    (item) => !donatedDonorsIds.includes(item._id)
  );

  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.markRewardUsed, {
    onSuccess: async () => {
      showToast({
        message: "Reward Used by User Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries(["reward", id]);
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onConfirmUsed = (rewardId, userId) => {
    mutation.mutate({ r_id: rewardId, u_id: userId });
  };

  return (
    <div className="space-y-6">
      {/* Interested Donors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Redeemed Donors ({interestedDonors?.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {interestedDonors.map((donor) => (
            <div key={donor._id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="text-gray-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{donor.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                        {donor.bloodGroup}
                      </span>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1" />
                        {donor.phone_number}
                      </div>
                    </div>
                  </div>
                </div>
                {
                  <button
                    onClick={() => {
                      onConfirmUsed(id, donor._id);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <CheckCircle size={16} />
                    <span>Confirm Used</span>
                  </button>
                }
              </div>
            </div>
          ))}
          {interestedDonors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No redeemed donors yet
            </div>
          )}
        </div>
      </div>

      {/* Donated Donors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Used Donors ({used_donors.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {used_donors.map((donor) => (
            <div key={donor._id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{donor.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      {donor.bloodGroup}
                    </span>
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1" />
                      {donor.phone_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {used_donors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No one used reward yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorListReward;
