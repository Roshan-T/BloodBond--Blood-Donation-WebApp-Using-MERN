/* eslint-disable react/prop-types */
import { CheckCircle, Phone, User } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../api-client.js";
const DonorLists = ({
  interestedDonors: interested,
  donatedDonors,
  campaignId,
}) => {
  const donatedDonorsIds = donatedDonors.map((item) => item._id);
  const interestedDonors = interested.filter(
    (item) => !donatedDonorsIds.includes(item._id)
  );

  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.markCampaignParticipation, {
    onSuccess: async () => {
      showToast({
        message: "Participant Accepted Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries(["campaign", campaignId]);
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onConfirmDonation = (campaignId, userId) => {
    mutation.mutate({ c_id: campaignId, u_id: userId });
  };

  return (
    <div className="space-y-6">
      {/* Interested Donors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Interested Donors ({interestedDonors?.length})
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
                    onClick={() => onConfirmDonation(campaignId, donor._id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <CheckCircle size={16} />
                    <span>Confirm Donation</span>
                  </button>
                }
              </div>
            </div>
          ))}
          {interestedDonors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No interested donors yet
            </div>
          )}
        </div>
      </div>

      {/* Donated Donors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Completed Donations ({donatedDonors.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {donatedDonors.map((donor) => (
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
          {donatedDonors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No donations completed yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorLists;
