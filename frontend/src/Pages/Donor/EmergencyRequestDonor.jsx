/* eslint-disable react/prop-types */
import {
  Clock,
  Building2,
  User,
  FileText,
  Heart,
  AlertCircle,
  CircleChevronLeft,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useTimer } from "../../hook/useTimer";
import * as apiClient from "../../api-client.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext.jsx";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";

const EmergencyRequestDonor = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["request", id],
    () => apiClient.getRequest(id),
    {
      retry: false,
    }
  );

  const request = data?.data;
  let deadline = request ? new Date(request.deadline) : new Date();

  const { days, hours, minutes } = useTimer(deadline);

  const navigate = useNavigate();

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.markDonorAccepted, {
    onSuccess: async () => {
      showToast({ message: "Request Accepted Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries(["request", id]);
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = () => mutation.mutate(request?._id);

  const isUrgent = days === 0 && hours < 12;
  return (
    <>
      <CircleChevronLeft
        onClick={() => navigate(-1)}
        className="mt-5 ml-6 w-8 h-8 text-red-700 focus:text-red-300 transition-colors cursor-pointer"
      />
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <div className="max-full mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Emergency Blood Request</h1>
                <span className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold">
                  {request.blood_group}
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={20} />
                  <span className="font-medium">Time Remaining</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <TimeBlock value={days} label="Days" />
                  <TimeBlock value={hours} label="Hours" />
                  <TimeBlock value={minutes} label="Minutes" />
                </div>
                {isUrgent && (
                  <div className="mt-3 flex items-center text-red-100">
                    <AlertCircle size={16} className="mr-2" />
                    <span>Urgent: Less than 12 hours remaining</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <InfoSection
                icon={<Building2 className="text-red-500" />}
                title="Hospital Details"
                content={
                  <div>
                    <h3 className="font-medium">{request.hospital.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {request.hospital.address}
                    </p>
                  </div>
                }
              />

              <InfoSection
                icon={<User className="text-red-500" />}
                title="Patient Details"
                content={
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name: </span>
                      <span className="text-gray-600">
                        {request.patient_name}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Medical Condition: </span>
                      <span className="text-gray-600">
                        {request.medical_condition}
                      </span>
                    </div>
                  </div>
                }
              />

              <InfoSection
                icon={<FileText className="text-red-500" />}
                title="Medical Report"
                content={
                  <div className="p-3 h-[300px] w-[300px] rounded-lg text-sm">
                    <img src={request.medical_report} alt="Medical report" />
                  </div>
                }
              />

              {/* Description */}
              <InfoSection
                icon={<AlertCircle className="text-red-500" />}
                title="Additional Information"
                content={<p className="text-gray-600">{request.description}</p>}
              />
            </div>

            {/* Action Button */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                disabled={request.donated}
                onClick={onSubmit}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                  request.donated
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 transition-colors"
                }`}
              >
                <Heart size={20} />
                <span>{request.donor ? "Already Accepted" : "Donate now"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Rest of the code remains the same...

const InfoSection = ({ icon, title, content }) => (
  <div className="flex space-x-4">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <h2 className="font-semibold text-gray-900 mb-2">{title}</h2>
      {content}
    </div>
  </div>
);

const TimeBlock = ({ value, label }) => (
  <div className="bg-white/20 rounded-lg p-2">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm">{label}</div>
  </div>
);

export default EmergencyRequestDonor;
