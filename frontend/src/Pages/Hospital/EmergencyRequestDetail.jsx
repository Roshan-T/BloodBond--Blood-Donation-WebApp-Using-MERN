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

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

// const request = {
//   hospital: {
//     name: "City General Hospital",
//     address: "123 Medical Center Drive, Downtown",
//   },
//   deadline: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours from now
//   medical_report:
//     "Patient requires immediate blood transfusion for emergency cardiac surgery. Previous medical history includes hypertension and diabetes. Current hemoglobin levels are critically low.",
//   patient_name: "Sarah Johnson",
//   medical_condition: "Emergency Cardiac Surgery",
//   description:
//     "Urgent need for blood donation. The surgery is scheduled as soon as blood supply is secured. Your immediate response could save a life.",
//   blood_group: "O+",
//   donated: false,
// };
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../../api-client.js";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

import LoaderSpinner from "../../components/LoaderSpinner.jsx";
const EmergencyRequestDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    ["request", id],
    () => apiClient.getRequest(id),
    {
      retry: false,
    }
  );

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.markDonorDonated, {
    onSuccess: async () => {
      showToast({ message: "Request Accepted Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries(["request", id]);
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  let deadline = data ? new Date(data.data.deadline) : new Date();

  const { days, hours, minutes } = useTimer(deadline);

  const isUrgent = days === 0 && hours < 12;
  const navigate = useNavigate();
  console.log(data);
  const onSubmit = () => mutation.mutate(data?.data?._id);
  return (
    <>
      <CircleChevronLeft
        onClick={() => {
          navigate(-1);
        }}
        className="mt-5 ml-6 w-8 h-8 text-red-700 focus:text-red-300 transition-colors cursor-pointer"
      ></CircleChevronLeft>
      {isLoading ? (
        <LoaderSpinner></LoaderSpinner>
      ) : (
        <div className="max-full mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {data.data.donated ? (
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">
                    Emergency Blood Request
                  </h1>
                  <span className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold">
                    {data?.data.blood_group}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock size={20} />
                    <span className="font-medium">Time Remaining</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <TimeBlock value={0} label="Days" />
                    <TimeBlock value={0} label="Hours" />
                    <TimeBlock value={0} label="Minutes" />
                  </div>
                  {isUrgent && (
                    <div className="mt-3 flex items-center text-red-100">
                      <AlertCircle size={16} className="mr-2" />
                      <span>Already Donated</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">
                    Emergency Blood Request
                  </h1>
                  <span className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold">
                    {data?.data.blood_group}
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
            )}

            {/* Content Section */}
            <div className="p-6 space-y-6">
              {/* Hospital Information */}
              <InfoSection
                icon={<Building2 className="text-red-500" />}
                title="Hospital Details"
                content={
                  <div>
                    <h3 className="font-medium">{data.data.hospital.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {data.data.hospital.city}
                    </p>
                  </div>
                }
              />

              {/* Patient Information */}
              <InfoSection
                icon={<User className="text-red-500" />}
                title="Patient Details"
                content={
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name: </span>
                      <span className="text-gray-600">
                        {data.data.patient_name}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Medical Condition: </span>
                      <span className="text-gray-600">
                        {data.data.medical_condition}
                      </span>
                    </div>
                  </div>
                }
              />
              <InfoSection
                icon={<User className="text-red-500" />}
                title="Donor Details"
                content={
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name: </span>
                      <span className="text-gray-600">
                        {data?.data?.donor?.name || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Contact: </span>
                      <span className="text-gray-600">
                        {data.data?.donor?.phone_number || "-"}
                      </span>
                    </div>
                  </div>
                }
              />

              {/* Medical Report */}
              <InfoSection
                icon={<FileText className="text-red-500" />}
                title="Medical Report"
                content={
                  <div className="bg-gray-50 p-3 h-[300px] w-[300px] rounded-lg text-sm text-gray-600">
                    <img src={data.data.medical_report}></img>
                  </div>
                }
              />

              {/* Description */}
              <InfoSection
                icon={<AlertCircle className="text-red-500" />}
                title="Additional Information"
                content={
                  <p className="text-gray-600">{data.data.description}</p>
                }
              />
            </div>

            {data?.data?.donor && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onSubmit}
                  disabled={data.data.donated}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2
            ${
              data.data.donated
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 transition-colors"
            }`}
                >
                  <Heart size={20} />
                  <span>{"Confirm Donation"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

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

export default EmergencyRequestDetail;
const useTimer = (deadline) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const total = Math.max(0, deadlineTime - now);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000 * 5); // Update every minute

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return timeRemaining;
};
